const form = document.querySelector("form");
const orderBtnsBlock = document.querySelector(".orderBtn");
const notificationsContainer = document.querySelector(
  ".notificationsContainer",
);
const paidBtn = document.querySelector(".paidBtn");
const sentBtn = document.querySelector(".sentBtn");
const recievedBtn = document.querySelector(".recievedBtn");
const errorBtn = document.querySelector(".errorBtn");

class Notifications {
  static notificationsList = [];

  constructor(title, type, info) {
    this.id = Math.random();
    this.title = title;
    this.type = type;
    this.info = info;
    Notifications.notificationsList.push(this);
    Notifications.renderNotifications(this);
  }

  static renderNotifications(newNotif) {
    if (!newNotif) return;
    let iconClass = "fa-solid fa-circle-plus";
    if (newNotif.type === "success") iconClass = "fa-solid fa-circle-check";
    if (newNotif.type === "warning")
      iconClass = "fa-solid fa-triangle-exclamation";
    if (newNotif.type === "error") iconClass = "fa-solid fa-circle-xmark";
    if (newNotif.type === "info") iconClass = "fa-solid fa-circle-info";

    const notifElement = document.createElement("div");
    notifElement.className = `notificationItem ${newNotif.type}`;
    notifElement.setAttribute("data-id", newNotif.id);
    notifElement.innerHTML = `
      <div class="notificationIconWrapper">
          <i class="${iconClass} notificationIcon"></i>
      </div>
      <div class="notification-content">
          <h4>${newNotif.title}</h4>
          <p>${newNotif.info}</p>
      </div>
      <button class="notificationClose">&times;</button>
    `;

    notificationsContainer.prepend(notifElement);
    notificationsContainer.scrollTop = 0;
  }

  static deleteNotifications(id) {
    const notifElement = notificationsContainer.querySelector(
      `[data-id="${id}"]`,
    );

    if (notifElement) {
      notifElement.classList.add("hide");

      notifElement.addEventListener(
        "animationend",
        () => {
          Notifications.notificationsList =
            Notifications.notificationsList.filter((notif) => notif.id !== id);
          notifElement.remove();
        },
        { once: true },
      );
    }
  }
}

notificationsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("notificationClose")) {
    const parentCard = event.target.closest(".notificationItem");
    const notifId = Number(parentCard.dataset.id);
    Notifications.deleteNotifications(notifId);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  new Notifications("Success", "create", "Order created successfully!");
  orderBtnsBlock.classList.remove("hidden");
  form.reset();
});

paidBtn.addEventListener("click", () => {
  new Notifications("Payment", "success", "Order paid successfully");
});

sentBtn.addEventListener("click", () => {
  new Notifications("Delivery", "warning", "Order sent to delivery service");
});

recievedBtn.addEventListener("click", () => {
  new Notifications("Status", "info", "Order received by customer");
});

errorBtn.addEventListener("click", () => {
  new Notifications(
    "Error",
    "error",
    "An error occurred while processing the request",
  );
});
