import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LoginButton from "../components/login-btn";

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const resp = await fetch("http://localhost:8088/api/user", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (resp.status === 200) {
          setUser("call laravel /api/user successfully");
        } else {
          console.log(resp);
          setUser("call laravel /api/user return ${resp.status}");
        }
      } catch (e) {
        setUser("laravel error " + e);
        console.error(e);
      }
    }
    if (session) {
      fetchUser();
    }
  }, [session]);

  return (
    <div className="m-8 p-8">
      <div>{user}</div>
      <div>
        <LoginButton />
      </div>
    </div>
  );
}
