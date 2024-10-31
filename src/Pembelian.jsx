import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import simsLogo from "./assets/Logo.png";
import backgroundSaldo from "./assets/Background Saldo.png";
import defaultPofilePhoto from "./assets/Profile Photo.png";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MoneyIcon from "@mui/icons-material/Money";
import Grid from "@mui/material/Grid2";
import { NumericFormat } from "react-number-format";
import { payment, topUp } from "./features/transaction/transaction-slice";
import Swal from "sweetalert2";

const pages = ["Top Up", "Transaction", "Akun"];

export default function Pembelian() {
  const dispatch = useDispatch();

  const [showBalance, setShowBalance] = useState(true);

  const user = useSelector((state) => state.login);
  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.transaction.balance);
  const services = useSelector((state) => state.services.services);

  if (!user.token) window.location.href = "/";

  const handleClickShowBalance = () =>
    setShowBalance((showBalance) => !showBalance);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const getIdx = params.get("i");
  const currentService = services[getIdx];

  const handleTopUp = (evt) => {
    evt.preventDefault();

    if (balance < currentService.service_tariff) {
      Swal.fire({
        icon: "warning",
        title: "Saldo Anda Tidak Cukup",
        text: "Silahkan To Up terlebih dahulu",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: `Beli ${currentService.service_name} senilai`,
      html: `<strong>Rp${currentService.service_tariff} ?</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan Bayar",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          payment({
            token: user.token,
            code: currentService.service_code,
            serviceName: currentService.service_name,
            serviceTariff: currentService.service_tariff,
          })
        );
      }
    });
  };

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
      <Box
        component="section"
        maxWidth="xl"
        sx={{
          margin: "0 auto",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <img
            src={
              profile.profile_image && profile.profile_image.endsWith("/null")
                ? defaultPofilePhoto
                : profile.profile_image
            }
            style={{ width: 80, height: 80 }}
            alt="Photo Profile"
          />

          <Typography
            component="p"
            sx={{ fontSize: "20px", marginTop: "10px", marginBottom: "5px" }}
          >
            Selamat Datang,
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "30px", marginTop: "0", fontWeight: "bold" }}
          >
            {`${profile.first_name} ${profile.last_name}`}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundImage: `url(${backgroundSaldo})`,
            backgroundRepeat: "no-repeat",
            width: "44%",
            padding: "30px",
          }}
        >
          <Typography component="p" sx={{ color: "#fff" }}>
            Saldo anda
          </Typography>
          <Typography
            component="h1"
            sx={{ color: "#fff", fontWeight: "bold", fontSize: "35px" }}
          >
            {showBalance ? (
              <>
                Rp <span style={{ letterSpacing: "5px" }}>••••••••</span>
              </>
            ) : (
              <>
                Rp <span>{balance && balance}</span>
              </>
            )}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="p" sx={{ color: "#fff" }}>
              Lihat saldo
            </Typography>
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showBalance ? "hide the password" : "display the password"
                }
                onClick={() => handleClickShowBalance()}
                edge="end"
              >
                {showBalance ? (
                  <VisibilityOff sx={{ color: "#fff" }} />
                ) : (
                  <Visibility sx={{ color: "#fff" }} />
                )}
              </IconButton>
            </InputAdornment>
          </Box>
        </Box>
      </Box>
      <Box component="section" maxWidth="xl" sx={{ margin: "0 auto" }}>
        <Typography component="p">Pembayaran</Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <img
            src={currentService.service_icon}
            alt={currentService.service_name}
            style={{ marginRight: "10px", width: "40px" }}
          />
          <Typography component="p" sx={{ fontWeight: "bold" }}>
            {currentService.service_name}
          </Typography>
        </Box>
        <Grid container columnSpacing={3}>
          <Grid
            component="form"
            size={12}
            sx={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleTopUp}
          >
            <NumericFormat
              autoComplete="off"
              customInput={TextField}
              placeholder="Masukkan nominal Top Up"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-disabled .MuiInputBase-input": {
                    color: "black",
                    WebkitTextFillColor: "black",
                    opacity: 1,
                  },
                },
              }}
              thousandSeparator={true}
              decimalScale={0}
              fixedDecimalScale={true}
              disabled
              value={currentService.service_tariff}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#F42618", height: "56px" }}
            >
              Bayar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
