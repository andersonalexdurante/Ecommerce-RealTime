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
    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
    }

    //paginação
    const products = await query.paginate(pagination.page, pagination.limit)
    return response.send(products)
  }

  async store({ request, response }) {
    try {
      const { name, description, price, image_id } = request.all()
      const product = await Product.create({
        name,
        description,
        price,
        image_id,
      })
      return response.status(201).send({ data: product })
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erro ao processar a solicitação' })
    }
  }

  async show({ params: { id }, response }) {
    const product = await Product.findOrFail(id)
    return response.send(product)
  }

  async update({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)
    try {
      const { name, description, price, image_id } = request.all()
      await product.merge({ name, description, price, image_id })
      await product.save()
      return response.send({ data: product })
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao atualizar produto' })
    }
  }

  async destroy({ params: { id }, response }) {
    const product = await Product.findOrFail(id)
    try {
      await product.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o produto' })
    }
  }
}

module.exports = ProductController
