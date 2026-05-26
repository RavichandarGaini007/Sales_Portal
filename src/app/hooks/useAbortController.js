import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage AbortController for fetch requests
 * Automatically aborts pending requests when component unmounts
 * 
 * Usage:
 * const getAbortSignal = useAbortController();
 * 
 * useEffect(() => {
 *   fetchApi(url, data, { signal: getAbortSignal() });
 * }, []);
 */
export const useAbortController = () => {
  const abortControllerRef = useRef(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return () => abortControllerRef.current?.signal;
};

/**
 * Custom hook for managing async data fetching with abort support
 * 
 * Usage:
 * const { data, loading, error } = useAsync(
 *   () => fetchApi(url, payload),
 *   [dependency]
 * );
 */
export const useAsync = (asyncFunction, dependencies = []) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const abortControllerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    abortControllerRef.current = new AbortController();

    (async () => {
      try {
        setState({ loading: true, data: null, error: null });
        const response = await asyncFunction(abortControllerRef.current.signal);

        if (isMounted) {
          setState({ loading: false, data: response, error: null });
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          setState({ loading: false, data: null, error });
        }
      }
    })();

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, dependencies);

  return state;
};
