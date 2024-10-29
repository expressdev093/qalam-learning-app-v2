import {RequestQueryBuilder} from '@nestjsx/crud-request';

export const handleIncludeDeleted = (
  query: RequestQueryBuilder,
  includeDeleted?: number,
) => {
  if (includeDeleted) {
    query.setIncludeDeleted(includeDeleted);
  }
  return query;
};
