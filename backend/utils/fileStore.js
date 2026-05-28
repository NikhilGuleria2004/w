import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = join(__dirname, "../data");
const FILE_PATH = join(DATA_DIR, "enquiries.json");

/**
 * Reads the current list of enquiries from disk.
 * Returns an empty array if the file doesn't exist yet.
 * @returns {Promise<object[]>}
 */
async function readEnquiries() {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Appends a single enquiry record to the JSON file.
 * Creates the data/ directory and file if they don't exist.
 * @param {object} enquiry - the sanitised enquiry data from the controller
 * @returns {Promise<{ ok: boolean, error?: Error }>}
 */
export async function saveEnquiry(enquiry) {
  try {
    // Ensure the data/ directory exists
    await mkdir(DATA_DIR, { recursive: true });

    const existing = await readEnquiries();

    const record = {
      id:          existing.length + 1,
      ...enquiry,
      submittedAt: new Date().toISOString(),
    };

    existing.push(record);

    await writeFile(FILE_PATH, JSON.stringify(existing, null, 2), "utf-8");

    console.log(`[fileStore] Enquiry #${record.id} saved.`);
    return { ok: true, record };
  } catch (error) {
    console.error("[fileStore] Failed to save enquiry:", error);
    return { ok: false, error };
  }
}