import React from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TransactionsTable = ({ transactions }) => {
  return (
    <Table variant="striped" colorScheme="yellow">
      <TableCaption>Transactions</TableCaption>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Price</Th>
          <Th>Date of Sale</Th>
          <Th>Category</Th>
          <Th>Sold</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions?.map(transaction => (
          <Tr key={transaction._id}>
            <Td className='font-bold'>{transaction.title}</Td>
            <Td>{transaction.description}</Td>
            <Td className='font-bold'>{transaction.price}</Td>
            <Td>{new Date(transaction.dateOfSale).toLocaleDateString()}</Td>
            <Td>{transaction.category}</Td>
            <Td className='font-bold'>{transaction.sold ? 'Yes' : 'No'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TransactionsTable;
