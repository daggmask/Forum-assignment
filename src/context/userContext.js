import React, { createContext, useState, useEffect} from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isMod, setIsMod] = useState(false)

  const values = {
    user,
    setUser,
    isMod, 
    setIsMod
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
