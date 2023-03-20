import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/middleware";
import ResetToken from "../models/ResetToken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import CreatePasswordToken from "../models/CreatePasswordToken";
import mongoose from "mongoose";

export const signInController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const comparedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparedPassword)
      return res.status(400).json({ message: "Password incorrect" });

    const token = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
        store: existingUser.store,
      },
      SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      token,
      levelOfAccess: existingUser.levelOfAccess,
      message: "Successfully logged in",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (!existingEmail)
      return res.status(404).json({ message: "Email doesn't exist" });

    res.status(200).json({ message: "Email verification sent to your email" });

    const generatedToken = crypto.randomBytes(64);
    const convertTokenToHexString = generatedToken.toString("hex");

    const filePath = path.join(
      __dirname,
      "../emailTemplate/resetPassword.html"
    );

    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      email: email,
      resetToken: convertTokenToHexString,
    };
    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "jbevangelista.0107@gmail.com",
        pass: "qfhjpgnvssoipuuc",
      },
    });

    const info = await transporter.sendMail({
      from: '"Jan Bernard Evangelista" <jbevangelista.0107@gmail.com>',
      to: email,
      subject: "Reset Password",
      text: "Reset Password?",
      html: htmlToSend,
      headers: { "x-myheader": "test header" },
    });

    await ResetToken.create({
      email,
      resetToken: convertTokenToHexString,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, resetToken } = req.body;

  try {
    const existingToken = await ResetToken.findOne({ resetToken });
    if (!existingToken)
      return res.status(404).json({ message: "Token doesn't exist" });

    const existingEmail = await User.findOne({ email });
    if (!existingEmail)
      return res.status(404).json({ message: "Email doesn't exist" });

    if (existingToken.email !== email)
      return res.status(400).json({ message: "Invalid Email" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(
      existingEmail.id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    await ResetToken.deleteMany({ email: existingEmail.email });
    res.status(200).json({ message: "Successfully updated password" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPasswordController = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, createPasswordToken } = req.body;

  try {
    const existingToken = await CreatePasswordToken.findOne({
      createPasswordToken,
    });
    if (!existingToken)
      return res.status(404).json({ message: "Token doesn't exist" });

    const existingEmail = await User.findOne({ email });
    if (!existingEmail)
      return res.status(404).json({ message: "Email doesn't exist" });

    if (existingToken.email !== email)
      return res.status(400).json({ message: "Invalid Email" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(
      existingEmail.id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    await CreatePasswordToken.deleteMany({ email: existingEmail.email });
    res.status(200).json({ message: "Successfully updated password" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  const { decoded } = req.body;
  try {
    const existingUser = await User.findOne({ _id: decoded.id });
    const newArr = [existingUser!];
    const filteredData = newArr.map((item) => {
      const filteredItem = {
        _id: item._id,
        username: item.username,
        name: item.name,
        email: item.email,
        address: item.address,
        birthDate: item.birthDate,
        contactNumber: item.contactNumber,
        levelOfAccess: item.levelOfAccess,
        store: item.store,
      };
      return filteredItem;
    });
    res.status(200).json(filteredData[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const ITEMS_PER_PAGE = 5;
    const page: any = req.query.page || 1;
    const query = {};
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const countPromise = User.estimatedDocumentCount(query);
    const itemsPromise = User.find(query).limit(ITEMS_PER_PAGE).skip(skip);
    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = count / ITEMS_PER_PAGE;
    const result = pageCount - Math.floor(pageCount);

    const filteredItems = items.map((item) => {
      const filteredItem = {
        _id: item._id,
        username: item.username,
        name: item.name,
        email: item.email,
        address: item.address,
        birthDate: item.birthDate,
        contactNumber: item.contactNumber,
        levelOfAccess: item.levelOfAccess,
        store: item.store,
      };
      return filteredItem;
    });

    return res.status(200).json({
      pagination: {
        count,
        pageCount: result > 0 ? Math.trunc(pageCount) + 1 : pageCount,
      },
      filteredItems,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const {
    username,
    name,
    email,
    address,
    birthDate,
    contactNumber,
    levelOfAccess,
    store,
  } = req.body;

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exist" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exist" });

    const existingContactNumber = await User.findOne({ contactNumber });
    if (existingContactNumber)
      return res.status(400).json({ message: "Contact number already exist" });

    await User.create({
      username,
      name,
      email,
      address,
      birthDate,
      contactNumber,
      levelOfAccess,
      store,
    });
    res.status(200).json({ message: "Successfully created an account" });

    const generatedToken = crypto.randomBytes(64);
    const convertTokenToHexString = generatedToken.toString("hex");

    const filePath = path.join(
      __dirname,
      "../emailTemplate/createPassword.html"
    );

    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      email: email,
      createPasswordToken: convertTokenToHexString,
    };
    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "jbevangelista.0107@gmail.com",
        pass: "qfhjpgnvssoipuuc",
      },
    });

    const info = await transporter.sendMail({
      from: '"Jan Bernard Evangelista" <jbevangelista.0107@gmail.com>',
      to: email,
      subject: "Create Password",
      text: "Create Password?",
      html: htmlToSend,
      headers: { "x-myheader": "test header" },
    });

    await CreatePasswordToken.create({
      email,
      createPasswordToken: convertTokenToHexString,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const singleUser = await User.findById({ _id: id });

    const newArr = [singleUser!];
    const filteredData = newArr.map((item) => {
      const filteredItem = {
        _id: item._id,
        username: item.username,
        name: item.name,
        email: item.email,
        address: item.address,
        birthDate: item.birthDate,
        contactNumber: item.contactNumber,
        levelOfAccess: item.levelOfAccess,
        store: item.store,
      };
      return filteredItem;
    });

    return res.status(200).json(filteredData[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    email,
    address,
    birthDate,
    contactNumber,
    levelOfAccess,
    store,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    const checkEmailQuery = {
      _id: { $ne: id },
      email: email,
    };
    const existingEmail = await User.findOne(checkEmailQuery);
    if (existingEmail)
      return res.status(400).json({ message: "Email already exist" });

    const checkContactNumberQuery = {
      _id: { $ne: id },
      contactNumber: contactNumber,
    };
    const existingContactNumber = await User.findOne(checkContactNumberQuery);
    if (existingContactNumber)
      return res.status(400).json({ message: "Contact number already exist" });

    const existingId = await User.findById({ _id: id });
    await User.findByIdAndUpdate(
      existingId,
      {
        username: email,
        name: name,
        email: email,
        address: address,
        birthDate: birthDate,
        contactNumber: contactNumber,
        levelOfAccess: levelOfAccess,
        store: store,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Successfully updated user" });

    const generatedToken = crypto.randomBytes(64);
    const convertTokenToHexString = generatedToken.toString("hex");

    const filePath = path.join(
      __dirname,
      "../emailTemplate/createPassword.html"
    );

    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      email: email,
      createPasswordToken: convertTokenToHexString,
    };
    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "jbevangelista.0107@gmail.com",
        pass: "qfhjpgnvssoipuuc",
      },
    });

    const info = await transporter.sendMail({
      from: '"Jan Bernard Evangelista" <jbevangelista.0107@gmail.com>',
      to: email,
      subject: "Create Password",
      text: "Create Password?",
      html: htmlToSend,
      headers: { "x-myheader": "test header" },
    });

    await CreatePasswordToken.create({
      email,
      createPasswordToken: convertTokenToHexString,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID" });

    await User.findByIdAndDelete(id);
    return res.status(203).json({ message: "Deleted user successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  const {
    decoded,
    username,
    name,
    email,
    address,
    birthDate,
    contactNumber,
    store,
  } = req.body;

  try {
    const checkEmailQuery = {
      _id: { $ne: decoded.id },
      email: email,
    };
    const existingEmail = await User.findOne(checkEmailQuery);
    if (existingEmail)
      return res.status(400).json({ message: "Email already exist" });

    const checkContactNumberQuery = {
      _id: { $ne: decoded.id },
      contactNumber: contactNumber,
    };
    const existingContactNumber = await User.findOne(checkContactNumberQuery);
    if (existingContactNumber)
      return res.status(400).json({ message: "Contact number already exist" });

    await User.findByIdAndUpdate(
      decoded.id,
      {
        username,
        name,
        email,
        address,
        birthDate,
        contactNumber,
        store,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
