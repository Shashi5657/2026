const loginUser = ({ userRepo, passwordService, tokenService }) => {
  return async function ({ email, password }) {
    const userExists = await userRepo.findByEmail({ email });
    if (!userExists) {
      throw new Error("Email doesn't exists, Please register");
    }
    const isValidPassword = await passwordService.comparePassword(
      password,
      userExists.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid Password");
    }

    return tokenService.sign({ userId: userExists._id });
  };
};
