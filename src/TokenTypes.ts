export enum TokenType {
    UNKNOWN,
    PLUS
}

interface ITokenType {
    regex?: RegExp;
    type: TokenType;
}

const UNKNOWN = { type: TokenType.UNKNOWN };
const PLUS = { type: TokenType.PLUS, regex: /^\+/ };
export { UNKNOWN, PLUS };
