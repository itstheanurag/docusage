import {
  account,
  apikey,
  session,
  user,
  verification,
} from "./schema/auth-schema";

import {
  codeSnippets,
  codeCollaborators,
  codeVersions,
} from "./schema/codeshare-schema";

import {
  forms,
  formFields,
  formResponses,
  formAnalytics,
} from "./schema/forms-schema";

import {
  documents,
  templateVariables,
  documentDataSets,
} from "./schema/documents-schema";

// exports
export const schema = {
  user,
  session,
  account,
  verification,
  apikey,
  codeSnippets,
  codeCollaborators,
  codeVersions,
  forms,
  formFields,
  formResponses,
  formAnalytics,
  documents,
  templateVariables,
  documentDataSets,
};
