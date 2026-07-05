class PostgresUserRepository {
  // Saves a newly created user record.
  async save(user: {
    // Unique user ID.
    id: string;
    // Login email.
    email: string;
    // Persisted password hash.
    passwordHash: string;
  }): Promise<void> {
    console.log(`Saving user ${user.email} to PostgreSQL`);
  }
}

class BcryptPasswordHasher {
  // Produces a hashed password string.
  async hash(password: string): Promise<string> {
    // Simplified for teaching.
    return `bcrypt:${password}`;
  }
}

class SendGridEmailClient {
  // Sends onboarding/welcome message to a new user.
  async sendWelcomeEmail(email: string): Promise<void> {
    console.log(`Sending welcome email to ${email} through SendGrid`);
  }
}

class FileAuditLogger {
  // Writes an audit trail entry for operational tracking.
  async write(message: string): Promise<void> {
    console.log(`Writing audit log to file: ${message}`);
  }
}

// implement user registration service
class UserRegistrationService {
  // High-level registration flow is hard-wired to concrete infrastructure services.
  // Storage dependency for creating user records.
  private userRepository = new PostgresUserRepository();
  // Hashing dependency for securing passwords.
  private passwordHasher = new BcryptPasswordHasher();
  // Messaging dependency for onboarding email.
  private emailClient = new SendGridEmailClient();
  // Auditing dependency for traceability.
  private auditLogger = new FileAuditLogger();

  // Validates inputs, creates user record, then triggers side effects.
  async register(email: string, password: string): Promise<void> {
    // Input validation, hashing, persistence, notification, and audit logging are all coordinated here.
    if (!email.includes("@")) {
      throw new Error("Invalid email address.");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
    };

    await this.userRepository.save(user);
    await this.emailClient.sendWelcomeEmail(email);
    await this.auditLogger.write(`User registered: ${email}`);
  }
}

// usage example
const service = new UserRegistrationService();

// await service.register("alice@example.com", "secure-password");