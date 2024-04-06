import React, { useContext, useState } from "react";
import { authContext as context } from "../../context/authContext";
// Навігація по сайту
import {
  Navigation,
  DesctopMenu,
  StyledNavLink,
  LinkTitle,
  MenuBtn,
} from "./Menu.styled";
// import { FaListUl } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { IoHammer } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
// import { HiMiniQueueList } from "react-icons/hi2";
import User from "../User/User";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useContext(context);
  // console.log("user: ", role);

  const menuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navigation>
      <DesctopMenu className={isOpen ? "active" : ""}>
        <StyledNavLink to="/" onClick={() => setIsOpen(false)}>
          <GiBrickWall />
          <LinkTitle>Матеріали</LinkTitle>
        </StyledNavLink>

        <StyledNavLink to="services" onClick={() => setIsOpen(false)}>
          <IoHammer />
          <LinkTitle>Послуги</LinkTitle>
        </StyledNavLink>
        {role === "admin" && (
          <StyledNavLink to="projects">
            <GrProjects />
            <LinkTitle>Projects</LinkTitle>
          </StyledNavLink>
        )}
        {role === "admin" && (
          <StyledNavLink to="admin-panel" onClick={() => setIsOpen(false)}>
            <FaGear />
            <LinkTitle>Admin panel</LinkTitle>
          </StyledNavLink>
        )}

        {/* {isLoggedIn && (
          <>
            <StyledNavLink to="projects">
              <GrProjects />
              <LinkTitle>Projects</LinkTitle>
            </StyledNavLink>
            <StyledNavLink to="materials">
              <HiMiniQueueList />
              <LinkTitle>Materials</LinkTitle>
            </StyledNavLink>
          </>
        )} */}
      </DesctopMenu>

      <MenuBtn onClick={menuToggle}>
        <GiHamburgerMenu />
      </MenuBtn>
      <User />
    </Navigation>
  );
};

export default Menu;
