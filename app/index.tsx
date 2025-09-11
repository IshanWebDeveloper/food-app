import { useSession } from "@/context";
import { Redirect } from "expo-router";

const Page = () => {
  const { session } = useSession();

  if (session.isAuthenticated)
    return <Redirect href="/(protected)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
