/**
 * Developer - Saige#8157
 * Website: https://helper.solar
 * Github: https://github.com/Saigeie
 * 2022
*/


export function genString(length: number = 55) {
  let str = "";
  let chars =
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopassdfghjklzxcvbnm1234567890QWERtYuiOokNBfVBNmkUYtfgVBIASUDFGASFAFAFSEGERTYE634T34T34GSDRTEGBE";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
