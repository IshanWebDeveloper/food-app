import { useEffect, useState } from "react";
import { useQueryClient, QueryKey, QueryFunction } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";

/**
 * useDataPreloader
 * Preloads data for given queries using React Query, useful for prefetching data across the app.
 *
 * @param queries Array of objects: { key: QueryKey, fetcher: QueryFunction, options?: object }
 * Example:
 * useDataPreloader([
 *   { key: ['user', userId], fetcher: () => fetchUser(userId) },
 *   { key: ['posts'], fetcher: fetchPosts }
 * ])
 */
type PreloadQuery = {
  key: QueryKey;
  fetcher: QueryFunction<unknown, QueryKey>;
  options?: object;
};

export function useDataPreloader(queries: PreloadQuery[]): {
  prefetching: boolean;
} {
  const queryClient = useQueryClient();
  const [prefetching, setPrefetching] = useState(false);

  useEffect(() => {
    if (queries.length === 0) return;
    setPrefetching(true);
    Promise.all(
      queries.map(({ key, fetcher, options }) =>
        queryClient.prefetchQuery({
          queryKey: key,
          queryFn: fetcher,
          ...options,
        }),
      ),
    )
      .catch((err) => {
        console.error("Error prefetching data:", err);
        ToastAndroid.show(
          "Failed to prefetch data. Please try again.",
          ToastAndroid.SHORT,
        );
      })
      .finally(() => {
        setPrefetching(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queries)]);

  return { prefetching };
}
