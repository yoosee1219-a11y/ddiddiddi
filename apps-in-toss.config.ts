import { defineConfig } from '@apps-in-toss/web-framework/config'

export default defineConfig({
  appName: 'ddiddiddi',
  brand: { primaryColor: '#D9432F' },
  permissions: [{ name: 'photos', access: 'write' }, { name: 'geolocation', access: 'access' }],
  navigationBar: { withBackButton: false, withHomeButton: true, withTitle: true, theme: 'light' },
  webView: { bounces: false, pullToRefreshEnabled: false },
  webBundleDir: 'dist',
})
