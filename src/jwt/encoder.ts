export default class Encoder {
  public base64UrlEncode = (toEncode: string): string => {
    // Buffer.from(str).toString('base64url') just creates a buffer
    // with the exact bytes used in the string str, and then converts it
    // to a string that displays those encoded bytes in base64url format.
    const base64Url: string = Buffer.from(toEncode).toString('base64url');
    return base64Url;
  };
}
