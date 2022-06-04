export default function changeToken(res) {
  if (res.data.accessToken) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    user.accessToken = res.data.accessToken;
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}
