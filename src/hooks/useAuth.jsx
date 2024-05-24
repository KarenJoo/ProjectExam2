import { useSelector } from 'react-redux';

const useAuth = () => {
  const auth = useSelector((state) => state.auth) || {};
  const isUserLoggedIn = !!auth.accessToken;
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const isVenueManager = auth.role === 'isVenueManager';

  return { isUserLoggedIn, isVenueManager, isLoggedIn };
};

export default useAuth;


// const useAuth = () => {
//   const [isVenueManager, setIsVenueManager] = useState(false)
//   const { loadUserData } = useStorage()

//   useEffect(() => {
//     const storedUserData = loadUserData()
//     const venueManager = storedUserData?.venueManager || false 

//     setIsVenueManager(venueManager)
//   }, [])

//   return { isVenueManager }
// }

// export default useAuth