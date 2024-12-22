import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';
import {NotificationItemVertical} from './item.vertical';

type IProps = {
  onItemClick?: () => void;
};

export const NotificationVerticalList: React.FC<IProps> = ({onItemClick}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <FlatList
      style={styles.flatList}
      data={[1, 2, 3]}
      keyExtractor={item => item.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={item}
          activeOpacity={0.7}
          onPress={() => onItemClick?.()}>
          <NotificationItemVertical index={index} />
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
