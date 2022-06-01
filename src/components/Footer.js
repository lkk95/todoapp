import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <FooterUl>
      <FooterLi to="/">Home</FooterLi>
      <FooterLi to="/archived">Archived</FooterLi>
      <FooterLi to="/random">Random</FooterLi>
    </FooterUl>
  );
}

const FooterUl = styled.div`
  height: 5em;
  width: 80%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
`;

const FooterLi = styled(NavLink)`
  list-style: none;
  text-decoration: none;
  color: black;
`;
