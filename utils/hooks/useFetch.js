import axios from 'axios';
import useSWR from 'swr';
import authHeader from '../../services/auth-header';

export const fetcher = url =>
  axios.get(url, { headers: authHeader() }).then(res => res.data);

export const adress = `http://localhost:3000`;

export default function useFetch(endpoint) {
  const { data, error } = useSWR(`${adress}${endpoint}`, fetcher);

  return {
    response: data,
    isLoading: !error && !data,
    isError: error,
  };
}
