import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Select, Input } from '@chakra-ui/react';
import 'chart.js/auto';
import TransactionsTable from './Components/TransactionsTable';
import useDebounce from "./hooks/useDebounce";
import Statistics from './Components/Statistics';
import BarChart from './Components/BarChart';
import PieChart from './Components/PieChart';

const Dashboard = () => {
  const [month, setMonth] = useState('03');
  const [data, setData] = useState({
    transactions: [],
    statistics: {},
    barChart: {},
    pieChart: {}
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const debouncedSearch = useDebounce(search, 500);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchData();
  }, [month, debouncedSearch, page]);

  const fetchData = async () => {
    const response = await axios.get('/api/v1/alldata', {
      params: { month, search: debouncedSearch, page, perPage }
    });

    setData(response.data.data);
    setHasNextPage(response.data.data.transactions.length === perPage);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Box p={10}>
      <div className='flex justify-between flex-col sm:flex-row'>
        <div className='flex items-center'>
          <Select value={month} onChange={e => setMonth(e.target.value)}>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>
        </div>
        <h1 className='sm:text-2xl bg-white shadow-md  flex items-center p-10 rounded-2xl'>
          Transaction Dashboard
        </h1>
        <div className='flex items-center'>
          <Input
            placeholder="Search transactions"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center '>
        <TransactionsTable transactions={data.transactions} />
        <div className='flex justify-around w-full items-center'>
          <div>
            <h1 className='text-xl font-bold'>Page No: {page}</h1>
          </div>
          <div className='flex gap-4 '>
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)} className='text-xl bg-gray-50 p-4 rounded-xl' >Previous</button>
            <button onClick={() => setPage(page + 1)} className='text-xl bg-gray-50 p-4 rounded-xl' disabled={!hasNextPage}>Next</button>
          </div>
          <div>
            <h1 className='text-xl font-bold'>Per Page: {perPage}</h1>
          </div>
        </div>

        <div className='mt-10'>
          <Statistics data={data} month={month} />
        </div>
        <div className='flex w-full gap-10 mt-10 flex-col items-center  sm:flex-row h-96 min-h-72'>
          <BarChart data={data}/>
          <PieChart data={data}/>
        </div>
      </div>
      <div className='text-center mt-10'>
        <p>&copy; {new Date().getFullYear()} Chetan Gupta - 2020A1R068mietjammu.in</p>
      </div>
    </Box>
  );
};

export default Dashboard;
