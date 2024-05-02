import React, { useEffect, useState } from "react";
import Map from "../components/prediction/Map";
import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";
import ChemicalInputFields from "../components/prediction/ChemicalInputFields";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getInfo } from "../utils/fetchInfo";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";

export default function Info() {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  const [fetched, setFetched] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    longitude: { value: 0 },
    latitude: { value: 0 },
    ph: { value: 0 },
    ec: { value: 0, unit: "µS/cm" },
    co3: { value: 0, unit: "µS/cm" },
    hco3: { value: 0, unit: "µS/cm" },
    cl: { value: 0, unit: "µS/cm" },
    so4: { value: 0, unit: "µS/cm" },
    no3: { value: 0, unit: "µS/cm" },
    po4: { value: 0, unit: "µS/cm" },
    th: { value: 0, unit: "µS/cm" },
    ca: { value: 0, unit: "µS/cm" },
    mg: { value: 0, unit: "µS/cm" },
    na: { value: 0, unit: "µS/cm" },
    k: { value: 0, unit: "µS/cm" },
    f: { value: 0, unit: "µS/cm" },
    sio2: { value: 0, unit: "µS/cm" },
    result: 0,
  });

  const format = (val) => val + `°`;

  const location = useLocation();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn === false) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  const fetchInfo = async () => {
    const id = location.pathname.split("/")[2];
    if (!id) return;
    const res = await getInfo(id);
    if (res.success) {
      setForm(res.data);
      setPosition({
        lat: res.data.latitude.value,
        lng: res.data.longitude.value,
      });
      setFetched(true);
    } else {
      toast.error(res.msg);
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    const id = location.pathname.split("/")[2];
    navigate("/prediction/" + id);
  };

  return (
    <div>
      {fetched ? (
        <Container
          minW="80vw"
          pt={{ base: "24", md: "24" }}
          pb={{ base: "12", md: "12" }}
          px={{ base: "4", sm: "8" }}
        >
          <Stack spacing="8">
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg={{ base: "transparent", sm: "bg.surface" }}
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Stack spacing="0">
                <Stack spacing={{ base: "2", md: "" }} textAlign="center">
                  <Heading size={{ base: "lg" }}>Well Prediction</Heading>
                </Stack>
                <form>
                  <div>
                    <Map position={position} setPosition={setPosition} />
                  </div>
                  <Stack mb={4} mt={8}>
                    <Box
                      bg={"bg.surface"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      px={{ base: "6", md: "6" }}
                      borderRadius={{ base: "lg", md: "xl" }}
                    >
                      <Flex
                        justify={"space-evenly"}
                        align={"center"}
                        wrap={"wrap"}
                        my={6}
                        gap={6}
                        direction={"column"}
                      >
                        <Flex
                          justify={"center"}
                          gap={{ base: "3", lg: "6" }}
                          wrap={"wrap"}
                          w={"90%"}
                          align={"center"}
                        >
                          <Box
                            bg={"bg.surface"}
                            border={"1px solid"}
                            borderColor={"gray.300"}
                            px={{ base: "6", md: "6" }}
                            py={{ base: "3", md: "3" }}
                            borderRadius={{ base: "lg", md: "xl" }}
                          >
                            <Flex justify={"center"} align={"flex-end"}>
                              <FormLabel htmlFor="latitude" w={"5rem"}>
                                Latitude:
                              </FormLabel>
                              <NumberInput
                                precision={2}
                                value={format(form.latitude.value)}
                                isReadOnly
                                onFocus={(e) => e.target.blur()}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </Flex>
                          </Box>
                          <Box
                            bg={"bg.surface"}
                            border={"1px solid"}
                            borderColor={"gray.300"}
                            px={{ base: "6", md: "6" }}
                            py={{ base: "3", md: "3" }}
                            borderRadius={{ base: "lg", md: "xl" }}
                          >
                            <Flex justify={"center"} align={"flex-end"}>
                              <FormLabel htmlFor="longitude" w={"5rem"}>
                                Longitude:
                              </FormLabel>
                              <NumberInput
                                precision={2}
                                value={format(form.longitude.value)}
                                isReadOnly
                                onFocus={(e) => e.target.blur()}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </Flex>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Stack>
                  <Stack>
                    <ChemicalInputFields
                      form={form}
                      setForm={setForm}
                      info={true}
                    />
                  </Stack>
                  <Stack mt={6} w={"fit-content"} mx={"auto"}>
                    <Box
                      bg={"bg.surface"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      px={{ base: "6", md: "6" }}
                      py={{ base: "3", md: "3" }}
                      borderRadius={{ base: "lg", md: "xl" }}
                    >
                      <Flex justify={"center"} align={"flex-end"}>
                        <FormLabel htmlFor="prediction" w={"5rem"}>
                          Prediction:
                        </FormLabel>
                        <NumberInput
                          precision={2}
                          isReadOnly
                          value={form.prediction}
                        >
                          <NumberInputField />
                        </NumberInput>
                      </Flex>
                    </Box>
                    <Button
                      bg="blue.500"
                      color="white"
                      mt={12}
                      w={80}
                      mx={"auto"}
                      onClick={handleClick}
                    >
                      Retrive this well prediction
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}
