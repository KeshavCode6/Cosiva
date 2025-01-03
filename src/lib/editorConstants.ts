export const snippets = [
	{  code: "moveForward(5)\n" },
	{ code: "moveBackward(10)\n" },
	{code: "turnLeft(90)\n" },
	{ code: "turnRight(90)\n" },
	{code: "log(\"Message goes here\")\n" },
	{code: "startListening()\n" },
	{code: "function onSpeak(word){\n\tlog(word)\n}" },

]

export const defaultCode = 
`// Write your code here

function onStart(){
	log(\"Starting Robot!\")
}
`

export const libCode = 
`
var sysCalls = []

function log(msg) {
    output.push(msg)
}
function startListening() {
    sysCalls.push("stt")
}
function moveForward(steps) {
    log("Moving forward")
}
function moveBackward(steps) {
    log("Moving forward")
}
function turnLeft(degree) {
    log("Moving forward")
}
function turnRight(degree) {
    log("Moving forward")
}
function turnRight(degree) {
    log("Moving forward")
}
`
export const codeEditorThemeRules = [
	{ token: "", foreground: "D4D4D4" },
	{ token: "keyword", foreground: "A259FF" },
	{ token: "string", foreground: "CE9178" },
	{ token: "number", foreground: "9CDCFE" },
	{ token: "comment", foreground: "6A9955" },
	{ token: "delimiter", foreground: "B8D7A3" },
	{ token: "variable", foreground: "DCDCAA" },
	{ token: "type", foreground: "4EC9B0" },
	{ token: "constant", foreground: "B5CEA8" },
	{ token: "property", foreground: "D4D4D4" },
	{ token: "method", foreground: "9CDCFE" },
	{ token: "builtin", foreground: "D4D4D4" },
	{ token: "attribute", foreground: "DCDCAA" },
	{ token: "operator", foreground: "B5CEA8" },
	{ token: "function", foreground: "C586FF" },
]

export function initCodeEditorTheme(monaco: any) {
	monaco.editor.defineTheme("moon", {
		base: "vs-dark",
		inherit: true,
		rules: codeEditorThemeRules,
		colors: {
			"editor.background": "#040414",
			"editorCursor.foreground": "#A259FF",
			"editor.lineHighlightBackground": "#00000000",
			"editorBracketMatch.background": "#00000000",
			"editorBracketMatch.border": "#00000000",
			"editorLineNumber.foreground": "#858585",
			"editorLineNumber.activeForeground": "#FFFFFF",
			"editor.lineHighlightBorder": "#00000000",
			"editorOverviewRuler.border": "#00000000",
		},
	});
	monaco.editor.defineTheme("moon-light", {
		base: "vs",
		inherit: true,
		rules: [
			{ token: "", foreground: "333333" },
			{ token: "keyword", foreground: "A259FF" },
			{ token: "string", foreground: "A31515" },
			{ token: "number", foreground: "09885A" },
			{ token: "comment", foreground: "6A9955" },
			{ token: "delimiter", foreground: "393A34" },
			{ token: "variable", foreground: "795E26" },
			{ token: "type", foreground: "267F99" },
			{ token: "constant", foreground: "B267E6" },
			{ token: "property", foreground: "333333" },
			{ token: "method", foreground: "267F99" },
			{ token: "builtin", foreground: "333333" },
			{ token: "attribute", foreground: "795E26" },
			{ token: "operator", foreground: "393A34" },
			{ token: "function", foreground: "AF00DB" },
		],
		colors: {
			"editor.background": "#FFFFFF",
			"editorCursor.foreground": "#A259FF",
			"editor.lineHighlightBackground": "#FFFFFF",
			"editorBracketMatch.background": "#E8E8E8",
			"editorBracketMatch.border": "#E8E8E8",
			"editorLineNumber.foreground": "#858585",
			"editorLineNumber.activeForeground": "#333333",
			"editor.lineHighlightBorder": "#FFFFFF",
			"editorOverviewRuler.border": "#E8E8E8",
		},
	});
}
