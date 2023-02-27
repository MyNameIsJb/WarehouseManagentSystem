import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../../store/store";
import {
  resetPasswordAction,
  ResetPasswordInterface,
} from "./resetPasswordSlice";

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required").min(3),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(3),
  })
  .required();

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInterface>({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: ResetPasswordInterface) => {
    const finalData = {
      ...data,
      resetToken: resetToken,
    };
    dispatch(resetPasswordAction(finalData))
      .unwrap()
      .then(() => {
        navigate("/");
        reset();
      });
    reset({
      email: data.email,
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: "1px solid #FFF",
          borderRadius: "20px 20px 0 0",
          textAlign: "center",
          margin: "20vh auto 0",
          padding: "1em",
          background: "#FFF",
        }}
      >
        <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
          Reset Password
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid #FFF",
          borderRadius: "0 0 20px 20px",
          margin: "0 auto 0",
          padding: "1em",
          background: "#FFF",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box sx={{ marginBottom: "1em" }}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Email
              </InputLabel>
              <Input
                {...register("email")}
                error={errors.email ? true : false}
                id="standard-adornment-password"
                type="text"
                endAdornment={
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                {...register("password")}
                error={errors.password ? true : false}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirm Password
              </InputLabel>
              <Input
                {...register("confirmPassword")}
                error={errors.confirmPassword ? true : false}
                id="standard-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: "1em" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", borderRadius: "20px" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
