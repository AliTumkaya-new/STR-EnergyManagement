export function STRLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* STR Text - Blue */}
      <text
        x="10"
        y="55"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="52"
        fontWeight="900"
        fill="#2563eb"
      >
        ST
      </text>
      
      {/* R with Lightning - Orange gradient */}
      <defs>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      
      {/* R letter */}
      <text
        x="95"
        y="55"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="52"
        fontWeight="900"
        fill="url(#orangeGradient)"
      >
        R
      </text>
      
      {/* Lightning bolt */}
      <path
        d="M145 8 L125 42 L140 42 L120 92 L155 48 L138 48 L158 8 Z"
        fill="url(#orangeGradient)"
      />
      
      {/* ENERJİ Text - Blue */}
      <text
        x="45"
        y="88"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="8"
        fill="#2563eb"
      >
        ENERJİ
      </text>
    </svg>
  )
}

export function STRLogoMini({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="miniOrangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      
      {/* Lightning bolt icon */}
      <path
        d="M24 4 L12 20 L18 20 L14 36 L28 18 L21 18 L27 4 Z"
        fill="url(#miniOrangeGradient)"
      />
      
      {/* Circle border */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
      />
    </svg>
  )
}
