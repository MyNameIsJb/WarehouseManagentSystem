import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../../store/store";
import { LoginInterface, signInAction } from "./loginSlice";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(3),
  })
  .required();

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: LoginInterface) => {
    dispatch(signInAction(data))
      .unwrap()
      .then((result) => {
        if (result.levelOfAccess === "Administrator")
          return navigate("/employeeList");

        if (result.levelOfAccess === "Employee") return navigate("/gallery");

        if (result.levelOfAccess === "Client") return navigate("/gallery");
        reset();
      });
    reset({
      username: data.username,
      password: "",
    });
  };

  useEffect(() => {
    if (token !== null) return navigate("/dashboard");
  }, [token, navigate]);

  return (
    <>
      {token === null ? (
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
              WAREHOUSE INFORMATION MANAGEMENT SYSTEM
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
                    Username
                  </InputLabel>
                  <Input
                    {...register("username")}
                    error={errors.username ? true : false}
                    id="standard-adornment-password"
                    type="text"
                    endAdornment={
                      <PersonIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    }
                  />
                  <FormHelperText
                    id="outlined-weight-helper-text"
                    sx={{ color: "#d50000" }}
                  >
                    {errors.username?.message}
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
            <Link className="NavLink" to="/forgot-password">
              <Typography variant="body1" component="h6">
                Forgot Password?
              </Typography>
            </Link>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="sm">
          <Box
            sx={{
              textAlign: "center",
              margin: "2em auto 0",
              padding: "1em",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
