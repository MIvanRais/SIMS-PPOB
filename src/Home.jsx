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
import { Avatar, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getUserProfile } from "./features/manage-profile/profile-slice";
import { getUserBalance } from "./features/transaction/transaction-slice";
import { getServices } from "./features/services/service-slice";

const pages = ["Top Up", "Transaction", "Akun"];

export default function Home() {
  const dispatch = useDispatch();

  const [showBalance, setShowBalance] = useState(true);
  const [banners, setBanners] = useState([]);

  const user = useSelector((state) => state.login);
  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.transaction.balance);
  const services = useSelector((state) => state.services.services);

  if (!user.token) window.location.href = "/";

  const handleClickShowBalance = () =>
    setShowBalance((showBalance) => !showBalance);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bannerResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_URL_API}/banner`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!bannerResponse.ok) {
          throw new Error(
            `HTTP error! Banner status: ${bannerResponse.status}`
          );
        }

        const bannerData = await bannerResponse.json();

        setBanners(bannerData.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();

    dispatch(getUserProfile(user.token));
    dispatch(getUserBalance(user.token));
    dispatch(getServices(user.token));
  }, [user.token]);

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
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
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
                    color: "#4F4C4C",
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
                Rp <span>{balance}</span>
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
      <Box
        component="section"
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "50px auto",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {services.map((val, idx) => (
          <Link
            key={idx}
            to={`/pembelian?i=${idx}`}
            style={{
              textDecoration: "none",
              color: "#000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={val.service_icon} alt={`${val.service_code} Icon`} />
            <span>
              {(() => {
                switch (val.service_name) {
                  case "Pajak PBB":
                    return val.service_name.split(" ")[1];
                  case "TV Berlangganan":
                    return val.service_name;
                  case "Voucher Game":
                    return val.service_name;
                  case "Voucher Makanan":
                    return val.service_name;
                  case "Paket Data":
                    return val.service_name;
                  default:
                    return val.service_name.split(" ")[0];
                }
              })()}
            </span>
          </Link>
        ))}
      </Box>
      <Box component="section" maxWidth="xl" sx={{ margin: "0 auto" }}>
        <Typography component="h2" sx={{ fontWeight: "bold", mb: 3 }}>
          Temukan promo menarik
        </Typography>
        <Swiper
          breakpoints={{
            992: {
              spaceBetween: 10,
              slidesPerView: 3.5,
            },
            1200: {
              spaceBetween: 5,
              slidesPerView: 4.5,
            },
            1400: {
              spaceBetween: 5,
              slidesPerView: 5,
            },
          }}
          grabCursor={true}
        >
          {banners.map((val, idx) => (
            <SwiperSlide key={idx}>
              <img src={val.banner_image} alt={val.banner_name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
