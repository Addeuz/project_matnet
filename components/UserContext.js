/* eslint-disable no-sequences */
import authService from '../services/auth.service';
import { userReducer } from '../services/user.reducer';

export const UserContext = React.createContext();

// Component that provides a UserContext to the whole application so that the currently logged in user can be accessed from everywhere in the app
// Read more about contexts in react: https://reactjs.org/docs/context.html

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = React.useReducer(userReducer, null, () => {
    if (typeof window !== 'undefined') {
      const localUser = authService.getCurrentUser();
      return localUser || null;
    }
  });

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
