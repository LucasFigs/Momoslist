/**
 * Cor temática da lista. O casal escolhe UMA cor; daqui saem todos os tons de
 * acento (botão, hover, active, fundo suave...) já com contraste garantido.
 *
 * Regra: a cor escolhida nunca é usada "crua". Se ela for clara demais para ter
 * texto branco legível em cima (ou para ser usada como texto sobre o fundo claro),
 * a luminosidade é reduzida até passar de 4,5:1 (WCAG AA), mantendo o matiz.
 * Sem imports: roda igual no servidor, no cliente e nos testes.
 */

export const DEFAULT_THEME_COLOR = "#34463A"; // Sálvia — cor original da Momoslist

export interface ThemePreset {
  id: string;
  label: string;
  hex: string;
}

/** Paletas prontas: já escuras o bastante para passar direto, sem ajuste. */
export const THEME_PRESETS: ThemePreset[] = [
  { id: "salvia", label: "Sálvia", hex: "#34463A" },
  { id: "terracota", label: "Terracota", hex: "#9E482E" },
  { id: "petroleo", label: "Azul-petróleo", hex: "#1F5560" },
  { id: "marinho", label: "Marinho", hex: "#2C3F6E" },
  { id: "ameixa", label: "Ameixa", hex: "#6B3560" },
  { id: "oliva", label: "Oliva", hex: "#5A5F2E" },
  { id: "ouro", label: "Ouro velho", hex: "#86642A" },
  { id: "grafite", label: "Grafite", hex: "#3A3937" },
];

/** Compatibilidade com o enum antigo do banco (SALVIA | TERRACOTA). */
export const LEGACY_THEME_HEX: Record<string, string> = {
  SALVIA: "#34463A",
  TERRACOTA: "#9E482E",
};

export const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

export function resolveThemeColor(themeColor: string | null | undefined, legacyTheme?: string | null): string {
  if (themeColor && HEX_COLOR_PATTERN.test(themeColor)) return themeColor.toUpperCase();
  return (legacyTheme && LEGACY_THEME_HEX[legacyTheme]) || DEFAULT_THEME_COLOR;
}

// ---------------------------------------------------------------------------
// Conversões e contraste
// ---------------------------------------------------------------------------

type Rgb = [number, number, number];
type Hsl = [number, number, number]; // h 0–360, s 0–1, l 0–1

function hexToRgb(hex: string): Rgb {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as Rgb;
}

function rgbToHsl([r, g, b]: Rgb): Hsl {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}

export function hslToRgb([h, s, l]: Hsl): Rgb {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255)) as Rgb;
}

function luminance([r, g, b]: Rgb): number {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const cssHsl = ([h, s, l]: Hsl) => `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;

// Superfícies neutras da Momoslist (mesmos valores do globals.css) contra as quais o acento é medido.
const FOREGROUND_HSL: Hsl = [40, 0.3, 0.98]; // texto sobre botão sólido
const PAGE_BACKGROUND_HSL: Hsl = [36, 0.38, 0.97];
const MIN_CONTRAST = 4.6; // folga sobre os 4,5 do AA para sobreviver ao arredondamento do CSS

// ---------------------------------------------------------------------------
// Derivação
// ---------------------------------------------------------------------------

export interface ThemeTokens {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  /** Fundo de chips/selos e estados selecionados. O texto em cima é `primary`. */
  primarySoft: string;
  /** Fundo muito leve (hover de linhas, faixas). */
  primarySubtle: string;
  primaryBorder: string;
  primaryForeground: string;
  /** Quanto a luminosidade original foi reduzida para passar no contraste (0 = cor usada como veio). */
  adjustedBy: number;
}

export function deriveTheme(hex: string): ThemeTokens {
  const safeHex = HEX_COLOR_PATTERN.test(hex) ? hex : DEFAULT_THEME_COLOR;
  const [h, sRaw, lRaw] = rgbToHsl(hexToRgb(safeHex));

  // Evita cores neon: acento elegante, não "marca-texto".
  const s = Math.min(sRaw, 0.72);

  const soft: Hsl = [h, Math.min(s, 0.5), 0.92];
  const foregroundRgb = hslToRgb(FOREGROUND_HSL);
  const backgroundRgb = hslToRgb(PAGE_BACKGROUND_HSL);
  const softRgb = hslToRgb(soft);

  // Escurece até: texto claro legível sobre o botão E a cor legível como texto sobre fundo claro e sobre o "soft".
  let l = lRaw;
  const passes = (lightness: number) => {
    const rgb = hslToRgb([h, s, lightness]);
    return (
      contrastRatio(rgb, foregroundRgb) >= MIN_CONTRAST &&
      contrastRatio(rgb, backgroundRgb) >= MIN_CONTRAST &&
      contrastRatio(rgb, softRgb) >= MIN_CONTRAST
    );
  };
  while (!passes(l) && l > 0.05) l = Math.round((l - 0.01) * 100) / 100;

  // Em cores muito escuras "hover mais escuro" não seria perceptível: clareia levemente.
  const shift = l > 0.25 ? -0.05 : 0.06;

  return {
    primary: cssHsl([h, s, l]),
    primaryHover: cssHsl([h, s, l + shift]),
    primaryActive: cssHsl([h, s, l + shift * 1.8]),
    primarySoft: cssHsl(soft),
    primarySubtle: cssHsl([h, Math.min(s, 0.4), 0.96]),
    primaryBorder: cssHsl([h, Math.min(s, 0.35), 0.82]),
    primaryForeground: cssHsl(FOREGROUND_HSL),
    adjustedBy: Math.max(0, Math.round((lRaw - l) * 100) / 100),
  };
}

/** Variáveis CSS para aplicar num elemento (`style`) e re-tematizar tudo dentro dele. */
export function themeToCssVars(tokens: ThemeTokens): Record<string, string> {
  return {
    "--primary": tokens.primary,
    "--primary-hover": tokens.primaryHover,
    "--primary-active": tokens.primaryActive,
    "--primary-soft": tokens.primarySoft,
    "--primary-subtle": tokens.primarySubtle,
    "--primary-border": tokens.primaryBorder,
    "--primary-foreground": tokens.primaryForeground,
  };
}

export function themeStyleFor(hex: string | null | undefined, legacyTheme?: string | null) {
  return themeToCssVars(deriveTheme(resolveThemeColor(hex, legacyTheme)));
}
