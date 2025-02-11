import { stdin as input, stdout as output } from "process";
import { createInterface } from "readline";
import { NovuService } from "./novu-service";
import { NovuExecutePayload } from "./novu-types";

interface Message {
  type: string;
  payload?: any;
}

class MCPHandler {
  private rl: ReturnType<typeof createInterface>;
  private isReady = false;
  private novuService: NovuService;

  constructor() {
    const apiKey = process.env.NOVU_API_KEY;
    if (!apiKey) {
      throw new Error("NOVU_API_KEY environment variable is required");
    }

    this.novuService = new NovuService(apiKey);
    this.rl = createInterface({ input, output });
    this.rl.on("line", this.handleMessage.bind(this));
    this.initialize();
  }

  private initialize() {
    this.sendMessage({
      type: "ready",
    });
    this.isReady = true;
  }

  private async handleMessage(line: string) {
    try {
      const message: Message = JSON.parse(line);

      switch (message.type) {
        case "ping":
          this.sendMessage({ type: "pong" });
          break;

        case "execute":
          if (!message.payload) {
            this.sendError("No payload provided for execute message");
            return;
          }
          await this.handleExecute(message.payload);
          break;

        default:
          this.sendError(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      this.sendError(`Failed to parse message: ${error}`);
    }
  }

  private async handleExecute(payload: NovuExecutePayload) {
    try {
      const result = await this.novuService.execute(payload);
      this.sendMessage({
        type: "result",
        payload: result,
      });
    } catch (error) {
      this.sendError(`Execution failed: ${error}`);
    }
  }

  private sendMessage(message: Message) {
    console.log(JSON.stringify(message));
  }

  private sendError(error: string) {
    this.sendMessage({
      type: "error",
      payload: { message: error },
    });
  }
}

// Start the MCP handler
new MCPHandler();
