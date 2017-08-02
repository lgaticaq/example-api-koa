'use strict'

const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const router = require('./router')

mongoose.Promise = global.Promise

const db = async function () {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost/beerjs'
    mongoose.connect(uri)
  } catch (err) {
    console.log(err) // eslint-disable-line
    process.exit(1)
  }
}

db()

const app = new Koa()
app.use(logger())
app.use(BodyParser())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
