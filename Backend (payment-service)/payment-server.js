const express = require('express');
const app = express();

app.use(express.json());

// ✅ Payment API endpoint
app.post('/payment', (req, res) => {
    const { amount } = req.body;

    res.json({
        status: "success",
        message: `Payment of ₹${amount} processed successfully ✅`
    });
});

app.listen(8080, () => {
    console.log("Payment service running on port 8080");
});
``