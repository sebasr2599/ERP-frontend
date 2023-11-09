import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  accessToken: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  setUserInfo: (info: UserInfo) => void;
}

interface UserInfo {
  accessToken: string;
  firstName: string;
  lastName: string;
  role: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
interface IProps {
  children: React.ReactNode;
}
export const UserProvider = ({ children }: IProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const value: UserContextType = {
    accessToken: userInfo?.accessToken || null,
    firstName: userInfo?.firstName || null,
    lastName: userInfo?.lastName || null,
    role: userInfo?.role || null,
    setUserInfo: (info: UserInfo) => setUserInfo(info),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
