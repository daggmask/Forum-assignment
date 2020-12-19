import React, { createContext, useEffect, useState, useContext } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  // const fetchUser = async () => {
  //   let res = await fetch("/api/v1/users/whoami");
  //   try {
  //     if (res.ok) {
  //       res = await res.json();
  //       setUser(res);
  //     } else {
  //       console.log("else: ", res);
  //       setUser(null);
  //     }
  //   } catch {}
  // };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const values = {
    user,
    // fetchUser,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
