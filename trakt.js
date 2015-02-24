import methods from "./methods";
import { ApiBase } from "./api-base";

export class Trakt extends ApiBase {

  constructor(apiKey) {
    super({
      baseUrl: "https://api-v2launch.trakt.tv",
      defaults: {
        headers: {
          "Content-type": "application/json",
          "trakt-api-key": apiKey,
          "trakt-api-version": 2
        },
        json: true
      }
    });
  }

}

Trakt._installMethods(methods);