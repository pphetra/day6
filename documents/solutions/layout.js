import { useContext } from "react";
import { StoreContext } from "../components/global_state/store";

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

export default Layout;
