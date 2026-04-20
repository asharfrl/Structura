/**
 * lib/progress.ts
 * Manages Structura learning progress in localStorage.
 * Key: 'structura_progress'
 */

export type TopicId = "array" | "linked-list" | "stack" | "queue";
export type StageId = "materi" | "kuis" | "video";

export interface TopicProgress {
  materi: boolean;
  kuis: boolean;
  video: boolean;
}

export type ProgressState = Record<TopicId, TopicProgress>;

const STORAGE_KEY = "structura_progress";

export const DEFAULT_PROGRESS: ProgressState = {
  array: { materi: false, kuis: false, video: false },
  "linked-list": { materi: false, kuis: false, video: false },
  stack: { materi: false, kuis: false, video: false },
  queue: { materi: false, kuis: false, video: false },
};

/** @internal */
const DEFAULT_STATE = DEFAULT_PROGRESS;

/** Retrieve full progress from localStorage */
export function getProgress(): ProgressState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as ProgressState;
    // Merge with defaults to handle new topics added later
    return {
      ...DEFAULT_STATE,
      ...parsed,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

/** Mark a specific stage as completed */
export function setStageComplete(topic: TopicId, stage: StageId): void {
  if (typeof window === "undefined") return;
  const current = getProgress();
  current[topic][stage] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

/**
 * Checks whether a stage is "unlocked" (accessible) for a given topic.
 * Rules:
 *   - materi: always unlocked
 *   - kuis: unlocked only if materi is completed
 *   - video: unlocked only if kuis is completed
 */
export function isStageUnlocked(topic: TopicId, stage: StageId): boolean {
  const progress = getProgress();
  if (stage === "materi") return true;
  if (stage === "kuis") return progress[topic].materi;
  if (stage === "video") return progress[topic].kuis;
  return false;
}

/** Returns how many stages are completed for a topic (0–3) */
export function getTopicCompletionCount(topic: TopicId): number {
  const p = getProgress()[topic];
  return [p.materi, p.kuis, p.video].filter(Boolean).length;
}

/** Returns total completed topics (all 3 stages done) */
export function getTotalCompletedTopics(): number {
  const progress = getProgress();
  return (Object.keys(progress) as TopicId[]).filter(
    (t) => progress[t].materi && progress[t].kuis && progress[t].video
  ).length;
}

/** Reset all progress (for dev/testing) */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export const VALID_TOPICS: TopicId[] = ["array", "linked-list", "stack", "queue"];

export function isValidTopic(topic: string): topic is TopicId {
  return VALID_TOPICS.includes(topic as TopicId);
}
