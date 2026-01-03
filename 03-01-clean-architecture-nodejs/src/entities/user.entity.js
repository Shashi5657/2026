const createUser = async ({ email, password }) => {
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  return {
    email,
    password,
    createdAt: Date.now(),
  };
};

export { createUser };
