class PostgresUserRepository {
  async save(user: {
    id: string;
    email: string;
    passwordHash: string;
  }): Promise<void> {
    console.log(`Saving user ${user.email} to PostgreSQL`);
  }
}

class BcryptPasswordHasher {
  async hash(password: string): Promise<string> {
    // Simplified for teaching.
    return `bcrypt:${password}`;
  }
}

class SendGridEmailClient {
  async sendWelcomeEmail(email: string): Promise<void> {
    console.log(`Sending welcome email to ${email} through SendGrid`);
  }
}

class FileAuditLogger {
  async write(message: string): Promise<void> {
    console.log(`Writing audit log to file: ${message}`);
  }
}

// implement user registration service
class UserRegistrationService {
  private userRepository = new PostgresUserRepository();
  private passwordHasher = new BcryptPasswordHasher();
  private emailClient = new SendGridEmailClient();
  private auditLogger = new FileAuditLogger();

  async register(email: string, password: string): Promise<void> {
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