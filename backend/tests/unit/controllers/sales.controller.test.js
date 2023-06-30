const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { getAllSuccessful, newSaleCreated, getByIdSuccessful, getByIdNotFound, newSale,
  deletedSale, updateQuantityInSaleSuccessful,
} = require('../../mocks/sales.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Controller from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('SHOW all sales', async function () {
    sinon.stub(salesService, 'getAll').resolves(getAllSuccessful);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const data = [...getAllSuccessful.data];

    await salesController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('SHOW sales by id', async function () {
    sinon.stub(salesService, 'getById').resolves(getByIdSuccessful);

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = [...getByIdSuccessful.data];
    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('INSERT a new sale', async function () {
    sinon.stub(salesService, 'insert').resolves(newSaleCreated);

    const req = {
      body: newSale,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = { ...newSaleCreated.data };
    await salesController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('DELETE a sale', async function () {
    sinon.stub(salesService, 'remove').resolves(deletedSale);

    const req = {
      params: '1',
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({});
  });

  it('PUT a product quantity in sale', async function () {
    sinon.stub(salesService, 'updateQuantity').resolves(updateQuantityInSaleSuccessful);

    const req = {
      params: { saleId: '1', productId: '1' },
      body: { quantity: 100 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateQuantity(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateQuantityInSaleSuccessful.data);
  });

  it('NOT FOUND sales by id', async function () {
    sinon.stub(salesService, 'getById').resolves(getByIdNotFound);

    const req = {
      params: { id: 0 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const { data } = getByIdNotFound;
    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(data);
  });
});