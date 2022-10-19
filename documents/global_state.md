# Global State

มีหลายวิธีที่จะทำ global state เช่น redux, mobx, remix, ...
แต่เราจะเลือกใช้วิธี custom react-hook

สมมติสถานการณ์ว่าเราจะทำ global state สำหรับการ display sidebar

เริ่มต้นที่การ define state ไว้ที่ระดับ root component ซึ่งในกรณีของ next.js ก็คือ file pages/\_app.js
ตัว state นี้เขานิยมตั้งชื่อว่า Store

ให้สร้าง file /components/global_state/store.js

```js
import { createContext, useState } from "react";

const initialState = {
  showSidebar: true,
};
export const StoreContext = createContext(initialState);

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);
  const showSidebar = () => setState({ ...state, showSidebar: true });
  const hideSidebar = () => setState({ ...state, showSidebar: false });

  return (
    <StoreContext.Provider
      value={{
        state,
        showSidebar,
        hideSidebar,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
```

นำ Store ที่เราสร้างไปวางไว้ที่ /pages/\_app.js

```js
import "../styles/globals.css";
import Store from "../components/global_state/store";

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  );
}

export default MyApp;
```

สร้าง layout component /components/layout.js

```js
function Layout({ children }) {
  return (
    <div className="flex flex-row h-sreen">
      <div className="w-48 bg-gray-200 h-screen">
        <div className="sidebar-content">sidebar</div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;
```

แก้ไข /pages/index.js ให้ใช้ layout ใหม่

```js
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <div className="m-8 p-8">home</div>
      <div className="flex flex-col gap-4">
        <button onClick={() => {}}>hide sidebar</button>
        <button onClick={() => {}}>show sidebar</button>
      </div>
    </Layout>
  );
}
```

การที่จะเข้าถึง function hideSidebar, showSidebar เราต้องทำการ map ค่านั้นจาก context เข้ามาที่ component index.js ของเรา

```js
const { showSidebar, hideSidebar } = useContext(StoreContext);
```

จากนั้นก็ใช้ function นั้นผ่าน onClick ที่เตรียมไว้

```js
<button
  onClick={() => {
    hideSidebar();
  }}
>
  hide sidebar
</button>
<button
  onClick={() => {
    showSidebar();
  }}
>
  show sidebar
</button>
```

กดแล้วก็ยังไม่เกิดอะไรขึ้น เนื่องจากเรายังไม่ได้แก้ layout.js

```js
function Layout({ children }) {
  const { state } = useContext(StoreContext);

  return (
    <div className="flex flex-row h-sreen">
      {state.showSidebar && (
        <div className="w-48 bg-gray-200 h-screen">
          <div className="sidebar-content">sidebar</div>
        </div>
      )}

      <div className="content">{children}</div>
    </div>
  );
}
```

Exercise: ให้เพิ่มปุ่ม hide, show ใน sidebar ด้วย
