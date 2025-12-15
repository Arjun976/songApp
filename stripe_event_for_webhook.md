The Stripe event you should set for your webhook endpoint is `checkout.session.completed`.

This event is triggered when a customer successfully completes their payment session. Your backend's webhook handler (specifically, the `handleWebhook` function in `Be/controllers/paymentController.js`) is designed to listen for this event to fulfill the purchase (i.e., add the song to the user's purchased items).

When configuring your webhook in the Stripe Dashboard, make sure to select only this event to avoid receiving unnecessary webhook calls.