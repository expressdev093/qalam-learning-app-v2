import {Layout, Text, useStyleSheet, useTheme} from '@ui-kitten/components';
import React, {Fragment} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../redux';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';
import {ThemeColorKey} from '../../constants/colors';
import {useList} from '@refinedev/core';
import {IRecentlyLearnVideo} from '../../interfaces';
import {LearnAnalysisCard} from './components/learn-analysis.card';
import {SubjectHorizontalList} from '../subjects/lists/horizontal/list';
import {AnalysisGraphComponent} from './components/analysis-graph';
import {RecentLearnVideoList} from './list/recent-learn-videos';
import {QueryContainer} from '../../components/containers';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';

export const AnalysisScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<any>>();
  const {user, token} = useAppSelector(state => state.auth);
  const styles = useStyleSheet(themedStyle);
  const theme = useTheme();
  const recentlyLearnVideoState = useList<IRecentlyLearnVideo>({
    resource: 'recently-learn-videos',
    meta: {
      join: [{field: 'topicVideo'}, {field: 'topicVideo.topic'}],
    },
    sorters: [
      {
        field: 'updatedAt',
        order: 'desc',
      },
    ],
  });

  const recentlyLearnVideos = recentlyLearnVideoState.data?.data || [];
  return (
    <Layout style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
        barStyle="dark-content"
      />
      <FlatList
        data={null}
        renderItem={() => null}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Fragment>
            <LearnAnalysisCard />
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
            </View>
            {/* <AnalysisGraphComponent /> */}
            {/* <Image
              style={{width: '100%', height: 300, marginTop: 20}}
              source={graphImage}
              resizeMode="cover"
              resizeMethod="auto"
        /> */}
            <QueryContainer
              isLoading={recentlyLearnVideoState.isLoading}
              isError={recentlyLearnVideoState.isError}
              error={recentlyLearnVideoState.error}
              isEmpty={recentlyLearnVideos.length === 0}>
              <RecentLearnVideoList
                heading="Recent Learn Videos"
                recentlyLearnVideos={recentlyLearnVideos}
              />
            </QueryContainer>
          </Fragment>
        }
      />
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatList: {
    flex: 1,
  },
});
