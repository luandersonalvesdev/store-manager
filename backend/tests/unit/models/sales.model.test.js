const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, salesByIdFromDB, newSale, newSaleSuccessful } = require('../../mocks/sales.mock');
const connection = require('../../../src/models/connection');

describe('Model from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('GET all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);

    const data = [...allSalesFromDB];
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(data);
  });

  it('GET sales by id', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdFromDB]);

    const idProduct = 1;
    const data = [...salesByIdFromDB];

    const result = await salesModel.getById(idProduct);
    expect(result).to.be.deep.equal(data);
  });

  it('INSERT a new sale', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 4 }])
      .onSecondCall()
      .resolves([]);

    const result = await salesModel.insert(newSale);
    expect(result).to.be.deep.equal(newSaleSuccessful);
  });

  it('DELETE a sale', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves(undefined)
      .onSecondCall()
      .resolves(undefined);

    const result = await salesModel.remove('1');
    expect(result).to.be.deep.equal(undefined);
  });
});