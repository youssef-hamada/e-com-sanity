import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  console.log(process.env);
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51Qo4z6EyRQXxnJp1QjWTEDTIQmW6VWzjm9e7oMpXetR2qHYIVcuKlNfLH8n93OVRB4cTcBbBLcffPGuJlZ7rAl2e006fyXjLOA"
    );
  }

  return stripePromise;
};

export default getStripe;
