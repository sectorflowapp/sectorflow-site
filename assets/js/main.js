(function () {
  const form = document.querySelector("[data-support-form]");
  if (!form) return;

  const statusEl = form.querySelector("[data-form-status]");
  const turnstileTokenInput = form.querySelector("#cf-turnstile-response");
  const endpointConfigured = form.dataset.endpointConfigured === "true";

  const validators = {
    name(value) {
      const trimmed = value.trim();
      if (trimmed.length < 2) return "Enter your name.";
      if (trimmed.length > 80) return "Name must be 80 characters or fewer.";
      return "";
    },
    email(value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
      return "";
    },
    topic(value) {
      if (!value) return "Choose a support topic.";
      return "";
    },
    message(value) {
      const trimmed = value.trim();
      if (trimmed.length < 30) return "Message must be at least 30 characters.";
      if (trimmed.length > 3000) return "Message must be 3000 characters or fewer.";
      return "";
    }
  };

  function setStatus(message, type) {
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
  }

  function validateField(input) {
    const validator = validators[input.name];
    if (!validator) return "";
    const message = validator(input.value);
    const error = form.querySelector(`[data-error-for="${input.name}"]`);
    if (error) error.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return message;
  }

  window.handleTurnstileSuccess = function (token) {
    if (!turnstileTokenInput) return;
    turnstileTokenInput.value = token || "";
  };

  window.handleTurnstileExpired = function () {
    if (!turnstileTokenInput) return;
    turnstileTokenInput.value = "";
  };

  form.querySelectorAll("input, textarea, select").forEach((input) => {
    if (!validators[input.name]) return;
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("change", () => validateField(input));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.hidden = true;
    statusEl.className = "status";

    const hiddenCompany = form.querySelector("[name='website']");
    if (hiddenCompany && hiddenCompany.value.trim()) {
      setStatus("Your request could not be submitted.", "error-state");
      return;
    }

    let firstInvalid = null;
    form.querySelectorAll("input, textarea, select").forEach((input) => {
      const message = validateField(input);
      if (message && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      setStatus("Please correct the highlighted fields.", "error-state");
      return;
    }

    if (!turnstileTokenInput || !turnstileTokenInput.value.trim()) {
      setStatus("Please complete the Turnstile verification before sending.", "error-state");
      return;
    }

    if (!endpointConfigured) {
      setStatus("The support form is ready for a private backend endpoint. Configure a Cloudflare Worker, Pages Function, or trusted form provider before live submissions are accepted.", "error-state");
      return;
    }

    setStatus("Submitting your support request...", "success");
  });
})();
