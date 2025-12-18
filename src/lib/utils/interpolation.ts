/**
 * Interpolates variables in a document content string.
 * Replaces {{variableName}} with values from the provided data object.
 *
 * @param content The document HTML content containing {{placeholders}}
 * @param data An object mapping variable names to their values
 * @returns The interpolated content
 */
export function interpolateVariables(
  content: string,
  data: Record<string, any>
): string {
  if (!content) return "";

  return content.replace(/\{\{([^}]+)\}\}/g, (match, varName) => {
    const trimmedVarName = varName.trim();
    // Use defaultValue or fallback to the placeholder itself if not found in data
    return data[trimmedVarName] !== undefined
      ? String(data[trimmedVarName])
      : match;
  });
}
