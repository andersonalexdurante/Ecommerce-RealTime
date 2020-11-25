'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//rotas de autenticação
Route.group(() => {
  Route.post('/register', 'AuthController.register').as('auth.register')
  Route.post('/login', 'AuthController.login').as('auth.login')
  Route.post('/refresh-token', 'AuthController.refreshToken').as(
    'auth.refreshToken'
  )
  Route.post('/logout', 'AuthController.logout').as('auth.logout')

  Route.post('/reset-password', 'AuthController.forgot').as('auth.forgot')
  Route.get('/reset-password', 'AuthController.remember').as('auth.remember')
  Route.put('/reset-password', 'AuthController.reset').as('auth.reset')
})
  .prefix('v1/auth')
  .namespace('Auth')

//rotas de admin
Route.group(() => {
  Route.resource('/categories', 'CategoryController').apiOnly()
  Route.resource('/products', 'ProductController').apiOnly()
  Route.resource('/images', 'ImageController').apiOnly()
  Route.resource('/users', 'UserController').apiOnly()
  Route.resource('/orders', 'OrderController').apiOnly()
  Route.resource('/coupons', 'CouponController').apiOnly()
})
  .prefix('v1/admin')
  .namespace('Admin')

//rotas de clientes
Route.group(() => {
  Route.get('/products', 'ProductController.index')
  Route.get('/products/:id', 'ProductController.show')

  Route.get('/orders', 'OrderController.index')
  Route.post('/orders', 'OrderController.store')
  Route.get('/orders/:id', 'OrderController.show')
  Route.put('/orders/:id', 'OrderController.put')
})
  .prefix('v1')
  .namespace('Client')
