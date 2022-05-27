import React, {ReactElement} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {colors} from '../../../components/config';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import {AxiosError} from 'axios';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAvoidingView} from './extra/3rd-party';
import apiClient from '../../../services/http-common';
import {authSelector} from '../../../redux/reducers/auth/selectors'
import { signInWithEmail } from '../../../redux/reducers/auth/actions';

const PasswordView = (props: any): React.ReactElement => {
  const {navigation} = props;
  const state = navigation.getState();
  const [password, setPassword] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>();
  const [err, setErr] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const LoadingIndicator = (props: any) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = async (): Promise<void> => {
    setIsLoading(true);

    const userData = state.routes[3].params.data;
    userData.password = password;

    const res = await apiClient
      .post('/user/register', userData, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {

        setIsLoading(false);
        props.dispatch(signInWithEmail(response.data));
        // dispatch({type: 'user_reducer', payload: response.data});
        if (response) {
          navigation && navigation.navigate('home');
        }
        return response.data;
      })
      .catch((reason: AxiosError) => {
        setIsLoading(false);
        if (reason.response!.status === 400) {
          // Handle 400
          if (reason.response.data.error) {
            if (reason.response.data.error.errorMsg) {
              showMessage({
                message: reason.response.data.error.errorMsg,
                type: 'danger',
              });
            } else {
              showMessage({
                message: reason.response.data.error.errorMsg,
                type: 'danger',
              });
            }
          }
        } else {
          // Handle else
        }
        // console.log(reason.response!.data!.error);
      });
    // navigation && navigation.navigate('SignUp');

    // console.log(res);
  };

  React.useEffect(() => {
    // console.log(state.routes[3].params.data);
  }, []);

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
      <Layout style={styles.formContainer} level="1">
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          label="Password"
          accessoryRight={renderPasswordIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Confirm Password"
          label="Confirm Password"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
      </Layout>
      <Button
        style={styles.signInButton}
        onPress={() => onSignUpButtonPress()}
        size="medium"
        disabled={isLoading}
        accessoryLeft={isLoading ? LoadingIndicator : <></>}>
        SIGN UP
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
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
    backgroundColor: colors.blueMid,
    marginBottom: 40,
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: { auth: any; }) => {
  return {
    auth: authSelector(state),
  };
};
export default connect(mapStateToProps)(PasswordView);