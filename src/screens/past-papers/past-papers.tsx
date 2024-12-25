/* eslint-disable react-hooks/exhaustive-deps */
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {PaperFormProps, PastPaperForm} from './form';
import {IPastPaper} from '../../interfaces';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {CrudFilters, useList} from '@refinedev/core';
import {QueryContainer} from '../../components/containers';
import {emptyImage} from '../../components/svgs';
import {PastPapersVerticalList} from './list/vertical';

const defaultFilters: CrudFilters = [
  {
    field: 'isActive',
    operator: 'eq',
    value: true,
  },
];

export const PastPaperScreen: React.FC<
  RootStackScreenProps<RouteNames.pastPaper>
> = ({navigation, route}) => {
  const styles = useStyleSheet(themedStyle);
  const [filter, setFilter] = useState<CrudFilters>([]);
  const pastPaperState = useList<IPastPaper>({
    resource: 'past-papers',
    filters: filter,
    meta: {
      join: [{field: 'subject'}],
    },
  });

  const pastPapers = pastPaperState.data?.data;

  const onSubmit = useCallback((values: PaperFormProps) => {
    const newFilter: CrudFilters = [];
    if (values.subjectId && values.subjectId !== 0) {
      newFilter.push({
        field: 'subjectId',
        operator: 'eq',
        value: values.subjectId,
      });
    }

    if (values.year && values.year !== '0') {
      newFilter.push({
        field: 'year',
        operator: 'eq',
        value: values.year,
      });
    }
    setFilter([...defaultFilters, ...newFilter]);
  }, []);

  const onItemClick = useCallback((pastPeper: IPastPaper) => {
    navigation.navigate(RouteNames.pastPaperShow, {
      pastPaperId: pastPeper.id,
    });
  }, []);

  return (
    <Layout style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <PastPaperForm onSubmit={onSubmit} />
      {/* <View style={styles.paperContainer}>
        <Text category="h4" style={styles.primaryText}>
          Load Paper
        </Text>
      </View> */}
      <Text category="h6" style={styles.heading}>
        Papers
      </Text>
      <QueryContainer
        error={pastPaperState.error}
        isError={pastPaperState.isError}
        isLoading={pastPaperState.isLoading}
        isEmpty={pastPapers?.length === 0}
        emptyViewProps={{
          title: 'No past paper added yet',
          imageSource: emptyImage,
        }}>
        <PastPapersVerticalList
          pastPapers={pastPapers || []}
          onItemClick={onItemClick}
        />
      </QueryContainer>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paperContainer: {
    backgroundColor: '#339FFA20',
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: 'color-primary-500',
  },
  heading: {
    marginVertical: 10,
  },
});
