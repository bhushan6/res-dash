import React, { memo, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../utils/helpers";

export const Iframe = memo(({ name }) => {
  const ref = useRef();

  const onScreen = useIntersectionObserver(ref, { threshold: 0.8 });

  const [src, setSrc] = useState("");

  useEffect(() => {
    if (onScreen) {
      setSrc(ref.current.dataset.src);
    }
  }, [onScreen]);

  return (
    <iframe
      loading="lazy"
      ref={ref}
      title={`${name}'s google chart`}
      style={{
        width: "50vw",
        height: "350px",
      }}
      src={src}
      data-src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${name}%22%7D`}
      frameBorder="0"
      allowFullScreen
    />
  );
});
