import React from "react";

export const TokenContext = React.createContext();
export const LogoutContext = React.createContext();

export const useTokenContext = () => React.useContext(TokenContext);
export const useLogoutContext = () => React.useContext(LogoutContext);