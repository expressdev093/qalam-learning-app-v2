import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RouteNames} from '../../../navigations/constants/route.name';
import {IChapter} from '../../../interfaces';

export type ChapterTabParamList = {
  [RouteNames.chapterTopicsTab]: {chapterId: number};
  [RouteNames.chapterExerciseTab]: {chapterId: number};
  [RouteNames.chapterTestsTab]: {chapterId: number};
};

export type ChapterTabsNavigationProp<T extends keyof ChapterTabParamList> =
  NativeStackNavigationProp<ChapterTabParamList, T>;

// Subject stack route prop
export type ChapterTabRouteProp<T extends keyof ChapterTabParamList> =
  RouteProp<ChapterTabParamList, T>;

export type ChapterTabScreenProps<k extends keyof ChapterTabParamList> =
  NativeStackScreenProps<ChapterTabParamList, k>;
