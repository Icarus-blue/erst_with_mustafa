function formatViewsCount(views: string | number): string {
  const abbreviations: Record<number, string> = {
    0: "",
    1: "K",
    2: "M",
    3: "B",
    4: "T",
  };

  const num: number = typeof views === "string" ? parseFloat(views) : views;
  const index: number = Math.floor(Math.log10(Math.abs(num)) / 3);
  let formattedViews: number | string = num / Math.pow(10, index * 3);

  if (!Number.isFinite(formattedViews)) {
    return "Invalid views count";
  }

  if (index > 0) {
    formattedViews = formattedViews.toFixed(1);
  }

  formattedViews += abbreviations[index];

  return formattedViews.toString();
}

export { formatViewsCount };
