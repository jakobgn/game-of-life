export const renderKr = (
  x,
  maximumDigits = 0,
  minimumDigits = 0,
  label = ""
) => {
  if (x === undefined) {
    return 0;
  }

  return `${x.toLocaleString("da", {
    minimumFractionDigits: minimumDigits,
    maximumFractionDigits: maximumDigits,
  })}`;
};
