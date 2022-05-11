import axios from 'axios';
import tokenHeader from './headers';

const tripCustomApi = axios.create({
  baseURL: 'https://www.just-moment-trip.tk/',
  headers: tokenHeader(),
  'Content-Type': 'application/json',
  withCredentials: true,
});

export const requestTripList = async () => {
  const result = await tripCustomApi.get('trip');
  console.log(result);
  return result;
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
