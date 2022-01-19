import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      setUser(supabase.auth.user());
    });
  }, []);

  const login = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    login,
    logout
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
