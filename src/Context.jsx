/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";

import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/Use-fetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  // fetching the current user
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// function to access the state of our app
export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;