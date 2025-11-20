import React, { useState, useEffect } from "react";
import {
  Table,
  Badge,
  Group,
  Text,
  Stack,
  Box,
  Avatar,
  ScrollArea,
  ActionIcon,
  Tooltip,
  Modal,
} from "@mantine/core";
import { IconUser, IconEye, IconReceipt } from "@tabler/icons-react";
import moment from "moment";

const Receipts = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOpened, setViewOpened] = useState(false);
  const [receiptOpened, setReceiptOpened] = useState(false);

  // FETCH STUDENT DATA
  useEffect(() => {
    fetch("http://localhost:3000/api/students")
      .then((res) => res.json())
      .then((data) => {
        console.log("API STUDENT DATA:", data);
        setStudents(data);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  const openView = (student) => {
    setSelectedStudent(student);
    setViewOpened(true);
  };

  const openReceipt = (student) => {
    setSelectedStudent(student);
    setReceiptOpened(true);
  };

  return (
    <>
      <ScrollArea>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: "#f8f9fa" }}>
              <Table.Th>#</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Course</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {students.length > 0 ? (
              students.map((st, index) => (
                <Table.Tr key={st._id}>
                  <Table.Td>
                    <Avatar size="sm" color="blue" radius="xl">
                      {index + 1}
                    </Avatar>
                  </Table.Td>

                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" color="gray" radius="xl">
                        <IconUser size="0.8rem" />
                      </Avatar>
                      <Stack gap={0}>
                        <Text fw={500}>{st.name}</Text>
                        <Text size="xs" c="dimmed">
                          {st.studentId}
                        </Text>
                      </Stack>
                    </Group>
                  </Table.Td>

                  <Table.Td>{st.email}</Table.Td>
                  <Table.Td>{st.course}</Table.Td>
                  <Table.Td>{st.phone}</Table.Td>

                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="View Details">
                        <ActionIcon
                          variant="light"
                          size="sm"
                          color="blue"
                          onClick={() => openView(st)}
                        >
                          <IconEye size="0.8rem" />
                        </ActionIcon>
                      </Tooltip>

                      <Tooltip label="View Receipt">
                        <ActionIcon
                          variant="light"
                          size="sm"
                          color="green"
                          onClick={() => openReceipt(st)}
                        >
                          <IconReceipt size="0.8rem" />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7} ta="center" py="xl">
                  <Text>No data found.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {/* 🔵 VIEW DETAILS MODAL */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title="Student Details"
      >
        {selectedStudent && (
          <div style={{ lineHeight: "1.7", fontSize: "15px" }}>
          
            <Text>
              <b>Date of Birth:</b>{" "}
              {moment(selectedStudent.dob).format("MMM DD, YYYY")}
            </Text>
            <Text>
              <b>Expected Completion:</b> {selectedStudent.expectedCompletion}
            </Text>
            <Text>
              <b>Approved:</b>{" "}
              <Badge color={selectedStudent.approved ? "green" : "red"}>
                {selectedStudent.approved ? "Approved" : "Not Approved"}
              </Badge>
            </Text>
          </div>
        )}
      </Modal>

      {/* 🟢 RECEIPT MODAL */}
      <Modal
        opened={receiptOpened}
        onClose={() => setReceiptOpened(false)}
        title="Student Receipt"
      >
        {selectedStudent && (
          <Box p="md" style={{ fontFamily: "Poppins", lineHeight: 1.7 }}>
            <Text fw={700} size="lg" ta="center">
              🎓 Student Registration Receipt
            </Text>

            <Stack mt="md" gap="xs">
              <Text><b>Name:</b> {selectedStudent.name}</Text>
              <Text><b>Course:</b> {selectedStudent.course}</Text>
              <Text><b>Student ID:</b> {selectedStudent.studentId}</Text>
              <Text><b>Email:</b> {selectedStudent.email}</Text>
              <Text><b>Phone:</b> {selectedStudent.phone}</Text>
              <Text>
                <b>Registered On:</b>{" "}
                {moment(selectedStudent.createdAt).format("MMM DD, YYYY")}
              </Text>
              <Text><b>TPIN:</b> {selectedStudent.tpinNumber}</Text>
              <Text><b>National ID:</b> {selectedStudent.nationalId}</Text>
              <Text>
                <b>Status:</b>{" "}
                <Badge color={selectedStudent.approved ? "green" : "yellow"}>
                  {selectedStudent.approved ? "Approved" : "Pending"}
                </Badge>
              </Text>
            </Stack>

            <Text mt="lg" size="sm" ta="center" c="dimmed">
          
            </Text>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default Receipts;
