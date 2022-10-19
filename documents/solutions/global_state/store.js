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
