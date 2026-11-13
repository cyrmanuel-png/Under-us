/* Under Us : pages toujours fraîches (réseau d'abord), images en cache */
const C='uu-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./jeux.html','./img/logo.webp','./img/accueil_bg.webp']).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('.mp4'))return;
 const page=r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
 if(page){e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return}
 e.respondWith(caches.match(r).then(m=>{const f=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>m);return m||f}));
});
