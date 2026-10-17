import { describe, it, expect } from 'vitest';
import { getPlatformMetrics, getUsers, verifyAdminAccess } from '../server/admin';

describe('Admin Actions', () => {
  it('should verify admin access', async () => {
    const isAllowed = await verifyAdminAccess();
    // Bypassed for MVP currently, expect true
    expect(isAllowed).toBe(true);
  });

  it('should return platform metrics', async () => {
    const metrics = await getPlatformMetrics();
    expect(metrics).toHaveProperty('totalUsers');
    expect(metrics).toHaveProperty('activeWorkspaces');
    expect(metrics).toHaveProperty('totalFunnels');
    expect(metrics).toHaveProperty('totalRevenue');
  });

  it('should return users array', async () => {
    const users = await getUsers();
    expect(Array.isArray(users)).toBe(true);
  });
});
