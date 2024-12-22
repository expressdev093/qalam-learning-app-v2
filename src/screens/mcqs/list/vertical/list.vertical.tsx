import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {IMcq} from '../../../../interfaces';
import {McqItemVertical} from './item.vertical';

type IProps = {
  onItemClick?: (mcq: IMcq) => void;
  mcqs: IMcq[];
};

export const McqsListVertical: React.FC<IProps> = ({onItemClick, mcqs}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={mcqs}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onPress={() => onItemClick?.(item)}>
          <McqItemVertical mcq={item} />
        </TouchableOpacity>
      )}
    />
  );
};
