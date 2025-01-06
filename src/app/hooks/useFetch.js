import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/fetchApi';

export const useFetch = (url, payload, config) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchApi(url, payload, config);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    })();
  }, [url, payload, config]);

  return { data, loading, error };
};
