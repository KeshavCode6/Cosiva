import { useState, useEffect } from "react";
import { useScript } from "usehooks-ts";
import { moveBackward, moveForward, turnLeft, turnRight } from "./lib";

const PYODIDE_VERSION = "0.25.0";
export default function usePythonRunner() {
    const [pyodide, setPyodide] = useState<any>(null);
    const pyodideScriptStatus = useScript(
        `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`
    );

    useEffect(() => {
        if (pyodideScriptStatus === "error") {
            console.error("Failed to load Pyodide script.");
        } else if (pyodideScriptStatus === "ready" && !pyodide) {
            (async () => {
                try {
                    //@ts-expect-error
                    const loadedPyodide = await globalThis.loadPyodide({
                        indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
                    });


                    setPyodide(loadedPyodide);
                } catch (error) {
                    console.error("Error loading Pyodide:", error);
                }
            })();
        }
    }, [pyodideScriptStatus, pyodide]);

    const runPythonCode = async (code:string, func:string) => {
        try {
            pyodide.globals.set("moveForward", moveForward);
            pyodide.globals.set("moveBackward", moveBackward);
            pyodide.globals.set("turnLeft", turnLeft);
            pyodide.globals.set("turnRight", turnRight);

            pyodide.runPython(`${code}\n${func}`);        

            return ;
        } catch (error) {
            console.error("Error running Python code:", error);
            return ""
        }
    };

    return { pyodide, runPythonCode };
}