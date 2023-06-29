const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, salesByIdFromDB, newSale, newSaleSuccessful } = require('../../mocks/sales.mock');

describe('Service from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  const SUCCESSFUL = 'SUCCESSFUL';
  const CREATED = 'CREATED';
  const NOT_FOUND = 'NOT_FOUND';

  it('GET all sales', async function () {
    sinon.stub(salesModel, 'getAll').resolves(allSalesFromDB);

    const data = allSalesFromDB;
    const result = await salesService.getAll();

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.equal(data);
  });

  it('GET sales by id', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesByIdFromDB);

    const idProduct = 1;
    const data = [...salesByIdFromDB];
    const result = await salesService.getById(idProduct);

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.deep.equal(data);
  });

  it('INSERT sales', async function () {
    sinon.stub(salesModel, 'insert').resolves(newSaleSuccessful);

    const data = { ...newSaleSuccessful };
    const result = await salesService.insert(newSale);

    expect(result.status).to.be.equal(CREATED);
    expect(result.data).to.be.deep.equal(data);
  });

  it('NOT FOUND sales by id', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const idProduct = 0;
    const result = await salesService.getById(idProduct);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Sale not found' });
  });
});