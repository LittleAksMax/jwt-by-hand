import chalk from 'chalk';

class JwtToken {
  //   header: Uint8Array;
  //   payload: Uint8Array;
  //   signature: Uint8Array;
  header: string;
  payload: string;
  signature: string;

  constructor(header: string, payload: string, signature: string) {
    // const utf8Encoder = new TextEncoder();
    // this.headerBytes = utf8Encoder.encode(header);
    // this.payloadBytes = utf8Encoder.encode(payload);
    // this.signatureBytes = utf8Encoder.encode(signature);
    this.header = header;
    this.payload = payload;
    this.signature = signature;
  }

  toString = (coloured: boolean = true): string => {
    // empty wrapper so if not coloured then don't do anything
    // to the strings
    const emptyWrapper = (s: string) => s;
    const red = coloured ? chalk.red : () => emptyWrapper;
    const mag = coloured ? chalk.magenta : () => emptyWrapper;
    const blu = coloured ? chalk.blueBright : () => emptyWrapper;
    return `${red(this.header)}.${mag(this.payload)}.${blu(this.signature)}`;
  };
}

export default JwtToken;
