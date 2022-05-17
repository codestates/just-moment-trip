import axios from 'axios';
import tokenHeader from './headers';

const tripCustomApi = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: 'https://www.just-moment-trip.tk/',
  headers: tokenHeader(),
  'Content-Type': 'application/json',
  withCredentials: true,
});

export const requestTripList = async () => {
  const result = await tripCustomApi.get('trip');
  return result.data.data;
};

export const requestTripPost = (
  title,
  country,
  total_price,
  base_currency,
  start_date,
  end_date,
) => {
  tripCustomApi.post('trip', {
    title,
    country,
    total_price,
    base_currency,
    start_date,
    end_date,
  });
};

export const requestTripDelete = id => {
  tripCustomApi
    .delete(`trip/${id}`)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};
