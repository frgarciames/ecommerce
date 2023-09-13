//@ts-ignore
import swellNode from "swell-node";

export const swellAPI = swellNode.init(
  import.meta.env.PUBLIC_SWELL_STORE_ID,
  import.meta.env.SWELL_API_KEY,
);
