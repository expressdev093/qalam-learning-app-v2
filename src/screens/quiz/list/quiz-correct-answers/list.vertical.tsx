import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {QuizCorrentAnswerItemVertical} from './item.vertical';
import {IQuizMcqOption} from '../../../../interfaces';

type IProps = {
  answers: IQuizMcqOption[];
};

export const QuizCorrectAnswerListVertical: React.FC<IProps> = ({answers}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={answers}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => {}}>
          <QuizCorrentAnswerItemVertical quizMcqOption={item} index={index} />
        </TouchableOpacity>
      )}
    />
  );
};
