import {Layout} from '@ui-kitten/components';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useAppSelector} from '../../redux';
import {StudiesVerticalList} from './list/studies';

export const ContinueStudyListScreen = () => {
  const {topicVideos} = useAppSelector(state => state.continueStudy);
  return (
    <Layout style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {topicVideos.length > 0 && (
        <StudiesVerticalList
          heading="Continue Study"
          topicVideos={topicVideos}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
