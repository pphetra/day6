import useAnyKeyToRender from "./useAnyKey";
import { useEffect } from "react";

export default function WordCount({ children = "" }) {
  useAnyKeyToRender();
  const words = children.split(" ");

  useEffect(() => {
    console.log("fresh render");
  }, [words]);

  return (
    <>
      <p>{children}</p>
      <p>
        <strong>{words.length} - words</strong>
      </p>
    </>
  );
}
