import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import TextField from './TextField';
import { signUp } from '../../modules/Reducers/userReducer';

const Container = styled.div`
  text-align: center;
`;

const HeadTag = styled.h1`
  text-align: center;
`;

const Btn = styled.button``;

function SignUpInput() {
  const dispatch = useDispatch();
  const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Required'),
    nickname: Yup.string()
      .min(1, '닉네임을 입력해주세요')
      .max(16, '닉네임은 16자까지 입력할 수 있습니다')
      .required('Nickname is required'),
    password: Yup.string()
      .min(
        6,
        '비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.',
      )
      .matches(
        pwdReg,
        '비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.',
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .matches(
        pwdReg,
        '비밀번호는 최소 하나의 문자 및 하나의 숫자로 8자 이상이여야 합니다.',
      )
      .required('Confirm password is required'),
  });

  const signUpRequest = (values, actions) => {
    const { email, nickname, password } = values;
    console.log(values);
    dispatch(signUp({ email, nickname, password }))
      .unwrap()
      .then(res => {
        console.log(res);
        actions.setSubmittings(false);
        alert('Thanks');
      })
      .catch(err => {
        if (err.response.status === 409) {
          actions.resetForm();
          alert(`Email elready exist`);
        } else {
          actions.resetForm();
          alert(`Failed to sign up please try again`);
        }
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        nickname: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={signUpRequest}
    >
      {() => (
        <Container>
          <HeadTag>Sign-Up</HeadTag>
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField label="NickName" name="nickname" type="text" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Confirm-Password"
              name="confirmPassword"
              type="password"
            />
            <Btn type="submit">SignUp</Btn>
          </Form>
        </Container>
      )}
    </Formik>
  );
}

export default SignUpInput;
