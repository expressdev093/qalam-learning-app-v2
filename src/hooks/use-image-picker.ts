import {useApiUrl} from '@refinedev/core';
import axios, {AxiosProgressEvent, AxiosResponse} from 'axios';
import {useState} from 'react';
import {Platform} from 'react-native';
import ImagePicker, {Image, ImageOrVideo} from 'react-native-image-crop-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Define the types for the hook's return value
interface UseImagePickerReturn {
  resetImage: () => void;
  image: Image | null;
  loading: boolean;
  permissionGranted: boolean;
  requestPermission: (permissionType: 'gallery' | 'camera') => Promise<boolean>;
  pickImage: () => void;
  captureImage: () => void;
  handleUploadImage: (
    formData: FormData,
    token: string,
    onUploadProgress: (event: AxiosProgressEvent) => void,
  ) => Promise<AxiosResponse<any, any>>;
}

export const useImagePicker = (): UseImagePickerReturn => {
  const apiUrl = useApiUrl();
  const [image, setImage] = useState<Image | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to request permission based on platform and Android version
  const requestPermission = async (
    permissionType: 'gallery' | 'camera',
  ): Promise<boolean> => {
    let permission;

    if (Platform.OS === 'ios') {
      // For iOS, we request PHOTO_LIBRARY for gallery and CAMERA for camera access.
      permission =
        permissionType === 'camera'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      // For Android, handle new permission models for versions 13 and above
      const sdkVersion = parseInt(Platform.Version.toString());

      if (sdkVersion >= 33) {
        // For Android 13 (API level 33) and above, we request specific permissions for media
        permission =
          permissionType === 'camera'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES; // For gallery access
      } else if (sdkVersion >= 30) {
        // For Android 10 to 12, we request READ_EXTERNAL_STORAGE
        permission =
          permissionType === 'camera'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      } else {
        // For older Android versions, we request READ_EXTERNAL_STORAGE
        permission =
          permissionType === 'camera'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    }

    setLoading(true);
    const result = await request(permission);
    setLoading(false);

    if (result === RESULTS.GRANTED) {
      setPermissionGranted(true);
      return true;
    } else {
      setPermissionGranted(false);
      return false;
    }
  };

  // Function to open image picker
  const pickImage = async (): Promise<void> => {
    if (!permissionGranted) return;

    setLoading(true);
    try {
      const image: ImageOrVideo = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: false,
      });

      setImage(image);
    } catch (error) {
      setLoading(false);
      console.error('Image Picker Error:', error);
    }
  };

  // Function to open camera for image capture
  const captureImage = async (): Promise<void> => {
    if (!permissionGranted) return;

    setLoading(true);
    try {
      const image: ImageOrVideo = await ImagePicker.openCamera({
        mediaType: 'photo',
        includeBase64: false,
      });
      setImage(image);
    } catch (error) {
      setLoading(false);
      console.error('Camera Error:', error);
    }
  };

  const resetImage = () => {
    setImage(null);
  };

  const handleUploadImage = async (
    formData: FormData,
    token: string,
    onUploadProgress: (event: AxiosProgressEvent) => void,
  ): Promise<AxiosResponse<any, any>> => {
    const result = await axios.patch(`${apiUrl}/me/avatar`, formData, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'x-api-key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNrYWdlTmFtZSI6ImNvbS5uYWplZWIubWFydC5waGFybWFjeS5zaG9wcGluZy5vbmxpbmUuZnJlZS5kZWxpdmVyeS5ncm9jZXJ5IiwiaWF0IjoxNjAxNDYyNDYyfQ.J_UBlexExMk65-4d8kEL6uKL5Ka9FP3i6aU1WkWS2JQ',
      },
      onUploadProgress: onUploadProgress,
    });

    return result;
  };

  return {
    image,
    loading,
    permissionGranted,
    requestPermission,
    pickImage,
    captureImage,
    resetImage,
    handleUploadImage,
  };
};

export default useImagePicker;
