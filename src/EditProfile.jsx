import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useRef, useState } from "react";
import simsLogo from "./assets/Logo.png";
import defaultPofilePhoto from "./assets/Profile Photo.png";
import {
  Button,
  InputAdornment,
  InputLabel,
  styled,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  updatePhotoProfile,
  updateUserProfile,
} from "./features/manage-profile/profile-slice";
import Avatar from "@mui/material/Avatar";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const pages = ["Top Up", "Transaction", "Akun"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  if (!user.token) window.location.href = "/";

  const profile = useSelector((state) => state.profile);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    email: profile.email || null,
    firstName: profile.first_name || null,
    lastName: profile.last_name || null,
    profileImage: profile.profile_image || null,
  });

  useEffect(() => {
    setFormData({
      email: profile.email || "",
      firstName: profile.first_name || "",
      lastName: profile.last_name || "",
      profileImage: profile.profile_image || null,
    });
  }, [profile]);

  const handleFields = (event) => {
    const { name: originalName, value, type, files } = event.target;
    let name = originalName;

    if (type === "file") {
      name = "profileImage";
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const updatePreviewProfile = (event) => {
    let file = event.target.files;
    if (file.length) setPreviewProfileImage(URL.createObjectURL(file[0]));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleEditProfile = (data) => {
    if (
      formData.profileImage.type &&
      formData.profileImage.type !== "image/jpeg" &&
      formData.profileImage.type &&
      formData.profileImage.type !== "image/png"
    ) {
      Swal.fire({
        icon: "warning",
        title: "Format image tidak sesuai",
        text: "Masukkan format yang sesuai: PNG/JPEG",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const { firstName, lastName } = data;
    Swal.fire({
      title: `Konfirmasi perubahan profil`,
      html: `<strong>Apakah Anda yakin ingin menyimpan perubahan profil ini?</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        if (previewProfileImage) {
          dispatch(
            updatePhotoProfile({
              token: user.token,
              file: formData.profileImage,
            })
          );
        }
        dispatch(
          updateUserProfile({
            firstName: firstName,
            lastName: lastName,
            token: user.token,
          })
        );
      }
    });
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
    firstName: {
      required: "Nama depan is required",
    },
    lastName: {
      required: "Nama belakang is required",
    },
  };

  const location = useLocation();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff", mb: 4 }}>
        <Container maxWidth="xl" sx={{ padding: "0 !important" }}>
          <Toolbar disableGutters>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={simsLogo}
                alt="SIMS Logo"
                style={{ marginRight: "10px" }}
              />
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    color: "#4F4C4C",
                    textDecoration: "none",
                  }}
                >
                  SIMS PPOB
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page, index) => (
                <Link
                  key={page}
                  to={`/${page.replace(" ", "").toLowerCase()}`}
                  style={{
                    margin: "16px 0",
                    color:
                      location.pathname ===
                      `/${page.replace(" ", "").toLowerCase()}`
                        ? "#F42618"
                        : "#4F4C4C",
                    display: "block",
                    fontWeight: "bold",
                    marginRight: index === pages.length - 1 ? 0 : "40px",
                    textDecoration: "none",
                  }}
                >
                  {page}
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="section" maxWidth="xl" sx={{ margin: "0 auto" }}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleEditProfile, handleError)}
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt="Photo Profile"
                src={
                  previewProfileImage
                    ? previewProfileImage
                    : profile.profile_image &&
                      profile.profile_image.endsWith("/null")
                    ? defaultPofilePhoto
                    : profile.profile_image
                }
                sx={{ width: 135, height: 135, mb: 2 }}
              />
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                sx={{
                  width: 25,
                  height: 25,
                  borderRadius: "50%",
                  minWidth: 0,
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiButton-startIcon": { margin: 0 },
                  borderColor: "#D3CECF",
                  position: "absolute",
                  top: "100px",
                  right: "-5px",
                }}
                startIcon={<EditOutlinedIcon sx={{ color: "#000" }} />}
              >
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    updatePreviewProfile(e);
                    handleFields(e);
                  }}
                />
              </Button>
            </Box>
            <Typography
              component="h1"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >{`${
              formData.firstName ? formData.firstName : profile.first_name
            } ${
              formData.lastName ? formData.lastName : profile.last_name
            }`}</Typography>
          </Box>
          <Box sx={{ width: "50%", mb: errors?.email ? 2 : 3 }}>
            <InputLabel
              shrink
              htmlFor="email"
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "#595555",
                fontSize: "20px",
              }}
            >
              Email
            </InputLabel>
            <TextField
              //   error={!!errors.email}
              id="email"
              required
              disabled
              type="email"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-disabled .MuiInputBase-input": {
                    color: "black",
                    WebkitTextFillColor: "black",
                    opacity: 1,
                  },
                },
              }}
              FormHelperTextProps={{
                sx: {
                  margin: 0,
                  textAlign: "end",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon sx={{ color: "#595555" }} />
                  </InputAdornment>
                ),
              }}
              value={formData.email}
              //   onInput={handleFields}
              //   helperText={errors?.email && errors.email.message}
              //   {...register("email", registerOptions.email)}
            />
          </Box>
          <Box sx={{ width: "50%", mb: 3 }}>
            <InputLabel
              shrink
              htmlFor="nama-depan"
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "#595555",
                fontSize: "20px",
              }}
            >
              Nama Depan
            </InputLabel>
            <TextField
              error={!!errors.firstName}
              id="nama-depan"
              required
              type="text"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-disabled .MuiInputBase-input": {
                    color: "black",
                    WebkitTextFillColor: "black",
                    opacity: 1,
                  },
                },
              }}
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
              value={formData.firstName}
              onInput={handleFields}
              helperText={errors?.firstName && errors.firstName.message}
              {...register("firstName", registerOptions.firstName)}
            />
          </Box>
          <Box sx={{ width: "50%", mb: 3 }}>
            <InputLabel
              shrink
              htmlFor="nama-belakang"
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "#595555",
                fontSize: "20px",
              }}
            >
              Nama Belakang
            </InputLabel>
            <TextField
              error={!!errors.lastName}
              id="nama-belakang"
              required
              type="text"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-disabled .MuiInputBase-input": {
                    color: "black",
                    WebkitTextFillColor: "black",
                    opacity: 1,
                  },
                },
              }}
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
              value={formData.lastName}
              onInput={handleFields}
              helperText={errors?.lastName && errors.lastName.message}
              {...register("lastName", registerOptions.lastName)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#F42618",
              color: "#fff",
              mt: 3,
              width: "50%",
              height: "45px",
            }}
          >
            Simpan
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3,
            width: "50%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link
            to="/akun"
            style={{
              textDecoration: "none",
              width: "100%",
              height: "45px",
              border: "2px solid #F42618",
              padding: "10px 0",
              borderRadius: "5px",
              marginTop: 30,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "#F42618",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              Batalkan
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}
