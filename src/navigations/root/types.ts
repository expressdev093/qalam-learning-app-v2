import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/route.name';
import {
  IQuestion,
  IQuiz,
  ITopic,
  IUserQuiz,
  IUserQuizAnswer,
  IVideo,
} from '../../interfaces';
import {WebsiteContentType} from '../../interfaces/enum';

// Root stack
export type RootStackParamList = {
  [RouteNames.authentication]: undefined;
  [RouteNames.login]: undefined;
  [RouteNames.signUp]: undefined;
  [RouteNames.homeDrawer]: undefined;
  [RouteNames.forgotPassword]: undefined;
  [RouteNames.subjectShow]: {
    subjectId: number;
    name?: string;
  };
  [RouteNames.chapterShow]: {
    chapterId: number;
    name?: string;
  };
  [RouteNames.exerciseShow]: {
    exerciseId: number;
    title?: string;
  };
  [RouteNames.chapterExerciseShow]: {
    chapterId: number;
  };
  [RouteNames.questionShow]: {
    question: IQuestion;
  };
  [RouteNames.topicShow]: {
    topic: ITopic;
  };
  [RouteNames.topicVideo]: {
    videoId: number;
    //video: IVideo;
  };

  [RouteNames.quiz]: {
    quizId: number;
    userQuiz?: IUserQuiz;
  };

  [RouteNames.quizShow]: {
    quizId: number;
    userQuizId: number;
    answers?: IUserQuizAnswer[];
  };
  [RouteNames.quizResult]: {
    userQuizId: number;
  };
  [RouteNames.quizCheckCorrectAnswer]: {
    quizId: number;
  };
  [RouteNames.quizResultOverview]: {
    userQuizId: number;
  };
  [RouteNames.continueStudyList]: undefined;
  [RouteNames.profileEdit]: undefined;
  [RouteNames.changePassword]: undefined;
  [RouteNames.contactUs]: undefined;
  [RouteNames.privacyPolicy]: undefined;
  [RouteNames.termsAndConditions]: {type: WebsiteContentType};
  [RouteNames.pastPaper]: undefined;
  [RouteNames.pastPaperShow]: {
    pastPaperId: number;
  };
  [RouteNames.rootfavorites]: undefined;
  [RouteNames.rootProfile]: undefined;
  [RouteNames.changePassword]: undefined;
  [RouteNames.contactUs]: undefined;
};

// Root stack navigation prop
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Root stack route prop
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type RootStackScreenProps<k extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, k>;
