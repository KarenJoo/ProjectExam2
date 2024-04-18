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

  const saveApiKey = (apiKey) => {
    save('apiKey', apiKey)
  }

  const loadApiKey = () => {
    return load('apiKey')
  }

  const saveUserData = (userData) => {
    save('userData', userData)
  }

  const loadUserData = () => {
    return load('userData')
  }

  return { saveApiKey, loadApiKey, saveUserData, loadUserData, remove, clear }
}

export default useStorage
