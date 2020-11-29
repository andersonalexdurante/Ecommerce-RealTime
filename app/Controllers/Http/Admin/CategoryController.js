'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/Category')

class CategoryController {
  async index({ request, response, view, pagination }) {
    //listagem
    const title = request.input('title')
    const query = Category.query()
    if (title) {
      query.where('title', 'LIKE', `%${title}%`)
    }

    //paginação
    const categories = await query.paginate(pagination.page, pagination.limit)
    return response.send(categories)
  }

  async store({ request, response }) {
    try {
      const { title, description, image_id } = request.all()
      const category = await Category.create({
        title,
        description,
        image_id,
      })
      return response.status(201).send({ data: category })
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erro ao processar a solicitação' })
    }
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = CategoryController
