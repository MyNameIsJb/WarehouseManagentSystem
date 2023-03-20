import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StoreIcon from "@mui/icons-material/Store";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getProfileAction,
  profileInterface,
  updateProfileAction,
} from "./profileSlice";

const StyledParentBox = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "1em auto",
  padding: "2em",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    margin: "1em auto",
    padding: "2em",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
    margin: "1em auto",
    padding: "2em",
  },
}));

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email(),
    address: yup.string().required("Address is required"),
    birthDate: yup.string().required("Birthdate is required"),
    contactNumber: yup.string().required("Contact Number is required"),
    store: yup.string().required("Store is required"),
  })
  .required();

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profileData, loading } = useAppSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<profileInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: profileData?.name,
      email: profileData?.email,
      address: profileData?.address,
      birthDate: profileData?.birthDate,
      contactNumber: profileData?.contactNumber,
      store: profileData?.store,
    },
  });

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  useEffect(() => {
    reset({
      name: profileData?.name,
      email: profileData?.email,
      address: profileData?.address,
      birthDate: profileData?.birthDate,
      contactNumber: profileData?.contactNumber,
      store: profileData?.store,
    });
  }, [reset, profileData]);

  const onSubmit = (data: profileInterface) => {
    const finalData = {
      ...data,
      username: data.email,
    };
    dispatch(updateProfileAction(finalData))
      .unwrap()
      .then(() => {
        dispatch(getProfileAction());
      });
    reset();
  };

  return (
    <StyledParentBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          Update Profile
        </Typography>
        <Button
          color="error"
          onClick={() => {
            navigate("/employeeList");
          }}
          variant="contained"
        >
          <CloseIcon />
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" component="h1">
            <CircularProgress sx={{ fontSize: "2em" }} />
          </Typography>
        </Box>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormControl
              sx={{ width: "100%", margin: "1em 0 1em 0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password" shrink>
                Name
              </InputLabel>
              <Input
                {...register("name")}
                error={errors.name ? true : false}
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
                {errors.name?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ width: "100%", margin: "1em 0 1em 0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password" shrink>
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
            <FormControl
              sx={{ width: "100%", margin: "1em 0 1em 0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password" shrink>
                Address
              </InputLabel>
              <Input
                {...register("address")}
                error={errors.address ? true : false}
                id="standard-adornment-password"
                type="text"
                endAdornment={
                  <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.address?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ width: "100%", margin: "1em 0 1em 0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password" shrink>
                Birthdate
              </InputLabel>
              <Input
                {...register("birthDate")}
                error={errors.birthDate ? true : false}
                id="standard-adornment-password"
                type="date"
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.birthDate?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ width: "100%", margin: "1em 0 1em 0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password" shrink>
                Contact Number
              </InputLabel>
              <Input
                {...register("contactNumber")}
                error={errors.contactNumber ? true : false}
                id="standard-adornment-password"
                type="text"
                endAdornment={
                  <LocalPhoneIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: "#d50000" }}
              >
                {errors.contactNumber?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ width: "100%", margin: "1em 0 1em 0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password" shrink>
                Store (Optional)
              </InputLabel>
              <Input
                {...register("store")}
                error={errors.store ? true : false}
                id="standard-adornment-password"
                type="text"
                endAdornment={
                  <StoreIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                }
              />
              <FormHelperText
                id="outlined-weight-helper-text"
                sx={{ color: errors.store?.message ? "#d50000" : "inherit" }}
              >
                {errors.store?.message
                  ? errors.store?.message
                  : "*Type N/A if not applicable"}
              </FormHelperText>
            </FormControl>
            <Box sx={{ marginTop: "2em" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", borderRadius: "20px" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </>
      )}
    </StyledParentBox>
  );
};

export default ProfilePage;
