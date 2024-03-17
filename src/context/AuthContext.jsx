import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, deletedRequest, showsRequest, updateRequest,showOneRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [user,setUser] = useState(null)

  const registerUser = async (data) => await registerRequest(data);
  const updateUser = async (id,data) => {
    console.log(id,data);
    await updateRequest(id,data)};
  const deleteUser = async (id) => {
    try {
      await deletedRequest(id);
    } catch (error) {
      console.log(error);
    }
  };
  const onlyOne = async (id) => {
    try {
      const resp =await showOneRequest(id)
      setUser(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(()=>{
      const fetchUsers = async () => {
        const response = await showsRequest();
        setUsers(response.data);
      };
      fetchUsers();
    })

  return (
    <AuthContext.Provider
      value={{
        users,
        user,
        registerUser,
        updateUser,
        deleteUser,
        onlyOne
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
