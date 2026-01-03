const registerUserController = async (registerUser) => {
  return async function (req, res) {
    try {
      const user = await registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  };
};

export { registerUserController };
