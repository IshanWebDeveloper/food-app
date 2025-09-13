import { AuthContext } from "@/context/authContext";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Redirect } from "expo-router";
import { useContext, useEffect } from "react";

const index = () => {
  // get auth from storage
  const { isLoggedIn, authState, isReady } = useAuthStore();
  console.log(
    "authState in index.tsx:",
    authState,
    isLoggedIn,
    "isReady:",
    isReady
  );

  if (isLoggedIn && isReady) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return <Redirect href="/welcome" />;
};

export default index;
