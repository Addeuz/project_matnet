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
        console.log(response.data);
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

  register(data) {
    return axios.post(`${AUTH_URL}/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      authorities: data.authorities,
    });
  }

  getCurrentUser() {
    // console.log('wowo');
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
