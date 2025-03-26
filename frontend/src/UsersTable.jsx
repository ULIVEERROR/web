import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import axios from "axios";

const UsersTable = ({data}) => {
  const [rows, setRows] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost/api/users");
      const rows = data.map((row, index) => {
        return (
          <Table.Tr key={index}>
            <Table.Td>{row.firstName}</Table.Td>
            <Table.Td>{row.lastName}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
          </Table.Tr>
        );
      });
      setRows(rows);
    };
    fetchData();
  }, [data]);

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs" withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {rows && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </Table.ScrollContainer>
  );
};

export default UsersTable;
