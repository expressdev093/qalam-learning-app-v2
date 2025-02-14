import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {StudyHorizontalItem} from './item.horizontal';
import {PlatformPressable} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {ITopicVideo} from '../../../../interfaces';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';
import {Icon} from '../../../../components/icon';

type Props = {
  heading: string;
  topicVideos: ITopicVideo[];
};

export const StudiesHorizontalList: React.FC<Props> = ({
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
    <View>
      <View style={styles.header}>
        <Text category="h5" style={styles.heading}>
          {heading}
        </Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigaiton.navigate(RouteNames.continueStudyList)}>
          <Text>View All</Text>
          <Icon size={24} style={styles.icon} name="chevron-right-outline" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={topicVideos}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item?.id?.toString()}
            onPress={() => onItemClick(item)}>
            <StudyHorizontalItem
              index={index}
              topicVideo={item}
              onEnrollClick={onItemClick}
            />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'color-primary-500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
