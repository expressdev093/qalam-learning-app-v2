/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {PlatformPressable} from '@react-navigation/elements';
import {Avatar, useStyleSheet} from '@ui-kitten/components';
import {IS_ANDROID} from '../../../constants/platform';
import {useAppDispatch, useAppSelector} from '../../../redux';
import {AuthActions} from '../../../redux/reducers/auth.reducer';
import {Icon} from '../../../components/icon';
import {CircleSvg} from '../../../components/circle-svg';
import useImagePicker from '../../../hooks/use-image-picker';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';

export const ProfilePicture = () => {
  const {
    handleUploadImage,
    resetImage,
    image,
    loading,
    permissionGranted,
    requestPermission,
    pickImage,
    captureImage,
  } = useImagePicker();
  const {user, token} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const url = user?.avatar?.includes('uploads')
    ? `${Config.BASE_URL}/${user.avatar}`
    : user?.avatar;
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  const styles = useStyleSheet(themedStyle);

  const handleImagePicker = async () => {
    const hasPermission = await requestPermission('gallery');
    if (hasPermission) {
      pickImage();
    }
  };

  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  const handleUpload = async () => {
    const formData = new FormData();
    const file = {
      uri: IS_ANDROID
        ? image?.path
        : image?.path?.toString().replace('file://', ''),
      type: image?.mime,
      name: image?.filename,
    };
    formData.append('file', file);

    try {
      const response = await handleUploadImage(formData, token!, upload => {
        if (upload.total) {
          let progress = Math.round((100 * upload.loaded) / upload.total);
          setUploadProgress(progress);
        } else {
          setUploadProgress(0);
        }
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile picture changed successfully',
      });
      dispatch(AuthActions.updateAvatar(response.data));
      resetImage();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'OOPS',
        text2: "Can't upload profile picture. Please try again later.",
      });
    }
  };

  const renderEditButton = (
    <PlatformPressable
      style={styles.editButtonBlackView}
      onPress={handleImagePicker}>
      <Icon name="camera-alt" pack="material" size={24} color="white" />
    </PlatformPressable>
  );
  return (
    <View>
      <CircleSvg width={120} height={120}>
        <Avatar
          source={{uri: url}}
          size="giant"
          style={{height: 110, width: 110, objectFit: 'cover'}}
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
