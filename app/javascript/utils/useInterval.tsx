import { useEffect } from "react";

function useInterval(callback: Function, delay: number) {
  useEffect(() => {
    const interval = setInterval(() => callback(), delay);
    return () => clearInterval(interval);
  }, [callback, delay]);
}

export default useInterval;
