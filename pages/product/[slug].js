import React from "react";
import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, price, details, name } = product;

  return (
    <div>
      <div className="product-details-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} alt="" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products,
    },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: false, // Set to "blocking" or "true" if you want to allow additional slugs not defined at build time
  };
};

export default ProductDetails;
