# rachio-api

An example Rachio API client in ES6. Waters my lawn.

Check out the [Rachio API docs](https://rachio.readme.io/).

# Quickstart

## Setup

```
export RACHIO_API_KEY='your-api-key'  # Find this in the webapp: app.rach.io

npm install -g jspm  # Only if you don't have jspm installed globally

# In the project directory
npm install
jspm install
```

## Usage

```
# Waters my one-zone lawn for 5 seconds.
# See demo.js for details.
jspm run demo
```

# FAQ

## What's a SparseDevice/SparseZone?

The Rachio API returns a pretty complete Person object, including nested Devices with nested Zones. These nested objects have a ton of data and should be all you need to do stuff.

But you can request info on individual Devices and Zones through the API. This might return different data.

The nested objects inside Person are turned into SparseDevices and SparseZones to indicate they're nested and did not come from the individual REST GET endpoints.

# License

MIT
