import React, { createContext, useState, useEffect} from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [moderatorSubjects, setModeratorSubjects] = useState([])

  const getMods = async () => {
    await fetch("/api/usersXsubjects")
    .then((res) => res.json())
    .then((data) => setModeratorSubjects(data))
    .catch((error) => console.error(error))
    }

    useEffect(() => {
      getMods()
    },[])

    useEffect(() => {
      console.log(user);
    },[user])

  const values = {
    user,
    setUser,
    moderatorSubjects, 
    setModeratorSubjects
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
