import React from 'react';

const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
};

const Statistics = ({ data, month }) => {
  const monthName = getMonthName(month);

  return (
    <div className='bg-cyan-100 p-10 rounded-2xl min-w-[300px] shadow-lg'>
      <h2 className='text-3xl mb-4 text-center'>Statistics - {monthName}</h2>
      <div className='bg-yellow-200 p-10 rounded-2xl text-xl grid grid-cols-2 gap-4'>
        <p>Total Sale Amount</p>
        <p>{data.statistics.totalSaleAmount}</p>
        <p>Total Sold Items</p>
        <p>{data.statistics.totalSoldItems}</p>
        <p>Total Not Sold Items</p>
        <p>{data.statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;
