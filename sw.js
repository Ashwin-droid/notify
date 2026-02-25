self.addEventListener("push", (e) => {
  let msg = { title: "ping", body: "" };
  if (e.data) {
    const raw = e.data.text();
    try { msg = JSON.parse(raw); } catch { msg = { title: "ping", body: raw }; }
  }
  e.waitUntil(
    self.registration.showNotification(msg.title || "ping", {
      body: msg.body || "",
      icon: msg.icon,
      data: msg,
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow("/"));
});
