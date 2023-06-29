const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { getAllSuccessful, getByIdSuccessful, getByIdNotFound } = require('../../mocks/sales.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Controller from /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Show all sales', async function () {
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

  it('Show sales by id', async function () {
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

  it('Not found sales by id', async function () {
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