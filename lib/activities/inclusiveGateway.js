'use strict';

const debug = require('debug')('bpmn-engine:activity:inclusiveGateway');
const EventEmitter = require('events').EventEmitter;
const util = require('util');

const internals = {};

module.exports = internals.Activity = function(activity, parent) {
  debug('init', activity.id);
  this.activity = activity;
  this.inbound = parent.getInboundSequenceFlows(activity.id);
  this.outbound = parent.getOutboundSequenceFlows(activity.id);
};

util.inherits(internals.Activity, EventEmitter);

internals.Activity.prototype.run = function(variables) {
  debug('run', this.activity.id);
  this.emit('start', this);
  this.emit('end', this);

  takeAll.call(this, this.outbound, variables);
};

function takeAll(outbound, variables) {
  debug(`take all ${this.activity.id} ${outbound.length} sequence flows`);
  outbound.forEach(take.bind(this, variables));
}

function take(variables, outboundSequenceFlow) {
  outboundSequenceFlow.take(variables);
}