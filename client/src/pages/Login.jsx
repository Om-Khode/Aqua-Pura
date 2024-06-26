import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PasswordField } from "../components/login/PasswordField";
import Logo from "../assets/images/common/Logo4.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "../styles/logo.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const color = useColorModeValue("gray.600", "gray.300");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setError({ ...error, emailError: value.includes("@") === false });
    }

    if (name === "password") {
      setError({ ...error, passwordError: value.length < 6 });
    }
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (error.emailError || error.passwordError) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/login",
        form,
        {
          withCredentials: true,
          url: process.env.REACT_APP_URL,
        }
      );
      if (res.data.success) {
        dispatch(login(res.data.user));
        toast.success(res.data.msg);
        navigate("/");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
    setLoading(false);
  };

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
            <Heading size={{ base: "lg" }}>Log in to your account</Heading>
            <Text color={color} fontSize={{ base: "sm", md: "md" }}>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
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
                <PasswordField
                  name={"password"}
                  value={form.password}
                  onChange={handleChange}
                  label={"Password"}
                  showerror={error.passwordError.toString()}
                  labelerror={"Password must be at least 6 characters"}
                />
              </Stack>
              <HStack justify="space-between" className="my-3">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Link
                  to="/forgotPassword"
                  className="text-sm my-2 text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </HStack>
              <Stack spacing="6">
                <Button
                  isLoading={loading}
                  bg="blue.500"
                  color="white"
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
