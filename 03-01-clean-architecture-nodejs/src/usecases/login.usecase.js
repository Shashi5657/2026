const loginUser = ({ userRepo, comparePassword, signJWT }) => {
  return async function ({ email, password }) {
    const userExists = await userRepo.findByEmail(email);
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

    const accessToken = signJWT({ userId: userExists._id });
    const refreshToken = signJWT({ userId: userExists._id });

    await userRepo.saveRefreshToken(user._id, refreshToken);

    return { accessToken, refreshToken };
  };
};

export { loginUser };
