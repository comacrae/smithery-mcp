export type NovuOperation =
  | "trigger_event"
  | "broadcast_event"
  | "cancel_triggered_event"
  | "get_notifications"
  | "get_notification_stats"
  | "get_subscribers"
  | "create_subscriber"
  | "update_subscriber"
  | "delete_subscriber"
  | "get_topics"
  | "create_topic"
  | "delete_topic"
  | "add_subscribers_to_topic"
  | "remove_subscribers_from_topic";

export interface NovuExecutePayload {
  operation: NovuOperation;
  params?: Record<string, any>;
}

export interface NovuResult {
  success: boolean;
  data?: any;
  error?: string;
}
