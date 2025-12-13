import { getSession } from "@/lib/better-auth";
import { redirect } from "next/navigation";
import WhiteboardManager from "@/components/dashbaord/whiteboard/whiteboard-manager";

export default async function WhiteboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <WhiteboardManager />
    </div>
  );
}
