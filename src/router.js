'use strict'

const Router = require('koa-router')
const controllers = require('./controllers')

const router = new Router()

router.post('/', controllers.create)
router.get('/', controllers.list)
router.get('/:event', controllers.get)
router.put('/:event', controllers.update)
router.delete('/:event', controllers.remove)

module.exports = router
