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

export default function History() {
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toDeleleteId, setToDeleleteId] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL + "/api/predictions/fetchallpredictions",
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setPredictions(res.data.data);
      } else {
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleInfoClick = (id) => {
    navigate("/history/" + id);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete Clicked");
    onOpen();
    setToDeleleteId(id);
    console.log(id);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_URL + "/api/predictions/deleteprediction",
        {
          withCredentials: true,
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
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
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
              <Th>pH</Th>
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
                  <Td>{prediction.ph.value}</Td>
                  <Td>{dayjs(prediction.date).format("DD/MM/YYYY")}</Td>
                  <Td isNumeric>
                    <Button
                      marginRight={2}
                      bg={"gray.300"}
                      size={"sm"}
                      onClick={() => handleInfoClick(prediction._id)}
                    >
                      <Icon as={FaCircleInfo} />
                    </Button>
                    <Button
                      colorScheme="red"
                      size={"sm"}
                      onClick={() => handleDeleteClick(prediction._id)}
                    >
                      <Icon as={FaRegTrashAlt} />
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
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
            <Button variant="solid" colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
