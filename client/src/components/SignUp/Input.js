import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextField from './TextField';
import { signUp } from '../../modules/Reducers/userReducer';
import jmt from '../../Assets/JMT_logo.png';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  text-align: center;
  width: 400px;
  height: 600px;
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

function SignUpInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(signUp({ email, nickname, password }))
      .unwrap()
      .then(() => {
        Swal.fire({
          backdrop: ` rgba(0,0,110,0.5)`,
          text: '회원가입 성공 !',
        }).then(res => {
          if (res.isConfirmed) navigate('/');
        });
      })
      .catch(err => {
        if (err) {
          Swal.fire({
            backdrop: ` rgba(0,0,110,0.5)`,
            text: '이미 사용중인 이메일 입니다',
          }).then(res => {
            if (res.isConfirmed) actions.resetForm();
          });
        } else {
          Swal.fire({
            backdrop: ` rgba(0,0,110,0.5)`,
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
        email: '',
        nickname: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={signUpRequest}
    >
      {() => (
        <StyledWrapper>
          <Container>
            <img src={jmt} alt="JMT" />
            <Form>
              <TextField label="Email" name="email" type="email" />
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
