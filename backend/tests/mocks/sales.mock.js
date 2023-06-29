const date = '2023-06-28T23:59:10.000Z';

const allSalesFromDB = [
  {
    productId: 1,
    quantity: 5,
    date,
  },
  {
    productId: 2,
    quantity: 10,
    date,
  },
  {
    productId: 3,
    quantity: 15,
    date,
  },
];

const salesByIdFromDB = [
  {
    productId: 1,
    quantity: 5,
    date,
  },
  {
    productId: 2,
    quantity: 10,
    date,
  },
];

const getAllSuccessful = {
  status: 'SUCCESSFUL',
  data: allSalesFromDB,
};

const getByIdSuccessful = {
  status: 'SUCCESSFUL',
  data: salesByIdFromDB,
};

const getByIdNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  allSalesFromDB,
  salesByIdFromDB,
  getAllSuccessful,
  getByIdSuccessful,
  getByIdNotFound,
};