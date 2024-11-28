export const getEraFromYear = (year: number) => {
  if (year < 1991) return 'retro60s';
  if (year < 2016) return 'retro80s';
  return 'modern';
};