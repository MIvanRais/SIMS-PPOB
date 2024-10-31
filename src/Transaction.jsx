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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const pages = ["Top Up", "Transaction", "Akun"];

export default function Transaction() {
  const [showBalance, setShowBalance] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const user = useSelector((state) => state.login);
  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.transaction.balance);

  if (!user.token) window.location.href = "/";

  const handleClickShowBalance = () =>
    setShowBalance((showBalance) => !showBalance);

  const location = useLocation();

  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchData(offset, limit);
  }, [offset]);

  const fetchData = async (offset, limit) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_URL_API
        }/transaction/history?offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTransactionHistory((prevHistory) => [
        ...prevHistory,
        ...data.data.records,
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const formatDateToIndonesian = (dateStr) => {
    const date = new Date(dateStr);

    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year} ${hours}.${minutes}WIB`;
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
                    display: "flex",
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
        <Typography
          component="p"
          sx={{ fontWeight: "bold", fontSize: "22px", mb: 3 }}
        >
          Semua Transaksi
        </Typography>
        <Box sx={{ width: "100%", bgcolor: "background.paper", mb: 2 }}>
          <nav aria-label="main mailbox folders">
            <List>
              {transactionHistory.map((val, idx) => (
                <ListItem disablePadding sx={{ mb: 3 }} key={idx}>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        component="p"
                        sx={{
                          color:
                            val.transaction_type === "TOPUP"
                              ? "#53BD95"
                              : "#FF5732",
                          mb: 2,
                          fontWeight: "bold",
                          fontSize: "22px",
                        }}
                      >
                        {`${val.transaction_type === "TOPUP" ? "+" : "-"} Rp.${
                          val.total_amount
                        }`}
                      </Typography>
                      <Typography component="p" sx={{ color: "#DDDADA" }}>
                        {formatDateToIndonesian(val.created_on)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component="p"
                        sx={{ color: "#4A4646", fontSize: "14px" }}
                      >
                        {val.description}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
        <Button
          variant="outlined"
          sx={{ width: "100%", color: "#F42618", border: "none", mb: 6 }}
          onClick={handleShowMore}
        >
          Show More
        </Button>
      </Box>
    </>
  );
}
