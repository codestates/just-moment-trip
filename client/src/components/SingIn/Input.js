import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signIn } from '../../modules/Reducers/userReducer';
import TextField from '../SignUp/TextField';
import kakaoImg from '../../Assets/kakao_login_medium_wide.png';
import { KAKAO_AUTH_URL } from '../../routers/index';

const Container = styled.div`
  text-align: center;
`;

const HeadTag = styled.h1`
  text-align: center;
`;

const Btn = styled.button``;

const KakaoBtn = styled.button``;

function SignInput() {
  const dispatch = useDispatch();
  const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Required'),
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

  const handleClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const signInRequest = (values, actions) => {
    const { email, password } = values;
    console.log(values);
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(res => {
        console.log(res);
        actions.setSubmittings(false);
        alert('Success');
      })
      .catch(err => {
        if (err.response.status === 400) {
          actions.resetForm();
          alert(`Email or Password is worng`);
        }
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={signInRequest}
    >
      {() => (
        <Container>
          <HeadTag>Sign-Up</HeadTag>
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <Btn type="submit">SignIn</Btn>
          </Form>
          <KakaoBtn onClick={handleClick}>
            <img src={kakaoImg} alt="" />
          </KakaoBtn>
        </Container>
      )}
    </Formik>
  );
}

export default SignInput;
