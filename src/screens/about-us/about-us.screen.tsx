import {Layout, useTheme} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useList} from '@refinedev/core';
import {IWebsiteContent} from '../../interfaces';
import {QueryContainer} from '../../components/containers';
import {emptyImage} from '../../components/svgs';
import HtmlView from '../../components/htmlview/html.view';
import {FocusAwareStatusBar} from '../../components/focus-aware-statusbar';
import {useRoute} from '@react-navigation/native';

export const AboutUsScreen = () => {
  const theme = useTheme();
  const {
    params: {type},
  } = useRoute<any>();

  const abouteState = useList<IWebsiteContent>({
    resource: 'website-contents',
    filters: [
      {
        field: 'type',
        operator: 'eq',
        value: type,
      },
    ],
  });

  const abouts = abouteState?.data?.data || [];

  return (
    <Layout style={styles.container}>
      <FocusAwareStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <QueryContainer
        error={abouteState.error}
        isError={abouteState.isError}
        isLoading={abouteState.isLoading}
        isEmpty={abouts.length === 0}
        emptyViewProps={{
          title: 'No Content added yet',
          imageSource: emptyImage,
        }}>
        {abouts && abouts.length > 0 && (
          <ScrollView style={{flex: 1, height: '100%'}}>
            <HtmlView html={abouts[0].description} />
          </ScrollView>
        )}
      </QueryContainer>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
