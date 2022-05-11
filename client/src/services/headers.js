export default function tokenHeader() {
  console.log('여기는 헤더');
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
