import axios from 'axios';
import tokenHeader from './headers';

const tripCustomApi = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: tokenHeader(),
  'Content-Type': 'application/json',
});

export const requestTripList = () => {
  tripCustomApi.get('trip').then(res => {
    console.log(res.data);
    return res.data;
  });
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
