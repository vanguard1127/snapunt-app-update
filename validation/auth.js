import * as Yup from 'yup';
import $t from '@i18n';

export const signInValidationRules = Yup.object().shape({
  email: Yup.string()
    .required($t('validation.emailIsRequired'))
    .email($t('validation.mustBeValidEmail')),
  password: Yup.string()
    .required($t('validation.passwordIsRequired'))
    .min(8, $t('validation.passwordMinCharacters'))
});

export const signUpValidationRules = Yup.object().shape({
  full_name: Yup.string().required($t('validation.firstNameIsRequired')),
  // last_name: Yup.string().required($t('validation.lastNameIsRequired')),
  // username: Yup.string().required("Username is required"),
  email: Yup.string()
    .required($t('validation.emailIsRequired'))
    .email($t('validation.mustBeValidEmail')),
  password: Yup.string()
    .required($t('validation.passwordIsRequired'))
    .min(8, $t('validation.passwordMinCharacters')),
  // confirm_password: Yup.string()
  // .required("Please confirm your password")
  // .min(8, $t('validation.passwordMinCharacters'))
  // .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // terms: Yup
  //   .boolean()
  //   .oneOf([true], 'Must accept terms and conditions'),
  // day: Yup.number().required(),
  // month: Yup.number().required(),
  // year: Yup.number().required()
  // confirm_password: Yup.string()
  //   .required($t('validation.confirmPasswordIsRequired'))
  //   .min(8, $t('validation.confirmPasswordMinCharacters'))
  //   .oneOf([Yup.ref('password'), null], $t('auth.passwordsMustMatch'))
});

export const forgotPasswordValidationRules = Yup.object().shape({
  email: Yup.string()
    .required($t('validation.emailIsRequired'))
    .email($t('validation.mustBeValidEmail'))
});

export const verificationValidationRules = Yup.object().shape({
  code: Yup.string()
    .required("Please enter verification code")
    .length(4, "Please enter 4 digit code")
});

export const resetPasswordValidationRules = Yup.object().shape({
  password: Yup.string()
    .required($t('validation.passwordIsRequired'))
    .min(8, $t('validation.passwordMinCharacters')),
  password_confirmation: Yup.string()
    .required($t('validation.confirmPasswordIsRequired'))
    .min(8, $t('validation.confirmPasswordMinCharacters'))
    .oneOf([Yup.ref('password'), null], $t('auth.passwordsMustMatch'))
});
