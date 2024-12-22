import {useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PastPaperItemVertical} from './item.vertical';
import {IPastPaper} from '../../../../interfaces';

type IProps = {
  pastPapers: IPastPaper[];
  onItemClick: (pastPaper: IPastPaper) => void;
};

export const PastPapersVerticalList: React.FC<IProps> = ({
  pastPapers,
  onItemClick,
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <FlatList
      style={styles.conatiner}
      data={pastPapers}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={item.id}
          onPress={() => onItemClick(item)}>
          <PastPaperItemVertical pastPaper={item} />
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const themedStyle = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  itemSeparator: {
    height: 10,
  },
});
