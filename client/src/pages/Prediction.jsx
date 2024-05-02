import React, { useEffect, useState } from "react";
import Map from "../components/prediction/Map";
import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import ChemicalInputFields from "../components/prediction/ChemicalInputFields";
import axios from "axios";
import { toast } from "react-toastify";
import { getInfo } from "../utils/fetchInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";

export default function Prediction() {
  const [showMap, setShowMap] = useState(true);

  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  const [fetched, setFetched] = useState(false);

  const [result, setResult] = useState(null);

  const location = useLocation();

  const fetchInfo = async () => {
    setFetched(false);
    const id = location.pathname.split("/")[2];
    if (!id) {
      setFetched(true);
      return;
    }
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

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn === false) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line
  }, []);

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
  });

  const format = (val) => val + `°`;

  useEffect(() => {
    if (showMap) {
      setForm({
        ...form,
        longitude: { value: parseFloat(position.lng).toFixed(2) },
        latitude: { value: parseFloat(position.lat).toFixed(2) },
      });
    }

    // eslint-disable-next-line
  }, [position]);

  useEffect(() => {
    if (!showMap) {
      setPosition({
        lat: parseFloat(form.latitude.value),
        lng: parseFloat(form.longitude.value),
      });
    }

    // eslint-disable-next-line
  }, [form.latitude, form.longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setForm({
      ...form,
      longitude: { value: parseFloat(form.longitude.value) },
      latitude: { value: parseFloat(form.latitude.value) },
    });

    try {
      const res = await axios.post(
        process.env.REACT_APP_URL + "/api/predictions/addprediction",
        form,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        console.log(res.data.data);
        setResult(res.data.data.prediction);
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
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
                <form onSubmit={handleSubmit}>
                  {showMap && (
                    <div>
                      <Map position={position} setPosition={setPosition} />
                    </div>
                  )}
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
                                onChange={(valueString) => {
                                  setForm({
                                    ...form,
                                    latitude: { value: valueString },
                                  });
                                }}
                                isDisabled={showMap}
                              >
                                <NumberInputField className="disabled:border-gray-400" />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
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
                                onChange={(valueString) => {
                                  setForm({
                                    ...form,
                                    longitude: { value: valueString },
                                  });
                                }}
                                isDisabled={showMap}
                              >
                                <NumberInputField className="disabled:border-gray-400" />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </Flex>
                          </Box>
                        </Flex>
                        <Button
                          onClick={() => {
                            setShowMap(!showMap);
                          }}
                        >
                          {showMap
                            ? "Enter Coordinates Manually"
                            : "Use Map to Enter Coordinates"}
                        </Button>
                      </Flex>
                    </Box>
                  </Stack>
                  <Stack>
                    <ChemicalInputFields form={form} setForm={setForm} />
                  </Stack>
                  <Stack mt={6} w={"fit-content"} mx={"auto"}>
                    {result && (
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
                          <NumberInput precision={2} isReadOnly value={result}>
                            <NumberInputField />
                          </NumberInput>
                        </Flex>
                      </Box>
                    )}
                    <Button
                      bg="blue.500"
                      color="white"
                      type="submit"
                      mt={12}
                      w={80}
                      mx={"auto"}
                    >
                      {!result ? "Submit" : "Revalidate"}
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
