interface ParagraphFieldProps {
  content: string;
  onChangeContent?: (newContent: string) => void;
}

export default function ParagraphField({ content, onChangeContent }: ParagraphFieldProps) {
  return (
    <div>
    <textarea
  value={content}
  onChange={(e) => onChangeContent?.(e.target.value)}
   className="w-full border rounded px-3 py-2 text-sm resize-none overflow-hidden focus:outline-none focus:ring-0 focus:border-gray-300"
  placeholder="Type your paragraph here..."
  rows={4}
/>
    </div>
  );
}
