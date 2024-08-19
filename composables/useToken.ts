export default function useToken() {
  const token = useCookie("token", {
    path: '/',
    secure: true,
    sameSite: 'strict'
  });
  const setToken = (value?: string) => {
    token.value = value
  }
  return { token: token.value, setToken }

}
