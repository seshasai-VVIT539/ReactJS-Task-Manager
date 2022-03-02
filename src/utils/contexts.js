import React from "react";

export const TokenContext = React.createContext();

export const useTokenContext = () => React.useContext(TokenContext);