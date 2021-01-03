import React from "react";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import userApi from '../api/userApi';
import config from "../config/Config";

export default (props) => {
  const [listUserOnline, setListUserOnline] = useState([]);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    date: new Date(),
    isAdmin: false,
  });
  const [error, setError] = useState('');
  const { name, username, email, date, isAdmin } = user;


  const handleResetError = () => {
    setError('');
  }

  const handleSaveUser = (fetchUser) => {
    setUser({
      name: fetchUser.name,
      username: fetchUser.username,
      email: fetchUser.email,
      isAdmin: fetchUser.isAdmin,
      date: fetchUser.date,
    })
  }

  const handleChangeProfile = async (newName, newEmail, newUserName) => {
    try {
      const userUpdate = await userApi.updateProfile(newName, newEmail, newUserName);
      setUser({
        name: userUpdate.name,
        username: userUpdate.username,
        email: userUpdate.email,
        isAdmin: userUpdate.isAdmin,
        date: userUpdate.date,
      });
    } catch (err) {
      console.log(err.response.data)
      // console.log("header: Failed to update profile: ", err);
      // if (!err.response) setError("Server is closed");
      // else setError(err.response.data);
    }
  }

  const handleUpdateImage = () => {

  }
  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await userApi.changePassword(oldPassword, newPassword);
    } catch (err) {
      setError(err.response.data);
      // console.log("header: Failed to update profile: ", err);
      // if (!err.response) setError("Server is closed");
      // else setError(err.response.data);
    }
  }
  return (
    <UserContext.Provider
      value={{
        listUserOnline,
        user,
        error,
        handleResetError,
        handleSaveUser,
        setListUserOnline,
        handleUpdateImage,
        handleChangeProfile,
        handleChangePassword
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
