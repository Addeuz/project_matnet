import authService from './auth.service';

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return authService.getCurrentUser();
    // return { username: 'leif' };
    case 'LOG_OUT':
      authService.logOut();
      return null;
    default:
      return state;
  }
};
