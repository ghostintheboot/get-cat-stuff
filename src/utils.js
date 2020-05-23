
// Provides a random cat emoticon on the failure screen.
export function randomCatEmoticon() {
  let cats = ["=^._.^= ∫", "(=^･ω･^=)", "(^・x・^)", "(=^･ｪ･^=))ﾉ彡☆", "(^._.^)ﾉ", "(=‐ω‐=)", "(=｀ェ´=)", "(=^ ◡ ^=)", "(=^-ω-^=)", "(^≗ω≗^)", "(Φ ᆺ Φ)", ":3", "/ᐠ｡ꞈ｡ᐟ\\", "/ᐠ.ꞈ.ᐟ\\", "✧/ᐠ-ꞈ-ᐟ\\", "/ᐠ ._. ᐟ\\ﾉ", "/ᐠﹷ ‸ ﹷ ᐟ\\ﾉ", "/ᐠ. ｡.ᐟ\\ᵐᵉᵒʷˎˊ˗", "/ᐠ ̥    ̣̮ ̥ ᐟ\\ﾉ", "/ᐠ𝅒 ‸ 𝅒ᐟ\\ﾉ", "(=චᆽච=)", "(=ච ﻌ ච=)", "(=චᆽච=)", "(=◕ᆽ◕ฺ=)", "(≈ㅇᆽㅇ≈)♡", ">:3", "(=🝦 ༝ 🝦=)", "₍⸍⸌̣ʷ̣̫⸍̣⸌₎", "(⌯’ᢍ’⌯ ^)∫", "[^._.^]ﾉ彡", "(=´ᆺ｀=)", "(≅ᆽ≅)", "(^._.^)ﾉ (╯°□°）╯", "Hǝʎ` ʍɥǝɹǝ,s ʇɥǝ ɔɐʇ ǝɯoʇᴉɔou¿¿¿", "(Φ ₒ Φ)", "♡(ﾐ ᵕ̣̣̣̣̣̣ ﻌ ᵕ̣̣̣̣̣̣ ﾐ)ﾉ"];
  let randomCatPick = Math.round( Math.random() * cats.length );
  return cats[randomCatPick];
}


// Tilts the failure screen at a random angle.
// I'm havin' a little too much fun right here 😛😂
export const getRandomRotationAngle = (min, max) => Math.round( Math.random() * (max - min) + min );
