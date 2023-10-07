import { message } from "antd";

const ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

let ALPHABET_MAP = {};

for (let z = 0; z < ALPHABET.length; z++) {
  const x = ALPHABET.charAt(z);
  ALPHABET_MAP[x] = z;
}

function polymodStep(pre) {
  const b = pre >> 25;
  return (
    ((pre & 0x1ffffff) << 5) ^
    (-((b >> 0) & 1) & 0x3b6a57b2) ^
    (-((b >> 1) & 1) & 0x26508e6d) ^
    (-((b >> 2) & 1) & 0x1ea119fa) ^
    (-((b >> 3) & 1) & 0x3d4233dd) ^
    (-((b >> 4) & 1) & 0x2a1462b3)
  );
}

function prefixChk(prefix) {
  let chk = 1;
  for (let i = 0; i < prefix.length; ++i) {
    let c = prefix.charCodeAt(i);
    if (c < 33 || c > 126) {
      return null;
    }
    chk = polymodStep(chk) ^ (c >> 5);
  }
  chk = polymodStep(chk);
  for (let i = 0; i < prefix.length; ++i) {
    let v = prefix.charCodeAt(i);
    chk = polymodStep(chk) ^ (v & 0x1f);
  }
  return chk;
}

function convertbits(data, inBits, outBits) {
  let value = 0;
  let bits = 0;
  let maxV = (1 << outBits) - 1;
  let result = [];
  for (let i = 0; i < data.length; ++i) {
    value = (value << inBits) | data[i];
    bits += inBits;
    while (bits >= outBits) {
      bits -= outBits;
      result.push((value >> bits) & maxV);
    }
  }
  if (bits > 0) {
    result.push((value << (outBits - bits)) & maxV);
  }
  return result;
}

function toWords(bytes) {
  return convertbits(bytes, 8, 5);
}

function fromWordsUnsafe(words) {
  let res = convertbits(words, 5, 8);
  if (Array.isArray(res)) return res;
}

function fromWords(words) {
  let res = convertbits(words, 5, 8);
  if (Array.isArray(res)) return res;
  throw new Error(res);
}

function getLibraryFromEncoding(encoding) {
  let ENCODING_CONST;
  if (encoding === "bech32") {
    ENCODING_CONST = 1;
  } else {
    ENCODING_CONST = 0x2bc830a3;
  }

  function encode(prefix, words, LIMIT) {
    LIMIT = LIMIT || 90;
    if (prefix.length + 7 + words.length > LIMIT) {
      return null;
    }
    // throw new TypeError("Exceeds length limit");
    prefix = prefix.toLowerCase();

    let chk = prefixChk(prefix);
    if (typeof chk === "string") throw new Error(chk);
    let result = prefix + "1";
    for (let i = 0; i < words.length; ++i) {
      let x = words[i];
      if (x >> 5 !== 0) {
        return null;
      }
      chk = polymodStep(chk) ^ x;
      result += ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
      chk = polymodStep(chk);
    }
    chk ^= ENCODING_CONST;
    for (let i = 0; i < 6; ++i) {
      let v = (chk >> ((5 - i) * 5)) & 0x1f;
      result += ALPHABET.charAt(v);
    }
    return result;
  }

  function __decode(str, LIMIT = 90): any {
    if (str.length < 8) {
      return null;
    }
    if (str.length > LIMIT) {
      return null;
    }
    // don't allow mixed case
    let lowered = str.toLowerCase();
    let uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered) {
      return null;
    }
    str = lowered;
    let split = str.lastIndexOf("1");
    if (split === -1) {
      return null;
    }
    if (split === 0) {
      return null;
    }
    let prefix = str.slice(0, split);
    let wordChars = str.slice(split + 1);
    if (wordChars.length < 6) {
      return null;
    }
    let chk = prefixChk(prefix);
    if (typeof chk === "string") return chk;
    let words = [];
    for (let i = 0; i < wordChars.length; ++i) {
      let c = wordChars.charAt(i);
      let v = ALPHABET_MAP[c];
      if (v === undefined) {
        return null;
      }
      chk = polymodStep(chk) ^ v;
      // not in the checksum?
      if (i + 6 >= wordChars.length) continue;
      words.push(v);
    }
    if (chk !== ENCODING_CONST) {
      return "Invalid checksum for " + str;
    }
    return { prefix: prefix, words: words };
  }

  function decodeUnsafe(str, LIMIT) {
    let res = __decode(str, LIMIT);
    if (typeof res === "object") return res;
  }

  function decode(str) {
    let res = __decode(str);
    if (typeof res === "object") return res;

    throw new Error(res);
  }

  return {
    decodeUnsafe: decodeUnsafe,
    decode: decode,
    encode: encode,
    toWords: toWords,
    fromWordsUnsafe: fromWordsUnsafe,
    fromWords: fromWords,
  };
}

const bech32 = getLibraryFromEncoding("bech32");
const bech32m = getLibraryFromEncoding("bech32m");

function hex_char(val) {
  if (val < 10) return String.fromCharCode(48 + val);
  if (val < 16) return String.fromCharCode(97 + val - 10);
}

function hex_encode(buf) {
  let str = "";
  for (let i = 0; i < buf.length; i++) {
    const c = buf[i];
    str += hex_char(c >> 4);
    str += hex_char(c & 0xf);
  }
  return str;
}

const removeTrailingZeros = (str: string) => {
  if (str.slice(-2) === "00") {
    str = str.slice(0, -2);
  }

  return str;
};

const generateNostrHexPub = (npub: string) => {
  const decoded = bech32.decode(npub);

  if (!decoded || decoded == null || decoded == "null") {
    message.error("Invalid Nostr Npub");
    throw Error;
  }

  const bytes = fromWords(decoded.words);

  return removeTrailingZeros(hex_encode(bytes));
};

export default generateNostrHexPub;
