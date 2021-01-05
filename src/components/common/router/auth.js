import cookieService from "../../../service/cookieService";
import jwt_decode from "jwt-decode";

const Auth = {
  getAccessToken: function () {
    return cookieService.get("access_token");
  },
  isAuthenticated: function () {
    return cookieService.get("access_token") ? true : false;
  },
  logout: function () {
    return cookieService.remove("access_token");
  },
  getCurrentUser: function () {
    const token = this.getAccessToken();
    return jwt_decode(token);
  },
};

export default Auth;
