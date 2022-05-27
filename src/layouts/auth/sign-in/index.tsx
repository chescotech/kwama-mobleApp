import React, {ReactElement} from 'react';
import {View, TouchableWithoutFeedback, Image, Dimensions} from 'react-native';
import {Formik} from 'formik';
import {Text} from '@ui-kitten/components';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {margin} from '../../../components/config/spacing';
import apiClient from '../../../services/http-common';
import {useDispatch} from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const height = Dimensions.get('window').height;

export default ({navigation}): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onSignInButtonPress = async (): Promise<void> => {
    const userData = {email, password};
    const res = await apiClient
      .post('/user/login', userData, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        // console.log(response);
        // dispatch({type: 'user_reducer', payload: response.data});
        if (response) {
          navigation && navigation.navigate('home');
        }
        return response.data;
      })
      .catch(error => {
        showMessage({
          message: "Incorrect username or password.",
          type: 'danger',
        });
        // console.log(error);
      });
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.stretch}
          source={require('./assets/stanbic-log-small2.png')}
        />
        <Text category="h6" style={styles.textAccount}>
          Kwama
        </Text>
        <Text category="s1" style={styles.footnote}>
          Powered by Stanbic Bank
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Email"
          accessoryRight={
            <Icon
              style={styles.icon}
              fill="#8F9BB3"
              name="person-add-outline"
            />
          }
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          accessoryRight={renderPasswordIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={onForgotPasswordButtonPress}>
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button
        style={styles.signInButton}
        onPress={onSignInButtonPress}
        size="medium">
        SIGN IN
      </Button>
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}>
        Don't have an account? Create
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  imageBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: height / 6.5,
    marginBottom: 30,
  },
  stretch: {
    width: 116,
    height: 133,
  },
  textForgot: {
    textAlign: 'center',
  },
  footnote: {
    marginTop: -14,
  },
  viewOr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divOr: {
    flex: 1,
  },
  textOr: {
    marginHorizontal: margin.base,
  },
  textAccount: {
    textAlign: 'center',
    marginBottom: margin.base,
  },
  margin: {
    marginVertical: margin.big,
  },
  viewSocial: {
    marginBottom: margin.big,
  },
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
