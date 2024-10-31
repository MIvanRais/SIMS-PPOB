import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import simsLogo from "./assets/Logo.png";
import defaultPofilePhoto from "./assets/Profile Photo.png";
import { Button, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "swiper/css";
import Avatar from "@mui/material/Avatar";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { persistor } from "./app/store";
import Swal from "sweetalert2";

const pages = ["Top Up", "Transaction", "Akun"];

export default function Akun() {
  const user = useSelector((state) => state.login);
  if (!user.token) window.location.href = "/";
  const profile = useSelector((state) => state.profile);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        persistor.purge();
        window.location.href = "/";
      }
    });
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="Photo Profile"
            src={
              profile.profile_image && profile.profile_image.endsWith("/null")
                ? defaultPofilePhoto
                : profile.profile_image
            }
            sx={{ width: 135, height: 135, mb: 2 }}
          />
          <Typography
            component="h1"
            sx={{ fontSize: "28px", fontWeight: "bold" }}
          >{`${profile.first_name} ${profile.last_name}`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Box sx={{ width: "50%" }}>
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
              id="email"
              disabled
              required
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
              value={profile.email}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Box sx={{ width: "50%" }}>
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
              Nama Depan
            </InputLabel>
            <TextField
              id="email"
              disabled
              required
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
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              value={profile.first_name}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Box sx={{ width: "50%" }}>
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
              Nama Belakang
            </InputLabel>
            <TextField
              id="email"
              disabled
              required
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
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              value={profile.last_name}
            />
          </Box>
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
            to="/edit-profile"
            style={{
              textDecoration: "none",
              width: "100%",
              height: "45px",
              backgroundColor: "#F42618",
              padding: "10px 0",
              borderRadius: "5px",
              marginTop: 30,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "#fff",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              Edit Profil
            </Typography>
          </Link>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "#F42618",
              color: "#F42618",
              mt: 3,
              width: "100%",
              height: "45px",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
}
