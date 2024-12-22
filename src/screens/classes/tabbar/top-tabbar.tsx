/* eslint-disable react/react-in-jsx-scope */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ClassTab} from '../../../screens/classes/tabs/class-tab';
import {MyTabBar} from './helper/tabbar';
import {IOnlineClass} from '../../../interfaces';

const Tab = createMaterialTopTabNavigator();

type IProps = {
  onlineClasses: IOnlineClass[];
};

type Props = {
  type: 'yesterday' | 'today' | 'tomorrow';
};

export const ClassesTabsNavigation: React.FC<IProps> = ({onlineClasses}) => {
  // Get the current date
  const currentDate = new Date();
  const todayClasses: IOnlineClass[] = [];
  const tomorrowClasses: IOnlineClass[] = [];
  const yesterdayClasses: IOnlineClass[] = [];

  // Loop through the event data
  onlineClasses.forEach(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (startDate.toDateString() === currentDate.toDateString()) {
      todayClasses.push(event);
    } else if (startDate.getDate() === currentDate.getDate() + 1) {
      tomorrowClasses.push(event);
    } else if (startDate.getDate() === currentDate.getDate() - 1) {
      yesterdayClasses.push(event);
    }
  });

  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Yesterday"
        component={ClassTab}
        initialParams={{type: 'yesterday', onlineClasses: onlineClasses}}
      />
      <Tab.Screen
        name="Today"
        component={ClassTab}
        initialParams={{type: 'today', onlineClasses: todayClasses}}
      />
      <Tab.Screen
        name="Tomorrow"
        component={ClassTab}
        initialParams={{type: 'tomorrow', onlineClasses: tomorrowClasses}}
      />
    </Tab.Navigator>
  );
};
