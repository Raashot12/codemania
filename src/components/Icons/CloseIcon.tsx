const CloseIcon = ({ onclick }: { onclick: () => void }) => (
  <svg
    width={25}
    height={25}
    onClick={onclick}
    style={{ cursor: 'pointer' }}
    viewBox="0 0 32 32"
    fill="none"
  >
    <circle cx={16} cy={16} r={16} fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.246 16L9.5767 10.3307C9.38144 10.1354 9.38144 9.81886 9.5767 9.62359L9.62384 9.57645C9.8191 9.38119 10.1357 9.38119 10.3309 9.57645L16.0003 15.2458L21.6696 9.57645C21.8649 9.38119 22.1814 9.38119 22.3767 9.57645L22.4238 9.62359C22.6191 9.81886 22.6191 10.1354 22.4238 10.3307L16.7545 16L22.4238 21.6693C22.6191 21.8646 22.6191 22.1812 22.4238 22.3765L22.3767 22.4236C22.1814 22.6189 21.8649 22.6189 21.6696 22.4236L16.0003 16.7543L10.3309 22.4236C10.1357 22.6189 9.8191 22.6189 9.62384 22.4236L9.5767 22.3765C9.38144 22.1812 9.38144 21.8646 9.5767 21.6693L15.246 16Z"
      stroke="#0B0C7D"
      strokeWidth={0.5}
      fill="#c4c4c4"
    />
  </svg>
);
export default CloseIcon;