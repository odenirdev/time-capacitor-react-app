const CACHE_NAME = 'app-cache-v1'; // Nome do cache
const urlsToCache = [
  '/', // Página inicial
  '/index.html', // Arquivo principal
  '/static/js/bundle.js', // Código JS gerado pelo React
  '/static/css/main.css', // CSS principal
  '/favicon.ico', // Ícone
  '/manifest.json', // Manifesto do PWA
];

// Evento de instalação: Armazena os arquivos no cache
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado!');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Cacheando arquivos...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado!');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de interceptação de requisições: Responde com cache ou busca na rede
self.addEventListener('fetch', (event) => {
  console.log('Interceptando requisição:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o cache se disponível, caso contrário busca na rede
      return response || fetch(event.request);
    })
  );
});
