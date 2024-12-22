import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {MyTabBar} from './helper/tabbar';
import {IChapter} from '../../../interfaces';
import React from 'react';
import {ChapterTabParamList} from './types';
import {RouteNames} from '../../../navigations/constants/route.name';
import {ChapterTopicTab} from '../tabs/topics.tab';
import {ChapterExerciseTab} from '../tabs/exercise.tab';
import {ChapterTestsTab} from '../tabs/tests.tab';

const Tab = createMaterialTopTabNavigator<ChapterTabParamList>();

type IProps = {
  chapter: IChapter;
};

export const ChapterTabsNavigation: React.FC<IProps> = ({chapter}) => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={RouteNames.chapterTopicsTab}
        component={ChapterTopicTab}
        options={{
          tabBarLabel: 'Video',
        }}
        initialParams={{chapterId: chapter.id}}
      />
      <Tab.Screen
        name={RouteNames.chapterExerciseTab}
        component={ChapterExerciseTab}
        options={{
          tabBarLabel: 'Exercise',
        }}
        initialParams={{chapterId: chapter.id}}
      />
      <Tab.Screen
        name={RouteNames.chapterTestsTab}
        component={ChapterTestsTab}
        options={{
          tabBarLabel: 'Test',
        }}
        initialParams={{chapterId: chapter.id}}
      />
    </Tab.Navigator>
  );
};
