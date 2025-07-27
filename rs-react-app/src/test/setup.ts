import { expect, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
// import '@testing-library/jest-dom';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  // Object.defineProperty(window, 'localStorage', {
  //   value: {
  //     getItem: vi.fn(() => null),
  //     setItem: vi.fn(() => null),
  //     removeItem: vi.fn(() => null),
  //     clear: vi.fn(() => null),
  //   },
  // });
  // Настройка jsdom окружения
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false, // CSS media query не совпадает
      media: query, // Исходный запрос
      onchange: null, // Callback для изменений
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(), // Современный способ
      removeEventListener: vi.fn(), // Современный способ
      dispatchEvent: vi.fn(), // Генерация событий
    })),
  });

  // Мок для IntersectionObserver (часто нужен для компонентов)
  globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  }));

  // Мок для ResizeObserver
  globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  }));
});
