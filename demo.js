import {Rachio} from './src/rachio'
import request from 'request'

const apiKey = process.env.RACHIO_API_KEY

async function main () {
  const r = new Rachio(apiKey)

  const result = await r.me()
  console.log(result)
}

main()
