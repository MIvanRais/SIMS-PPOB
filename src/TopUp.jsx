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
import { Avatar, Button, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MoneyIcon from "@mui/icons-material/Money";
import Grid from "@mui/material/Grid2";
import { NumericFormat } from "react-number-format";
import { topUp } from "./features/transaction/transaction-slice";
import Swal from "sweetalert2";

const pages = ["Top Up", "Transaction", "Akun"];

export default function TopUp() {
  const dispatch = useDispatch();

  const [showBalance, setShowBalance] = useState(true);

  const [topUpSaldo, setTopUpSaldo] = useState();
  const user = useSelector((state) => state.login);
  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.transaction.balance);

  if (!user.token) window.location.href = "/";

  const handleClickShowBalance = () =>
    setShowBalance((showBalance) => !showBalance);

  const handleTopUpBalance = (data) => setTopUpSaldo(data);
  const handlePickTopUpBalance = (val) => setTopUpSaldo(val);

  const location = useLocation();

  const handleTopUp = (evt) => {
    evt.preventDefault();

    if (topUpSaldo < 10000 || topUpSaldo > 1000000) {
      Swal.fire({
        icon: "warning",
        title: "Jumlah Tidak Valid",
        text: "Silakan masukkan jumlah antara 10.000 dan 1.000.000.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Anda yakin untuk Top Up sebesar",
      html: `<strong>Rp${topUpSaldo} ?</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan Top Up",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(topUp({ token: user.token, amount: topUpSaldo }));
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
          <Avatar
            src={
              profile.profile_image && profile.profile_image.endsWith("/null")
                ? defaultPofilePhoto
                : profile.profile_image
            }
            style={{ width: 80, height: 80 }}
            alt="Photo Profile"
          ></Avatar>

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
        <Typography component="p">Silahkan Masukan</Typography>
        <Typography
          component="p"
          sx={{ fontWeight: "bold", fontSize: "30px", mb: "40px" }}
        >
          Nominal Top Up
        </Typography>
        <Grid container columnSpacing={3}>
          <Grid
            component="form"
            size={9}
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
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              thousandSeparator={true}
              decimalScale={0}
              fixedDecimalScale={true}
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                handleTopUpBalance(value);
              }}
              value={topUpSaldo}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#F42618", height: "56px" }}
              disabled={topUpSaldo ? false : true}
            >
              Top Up
            </Button>
          </Grid>
          <Grid size={3}>
            <Grid container rowSpacing={3} columnSpacing={1}>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "56px",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  size="large"
                  onClick={() => handlePickTopUpBalance(10000)}
                >
                  Rp10.000
                </Button>
              </Grid>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "56px",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  size="large"
                  onClick={() => handlePickTopUpBalance(20000)}
                >
                  Rp20.000
                </Button>
              </Grid>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "56px",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  size="large"
                  onClick={() => handlePickTopUpBalance(50000)}
                >
                  Rp50.000
                </Button>
              </Grid>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "56px",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  size="large"
                  onClick={() => handlePickTopUpBalance(100000)}
                >
                  Rp100.000
                </Button>
              </Grid>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "56px",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  size="large"
                  onClick={() => handlePickTopUpBalance(250000)}
                >
                  Rp250.000
                </Button>
              </Grid>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "56px",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  size="large"
                  onClick={() => handlePickTopUpBalance(500000)}
                >
                  Rp500.000
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
