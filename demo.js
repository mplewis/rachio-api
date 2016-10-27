import {Rachio} from './src/rachio'

const apiKey = process.env.RACHIO_API_KEY
const targetDevice = 'Mister Googly'
const targetZone = 'Backyard'

async function main () {
  // Sign into Rachio
  const r = new Rachio(apiKey)

  // Get the current user
  const me = await r.me()
  console.log(me)

  // Get the named device
  const device = me.devices.filter(d => d.data.name === targetDevice)[0]
  console.log(device)

  // Get all device zones
  const zones = device.zones
  console.log(
    zones
    .map(z => [z.data.zoneNumber, z.data.name])
    .sort((a, b) => a[0] - b[0])
  )

  // Get the named zone
  const zone = zones.filter(z => z.data.name === targetZone)[0]
  console.log(zone)

  // Water the zone for 5 seconds
  zone.start(5)
}

main()
