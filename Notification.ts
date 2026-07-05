// One large channel contract requires methods many implementations cannot support.
interface NotificationChannel {
  // Sends a generic message by internal user ID.
  sendMessage(userId: string, message: string): Promise<void>;

  // Sends an email notification.
  sendEmail(
    emailAddress: string,
    subject: string,
    body: string
  ): Promise<void>;

  // Sends an SMS notification.
  sendSms(
    phoneNumber: string,
    text: string
  ): Promise<void>;

  // Sends a push notification to a device.
  sendPushNotification(
    deviceToken: string,
    title: string,
    body: string
  ): Promise<void>;

  // Stores a notification in the app inbox.
  saveToInbox(
    userId: string,
    title: string,
    body: string
  ): Promise<void>;
}

// implmentation of Email Notification Channel
class EmailNotificationChannel implements NotificationChannel {
  // User-ID-only routing is unsupported for this channel.
  async sendMessage(userId: string, message: string): Promise<void> {
    throw new Error("Email channel cannot send by userId alone.");
  }

  // Sends an email message using the provided fields.
  async sendEmail(
    emailAddress: string,
    subject: string,
    body: string
  ): Promise<void> {
    console.log(`Sending email to ${emailAddress}`);
    console.log(`Subject: ${subject}`);
    console.log(body);
  }

  async sendSms(phoneNumber: string, text: string): Promise<void> {
    // Forced by interface, but invalid for this concrete channel.
    throw new Error("Email channel cannot send SMS.");
  }

  // Push notifications are unsupported for this channel.
  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string
  ): Promise<void> {
    throw new Error("Email channel cannot send push notifications.");
  }

  // In-app inbox storage is unsupported for this channel.
  async saveToInbox(
    userId: string,
    title: string,
    body: string
  ): Promise<void> {
    throw new Error("Email channel cannot save in-app inbox messages.");
  }
}

// implmentation of In App Inbox Notification Channel
class InAppInboxChannel implements NotificationChannel {
  // Adapts a generic message into an inbox notification entry.
  async sendMessage(userId: string, message: string): Promise<void> {
    await this.saveToInbox(userId, "Notification", message);
  }

  // Persists a notification for in-app retrieval.
  async saveToInbox(
    userId: string,
    title: string,
    body: string
  ): Promise<void> {
    console.log(`Saving inbox message for ${userId}`);
    console.log(`${title}: ${body}`);
  }

  async sendEmail(
    emailAddress: string,
    subject: string,
    body: string
  ): Promise<void> {
    // Forced by interface, but invalid for this concrete channel.
    throw new Error("In-app inbox cannot send email.");
  }

  // SMS notifications are unsupported for this channel.
  async sendSms(phoneNumber: string, text: string): Promise<void> {
    throw new Error("In-app inbox cannot send SMS.");
  }

  // Push notifications are unsupported for this channel.
  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string
  ): Promise<void> {
    throw new Error("In-app inbox cannot send push notifications.");
  }
}

// Usage example
async function sendPasswordResetEmail(
  channel: NotificationChannel,
  emailAddress: string,
  resetLink: string
): Promise<void> {
  // Assumes the provided channel can send email.
  await channel.sendEmail(
    emailAddress,
    "Reset your password",
    `Click here: ${resetLink}`
  );
}

const inboxChannel = new InAppInboxChannel();

// await sendPasswordResetEmail(
//   inboxChannel,
//   "alice@example.com",
//   "https://example.com/reset"
// ); // Runtime failure