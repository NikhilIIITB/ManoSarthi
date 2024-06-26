import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import { LOGO_IMAGE } from "../../utils/images";
import logo from "../../utils/doctor.svg";
import "../../css/Header.css";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";
import LoginService from "../../Services/LoginService";
const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  const handleLogout = async () => {
    // console.log("Logout")
    try {
      const response = await LoginService.logoutService();
      if (response) {
        console.log("Successfully logged out");
        localStorage.removeItem("JWT");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("User_Id");
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("JWT");
      localStorage.removeItem("ROLE");
      localStorage.removeItem("User_Id");
      navigate("/");
      // alert(error?.response?.data?.message);
      console.log(error);
    }
  };

  const role = localStorage.getItem("ROLE");

  const handleLogoClick = () => {
    if (role === "[ROLE_ADMIN]") {
      navigate("/admin-home");
    } else if (role === "[ROLE_DOCTOR]") {
      navigate("/doctor-home");
    } else if (role === "[ROLE_SUPERVISOR]") {
      navigate("/supervisor-home");
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: "#6467c0" }}
      variant="light"
      fixed="top"
    >
      <Navbar.Brand as={Link} to="/home" onClick={handleLogoClick}>
        <Link
          to=""
          className="flex items-center space-x-3 rtl:space-x-reverse no-underline"
        >
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-white">
            ManoSarthi
          </span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto custom-nav">
          {role === "[ROLE_ADMIN]" && (
            <Link to="/admin-home" className="nav-link text-white">
              {t("header.Home")}
            </Link>
          )}
          {role === "[ROLE_DOCTOR]" && (
            <Link to="/doctor-home" className="nav-link text-white">
              {t("header.Home")}
            </Link>
          )}
          {role === "[ROLE_SUPERVISOR]" && (
            <Link to="/supervisor-home" className="nav-link text-white">
              {t("header.Home")}
            </Link>
          )}
          {/* {role === "[ROLE_DOCTOR]" && (
            <Link to="/doctor-operation" className="nav-link text-white">
              {t("header.Patient")}
            </Link>
          )} */}
          {/* {role === "[ROLE_SUPERVISOR]" && (
            <Link to="/healthworker-home" className="nav-link text-white">
              {t("Actor.HealthWorker")}
            </Link>
          )} */}
          <div className="mr-12">
            <LanguageButton />
          </div>
          {role !== "[ROLE_ADMIN]" && (
            <Link
              to="/profile"
              className="nav-link text-white hover:text-black"
            >
              {t("header.Profile")}
            </Link>
          )}
          <button className="nav-link text-white" onClick={handleLogout}>
            {t("login.Logout")}
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
