
const CACHE_NAME = "version-1";
const urlsToCahache = ['index.html', 'offline.html'];

const self = this;


// install SW
self.addEventListener('install', (event) =>{

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log("open cache");
        })
     )

} );

// listen for response
self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
                    .catch(()=> caches.match('offline.html'))
        })
    )

});




// Activate teh app

self.addEventListener('activate',(event)=>{
     const cacheWhitelist = [];
     cacheWhitelist.push(CACHE_NAME);

     event.waitUntil(
         caches.keys().then((cacheNames)=> Promise.all(
             cacheNames.map((cacheName) =>{
                 if(!cacheWhitelist.includes(cacheName)){
                     return caches.delete(cacheName);
                 }
             })
         ))
     )
});

