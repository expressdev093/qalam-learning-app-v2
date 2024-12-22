import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {Fragment, useEffect} from 'react';
import {FlatList, StatusBar, Text, View} from 'react-native';
import {Colors, ThemeColorKey} from '../../constants/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Search} from './components/search';
import {IOnlineClass} from '../../interfaces';
import {TopCard} from './components/top-card';
import {SubjectHorizontalList} from '../subjects/lists/horizontal/list';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {AppCornerHorizontalList} from '../app-corners/list/horizontal';
import {TopPickHorizontalList} from '../topics/lists/top-pick';
import {Divider} from './components/divider';
import {PlayQuizView} from './components/play-quiz';
import {ShareWithFriendView} from './components/share-with-friend';
import {ContinueStudy} from './components/continue-study';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';

export const HomeScreen = () => {
  const styles = useStyleSheet(themedStyle);
  const theme = useTheme();
  const navigation =
    useNavigation<RootStackNavigationProp<RouteNames.homeDrawer>>();

  useEffect(() => {
    changeNavigationBarColor('#ffffff', false, true);
  }, []);
  return (
    <Layout style={styles.layout}>
      <FocusAwareStatusBar
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
        barStyle="dark-content"
      />
      <Search />
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={({item}) => null}
        ListHeaderComponent={
          <Fragment>
            <TopCard />
            <View style={{marginTop: 20}}>
              <SubjectHorizontalList
                isAddPastPaper
                onItemClick={subject =>
                  navigation.navigate(RouteNames.subjectShow, {
                    subjectId: subject.id,
                    name: subject.name,
                  })
                }
                onPastPaperClick={() =>
                  navigation.navigate(RouteNames.pastPaper)
                }
              />
              <AppCornerHorizontalList heading="App Corner" />
              <Divider />
              <TopPickHorizontalList heading="Top pic for you" />
              <Divider />
              <PlayQuizView />
              <ContinueStudy />
              <ShareWithFriendView />
            </View>
          </Fragment>
        }
      />
    </Layout>
  );
};

const themedStyle = StyleService.create({
  layout: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    flexDirection: 'column',
  },
});
