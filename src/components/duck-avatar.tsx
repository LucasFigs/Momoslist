interface DuckAvatarProps {
  /** Determina a cor do patinho — o mesmo texto sempre sorteia a mesma cor (ex.: o id do convidado). */
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

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash;
}

/**
 * Avatar de patinho de borracha — sem identificação de gênero do convidado, um patinho de cor sorteada
 * (mas estável, sempre a mesma para o mesmo `seed`) substitui a foto que não temos.
 */
export function DuckAvatar({ seed, className }: DuckAvatarProps) {
  const color = DUCK_COLORS[hashSeed(seed) % DUCK_COLORS.length];
  const shade = "rgba(0,0,0,0.14)";

  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Avatar de patinho">
      {/* Corpo */}
      <ellipse cx="19" cy="26" rx="13" ry="9.5" fill={color} />
      {/* Asa (sombra sutil sobre o corpo) */}
      <ellipse cx="15" cy="27" rx="6" ry="5" fill={shade} />
      {/* Cabeça */}
      <circle cx="27" cy="15" r="8.5" fill={color} />
      {/* Bico */}
      <path d="M33.5 12.5 L40 14.5 L33.5 17.5 Z" fill="#F2994A" />
      {/* Olho */}
      <circle cx="29.5" cy="12.5" r="1.5" fill="#2B2B2B" />
    </svg>
  );
}
