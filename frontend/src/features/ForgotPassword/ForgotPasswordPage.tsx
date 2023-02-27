import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useAppDispatch } from "../../store/store";
import {
  forgotPasswordAction,
  forgotPasswordInterface,
} from "./forgotPasswordSlice";

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
  })
  .required();

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<forgotPasswordInterface>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: forgotPasswordInterface) => {
    dispatch(forgotPasswordAction(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
    reset();
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
          Forgot Password
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
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.email?.message}
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
        <Link className="NavLink" to="/">
          <Typography variant="body1" component="h6">
            Cancel?
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
