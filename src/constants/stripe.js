const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pk_test_7hzZZzKGe2FfElGN9uf70C1i"
    : "pk_test_7hzZZzKGe2FfElGN9uf70C1i";

export default STRIPE_PUBLISHABLE;
