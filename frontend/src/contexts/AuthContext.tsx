import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from '../lib/api';

type CustomerAuthContextData = {
  user: User | null
  signInUrl: string
  isSigned: boolean
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
}

type User = {
  name: string
  profile_pic: string
}

type SignInData = {
  code: string
}

type UserAuthContextProviderProps = {
  children?: ReactNode
}


export const AuthContext = createContext<CustomerAuthContextData>({} as CustomerAuthContextData);

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

export const AuthContextProvider = ({ children }: UserAuthContextProviderProps) => {
  const [user, setUser] = useState<User>({} as User)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}`;

  useEffect(() => {
    const loadStorageData = () => {
      const storageName = localStorage.getItem('@dev-hub:name');
      const storageProfilePic = localStorage.getItem('@dev-hub:profile_pic');

      if (storageName && storageProfilePic) {
        setUser({
          name: storageName,
          profile_pic: storageProfilePic
        });
      }
    }

    loadStorageData();
  }, [])

  useEffect(() => {
    const currentUrl = window.location.href;
    const hasCodeInUrl = currentUrl.includes('?code=');

    if (hasCodeInUrl) {
      const [url, code] = currentUrl.split('?code=');
      signIn({code});
    }
  }, [])

  const signIn = async ({ code }: SignInData) => {
    try { 
      const response = await api.post('/users', {
        code,
      })

      localStorage.setItem('@devhub:token', response.data.access_token);
      localStorage.setItem('@dev-hub:name', response.data.user.name);
      localStorage.setItem('@dev-hub:profile_pic', response.data.user.profile_pic);
    }
    catch (error) {
      console.log(error)
    }
  };

  const signOut = () => {
    localStorage.removeItem('@devhub:token');
    localStorage.removeItem('@dev-hub:name');
    localStorage.removeItem('@dev-hub:profile_pic');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, signInUrl, user, isSigned: !!user }}>
      { children }
    </AuthContext.Provider>
  )
}