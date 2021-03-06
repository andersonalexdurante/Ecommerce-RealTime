'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot() {
    super.boot()

    this.addHook('afterFind', 'OrderHook.updateValues')
    this.addHook('afterPaginate', 'OrderHook.updateCollectionValues')
  }

  items() {
    return this.hasMany('App/Models/OrderItems')
  }

  coupons() {
    return this.belongsToMany('App/Models/Coupon')
  }

  discounts() {
    return this.hasMany('App/Models/Discount')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Order
