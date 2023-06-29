const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, salesByIdFromDB } = require('../../mocks/sales.mock');

describe('Service from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  const SUCCESSFUL = 'SUCCESSFUL';
  const NOT_FOUND = 'NOT_FOUND';

  it('Get all products', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSalesFromDB);

    const data = allSalesFromDB;
    const result = await salesService.getAll();

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.equal(data);
  });

  it('Get product by id', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesByIdFromDB);

    const idProduct = 1;
    const data = [...salesByIdFromDB];
    const result = await salesService.getById(idProduct);

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.deep.equal(data);
  });

  it('Not found product by id', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const idProduct = 0;
    const result = await salesService.getById(idProduct);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Sale not found' });
  });
});