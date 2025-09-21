import { AuthContext } from "@/context/authContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

const Index = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Redirect href="/(protected)/(home)" />;
  }

  return <Redirect href="/welcome" />;
};

export default Index;
