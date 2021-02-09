'use strict';

const cacheName = 'cache-v1';

const resourcesToCache = [
    '',
    'index.html',
    'light.css',
    'controller.js',
    'model.js',
    'normalize.css',
    'view.js',
    'resources/flags/AUD.png',
    'resources/flags/BGN.png',
    'resources/flags/BRL.png',
    'resources/flags/CAD.png',
    'resources/flags/CHF.png',
    'resources/flags/CNY.png',
    'resources/flags/CZK.png',
    'resources/flags/DKK.png',
    'resources/flags/EUR.png',
    'resources/flags/GBP.png',
    'resources/flags/HKD.png',
    'resources/flags/HRK.png',
    'resources/flags/HUF.png',
    'resources/flags/IDR.png',
    'resources/flags/ILS.png',
    'resources/flags/INR.png',
    'resources/flags/ISK.png',
    'resources/flags/JPY.png',
    'resources/flags/KRW.png',
    'resources/flags/MXN.png',
    'resources/flags/MYR.png',
    'resources/flags/NOK.png',
    'resources/flags/NZD.png',
    'resources/flags/PHP.png',
    'resources/flags/PLN.png',
    'resources/flags/RON.png',
    'resources/flags/RUB.png',
    'resources/flags/SEK.png',
    'resources/flags/SGD.png',
    'resources/flags/THB.png',
    'resources/flags/TRY.png',
    'resources/flags/USD.png',
    'resources/flags/ZAR.png',
    'resources/reverse.png',
    'resources/menuIcon.JPG',
    'resources/close.JPG'
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToCache);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Acticate event!');
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});


