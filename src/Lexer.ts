/*
notes to future ron:
need to make array of tokens
function gets next tokaen and type is initally unknown
we discover type
change it 
push into the tokens array
*/
// import Token from "./Token";
import { WHITESPACES } from "./Constants";
import Token from "./Token";
import { PLUS, TokenType } from "./TokenTypes";

class Lexer {
    private data: string;
    private index: number = 0;
    private tokens: Token[] = [];
    constructor(data: string) {
        this.data = data;
    }
    public process(): Token[] {
        while (this.index <= this.data.length - 1) {
            this.findNextToken();
        }
        return this.tokens;
    }
    private get currentChar(): string {
        return this.data[this.index];
    }
    /* Skip chars
    Returns false if we ran out of chars
    */
    private skip(x: number = 1): boolean {
        if (this.index + x> this.data.length) return false;
        this.index += x;
        return true;
    }
    private skipWhitespace() {
        while (WHITESPACES.includes(this.currentChar)) {
            this.skip();
        }
    }
    private findNextToken() {
        // space between tokens
        this.skipWhitespace();

        const token = new Token(this.currentChar, this.index); // type UNKNOWN
        
        this.matchExp(PLUS.regex, this.data.substring(this.index))
            // token.type = TokenType.PLUS;
        // }
        

        this.tokens.push(token);
    }
    private matchExp(regex: RegExp, data: string) {
        const res = data.match(regex);
        if (!res) return;
        if (res.index !== 0) return;
        // this.skip(res[0].length);
        return res[0];
    }
}
export default Lexer;