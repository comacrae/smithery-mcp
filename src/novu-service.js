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
exports.NovuService = void 0;
const api_1 = require("@novu/api");
class NovuService {
    constructor(apiKey) {
        this.novu = new api_1.Novu({ secretKey: apiKey });
    }
    execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { operation, params = {} } = payload;
                switch (operation) {
                    case "trigger_event":
                        return {
                            success: true,
                            data: yield this.novu.trigger({
                                workflowId: params.name,
                                to: params.to,
                                payload: params.payload,
                            }),
                        };
                    case "create_subscriber":
                        const subscriber = {
                            subscriberId: params.subscriberId,
                            email: params.email,
                            firstName: params.firstName,
                            lastName: params.lastName,
                            phone: params.phone,
                            avatar: params.avatar,
                            data: params.data || {},
                        };
                        return {
                            success: true,
                            data: yield this.novu.subscribers.create(subscriber),
                        };
                    case "delete_subscriber":
                        return {
                            success: true,
                            data: yield this.novu.subscribers.delete(params.subscriberId),
                        };
                    default:
                        return {
                            success: false,
                            error: `Unsupported operation: ${operation}`,
                        };
                }
            }
            catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : String(error),
                };
            }
        });
    }
}
exports.NovuService = NovuService;
