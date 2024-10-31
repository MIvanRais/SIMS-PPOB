import { Button, FormControl, FormHelperText, Typography } from "@mui/material";
import ilustrasiLogin from "./assets/Illustrasi Login.png";
import simsLogo from "./assets/Logo.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "./features/auth/login-slice";
import { useDispatch, useSelector } from "react-redux";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const user = useSelector((state) => state.login);
  if (!!user.token) window.location.href = "/home";

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleRegistration = (formData) => {
    dispatch(loginUser(formData));
  };

  const handleError = (errors) => {
    // console.log(errors);
  };

  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
    },
  };

  return (
    <Grid container>
      <Grid
        size={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <header style={{ display: "flex", alignItems: "center" }}>
          <img src={simsLogo} alt="SIMS Logo" style={{ marginRight: "10px" }} />
          <h1 style={{ fontSize: "20px" }}>SIMS PPOB</h1>
        </header>
        <h2 style={{ width: "300px", textAlign: "center" }}>
          Masuk atau buat akun untuk memulai
        </h2>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", width: "50%", mb: 3 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleRegistration, handleError)}
        >
          <TextField
            error={!!errors.email}
            required
            type="email"
            id="outlined-required"
            placeholder="masukan email anda"
            sx={{ mb: errors?.email ? 2 : 4 }}
            helperText={errors?.email && errors.email.message}
            FormHelperTextProps={{
              sx: {
                margin: 0,
                textAlign: "end",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            {...register("email", registerOptions.email)}
          />
          <FormControl
            error={!!errors.password}
            sx={{ mb: errors?.password ? 2 : 4 }}
            variant="outlined"
          >
            <OutlinedInput
              {...register("password", registerOptions.password)}
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => handleClickShowPassword("isPassword")}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Masukan Password Anda"
            />
            {errors.password && (
              <FormHelperText
                sx={{
                  margin: 0,
                  textAlign: "end",
                }}
              >
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#F42618" }}
          >
            Masuk
          </Button>
        </Box>
        <Box>
          belum punya akun? registrasi{" "}
          <Link
            to="/registration"
            underline="none"
            style={{
              color: "#F42618",
              textDecoration: "none",
              fontWeight: "bold",
              "&:hover": {
                color: "#F42618",
              },
            }}
          >
            di sini
          </Link>
        </Box>
      </Grid>
      <Grid size={6}>
        <img
          src={ilustrasiLogin}
          alt="Ilustrasi Login"
          style={{ height: "99vh" }}
        />
      </Grid>
    </Grid>
  );
}
