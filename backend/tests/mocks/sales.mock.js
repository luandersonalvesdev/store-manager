const date = '2023-06-30T03:00:00.000Z';

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

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
];

const newSaleWithoutProductId = [
  {
    quantity: 1,
  },
];

const newSaleSuccessful = {
  id: 4,
  itemsSold: newSale,
};

const newSaleCreated = {
  status: 'CREATED',
  data: newSaleSuccessful,
};

const updateQuantityInSale = {
  date,
  productId: 1,
  quantity: '100',
  saleId: 1,
};

const updateQuantityInSaleSuccessful = {
  status: 'SUCCESSFUL',
  data: updateQuantityInSale,
};

const updateQuantityInSaleWithoutQuantity = {
  status: 'BAD_REQUEST',
  data: { message: '"quantity" is required' },
};

const updateQuantitySaleNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const updateQuantityProductNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found in sale' },
};

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

const deletedSale = {
  status: 'NO_CONTENT',
  data: {},
};

module.exports = {
  allSalesFromDB,
  salesByIdFromDB,
  getAllSuccessful,
  getByIdSuccessful,
  getByIdNotFound,
  newSale,
  newSaleSuccessful,
  newSaleCreated,
  newSaleWithoutProductId,
  deletedSale,
  updateQuantityInSaleSuccessful,
  updateQuantityInSale,
  updateQuantityInSaleWithoutQuantity,
  updateQuantitySaleNotFound,
  updateQuantityProductNotFound,
};