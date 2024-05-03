const User = require("../models/user.model");

export default async function deleteUserAfterDelay() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Calculate 1 hour ago

  try {
    await User.deleteMany({
      createdAt: { $lt: oneHourAgo }, // Delete users created before 1 hour ago
      verified: false, // Only delete unverified users
    });
    console.log("Successfully deleted unverified users older than 1 hour.");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}
