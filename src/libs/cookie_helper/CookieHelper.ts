import Cookies, { CookieGetOptions, CookieSetOptions } from "universal-cookie";
import CryptoJS from "crypto-js";

const cookies = new Cookies();
const cookieSetOptions: CookieSetOptions = {
  // secure: true,
  // httpOnly: false,
  // sameSite: "none",
};

const cookieGetOptions: CookieGetOptions = {
  // doNotParse: false,
};

class CookieHelper {
  public static GetCookie(name: string) {
    const cipherText = cookies.get<string>(name, cookieGetOptions);
    if (cipherText) {
      return CryptoJS.AES.decrypt(cipherText, 'gopikrishna!!!pwd').toString(CryptoJS.enc.Utf8);
    }
    return "";
  }

  public static SetCookie(name: string, value: string) {
    if (value) {
      const cipherText = CryptoJS.AES.encrypt(value, 'gopikrishna!!!pwd').toString();
      cookies.set(name, cipherText, cookieSetOptions);
    } else {
      cookies.set(name, "", cookieSetOptions);
    }
  }

  public static DeleteCookie(name: string) {
    cookies.remove(name, cookieSetOptions);
  }
}

export default CookieHelper;
