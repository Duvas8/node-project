
const User = require('../models/userModel')

// Define the getUser function
const getUser = async (accessTokenPayload) => {
  
  try {
    const user = {}
    const usersDB = await User.find();

    // Find the user in the database based on the id from the accessTokenPayload
    const userDB = usersDB.find((user) => user.id === accessTokenPayload.id);

    if (userDB) {
      // Create the combined user object
      const user = {
        id: userDB.id,
        username: accessTokenPayload.username,
        email: accessTokenPayload.email,
        name: accessTokenPayload.name,
        maxActions: userDB.maxActions,
      };
      user.date = new Date().toISOString().split('T')[0];

      return user;
    } else {
      return null; // Return null if no matching user was found in the database
    }
  } catch (error) {
    console.log(error);
    return null; // Handle errors and return null
  }
};


const addUser = async(obj) => {
  const per = new User(obj);
  await per.save();
  return 'Created!';
}

module.exports = {  getUser, addUser };