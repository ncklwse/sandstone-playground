self.addEventListener('install', async (event) => {

    const buildInfoRequest = await fetch('https://unpkg.com/sandstone@latest/tsconfig.tsbuildinfo');
    const buildInfo = await buildInfoRequest.json();

    console.log(buildInfoRequest.url.match(/(sandstone@(\d{1,2}\.?)+)/));

    event.waitUntil(caches.open(buildInfoRequest.url.match(/(sandstone@(\d{1,2}\.?))+/)[0]).then(async cache => {

        const sourceFiles = Object.keys(buildInfo.program.fileInfos).filter(file => file.match(/^\.\.\/src\/([^]+)\.ts$/));

        await cache.addAll(sourceFiles.map(file => {
            console.log(file);
            return new Request(`https://unpkg.com/${buildInfoRequest.url.match(/(sandstone@(\d{1,2}\.?))+/)[0]}/${file.match(/^\.\.\/src\/([^]+)\.ts$/)}.d.ts`)
        }));

        console.log('All resources have been fetched and cached');

    }));
});

self.addEventListener('fetch', (event) => {
    console.log(event.request.url);
    event.respondWith(caches.match(event.request).then((cachedItem) => {

        if (cachedItem !== undefined) {
            return cachedItem;
        }

        return fetch(event.request).then((response) => {

            // const responseClone = response.clone();
            // caches.open('sandstone-playground@0.0.1').then(() => {
            //     cache.put(event.request, responseClone);
            // });

            return response;

        }).catch(function () {
            console.log(`failed to fetch`);        
        }); 

    }));
});