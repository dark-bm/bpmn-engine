'use strict';

const Code = require('code');
const factory = require('../helpers/factory');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const Bpmn = require('../..');
const expect = Code.expect;

lab.experiment('MessageEvent', () => {
  let instance;
  lab.before((done) => {
    const engine = new Bpmn.Engine({
      source: factory.resource('lanes.bpmn')
    });
    engine.getInstance((err, mainInstance) => {
      if (err) return done(err);
      instance = mainInstance;
      done();
    });
  });

  lab.describe('inbound', () => {
    lab.test('does not contain message flow', (done) => {
      const event = instance.getChildActivityById('intermediate');
      expect(event.inbound.length).to.equal(1);
      expect(event.inbound[0].type).to.equal('bpmn:SequenceFlow');
      done();
    });
  });
});
