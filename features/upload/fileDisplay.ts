const fileSizeFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

const screenshotDateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatFileName(name: string) {
  const screenshot = /^Screenshot (\d{4}-\d{2}-\d{2}) at (\d{1,2})\.(\d{2})\.\d{2}\s*([AP]M)\.(png|jpe?g)$/i.exec(name);
  if (!screenshot) return name;

  const [, date, hour, minute, period, extension] = screenshot;
  const timestamp = Date.parse(date);
  if (!Number.isFinite(timestamp)) return name;

  return `Screenshot · ${screenshotDateFormatter.format(timestamp)} · ${hour}:${minute} ${period.toUpperCase()} · ${extension.toUpperCase()}`;
}

export function formatFileSize(bytes: number) {
  if (bytes >= 1_000_000_000) return `${fileSizeFormatter.format(bytes / 1_000_000_000)} GB`;
  if (bytes >= 1_000_000) return `${fileSizeFormatter.format(bytes / 1_000_000)} MB`;
  if (bytes >= 1_000) return `${fileSizeFormatter.format(bytes / 1_000)} KB`;
  return `${bytes} ${bytes === 1 ? "byte" : "bytes"}`;
}
