import { useAuth } from "../features/auth/hooks/useAuth";

export default function Dashboard() {
  const { user, session, signOut } = useAuth();

  const fullName = session?.user?.user_metadata?.full_name || "User";
  const language = session?.user?.user_metadata?.language || "N/A";
  const roomSkin = session?.user?.user_metadata?.room_skin || "N/A";

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <h1 className="text-3xl font-bold">Welcome, {fullName}!</h1>

      <div className="p-4 border rounded-md w-full max-w-sm bg-gray-100">
        <p>
          <strong>Language:</strong> {language}
        </p>
        <p>
          <strong>Room Skin:</strong> {roomSkin}
        </p>
      </div>

      <div className="p-4 border rounded-md w-full max-w-sm bg-gray-100">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>{" "}
        <p></p>
      </div>

      <button
        onClick={async () => {
          await signOut();
          window.location.href = "/login";
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
