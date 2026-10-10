// Answers and ticked-off steps stay in the student's browser. Storage can be blocked
// (private windows, strict settings), so every access is wrapped and failures are ignored.

const PROFILE_KEY = "arrive-sg:profile";
const DONE_KEY = "arrive-sg:done";

function read(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The checklist still works, it just won't be remembered.
  }
}

// The query string of the last checklist, e.g. "nationality=eu&programme=degree&…".
export const loadProfileQuery = () => read(PROFILE_KEY);
export const saveProfileQuery = (query) => write(PROFILE_KEY, query);

export function loadDone() {
  try {
    return new Set(JSON.parse(read(DONE_KEY)) ?? []);
  } catch {
    return new Set();
  }
}

export const saveDone = (done) => write(DONE_KEY, JSON.stringify([...done]));
