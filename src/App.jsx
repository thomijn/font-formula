import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function App() {
  const [minSize, setMinSize] = useState(48); // Default minimum font size in pixels
  const [maxSize, setMaxSize] = useState(100); // Default maximum font size in pixels
  const [minBreakpoint, setMinBreakpoint] = useState(320); // Default minimum viewport width in pixels
  const [maxBreakpoint, setMaxBreakpoint] = useState(1024); // Default maximum viewport width in pixels
  const [cssOutput, setCssOutput] = useState("");
  const [show, setShow] = useState(false);
  const [css, setCss] = useState("");
  const [copied, setCopied] = useState(false);
  const handleCalculate = () => {
    const baseSize = minSize;
    const slope = (maxSize - minSize) / (maxBreakpoint - minBreakpoint);
    const viewportAdjustment = 100 * slope; // Convert slope to percentage for viewport unit calculation
    console.log(slope.toFixed(4));
    const css = `min(max(${minSize}px, calc(${baseSize}px + ${slope.toFixed(
      4
    )} * (100vw - ${minBreakpoint}px))), ${maxSize}px)`;
    setCss(css);
    setCssOutput(`font-size: ${css};`);
  };

  const copyText = () => {
    if (!cssOutput) return;
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="w-screen h-screen flex justify-content items-center pt-[100px]">
      <div className="w-full max-w-[800px] mx-auto rounded-xl min-h-[600px] h-auto h-1/2 bg-gray-100 p-[10px] sm:p-[30px]">
        <h1 className="text-3xl mb-[20px]">
          Responsive Font Size CSS Generator
        </h1>
        <p className="text-sm mb-[20px] max-w-[600px]">
          Welcome to the Responsive Font Size CSS Generator! Enter your desired
          font sizes and breakpoints to instantly generate a custom CSS calc()
          formula. Copy the output to make your text perfectly scalable across
          devices.
        </p>
        <div className="sm:grid-cols-2 grid gap-4 gap-4 mb-[20px]">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Minimum font size (px)</Label>
            <Input
              type="number"
              value={minSize}
              onChange={(e) => setMinSize(Number(e.target.value))}
              placeholder="Minimum font size (px)"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Maximum font size (px)</Label>
            <Input
              type="number"
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              placeholder="Maximum font size (px)"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Mobile breakpoint</Label>
            <Input
              type="number"
              value={minBreakpoint}
              onChange={(e) => setMinBreakpoint(Number(e.target.value))}
              placeholder="Minimum viewport width (px)"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Desktop breakpoint</Label>
            <Input
              type="number"
              value={maxBreakpoint}
              onChange={(e) => setMaxBreakpoint(Number(e.target.value))}
              placeholder="Maximum viewport width (px)"
            />
          </div>
        </div>

        <Button className="mb-[20px]" onClick={handleCalculate}>
          Generate CSS
        </Button>
        <div className="relative">
          <p>CSS Output:</p>
          <span
            className={`absolute right-0 top-[0px] ${
              copied
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[20px]"
            } transition-all`}
          >
            Copied!
          </span>
          <pre
            onClick={copyText}
            className="mb-4 mt-4 max-h-[650px] overflow-x-auto relative rounded-lg border bg-zinc-950 p-4 dark:bg-zinc-900 text-white cursor-pointer"
          >
            {cssOutput}
          </pre>
          {cssOutput && (
            <>
              <Button onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"} Sample Text
              </Button>
              {show && (
                <span
                  className="mt-[20px]"
                  style={{ fontSize: css, lineHeight: 1, display: "block" }}
                >
                  {cssOutput &&
                    "This is some sample text to demonstrate the responsive font size."}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
