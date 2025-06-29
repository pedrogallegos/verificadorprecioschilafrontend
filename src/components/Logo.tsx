interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo circular */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#gradient)"
        stroke="#1e40af"
        strokeWidth="2"
      />
      
      {/* Código de barras estilizado */}
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="2" height="20" fill="white" />
        <rect x="4" y="0" width="1" height="20" fill="white" />
        <rect x="7" y="0" width="3" height="20" fill="white" />
        <rect x="12" y="0" width="1" height="20" fill="white" />
        <rect x="15" y="0" width="2" height="20" fill="white" />
        <rect x="19" y="0" width="1" height="20" fill="white" />
        <rect x="22" y="0" width="4" height="20" fill="white" />
        <rect x="28" y="0" width="1" height="20" fill="white" />
        <rect x="31" y="0" width="2" height="20" fill="white" />
        <rect x="35" y="0" width="1" height="20" fill="white" />
        <rect x="38" y="0" width="3" height="20" fill="white" />
        <rect x="43" y="0" width="1" height="20" fill="white" />
        <rect x="46" y="0" width="2" height="20" fill="white" />
        <rect x="50" y="0" width="1" height="20" fill="white" />
        <rect x="53" y="0" width="4" height="20" fill="white" />
        <rect x="59" y="0" width="1" height="20" fill="white" />
      </g>
      
      {/* Símbolo de precio ($) */}
      <g transform="translate(35, 55)">
        <circle cx="15" cy="15" r="13" fill="white" stroke="#2563eb" strokeWidth="2" />
        <text
          x="15"
          y="21"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#2563eb"
        >
          $
        </text>
      </g>
      
      {/* Gradiente */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Versión simple del logo para favicon
export const LogoIcon = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#2563eb" />
      
      {/* Código de barras mini */}
      <g transform="translate(4, 8)">
        <rect x="0" y="0" width="1" height="8" fill="white" />
        <rect x="2" y="0" width="0.5" height="8" fill="white" />
        <rect x="4" y="0" width="1.5" height="8" fill="white" />
        <rect x="7" y="0" width="0.5" height="8" fill="white" />
        <rect x="9" y="0" width="1" height="8" fill="white" />
        <rect x="12" y="0" width="2" height="8" fill="white" />
        <rect x="16" y="0" width="0.5" height="8" fill="white" />
        <rect x="18" y="0" width="1" height="8" fill="white" />
        <rect x="21" y="0" width="1.5" height="8" fill="white" />
        <rect x="24" y="0" width="0.5" height="8" fill="white" />
      </g>
      
      {/* Símbolo $ */}
      <circle cx="16" cy="22" r="6" fill="white" />
      <text
        x="16"
        y="26"
        textAnchor="middle"
        fontSize="8"
        fontWeight="bold"
        fill="#2563eb"
      >
        $
      </text>
    </svg>
  )
}
