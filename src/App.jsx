import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import './App.css'

function App() {
  const [markdownText, setMarkdownText] = useState(`# Markdown + LaTeX Renderer

Try typing some markdown or LaTeX below:

## Basic Examples:

**Bold text** and *italic text*

- List item 1
- List item 2

## Math Example:

$$ 
\\begin{aligned}
& \\text{সমাধান:} \\\\ 
& a^4 + a^2b^2 + b^4 \\\\ 
& = (a^2)^2 + 2a^2b^2 + (b^2)^2 - a^2b^2 \\\\ 
& = (a^2+b^2)^2 - (ab)^2 \\\\ 
& = (a^2+b^2+ab)(a^2+b^2-ab) \\\\ 
& = (a^2+ab+b^2)(a^2-ab+b^2) \\\\ 
& \\therefore 3 = 3(a^2-ab+b^2) \\quad [\\text{মান বসিয়ে}] \\\\ 
& \\text{বা, } a^2-ab+b^2 = \\frac{3}{3} = 1 \\\\ 
& \\text{এখন, } a^2+ab+b^2 = 3 \\text{ এবং } a^2-ab+b^2 = 1 \\\\ 
& \\text{যোগ করে পাই, } 2(a^2+b^2) = 4 \\\\ 
& \\text{বা, } a^2+b^2 = \\frac{4}{2} \\\\ 
& \\therefore a^2+b^2 = 2
\\end{aligned}
$$`)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Markdown + LaTeX Renderer</h1>
      </header>
      
      <div className="content">
        <div className="input-section">
          <h2>Input</h2>
          <textarea
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            placeholder="Enter your markdown and LaTeX here..."
            className="markdown-input"
          />
        </div>
        
        <div className="output-section">
          <h2>Rendered Output</h2>
          <div className="markdown-output">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[
                [rehypeKatex, {
                  strict: false,
                  trust: true,
                  throwOnError: false,
                  errorColor: '#cc0000',
                  macros: {
                    "\\circ": "^\\circ"
                  }
                }]
              ]}
            >
              {markdownText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
