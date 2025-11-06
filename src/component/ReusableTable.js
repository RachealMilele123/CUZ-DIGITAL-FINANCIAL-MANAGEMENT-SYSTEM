import { Table } from "@mantine/core";
import { formatAmount } from "../schemaValidation/Helpers";
import moment from "moment";

function ReusableTable({ transaction }) {
  const rows = transaction?.map((transaction) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>{transaction?.from?.accountHolderName}</Table.Td>
      <Table.Td>{transaction?.to?.accountHolderName}</Table.Td>
      <Table.Td>{transaction?.from?.accountNumber}</Table.Td>
      <Table.Td>{formatAmount(transaction?.amount)}</Table.Td>
      <Table.Td>
        {moment(transaction?.date).format("DD MMM, YYYY [at] h:mm A")}
      </Table.Td>
      <Table.Td>
        {transaction?.description}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>From</Table.Th>
          <Table.Th>To</Table.Th>
          <Table.Th>Account number</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
export default ReusableTable;
