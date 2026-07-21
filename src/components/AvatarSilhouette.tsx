export default function AvatarSilhouette() {
  return (
    <div className="avatar-silhouette" aria-hidden="true">
      <svg viewBox="0 0 200 320" className="avatar-silhouette-svg">
        <path d="M62 320 L46 190 Q100 165 154 190 L138 320 Z" fill="#141414" />
        <path d="M78 190 Q100 179 122 190 L127 226 Q100 217 73 226 Z" fill="#1e1e1e" />
        <rect x="88" y="148" width="24" height="34" rx="10" fill="#f2ddc4" />
        <ellipse cx="146" cy="152" rx="13" ry="34" fill="#e3c17e" transform="rotate(20 146 152)" />
        <circle cx="100" cy="120" r="48" fill="#f2ddc4" />
        <path
          d="M52 118 Q49 60 100 57 Q151 60 148 118 Q151 88 130 76 Q121 100 100 95 Q79 100 70 76 Q49 88 52 118 Z"
          fill="#e3c17e"
        />
        <circle cx="120" cy="68" r="6" fill="#b9a0ff" />
        <circle cx="130" cy="64" r="4" fill="#ff4d5a" />
      </svg>
    </div>
  )
}
