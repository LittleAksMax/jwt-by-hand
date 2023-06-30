import chalk from 'chalk';

class JwtToken {
  header: string;
  payload: string;
  signature: string;

  constructor(header: string, payload: string, signature: string) {
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
