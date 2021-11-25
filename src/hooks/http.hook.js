import { useState, useCallback } from "react";

export const useHttp = () => {
  const [condition, setCondition] = useState("waiting");

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setCondition("loading");

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok)
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);

        const data = await response.json();

        return data;
      } catch (err) {
        setCondition("error");
        throw err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setCondition("loading");
  }, []);

  return { request, clearError, condition, setCondition };
};
