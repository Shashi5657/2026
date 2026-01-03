const loginUser = ({ userRepo, comparePassword, jwtSign }) => {
  return async function ({ email, password }) {
    const userExists = await userRepo.findByEmail({ email });
    if (!userExists) {
      throw new Error("Email doesn't exists, Please register");
    }
    const isValidPassword = await comparePassword(
      password,
      userExists.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid Password");
    }

    return jwtSign({ userId: userExists._id });
  };
};
