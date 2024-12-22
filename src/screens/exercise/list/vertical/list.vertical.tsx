import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {ItemVertical} from './item.vertical';
import {IExercise} from '../../../../interfaces';

type IProps = {
  onExerciseItemClick?: (exercise: IExercise) => void;
  exercises: IExercise[];
};

export const ExerciseListVertical: React.FC<IProps> = ({
  onExerciseItemClick,
  exercises,
}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={exercises}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onPress={() => onExerciseItemClick?.(item)}>
          <ItemVertical exercise={item} index={index + 1} />
        </TouchableOpacity>
      )}
    />
  );
};
