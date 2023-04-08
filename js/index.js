"use strict";

function init() {
  const form = document.querySelector(".snt-form");
  const closeBtn = document.querySelector(".close-btn");
  const submitBtn = document.querySelector(".control-submit_btn");
  const inputs = document.querySelectorAll("input[type=text],input[type=email],input[type=tel]");
  const checkbox = document.querySelector("input[type=checkbox]");
  const reloadPageBtn = document.querySelector(".reset-btn");
  const errorMsgEmail = document.querySelector(".email-error_msg");
  const errorMsgTel = document.querySelector(".tel-error_msg");

  const errorMsg = {
    checkbox: "This field is required",
    tel: "Enter valid UK mobile number",
    email: "Enter an email address",
    empty: "",
  };

  let areInputsValidated;

  showForm();

  reloadPageBtn.addEventListener("click", () => document.location.reload());

  submitBtn.addEventListener("click", submitForm);

  closeBtn.addEventListener("click", hideForm);

  closeBtn.addEventListener("keydown", e => {
    if (e.key === "Enter") hideForm();
  });

  checkbox.addEventListener("click", () => {
    const checkboxMsg = document.querySelector(".checkbox-error_msg");

    if (!checkbox.checked) {
      checkboxMsg.textContent = errorMsg.checkbox;
      checkboxMsg.style.border = "var(--error-msg-border-clr)";
    } else {
      checkboxMsg.textContent = errorMsg.empty;
      checkboxMsg.style.border = "none";
    }
  });

  form.addEventListener("keypress", validateInputs);

  form.addEventListener("change", () =>
    checkbox.checked && areInputsValidated ? enableButton() : disableButton()
  );

  function validateInputs() {
    inputs.forEach(input => {
      input.addEventListener("change", () =>
        input.validity.valid ? showSuccess(input) : showError(input)
      );
    });
  }

  function enableButton() {
    submitBtn.disabled = false;
    submitBtn.style.opacity = 1;
  }

  function disableButton() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = 0.4;
  }

  function clearInputs() {
    inputs.forEach(input => (input.value = ""));
    checkbox.checked = false;
  }

  function showForm() {
    submitBtn.disabled = true;

    setTimeout(() => {
      form.classList.add("js-form-animation");
      form.style.animation = "var(--fadeIn-animation)";

      hideLoadingMsg();
    }, 5000);
  }

  function submitForm(e) {
    e.preventDefault();

    form.classList.remove("js-form-animation");
    form.style.animation = "var(--fadeOut-animation)";
    form.style.pointerEvents = "none";

    showThankYouMessage();
    clearInputs();
  }

  function showThankYouMessage() {
    const successMessage = document.querySelector(".snt-form_message");

    setTimeout(() => {
      successMessage.style.display = "flex";
      successMessage.style.animation = "var(--fadeIn-animation)";
    }, 1500);
  }

  function hideLoadingMsg() {
    const loadingMsg = document.querySelector(".loading-msg");
    loadingMsg.style.display = "none";
  }

  function hideForm() {
    form.classList.remove("js-form-animation");
    form.style.animation = "var(--fadeOut-animation)";
  }

  function showError(input) {
    if (!input.checkValidity() && input.type === "email") {
      errorMsgEmail.textContent = errorMsg.email;
      errorMsgEmail.style.border = "var(--error-msg-border-clr)";
    }

    if (!input.checkValidity() && input.type === "tel") {
      errorMsgTel.textContent = errorMsg.tel;
      errorMsgTel.style.border = "var(--error-msg-border-clr)";
    }
    areInputsValidated = false;
  }

  function showSuccess(input) {
    if (input.checkValidity()) {
      errorMsgEmail.textContent = errorMsg.empty;
      errorMsgTel.textContent = errorMsg.empty;
      errorMsgEmail.style.border = "none";
      errorMsgTel.style.border = "none";
      areInputsValidated = true;
    }
  }
}

init();
