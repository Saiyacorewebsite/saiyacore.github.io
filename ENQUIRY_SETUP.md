# Guided website enquiries

The bottom-right “Let’s talk” button is a six-question guided form, not an AI chatbot or live chat service. It collects service interest, name, email, contact number, organisation and a description. Answers stay in the current page's memory until the visitor submits; they are not saved in browser storage. Reloading or navigating to another page clears an unfinished enquiry.

The final form posts to FormSubmit at https://formsubmit.co/santoshhr992@gmail.com. FormSubmit processes the submitted details and forwards enquiries to that address. The visitor sees this routing and must agree before submitting. Normal FormSubmit spam and human-verification checks remain enabled. No email password or API key is embedded in the website.

## Activate and verify delivery

1. Serve the website over HTTP(S), ideally on the intended preview or production domain. Do not test email submission by double-clicking a downloaded HTML file; FormSubmit requires a web-served page.
2. Open “Let’s talk”, complete the six questions with your own test details and consent, then select “Send enquiry”. Complete any FormSubmit verification shown. The submission leaves the website for FormSubmit's hosted response.
3. Check santoshhr992@gmail.com, including spam, for FormSubmit's activation email. Follow its verification link to enable forwarding. Never assume the initial activation-triggering submission was delivered as an enquiry.
4. Submit another test after activation and confirm the recipient receives all six answers. Repeat this check on the actual deployment domain before inviting real enquiries.

Browser tests intercepted the final POST and confirmed all required fields and consent were present. They did not send an email, activate forwarding, or verify end-to-end delivery. If FormSubmit is blocked or unavailable, visitors can use the direct email link displayed in the assistant. There is no server-side inbox or delivery monitoring in this repository.

The separate Contact page uses the same FormSubmit recipient and requires consent. Service enquiry links preselect the service on that page. Test both forms on the intended deployment; the recipient activation requirement applies to email delivery.
