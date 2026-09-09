/* 렌탈짱 접수기 서비스워커
   문서(HTML)는 네트워크 우선 → 새 버전을 올리면 바로 반영된다(캐시에 갇히지 않음).
   아이콘·매니페스트는 캐시 우선.
   앱을 새로 배포할 때 아래 V 값의 숫자만 올릴 것. */
const V = "rental-jjang-v4";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.allSettled(CORE.map(u => c.add(u))))  // 일부 실패해도 설치는 진행
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  if(new URL(req.url).origin !== self.location.origin) return;

  const isDoc = req.mode === "navigate" || req.destination === "document";

  if(isDoc){                                   // 네트워크 우선
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(V).then(c => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  e.respondWith(                                // 정적 자원은 캐시 우선
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(V).then(c => c.put(req, copy));
      return res;
    }))
  );
});
