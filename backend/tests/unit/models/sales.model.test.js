const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, salesByIdFromDB } = require('../../mocks/sales.mock');
const connection = require('../../../src/models/connection');

describe('Model from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Get all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);

    const data = [...allSalesFromDB];
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(data);
  });

  it('Get products by id', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdFromDB]);

    const idProduct = 1;
    const data = [...salesByIdFromDB];

    const result = await salesModel.getById(idProduct);
    expect(result).to.be.deep.equal(data);
  });
});