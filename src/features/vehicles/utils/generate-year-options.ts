interface YearOptions {
  value: string;
  label: string;
}

export const generateYearOptions = (year: number): YearOptions[] => {
  const currentYear = new Date().getFullYear();
  const years: YearOptions[] = [];
  for (let i = currentYear; i >= year; i--) {
    years.push({
      value: i.toString(),
      label: i.toString(),
    });
  }
  return years;
};
