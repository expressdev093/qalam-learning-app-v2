import {useNavigation, useRoute} from '@react-navigation/native';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import {BASE_URL} from '@env';
import {RootStackScreenProps} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {useOne} from '@refinedev/core';
import {IPastPaper} from '../../interfaces';
import {QueryContainer} from '../../components/containers';
import {emptyImage} from '../../components/svgs';
import HtmlView from '../../components/htmlview/html.view';

export const PastPaperShowScreen: React.FC<
  RootStackScreenProps<RouteNames.pastPaperShow>
> = ({route, navigation}) => {
  const styles = useStyleSheet(themedStyle);

  const {
    params: {pastPaperId},
  } = route;

  const pastPaperState = useOne<IPastPaper>({
    resource: 'past-papers',
    id: pastPaperId,
  });

  const pastPaper = pastPaperState.data?.data;

  useEffect(() => {
    if (pastPaper) {
      navigation.setOptions({
        headerTitle: `${pastPaper.name} (${pastPaper.year})`,
      });
    }
  }, [navigation, pastPaper]);

  const source = {uri: BASE_URL + '/' + pastPaper?.url, cache: true};

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <QueryContainer
        error={pastPaperState.error}
        isError={pastPaperState.isError}
        isLoading={pastPaperState.isLoading}
        isEmpty={pastPaperState.isFetched && pastPaper === undefined}
        emptyViewProps={{
          title: 'No past paper found',
          imageSource: emptyImage,
        }}>
        <Layout style={styles.container}>
          <Text style={styles.label}>Title</Text>
          <Text>{pastPaper?.name}</Text>
          <HtmlView html={pastPaper?.description} />
          {/* {pastPaper && (
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          )} */}
        </Layout>
      </QueryContainer>
    </ScrollView>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paperContainer: {
    backgroundColor: '#339FFA20',
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: 'color-primary-500',
  },
  heading: {
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  pdf: {
    flex: 1,
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width - 40,
    height: '100%',
  },
});
