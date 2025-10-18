const users = [];

const userTemplate = {
  id: null,
  username: "",
  password: "",
  isAdmin: false,
};

const createUser = (id, username, password, isAdmin = false) => {
  const newUser = { ...userTemplate, id, username, password, isAdmin };
  users.push(newUser);
  return users;
};

export { users, createUser };
