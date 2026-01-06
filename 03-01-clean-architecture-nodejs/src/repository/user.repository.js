const createUserRepository = (UserModel) => {
  return {
    findByEmail: async (email) => UserModel.findOne({ email }),
    save: async (user) => await UserModel.create(user),
    saveRefreshToken: (userId, token) =>
      UserModel.findByIdAndUpdate(userId, { refreshToken: token }),

    findByRefreshToken: (token) => UserModel.findOne({ refreshToken: token }),
  };
};

export { createUserRepository };
