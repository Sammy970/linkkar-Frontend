import React from "react";
import classes from "./Navbar.module.css";

import logo from "./logo.svg";

// Importing for ChakraUI-React
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

// Importing Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Importing for React-Router-Dom
import { Link, useNavigate } from "react-router-dom";

// Importing UI Components
import LoginButton from "../UI/LoginButton";
import LogoutButton from "../UI/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { user, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const toast = useToast();

  const dashboardRedirectHandler = () => {
    // console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      toast({
        title: "Please Login",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <div className={classes.navbar}>
      <nav className={classes.innerNavbar}>
        <div className={classes.logoAndLinks}>
          <div className={classes.image}>
            <Link to="/">
              <img
                // src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/95-512.png"
                src={logo}
                alt=""
                width={"160px"}
              />
            </Link>
          </div>
          <div className={classes.links}>
            <li>
              <button onClick={dashboardRedirectHandler}>Dashboard</button>
            </li>
            <li>About</li>
          </div>
        </div>
        <div className={classes.action}>
          {isLoading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="2xl"
              style={{ color: "#0f0f0e" }}
            />
          ) : (
            user !== undefined && (
              <Popover>
                <PopoverTrigger>
                  {isLoading === false && isAuthenticated === true && (
                    <img src={user.picture} alt="user" width={50} />
                  )}
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Hello, {user.name}</PopoverHeader>
                  <PopoverBody>Email: {user.email}</PopoverBody>
                </PopoverContent>
              </Popover>
            )
          )}

          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
        <div className={classes.ham}>
          {isLoading === false && isAuthenticated === true && (
            <img
              src={user.picture}
              alt="user"
              width={50}
              className={classes.user}
            />
          )}

          <HamburgerIcon
            className={classes.menuIcon}
            w={10}
            h={10}
            color={"black"}
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody className={classes.actions}>
                <Stack direction={"row"} className={classes.user}>
                  {isLoading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      size="2xl"
                      style={{ color: "#0f0f0e" }}
                    />
                  ) : (
                    user !== undefined && (
                      <Popover>
                        <PopoverTrigger>
                          {isLoading === false && isAuthenticated === true && (
                            <img src={user.picture} alt="user" width={70} />
                          )}
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Hello, {user.name}</PopoverHeader>
                          <PopoverBody>Email: {user.email}</PopoverBody>
                        </PopoverContent>
                      </Popover>
                    )
                  )}

                  {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </Stack>

                <button
                  className={classes.hamburgerOptions}
                  onClick={() => {
                    dashboardRedirectHandler();
                    onClose();
                  }}
                >
                  Dashboard
                </button>

                <Link className={classes.hamburgerOptions}>About</Link>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
