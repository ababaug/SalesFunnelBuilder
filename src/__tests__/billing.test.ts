import { describe, it, expect, vi } from 'vitest';
import { getCurrentSubscription, checkEntitlement } from '../server/billing';

describe('Billing Actions', () => {
  it('should return a default FREE plan when no subscription exists', async () => {
    const sub = await getCurrentSubscription();
    expect(sub.planId).toBe('FREE');
    expect(sub.isActive).toBe(true);
  });

  it('should check entitlements against the FREE plan', async () => {
    const hasFunnels = await checkEntitlement('publishedFunnels', 1);
    expect(hasFunnels).toBe(true);

    const hasTooMany = await checkEntitlement('publishedFunnels', 10);
    expect(hasTooMany).toBe(false);
  });
});
