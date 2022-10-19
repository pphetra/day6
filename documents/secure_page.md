# Securing pages

## ระดับ individual page

ทดลองสร้าง file secure_page.js

```jsx
import { useSession, getSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </>
  );
}
```

## ใช้ middleware + pattern matching

ทดลองสร้าง file /secure/page1.js

```js
function Page1() {
  return <div>Page1</div>;
}

export default Page1;
```

สร้าง file middleware.js ไว้ที่ระดับบนสุด

```js
export { default } from "next-auth/middleware";

export const config = { matcher: ["/secure/:path*"] };
```

แก้ไข .env.local ให้มี

```js
NEXTAUTH_SECRET=yeSrPb0U4MhM5cJRDU4DDb5wKs9NHtQXAjZj2aI9Sww=
```

note: secret key นิยมใช้ openssl generate

```bash
$ openssl rand -base64 32
```
