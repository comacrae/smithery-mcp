import { Novu } from "@novu/api";
import type { ISubscribersDefine } from "@novu/shared";
import { NovuExecutePayload, NovuResult } from "./novu-types";

export class NovuService {
  private novu: Novu;

  constructor(apiKey: string) {
    this.novu = new Novu({ secretKey: apiKey });
  }

  async execute(payload: NovuExecutePayload): Promise<NovuResult> {
    try {
      const { operation, params = {} } = payload;

      switch (operation) {
        case "trigger_event":
          return {
            success: true,
            data: await this.novu.trigger({
              workflowId: params.name,
              to: params.to,
              payload: params.payload,
            }),
          };

        case "create_subscriber":
          const subscriber: ISubscribersDefine = {
            subscriberId: params.subscriberId,
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName,
            phone: params.phone,
            avatar: params.avatar,
            data: {},
          };

          return {
            success: true,
            data: await this.novu.subscribers.create(subscriber),
          };

        case "delete_subscriber":
          return {
            success: true,
            data: await this.novu.subscribers.delete(params.subscriberId),
          };

        default:
          return {
            success: false,
            error: `Unsupported operation: ${operation}`,
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
