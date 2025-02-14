import {Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {RecentLearnVideoItemVertical} from './item.vertical';
import {useNavigation} from '@react-navigation/native';
import {IRecentlyLearnVideo, IVideo} from '../../../../interfaces';
import {RouteNames} from '../../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../../navigations/root/types';

type Props = {
  heading: string;
  recentlyLearnVideos: IRecentlyLearnVideo[];
};

export const RecentLearnVideoList: React.FC<Props> = ({
  heading,
  recentlyLearnVideos,
}) => {
  const styles = useStyleSheet(themedStyle);
  const navigaiton = useNavigation<RootStackNavigationProp<any>>();

  const onItemClick = (recenltyLearnVideos: IRecentlyLearnVideo) => {
    navigaiton.navigate(RouteNames.topicVideo, {
      videoId: recenltyLearnVideos.topicVideoId,
    });
  };
  return (
    <View>
      <View style={styles.header}>
        <Text category="h5" style={styles.heading}>
          {heading}
        </Text>
        {/* <Text>3 Hours</Text> */}
      </View>
      <FlatList
        data={recentlyLearnVideos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => onItemClick(item)}>
            <RecentLearnVideoItemVertical recentlyLearnVideo={item} />
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
