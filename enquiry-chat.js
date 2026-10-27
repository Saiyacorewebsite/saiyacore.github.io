// A guided enquiry assistant. Details leave the browser only on final submission.
(() => {
  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "chat-launcher";
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.setAttribute("aria-controls", "enquiry-chat");
  launcher.innerHTML = '<span aria-hidden="true">✦</span> Let’s talk';
  const dialog = document.createElement("dialog");
  dialog.id = "enquiry-chat";
  dialog.className = "enquiry-chat";
  dialog.setAttribute("aria-labelledby", "chat-title");
  dialog.innerHTML = `
    <header class="chat-header"><div><span class="chat-kicker">SAIYACORE ENQUIRY ASSISTANT</span><h2 id="chat-title">Let’s build what’s next.</h2></div><button type="button" class="chat-close" aria-label="Close enquiry assistant">×</button></header>
    <p class="chat-intro">Six quick questions to help us understand your organisation. This is a guided form, not a live agent.</p>
    <p class="chat-progress" aria-live="polite" aria-atomic="true">Question 1 of 6</p>
    <form action="https://formsubmit.co/santoshhr992@gmail.com" method="POST" class="chat-form">
      <input type="hidden" name="_subject" value="New Saiyacore website enquiry" />
      <input type="hidden" name="_template" value="table" />
      <div hidden aria-hidden="true"><label>Leave this blank<input name="_honey" tabindex="-1" autocomplete="off" /></label></div>
      <div class="chat-step"><label for="chat-service">What can we help you with?</label><select id="chat-service" name="service" required><option value="">Choose an area</option><option>AI &amp; Intelligent Automation</option><option>Cloud Platforms</option><option>DevOps &amp; IaC</option><option>Workflow Automation</option><option>Observability</option><option>Security &amp; Compliance</option><option>Managed Operations</option><option>Something else / help me decide</option></select></div>
      <div class="chat-step" hidden><label for="chat-name">What’s your name?</label><input id="chat-name" name="name" autocomplete="name" maxlength="120" required /></div>
      <div class="chat-step" hidden><label for="chat-email">What’s your work email?</label><input id="chat-email" name="email" type="email" autocomplete="email" maxlength="254" required /><p>We’ll use this to respond to your enquiry.</p></div>
      <div class="chat-step" hidden><label for="chat-phone">What’s your contact number?</label><input id="chat-phone" name="phone" type="tel" autocomplete="tel" maxlength="50" required /><p>Please include your country code.</p></div>
      <div class="chat-step" hidden><label for="chat-organisation">Which organisation are you with?</label><input id="chat-organisation" name="organisation" autocomplete="organization" maxlength="180" required /></div>
      <div class="chat-step" hidden><label for="chat-description">What would you like to achieve?</label><textarea id="chat-description" name="description" rows="5" maxlength="5000" required placeholder="Tell us about your organisation’s needs, current challenges, timeline and any project goals."></textarea><label class="chat-consent"><input type="checkbox" name="consent" value="Agreed to FormSubmit processing and email contact about this enquiry" required /><span>I agree to send these details through FormSubmit to Saiyacore and be contacted about this enquiry.</span></label><p>Please don’t include passwords, credentials or confidential information.</p></div>
      <p class="chat-routing">On submission, FormSubmit processes your details and forwards them to <a href="mailto:santoshhr992@gmail.com">santoshhr992@gmail.com</a>. You may be asked to verify you’re human. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit privacy policy <span class="visually-hidden">(opens in a new tab)</span></a>.</p>
      <div class="chat-actions"><button class="chat-back" type="button" hidden>Back</button><button class="btn-primary chat-next" type="button">Next →</button><button class="btn-primary chat-send" type="submit" hidden>Send enquiry ↗</button></div>
    </form>
    <p class="chat-direct">Prefer email? <a href="mailto:santoshhr992@gmail.com">Contact Santosh directly ↗</a></p>`;
  document.body.append(launcher, dialog);
  const form = dialog.querySelector("form");
  const steps = [...dialog.querySelectorAll(".chat-step")];
  const next = dialog.querySelector(".chat-next");
  const back = dialog.querySelector(".chat-back");
  const send = dialog.querySelector(".chat-send");
  let current = 0;
  function showStep() {
    steps.forEach((step, index) => {
      step.hidden = index !== current;
    });
    back.hidden = current === 0;
    next.hidden = current === steps.length - 1;
    send.hidden = current !== steps.length - 1;
    dialog.querySelector(".chat-progress").textContent =
      `Question ${current + 1} of ${steps.length}`;
    steps[current].querySelector("input,select,textarea").focus();
  }
  function validStep() {
    return [...steps[current].querySelectorAll("input,select,textarea")].every(
      (field) => field.reportValidity(),
    );
  }
  launcher.addEventListener("click", () => {
    dialog.showModal();
    showStep();
  });
  dialog
    .querySelector(".chat-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => launcher.focus());
  next.addEventListener("click", () => {
    if (validStep()) {
      current++;
      showStep();
    }
  });
  back.addEventListener("click", () => {
    current--;
    showStep();
  });
  form.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      event.target.tagName !== "TEXTAREA" &&
      event.target.tagName !== "BUTTON" &&
      current < steps.length - 1
    ) {
      event.preventDefault();
      next.click();
    }
  });
  form.addEventListener("submit", (event) => {
    // Revisit any invalid earlier answer before leaving for FormSubmit.
    const invalidIndex = steps.findIndex((step) =>
      [...step.querySelectorAll("input,select,textarea")].some(
        (field) => !field.checkValidity(),
      ),
    );
    if (invalidIndex !== -1) {
      event.preventDefault();
      current = invalidIndex;
      showStep();
      validStep();
    }
  });
})();
