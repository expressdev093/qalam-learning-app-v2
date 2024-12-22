import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {QuestionItemVertical} from './item.vertical';
import {IQuestion} from '../../../../interfaces';
import {ItemVertical} from '../../../exercise/list/vertical/item.vertical';

type IProps = {
  onItemClick?: (question: IQuestion) => void;
  questions: IQuestion[];
};

export const QuestionsListVertical: React.FC<IProps> = ({
  onItemClick,
  questions,
}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={questions}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onPress={() => onItemClick?.(item)}>
          <QuestionItemVertical question={item} index={index + 1} />
        </TouchableOpacity>
      )}
    />
  );
};
