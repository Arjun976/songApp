Here is the URL for testing the Stripe integration:

`http://localhost:5173`

**Please ensure both your frontend and backend servers are running before accessing this URL.**

Additionally, if you are testing the webhook locally, you will need to use a tunneling service (like `ngrok` or `localtunnel`) to expose your backend's webhook endpoint (`http://localhost:5000/api/payments/webhook`) to the public internet so that Stripe can reach it.