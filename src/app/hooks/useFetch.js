import { useEffect, useState } from 'react';
import { fetchApi } from '../lib/fetchApi';

export const useFetch = (url, payload, config) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const memoizedPayload = useMemo(() => payload, [JSON.stringify(payload)]);
  // const memoizedConfig = useMemo(() => config, [JSON.stringify(config)]);

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
