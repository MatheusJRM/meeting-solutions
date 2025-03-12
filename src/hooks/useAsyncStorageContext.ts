import { AsyncStorageContext } from "contexts/async-storage-context";
import { useContext } from "react";

export const useAsyncStorageContext = () => {
  const context = useContext(AsyncStorageContext);
  if (!context) {
    throw new Error(
      "useAsyncStorageContext must be used within an AsyncStorageProvider"
    );
  }
  return context;
};
