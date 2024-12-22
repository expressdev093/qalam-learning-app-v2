import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {ItemVertical} from './item.vertical';
import {IQuiz} from '../../../../interfaces';

type IProps = {
  onItemClick?: (quiz: IQuiz) => void;
  quizes: IQuiz[];
};

export const ChapterTestListVertical: React.FC<IProps> = ({
  onItemClick,
  quizes,
}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={quizes}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onPress={() => onItemClick?.(item)}>
          <ItemVertical quiz={item} index={index} />
        </TouchableOpacity>
      )}
    />
  );
};
