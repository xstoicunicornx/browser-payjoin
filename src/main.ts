import * as mod from '@xstoicunicornx/payjoin'

await mod.uniffiInitAsync()
const pdk = mod.default.payjoin

const BIP21_URI = 'bitcoin:bcrt1qw3qlhcn3e9u4kgntzrydys9nuyrk4ap0rum6xfljqu6uvtkdqvvq5raj3a?pjos=0&pj=HTTPS://PAYJO.IN/HRW48ZF2GK0UZ%23EX1HL4LQ6G-OH1QYPFLM8XL59R0XV4VGPLS7FRDSSM4TUXL07TXCWC4S0GLVLNK2SE4NQ-RK1Q22E0UV6GE8EYZKVEZK9TK8AGMDZ30WD4ACFA2K638KUPNJ669ZV7'
const psbtBase64 = 'cHNidP8BAIkCAAAAATkhRgFt+gT1Qp3KJ0XvKHjUoWXgP6lXJSOI7Fd2WSB+AAAAAAD9////AhAnAAAAAAAAIgAgdEH74nHJeVsiaxDI0kCz4Qdq9C8fN6Mn8gc1xi7NAxh+ywKVAAAAACJRINEdYEsxswlEY+rNlIoatFUhYM9RvSkueU6Rs/2lh47KAAAAAAABAIUCAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wQClwAA/v///wIA+QKVAAAAABYAFMLVfJITH3CRtxkXQH2rMrl/4u8SAAAAAAAAAAAmaiSqIant4vYcP3HR3v0/qZnfo2lTdVxpBol5mWK0i+vYNpdOjPmWAAAAAQEfAPkClQAAAAAWABTC1XySEx9wkbcZF0B9qzK5f+LvEgEIawJHMEQCIA3ud9tTIk/QdZVze69B699+wt6aAvJUl+iyB3bBrYfgAiA/On5hd+xkZHVjrSy3vw4VQQxdN3jDRox8HWl0WZd/9gEhA2nzqpQrVFyF1+Xn7sSztS5GKF6hYmeSieEZuhgs5v8lAAABBSAn+XUiTZhhnJbPOObnqnUboxSUnqN3tNoD4h99gb46oSEHJ/l1Ik2YYZyWzzjm56p1G6MUlJ6jd7TaA+IffYG+OqEZAI7xSWhWAACAAQAAgAAAAIABAAAAGQAAAAA='
const feeRateSatPerVb = BigInt(10)
const pjUri = pdk.Uri.parse(BIP21_URI).checkPjSupported()           // ✓
const builder = new pdk.SenderBuilder(psbtBase64, pjUri)            // ✓
const initial = builder.buildRecommended(feeRateSatPerVb)           // ✓

class MemSenderPersisterAsync {
  private events: string[] = [];
  async save(event: string) { this.events.push(event) }
  async load() { return this.events }
  async close() { }
}

const withReplyKey = await initial.saveAsync(new MemSenderPersisterAsync())
console.log(withReplyKey instanceof pdk.WithReplyKey)

// RuntimeError: memory access out of bounds
