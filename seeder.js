const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./.env" });

const connectDB = require("./src/config/database");

async function seedUser() {
  const User = require("./src/models/User");

  const adminUser = new User({
    name: "User",
    email: "user@newproject.com",
    password: "user1234",
  });

  adminUser.save();

  console.log("New User created");
}

connectDB().then(() => {
  seedUser();
});
