'use strict'

const Beerjs = require('./model')

exports.create = async ctx => {
  try {
    const doc = Beerjs()
    doc.event = ctx.request.body.event
    doc.datetime = ctx.request.body.datetime
    doc.place = ctx.request.body.place
    doc.address = ctx.request.body.address
    doc.theme = ctx.request.body.theme
    doc.requirement = ctx.request.body.requirement
    await doc.save()
    ctx.body = doc
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

exports.list = async ctx => {
  try {
    const docs = await Beerjs.find()
    ctx.body = docs.map(doc => doc.asJson)
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

exports.get = async ctx => {
  try {
    const doc = await Beerjs.findOne({ event: ctx.params.event })
    if (doc) {
      ctx.body = doc.asJson
    } else {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

exports.update = async ctx => {
  try {
    const doc = await Beerjs.findOne({ event: ctx.params.event })
    if (doc) {
      if (ctx.request.body.datetime) {
        doc.datetime = ctx.request.body.datetime
      }
      if (ctx.request.body.place) {
        doc.place = ctx.request.body.place
      }
      if (ctx.request.body.address) {
        doc.address = ctx.request.body.address
      }
      if (ctx.request.body.theme) {
        doc.theme = ctx.request.body.theme
      }
      if (ctx.request.body.requirement) {
        doc.requirement = ctx.request.body.requirement
      }
      await doc.save()
      ctx.body = doc.asJson
    } else {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

exports.remove = async ctx => {
  try {
    const doc = await Beerjs.findOne({ event: ctx.params.event })
    if (doc) {
      await Beerjs.findByIdAndRemove(doc._id)
      ctx.body = doc.asJson
    } else {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}
