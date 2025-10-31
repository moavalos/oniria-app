import React from "react";

const DreamJournal = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={128}
    height={128}
    fill="currentColor"
    viewBox="0 0 36 36"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 4.5-2.868 8.72a3 3 0 0 1-1.912 1.912L4.5 18l8.72 2.868a3 3 0 0 1 1.912 1.913L18 31.5l2.868-8.72a3 3 0 0 1 1.913-1.912L31.5 18l-8.72-2.868a3 3 0 0 1-1.912-1.912L18 4.5ZM7.5 4.5v6M28.5 25.5v6M4.5 7.5h6M25.5 28.5h6"
    />
  </svg>
);
export default DreamJournal;
