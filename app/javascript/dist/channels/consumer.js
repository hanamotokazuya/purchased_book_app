"use strict";
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.
Object.defineProperty(exports, "__esModule", { value: true });
const actioncable_1 = require("@rails/actioncable");
exports.default = (0, actioncable_1.createConsumer)();
