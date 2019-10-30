const express = require('express');
const mongoose = require('mongoose');

const VitaminSchema = mongoose.Schema({
  name:        { type: String, required: true},
  rda:         { type: String, required: true},
  measurement: { type: String, required: true}
});

const Vitamin = mongoose.model("Vitamin", VitaminSchema);

module.exports = Vitamin;
