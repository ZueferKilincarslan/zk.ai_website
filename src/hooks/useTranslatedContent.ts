import { useTranslations } from '../translations';

export const useTranslatedContent = () => {
  const translations = useTranslations();

  const replaceHighlight = (text: string) => {
    return text.replace(
      /<highlight>(.*?)<\/highlight>/g,
      '<span class="text-purple-400">$1</span>'
    );
  };

  // Flatten nested objects into dot notation
  const flattenTranslations = (obj: any, prefix = ''): Record<string, string> => {
    return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenTranslations(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  const t = flattenTranslations(translations);

  return {
    t,
    replaceHighlight
  };
};