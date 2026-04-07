// Admin check utility
// Set ADMIN_EMAILS in .env.local as a comma-separated list of email addresses
// These users get full access to all features without needing a paid plan

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function getEffectivePlan(email: string | null | undefined, currentPlan: string): string {
  if (isAdmin(email)) return 'admin';
  return currentPlan;
}

export function hasUnlimitedAccess(email: string | null | undefined, currentPlan: string): boolean {
  if (isAdmin(email)) return true;
  return currentPlan === 'pro' || currentPlan === 'team';
}
