import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextField from './TextField';
import { signUp } from '../../modules/Reducers/userReducer';
import jmt from '../../Assets/JMT_logo.png';
import { sendCode, sendEmail } from '../../services/sign';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  text-align: center;
  width: 450px;
  height: 90vh;
  margin: 1rem auto;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);

  & > form {
    padding-top: 20px;
  }
  @media (max-width: 600px) {
    .Container {
      border-radius: 0px;
    }
  }
`;

const Btn = styled.button`
  cursor: pointer;
  border-radius: 2em;
  color: #fff;
  background: linear-gradient(to right, #9c27b0, #e040fb);
  border: 0;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-family: 'Ubuntu', sans-serif;
  font-size: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  text-align: center;
`;

const VerifyBtn = styled.div`
  cursor: pointer;
  border-radius: 2em;
  color: #fff;
  background-color: black;
  border: 0;
  font-family: 'Ubuntu', sans-serif;
  font-size: 23px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  width: 10%;
  height: 5%;
  margin: 0 auto 10px auto;
  text-align: center;
`;

function SignUpInput() {
  const [mailSent, setMailSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pwdReg = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

  const codeOnChange = e => {
    setCode(e.target.value);
  };

  const emailOnChange = e => {
    setEmail(e.target.value);
  };

  const emailOnClick = async () => {
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      return Swal.fire({
        icon: 'error',
        text: '제대로된 이메일을 입력해주세요',
      });
    }

    try {
      await sendEmail(email);
      setMailSent(true);
      return Swal.fire({
        icon: 'success',
        text: '이메일을 확인하여 코드를 입력하여 인증받아주세요',
      });
    } catch {
      return Swal.fire({
        icon: 'error',
        text: '벌써 존재하는 이메일입니다',
      });
    }
  };

  const codeOnClick = async () => {
    try {
      await sendCode(email, code);
      setVerified(true);
      return Swal.fire({
        icon: 'success',
        text: '인증되셨습니다 회원가입을 진행해주세요',
      });
    } catch {
      return Swal.fire({
        icon: 'error',
        text: '코드를 다시 확인해주세요',
      });
    }
  };

  const validate = Yup.object({
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
    const { nickname, password } = values;
    console.log(email);

    dispatch(signUp({ email, nickname, password }))
      .unwrap()
      .then(res => {
        Swal.fire({
          icon: 'success',
          text: '회원가입 성공 !',
        }).then(res => {
          if (res.isConfirmed) navigate('/');
        });
      })
      .catch(err => {
        const message = err.message.split(' ');
        if (message[message.length - 1] === '409') {
          Swal.fire({
            icon: 'error',
            text: '이미 사용중인 이메일 입니다',
          }).then(res => {
            if (res.isConfirmed) actions.resetForm();
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: '회원가입에 실패 하셨습니다',
          }).then(res => {
            if (res.isConfirmed) actions.resetForm();
          });
        }
      });
  };

  return (
    <Formik
      initialValues={{
        email: email,
        nickname: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={
        verified
          ? signUpRequest
          : mailSent
          ? null
          : () =>
              Swal.fire({
                icon: 'error',
                text: '이메일 인증을 먼저 받으세요',
              })
      }
    >
      {() => (
        <StyledWrapper>
          <Container>
            <img src={jmt} alt="JMT" />
            <Form>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={emailOnChange}
                disabled={mailSent ? true : false}
              />
              {mailSent ? (
                <>
                  <TextField
                    label="Code"
                    name="code"
                    type="text"
                    onChange={codeOnChange}
                    disabled={verified ? true : false}
                  />
                  {verified ? null : (
                    <VerifyBtn
                      style={{ fontSize: '15px' }}
                      onClick={codeOnClick}
                    >
                      Verify
                    </VerifyBtn>
                  )}
                </>
              ) : (
                <VerifyBtn onClick={emailOnClick}>✉️</VerifyBtn>
              )}
              <TextField label="NickName" name="nickname" type="text" />
              <TextField label="Password" name="password" type="password" />
              <TextField
                label="Confirm-Password"
                name="confirmPassword"
                type="password"
              />
              <Btn type="submit">Sign Up</Btn>
            </Form>
          </Container>
        </StyledWrapper>
      )}
    </Formik>
  );
}

export default SignUpInput;
