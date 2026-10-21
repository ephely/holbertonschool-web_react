import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('utils functions', () => {
  describe('getCurrentYear', () => {
    test('returns the correct current year', () => {
      const currentYear = new Date().getFullYear();
      expect(getCurrentYear()).toBe(currentYear);
    });
  });

  describe('getFooterCopy', () => {
    test('returns "Holberton School" when argument is true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('returns "Holberton School main dashboard" when argument is false', () => {
      expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
  });

  describe('getLatestNotification', () => {
    test('returns the correct notification HTML string', () => {
      expect(getLatestNotification()).toBe(
        '<strong>Urgent requirement</strong> - complete by EOD',
      );
    });
  });
});
