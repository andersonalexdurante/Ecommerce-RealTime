'use strict'

/*
|--------------------------------------------------------------------------
| CategoryAndProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CategoryAndProductSeeder {
  async run() {
    const factory_categories = await Factory.model(
      'App/Models/Category'
    ).createMany(5)

    factory_categories.map(async category => {
      const factory_products = await Factory.model(
        'App/Models/Product'
      ).createMany(5)

      factory_products.map(async product => {
        product.categories().attach([category.id])
      })
    })
  }
}

module.exports = CategoryAndProductSeeder
