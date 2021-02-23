import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { compareImg } from './src/script/utils/workbox';

// Add custom service worker logic, such as a push notification serivce, or json request cache.
self.addEventListener('message', (event: MessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Cache test calls
// https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
registerRoute(
  ({ url }) =>
    url.origin === 'https://pwabuilder-tests-dev.azurewebsites.net' ||
    url.origin ===
      'https://pwabuilder-serviceworker-finder.centralus.cloudapp.azure.com',
  new StaleWhileRevalidate()
);

registerRoute(
  ({ url, request }) => compareImg(url, request),
  new CacheFirst({
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

try {
  //@ts-ignore
  precacheAndRoute(self.__WB_MANIFEST);
} catch (err) {
  console.info('if you are in development mode this error is expected: ', err);
}
