import { createUser } from "../entities/user.entity.js";

const registerUser = ({ userRepo, hashPassword }) => {
  return async function ({ email, password }) {
    const exist = await userRepo.findByEmail(email);

    if (exist) {
      throw new Error("User already exists, Please login to continue.");
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      email,
      password: hashedPassword,
    });

    return await userRepo.save(user);
  };
};

export { registerUser };
