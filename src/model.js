'use strict'

const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  event: {
    type: Number,
    unique: true
  },
  datetime: Date,
  place: String,
  address: String,
  theme: String,
  requirement: {
    type: String,
    default: 'Traer rica y helada cerveza'
  },
  registry: String
})

Schema.pre('save', function (next) {
  const id = parseInt(Math.random() * (500000 - 470000) + 470000, 10)
  this.registry = `https://guestlist.co/events/${id}`
  next()
})

Schema.virtual('asJson').get(function () {
  const doc = this.toJSON()
  delete doc._id
  delete doc.__v
  return doc
})

module.exports = mongoose.model('Beerjs', Schema)
