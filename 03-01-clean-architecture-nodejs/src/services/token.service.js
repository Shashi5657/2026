import jwt from "jsonwebtoken";

const signJWT = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const signRefresh = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const verifyRefresh = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export { signJWT, verifyJWT, signRefresh, verifyRefresh };
