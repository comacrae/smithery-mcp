"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const readline_1 = require("readline");
const novu_service_1 = require("./novu-service");
class MCPHandler {
    constructor() {
        this.isReady = false;
        const apiKey = process.env.NOVU_API_KEY;
        if (!apiKey) {
            throw new Error("NOVU_API_KEY environment variable is required");
        }
        this.novuService = new novu_service_1.NovuService(apiKey);
        this.rl = (0, readline_1.createInterface)({ input: process_1.stdin, output: process_1.stdout });
        this.rl.on("line", this.handleMessage.bind(this));
        this.initialize();
    }
    initialize() {
        this.sendMessage({
            type: "ready",
        });
        this.isReady = true;
    }
    handleMessage(line) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = JSON.parse(line);
                switch (message.type) {
                    case "ping":
                        this.sendMessage({ type: "pong" });
                        break;
                    case "execute":
                        if (!message.payload) {
                            this.sendError("No payload provided for execute message");
                            return;
                        }
                        yield this.handleExecute(message.payload);
                        break;
                    default:
                        this.sendError(`Unknown message type: ${message.type}`);
                }
            }
            catch (error) {
                this.sendError(`Failed to parse message: ${error}`);
            }
        });
    }
    handleExecute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.novuService.execute(payload);
                this.sendMessage({
                    type: "result",
                    payload: result,
                });
            }
            catch (error) {
                this.sendError(`Execution failed: ${error}`);
            }
        });
    }
    sendMessage(message) {
        console.log(JSON.stringify(message));
    }
    sendError(error) {
        this.sendMessage({
            type: "error",
            payload: { message: error },
        });
    }
}
// Start the MCP handler
new MCPHandler();
