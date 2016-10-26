import request from 'request'

const baseApiUrl = 'https://api.rach.io/1'

function req (apiKey, method, path, data) {
  return new Promise(function (resolve, reject) {
    request({
      method: method,
      uri: `${baseApiUrl}${path}`,
      json: data,
      auth: {bearer: apiKey}
    }, function (err, resp, body) {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(body))
    })
  })
}

export class Rachio {
  constructor (apiKey) {
    this.apiKey = apiKey
  }

  async _req (method, path, data) {
    return await req(this.apiKey, method, path, data)
  }

  async _get (path, data) {
    return await this._req('GET', path, data)
  }

  async _meId () {
    const idContainer = await this._get('/public/person/info')
    const id = idContainer.id
    return id
  }

  async person (id) {
    return await this._get(`/public/person/${id}`)
  }

  async me () {
    if (this._me) return this._me
    const id = await this._meId()
    const person = await this.person(id)
    this._me = person
    return this._me
  }
}
