import { useEffect, useState } from "react";

const useScrollPosition = () => {
  const [storedValue, setScrolledValue] = useState<string | null>(null);
  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem("scrollPosition");
    setScrolledValue(storedScrollPosition);
  }, []);

  const savedScrollPosition =
    storedValue !== null ? parseInt(storedValue, 10) : 0;

  return { savedScrollPosition };
};

export default useScrollPosition;
