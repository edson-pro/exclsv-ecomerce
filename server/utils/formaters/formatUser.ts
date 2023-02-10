const formatUser = (e) => {
  return {
    id: e.id,
    email: e.email,
    photo: e.photo,
    username: e.username,
  };
};

export default formatUser;
