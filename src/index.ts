"use strict";

import { extend } from "./extend";
import { RepuProvider } from "./provider";

const repuify = function(web3Instance: any, host = "http://localhost:8669", timeout = 0) {
  // Create the provider instance
  try {
    const provider = new RepuProvider(host, timeout);
    web3Instance.setProvider(provider);
    extend(web3Instance);
    return web3Instance;
  } catch (err) {
    return err;
  }
};

export { repuify };
