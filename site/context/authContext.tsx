import axios from "axios";
import { useRouter } from "next/router";
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from "react";
import { AuthServices } from "../services/auth.service";

interface User {
  username: string;
  email: string;
  photo: string;
  id: string;
  roles: any;
}

interface ContextProps {
  loading?: boolean;
  user?: object;
  logout?: () => void;
  reloadAuth?: () => void;
  setLoading?: () => void;
  setCurrentUser?: any;
  setUser?: any;
}

export const authContext = createContext<ContextProps>({});

export const AuthProvider = ({ children }: any) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider
      value={{
        user: auth.user,
        loading: auth.loading,
        logout: auth.logout,
        reloadAuth: auth.reloadAuth,
        setUser: auth.setUser,
        setCurrentUser: auth.setCurrentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const logout = async () => {
    await new AuthServices().logout().then(() => {
      setLoading(false);
      setUser(undefined);
      localStorage.clear();
      router.push(`/login`);
    });
  };

  const reloadAuth = async () => {
    await new AuthServices()
      .getCurrentUser({ fresh: true })
      .then(({ data }) => {
        localStorage.setItem("token", data.access_token);
        setCurrentUser(data);
      })
      .catch((e) => {
        setLoading(false);
        setUser(undefined);
      });
  };

  const setCurrentUser = async (data) => {
    setUser({
      ...data,
      email: data.email,
      id: data.id,
      photo: data.photo,
      username: data.username,
    });
  };

  const getCurrentUser = async () => {
    await new AuthServices()
      .getCurrentUser({})
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((e) => {
        setLoading(false);
        setUser(undefined);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    user: user,
    loading,
    setLoading,
    setCurrentUser,
    logout,
    setUser,
    reloadAuth,
  };
}
