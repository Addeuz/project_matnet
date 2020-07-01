/* eslint-disable no-sequences */
import authService from '../services/auth.service';
import { userReducer } from '../services/user.reducer';

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = React.useReducer(userReducer, null, () => {
    if (typeof window !== 'undefined') {
      const localUser = authService.getCurrentUser();
      return localUser || null;
    }
  });

  // React.useEffect(() => {
  //   dispatch({ action: 'LOG_IN' });
  // }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
