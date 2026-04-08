import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export const useSimple = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Record<string, any>>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const params = {
      page,
    };

    try {
      const response = await api.get(url, {
        params,
      });

      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      setErrorStatus(error.response.status);
    } finally {
      setIsLoading(false);
      setLoadMore(false);
    }
  };

  const handleNextPage = () => {
    setLoadMore(true);
    setPage(page + 1);
  };

  return {
    data,
    isLoading,
    error,
    errorStatus,
    handleNextPage,
    loadMore,
    fetchData,
  };
};
