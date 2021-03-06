import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import catzzal5 from '../../Assets/catzzal5.gif';
import vibepartycat from '../../Assets/vibepartycat.gif';

function LoginTripMessage({ redirect }) {
  const navigate = useNavigate();
  let title, direction, img;

  if (redirect === '/') {
    title = 'π€·ββοΈ λ‘κ·ΈμΈμ΄ νμν©λλ€';
    direction = 'bottom';
    img = catzzal5;
  } else {
    title = 'μ¬νμ μμ±νκ±°λ μ νν΄μ£ΌμΈμ';
    direction = 'top';
    img = vibepartycat;
  }

  const goHome = () => {
    Swal.fire({
      icon: 'warning',
      title: title,
      allowOutsideClick: false,
      backdrop: `
      rgba(0,0,110,0.5)
      url(${img})
      ${direction}
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        navigate(redirect);
      }
    });
  };

  useEffect(() => {
    goHome();
  }, []);

  return <></>;
}

export default LoginTripMessage;
