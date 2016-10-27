import {Rachio} from './src/rachio'

const apiKey = process.env.RACHIO_API_KEY
const targetDevice = 'Mister Googly'  // Name of the Rachio to use
const targetZone = 1  // Number of the zone to water
const waterDuration = 5  // How long to water, in seconds

// This has to be async because we await some results
async function main () {
  // Sign into Rachio
  const r = new Rachio(apiKey)

  // Get the current user
  const me = await r.me()
  console.log(me)

  // Get the named device
  const device = me.devices.find(d => d.data.name === targetDevice)
  console.log(device)

  // Get all device zones
  const zones = device.zones
  console.log(
    zones
    .map(z => [z.data.zoneNumber, z.data.name])
    .sort((a, b) => a[0] - b[0])
  )

  // Get the named zone
  const zone = zones.find(z => z.data.zoneNumber === targetZone)
  console.log(zone)

  // Water the zone for the specified duration
  await zone.start(waterDuration)
}

main()
