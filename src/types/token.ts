export type Algorithm = 'HS256'; // only HS256 for now
export type TokenType = 'JWT'; // only JWT for now

export type Header = {
  typ: TokenType;
  alg: Algorithm;
};

export type Payload = {
  // below are (technically) not necessary fields but highly recommended
  sub: string; // subject of the token
  iss: string; // issuer of the token
  exp: number; // expiration time
  iat: number; // issued at
  aud: string; // audience
  jti: string; // JWT ID
  eml: string; // email of user
  roles: string[]; // list of roles of client
};
