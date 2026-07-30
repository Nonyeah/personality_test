import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Mock scrollIntoView for all elements
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});