import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PlatformPressable} from '@react-navigation/elements';
import {Avatar, useStyleSheet} from '@ui-kitten/components';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {Platform} from 'react-native';
import {IS_ANDROID} from '../../../constants/platform';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {BASE_URL} from '@env';
import {useAppDispatch, useAppSelector} from '../../../redux';
import {AuthActions} from '../../../redux/reducers/auth.reducer';
import {Icon} from '../../../components/icon';
import {CircleSvg} from '../../../components/circle-svg';

export const ProfilePicture = () => {
  const {user, token} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const url = user?.avatar?.includes('upload')
    ? `${BASE_URL}/${user.avatar}`
    : user?.avatar;
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  const styles = useStyleSheet(themedStyle);

  async function requestCameraPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await check(permission as any);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    const requestResult = await request(permission as any);

    return requestResult === RESULTS.GRANTED;
  }

  async function requestPhotoLibraryPermission(): Promise<boolean> {
    const permission: any = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    const requestResult = await request(permission);

    return requestResult === RESULTS.GRANTED;
  }

  async function handleImagePicker() {
    //const cameraPermission = await requestCameraPermission();
    const photoLibraryPermission = await requestPhotoLibraryPermission();

    if (!photoLibraryPermission) {
      console.log('Permission denied');
      return;
    }

    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      handleUpload(image);
    } catch (err) {}
  }

  const handleUpload = async (image?: ImageOrVideo) => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    const file = {
      uri: IS_ANDROID
        ? image.sourceURL
        : image.sourceURL?.toString().replace('file://', ''),
      type: image.mime,
      name: image.filename,
    };
    console.log(JSON.stringify(file, null, 2));
    formData.append('file', file);

    try {
      // const response = await handleUploadAvatar(
      //   formData,
      //   token ?? '',
      //   upload => {
      //     if (upload.total) {
      //       let progress = Math.round((100 * upload.loaded) / upload.total);
      //       setUploadProgress(progress);
      //     } else {
      //       setUploadProgress(0);
      //     }
      //   },
      // );
      // if (response.data) {
      //   dispatch(AuthActions.updateAvatar(response.data.path));
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const renderEditButton = (
    <PlatformPressable
      style={styles.editButtonBlackView}
      onPress={handleImagePicker}>
      <Icon name="edit" pack="antdesign" size={24} color="white" />
    </PlatformPressable>
  );
  return (
    <View>
      <CircleSvg width={120} height={120}>
        <Avatar
          source={{uri: url}}
          size="giant"
          style={{height: 110, width: 110}}
        />
      </CircleSvg>
      {renderEditButton}
    </View>
  );
};

const themedStyle = StyleSheet.create({
  editButtonBlackView: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    width: 45,
    height: 45,
    backgroundColor: '#000',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 3,
    borderColor: 'white',
  },
});
