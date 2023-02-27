import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret = "SecretOnly";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;
    req.body.decoded = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

export default middleware;
