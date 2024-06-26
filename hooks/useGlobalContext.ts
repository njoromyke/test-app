import { GlobalContext } from "@/context";
import { useContext } from "react";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) throw new Error("useAuthContext context must be use inside AuthProvider");

  return context;
};
