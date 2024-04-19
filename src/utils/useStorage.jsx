const useStorage = () => {
  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const load = (key) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  }

  const remove = (key) => {
    localStorage.removeItem(key)
  }

  const clear = () => {
    localStorage.clear()
  }

  const saveUserData = (userData) => {
    save('userData', userData)
  }

  const loadUserData = () => {
    return load('userData')
  }

  const saveToken = (accessToken) => {
    save('accessToken', accessToken)
  }

  const loadToken = () => {
    return load('accessToken')
  }

  return { saveUserData, loadUserData, remove, clear, saveToken, loadToken }
}

export default useStorage
