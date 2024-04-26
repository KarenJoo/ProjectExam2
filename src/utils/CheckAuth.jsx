import useStorage from "./useStorage";

const CheckAuth = () => {
  const { loadToken } = useStorage();
  const accessToken = loadToken();

  if (!accessToken) {
    return             alert('Auth is required to create venue.')

  }

  return null;
};

export default CheckAuth;
