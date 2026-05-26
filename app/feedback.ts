const DEFAULT_FEEDBACK_EMAIL = "suvro.samajder@gmail.com";
const FEEDBACK_EMAIL_ENV_KEY = "NEXT_PUBLIC_SNIPBOP_FEEDBACK_EMAIL";

export function getFeedbackEmail() {
  return process.env[FEEDBACK_EMAIL_ENV_KEY]?.trim() || DEFAULT_FEEDBACK_EMAIL;
}

export function getFeedbackMailto(subject = "SnipBop feedback") {
  return `mailto:${getFeedbackEmail()}?subject=${encodeURIComponent(subject)}`;
}

