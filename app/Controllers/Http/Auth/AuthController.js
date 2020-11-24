'use strict'

class AuthController {
  async register({ request, response }) {}

  async login({ request, response, auth }) {}

  async refreshToken({ request, response, auth }) {}

  async logout({ request, response, auth }) {}

  async forgot({ request, response }) {}

  async remember({ request, response }) {}

  async reset({ request, response }) {}
}

module.exports = AuthController
