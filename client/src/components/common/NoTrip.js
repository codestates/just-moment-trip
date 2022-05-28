import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import vibepartycat from '../../Assets/vibepartycat.gif';

function NoTrip() {
  const navigate = useNavigate();

  const goHome = () => {
    Swal.fire({
      icon: 'warning',
      title: '여행을 작성하거나 선택해주세요',
      allowOutsideClick: false,
      backdrop: `
      rgba(0,0,110,0.5)
      url(${vibepartycat})
      top
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        navigate('/trip');
      }
    });
  };

  useEffect(() => {
    goHome();
  }, []);

  return <></>;
}

export default NoTrip;
