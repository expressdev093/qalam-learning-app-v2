import {Text, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {ISubject} from '../../../../interfaces';
import {useList} from '@refinedev/core';
import {SubjectHorizontalItem} from './item';

type Props = {
  heading?: string;
  onItemClick?: (subject: ISubject) => void;
  isAddPastPaper?: boolean;
  onPastPaperClick?: () => void;
};

export const SubjectHorizontalList: React.FC<Props> = ({
  heading,
  isAddPastPaper = false,
  onPastPaperClick,
  onItemClick,
}) => {
  const styles = useStyleSheet(themedStyle);
  const {data} = useList<ISubject>({
    resource: 'subjects',
  });

  const subjects = data?.data || [];
  const subjectsWithPastPaper = [
    {id: 0, name: 'Past Paper', isActive: true},
    ...(subjects ?? []),
  ];

  const handleClick = (subject: ISubject, index: number) => {
    if (isAddPastPaper && index === 0) {
      onPastPaperClick?.();
    } else onItemClick?.(subject);
  };

  return (
    <View>
      {heading && (
        <Text category="h5" style={styles.heading}>
          {heading}
        </Text>
      )}
      <FlatList
        data={subjectsWithPastPaper}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleClick(item, index)}
            activeOpacity={0.7}>
            <SubjectHorizontalItem subject={item} index={index} />
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const themedStyle = StyleSheet.create({
  itemSeparator: {
    width: 10,
  },
  heading: {
    fontSize: 18,
    marginVertical: 10,
  },
});
