import axiosClient from "./axiosClient";

const userApi = {
  login: (userName, password) => {
    const url = "/user/login";
    return axiosClient.post(url, { username: userName, password: password });
  },

  register: (email, userName, fullName, password) => {
    const url = "/user/register";
    return axiosClient.post(url, {
      username: userName,
      password: password,
      name: fullName,
      email: email,
    });
  },

  updateProfile: (newName, newEmail, newUserName) => {
    const url = `/user/update`;
    return axiosClient.put(url, {
      newName: newName,
      newEmail: newEmail,
      newUserName: newUserName,
    });
  },

  loadAvatar: (filename) => {
    const url = `/image/avatar/${filename}`;
    return axiosClient.get(url);
  },

  getAvatar: (filename) => {
    const url = `/image/get/${filename}`;
    return axiosClient.get(url);
  },

  uploadAvatar: (data) => {
    const url = "/image";
    return axiosClient.post(url, data);
  },

  getProfile: () => {
    const url = `/user/profile`;
    return axiosClient.get(url);
  },

  changePassword: (oldPassword, newPassword) => {
    const url = `/user/change_password`;
    return axiosClient.put(url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  },

  forgotPassword: (email) => {
    const url = `/user/forgot_password`;
    return axiosClient.post(url, {
      email: email,
    });
  },

  resetPassword: (new_password, reset_password_link) => {
    const url = `/user/reset_password`;
    return axiosClient.put(url, {
      newPassWord: new_password,
      resetPassWordLink: reset_password_link,
    });
  },

  // loginGoogle: (id_token) => {
  //   const url = "/user/google_login";
  //   return axiosClient.post(url, {
  //     id_token: id_token,
  //   });
  // },

  loginGoogle: () => {
    const url = "/user/login/google";
    return axiosClient.get(url);
  },

  loginFacebook: () => {
    const url = "/user/login/facebook";
    return axiosClient.get(url);
  },

  // loginFacebook: (user_id, access_token) => {
  //   const url = "/user/facebook_login";
  //   return axiosClient.post(url, {
  //     user_id: user_id,
  //     access_token: access_token,
  //   });
  // },

  active: (token) => {
    const url = "/user/active";
    return axiosClient.post(url, { token: token });
  },

  getAllGames: () => {
    const url = "/user/games";
    return axiosClient.get(url);
  },
};

export default userApi;
