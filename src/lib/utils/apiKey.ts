import { toast } from "sonner";

export const maskKey = (key: string | undefined) => {
  console.log(key, "incoming key");
  if (!key) return "-";
  if (key.length <= 10) return key;
  return `${key.slice(0, 8)}...${key.slice(-4)}`;
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (err: unknown) {
    toast.error("Failed to copy to clipboard");
  }
};

export const formatDate = (date: Date | null) =>
  date
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    : "-";
