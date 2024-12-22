import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {IExercise, IQuestion} from '../../../interfaces';
import React, {Fragment} from 'react';
import {Utils} from '../../../constants/utils';
import {Colors} from '../../../constants/colors';
import {MyTabBar} from './helper/tabbar';
import {ExerciseQuestionTab} from '../tabs/exercise-question.tab';
import {RouteNames} from '../../../navigations/constants/route.name';
import {ExerciseMcqsTab} from '../tabs/exercise-mcqs.tab';

const Tab = createMaterialTopTabNavigator();

type IProps = {
  questions: IQuestion[];
  exerciseId: number;
  type: 'video' | 'subject' | undefined;
};

export const ExerciseQuestionsTabsNavigation: React.FC<IProps> = ({
  questions,
  exerciseId,
  type = 'subject',
}) => {
  const nestedQuestions: any = {};
  questions.forEach(question => {
    if (!nestedQuestions[question.type]) {
      nestedQuestions[question.type] = [];
    }
    nestedQuestions[question.type].push(question);
  });

  const questionTypeEntries = Object.entries(nestedQuestions);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {backgroundColor: Colors.primary},
        tabBarLabelStyle: {
          textTransform: 'none',
        },
      }}>
      <Fragment>
        {questionTypeEntries.map(([questionType, questionsArray], index) => (
          <Tab.Screen
            key={questionType + index}
            name={questionType}
            options={{
              tabBarLabel: Utils.capitalizeFirstWord(questionType),
            }}
            initialParams={{questions: questionsArray as IQuestion[]}}>
            {props => <ExerciseQuestionTab {...props} type={type} />}
          </Tab.Screen>
        ))}
        <Tab.Screen
          name={RouteNames.exerciseMcqsTab}
          component={ExerciseMcqsTab}
          options={{
            title: 'Mcqs',
          }}
          initialParams={{exerciseId}}
        />
      </Fragment>
    </Tab.Navigator>
  );
};
