export const talentText = (
  string: TemplateStringsArray,
  ...expressions: (string | number)[][]
) => (rank: number) => {
  const result = [string[0]];
  expressions.forEach((expression, i) => {
    result.push(expression[rank - 1].toString(), string[i + 1]);
  });
  return result.join("");
};

export function requireAll(r: WebpackRequireContext): { [key: string]: string } {
  const images: { [key: string]: string } = {};
  r.keys().forEach((key) => {
    // strip leading `./` and extension:
    const name = key.replace(/^\.\/(.*)\.\w+$/, '$1');
    // r(key) will be either the URL string or a module with `.default`
    const mod = r(key) as any;
    images[name] = (mod.default || mod) as string;
  });
  return images;
}

export const trimEnd = <T>(trimVal: T, list: T[]) => {
  let lastSigIndex = list.length;
  while (list[lastSigIndex - 1] === trimVal) {
    lastSigIndex -= 1;
  }
  return list.slice(0, lastSigIndex);
};

const glyphString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const glyphs = glyphString.split("");
const glyphMap = glyphs.reduce<Record<string, number>>((prev, glyph, i) => {
  prev[glyph] = i;
  return prev;
}, {});

// all numbers are from 0 to 5;
export const encodeState = (numbers: number[]) => {
  let result = "";
  const trimmed = trimEnd(0, numbers);

  // divide numbers into pairs
  // encode them as a glyph
  for (let i = 0; i < trimmed.length; i += 2) {
    const first = numbers[i];
    const second = numbers[i + 1];
    const index = first * 6 + (second || 0);
    result += glyphs[index];
  }
  return result;
};

export const decodeState = (hash: string) => {
  const chars = hash.split("");
  let result = [];

  for (let char of chars) {
    const value = glyphMap[char];
    const first = Math.floor(value / 6);
    const second = value % 6;
    result.push(first, second);
  }
  return result;
};
