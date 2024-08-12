import Cookies from "universal-cookie";
const cookies = new Cookies();

export const token = cookies.get("token");
export const isAuthenticated = !!token;
export const apiBase = process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8080/api";

