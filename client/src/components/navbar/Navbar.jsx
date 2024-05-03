import { CloseIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Image,
  Button,
  Popover,
  Collapse,
  IconButton,
  useDisclosure,
  PopoverTrigger,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

import logoLight from "../../assets/images/common/Logo2.png";
import logoDark from "../../assets/images/common/Logo5.png";
import { useState } from "react";
import { logout } from "../../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL + "/api/auth/logout",
        {
          withCredentials: true,
          url: process.env.REACT_APP_URL,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(logout());
        navigate("/");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    setLoading(false);
  };

  const logo = useColorModeValue(logoLight, logoDark);

  return (
    <Box position={"fixed"} w={"100vw"} zIndex={999}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          {isLoggedIn ? (
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          ) : (
            ""
          )}
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            <Image
              src={logo}
              alt="logo"
              w={"10rem"}
              h={"3rem"}
              objectFit={"cover"}
            />
          </Link>

          {isLoggedIn && (
            <Flex
              align={"center"}
              display={{ base: "none", md: "flex" }}
              ml={10}
            >
              <DesktopNav />
            </Flex>
          )}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          align={"center"}
          direction={"row"}
          spacing={{ base: 3, md: 6 }}
        >
          <IconButton
            aria-label={"Toggle Color Mode"}
            size={{ base: "sm", md: "md" }}
            icon={
              colorMode === "light" ? (
                <IoSunnyOutline className="text-md md:text-xl" />
              ) : (
                <IoMoonOutline className="text-md md:text-xl" />
              )
            }
            onClick={toggleColorMode}
          />
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="flex justify-center items-center">
                <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"blue.500"}
                  to={"/signup"}
                  _hover={{
                    bg: "blue.600",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button
              isLoading={loading}
              size={{ base: "sm", md: "md" }}
              fontWeight={600}
              colorScheme="red"
              variant={"solid"}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
        </Stack>
      </Flex>

      {isLoggedIn && (
        <Collapse in={isOpen} animateOpacity color={"red"}>
          <MobileNav onToggle={onToggle} />
        </Collapse>
      )}
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                to={navItem.to ?? "/"}
                fontSize={"md"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ onToggle }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} onToggle={onToggle} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ onToggle, label, children, to }) => {
  const { isOpen } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={to ?? "/"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        onClick={onToggle}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} to={child.to}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Prediction",
    to: "/prediction",
  },
  {
    label: "History",
    to: "/history",
  },
];
