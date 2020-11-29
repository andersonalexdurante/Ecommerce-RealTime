'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')

class ProductController {
  async index({ request, response, pagination }) {
    //listagem
    const name = request.input('name')
    const query = Product.query()
    if (title) {
      query.where('name', 'LIKE', `%${name}%`)
    }

    //paginação
    const products = await query.paginate(pagination.page, pagination.limit)
    return response.send(products)
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ProductController
