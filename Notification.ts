interface NotificationChannel {
  sendMessage(userId: string, message: string): Promise<void>;

  sendEmail(
    emailAddress: string,
    subject: string,
    body: string
  ): Promise<void>;

  sendSms(
    phoneNumber: string,
    text: string
  ): Promise<void>;

  sendPushNotification(
    deviceToken: string,
    title: string,
    body: string
  ): Promise<void>;

  saveToInbox(
    userId: string,
    title: string,
    body: string
  ): Promise<void>;
}

// implmentation of Email Notification Channel
class EmailNotificationChannel implements NotificationChannel {
  async sendMessage(userId: string, message: string): Promise<void> {
    throw new Error("Email channel cannot send by userId alone.");
  }

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
    throw new Error("Email channel cannot send SMS.");
  }

  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string
  ): Promise<void> {
    throw new Error("Email channel cannot send push notifications.");
  }

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
  async sendMessage(userId: string, message: string): Promise<void> {
    await this.saveToInbox(userId, "Notification", message);
  }

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
    throw new Error("In-app inbox cannot send email.");
  }

  async sendSms(phoneNumber: string, text: string): Promise<void> {
    throw new Error("In-app inbox cannot send SMS.");
  }

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