import { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    execute();
  }, []);

  return { data, loading, error, refetch: execute };
};
