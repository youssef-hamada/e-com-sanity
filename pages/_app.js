// pages/_app.js
import "./globals.css"; // Adjust the path based on where your `globals.css` is located.
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
