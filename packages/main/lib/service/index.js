module.exports = class extends require('service') {
  constructor (opts = {}) {
    super(opts)
    this.onReady().then(() => {
      const { gateway } = this
      gateway.bind('user')
    })
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
