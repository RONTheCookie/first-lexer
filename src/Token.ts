import { TokenType } from "./TokenTypes";

class Token {
    public type: TokenType = TokenType.UNKNOWN;
    public start: number
    public end?: number
    public value: String;
    constructor(value: String, start: number, end?: number) {
        this.start = start;
        this.end = end;
        this.value = value;
    }
}
export default Token;
export { TokenType };
// module.exports = Token;
// module.exports.TokenType = TokenType;