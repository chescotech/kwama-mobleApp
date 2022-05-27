import React, {ReactElement, useReducer} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../../../components/config';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  Text,
  Datepicker,
} from '@ui-kitten/components';
import PhoneInput from 'react-native-phone-number-input';
// import PhoneInput from 'react-phone-number-input/react-native-input';
import moment from 'moment';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {margin} from '../../../components/config/spacing';
import Header from '../../../components/header/Header';
import {validatorRegister} from '../../../helpers/Validators';

import languages from '../../../locales';
import {customerData} from '../../../redux/reducers/UserReducer';
import UserDefualts from '../../../redux/reducers/UserReducer';
import {userTempData} from '../../../redux/actions/authActions';

export default (props: any): React.ReactElement => {
  const {navigation} = props;

  const t = languages.en;
  const validators = t.validators || {};
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [date, setDate] = React.useState(new Date());
  const [dateErr, setDateErr] = React.useState('');
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState({
    first_name: '',
    last_name: '',
    nrc: '',
    account: '',
    email: '',
  });
  const [formattedValue, setFormattedValue] = React.useState('');
  const phoneInput = React.useRef<PhoneInput>(null);

  const now = new Date();
  const min = new Date(1930, 1, 1);
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const dispatch = useDispatch();
  // const [state, dispatch] = useReducer(customerData, UserDefualts);

  const styles = useStyleSheet(themedStyles);

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const validateDob = (value: any) => {
    setDate(value);
    var years = moment().diff(value, 'years');

    if (years < 18) {
      setDateErr(validators.text_dob);
    } else {
      setDateErr('');
    }
  };

  const CalendarIcon = (props: any) => <Icon {...props} name="calendar" />;

  const handleSubmitRegister = async (values: any) => {
    var years = moment().diff(date, 'years');
    if (years < 18) {
      setDateErr(validators.text_dob);
    } else {
      var allUserData = values;
      allUserData.dob = date;
      allUserData.phone = value;

      dispatch(customerData(allUserData));

      navigation && navigation.navigate('PhotoId', {allUserData});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header
        title="Sign Up"
        titlePosition="center"
        subtitle="Fill in all the requierd fields"
        alignment="center"
        showTitle={true}
        backIconOnclick={() => {
          navigation.goBack();
        }}
      />
      <Formik
        initialValues={data}
        validationSchema={validatorRegister()}
        onSubmit={va => {
          handleSubmitRegister(va);
        }}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          handleBlur,
          touched,
        }) => {
          return (
            <Layout style={styles.formContainer} level="1">
              <Input
                placeholder="Frist Name"
                label="Frist Name"
                style={styles.Input}
                status={errors.first_name ? 'danger' : 'basic'}
                accessoryRight={
                  <Icon
                    style={styles.icon}
                    fill="#8F9BB3"
                    name="person-add-outline"
                  />
                }
                value={values.first_name}
                onBlur={handleBlur('first_name')}
                onChangeText={handleChange('first_name')}
                caption={touched.first_name ? errors.first_name : ''}
              />
              <Input
                placeholder="Last Name"
                label="Last Name"
                style={styles.Input}
                status={errors.last_name ? 'danger' : 'basic'}
                accessoryRight={
                  <Icon
                    style={styles.icon}
                    fill="#8F9BB3"
                    name="person-add-outline"
                  />
                }
                value={values.last_name}
                onBlur={handleBlur('last_name')}
                onChangeText={handleChange('last_name')}
                caption={touched.last_name ? errors.last_name : ''}
              />
              <Input
                placeholder="Email"
                label="Email"
                style={styles.Input}
                status={errors.email ? 'danger' : 'basic'}
                accessoryRight={
                  <Icon
                    style={styles.icon}
                    fill="#8F9BB3"
                    name="email-outline"
                  />
                }
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={value => setFieldValue('email', value)}
                caption={touched.email ? errors.email : ''}
              />

              <Datepicker
                label="Date of birth"
                style={styles.Input}
                max={tomorrow}
                min={min}
                date={date}
                onSelect={nextDate => {
                  validateDob(nextDate);
                }}
                accessoryRight={CalendarIcon}
                status={dateErr === '' ? 'basic' : 'danger'}
                caption={dateErr}
              />
              <Text
                category={'label'}
                style={{
                  marginBottom: 0,
                  marginTop: 3,
                  padding: 0,
                  color: '#A0AABE',
                }}>
                Phone Number
              </Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="ZM"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                onChangeCountry={() => {}}
                withDarkTheme
                containerStyle={styles.phoneInputContener}
                textInputStyle={styles.textContainerStyle}
                codeTextStyle={styles.codeTextStyle}
              />

              <Input
                placeholder="NRC Number"
                label="NRC Number"
                style={styles.Input}
                status={errors.nrc ? 'danger' : 'basic'}
                accessoryRight={
                  <Icon
                    style={styles.icon}
                    fill="#8F9BB3"
                    name="lock-outline"
                  />
                }
                value={values.nrc}
                onBlur={handleBlur('nrc')}
                onChangeText={value => setFieldValue('nrc', value)}
                caption={touched.nrc ? errors.nrc : ''}
              />
              <Input
                placeholder="Account Number"
                label="Account Number"
                style={[styles.Input, {marginBottom: 20}]}
                status={errors.account ? 'danger' : 'basic'}
                accessoryRight={
                  <Icon
                    style={styles.icon}
                    fill="#8F9BB3"
                    name="credit-card-outline"
                  />
                }
                value={values.account}
                onBlur={handleBlur('account')}
                onChangeText={value => setFieldValue('account', value)}
                caption={touched.account ? errors.account : ''}
              />
              <View>
                <Button
                  onPress={() => handleSubmit()}
                  style={styles.signInButton}
                  size="medium">
                  Next
                </Button>
                <Button
                  style={styles.signUpButton}
                  appearance="ghost"
                  status="basic"
                  onPress={onSignInButtonPress}>
                  Already have an account? SignIn
                </Button>
              </View>
            </Layout>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  imageBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
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
    paddingTop: 4,
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
  Input: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  icon: {
    width: 32,
    height: 32,
  },
  phoneInputContener: {
    borderColor: '#E9EDF4',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F7F9FC',
    marginTop: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
    width: '100%',
  },
  textContainerStyle: {
    height: 38,
  },
  codeTextStyle: {
    height: 38,
    paddingTop: 5,
  },
  phoneInnerLabel: {
    marginTop: 5,
    marginLeft: 15,
  },
});
