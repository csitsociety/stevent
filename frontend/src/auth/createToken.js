import fire from './fire'

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  };
  return payloadHeader;
}

export default createToken
