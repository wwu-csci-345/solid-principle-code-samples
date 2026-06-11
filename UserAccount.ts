class UserAccount {
  constructor(
    public readonly id: string,
    public readonly email: string,
    protected passwordHash: string
  ) {}

  async verifyPassword(password: string): Promise<boolean> {
    // Simplified for teaching purposes.
    return password === this.passwordHash;
  }

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
    public readonly googleId: string
  ) {
    // Fake value because the parent constructor requires a password hash.
    super(id, email, "");
  }

  async verifyPassword(password: string): Promise<boolean> {
    throw new Error("Google accounts do not support password login.");
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    throw new Error("Google accounts do not have local passwords.");
  }
}

// Example usage:
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