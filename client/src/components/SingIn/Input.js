import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../modules/Reducers/userReducer';
import TextField from '../SignUp/TextField';
import kakaoImg from '../../Assets/kakao_login_medium_wide.png';
import jmt from '../../Assets/JMT_logo.png';
import { KAKAO_AUTH_URL } from '../../routers/index';

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
  height: 500px;
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

const KakaoImg = styled.img`
  cursor: pointer;
`;

function SignInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  });

  const handleClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const signInRequest = (values, actions) => {
    const { email, password } = values;
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '로그인 성공 !',
        }).then(res => {
          if (res.isConfirmed) {
            navigate('/');
          }
        });
      })
      .catch(err => {
        if (err) {
          Swal.fire({
            icon: 'error',
            text: '이메일 또는 비밀번호가 다릅니다',
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
        password: '',
      }}
      validationSchema={validate}
      onSubmit={signInRequest}
    >
      {() => (
        <StyledWrapper>
          <Container>
            <img src={jmt} alt="JMT" />
            <Form>
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <Btn type="submit">Sign In</Btn>
            </Form>
            <KakaoImg src={kakaoImg} alt="" onClick={handleClick} />
          </Container>
        </StyledWrapper>
      )}
    </Formik>
  );
}

export default SignInput;
