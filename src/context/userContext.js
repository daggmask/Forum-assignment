import React, { createContext, useState} from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const values = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
