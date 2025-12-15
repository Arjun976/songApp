To test the Stripe integration, you will need to:

1.  **Start your Backend Server (`Be`):**
    *   Make sure you have set up your `.env` file in the `Be` directory with `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (if testing webhooks), and `FRONTEND_URL`.
    *   Navigate to your `Be` directory in the terminal and run: `npm run dev` (if you have `nodemon` installed) or `npm start`.

2.  **Start your Frontend Server (`Fr`):**
    *   Navigate to your `Fr` directory in another terminal and run: `npm run dev`.

3.  **Access the Frontend Application:**
    *   Once both servers are running, open your web browser and go to the frontend application's URL. Based on the configuration, this is likely: `http://localhost:5173`

From there, you would navigate to a premium song, click the "Pay with Stripe" button (or the equivalent trigger), and the `PaymentModal` will initiate the Stripe Checkout process.

**Important considerations for testing:**

*   **Stripe Test Cards:** Use Stripe's provided test card numbers to simulate successful or failed payments without using real money. You can find them in the Stripe documentation.
*   **Webhook Testing (for local development):** If you want to test the webhook (which updates the user's purchased songs after a successful payment), remember that your `http://localhost:5000/api/payments/webhook` endpoint needs to be publicly accessible by Stripe. You'll need to use a tunneling service like `ngrok` or `localtunnel` as discussed previously, and update the webhook URL in your Stripe Dashboard accordingly for testing.