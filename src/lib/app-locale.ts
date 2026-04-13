/** BCP 47 tags for Intl (dates, numbers). */
export function intlLocaleTag(appLocale: string): string {
  if (appLocale === "vi") return "vi-VN";
  if (appLocale === "zh") return "zh-CN";
  return "en";
}

/** Open Graph locale string (underscore form). */
export function openGraphLocale(appLocale: string): string {
  if (appLocale === "vi") return "vi_VN";
  if (appLocale === "zh") return "zh_CN";
  return "en_US";
}
