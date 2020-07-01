// If a user wants to retrieve data from the server, use this if the data is protected

// Checks for a user in localStorage, and return the auth header with accessToken.body
// If no user return empty object
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  }
  return {};
}
