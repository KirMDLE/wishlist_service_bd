import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo-name.svg";
import { styled } from "styled-components";

const HeaderContainer = styled.header`
  height: 60px;
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background: #fafafa;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;
  }
`;

const Time = styled.span`
  margin-left: 1rem;
  font-weight: 500;
`;


export default function Header() {

const mainHeader: React.FC = () => {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HeaderContainer>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>

      <Nav>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} style={{ color: "red" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Time>{now.toLocaleTimeString()}</Time>
      </Nav>
    </HeaderContainer>
  );
};

}