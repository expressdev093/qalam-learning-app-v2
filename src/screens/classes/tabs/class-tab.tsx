import React, {useRef} from 'react';
import {View} from 'react-native';
import {IOnlineClass, IVideo} from '../../../interfaces';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteNames} from '../../../navigations/constants/route.name';
import {RootStackNavigationProp} from '../../../navigations/root/types';
import {QueryContainer} from '../../../components/containers';
import {emptyImage} from '../../../components/svgs';
import {ClassesListVertical} from '../list/vertical';
import Toast from 'react-native-toast-message';

export const ClassTab: React.FC = ({}) => {
  const toastRef = useRef<any>(null);
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const {
    params: {type, onlineClasses},
  } = useRoute<any>();

  const onItemClick = (onlineClass: IOnlineClass) => {
    const topicVideos = onlineClass.topic?.videos ?? [];
    if (!onlineClass.isEnded && topicVideos.length > 0) {
      navigation.navigate(RouteNames.topicVideo, {
        videoId: topicVideos[0].id,
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Online Class Info',
        text2: 'This class is already ended',
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <QueryContainer
        error={undefined}
        isError={false}
        isLoading={false}
        isEmpty={onlineClasses.length === 0}
        emptyViewProps={{
          title: 'No online classes added yet',
          imageSource: emptyImage,
        }}>
        <ClassesListVertical
          onItemClick={onItemClick}
          onlineClasses={onlineClasses}
        />
        {/* <Toast ref={toastRef} /> */}
      </QueryContainer>
    </View>
  );
};
