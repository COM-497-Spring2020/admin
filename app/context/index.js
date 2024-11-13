"use client";

import { createContext, useState } from "react";

export const MyContext = createContext();

const Context = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <MyContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
