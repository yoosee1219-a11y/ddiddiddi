import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { AppsInTossBundle } from '@apps-in-toss/ait-format'

const artifact = await readFile('ddiddiddi.ait')
const reader = AppsInTossBundle.reader(artifact)
const entries = reader.listEntries()
const bundle = JSON.parse(Buffer.from(await reader.readEntry('bundle.json')).toString())
assert.equal(reader.appName, 'ddiddiddi')
assert.equal(bundle.sdk.version, '3.5.0')
assert.equal(bundle.config.appName, reader.appName)
assert.equal(bundle.deploymentId, reader.deploymentId)
assert(entries.includes('sources/index.html'))
assert.equal(entries.filter(name => /^sources\/assets\/[a-z]+_[ENS]\.png$/.test(name)).length, 36)
assert(!entries.some(name => /(?:^|\/)(?:\.env|node_modules|src\/)|original/.test(name) || name.includes(String.fromCharCode(92))))
let uncompressedBytes = 0
for (const name of entries.filter(entry => entry.startsWith('sources/'))) {
  const bytes = await reader.readEntry(name)
  const built = await readFile(`dist/${name.slice('sources/'.length)}`)
  assert.deepEqual(Buffer.from(bytes), built, `Packaged content differs: ${name}`)
  uncompressedBytes += bytes.byteLength
}
assert.equal(uncompressedBytes, bundle.byteLength)
assert(uncompressedBytes < 100 * 1024 * 1024)
console.log(JSON.stringify({ appName: reader.appName, sdkVersion: bundle.sdk.version,
  deploymentId: reader.deploymentId, entries: entries.length, artifactBytes: artifact.byteLength,
  uncompressedBytes, sha256: createHash('sha256').update(artifact).digest('hex'),
  permissions: reader.permissions, result: 'PASS' }, null, 2))
