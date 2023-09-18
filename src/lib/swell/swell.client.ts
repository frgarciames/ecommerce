import Swell, { type Account, type Cart } from "swell-js";

export class SwellClient {
  client = Swell;
  constructor() {
    Swell.init(
      import.meta.env.PUBLIC_SWELL_STORE_ID,
      import.meta.env.PUBLIC_SWELL_API_KEY,
      {
        useCamelCase: true,
      },
    );
  }
}

export const swellClient = new SwellClient();
