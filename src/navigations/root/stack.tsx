import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import {RouteNames} from '../constants/route.name';
import {LoginScreen} from '../../screens/auth/login.screen';
import {ForgotPasswordScreen} from '../../screens/auth/forgot-password.screen';
import {SignUpScreen} from '../../screens/auth/signup.screen';
import {HomeDrawer} from '../home-drawer/drawer';
import {SubjectShowScreen} from '../../screens/subjects/subject.show.screen';
import {ChapterShowScreen} from '../../screens/chapters/chapter.show.screen';
import {AuthenticationScreen} from '../../screens/auth/auth.screen';
import {ExerciseShowScreen} from '../../screens/exercise/exercise.show.screen';
import {QuestionShowScreen} from '../../screens/questions/question.show.screen';
import {TopicShowScreen} from '../../screens/topics/topic.show.screen';
import {VideoScreen} from '../../screens/video';
import {QuizScreen} from '../../screens/quiz/quiz.screen';
import {QuizShowScreen} from '../../screens/quiz/quiz.show.screen';
import {ProfileEditScreen} from '../../screens/profile/profile-edit.screen';
import {PastPaperScreen} from '../../screens/past-papers/past-papers';
import {PastPaperShowScreen} from '../../screens/past-papers/show.screen';
import {FavoriteScreen} from '../../screens/favorites/favorites.screen';
import {ProfileScreen} from '../../screens/profile/profile.screen';
import {ChangePasswordScreen} from '../../screens/auth/change-password.screen';
import {ContactUsScreen} from '../../screens/contact-us/contact-us.screen';
import {ContinueStudyListScreen} from '../../screens/continue-study/continue-study.screen';
import {useAppSelector} from '../../redux';
import {QuizResultScreen} from '../../screens/quiz/quiz.result.screen';
import {QuizCheckCorrectAnswerScreen} from '../../screens/quiz/quiz.check-correct-answer.screen';
import {QuizResultOverviewScreen} from '../../screens/quiz/quiz.result-overview.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          isLoggedIn ? RouteNames.homeDrawer : RouteNames.authentication
        }>
        <Stack.Screen
          name={RouteNames.authentication}
          component={AuthenticationScreen}
        />
        <Stack.Screen name={RouteNames.login} component={LoginScreen} />
        <Stack.Screen name={RouteNames.signUp} component={SignUpScreen} />
        <Stack.Screen
          name={RouteNames.changePassword}
          component={ChangePasswordScreen}
        />
        <Stack.Screen name={RouteNames.contactUs} component={ContactUsScreen} />
        <Stack.Screen
          name={RouteNames.forgotPassword}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name={RouteNames.homeDrawer} component={HomeDrawer} />
        <Stack.Screen
          name={RouteNames.subjectShow}
          component={SubjectShowScreen}
        />
        <Stack.Screen
          name={RouteNames.chapterShow}
          component={ChapterShowScreen}
        />
        <Stack.Screen
          name={RouteNames.exerciseShow}
          component={ExerciseShowScreen}
        />
        <Stack.Screen
          name={RouteNames.profileEdit}
          component={ProfileEditScreen}
        />

        <Stack.Screen
          name={RouteNames.pastPaper}
          component={PastPaperScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={RouteNames.pastPaperShow}
          component={PastPaperShowScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={RouteNames.rootfavorites}
          component={FavoriteScreen}
          options={{
            headerShown: true,
            title: 'Favorites',
          }}
        />
        <Stack.Screen
          name={RouteNames.rootProfile}
          component={ProfileScreen}
          options={{
            headerShown: true,
            title: 'Profile',
          }}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Question',
          }}
          name={RouteNames.questionShow}
          component={QuestionShowScreen}
        />
        <Stack.Screen
          name={RouteNames.topicShow}
          component={TopicShowScreen}
          options={{
            headerShown: true,
            title: 'Topic',
            // headerLeft: BackButton,
          }}
        />
        <Stack.Screen name={RouteNames.video} component={VideoScreen} />
        <Stack.Screen name={RouteNames.quiz} component={QuizScreen} />
        <Stack.Screen
          name={RouteNames.quizCheckCorrectAnswer}
          component={QuizCheckCorrectAnswerScreen}
        />
        <Stack.Screen
          name={RouteNames.quizResultOverview}
          component={QuizResultOverviewScreen}
        />
        <Stack.Screen
          name={RouteNames.quizResult}
          component={QuizResultScreen}
          options={{
            headerShown: true,
            title: 'Good Job!',
            //headerStyle: styles.headerStyle as any,
          }}
        />
        <Stack.Screen
          name={RouteNames.quizShow}
          component={QuizShowScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RouteNames.continueStudyList}
          component={ContinueStudyListScreen}
          options={{
            headerShown: true,
            title: 'Continue study',
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
};
