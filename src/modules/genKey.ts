export default function (length: number = 35) {
    let chars = "QWERTYUIOPASDFGHJKLZXCVBNM..qwertyuiopasdfghjklzxcvbnm123578901234567890[[][[//..???,<><>,,...";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str;
}