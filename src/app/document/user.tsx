import { useDocumentStore } from "@/stores/documentStore";

const UserPresence = () => {
  const users = useDocumentStore((state) => state.users);

  return (
    <div className="px-4 py-2 flex items-center gap-2 border-b border-border bg-muted/40">
      <span className="text-sm text-muted-foreground">Active users:</span>
      <div className="flex gap-2 flex-wrap">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${user.color}20`,
              color: user.color,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: user.color }}
            />
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPresence;
