import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('utils functions', () => {
  describe('getFullYear', () => {
    test('returns the correct current year', () => {
      const currentYear = new Date().getFullYear();
      expect(getFullYear()).toBe(currentYear);
    });
  });

  describe('getFooterCopy', () => {
    test('returns correct string when isIndex is true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('returns correct string when isIndex is false', () => {
      expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
  });

  describe('getLatestNotification', () => {
    test('returns correct string', () => {
      expect(getLatestNotification()).toBe(
        '<strong>Urgent requirement</strong> - complete by EOD',
      );
    });
  });
});
