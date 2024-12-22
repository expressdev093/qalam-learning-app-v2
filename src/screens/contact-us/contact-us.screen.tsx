import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import {
  RootStackNavigationProp,
  RootStackScreenProps,
} from '../../navigations/root/types';
import {RouteNames} from '../../navigations/constants/route.name';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {LoadingButton} from '../../components/buttons';
import {InputField} from '../../components/inputs';
import {StatusBar} from 'react-native';
import {ThemeColorKey} from '../../constants/colors';

interface FormProps {
  name: string;
  subject: string;
  email: string;
  message: string;
}

const initialValues: FormProps = {
  name: '',
  subject: '',
  email: '',
  message: '',
};

export const ContactUsScreen: React.FC<
  RootStackScreenProps<RouteNames.contactUs>
> = ({navigation}) => {
  const theme = useTheme();
  const form = useForm<FormProps>({
    defaultValues: initialValues,
  });
  const styles = useStyleSheet(themedStyle);

  const onSubmit = (values: FormProps) => {};

  return (
    <FormProvider {...form}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={theme[ThemeColorKey.backgroundBasicColor1]}
          barStyle={'dark-content'}
        />
        <View style={styles.backButtonView}>
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            labelStyle={false}
          />
        </View>
        <Layout style={styles.layout}>
          <Text category="h2" style={styles.heading1}>
            Contact Us
          </Text>
          <View style={{marginTop: 40, width: '100%'}}>
            <InputField
              name="name"
              label="Name"
              placeholder="Name"
              rules={{
                required: 'Name is required',
              }}
            />
            <InputField
              name="subject"
              label="Subject"
              placeholder="Subject"
              rules={{
                required: 'Subject is required',
              }}
            />
            <InputField
              name="subject"
              label="Subject"
              placeholder="Subject"
              rules={{
                required: 'Subject is required',
              }}
            />
            <InputField
              name="email"
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for basic email validation
                  message: 'Please enter a valid email', // Error message for invalid email
                },
              }}
            />
            <InputField
              name="message"
              label="Message"
              placeholder="Message"
              rules={{
                required: 'Message is required',
              }}
            />
            <LoadingButton
              loading={false}
              onPress={form.handleSubmit(onSubmit)}
              style={{marginTop: 20}}>
              Submit
            </LoadingButton>
          </View>
        </Layout>
      </SafeAreaView>
    </FormProvider>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  backButtonView: {
    paddingHorizontal: 20,
  },
  heading1: {
    color: 'color-primary-500',
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
  },
});
