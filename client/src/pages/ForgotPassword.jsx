import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "../assets/images/common/Logo4.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "../styles/logo.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
  });

  const [error, setError] = useState({
    emailError: false,
  });

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setError({ ...error, emailError: value.includes("@") === false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error.emailError) {
      return;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/forgotPassword",
        form,
        {
          withCredentials: true,
          url: process.env.REACT_APP_URL,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        navigate("/email");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Container
      maxW="lg"
      pt={{ base: "100", md: "100" }}
      pb={{ base: "12", md: "12" }}
      px={{ base: "4", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="0">
          <Center>
            <Image src={Logo} className={`${styles.logo}`} />
          </Center>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "lg" }}>Forgot Password</Heading>
            <Text color={color} fontSize={{ base: "sm", md: "md" }}>
              Remember your password?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="4">
            <form onSubmit={handleSubmit}>
              <Stack spacing="2">
                <FormControl isInvalid={error.emailError}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <FormErrorMessage>
                    Enter a valid email address
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack spacing="6" mt={6}>
                <Button bg="blue.500" color="white" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
