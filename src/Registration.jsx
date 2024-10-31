import { Button, FormControl, FormHelperText } from "@mui/material";
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
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";

export default function Registration() {
  const user = useSelector((state) => state.login);
  if (!!user.token) window.location.href = "/home";

  const [showPassword, setShowPassword] = useState({
    isPassword: false,
    isConfirmPassword: false,
  });

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const registerNewUser = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          title: "Pendaftaran gagal!",
          text: `${errorData.message}. Silahkan coba lagi.`,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.message}`
        );
      }

      Swal.fire({
        title: "Pendaftaran Berhasil!",
        text: "Anda telah berhasil terdaftar.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleRegistration = (formData) => {
    delete formData.confirmPassword;
    registerNewUser(formData);
  };

  const handleError = (errors) => {
    // console.log(errors);
  };

  const password = watch("password");

  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: "Invalid email address",
      },
    },
    first_name: {
      required: "Nama depan is required",
    },
    last_name: {
      required: "Nama belakang is required",
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      maxLength: {
        value: 20,
        message: "Password cannot exceed 20 characters",
      },
    },
    confirmPassword: {
      required: "Konfirmasi password is required",
      validate: (value) => value === password || "Passwords do not match",
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
          Lengkapi data untuk membuat akun
        </h2>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegistration, handleError)}
          sx={{ display: "flex", flexDirection: "column", width: "50%", mb: 3 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            error={!!errors.email}
            required
            type="email"
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
          <TextField
            error={!!errors.first_name}
            required
            type="text"
            placeholder="nama depan"
            sx={{ mb: errors?.first_name ? 2 : 4 }}
            helperText={errors?.first_name && errors.first_name.message}
            FormHelperTextProps={{
              sx: {
                margin: 0,
                textAlign: "end",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
            {...register("first_name", registerOptions.first_name)}
          />
          <TextField
            error={!!errors.last_name}
            required
            type="text"
            placeholder="nama belakang"
            sx={{ mb: errors?.last_name ? 2 : 4 }}
            helperText={errors?.last_name && errors.last_name.message}
            FormHelperTextProps={{
              sx: {
                margin: 0,
                textAlign: "end",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
            {...register("last_name", registerOptions.last_name)}
          />
          <FormControl
            error={!!errors.password}
            sx={{ mb: errors?.password ? 2 : 4 }}
            variant="outlined"
          >
            <OutlinedInput
              {...register("password", registerOptions.password)}
              startAdornment={
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              }
              type={showPassword.isPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.isPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => handleClickShowPassword("isPassword")}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword.isPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="buat password"
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
          <FormControl
            error={!!errors.confirmPassword}
            variant="outlined"
            sx={{ mb: errors?.confirmPassword ? 4 : 8 }}
          >
            <OutlinedInput
              {...register("confirmPassword", registerOptions.confirmPassword)}
              startAdornment={
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              }
              type={showPassword.isConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.isConfirmPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => handleClickShowPassword("isConfirmPassword")}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword.isConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="konfirmasi password"
            />
            {errors.confirmPassword && (
              <FormHelperText
                sx={{
                  margin: 0,
                  textAlign: "end",
                }}
              >
                {errors.confirmPassword.message}
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
          sudah punya akun? login{" "}
          <style>
            {`
              a:-webkit-any-link {
                color: #F42618;
              }
            `}
          </style>
          <Link
            to="/"
            underline="none"
            style={{
              color: "#F42618",
              fontWeight: "bold",
              textDecoration: "none",
              ":hover": {
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
