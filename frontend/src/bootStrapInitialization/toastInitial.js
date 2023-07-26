import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl);
});

// To show toast
toastList.forEach((toast) => toast.show());
