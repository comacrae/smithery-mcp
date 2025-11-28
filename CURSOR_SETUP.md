# Setting up Novu MCP Server in Cursor

This guide will help you configure the Novu MCP server to work with Cursor IDE.

## Prerequisites

1. **Novu API Key**: You'll need a Novu API key from your [Novu dashboard](https://dashboard.novu.co)
2. **Node.js**: Ensure Node.js is installed (the MCP server is already built)

## Setup Steps

### Option 1: Using Cursor's UI (Recommended)

1. **Open Cursor Settings**:
   - Go to `Cursor Settings` > `Features` > `MCP` (or `Settings` > `MCP Servers`)

2. **Add New MCP Server**:
   - Click `+ Add New MCP Server` or `Add Server`

3. **Configure the Server**:
   - **Name**: `Novu MCP Server` (or any name you prefer)
   - **Command**: 
     ```bash
     node /Users/colinmacrae/protectly/protectly-novu-workflows/novu-mcp-server/dist/index.js
     ```
   - **Environment Variables**:
     - Add: `NOVU_API_KEY` = `your-novu-api-key-here`

4. **Save and Restart**:
   - Save the configuration
   - Restart Cursor to load the MCP server

### Option 2: Manual Configuration File

If Cursor uses a configuration file, you can add this to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "novu": {
      "command": "node",
      "args": [
        "/Users/colinmacrae/protectly/protectly-novu-workflows/novu-mcp-server/dist/index.js"
      ],
      "env": {
        "NOVU_API_KEY": "your-novu-api-key-here"
      }
    }
  }
}
```

## Getting Your Novu API Key

1. Log in to [Novu Dashboard](https://dashboard.novu.co)
2. Navigate to **Settings** > **API Keys**
3. Copy your **Secret Key** (not the Application Identifier)
4. Use this key as the `NOVU_API_KEY` value

## Available Operations

Once configured, you can use the following Novu operations through Cursor:

### Events
- `trigger_event`: Send a notification to specific subscribers
- `broadcast_event`: Send a notification to all subscribers
- `cancel_triggered_event`: Cancel a triggered notification

### Subscribers
- `get_subscribers`: List subscribers with pagination
- `create_subscriber`: Create a new subscriber
- `update_subscriber`: Update subscriber details
- `delete_subscriber`: Remove a subscriber

### Topics
- `get_topics`: List all topics
- `create_topic`: Create a new topic
- `delete_topic`: Delete an existing topic
- `add_subscribers_to_topic`: Add subscribers to a topic
- `remove_subscribers_from_topic`: Remove subscribers from a topic

### Notifications
- `get_notifications`: List notifications with pagination
- `get_notification_stats`: Get notification statistics

## Testing the Setup

After configuration, you can test by asking Cursor's AI:
- "List my Novu subscribers"
- "Create a new subscriber with email test@example.com"
- "Trigger the welcome-email workflow for subscriber-id-123"

## Troubleshooting

1. **Server not found**: Make sure the path to `dist/index.js` is correct
2. **API Key error**: Verify your `NOVU_API_KEY` is set correctly
3. **Build issues**: Run `npm run build` in the `novu-mcp-server` directory
4. **Restart required**: Always restart Cursor after adding/changing MCP servers

## Development

To rebuild the server after making changes:

```bash
cd novu-mcp-server
npm run build
```

Then restart Cursor to pick up the changes.

