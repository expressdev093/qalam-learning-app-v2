import {Text, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {AppCornerHorizontalItem} from './item.horizontal';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../../redux';
import {useList} from '@refinedev/core';
import {IAppCorner} from '../../../../interfaces';
import {QueryContainer} from '../../../../components/containers';

type Props = {
  heading: string;
};

export const AppCornerHorizontalList: React.FC<Props> = ({heading}) => {
  const navigaiton = useNavigation<any>();
  const styles = useStyleSheet(themedStyle);
  const {token, isLoggedIn} = useAppSelector(state => state.auth);
  const appCornerState = useList<IAppCorner>({
    resource: 'app-corners',
    filters: [
      {
        field: 'isActive',
        operator: 'eq',
        value: true,
      },
    ],
  });

  const onItemClick = (appCorner: IAppCorner) => {
    // if (appCorner.image) {
    //   navigaiton.navigate(RouteNames.appCornerImageShow, {
    //     appCorner,
    //   });
    // } else {
    //   navigaiton.navigate(RouteNames.videoStack, {
    //     video: {
    //       entityName: 'app-corners',
    //       entityId: appCorner.id,
    //       // url: BASE_URL + '/' + appCorner.video,
    //       // thumbnailUrl: BASE_URL + '/' + appCorner.videoThumbnail,
    //       // title: appCorner.title,
    //       // description: appCorner.description,
    //     } as IVideo,
    //   });
    // }
  };

  const appCorners = appCornerState.data?.data || [];

  return (
    <QueryContainer
      isLoading={appCornerState.isLoading}
      isError={appCornerState.isError}
      error={appCornerState.error}
      isEmpty={appCorners.length === 0}>
      <View>
        <Text category="h5" style={styles.heading}>
          {heading}
        </Text>
        <FlatList
          data={appCorners}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => onItemClick(item)}>
              <AppCornerHorizontalItem appCorner={item} />
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
