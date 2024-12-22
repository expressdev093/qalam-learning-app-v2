import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ClassItemVertical} from './item.vertical';
import {useStyleSheet} from '@ui-kitten/components';
import {IOnlineClass} from '../../../../interfaces';

type IProps = {
  onItemClick?: (onlineClass: IOnlineClass) => void;
  onlineClasses: IOnlineClass[];
};

export const ClassesListVertical: React.FC<IProps> = ({
  onItemClick,
  onlineClasses,
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <FlatList
      style={styles.flatList}
      data={onlineClasses}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onPress={() => onItemClick?.(item)}>
          <ClassItemVertical onlineClass={item} isActive={item.id == 1} />
        </TouchableOpacity>
      )}
    />
  );
};

const themedStyle = StyleSheet.create({
  flatList: {
    marginTop: 10,
    backgroundColor: 'background-basic-color-1',
  },
});
