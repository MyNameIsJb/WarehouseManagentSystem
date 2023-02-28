import React, { useState } from "react";
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
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../store/store";
import {
  createUserAction,
  filteredItemsInterface,
  getAllUsersAction,
} from "./employeeListSlice";

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
    levelOfAccess: yup.string().required("Level Of Access is required"),
    store: yup.string().required("Store is required"),
  })
  .required();

const CreateUserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [levelOfAccess, setLevelOfAccess] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<filteredItemsInterface>({
    resolver: yupResolver(schema),
  });

  const handleChange = (event: SelectChangeEvent) => {
    setLevelOfAccess(event.target.value as string);
  };

  const onSubmit = (data: filteredItemsInterface) => {
    const finalData = {
      ...data,
      username: data.email,
      store: data.levelOfAccess === "Client" ? data.store : "N/A",
    };

    dispatch(createUserAction(finalData))
      .unwrap()
      .then(() => {
        dispatch(getAllUsersAction(1));
        navigate("/employeeList");
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
          Create User
        </Typography>
        <Button
          color="error"
          onClick={() => navigate("/employeeList")}
          variant="contained"
        >
          <CloseIcon />
        </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormControl
          sx={{ width: "100%", margin: "1em 0 1em 0" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
          <Input
            {...register("name")}
            error={errors.name ? true : false}
            id="standard-adornment-password"
            type="text"
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
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            {...register("email")}
            error={errors.email ? true : false}
            id="standard-adornment-password"
            type="text"
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
          <InputLabel htmlFor="standard-adornment-password">Address</InputLabel>
          <Input
            {...register("address")}
            error={errors.address ? true : false}
            id="standard-adornment-password"
            type="text"
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
          <InputLabel htmlFor="standard-adornment-password">
            Contact Number
          </InputLabel>
          <Input
            {...register("contactNumber")}
            error={errors.contactNumber ? true : false}
            id="standard-adornment-password"
            type="text"
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
          <InputLabel id="demo-simple-select-label">Level Of Access</InputLabel>
          <Select
            {...register("levelOfAccess")}
            error={errors.levelOfAccess ? true : false}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={levelOfAccess}
            label="Level Of Access"
            onChange={handleChange}
          >
            <MenuItem value={"Employee"}>Employee</MenuItem>
            <MenuItem value={"Client"}>Client</MenuItem>
          </Select>
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ color: "#d50000" }}
          >
            {errors.levelOfAccess?.message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{ width: "100%", margin: "1em 0 1em 0" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Store (Optional)
          </InputLabel>
          <Input
            {...register("store")}
            error={errors.store ? true : false}
            id="standard-adornment-password"
            type="text"
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
    </StyledParentBox>
  );
};

export default CreateUserPage;
