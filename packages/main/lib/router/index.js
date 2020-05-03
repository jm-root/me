const { ms } = require('jm-server')
const error = require('jm-err')
const Err = error.Err

module.exports = function (service) {
  const router = ms.router()

  router
    .use(async opts => {
      const { acl_user: id, acl_role: role } = opts.headers
      if (!id) throw error.err(Err.FA_NOAUTH)
      opts.user = { id, role }
    })
    .use('/user', async opts => {
      const { user: { id }, uri } = opts
      const { user } = service.gateway
      return user.request({
        ...opts,
        uri: uri.replace('/user', `/users/${id}`)
      })
    })

  return router
}
