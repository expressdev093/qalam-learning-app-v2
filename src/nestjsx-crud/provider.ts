import {CondOperator, RequestQueryBuilder} from '@nestjsx/crud-request';

import queryString from 'query-string';
import {AxiosInstance} from 'axios';
import type {DataProvider, HttpError} from '@refinedev/core';
import {
  axiosInstance,
  handleFilter,
  handleJoin,
  handlePagination,
  handleSort,
  transformHttpError,
} from '@refinedev/nestjsx-crud';

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Required<DataProvider> => ({
  getList: async ({resource, pagination, filters, sorters, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

    let query = RequestQueryBuilder.create();

    query = handleFilter(query, filters);
    query = handleJoin(query, meta?.join);
    query = handlePagination(query, pagination);
    query = handleSort(query, sorters);

    const {data} = await httpClient.get(`${url}?${query.query()}`, {headers});

    // without pagination
    if (Array.isArray(data)) {
      return {
        data,
        total: data.length,
      };
    }
    // with pagination
    return {
      data: data.data,
      total: data.total,
    };
  },

  getMany: async ({resource, ids, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

    let query = RequestQueryBuilder.create().setFilter({
      field: 'id',
      operator: CondOperator.IN,
      value: ids,
    });

    query = handleJoin(query, meta?.join);

    const {data} = await httpClient.get(`${url}?${query.query()}`, {headers});

    return {
      data,
    };
  },

  create: async ({resource, variables, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}`;

    try {
      const {data} = await httpClient.post(url, variables, {
        headers,
      });

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  update: async ({resource, id, variables, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    try {
      const {data} = await httpClient.patch(url, variables, {headers});

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  updateMany: async ({resource, ids, variables, meta}) => {
    const headers = meta?.headers ?? {};
    const errors: HttpError[] = [];

    const response = await Promise.all(
      ids.map(async id => {
        try {
          const {data} = await httpClient.patch(
            `${apiUrl}/${resource}/${id}`,
            variables,
            {headers},
          );
          return data;
        } catch (error) {
          const httpError = transformHttpError(error);

          errors.push(httpError);
        }
      }),
    );

    if (errors.length > 0) {
      throw errors;
    }

    return {data: response};
  },

  createMany: async ({resource, variables, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}/bulk`;

    try {
      const {data} = await httpClient.post(url, {bulk: variables}, {headers});

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  getOne: async ({resource, id, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    let query = RequestQueryBuilder.create();

    query = handleJoin(query, meta?.join);

    const {data} = await httpClient.get(`${url}?${query.query()}`, {headers});

    return {
      data,
    };
  },

  deleteOne: async ({resource, id, meta}) => {
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    const {data} = await httpClient.delete(url, {headers});

    return {
      data,
    };
  },

  deleteMany: async ({resource, ids, meta}) => {
    const headers = meta?.headers ?? {};
    const response = await Promise.all(
      ids.map(async id => {
        const {data} = await httpClient.delete(`${apiUrl}/${resource}/${id}`, {
          headers,
        });
        return data;
      }),
    );
    return {data: response};
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    meta,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestQueryBuilder = RequestQueryBuilder.create();

    console.log(headers);
    requestQueryBuilder = handleFilter(requestQueryBuilder, filters);

    requestQueryBuilder = handleJoin(requestQueryBuilder, meta?.join);

    requestQueryBuilder = handleSort(requestQueryBuilder, sorters);

    let requestUrl = `${url}?${requestQueryBuilder.query()}`;

    if (query) {
      requestUrl = `${requestUrl}&${queryString.stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, {headers});
        break;
    }

    const {data} = axiosResponse;

    return Promise.resolve({data});
  },
});
