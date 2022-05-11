import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LoginMessage() {
  const navigate = useNavigate();
  const goHome = () => {
    Swal.fire({ icon: 'warning', title: '🤷‍♂️ 로그인이 필요합니다' }).then(
      result => {
        if (result.isConfirmed) {
          navigate('/');
        }
      },
    );
  };

  useEffect(() => {
    goHome();
  }, []);

  return <></>;
}

export default LoginMessage;
