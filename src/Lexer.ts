export default class Lexer {
    data: string;
    tokens: Token[];
    currentToken: Token;
    pos: number = 0;
    constructor(data: string) {
        this.data = data;
        this.tokens = [];
        this.currentToken = new Token(data, 0);
    }
    lex(): Token[] {
        while (this.pos <= this.data.length - 1) {
            console.log(">text:" + this.data);
            console.log("      " + " ".repeat(this.pos) + `^ (pos = ${this.pos})`);
			console.log(">whitespace?", tokenTypes.whitespace.regex.test(this.currentToken.strNoEnd));
			if (tokenTypes.whitespace.regex.test(this.currentToken.strNoEnd))
				this.readSkipToken(tokenTypes.whitespace);
			else if (tokenTypes.keyword.regex.test(this.currentToken.strNoEnd))
				this.readSkipToken(tokenTypes.keyword);
			else {
				console.error(`>unknown token!! data left: "${this.data.substr(this.pos)}"`);
				process.exit(1);
			}

            console.log(">next\n");
		}
		console.log(">done!!", this, this.tokens.map(t => t.str));
		return this.tokens;
    }

    readSkipToken(type: TokenType) {
        const arr = type.regex.exec(this.currentToken.strNoEnd);
		console.log(arr);
		if (!arr) throw new Error("token doesnt match type");
        this.currentToken.type = type;
		this.currentToken.len = arr[0].length;
		console.log(this.currentToken);
		this.pos += arr[0].length;
		this.tokens.push(this.currentToken);
		this.currentToken = new Token(this.data, this.pos);
    }
    // Not to be called if already started reading a token
    // findToken(i: number): Token {
    // }
}
interface TokenType {
    regex: RegExp;
    id: string;
}
type TokenTypeObj = {
    [key: string]: TokenType;
};
const tokenTypes = {
    whitespace: { regex: /^\s+/, id: "whitespace" },
    keyword: { regex: /^(foo|bar)/, id: "keyword" }
} as TokenTypeObj;
export class Token {
    start: number;
    private data: string;
    len: number;
    type?: TokenType;
    constructor(
        data: string,
        start: number,
        len: number = 1,
        type?: TokenType
    ) {
        this.data = data;
        this.start = start;
        this.len = len;
        this.type = type;
    }

    get end(): number {
        return this.start + this.len;
    }
    get str(): string {
        return this.data.substr(this.start, this.len);
	}
	get strNoEnd(): string {
		return this.data.substr(this.start);
	}
}
