import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {QuizAnswerItemVertical} from './item.vertical';
import {IUserQuizAnswer} from '../../../../interfaces';

type IProps = {
  answers: IUserQuizAnswer[];
};

export const QuizResultAnswerListVertical: React.FC<IProps> = ({answers}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={answers}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => {}}>
          <QuizAnswerItemVertical userQuizAnswer={item} index={index} />
        </TouchableOpacity>
      )}
    />
  );
};
