// untar.js "https://cdn.jsdelivr.net/npm/js-untar@2.0.0/build/dist/untar.min.js"
!function (e, r) { "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? module.exports = r() : e.untar = r() }(this, function () { "use strict"; function e(e) { function r(e) { for (var r = 0, n = t.length; r < n; ++r)t[r](e); a.push(e) } if ("function" != typeof Promise) throw new Error("Promise implementation not available in this environment."); var t = [], a = [], n = new Promise(function (t, a) { e(t, a, r) }); n.progress = function (e) { if ("function" != typeof e) throw new Error("cb is not a function."); for (var r = 0, i = a.length; r < i; ++r)e(a[r]); return t.push(e), n }; var i = n.then; return n.then = function (e, r, t) { return i.call(n, e, r), void 0 !== t && n.progress(t), n }, n } function r(r) { if (!(r instanceof ArrayBuffer)) throw new TypeError("arrayBuffer is not an instance of ArrayBuffer."); if (!n.Worker) throw new Error("Worker implementation is not available in this environment."); return new e(function (e, n, i) { var o = new Worker(a), s = []; o.onerror = function (e) { n(e) }, o.onmessage = function (r) { switch (r = r.data, r.type) { case "log": console[r.data.level]("Worker: " + r.data.msg); break; case "extract": var a = t(r.data); s.push(a), i(a); break; case "complete": o.terminate(), e(s); break; case "error": o.terminate(), n(new Error(r.data.message)); break; default: o.terminate(), n(new Error("Unknown message from worker: " + r.type)) } }, o.postMessage({ type: "extract", buffer: r }, [r]) }) } function t(e) { return Object.defineProperties(e, o), e } var a, n = window || this, i = n.URL || n.webkitURL, o = { blob: { get: function () { return this._blob || (this._blob = new Blob([this.buffer])) } }, getBlobUrl: { value: function () { return this._blobUrl || (this._blobUrl = i.createObjectURL(this.blob)) } }, readAsString: { value: function () { for (var e = this.buffer, r = e.byteLength, t = 1, a = new DataView(e), n = [], i = 0; i < r; ++i) { var o = a.getUint8(i * t, !0); n.push(o) } return this._string = String.fromCharCode.apply(null, n) } }, readAsJSON: { value: function () { return JSON.parse(this.readAsString()) } } }; return a = (window || this).URL.createObjectURL(new Blob(['"use strict";function UntarWorker(){}function decodeUTF8(e){for(var r="",t=0;t<e.length;){var a=e[t++];if(a>127){if(a>191&&a<224){if(t>=e.length)throw"UTF-8 decode: incomplete 2-byte sequence";a=(31&a)<<6|63&e[t]}else if(a>223&&a<240){if(t+1>=e.length)throw"UTF-8 decode: incomplete 3-byte sequence";a=(15&a)<<12|(63&e[t])<<6|63&e[++t]}else{if(!(a>239&&a<248))throw"UTF-8 decode: unknown multibyte start 0x"+a.toString(16)+" at index "+(t-1);if(t+2>=e.length)throw"UTF-8 decode: incomplete 4-byte sequence";a=(7&a)<<18|(63&e[t])<<12|(63&e[++t])<<6|63&e[++t]}++t}if(a<=65535)r+=String.fromCharCode(a);else{if(!(a<=1114111))throw"UTF-8 decode: code point 0x"+a.toString(16)+" exceeds UTF-16 reach";a-=65536,r+=String.fromCharCode(a>>10|55296),r+=String.fromCharCode(1023&a|56320)}}return r}function PaxHeader(e){this._fields=e}function TarFile(){}function UntarStream(e){this._bufferView=new DataView(e),this._position=0}function UntarFileStream(e){this._stream=new UntarStream(e),this._globalPaxHeader=null}if(UntarWorker.prototype={onmessage:function(e){try{if("extract"!==e.data.type)throw new Error("Unknown message type: "+e.data.type);this.untarBuffer(e.data.buffer)}catch(r){this.postError(r)}},postError:function(e){this.postMessage({type:"error",data:{message:e.message}})},postLog:function(e,r){this.postMessage({type:"log",data:{level:e,msg:r}})},untarBuffer:function(e){try{for(var r=new UntarFileStream(e);r.hasNext();){var t=r.next();this.postMessage({type:"extract",data:t},[t.buffer])}this.postMessage({type:"complete"})}catch(a){this.postError(a)}},postMessage:function(e,r){self.postMessage(e,r)}},"undefined"!=typeof self){var worker=new UntarWorker;self.onmessage=function(e){worker.onmessage(e)}}PaxHeader.parse=function(e){for(var r=new Uint8Array(e),t=[];r.length>0;){var a=parseInt(decodeUTF8(r.subarray(0,r.indexOf(32)))),n=decodeUTF8(r.subarray(0,a)),i=n.match(/^\\d+ ([^=]+)=(.*)\\n$/);if(null===i)throw new Error("Invalid PAX header data format.");var s=i[1],o=i[2];0===o.length?o=null:null!==o.match(/^\\d+$/)&&(o=parseInt(o));var f={name:s,value:o};t.push(f),r=r.subarray(a)}return new PaxHeader(t)},PaxHeader.prototype={applyHeader:function(e){this._fields.forEach(function(r){var t=r.name,a=r.value;"path"===t?(t="name",void 0!==e.prefix&&delete e.prefix):"linkpath"===t&&(t="linkname"),null===a?delete e[t]:e[t]=a})}},UntarStream.prototype={readString:function(e){for(var r=1,t=e*r,a=[],n=0;n<e;++n){var i=this._bufferView.getUint8(this.position()+n*r,!0);if(0===i)break;a.push(i)}return this.seek(t),String.fromCharCode.apply(null,a)},readBuffer:function(e){var r;if("function"==typeof ArrayBuffer.prototype.slice)r=this._bufferView.buffer.slice(this.position(),this.position()+e);else{r=new ArrayBuffer(e);var t=new Uint8Array(r),a=new Uint8Array(this._bufferView.buffer,this.position(),e);t.set(a)}return this.seek(e),r},seek:function(e){this._position+=e},peekUint32:function(){return this._bufferView.getUint32(this.position(),!0)},position:function(e){return void 0===e?this._position:void(this._position=e)},size:function(){return this._bufferView.byteLength}},UntarFileStream.prototype={hasNext:function(){return this._stream.position()+4<this._stream.size()&&0!==this._stream.peekUint32()},next:function(){return this._readNextFile()},_readNextFile:function(){var e=this._stream,r=new TarFile,t=!1,a=null,n=e.position(),i=n+512;switch(r.name=e.readString(100),r.mode=e.readString(8),r.uid=parseInt(e.readString(8)),r.gid=parseInt(e.readString(8)),r.size=parseInt(e.readString(12),8),r.mtime=parseInt(e.readString(12),8),r.checksum=parseInt(e.readString(8)),r.type=e.readString(1),r.linkname=e.readString(100),r.ustarFormat=e.readString(6),r.ustarFormat.indexOf("ustar")>-1&&(r.version=e.readString(2),r.uname=e.readString(32),r.gname=e.readString(32),r.devmajor=parseInt(e.readString(8)),r.devminor=parseInt(e.readString(8)),r.namePrefix=e.readString(155),r.namePrefix.length>0&&(r.name=r.namePrefix+"/"+r.name)),e.position(i),r.type){case"0":case"":r.buffer=e.readBuffer(r.size);break;case"1":break;case"2":break;case"3":break;case"4":break;case"5":break;case"6":break;case"7":break;case"g":t=!0,this._globalPaxHeader=PaxHeader.parse(e.readBuffer(r.size));break;case"x":t=!0,a=PaxHeader.parse(e.readBuffer(r.size))}void 0===r.buffer&&(r.buffer=new ArrayBuffer(0));var s=i+r.size;return r.size%512!==0&&(s+=512-r.size%512),e.position(s),t&&(r=this._readNextFile()),null!==this._globalPaxHeader&&this._globalPaxHeader.applyHeader(r),null!==a&&a.applyHeader(r),r}};'])), r });

// multi formats for getting v0 to v1 cid paths "https://unpkg.com/multiformats@13.2.2/dist/index.min.js"
(function (root, factory) { (typeof module === 'object' && module.exports) ? module.exports = factory() : root.Multiformats = factory() }(typeof self !== 'undefined' ? self : this, function () {
    "use strict"; var Multiformats = (() => { var R = Object.defineProperty; var he = Object.getOwnPropertyDescriptor; var pe = Object.getOwnPropertyNames; var ue = Object.prototype.hasOwnProperty; var N = (r, e) => { for (var t in e) R(r, t, { get: e[t], enumerable: !0 }) }, le = (r, e, t, n) => { if (e && typeof e == "object" || typeof e == "function") for (let o of pe(e)) !ue.call(r, o) && o !== t && R(r, o, { get: () => e[o], enumerable: !(n = he(e, o)) || n.enumerable }); return r }; var be = r => le(R({}, "__esModule", { value: !0 }), r); var Ze = {}; N(Ze, { CID: () => F, bytes: () => P, digest: () => T, hasher: () => _, varint: () => L }); var P = {}; N(P, { coerce: () => S, empty: () => ee, equals: () => J, fromHex: () => xe, fromString: () => me, isBinary: () => ge, toHex: () => we, toString: () => ye }); var ee = new Uint8Array(0); function we(r) { return r.reduce((e, t) => e + t.toString(16).padStart(2, "0"), "") } function xe(r) { let e = r.match(/../g); return e != null ? new Uint8Array(e.map(t => parseInt(t, 16))) : ee } function J(r, e) { if (r === e) return !0; if (r.byteLength !== e.byteLength) return !1; for (let t = 0; t < r.byteLength; t++)if (r[t] !== e[t]) return !1; return !0 } function S(r) { if (r instanceof Uint8Array && r.constructor.name === "Uint8Array") return r; if (r instanceof ArrayBuffer) return new Uint8Array(r); if (ArrayBuffer.isView(r)) return new Uint8Array(r.buffer, r.byteOffset, r.byteLength); throw new Error("Unknown type, must be binary type") } function ge(r) { return r instanceof ArrayBuffer || ArrayBuffer.isView(r) } function me(r) { return new TextEncoder().encode(r) } function ye(r) { return new TextDecoder().decode(r) } function ve(r, e) { if (r.length >= 255) throw new TypeError("Alphabet too long"); for (var t = new Uint8Array(256), n = 0; n < t.length; n++)t[n] = 255; for (var o = 0; o < r.length; o++) { var i = r.charAt(o), s = i.charCodeAt(0); if (t[s] !== 255) throw new TypeError(i + " is ambiguous"); t[s] = o } var c = r.length, d = r.charAt(0), U = Math.log(c) / Math.log(256), h = Math.log(256) / Math.log(c); function z(a) { if (a instanceof Uint8Array || (ArrayBuffer.isView(a) ? a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength) : Array.isArray(a) && (a = Uint8Array.from(a))), !(a instanceof Uint8Array)) throw new TypeError("Expected Uint8Array"); if (a.length === 0) return ""; for (var f = 0, E = 0, u = 0, b = a.length; u !== b && a[u] === 0;)u++, f++; for (var w = (b - u) * h + 1 >>> 0, p = new Uint8Array(w); u !== b;) { for (var x = a[u], v = 0, l = w - 1; (x !== 0 || v < E) && l !== -1; l--, v++)x += 256 * p[l] >>> 0, p[l] = x % c >>> 0, x = x / c >>> 0; if (x !== 0) throw new Error("Non-zero carry"); E = v, u++ } for (var m = w - E; m !== w && p[m] === 0;)m++; for (var k = d.repeat(f); m < w; ++m)k += r.charAt(p[m]); return k } function $(a) { if (typeof a != "string") throw new TypeError("Expected String"); if (a.length === 0) return new Uint8Array; var f = 0; if (a[f] !== " ") { for (var E = 0, u = 0; a[f] === d;)E++, f++; for (var b = (a.length - f) * U + 1 >>> 0, w = new Uint8Array(b); a[f];) { var p = t[a.charCodeAt(f)]; if (p === 255) return; for (var x = 0, v = b - 1; (p !== 0 || x < u) && v !== -1; v--, x++)p += c * w[v] >>> 0, w[v] = p % 256 >>> 0, p = p / 256 >>> 0; if (p !== 0) throw new Error("Non-zero carry"); u = x, f++ } if (a[f] !== " ") { for (var l = b - u; l !== b && w[l] === 0;)l++; for (var m = new Uint8Array(E + (b - l)), k = E; l !== b;)m[k++] = w[l++]; return m } } } function fe(a) { var f = $(a); if (f) return f; throw new Error(`Non-${e} character`) } return { encode: z, decodeUnsafe: $, decode: fe } } var Ee = ve, Se = Ee, te = Se; var j = class { name; prefix; baseEncode; constructor(e, t, n) { this.name = e, this.prefix = t, this.baseEncode = n } encode(e) { if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`; throw Error("Unknown type, must be binary type") } }, Q = class { name; prefix; baseDecode; prefixCodePoint; constructor(e, t, n) { if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character"); this.prefixCodePoint = t.codePointAt(0), this.baseDecode = n } decode(e) { if (typeof e == "string") { if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`); return this.baseDecode(e.slice(this.prefix.length)) } else throw Error("Can only multibase decode strings") } or(e) { return re(this, e) } }, G = class { decoders; constructor(e) { this.decoders = e } or(e) { return re(this, e) } decode(e) { let t = e[0], n = this.decoders[t]; if (n != null) return n.decode(e); throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`) } }; function re(r, e) { return new G({ ...r.decoders ?? { [r.prefix]: r }, ...e.decoders ?? { [e.prefix]: e } }) } var X = class { name; prefix; baseEncode; baseDecode; encoder; decoder; constructor(e, t, n, o) { this.name = e, this.prefix = t, this.baseEncode = n, this.baseDecode = o, this.encoder = new j(e, t, n), this.decoder = new Q(e, t, o) } encode(e) { return this.encoder.encode(e) } decode(e) { return this.decoder.decode(e) } }; function ne({ name: r, prefix: e, encode: t, decode: n }) { return new X(r, e, t, n) } function K({ name: r, prefix: e, alphabet: t }) { let { encode: n, decode: o } = te(t, r); return ne({ prefix: e, name: r, encode: n, decode: i => S(o(i)) }) } function Ae(r, e, t, n) { let o = {}; for (let h = 0; h < e.length; ++h)o[e[h]] = h; let i = r.length; for (; r[i - 1] === "=";)--i; let s = new Uint8Array(i * t / 8 | 0), c = 0, d = 0, U = 0; for (let h = 0; h < i; ++h) { let z = o[r[h]]; if (z === void 0) throw new SyntaxError(`Non-${n} character`); d = d << t | z, c += t, c >= 8 && (c -= 8, s[U++] = 255 & d >> c) } if (c >= t || 255 & d << 8 - c) throw new SyntaxError("Unexpected end of data"); return s } function Ce(r, e, t) { let n = e[e.length - 1] === "=", o = (1 << t) - 1, i = "", s = 0, c = 0; for (let d = 0; d < r.length; ++d)for (c = c << 8 | r[d], s += 8; s > t;)s -= t, i += e[o & c >> s]; if (s !== 0 && (i += e[o & c << t - s]), n) for (; i.length * t & 7;)i += "="; return i } function g({ name: r, prefix: e, bitsPerChar: t, alphabet: n }) { return ne({ prefix: e, name: r, encode(o) { return Ce(o, n, t) }, decode(o) { return Ae(o, n, t, r) } }) } var O = g({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), nt = g({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), ot = g({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), it = g({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), st = g({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), at = g({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), ct = g({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), dt = g({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), ft = g({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 }); var y = K({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), ut = K({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" }); var T = {}; N(T, { Digest: () => D, create: () => M, decode: () => Z, equals: () => Y }); var L = {}; N(L, { decode: () => I, encodeTo: () => A, encodingLength: () => C }); var De = se, oe = 128, Ue = 127, ze = ~Ue, Ie = Math.pow(2, 31); function se(r, e, t) { e = e || [], t = t || 0; for (var n = t; r >= Ie;)e[t++] = r & 255 | oe, r /= 128; for (; r & ze;)e[t++] = r & 255 | oe, r >>>= 7; return e[t] = r | 0, se.bytes = t - n + 1, e } var Me = W, Ne = 128, ie = 127; function W(r, n) { var t = 0, n = n || 0, o = 0, i = n, s, c = r.length; do { if (i >= c) throw W.bytes = 0, new RangeError("Could not decode varint"); s = r[i++], t += o < 28 ? (s & ie) << o : (s & ie) * Math.pow(2, o), o += 7 } while (s >= Ne); return W.bytes = i - n, t } var Oe = Math.pow(2, 7), Ve = Math.pow(2, 14), Le = Math.pow(2, 21), Te = Math.pow(2, 28), Be = Math.pow(2, 35), $e = Math.pow(2, 42), ke = Math.pow(2, 49), Fe = Math.pow(2, 56), qe = Math.pow(2, 63), Re = function (r) { return r < Oe ? 1 : r < Ve ? 2 : r < Le ? 3 : r < Te ? 4 : r < Be ? 5 : r < $e ? 6 : r < ke ? 7 : r < Fe ? 8 : r < qe ? 9 : 10 }, Je = { encode: De, decode: Me, encodingLength: Re }, Pe = Je, V = Pe; function I(r, e = 0) { return [V.decode(r, e), V.decode.bytes] } function A(r, e, t = 0) { return V.encode(r, e, t), e } function C(r) { return V.encodingLength(r) } function M(r, e) { let t = e.byteLength, n = C(r), o = n + C(t), i = new Uint8Array(o + t); return A(r, i, 0), A(t, i, n), i.set(e, o), new D(r, t, e, i) } function Z(r) { let e = S(r), [t, n] = I(e), [o, i] = I(e.subarray(n)), s = e.subarray(n + i); if (s.byteLength !== o) throw new Error("Incorrect length"); return new D(t, o, s, e) } function Y(r, e) { if (r === e) return !0; { let t = e; return r.code === t.code && r.size === t.size && t.bytes instanceof Uint8Array && J(r.bytes, t.bytes) } } var D = class { code; size; digest; bytes; constructor(e, t, n, o) { this.code = e, this.size = t, this.digest = n, this.bytes = o } }; function ae(r, e) { let { bytes: t, version: n } = r; switch (n) { case 0: return Qe(t, H(r), e ?? y.encoder); default: return Ge(t, H(r), e ?? O.encoder) } } var ce = new WeakMap; function H(r) { let e = ce.get(r); if (e == null) { let t = new Map; return ce.set(r, t), t } return e } var F = class r { code; version; multihash; bytes; "/"; constructor(e, t, n, o) { this.code = t, this.version = e, this.multihash = n, this.bytes = o, this["/"] = o } get asCID() { return this } get byteOffset() { return this.bytes.byteOffset } get byteLength() { return this.bytes.byteLength } toV0() { switch (this.version) { case 0: return this; case 1: { let { code: e, multihash: t } = this; if (e !== B) throw new Error("Cannot convert a non dag-pb CID to CIDv0"); if (t.code !== Xe) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0"); return r.createV0(t) } default: throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`) } } toV1() { switch (this.version) { case 0: { let { code: e, digest: t } = this.multihash, n = M(e, t); return r.createV1(this.code, n) } case 1: return this; default: throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`) } } equals(e) { return r.equals(this, e) } static equals(e, t) { let n = t; return n != null && e.code === n.code && e.version === n.version && Y(e.multihash, n.multihash) } toString(e) { return ae(this, e) } toJSON() { return { "/": ae(this) } } link() { return this } [Symbol.toStringTag] = "CID";[Symbol.for("nodejs.util.inspect.custom")]() { return `CID(${this.toString()})` } static asCID(e) { if (e == null) return null; let t = e; if (t instanceof r) return t; if (t["/"] != null && t["/"] === t.bytes || t.asCID === t) { let { version: n, code: o, multihash: i, bytes: s } = t; return new r(n, o, i, s ?? de(n, o, i.bytes)) } else if (t[Ke] === !0) { let { version: n, multihash: o, code: i } = t, s = Z(o); return r.create(n, i, s) } else return null } static create(e, t, n) { if (typeof t != "number") throw new Error("String codecs are no longer supported"); if (!(n.bytes instanceof Uint8Array)) throw new Error("Invalid digest"); switch (e) { case 0: { if (t !== B) throw new Error(`Version 0 CID must use dag-pb (code: ${B}) block encoding`); return new r(e, t, n, n.bytes) } case 1: { let o = de(e, t, n.bytes); return new r(e, t, n, o) } default: throw new Error("Invalid version") } } static createV0(e) { return r.create(0, B, e) } static createV1(e, t) { return r.create(1, e, t) } static decode(e) { let [t, n] = r.decodeFirst(e); if (n.length !== 0) throw new Error("Incorrect length"); return t } static decodeFirst(e) { let t = r.inspectBytes(e), n = t.size - t.multihashSize, o = S(e.subarray(n, n + t.multihashSize)); if (o.byteLength !== t.multihashSize) throw new Error("Incorrect length"); let i = o.subarray(t.multihashSize - t.digestSize), s = new D(t.multihashCode, t.digestSize, i, o); return [t.version === 0 ? r.createV0(s) : r.createV1(t.codec, s), e.subarray(t.size)] } static inspectBytes(e) { let t = 0, n = () => { let [z, $] = I(e.subarray(t)); return t += $, z }, o = n(), i = B; if (o === 18 ? (o = 0, t = 0) : i = n(), o !== 0 && o !== 1) throw new RangeError(`Invalid CID version ${o}`); let s = t, c = n(), d = n(), U = t + d, h = U - s; return { version: o, codec: i, multihashCode: c, digestSize: d, multihashSize: h, size: U } } static parse(e, t) { let [n, o] = je(e, t), i = r.decode(o); if (i.version === 0 && e[0] !== "Q") throw Error("Version 0 CID string must not include multibase prefix"); return H(i).set(n, e), i } }; function je(r, e) { switch (r[0]) { case "Q": { let t = e ?? y; return [y.prefix, t.decode(`${y.prefix}${r}`)] } case y.prefix: { let t = e ?? y; return [y.prefix, t.decode(r)] } case O.prefix: { let t = e ?? O; return [O.prefix, t.decode(r)] } default: { if (e == null) throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided"); return [r[0], e.decode(r)] } } } function Qe(r, e, t) { let { prefix: n } = t; if (n !== y.prefix) throw Error(`Cannot string encode V0 in ${t.name} encoding`); let o = e.get(n); if (o == null) { let i = t.encode(r).slice(1); return e.set(n, i), i } else return o } function Ge(r, e, t) { let { prefix: n } = t, o = e.get(n); if (o == null) { let i = t.encode(r); return e.set(n, i), i } else return o } var B = 112, Xe = 18; function de(r, e, t) { let n = C(r), o = n + C(e), i = new Uint8Array(o + t.byteLength); return A(r, i, 0), A(e, i, n), i.set(t, o), i } var Ke = Symbol.for("@ipld/js-cid/CID"); var _ = {}; N(_, { Hasher: () => q, from: () => We }); function We({ name: r, code: e, encode: t }) { return new q(r, e, t) } var q = class { name; code; encode; constructor(e, t, n) { this.name = e, this.code = t, this.encode = n } digest(e) { if (e instanceof Uint8Array) { let t = this.encode(e); return t instanceof Uint8Array ? M(this.code, t) : t.then(n => M(this.code, n)) } else throw Error("Unknown type, must be binary type") } }; return be(Ze); })();
    return Multiformats
}));

let serviceWorkerRegistered = false;


async function isServiceWorkerRegistered() {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return registrations.length > 0;
}

async function unregisterServiceWorkers() {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
        console.log('Unregistering Service Worker:', registration);
        await registration.unregister();
    }
}

async function registerServiceWorker(tarCID) {
    if (await isServiceWorkerRegistered()) {
        console.log('Service Worker is already registered.');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered successfully:', registration);
    } catch (error) {
        console.error('Service Worker registration failed:', error);
    }

    // Get the current URL
    const currentUrl = window.location.href;

    let serviceWorkerUrl;

    // Check if the URL contains "ipfs.localhost"
    if (currentUrl.includes("ipfs.localhost")) {
        serviceWorkerUrl = "service-worker.js";
    }
    // Check if the URL contains "/ipfs/"
    else if (currentUrl.includes("/ipfs/")) {
        const cid = extractCID(currentUrl);
        if (cid) {
            // Get everything up to and including "/ipfs/"
            const baseUrl = currentUrl.split("/ipfs/")[0] + "/ipfs/";
            // Construct the service worker URL
            serviceWorkerUrl = `${baseUrl}${cid}/service-worker.js`;
            console.log(serviceWorkerUrl);
        } else {
            console.error('Could not extract CID from the URL.');
            return;
        }
    }
    // Fallback to local service worker
    else {
        serviceWorkerUrl = "./service-worker.js";
    }

    // Attempt to register the service worker
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
            console.log('Service Worker registered:', registration);

            // Set the flag to true
            serviceWorkerRegistered = true;

            // Wait for the service worker to activate and control the page
            await waitForServiceWorkerActivation();
            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    } else {
        console.error('Service Workers are not supported in this browser.');
    }
}

function extractCID(url) {
    const ipfsPattern = /ipfs\/([^\/\?\#\.\:\;\&]*)/i; // Regex to capture CID after "ipfs/"
    const nonIpfsPattern = /https?:\/\/([^\/\?\#\.\:\;\&]*)/i; // Regex to capture CID after "http://" or "https://"

    let cid = '';

    // Check if the URL contains "ipfs/"
    if (ipfsPattern.test(url)) {
        cid = url.match(ipfsPattern)[1]; // Extract the CID
    } else if (nonIpfsPattern.test(url)) { // Handle scenario without "ipfs/"
        cid = url.match(nonIpfsPattern)[1]; // Extract the CID
    }

    return cid;
}


let controllerChangeListenerAdded = false;

async function waitForServiceWorkerActivation() {
    if (navigator.serviceWorker.controller) {
        console.log('Service Worker is already controlling the page.');
        return;
    }

    console.log('Waiting for Service Worker to activate...');

    return new Promise(resolve => {
        if (!controllerChangeListenerAdded) {
            navigator.serviceWorker.addEventListener('controllerchange', function onControllerChange() {
                console.log('Service Worker is now controlling the page.');
                navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                resolve();
            });
            controllerChangeListenerAdded = true;
        } else {
            // If the listener was already added, check if the service worker has been activated
            resolve();
        }
    });
}


window.magicWasmInit = async function (userConfig) {
    const config = {
        tarCID: '',
        jsScriptsArray: [],
        cssArray: [],
        rootSelector: 'app',
        ...userConfig
    };

    showLoader();

    // Register the Service Worker and ensure it's active
    await registerServiceWorker();
    console.log('Service Worker is active. Setting up the virtual file system...');

    var cacheIsEmpty = await checkVirtualFileSystem();
    console.log(cacheIsEmpty);
    if (cacheIsEmpty === true) {
        // Wait for the service worker to activate and set up the virtual file system
        const tarFileUrls = getIpfsUrls(config.tarCID);

        let files = null;
        for (const url of tarFileUrls) {
            try {
                const byteArray = await loadBase64Script(url);
                files = await processByteArray(byteArray);
                if (files !== null) {
                    console.log('tar file found');
                    break;
                } else {
                    throw new Error(`Failed to fetch tar file from URL: ${url}`);
                }
            } catch (error) {
                console.error(`Error fetching from URL ${url}:`, error);
            }
        }

        if (!files) {
            console.error('Failed to fetch tar file from all provided URLs.');
            return;
        }

        const brotli = await loadBrotliWasm();
        var virtualFileSystem = {};
        for (const file of files) {
            if (hasBrotliExtension(file.name) == true) {
                //await decompressBrotliBuffer(file.buffer);
                virtualFileSystem[removeBrotliExtension(file.name)] = await decompressBrotliBuffer(file.buffer);
                console.log(`Decompressed: ${file.name}...`);
            }
            else {
                virtualFileSystem[file.name] = file.buffer;
            }

            console.log(`Added ${file.name} to virtual file system`);
        };




        // Set the virtual file system in the service worker
        await setVirtualFileSystemInServiceWorker(virtualFileSystem);

    }

    console.log('Virtual file system set in Service Worker.');

    // Proceed to load resources after the virtual file system is set
    await loadResources(config.jsScriptsArray, config.cssArray);
    hideLoader();
};


let isListenerAdded = false;

async function checkVirtualFileSystem() {
    return new Promise(async (resolve, reject) => {
        if (navigator.serviceWorker.controller) {
            // Add the message listener only if it hasn't been added already
            if (!isListenerAdded) {
                function onMessage(event) {
                    if (event.data.type === 'VIRTUAL_FS_STATUS') {
                        console.log('Virtual file system status:', event.data.isEmpty ? 'Empty' : 'Not empty');
                        // Resolve the promise with the status
                        resolve(event.data.isEmpty);
                        // Clean up: Remove the listener
                        navigator.serviceWorker.removeEventListener('message', onMessage);
                    }
                }

                // Add the message listener
                navigator.serviceWorker.addEventListener('message', onMessage);
                isListenerAdded = true;
            }

            // Send the message to the service worker
            navigator.serviceWorker.controller.postMessage({ type: 'CHECK_VIRTUAL_FS' });

        } else {
            console.error('No Service Worker controller found.');

            try {

                
                // Clear all caches, cookies, localStorage, and sessionStorage
                clearData();

                // Delay the reload by 5 seconds (5000 milliseconds)
                setTimeout(() => {
                    window.location.reload(true); // or just window.location.reload();
                }, 5000);

            } catch (error) {
                console.error('Error during cleanup:', error);
                reject('Cleanup failed');
            }
        }
    });
}


function clearData() {

    console.log('Starting full data wipe.');

    // Unregister Service Workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            const unregisterPromises = registrations.map(function (registration) {
                console.log('Unregistering Service Worker:', registration);
                return registration.unregister();
            });

            // Wait for all service workers to be unregistered
            Promise.all(unregisterPromises).then(() => {
                console.log('All Service Workers unregistered.');

                // Now proceed with the rest of the data clearing
                clearAllData();
            }).catch((error) => {
                console.error('Error during Service Worker unregistration:', error);
            });
        });
    } else {
        // If there are no service workers, proceed with clearing all data
        clearAllData();
    }
}

function clearAllData() {
    // Clear cache
    if ('caches' in window) {
        caches.keys().then(function (cacheNames) {
            cacheNames.forEach(function (name) {
                console.log('Cache Deleted:', name);
                caches.delete(name);
            });
        });
    }

    // Clear cookies
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        console.log('Deleting Cookie');
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }

    console.log('Local storage cleared');
    // Clear localStorage
    localStorage.clear();

    console.log('Session storage cleared');
    // Clear sessionStorage
    sessionStorage.clear();

    // Clear IndexedDB
    if (window.indexedDB) {
        let databases = indexedDB.databases ? indexedDB.databases() : Promise.resolve([]);
        databases.then(dbs => {
            dbs.forEach(db => {
                console.log('Deleting IndexedDB:', db.name);
                indexedDB.deleteDatabase(db.name);
            });
        });
    }
}


function clearData() {
    console.log('Starting full data wipe.');

    // Clear cache
    if ('caches' in window) {
        caches.keys().then(function (cacheNames) {
            cacheNames.forEach(function (name) {
                console.log('Cache Deleted: ' + name.toString());
                caches.delete(name);
            });
        });
    }

    // Clear cookies
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        console.log('Deleting Cookie');
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }

    console.log('Local storage cleared');
    // Clear localStorage
    localStorage.clear();

    console.log('Session storage cleared');
    // Clear sessionStorage
    sessionStorage.clear();
}

function onMessage(event) {
    if (event.data.type === 'VIRTUAL_FS_STATUS') {
        if (checkVirtualFileSystemResolve) {
            checkVirtualFileSystemResolve(event.data.isEmpty);
            console.log('HERE');
            checkVirtualFileSystemResolve = null;
        }
    }
}

function showLoader() {

    var cid = extractCID(window.location.href);
    var isWeb3Domain = 0;
    if (!window.location.href.includes("/ipfs/")) {
        // Get the current URL
        let currentUrl = window.location.href;

        // URL encode the current URL
        cid = encodeURIComponent(currentUrl);
        isWeb3Domain = 1;
    }
    var redirectLink = `https://ipfs.io/ipfs/QmV2tuTPpgYug1wdqg1KhSkPMe67Bnm7gA9ngbUbAWtcgh?redirectURL=${cid}&autoadapt=1&requiresorigin=0&web3domain=${isWeb3Domain}`;

    // Create a container for the loader
    let loaderContainer = document.createElement('div');
    loaderContainer.id = 'fullPageLoader';
    loaderContainer.style.position = 'fixed';
    loaderContainer.style.top = '0';
    loaderContainer.style.left = '0';
    loaderContainer.style.width = '100%';
    loaderContainer.style.height = '100%';
    loaderContainer.style.backgroundColor = 'white';
    loaderContainer.style.zIndex = '9999'; // High z-index to cover everything
    loaderContainer.style.display = 'flex';
    loaderContainer.style.justifyContent = 'center';
    loaderContainer.style.alignItems = 'center';
    loaderContainer.style.flexDirection = 'column';

    // Create the loader spinner
    let loader = document.createElement('div');
    loader.style.border = '16px solid #f3f3f3';
    loader.style.borderTop = '16px solid #3498db';
    loader.style.borderRadius = '50%';
    loader.style.width = '150px';
    loader.style.height = '150px';
    loader.style.animation = 'spin 2s linear infinite';

    // Create the loader text
    let loaderText = document.createElement('div');
    loaderText.textContent = 'Loading...';
    loaderText.style.fontSize = '36px';
    loaderText.style.fontFamily = 'Arial, sans-serif';
    loaderText.style.color = '#3498db';
    loaderText.style.marginTop = '20px';

    // Create the additional text
    let additionalText = document.createElement('div');
    additionalText.textContent = 'Taking a long time to load?';
    additionalText.style.fontSize = '15px';
    additionalText.style.fontFamily = 'Arial, sans-serif';
    additionalText.style.color = 'black';
    additionalText.style.marginTop = '10px';

    // Create the clickable link
    let redirectLinkElement = document.createElement('a');
    redirectLinkElement.href = redirectLink;
    redirectLinkElement.textContent = 'Click Here To Load Faster!';
    redirectLinkElement.style.fontSize = '15px';
    redirectLinkElement.style.fontFamily = 'Arial, sans-serif';
    redirectLinkElement.style.color = '#3498db';
    redirectLinkElement.style.marginTop = '5px';
    redirectLinkElement.style.textDecoration = 'underline';
    redirectLinkElement.style.cursor = 'pointer';

    // Append the loader, text, additional text, and link to the container
    loaderContainer.appendChild(loader);
    loaderContainer.appendChild(loaderText);
    loaderContainer.appendChild(additionalText);
    loaderContainer.appendChild(redirectLinkElement);

    // Append the container to the body
    document.body.appendChild(loaderContainer);

    // Add the keyframes for the spin animation
    let styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Function to remove the loader
function hideLoader() {
    let loaderContainer = document.getElementById('fullPageLoader');
    if (loaderContainer) {
        loaderContainer.remove();
    }
}

function hasBrotliExtension(filePath) {
    // Ensure filePath is a string and handle null/undefined input
    if (typeof filePath !== 'string' || !filePath) {
        return false;
    }

    // Trim any whitespace from the input
    const trimmedPath = filePath.trim();

    // Check if the file path ends with ".br"
    return trimmedPath.toLowerCase().endsWith('.br');
}

function removeBrotliExtension(filePath) {
    // Use the hasBrotliExtension function to check for the ".br" extension
    if (hasBrotliExtension(filePath)) {
        // Remove the ".br" extension by slicing it off
        return filePath.slice(0, -3); // Remove the last 3 characters (".br")
    }

    // If the ".br" extension is not found, return the original file path
    return filePath;
}

async function setVirtualFileSystemInServiceWorker(virtualFileSystem) {
    if (navigator.serviceWorker.controller) {
        var brotli = await loadBrotliWasm();

        return new Promise(resolve => {
            navigator.serviceWorker.controller.postMessage({
                type: 'SET_VIRTUAL_FS',
                virtualFileSystem: virtualFileSystem
            });

            // Listen for acknowledgment from the service worker
            navigator.serviceWorker.addEventListener('message', function onMessage(event) {
                if (event.data.type === 'VIRTUAL_FS_SET') {
                    console.log('Received confirmation that virtual file system is set.');
                    navigator.serviceWorker.removeEventListener('message', onMessage);
                    resolve();
                }
            });

        });
    } else {
        console.error('No Service Worker controller found to set virtual file system.');
    }
}


async function loadResources(jsScriptsArray, cssArray) {
    const currentURL = window.location.href.endsWith('/') ? window.location.href : `${window.location.href}/`;

    for (const linkPath of cssArray) {
        console.log(`Loading CSS: ${linkPath}`);
        const virtualPath = linkPath.startsWith('virtual://') ? linkPath.replace('virtual://', './') : linkPath;

        try {
            const cssResponse = await fetch(virtualPath);  // Triggers the service worker to handle the request
            if (!cssResponse.ok) {
                console.error(`Failed to load CSS: ${linkPath}`);
                continue;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = linkPath.startsWith('virtual://') ? `${currentURL}${virtualPath}` : linkPath;
            document.head.appendChild(link);
            console.log(`Finished loading CSS: ${linkPath}`);
        } catch (error) {
            console.error(`Error loading CSS ${linkPath}:`, error);
        }
    }

    for (const scriptPath of jsScriptsArray) {
        console.log(`Loading JS: ${scriptPath}`);
        const virtualPath = scriptPath.startsWith('virtual://') ? scriptPath.replace('virtual://', './') : scriptPath;

        try {
            const jsResponse = await fetch(virtualPath);  // Triggers the service worker to handle the request
            if (!jsResponse.ok) {
                console.error(`Failed to load JS: ${scriptPath}`);
                continue;
            }

            const jsText = await jsResponse.text();

            const script = document.createElement('script');
            script.textContent = jsText; // Execute JS inline rather than referencing the URL
            document.body.appendChild(script);

            console.log(`Finished loading JS: ${scriptPath}`);
        } catch (error) {
            console.error(`Error loading JS ${scriptPath}:`, error);
        }
    }

    console.log('All resources loaded.');
}

function cleanupComponents(selector = 'app') {
    console.log(`Starting cleanup for components with selector: ${selector}`);

    try {
        const rootElement = document.querySelector(`#${selector}`);
        if (rootElement) {
            console.log(`Root element found:`, rootElement);

            // Vue.js cleanup
            try {
                if (typeof window.$destroy === 'function') {
                    console.log('Vue.js detected. Performing cleanup...');
                    window.$destroy();
                    console.log('Vue.js cleanup completed.');
                }
            } catch (error) {
                console.error('Error during Vue.js cleanup:', error);
            }

            // Angular cleanup
            try {
                if (typeof window.ngDestroy === 'function') {
                    console.log('Angular detected. Performing cleanup...');
                    window.ngDestroy();
                    console.log('Angular cleanup completed.');
                }
            } catch (error) {
                console.error('Error during Angular cleanup:', error);
            }

            // React cleanup
            try {
                if (typeof window.ReactDOM === 'object' && typeof window.ReactDOM.unmountComponentAtNode === 'function') {
                    console.log('React detected. Performing cleanup...');
                    window.ReactDOM.unmountComponentAtNode(rootElement);
                    console.log('React cleanup completed.');
                }
            } catch (error) {
                console.error('Error during React cleanup:', error);
            }

            // Blazor cleanup
            try {
                if (typeof window.Blazor === 'object' && typeof window.Blazor.dispose === 'function') {
                    console.log('Blazor detected. Performing cleanup...');
                    window.Blazor.dispose();
                    console.log('Blazor cleanup completed.');
                }
            } catch (error) {
                console.error('Error during Blazor cleanup:', error);
            }

            // Fallback cleanup
            try {
                console.log('Performing fallback cleanup...');
                rootElement.innerHTML = ''; // Remove all content
                console.log('Fallback cleanup completed.');
            } catch (error) {
                console.error('Error during fallback cleanup:', error);
            }
        } else {
            console.warn('Root element not found with selector:', selector);
        }
    } catch (error) {
        console.error('An error occurred during component cleanup:', error);
    }

    console.log('Component cleanup process finished.');
}

const scriptId = 'temporary_base_64_file_text';

function loadBase64Script(url) {
    return new Promise((resolve, reject) => {
        const scriptId = 'base64Script';

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            console.log('Existing Base64 script found. Cleaning up...');
            existingScript.remove();
        }

        console.log('Attempting to fetch the Base64 encoded file from: ', url);

        // Set a timeout for the fetch request to avoid hanging indefinitely
        const fetchTimeout = setTimeout(() => {
            reject(new Error('Fetch request timed out'));
        }, 15000); // 15 seconds timeout

        fetch(url)
            .then(response => {
                clearTimeout(fetchTimeout); // Clear the timeout if the fetch succeeds
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(scriptContent => {
                console.log('Base64 content successfully retrieved:', scriptContent.slice(0, 50) + '...');

                const binaryData = atob(scriptContent);
                const len = binaryData.length;
                const byteArray = new Uint8Array(len);

                console.log('Decoding the Base64 content into a Uint8Array...');

                for (let i = 0; i < len; i++) {
                    byteArray[i] = binaryData.charCodeAt(i);
                }

                console.log('Decoded Uint8Array:', byteArray);

                resolve(byteArray);

                // Cleanup script element after processing
                const script = document.getElementById(scriptId);
                if (script) {
                    console.log('Cleaning up the script element after processing...');
                    script.remove();
                }
            })
            .catch(error => {
                clearTimeout(fetchTimeout); // Clear the timeout if an error occurs
                console.error('Failed to fetch or process the Base64 file:', error);
                reject(error);
            });
    });
}

var brotliInstance = null;
async function loadBrotliWasm() {
    if (brotliInstance === null) {
        console.log('Brolti importing');
        brotliInstance = await import("https://unpkg.com/brotli-wasm@3.0.1/index.web.js?module").then(m => m.default);
        return brotliInstance;
    }
    else {
        console.log('Brolti referencing import');
        return brotliInstance;
    }
}

async function decompressBrotliBuffer(compressedBuffer) {
    // Convert Buffer to Uint8Array if necessary
    const byteArray = compressedBuffer instanceof Uint8Array ? compressedBuffer : new Uint8Array(compressedBuffer);

    try {
        const decompressedBuffer = await decompressBrotli(byteArray);
        return decompressedBuffer;
    } catch (error) {
        console.error("Failed to decompress the buffer:", error);
        throw error;
    }
}

async function decompressBrotli(byteArray) {
    const brotli = await loadBrotliWasm();

    return new Promise((resolve, reject) => {
        try {
            const decompressedData = brotli.decompress(byteArray);
            resolve(decompressedData);
        } catch (error) {
            reject(error);
        }
    });
}

async function processByteArray(byteArray) {
    console.log('Processing the byteArray...');

    console.log('First 10 bytes of the file:', byteArray.slice(0, 10));

    try {
        const decompressedData = await decompressBrotli(byteArray);

        console.log("Decompressed Data:", decompressedData);

        const tarBuffer = decompressedData.buffer;

        const files = await untar(tarBuffer);

        return files;

    } catch (error) {
        console.error('Error during processing:', error);
    }

    return null;
}

function convertV0ToV1(cidv0) {
    try {
        var CID = window.Multiformats.CID;

        var cid = CID.parse(cidv0);
        console.log('CID parsed:');
        console.log(cid);

        if (cid.version === 1) {
            console.log('CID is already v1');
            return cid.toString();
        }

        var cidv1 = cid.toV1();
        console.log('Converted to CIDv1:');
        console.log(cidv1);

        return cidv1.toString();
    } catch (error) {
        console.error('Error converting CID:', error);
        throw new Error('Invalid CIDv0');
    }
}

function getIpfsUrls(cidv0) {
    var currentUrl = window.location.href.toLowerCase();

    var urlArray = [];

    if (cidv0.startsWith('./') || cidv0.startsWith('/') || cidv0.startsWith('http://') || cidv0.startsWith('https://')) {
        urlArray = urlArray.concat(cidv0);
        console.log('Using local script');
        return urlArray;
    }

    if (currentUrl.includes("ipfs.localhost")) {
        urlArray = urlArray.concat(getLocalIpfsUrls(currentUrl, cidv0));
        urlArray = urlArray.concat(getPublicGatewayUrls(cidv0));
    } else {
        urlArray = urlArray.concat(getPublicGatewayUrls(cidv0));
        urlArray = urlArray.concat(getLocalIpfsUrls(currentUrl, cidv0));
    }

    for (const url of urlArray) {
        console.log(`CID URLs: ${url}`);
    }
    urlArray = urlArray.filter(url => url !== undefined);
    return urlArray;
}

function getPublicGatewayUrls(cidv0) {
    var urlArray = [];
    urlArray.push(`https://ipfs.io/ipfs/${cidv0}`);
    urlArray.push(`https://dweb.link/ipfs/${cidv0}`);
    urlArray.push(`https://w3s.link/ipfs/${cidv0}`);
    return urlArray;
}

function getLocalIpfsUrls(localUrl, cidv0) {
    var urlArray = [];
    var currentUrl = window.location.href.toLowerCase();
    if (currentUrl.includes("ipfs.localhost")) {
        var startIndex = currentUrl.indexOf(".ipfs.localhost");

        var portStartIndex = currentUrl.indexOf(":", startIndex) + 1;

        var portEndIndex = portStartIndex;
        while (portEndIndex < currentUrl.length && !isNaN(parseInt(currentUrl[portEndIndex], 10))) {
            portEndIndex++;
        }

        var ipfsPart = currentUrl.substring(startIndex, portEndIndex);
        var v1Url = convertV0ToV1(cidv0);

        urlArray.push(`http://${v1Url}${ipfsPart}`);
    }
    urlArray.push(`https://webui.ipfs.io/ipfs/${cidv0}`);
    return urlArray;
}
