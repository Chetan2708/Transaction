import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Product from "../models/product.model.js";

const DATA_URL =
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const seedDatabase = asyncHandler(async (req, res) => {
  const response = await axios.get(DATA_URL);
  const products = response.data;
  if (!products) {
    throw new ApiError(409, "No data found in API ");
  }
  
  await Product.deleteMany({});

  await Product.insertMany(products);

  return res
    .status(201)
    .json(new ApiResponse(201, products, "Data seeded successfully"));
});

const getAllData = asyncHandler(async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, 'i'); 
  const monthNumber = parseInt(month, 10);
 
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    throw new ApiError(400, "Invalid month value");
  }

  try {

    //Transactions

    const pipeline = [
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthNumber,
          $or: [
            { title: regex },
            { description: regex },
            { price: regex }
          ],
        },
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: Number(perPage),
      },
    ];

    const transactions = await Product.aggregate(pipeline);
    


    //Statisctics
    const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    const statistics = {
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems

    };


    //Bar Graph
    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0
    };
  
    transactions.forEach(transaction => {
      if (transaction.price <= 100) priceRanges['0-100']++;
      else if (transaction.price <= 200) priceRanges['101-200']++;
      else if (transaction.price <= 300) priceRanges['201-300']++;
      else if (transaction.price <= 400) priceRanges['301-400']++;
      else if (transaction.price <= 500) priceRanges['401-500']++;
      else if (transaction.price <= 600) priceRanges['501-600']++;
      else if (transaction.price <= 700) priceRanges['601-700']++;
      else if (transaction.price <= 800) priceRanges['701-800']++;
      else if (transaction.price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });
  

//Pie chart
    const categoryCounts = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + 1;
      return acc;
    }, {});


    return res.status(200).json(new ApiResponse(200, { transactions, statistics , barChart: priceRanges , pieChart: categoryCounts }));
  }
  catch (error) {
    throw new ApiError(404, 'Data not found');
  }

  });



export const productController = {
    seedDatabase,
    getAllData,
    };
    