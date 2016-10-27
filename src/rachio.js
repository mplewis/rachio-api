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
      if (!body) {
        resolve()
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch (err) {
        console.log(body)
        reject(err)
      }
    })
  })
}

class Person {
  constructor (rachio, data) {
    this._rachio = rachio
    this.devices = data.devices.map(d => new SparseDevice(rachio, d))
    const keys = ['createDate', 'id', 'username', 'fullName', 'email']
    keys.filter(key => (key in data)).forEach(key => (this[key] = data[key]))
  }
}

class SparseDevice {
  constructor (rachio, data) {
    this._rachio = rachio
    this.data = data
    this.zones = data.zones.map(z => new SparseZone(this._rachio, z))
  }
}

class SparseZone {
  constructor (rachio, data) {
    this._rachio = rachio
    this.data = data
  }

  async start (duration) {
    const data = {id: this.data.id, duration: duration}
    return await this._rachio._put('/public/zone/start', data)
  }
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

  async _put (path, data) {
    return await this._req('PUT', path, data)
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
    const personData = await this.person(id)
    const person = new Person(this, personData)
    this._me = person
    return this._me
  }
}
