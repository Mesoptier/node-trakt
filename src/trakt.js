import methods from "./methods";
import { ApiBase } from "./api-base";

export class Trakt extends ApiBase {

  constructor(apiKey) {
    super({
      baseUrl: "https://api-v2launch.trakt.tv",
      modifier(request) {
        request
          .set("trakt-api-key", apiKey)
          .set("trakt-api-version", 2)
          .type("json");
      }
    });
  }

}

Trakt._installMethods(methods);