const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production" ? "/stripe" : "/stripe";

export default PAYMENT_SERVER_URL;
