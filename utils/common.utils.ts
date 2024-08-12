import Cookies from "universal-cookie";
const cookies = new Cookies();

export const token = cookies.get("token");
export const isAuthenticated = !!token;



