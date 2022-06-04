import axios from 'axios';
import changeToken from './changeToken';

const tripCustomApi = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL: 'https://www.just-moment-trip.tk/',
  withCredentials: true,
});

export const requestTripList = async () => {
  const result = await tripCustomApi.get('trip', {
    headers: {
      authorization:
        'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
  });
  changeToken(result);
  return result.data.data;
};

export const requestTripPost = async (
  title,
  country,
  total_price,
  base_currency,
  start_date,
  end_date,
) => {
  const res = await tripCustomApi.post(
    'trip',
    {
      title,
      country,
      total_price,
      base_currency,
      start_date,
      end_date,
    },
    {
      headers: {
        authorization:
          'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
        'Content-Type': 'application/json',
      },
    },
  );
  changeToken(res);
};

export const requestTripDelete = async id => {
  const res = await tripCustomApi.delete(`trip/${id}`, {
    headers: {
      authorization:
        'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
  });
  changeToken(res);

  if (id === JSON.parse(sessionStorage.getItem('trip_id'))) {
    sessionStorage.removeItem('trip_id');
    sessionStorage.removeItem('total_price');
    sessionStorage.removeItem('title');
  }

  window.location.reload();
};

//!
// 서버
