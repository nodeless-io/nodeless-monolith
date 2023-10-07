import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/is-signed-in");

      const isSignedIn = response.data.signedIn || false;

      setIsLogged(isSignedIn);
    })();
  }, [isLogged]);

  return isLogged;
};

export const checkAuthStatus = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/is-signed-in");

      const isSignedIn = response.data.signedIn || false;

      setIsLogged(isSignedIn);
    })();
  }, [isLogged]);

  return isLogged;
};

export default useAuth;
