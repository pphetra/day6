import { useState } from "react";

const initialState = {
  showSidebar: true,
};

export const useGlobalState = () => {
  const [state, setState] = useState(initialState);
  const showSidebar = () => setState({ ...state, showSidebar: true });
  const hideSidebar = () => setState({ ...state, showSidebar: false });
  return {
    state: state,
    showSidebar,
    hideSidebar,
  };
};
