import { DocumentTemplate } from "@/types/document-template";

export const templates: DocumentTemplate[] = [
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    description: "Protect confidential information shared between parties.",
    category: "legal",
    icon: "ShieldCheck",
    fields: [
      {
        id: "companyLogo",
        label: "Company Logo",
        type: "image",
        required: false,
        description: "Your company logo",
      },
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
        placeholder: "Acme Inc.",
      },
      {
        id: "disclosingParty",
        label: "Disclosing Party",
        type: "text",
        required: true,
        placeholder: "Full legal name",
      },
      {
        id: "receivingParty",
        label: "Receiving Party",
        type: "text",
        required: true,
        placeholder: "Full legal name",
      },
      {
        id: "effectiveDate",
        label: "Effective Date",
        type: "date",
        required: true,
      },
      {
        id: "duration",
        label: "Duration (months)",
        type: "text",
        required: true,
        placeholder: "12",
      },
      {
        id: "jurisdiction",
        label: "Governing Jurisdiction",
        type: "text",
        required: true,
        placeholder: "State of California",
      },
    ],
    htmlTemplate: `
<div style="font-family: 'Times New Roman', serif; max-width: 700px; margin: 0 auto; line-height: 1.8;">
  {{#companyLogo}}<img src="{{companyLogo}}" alt="Logo" style="max-height: 60px; margin-bottom: 20px;" />{{/companyLogo}}
  <h1 style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px;">NON-DISCLOSURE AGREEMENT</h1>
  <p>This Non-Disclosure Agreement ("Agreement") is entered into as of <strong>{{effectiveDate}}</strong> by and between:</p>
  <p><strong>Disclosing Party:</strong> {{disclosingParty}}, representing {{companyName}}</p>
  <p><strong>Receiving Party:</strong> {{receivingParty}}</p>
  <h2>1. Confidential Information</h2>
  <p>The Receiving Party agrees to hold and maintain the Confidential Information in strict confidence for the sole benefit of the Disclosing Party.</p>
  <h2>2. Term</h2>
  <p>This Agreement shall remain in effect for a period of <strong>{{duration}}</strong> months from the Effective Date.</p>
  <h2>3. Governing Law</h2>
  <p>This Agreement shall be governed by the laws of <strong>{{jurisdiction}}</strong>.</p>
  <div style="margin-top: 60px; display: flex; justify-content: space-between;">
    <div><p>_________________________</p><p>{{disclosingParty}}<br/>Disclosing Party</p></div>
    <div><p>_________________________</p><p>{{receivingParty}}<br/>Receiving Party</p></div>
  </div>
</div>`,
  },
  {
    id: "employment-offer",
    name: "Employment Offer Letter",
    description: "Formal job offer for new hires.",
    category: "hr",
    icon: "Briefcase",
    fields: [
      {
        id: "companyLogo",
        label: "Company Logo",
        type: "image",
        required: false,
      },
      {
        id: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
        placeholder: "Acme Inc.",
      },
      {
        id: "candidateName",
        label: "Candidate Name",
        type: "text",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: "position",
        label: "Position",
        type: "text",
        required: true,
        placeholder: "Software Engineer",
      },
      {
        id: "salary",
        label: "Annual Salary",
        type: "currency",
        required: true,
        placeholder: "75,000",
      },
      { id: "startDate", label: "Start Date", type: "date", required: true },
      {
        id: "reportingManager",
        label: "Reporting Manager",
        type: "text",
        required: true,
        placeholder: "Jane Smith",
      },
      {
        id: "benefits",
        label: "Benefits Summary",
        type: "textarea",
        required: false,
        placeholder: "Health insurance, 401k...",
      },
    ],
    htmlTemplate: `
<div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; line-height: 1.6;">
  {{#companyLogo}}<img src="{{companyLogo}}" alt="Logo" style="max-height: 50px; margin-bottom: 20px;" />{{/companyLogo}}
  <p style="text-align: right;">Date: {{startDate}}</p>
  <p>Dear {{candidateName}},</p>
  <p>We are pleased to extend an offer of employment for the position of <strong>{{position}}</strong> at <strong>{{companyName}}</strong>.</p>
  <h3>Compensation</h3>
  <p>Your annual salary will be <strong>\${{salary}}</strong>, paid bi-weekly.</p>
  <h3>Start Date</h3>
  <p>Your anticipated start date is <strong>{{startDate}}</strong>. You will report to <strong>{{reportingManager}}</strong>.</p>
  {{#benefits}}<h3>Benefits</h3><p>{{benefits}}</p>{{/benefits}}
  <p>Please sign below to accept this offer.</p>
  <div style="margin-top: 40px;"><p>_________________________</p><p>{{candidateName}}</p></div>
</div>`,
  },
  {
    id: "loan-agreement",
    name: "Loan Agreement",
    description: "Formal agreement for lending money between parties.",
    category: "finance",
    icon: "Landmark",
    fields: [
      {
        id: "lenderName",
        label: "Lender Name",
        type: "text",
        required: true,
        placeholder: "Bank of Example",
      },
      {
        id: "borrowerName",
        label: "Borrower Name",
        type: "text",
        required: true,
        placeholder: "John Doe",
      },
      {
        id: "loanAmount",
        label: "Loan Amount",
        type: "currency",
        required: true,
        placeholder: "10,000",
      },
      {
        id: "interestRate",
        label: "Interest Rate (%)",
        type: "text",
        required: true,
        placeholder: "5",
      },
      { id: "loanDate", label: "Loan Date", type: "date", required: true },
      {
        id: "repaymentDate",
        label: "Repayment Date",
        type: "date",
        required: true,
      },
      {
        id: "terms",
        label: "Additional Terms",
        type: "textarea",
        required: false,
      },
    ],
    htmlTemplate: `
<div style="font-family: 'Georgia', serif; max-width: 700px; margin: 0 auto; line-height: 1.7;">
  <h1 style="text-align: center;">LOAN AGREEMENT</h1>
  <p>This Loan Agreement is made on <strong>{{loanDate}}</strong> between:</p>
  <p><strong>Lender:</strong> {{lenderName}}</p>
  <p><strong>Borrower:</strong> {{borrowerName}}</p>
  <h2>Loan Details</h2>
  <ul>
    <li>Principal Amount: <strong>\${{loanAmount}}</strong></li>
    <li>Interest Rate: <strong>{{interestRate}}%</strong> per annum</li>
    <li>Repayment Due: <strong>{{repaymentDate}}</strong></li>
  </ul>
  {{#terms}}<h2>Additional Terms</h2><p>{{terms}}</p>{{/terms}}
  <div style="margin-top: 60px; display: flex; justify-content: space-between;">
    <div><p>_________________________</p><p>{{lenderName}}<br/>Lender</p></div>
    <div><p>_________________________</p><p>{{borrowerName}}<br/>Borrower</p></div>
  </div>
</div>`,
  },
  {
    id: "service-agreement",
    name: "Service Agreement",
    description:
      "Contract for services rendered between a provider and client.",
    category: "legal",
    icon: "FileText",
    fields: [
      {
        id: "companyLogo",
        label: "Company Logo",
        type: "image",
        required: false,
      },
      {
        id: "providerName",
        label: "Service Provider",
        type: "text",
        required: true,
        placeholder: "Consulting Co.",
      },
      {
        id: "clientName",
        label: "Client Name",
        type: "text",
        required: true,
        placeholder: "Client Corp.",
      },
      {
        id: "scopeOfWork",
        label: "Scope of Work",
        type: "textarea",
        required: true,
        placeholder: "Describe services...",
      },
      {
        id: "paymentTerms",
        label: "Payment Terms",
        type: "textarea",
        required: true,
        placeholder: "Net 30, etc.",
      },
      { id: "startDate", label: "Start Date", type: "date", required: true },
      { id: "endDate", label: "End Date", type: "date", required: false },
    ],
    htmlTemplate: `
<div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; line-height: 1.6;">
  {{#companyLogo}}<img src="{{companyLogo}}" alt="Logo" style="max-height: 50px; margin-bottom: 20px;" />{{/companyLogo}}
  <h1 style="text-align: center; text-transform: uppercase;">Service Agreement</h1>
  <p>This Service Agreement is entered into on <strong>{{startDate}}</strong> by:</p>
  <p><strong>Provider:</strong> {{providerName}}</p>
  <p><strong>Client:</strong> {{clientName}}</p>
  <h2>Scope of Work</h2>
  <p>{{scopeOfWork}}</p>
  <h2>Payment Terms</h2>
  <p>{{paymentTerms}}</p>
  {{#endDate}}<p><strong>Contract End Date:</strong> {{endDate}}</p>{{/endDate}}
  <div style="margin-top: 60px; display: flex; justify-content: space-between;">
    <div><p>_________________________</p><p>{{providerName}}<br/>Provider</p></div>
    <div><p>_________________________</p><p>{{clientName}}<br/>Client</p></div>
  </div>
</div>`,
  },
];

export const getTemplateById = (id: string): DocumentTemplate | undefined => {
  return templates.find((t) => t.id === id);
};
