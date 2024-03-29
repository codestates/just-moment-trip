import axios from 'axios';
import changeToken from './changeToken';

const tripCustomApi = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/`,
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
  exchange_rate,
  target_currency,
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
      exchange_rate,
      target_currency,
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

export const requestTripPatch = async (id, new_total_price) => {
  const respone = await tripCustomApi.patch(
    `trip/${id}`,
    { new_total_price },
    {
      headers: {
        authorization:
          'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(respone);
  changeToken(respone);
  return respone;
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
    sessionStorage.removeItem('exchange_rate');
    sessionStorage.removeItem('target_currency');
  }

  window.location.reload();
};

//!
// 서버
