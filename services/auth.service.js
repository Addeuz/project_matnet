import axios from 'axios';
// eslint-disable-next-line import/no-cycle

const AUTH_URL = 'http://localhost:3000/api/auth';

class AuthService {
  login(username, password) {
    console.log({ username, password });
    return axios
      .post(`${AUTH_URL}/signin`, {
        username,
        password,
      })
      .then(response => {
        // if there is an accessToken, the user successfully logged in
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));

          return response.data;
        }

        return response.data;
      });
  }

  logOut() {
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(`${AUTH_URL}/signup`, {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    // console.log('wowo');
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
