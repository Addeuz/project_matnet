import axios from 'axios';
import useSWR from 'swr';
import authHeader from '../../services/auth-header';

const fetcher = url =>
  axios.get(url, { headers: authHeader() }).then(res => res.data);

export default function useFetch(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    response: data,
    isLoading: !error && !data,
    isError: error,
  };
}
