self.addEventListener("push", (e) => {
  const d = e.data ? e.data.json().catch(() => ({ title: "ping", body: e.data.text() })) : Promise.resolve({ title: "ping", body: "" });
  e.waitUntil(d.then((msg) => self.registration.showNotification(msg.title || "ping", { body: msg.body || "", icon: msg.icon, data: msg })));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow("/"));
});
