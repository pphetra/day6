import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p className="mb-4">Signed in as {session.user.email} </p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <button
          className="bg-red-400 text-white rounded px-4 py-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <p className="mb-4">Not signed in </p>
      <button
        className="bg-blue-400 text-white rounded px-4 py-2"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
