import React, { memo } from "react";

export const Iframe = memo(({ name }) => {
  return (
    <iframe
      title={`${name}'s google chart`}
      width={window.innerWidth / 2}
      height="350"
      src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${name}%22%7D`}
      frameborder="0"
      allowfullscreen
    />
  );
});
