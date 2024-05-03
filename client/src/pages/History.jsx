import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Icon } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function History() {
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toDeleleteId, setToDeleleteId] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn === false) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL + "/api/predictions/fetchallpredictions",
        {
          withCredentials: true,
          url: process.env.REACT_APP_URL,
        }
      );
      if (res.data.success) {
        setPredictions(res.data.data);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleClick = (name, id) => {
    navigate(name + id);
  };

  const handleDeleteClick = (id) => {
    onOpen();
    setToDeleleteId(id);
  };

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        process.env.REACT_APP_URL + "/api/predictions/deleteprediction",
        {
          withCredentials: true,
          url: process.env.REACT_APP_URL,
          data: {
            id: toDeleleteId,
          },
        }
      );
      if (res.data.success) {
        setPredictions(
          predictions.filter((prediction) => prediction._id !== toDeleleteId)
        );
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    onClose();
  };

  return (
    <Container
      minW={{ base: "90vw", md: "80vw" }}
      pt={{ base: "24", md: "24" }}
      pb={{ base: "12", md: "12" }}
      px={{ base: "6", sm: "8" }}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead borderBlock={"solid"} borderColor={"gray.300"}>
            <Tr>
              <Th>
                <p className="text-[1rem]">#</p>
              </Th>
              <Th>Langitude</Th>
              <Th>Longitude</Th>
              <Th>Prediction</Th>
              <Th>Date</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {predictions &&
              predictions.map((prediction, index) => (
                <Tr key={index}>
                  <Td>{index + 1}.</Td>
                  <Td>{prediction.longitude.value}</Td>
                  <Td>{prediction.latitude.value}</Td>
                  <Td>{prediction.prediction}</Td>
                  <Td>{dayjs(prediction.date).format("DD/MM/YYYY")}</Td>
                  <Td isNumeric>
                    <Button
                      marginRight={3}
                      bg={"gray.300"}
                      size={{ base: "sm", md: "md" }}
                      onClick={() => handleClick("/history/", prediction._id)}
                      title="View Prediction"
                      _hover={{ bg: "gray.400" }}
                    >
                      <Icon as={FaCircleInfo} color={"black"} />
                    </Button>
                    <Button
                      marginRight={3}
                      bg={"blue.500"}
                      size={{ base: "sm", md: "md" }}
                      colorScheme="blue"
                      onClick={() =>
                        handleClick("/prediction/", prediction._id)
                      }
                      title="Retrieve Prediction"
                    >
                      <Icon as={FaRegEdit} />
                    </Button>
                    <Button
                      colorScheme="red"
                      size={{ base: "sm", md: "md" }}
                      onClick={() => handleDeleteClick(prediction._id)}
                      title="Delete Prediction"
                    >
                      <Icon as={FaRegTrashAlt} />
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        {predictions.length === 0 && (
          <p className="text-center mt-5 w-[100%]">No predictions found!</p>
        )}
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delelte Prediction?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this prediction?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={loading}
              variant="solid"
              colorScheme="red"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
