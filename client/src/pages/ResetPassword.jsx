import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { PasswordField } from "../components/login/PasswordField";
import Logo from "../assets/images/common/Logo4.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import styles from "../styles/logo.module.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { p1 } = useParams();

  const [form, setForm] = useState({
    userToken: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

  useEffect(() => {
    setForm({ ...form, userToken: p1 });
    // eslint-disable-next-line
  }, [p1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "newPassword") {
      setError({
        ...error,
        newPassword: value.length < 6,
        confirmNewPassword: value !== form.confirmNewPassword,
      });
    }

    if (name === "confirmNewPassword") {
      setError({ ...error, confirmNewPassword: value !== form.newPassword });
    }
  };

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
    if (error.newPassword || error.confirmNewPassword) {
      return;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/resetPassword",
        form,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        navigate("/login");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
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
            <Heading size={{ base: "lg" }}>Reset Password</Heading>
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
              <Stack spacing="6">
                <PasswordField
                  name={"newPassword"}
                  value={form.newPassword}
                  onChange={handleChange}
                  label={"Enter New Password"}
                  showerror={error.newPassword.toString()}
                  labelerror={"Password must be at least 6 characters"}
                />
                <PasswordField
                  name={"confirmNewPassword"}
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  label={"Confirm New Password"}
                  showerror={error.confirmNewPassword.toString()}
                  labelerror={"Passwords do not match"}
                />
              </Stack>
              <Stack spacing="6" mt={6}>
                <Button bg="blue.500" color="white" type="submit">
                  Reset Password
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
