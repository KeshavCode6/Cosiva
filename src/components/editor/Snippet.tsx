import { codeEditorThemeRules } from "@/lib/editorConstants";
import { Card } from "../ui/card";
import { Highlight } from "prism-react-renderer";

interface CodeEditorSnippetProps {
	code: string,
	handleSnippetDragStart: CallableFunction
}

export function CodeEditorSnippet({ code, handleSnippetDragStart }: CodeEditorSnippetProps) {

	const applyCustomHighlighting = (style: React.CSSProperties, tokenTypes: string[]) => {
		const tokenType = tokenTypes[0] || "";
		const rule = codeEditorThemeRules.find((r) => r.token === tokenType);
		return {
			...style,
			color: rule ? `#${rule.foreground}` : `#000000`,
		};
	};

	return (
		<Card
			draggable
			onDragStart={(e) => handleSnippetDragStart(e, code)}
			className="mb-2 justify-start p-3 hover:cursor-pointer w-fit"
		>
			<Highlight code={code} language="python">
				{({ style, tokens, getTokenProps }: any) => (
					<pre>
						{tokens.map((line: any, index: number) => (
							<div key={index}>
								{line.length > 1 && line.map((token: any, index: number) => {
									const tokenStyle = applyCustomHighlighting({
										...style,
										backgroundColor: "white"
									}, token.types);
									return <span {...getTokenProps({ token, index })} style={tokenStyle} key={index} />
								})}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</Card>
	)
}