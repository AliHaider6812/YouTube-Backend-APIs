const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const { USER_COUNT } = require("./constants");

async function seedUsers(prisma) {
  const users = [];

  for (let i = 0; i < USER_COUNT; i++) {
    const hashedPassword = await bcrypt.hash("Password@123", 10);

    const user = await prisma.user.create({
      data: {
        username: faker.internet.username().toLowerCase() + i,
        email: faker.internet.email().toLowerCase(),
        fullName: faker.person.fullName(),

        avatarUrl: faker.image.avatar(),
        coverImageUrl: faker.image.urlPicsumPhotos(),

        password: hashedPassword,
        refreshToken: null,

        isVerified: faker.datatype.boolean(),
      },
    });

    users.push(user);
  }

  console.log(`✅ ${users.length} users created.`);

  return users;
}

module.exports = seedUsers;