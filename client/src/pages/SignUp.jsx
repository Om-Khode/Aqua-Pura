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
import { PasswordField } from "../components/login/PasswordField";
import Logo from "../assets/images/common/Logo4.png";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/logo.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "name") {
      setError({ ...error, nameError: value.length < 3 });
    }

    if (name === "email") {
      setError({ ...error, emailError: value.length === 0 });
    }

    if (name === "password") {
      setError({
        ...error,
        passwordError: value.length < 6,
        confirmPasswordError: value !== form.confirmPassword,
      });
    }

    if (name === "confirmPassword") {
      setError({ ...error, confirmPasswordError: value !== form.password });
    }
  };

  const color = useColorModeValue("gray.600", "gray.300");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      error.nameError ||
      error.emailError ||
      error.passwordError ||
      error.confirmPasswordError
    ) {
      return;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/createuser",
        form,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        navigate("/email");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
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
            <Heading size={{ base: "lg" }}>Create an account</Heading>
            <Text color={color} fontSize={{ base: "sm", md: "md" }}>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
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
                <FormControl isInvalid={error.nameError}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    minLength={3}
                    required
                  />
                  <FormErrorMessage>
                    Name should be at least 3 characters.
                  </FormErrorMessage>
                </FormControl>
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
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>
                <PasswordField
                  name={"password"}
                  label={"Password"}
                  value={form.password}
                  onChange={handleChange}
                  showerror={String(error.passwordError)}
                  labelerror={"Password should be at least 6 characters."}
                />
                <PasswordField
                  name={"confirmPassword"}
                  label={"Confirm Password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  showerror={String(error.confirmPasswordError)}
                  labelerror={"Passwords do not match."}
                />
              </Stack>
              <Stack mt={5} spacing="6">
                <Button bg="blue.500" color="white" type="submit">
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
