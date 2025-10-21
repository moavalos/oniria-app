interface SvgProps extends React.SVGProps<SVGSVGElement> {}
const SvgComponent = (props: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={31}
    fill="none"
    className={props.className}
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.926 3.875H7.914c-1.66 0-3.007 1.157-3.007 2.583v5.167c0 1.427 1.346 2.583 3.007 2.583h6.012c1.66 0 3.007-1.156 3.007-2.583V6.458c0-1.426-1.346-2.583-3.007-2.583ZM10.92 14.208v5.167c0 .685.317 1.342.88 1.827.564.484 1.329.756 2.126.756h6.013M28.958 16.792h-6.013c-1.66 0-3.006 1.156-3.006 2.583v5.167c0 1.426 1.346 2.583 3.006 2.583h6.013c1.66 0 3.006-1.157 3.006-2.583v-5.167c0-1.427-1.346-2.583-3.006-2.583Z"
    />
  </svg>
);
export default SvgComponent;
