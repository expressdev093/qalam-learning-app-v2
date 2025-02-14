import {Text, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {TopPickHorizontalItem} from './item.horizontal';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../../redux';
import {useList} from '@refinedev/core';
import {ITopicVideo} from '../../../../interfaces';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';
import {QueryContainer} from '../../../../components/containers';
import {Icon} from '../../../../components/icon';

type Props = {
  heading: string;
};

export const TopPickHorizontalList: React.FC<Props> = ({heading}) => {
  const navigaiton = useNavigation<RootStackNavigationProp<any>>();
  const styles = useStyleSheet(themedStyle);
  const {token} = useAppSelector(state => state.auth);
  const topicVideoState = useList<ITopicVideo>({
    resource: 'topic-videos',
    filters: [
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });

  const onItemClick = (topicVideo: ITopicVideo) => {
    navigaiton.navigate(RouteNames.topicVideo, {
      videoId: topicVideo.id,
    });
  };

  const topicVideos = topicVideoState.data?.data || [];

  return (
    <QueryContainer
      isError={topicVideoState.isError}
      isLoading={topicVideoState.isLoading}
      error={topicVideoState.error}
      isEmpty={topicVideos.length === 0}>
      <View>
        <View style={styles.header}>
          <Text style={styles.heading}>{heading}</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigaiton.navigate(RouteNames.continueStudyList)}>
            <Text>View All</Text>
            <Icon size={24} style={styles.icon} name="chevron-right-outline" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={topicVideos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => onItemClick(item)}
              activeOpacity={0.7}>
              <TopPickHorizontalItem key={item.id} topicVideo={item} />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </QueryContainer>
  );
};

const themedStyle = StyleSheet.create({
  itemSeparator: {
    width: 10,
  },
  heading: {
    fontSize: 18,
    marginVertical: 10,
    flex: 1,
  },
  icon: {
    color: 'color-primary-500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
