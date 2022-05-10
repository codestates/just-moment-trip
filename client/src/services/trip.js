import axios from 'axios';
import tokenHeader from './headers';

const tripCustomApi = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: tokenHeader(),
  'Content-Type': 'application/json',
});

export const requestTripList = () => {
  tripCustomApi.get('trip');
};
