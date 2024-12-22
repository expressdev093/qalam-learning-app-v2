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
    navigaiton.navigate(RouteNames.video, {
      video: {
        entityName: 'topic-videos',
        entityId: topicVideo.id,
        // url: BASE_URL + '/' + appCorner.video,
        // thumbnailUrl: BASE_URL + '/' + appCorner.videoThumbnail,
        // title: appCorner.title,
        // description: appCorner.description,
      },
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
        <Text category="h5" style={styles.heading}>
          {heading}
        </Text>
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
  },
});
