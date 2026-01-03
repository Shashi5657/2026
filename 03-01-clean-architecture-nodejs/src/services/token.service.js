import jwt from "jsonwebtoken";

const signJWT = (payload) => {
  jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const verifyJWT = (token) => {
  jwt.verify(token, process.env.SECRET_KEY);
};

export { signJWT, verifyJWT };
