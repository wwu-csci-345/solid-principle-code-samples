// Represents a single bug report payload provided by a user.
type BugReport = {
  // Short summary used as the issue title in external systems.
  title: string;
  // Detailed reproduction/context information for engineers.
  description: string;
  // Identity of the reporter (email/username).
  reportedBy: string;
  // Severity used to decide escalation behavior.
  severity: "low" | "medium" | "high";
};

// Low-level integration with Jira for creating external bug tickets.

class JiraClient {
  // Creates a Jira issue and returns the generated ticket ID.
  async createIssue(report: BugReport): Promise<string> {
    console.log(`Creating Jira issue: ${report.title}`);
    return "JIRA-123";
  }
}

class SlackClient {
  // Sends a plain message to a Slack channel.
  async postMessage(channel: string, message: string): Promise<void> {
    console.log(`Posting to ${channel}: ${message}`);
  }
}

class PostgresBugReportRepository {
  // Persists the original report alongside the linked ticket ID.
  async save(report: BugReport, ticketId: string): Promise<void> {
    console.log(`Saving bug report for ticket ${ticketId} to PostgreSQL`);
  }
}

class BugReportService {
  // This service directly creates concrete dependencies, tightly coupling high-level logic
  // to low-level implementation details (DIP violation).
  private jira = new JiraClient();
  private slack = new SlackClient();
  private repository = new PostgresBugReportRepository();

  // Validates a report, creates a ticket, stores metadata, and alerts for high severity.
  async submitBugReport(report: BugReport): Promise<void> {
    // Validation, persistence, and notifications are coordinated in one place.
    if (report.title.trim() === "") {
      throw new Error("Bug report title is required.");
    }

    if (report.description.trim() === "") {
      throw new Error("Bug report description is required.");
    }

    const ticketId = await this.jira.createIssue(report);

    await this.repository.save(report, ticketId);

    if (report.severity === "high") {
      await this.slack.postMessage(
        "#engineering-alerts",
        `High severity bug reported: ${ticketId} - ${report.title}`
      );
    }
  }
}

// usage example
const serviceSample = new BugReportService();

// await serviceSample.submitBugReport({
//   title: "Search results sometimes disappear",
//   description: "After applying two filters, the result list becomes empty.",
//   reportedBy: "alice@example.com",
//   severity: "high",
// });