When you configure your webhook endpoint in the Stripe Dashboard (usually under Developers -> Webhooks), you'll need to provide the following:

1.  **Endpoint URL:**
    *   For local development (as configured in your `Be/.env`): `http://localhost:5000/api/payments/webhook`
    *   **Important**: For production environments, this URL will need to be the public URL of your backend server where the `/api/payments/webhook` route is accessible.

2.  **Description (Destination Name):**
    *   You can give it a descriptive name to easily identify it in your Stripe dashboard. A good suggestion would be: `Symphony App - Checkout Session Completed`

Remember to select the `checkout.session.completed` event (and only this event) when configuring the webhook. Stripe will then provide you with a Webhook Signing Secret (`whsec_...`) which you must add to your `Be/.env` file as `STRIPE_WEBHOOK_SECRET`.