"use strict";
// make sure init test utility first to inject fake-xhr2
import { xhrUtility } from "../test-utils/init";

import { expect } from "chai";
import { JSONRPC } from "../../src/provider/json-rpc";
import { RPCMethodMap } from "../../src/provider/repu-methods";

const host = "http://localhost:8669";
const timeout = 0;
const makeRPCRequest = function(method: string, params: any[]) {
  return new JSONRPC({
    id: 1,
    method,
    params,
    jsonrpc: "2.0"
  });
};

describe("rpc methods", () => {
  beforeEach(() => {
    xhrUtility.resetMockData();
  });

  describe("eth_getKeyblockByHeight", () => {
    it("valid response", async () => {
      xhrUtility.setResponse({
        meta: {
          hash:
            "0xa5b3d1dbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2"
        }
      });
      const executor = RPCMethodMap.get("eth_getKeyblockByHeight");
      const rpc = makeRPCRequest("eth_getKeyblockByHeight", [100]);

      const ret = await executor(rpc, host, timeout);
      expect(ret.result.meta).to.have.property(
        "hash",
        "0xa5b3d1dbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2"
      );
    });

    it("return null", async () => {
      const executor = RPCMethodMap.get("eth_getKeyblockByHeight");
      const rpc = makeRPCRequest("eth_getKeyblockByHeight", [100]);

      const ret = await executor(rpc, host, timeout);
      expect(ret.result).to.be.equal(null);
    });
  });

  describe("eth_getKeyblockByHash", () => {
    it("valid response", async () => {
      xhrUtility.setResponse({ meta: { height: 100 } });
      const executor = RPCMethodMap.get("eth_getKeyblockByHeight");
      const rpc = makeRPCRequest("eth_getKeyblockByHeight", [
        "0xa5b3d1dbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2"
      ]);

      const ret = await executor(rpc, host, timeout);
      expect(ret.result.meta).to.have.property("height", 100);
    });

    it("return null", async () => {
      const executor = RPCMethodMap.get("eth_getKeyblockByHash");
      const rpc = makeRPCRequest("eth_getKeyblockByHash", [100]);

      const ret = await executor(rpc, host, timeout);
      expect(ret.result).to.be.equal(null);
    });
  });

  describe("eth_getMicroblockByHash", () => {
    it("valid response", async () => {
      xhrUtility.setResponse({
        meta: {
          KBHash:
            "0xa5b3d1dbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2",
        }
      });

      const executor = RPCMethodMap.get("eth_getMicroblockByHash");
      const rpc = makeRPCRequest("eth_getMicroblockByHash", [
        "0x8g84nddbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2"
      ]);

      const ret = await executor(rpc, host, timeout);
      expect(ret.result.meta).to.have.property("KBHash", "0xa5b3d1dbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2");
    });

    it("return null", async () => {
      const executor = RPCMethodMap.get("eth_getMicroblockByHash");
      const rpc = makeRPCRequest("eth_getMicroblockByHash", [
          "0xa5b3d1dbafe79a41dce8ec33a83e68cf506cdcd1df7776c3afd8fc67a76cecf2"
      ]);

      const ret = await executor(rpc, host, timeout);
      expect(ret.result).to.be.equal(null);
    });
  });
});
