type BugReport = {
  title: string;
  description: string;
  reportedBy: string;
  severity: "low" | "medium" | "high";
};

class JiraClient {
  async createIssue(report: BugReport): Promise<string> {
    console.log(`Creating Jira issue: ${report.title}`);
    return "JIRA-123";
  }
}

class SlackClient {
  async postMessage(channel: string, message: string): Promise<void> {
    console.log(`Posting to ${channel}: ${message}`);
  }
}

class PostgresBugReportRepository {
  async save(report: BugReport, ticketId: string): Promise<void> {
    console.log(`Saving bug report for ticket ${ticketId} to PostgreSQL`);
  }
}

class BugReportService {
  private jira = new JiraClient();
  private slack = new SlackClient();
  private repository = new PostgresBugReportRepository();

  async submitBugReport(report: BugReport): Promise<void> {
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
const service = new BugReportService();

// await service.submitBugReport({
//   title: "Search results sometimes disappear",
//   description: "After applying two filters, the result list becomes empty.",
//   reportedBy: "alice@example.com",
//   severity: "high",
// });