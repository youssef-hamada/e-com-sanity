import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

const token = process.env.NEXT_PUBLIC_TOKEN_SANITY;
console.log("Sanity Token:", token);

export const client = sanityClient({
  projectId: "z5t79kyw",
  dataset: "production",
  apiVersion: "2025-01-21",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_TOKEN_SANITY,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
