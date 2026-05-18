export const DEFAULT_YEARS = [
  "2026-27",
  "2025-26",
  "2024-25",
  "2023-24",
  "2022-23",
];

type Option = {
  label: string;
  value: string;
};

// ================= UPLOAD OPTIONS =================
export const getUploadYearOptions = (): Option[] => {
  return DEFAULT_YEARS.map((year) => ({
    label: year,
    value: year,
  }));
};

// ================= FILTER OPTIONS =================
export const getFilterYearOptions = (
  years?: string[]
): Option[] => {
  if (!years || years.length === 0) {
    return [
      {
        label: "All Years",
        value: "all",
      },
    ];
  }

  const sortedYears = [...years].sort(
    (a, b) =>
      Number(b.split("-")[0]) -
      Number(a.split("-")[0])
  );

  return [
    {
      label: "All Years",
      value: "all",
    },

    ...sortedYears.map((year) => ({
      label: year,
      value: year,
    })),
  ];
};