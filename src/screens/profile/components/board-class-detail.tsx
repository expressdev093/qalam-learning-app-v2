import {Text} from '@ui-kitten/components';
import React, {Fragment} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useAppSelector} from '../../../redux';
import {useOne} from '@refinedev/core';
import {IBoard, IBoardClass} from '../../../interfaces';

export const BoardClassDetail = () => {
  const {user} = useAppSelector(state => state.auth);
  // const {data: board} = Api.useGetBoardQuery(user?.boardId!, {
  //   skip: user === undefined,
  // });
  const boardClassState = useOne<IBoardClass>({
    resource: 'board-classes',
    id: 1,
    queryOptions: {
      //  enabled: !!user?.boardClassId,
    },
    meta: {
      join: [{field: 'board'}],
    },
  });

  const boardClass = boardClassState.data?.data;
  return (
    <View>
      {boardClassState.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Fragment>
          <Text category="p1">{`Board - ${boardClass?.board?.name}`}</Text>
          <Text category="p1">{`Grade - ${boardClass?.name}`}</Text>
        </Fragment>
      )}
    </View>
  );
};
