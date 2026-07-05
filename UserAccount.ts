// Base account assumes password-based authentication behavior.
class UserAccount {
  constructor(
    // Unique account identifier.
    public readonly id: string,
    // Login/contact email for the account.
    public readonly email: string,
    // Stored password hash (simplified in this example).
    protected passwordHash: string
  ) {}

  // Verifies a plaintext password against stored credentials.
  async verifyPassword(password: string): Promise<boolean> {
    // Simplified for teaching purposes.
    return password === this.passwordHash;
  }

  // Changes password after validating the current password.
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const valid = await this.verifyPassword(oldPassword);

    if (!valid) {
      throw new Error("Old password is incorrect.");
    }

    this.passwordHash = newPassword;
  }
}

class GoogleAccount extends UserAccount {
  constructor(
    id: string,
    email: string,
    // External identity from Google OAuth/OpenID.
    public readonly googleId: string
  ) {
    // Fake value because the parent constructor requires a password hash.
    super(id, email, "");
  }

  async verifyPassword(password: string): Promise<boolean> {
    // Subtype rejects a base-class behavior expected by clients.
    throw new Error("Google accounts do not support password login.");
  }

  // Disabled because password changes are managed by Google.
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    throw new Error("Google accounts do not have local passwords.");
  }
}

// Example usage:
// This consumer expects any UserAccount subtype to support password verification.
async function loginWithPassword(
  account: UserAccount,
  password: string
): Promise<void> {
  const valid = await account.verifyPassword(password);

  if (!valid) {
    throw new Error("Invalid email or password.");
  }

  console.log(`Logged in as ${account.email}`);
}

const local = new UserAccount("u1", "alice@example.com", "secret");
// await loginWithPassword(local, "secret");

const google = new GoogleAccount("u2", "bob@example.com", "google-123");
// await loginWithPassword(google, "anything"); // Runtime failure