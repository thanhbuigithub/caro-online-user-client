import cookieService from "../../../service/cookieService";
import SocketManager from "../../../socketio/SocketManager";
const socket = SocketManager.getSocket();
const Auth = {

  setUser: function (user, next) {
    localStorage.setItem('user', JSON.stringify(user));
    next();
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('user'));
  },

  setAccessToken: function (token, next) {
    cookieService.set("access_token", token);
    localStorage.setItem('access_token', token);
    next();
    // return cookieService.set("access_token", token);
  },
  getAccessToken: function () {
    return localStorage.getItem('access_token');
    // return cookieService.get("access_token");
  },
  isAuthenticated: function () {
    return localStorage.getItem('access_token') ? true : false;
    // return cookieService.get("access_token") ? true : false;
  },
  logout: function (next) {
    cookieService.remove("access_token");
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isSocial');
    next();
    // return cookieService.remove("access_token");
  },
  isSocialLogin: function () {
    return localStorage.getItem('isSocial') ? true : false;
  },
};

export default Auth;
