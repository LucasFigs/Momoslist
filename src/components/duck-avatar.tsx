interface DuckAvatarProps {
  /** Determina a cor e o acessório do patinho — o mesmo texto sempre sorteia a mesma combinação (ex.: o id do convidado). */
  seed: string;
  className?: string;
}

// Tons pastéis com bom contraste entre si; nenhum remete a um gênero específico.
const DUCK_COLORS = [
  "#F4C542", // amarelo clássico
  "#F2994A", // laranja
  "#56B7E6", // azul-céu
  "#F783AC", // rosa
  "#6FCF97", // verde-menta
  "#B48EE0", // lilás
  "#FF8A65", // coral
  "#4FD1C5", // teal
];

const ACCESSORIES = ["none", "bowtie", "flowers", "sunglasses", "partyhat", "headphones", "scarf", "glasses"] as const;
type Accessory = (typeof ACCESSORIES)[number];

/** Hash simples (djb2), com um "sal" pra decorrelacionar cor e acessório do mesmo seed. */
function hash(seed: string, salt: string): number {
  let h = 0;
  const text = salt + seed;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

function flower(cx: number, cy: number, key: string) {
  return (
    <g key={key}>
      <circle cx={cx} cy={cy - 1.6} r="1.1" fill="#F8B4C4" />
      <circle cx={cx} cy={cy + 1.6} r="1.1" fill="#F8B4C4" />
      <circle cx={cx - 1.6} cy={cy} r="1.1" fill="#F8B4C4" />
      <circle cx={cx + 1.6} cy={cy} r="1.1" fill="#F8B4C4" />
      <circle cx={cx} cy={cy} r="0.9" fill="#F4C542" />
    </g>
  );
}

function renderAccessory(accessory: Accessory) {
  switch (accessory) {
    case "bowtie":
      return (
        <g>
          <path d="M15 24 L20 26 L15 28 Z" fill="#E4572E" />
          <path d="M25 24 L20 26 L25 28 Z" fill="#E4572E" />
          <circle cx="20" cy="26" r="1.3" fill="#B8451F" />
        </g>
      );
    case "flowers":
      return (
        <g>
          {flower(11, 10, "f1")}
          {flower(20, 6.5, "f2")}
          {flower(29, 10, "f3")}
        </g>
      );
    case "sunglasses":
      return (
        <g>
          <rect x="12.3" y="14" width="6.2" height="4.2" rx="1.6" fill="#2B2B2B" />
          <rect x="21.5" y="14" width="6.2" height="4.2" rx="1.6" fill="#2B2B2B" />
          <rect x="18.5" y="15.2" width="3" height="1.4" fill="#2B2B2B" />
        </g>
      );
    case "partyhat":
      return (
        <g>
          <path d="M20 1 L14 10 L26 10 Z" fill="#B48EE0" />
          <circle cx="20" cy="1" r="1.4" fill="#F4C542" />
          <circle cx="16.5" cy="7" r="0.9" fill="#fff" opacity="0.7" />
          <circle cx="23.5" cy="5.3" r="0.9" fill="#fff" opacity="0.7" />
        </g>
      );
    case "headphones":
      return (
        <g>
          <path d="M10 17 Q20 2 30 17" fill="none" stroke="#3A3A3A" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="10" cy="19" r="3" fill="#3A3A3A" />
          <circle cx="30" cy="19" r="3" fill="#3A3A3A" />
        </g>
      );
    case "scarf":
      return <path d="M10 24.5 Q20 29 30 24.5 L30 27 Q20 31.5 10 27 Z" fill="#E4572E" />;
    case "glasses":
      return (
        <g>
          <circle cx="16" cy="16" r="3.4" fill="none" stroke="#2B2B2B" strokeWidth="1.1" />
          <circle cx="24" cy="16" r="3.4" fill="none" stroke="#2B2B2B" strokeWidth="1.1" />
          <line x1="19.4" y1="16" x2="20.6" y2="16" stroke="#2B2B2B" strokeWidth="1.1" />
        </g>
      );
    default:
      return null;
  }
}

/**
 * Avatar de patinho, estilo desenho/fofo — sem identificação de gênero do convidado, a cor e o acessório
 * (laço, óculos, chapéu de festa...) são sorteados a partir do `seed`, mas sempre os mesmos para o mesmo
 * `seed` (ex.: o id do convidado), então a mesma pessoa aparece sempre com o mesmo patinho.
 */
export function DuckAvatar({ seed, className }: DuckAvatarProps) {
  const color = DUCK_COLORS[hash(seed, "color") % DUCK_COLORS.length];
  const accessory = ACCESSORIES[hash(seed, "accessory") % ACCESSORIES.length];
  const eyesHidden = accessory === "sunglasses";

  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Avatar de patinho">
      {/* Corpo */}
      <ellipse cx="20" cy="31" rx="11" ry="7.5" fill={color} />
      {/* Asinhas */}
      <ellipse cx="9" cy="30" rx="2.6" ry="4.6" fill={color} opacity="0.85" />
      <ellipse cx="31" cy="30" rx="2.6" ry="4.6" fill={color} opacity="0.85" />
      {/* Cabeça */}
      <circle cx="20" cy="18" r="9" fill={color} />
      {/* Bico */}
      <ellipse cx="20" cy="22" rx="3.5" ry="1.8" fill="#F2994A" />
      <line x1="16.5" y1="22" x2="23.5" y2="22" stroke="#C9761F" strokeWidth="0.6" />
      {/* Bochechas */}
      <circle cx="12.3" cy="19.5" r="1.8" fill="#FF9EAE" opacity="0.55" />
      <circle cx="27.7" cy="19.5" r="1.8" fill="#FF9EAE" opacity="0.55" />
      {/* Olhos */}
      {!eyesHidden && (
        <>
          <circle cx="16" cy="16" r="1.8" fill="#2B2B2B" />
          <circle cx="24" cy="16" r="1.8" fill="#2B2B2B" />
          <circle cx="16.6" cy="15.3" r="0.6" fill="#fff" />
          <circle cx="24.6" cy="15.3" r="0.6" fill="#fff" />
        </>
      )}
      {renderAccessory(accessory)}
    </svg>
  );
}
