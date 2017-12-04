const configureStripe = require("stripe");

const stripe = configureStripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
