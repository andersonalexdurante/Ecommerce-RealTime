'use strict'

/*
|--------------------------------------------------------------------------
| 002ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')

class ClientSeeder {
  async run() {
    const role = await Role.findby('slug', 'client')
    const factory_users = await Factory.model('App/Models/User').createMany(20)
    await Promisse.all(
      factory_users.map(async client => {
        await client.roles().attach([role.id])
      })
    )

    const user = await User.create({
      name: 'Anderson',
      surname: 'Alex Durante',
      email: 'andy@example.com',
      password: 'secret',
    })

    const adminRole = await Role.findby('slug', 'admin')
    await user.roles().attach([adminRole.id])
  }
}

module.exports = ClientSeeder
