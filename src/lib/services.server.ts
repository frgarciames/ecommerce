import { swellAPI } from "./swell/swell.server";

export const getProducts = async (search: string | null) => {
  return await swellAPI.get(
    "/products",
    search && {
      where: {
        name: {
          $regex: search,
          $options: "i",
        },
      },
    },
  );
};

export const getProductBySlug = async (slug: string) => {
  return await swellAPI.get(`/products/${slug}`);
};
