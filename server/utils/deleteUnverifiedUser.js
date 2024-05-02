const User = require("../models/user.model");

const deleteUserAfterDelay = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Calculate 1 hour ago

  try {
    await User.deleteMany({
      createdAt: { $lt: oneHourAgo }, // Delete users created before 1 hour ago
      verified: false, // Only delete unverified users
    });
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

module.exports = {
  deleteUserAfterDelay,
};
