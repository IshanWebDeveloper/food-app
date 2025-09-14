import { useAuthStore } from "@/hooks/useAuthStore";
import { Redirect } from "expo-router";

const index = () => {
  // get auth from storage
  const { isLoggedIn, isReady } = useAuthStore();

  if (isLoggedIn && isReady) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return <Redirect href="/welcome" />;
};

export default index;
