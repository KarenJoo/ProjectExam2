const useStorage = () => {
    const save = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    const load = (key) => {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    };
  
    const remove = (key) => {
      const value = localStorage.removeItem(key);
    };
  
    const clear = () => {
      localStorage.clear();
    };
  
    return { save, load, remove, clear };
  };
  
  export default useStorage;