import {Map} from 'immutable';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import passwordValidator from 'password-validator';
import {phoneNumberRegex, emailRegex} from '../utils/regex';
import * as Yup from 'yup';

import languages from '../locales';

let schema = new passwordValidator();

schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(20) // Maximum length 20
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

export function validatorSignIn(data: any, language: any) {
  let errors = Map();
  const t = languages.en;
  const validators = t.validators || {};

  if (
    !data ||
    !data.username ||
    !(
      isEmail(data.username) ||
      (isAlphanumeric(data.username) &&
        isLength(data.username, {min: 6, max: 20}))
    )
  ) {
    errors = errors.set('username', validators.text_user_email);
  }

  if (!data || !data.password || !schema.validate(data.password)) {
    errors = errors.set('password', validators.text_password);
  }

  return errors;
}

export function validatorRegister(isPhone = true) {
  const t = languages.en;
  const validators = t.validators || {};
  return Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .nullable()
      .min(6, validators.text_first_name)
      .max(32, validators.text_first_name)
      .required(validators.text_first_name),
    last_name: Yup.string()
      .trim()
      .nullable()
      .min(6, validators.text_last_name)
      .max(32, validators.text_last_name)
      .required(validators.text_last_name),
    nrc: Yup.string()
      .trim()
      .nullable()
      .min(6, validators.text_nrc)
      .max(20, validators.text_nrc)
      .required(validators.text_nrc),
    account: Yup.string()
      .trim()
      .nullable()
      .min(6, validators.text_accountNumber)
      .max(20, validators.text_accountNumber)
      .required(validators.text_accountNumber),
    // phone_number: Yup.string()
    //   .trim()
    //   .test('phone_number', validators.text_phone, val => {
    //     if (isPhone) {
    //       return phoneNumberRegex.test(val);
    //     }
    //     return true;
    //   }),
    email: Yup.string()
      .trim()
      .nullable()
      .test('email', validators.text_email, val => {
        return emailRegex.test(val);
      })
      .required(validators.text_email),
  });
}

export function validatorLoginMobile(phone: any) {
  const t = languages.en;
  const validators = t.validators || {};

  let errors = Map();

  if (!phone || !isMobilePhone(phone, undefined, {strictMode: true})) {
    errors = errors.set('phone_number', validators.text_phone);
  }

  return errors;
}

export function validatorForgotPassword(email) {
  const t = languages.en;
  const validators = t.validators || {};

  let errors = Map();

  if (!email || !isEmail(email)) {
    errors = errors.set('email', validators.text_email);
  }

  return errors;
}

export function validatorChangePassword(data) {
  const t = languages.en;
  const validators = t.validators || {};

  let errors = Map();

  if (!data || !data.password_old) {
    errors = errors.set('password_old', validators.text_password_old);
  }

  if (!data || !data.password_new || !schema.validate(data.password_new)) {
    errors = errors.set('password_new', validators.text_password);
  }

  if (
    !data ||
    !data.password_confirm ||
    data.password_confirm !== data.password_new
  ) {
    errors = errors.set('password_confirm', validators.text_password_confirm);
  }

  return errors;
}

export function validatorUpdateAccount(data, language) {
  let errors = Map();
  const t = languages.en;
  const validators = t.validators || {};

  if (
    !data ||
    !data.first_name ||
    !isLength(data.first_name, {min: 1, max: 32})
  ) {
    errors = errors.set('first_name', validators.text_first_name);
  }

  if (
    !data ||
    !data.last_name ||
    !isLength(data.last_name, {min: 1, max: 32})
  ) {
    errors = errors.set('last_name', validators.text_last_name);
  }

  if (
    !data ||
    !data.last_name ||
    !isLength(data.last_name, {min: 2, max: 32})
  ) {
    errors = errors.set('last_name', validators.text_last_name);
  }

  if (!data || !data.email || !isEmail(data.email)) {
    errors = errors.set('email', validators.text_email);
  }

  return errors;
}
