

/**
 * @returns {string}
 */
export function formatTimestampIST() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  });
}
