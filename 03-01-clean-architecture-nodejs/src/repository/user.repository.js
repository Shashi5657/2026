const createUserRepository = (UserModel) => {
  return {
    findByEmail: async (email) => UserModel.findOne({ email }),
    save: async (user) => await UserModel.create(user),
  };
};

export { createUserRepository };
