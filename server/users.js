const users = [];

const addUser = ({ id, name, room }) => {
  const trimmedName = name.trim().toLowerCase();
  const trimmedRoom = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === trimmedName && user.name === trimmedName);

  if(!trimmedName || !trimmedRoom) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, trimmedName, trimmedName };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === trimmedRoom);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };