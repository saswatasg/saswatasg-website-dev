import { describe, expect, it } from 'vitest';
import { resolveWorld } from '../src/contexts/WorldContext';
describe('route-aware world resolution', () => {
  it('keeps the explicit root unselected regardless of previous world', () => {
    expect(resolveWorld('/')).toBe(null);
    expect(resolveWorld('/', '?world=adda')).toBe(null);
  });
  it('opens direct creative links in Adda and existing professional URLs in Workbench', () => {
    for (const route of [
      '/adda',
      '/adda/about',
      '/photography',
      '/photography/frame-studies',
      '/writing',
      '/cinema',
    ])
      expect(resolveWorld(route)).toBe('adda');
    for (const route of [
      '/workbench',
      '/work',
      '/about',
      '/experience',
      '/builds',
      '/blog/topshe-browser-voice-ai',
      '/case-studies/cart-checkout',
      '/roadmap',
      '/lab/relationship-magazine',
      '/projects',
      '/case-studies',
    ])
      expect(resolveWorld(route)).toBe('workbench');
    expect(resolveWorld('/cinematic')).toBe('workbench');
  });
  it('resolves shared contact deterministically for prerendering and hydration', () => {
    expect(resolveWorld('/contact')).toBe('workbench');
    expect(resolveWorld('/contact', '?world=adda')).toBe('adda');
    expect(resolveWorld('/contact', '?world=unknown')).toBe('workbench');
  });
});
