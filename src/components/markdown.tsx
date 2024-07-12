import { useState, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { marked } from 'marked';

export function Markdown() {
  const [markdown, setMarkdown] = useState(
    "# Markdown Editor\n\nType your markdown in the left textarea and see the HTML output on the right.",
  )
  const [showRaw, setShowRaw] = useState(false)

  const renderedHTML = useMemo(() => {
    return marked.parse(markdown, {
      breaks: true,
      gfm: true,
    });
  }, [markdown])
  

  const handleCopyHTML = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = renderedHTML;
    document.body.appendChild(tempElement);
    
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    document.execCommand('copy');
    
    document.body.removeChild(tempElement);
  }
  
  
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Markdown Input</h2>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="h-[500px] w-full resize-none rounded-md border border-input bg-background p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Type your markdown here..."
        />
      </div>
      <div>
        <div className="mb-4 flex justify-between">
          <h2 className="text-2xl font-bold">HTML Output</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleCopyHTML}>
              <ClipboardIcon className="h-5 w-5" />
              <span className="sr-only">Copy HTML</span>
            </Button>
          </div>
        </div>
        {showRaw ? (
          <Textarea
            value={markdown}
            readOnly
            className="h-[500px] w-full resize-none rounded-md border border-input bg-background p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
<div
  className="h-[500px] w-full overflow-auto rounded-md border border-input bg-background p-4 text-sm prose dark:prose-invert text-foreground"
  dangerouslySetInnerHTML={{ __html: renderedHTML }}
/>



        )}
      </div>
    </div>
  )
}

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}


function EyeOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
