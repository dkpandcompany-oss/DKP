/**
 * Get admin emails from environment variables
 * Falls back to default emails if env var is not set
 */
export function getAdminEmails(): string[] {
  // Try to get from environment variables (works in both client and server)
  const adminEmailsEnv = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS;
  
  if (adminEmailsEnv) {
    return adminEmailsEnv.split(',').map(email => email.trim());
  }
  
  // Fallback to default admin emails
  return [
    'admin@dkpandcompany.com',
    'rohitsoneji6@gmail.com',
  ];
}

/**
 * Check if an email is an admin email
 */
export function isAdminEmail(email?: string): boolean {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email);
}