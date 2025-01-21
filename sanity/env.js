export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-21";

export const dataset = "production";
export const projectId = "yv4u0094";

console.log("Sanity API Version:", apiVersion);
console.log("Sanity Dataset:", dataset);
console.log("Sanity Project ID:", projectId);
