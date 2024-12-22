import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {ChapterItemVertical} from './item.vertical';
import {IChapter} from '../../../../interfaces';

type IProps = {
  onChapterItemClick?: (chapter: IChapter) => void;
  chapters: IChapter[];
  subjectName?: string;
};

export const ChaptersListVertical: React.FC<IProps> = ({
  onChapterItemClick,
  chapters,
  subjectName,
}) => {
  return (
    <FlatList
      style={{marginTop: 10}}
      data={chapters}
      keyExtractor={(item, index) => item.id.toString() || index.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={props => (
        <TouchableOpacity
          key={props.item.id}
          activeOpacity={0.7}
          onPress={() => onChapterItemClick?.(props.item)}>
          <ChapterItemVertical itemProps={props} subjectName={subjectName} />
        </TouchableOpacity>
      )}
    />
  );
};
