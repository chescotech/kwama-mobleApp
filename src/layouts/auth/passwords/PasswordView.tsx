import React, {ReactElement} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {colors} from '../../../components/config';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
import apiClient from '../../../services/http-common';
import {useDispatch} from 'react-redux';

export default (props: any): React.ReactElement => {
  const {navigation} = props;
  const state = navigation.getState();
  const [password, setPassword] = React.useState<string>();
  const [confirmPassword, setConfirmPassword] = React.useState<string>();
  const [err, setErr] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();

  const onSignUpButtonPress = async (): Promise<void> => {
    const userData = state.routes[3].params.data;
    userData.password = password;

    // if(confirmPassword===password){
    //   navigation && navigation.navigate('SignIn');
    // }else{

    // }

    const res = await apiClient
      .post('/user/register', userData, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        console.log(response);
        // dispatch({type: 'user_reducer', payload: response.data});
        if (response) {
          navigation && navigation.navigate('home');
        }
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    // navigation && navigation.navigate('SignUp');

    // console.log(res);
  };

  React.useEffect(() => {
    console.log(state.routes[3].params.data);
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
          accessoryRight={renderPasswordIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
      </Layout>
      <Button
        style={styles.signInButton}
        onPress={() => onSignUpButtonPress()}
        size="medium">
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
});
