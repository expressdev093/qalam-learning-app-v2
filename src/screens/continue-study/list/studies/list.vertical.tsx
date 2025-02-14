import {useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {StudyVerticalItem} from './item.vertical';
import {ITopicVideo, IVideo} from '../../../../interfaces';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';

type Props = {
  heading: string;
  topicVideos: ITopicVideo[];
};

export const StudiesVerticalList: React.FC<Props> = ({
  heading,
  topicVideos,
}) => {
  const styles = useStyleSheet(themedStyle);
  const navigaiton = useNavigation<RootStackNavigationProp<any>>();

  const onItemClick = (topicVideo: ITopicVideo) => {
    navigaiton.navigate(RouteNames.topicVideo, {
      videoId: topicVideo.id,
    });
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={topicVideos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item.id.toString()}
            onPress={() => onItemClick(item)}>
            <StudyVerticalItem
              index={index}
              topicVideo={item}
              onEnrollClick={onItemClick}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const themedStyle = StyleSheet.create({
  itemSeparator: {
    height: 10,
  },
  heading: {
    fontSize: 18,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    color: 'color-primary-500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
