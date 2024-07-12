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
  

  const handleCopyHTML = async () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = await renderedHTML;
    document.body.appendChild(tempElement);
    
    const range = document.createRange();
    range.selectNodeContents(tempElement);
    
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    document.execCommand('copy');
    
    document.body.removeChild(tempElement);
  }
  
  
  return (


    <div className="flex w-full gap-8 p-8 h-screen">
      <div className="flex flex-col w-1/2">
        <h2 className="mb-4 text-2xl font-bold">Markdown Input</h2>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-grow w-full resize-none rounded-md border border-input bg-background p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Type your markdown here..."
        />
      </div>

      <div className="flex flex-col w-1/2">
        <div className="mb-4 flex  justify-start">
          <h2 className="text-2xl font-bold">HTML Output</h2>
          <div className="flex  gap-2">
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
            className="flex-grow flex-col w-full resize-none rounded-md border border-input bg-background p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
          <div
            className="flex-grow flex-col w-full rounded-md border border-input bg-background p-4 text-sm prose "
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
          />
        )}
      </div>
    </div>
  )
}

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
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
