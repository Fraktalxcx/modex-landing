(() => {
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";

    const endpoint = form.getAttribute("action") || "";

    const data = new FormData(form);
    // Honeypot антиспам. Если поле заполнено — считаем попытку спама.
    if (String(data.get("_gotcha") || "").trim()) return;

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        // Не задаём Accept, чтобы сервис мог вернуть любой формат ответа.
      });
      if (!response.ok) throw new Error("request_failed");
      form.reset();
      status.textContent = "Спасибо! Заявка отправлена. Мы скоро с вами свяжемся.";
    } catch {
      status.textContent = "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону.";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
})();
