import { defaultQueryFn } from "@/lib/default-query-fn";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SuperJson from "superjson";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000, // 1 minute
      },
      mutations: {
        retry: 1,
      },
      dehydrate: {
        serializeData: SuperJson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJson.deserialize,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = makeQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
