const loginController = (loginUser) => {
  return async function (req, res) {
    try {
      const token = await loginUser(req.body);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
};
