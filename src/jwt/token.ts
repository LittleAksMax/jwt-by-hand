import chalk from 'chalk';

class JwtToken {
  private _header: string;
  private _payload: string;
  private _signature: string;

  /* GETTERS for the header, payload and signature */
  public get header(): string {
    return this._header;
  }

  public get payload(): string {
    return this._payload;
  }

  public get signature(): string {
    return this._signature;
  }
  /* */

  constructor(header: string, payload: string, _signature: string) {
    this._header = header;
    this._payload = payload;
    this._signature = _signature;
  }

  toString = (coloured: boolean = true): string => {
    // empty wrapper so if not coloured then don't do anything
    // to the strings
    const emptyWrapper = (s: string) => s;
    const red = coloured ? chalk.red : () => emptyWrapper;
    const mag = coloured ? chalk.magenta : () => emptyWrapper;
    const blu = coloured ? chalk.blueBright : () => emptyWrapper;
    return `${red(this._header)}.${mag(this._payload)}.${blu(this._signature)}`;
  };
}

export default JwtToken;
