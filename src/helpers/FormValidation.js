/**
 * Form Validation Utility
 * Provides reusable validation logic for word forms
 */

/**
 * Validates a word field (english, german, vietnamese)
 * @param {string} word - The word to validate
 * @returns {string|null} Error message if invalid, null if valid
 */
export function validateWord(word) {
  const trimmed = (word || '').trim();
  
  if (!trimmed) {
    return 'Field is required';
  }
  
  if (trimmed.length === 0) {
    return 'Cannot be empty or whitespace only';
  }
  
  if (/\d/.test(trimmed)) {
    return 'Cannot contain numbers';
  }
  
  return null;
}

/**
 * Validates all word fields
 * @param {Object} wordData - Object with english, german, vietnamese properties
 * @returns {string[]} Array of error messages
 */
export function validateWordForm(wordData) {
  const errors = [];
  
  const engErr = validateWord(wordData.english);
  const gerErr = validateWord(wordData.german);
  const vieErr = validateWord(wordData.vietnamese);
  
  if (engErr) errors.push('English: ' + engErr);
  if (gerErr) errors.push('German: ' + gerErr);
  if (vieErr) errors.push('Vietnamese: ' + vieErr);
  
  return errors;
}

/**
 * Mixin for Vue components that need word validation
 * Provides: validateWord(), validateWordForm() methods
 */
export const FormValidationMixin = {
  methods: {
    validateWord,
    validateWordForm
  }
};
