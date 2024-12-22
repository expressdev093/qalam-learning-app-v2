import {Layout, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import HtmlView from '../../components/htmlview';

export const TopicShowScreen: React.FC<
  RootStackScreenProps<RouteNames.topicShow>
> = ({navigation, route}) => {
  const {
    params: {topic},
  } = route;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: topic.name,
    });
  }, [navigation, topic]);
  const styles = useStyleSheet(themedStyle);
  return (
    <Layout style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <HtmlView html={topic.description} />
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
  },
});
