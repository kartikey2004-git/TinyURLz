import { useState } from "react";

// custom hook humara ek callback function le rha as a argument
const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // spread operators se arguments spread krliye
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(options, ...args);
      setData(response);
      setError(null)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;

// cb is callback function
