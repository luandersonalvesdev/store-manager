const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { allSalesFromDB, salesByIdFromDB, newSale, newSaleSuccessful, newSaleWithoutProductId, getByIdNotFound, updateQuantityInSaleSuccessful, updateQuantityInSaleWithoutQuantity, updateQuantitySaleNotFound, updateQuantityProductNotFound } = require('../../mocks/sales.mock');
const { allProductsFromDB, productByIdFromDB } = require('../../mocks/products.mock');
const { NO_CONTENT } = require('../../../src/utils/namesStatusHttp');
const convertDateToString = require('../../../src/utils/convertDate');

describe('Service from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  const SUCCESSFUL = 'SUCCESSFUL';
  const CREATED = 'CREATED';
  const NOT_FOUND = 'NOT_FOUND';
  const BAD_REQUEST = 'BAD_REQUEST';

  it('GET all sales', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSalesFromDB);

    const data = allSalesFromDB;
    const result = await salesService.getAll();

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.equal(data);
  });

  it('GET sale by id', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesByIdFromDB);

    const idProduct = 1;
    const data = [...salesByIdFromDB];
    const result = await salesService.getById(idProduct);

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.deep.equal(data);
  });

  it('INSERT sale', async function () {
    sinon.stub(salesModel, 'insert').resolves(newSaleSuccessful);
    sinon.stub(productsModel, 'getById')
      .onFirstCall()
      .resolves(allProductsFromDB[0])
      .onSecondCall()
      .resolves(allProductsFromDB[1]);

    const data = { ...newSaleSuccessful };
    const result = await salesService.insert(newSale);

    expect(result.status).to.be.equal(CREATED);
    expect(result.data).to.be.deep.equal(data);
  });

  it('INSERT sale with invalid productId', async function () {
    sinon.stub(salesModel, 'insert').resolves(newSaleSuccessful);
    sinon.stub(productsModel, 'getById')
      .onFirstCall()
      .resolves(undefined)
      .onSecondCall()
      .resolves(allProductsFromDB[1]);

    const result = await salesService.insert(newSale);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('INSERT sale without productId', async function () {
    sinon.stub(salesModel, 'insert').resolves(newSaleSuccessful);

    const result = await salesService.insert(newSaleWithoutProductId);

    expect(result.status).to.be.equal(BAD_REQUEST);
    expect(result.data).to.be.deep.equal({ message: '"productId" is required' });
  });

  it('DELETE a sale', async function () {
    sinon.stub(salesModel, 'remove').resolves(undefined);
    sinon.stub(salesModel, 'getById').resolves(salesByIdFromDB);

    const result = await salesService.remove('1');

    expect(result.status).to.be.equal(NO_CONTENT);
    expect(result.data).to.be.deep.equal({});
  });

  it('DELETE a sale that does exist', async function () {
    sinon.stub(salesModel, 'remove').resolves(undefined);
    sinon.stub(salesModel, 'getById').resolves([]);

    const result = await salesService.remove('0');

    expect(result.status).to.be.equal(getByIdNotFound.status);
    expect(result.data).to.be.deep.equal(getByIdNotFound.data);
  });

  it('PUT a product quantity in sale', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesByIdFromDB);
    sinon.stub(productsModel, 'getById').resolves(productByIdFromDB);
    sinon.stub(salesModel, 'updateQuantity').resolves(undefined);

    const result = await salesService.updateQuantity('1', '1', '100');

    const date = convertDateToString().toISOString();

    expect(result.status).to.be.equal(updateQuantityInSaleSuccessful.status);
    expect(result.data).to.be.deep.equal({ ...updateQuantityInSaleSuccessful.data, date });
  });

  it('PUT a product quantity in sale without quantity in req', async function () {
    const result = await salesService.updateQuantity('1', '1');

    expect(result.status).to.be.equal(updateQuantityInSaleWithoutQuantity.status);
    expect(result.data).to.be.deep.equal(updateQuantityInSaleWithoutQuantity.data);
  });

  it('PUT a product quantity that sale does exists', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const result = await salesService.updateQuantity('0', '1', '100');

    expect(result.status).to.be.equal(updateQuantitySaleNotFound.status);
    expect(result.data).to.be.deep.equal(updateQuantitySaleNotFound.data);
  });

  it('PUT a product quantity that product does exists', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesByIdFromDB);
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await salesService.updateQuantity('1', '0', '100');

    expect(result.status).to.be.equal(updateQuantityProductNotFound.status);
    expect(result.data).to.be.deep.equal(updateQuantityProductNotFound.data);
  });

  it('NOT FOUND sales by id', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const idProduct = 0;
    const result = await salesService.getById(idProduct);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Sale not found' });
  });
});