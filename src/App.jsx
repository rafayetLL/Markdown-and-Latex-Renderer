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

## Math Examples:

### Standard Delimiters:
Using $ delimiters: $E = mc^2$

Using \\( \\) delimiters: \\(E = mc^2\\)

Block math with $$: 
$$\\frac{a}{b} = c$$

Block math with \\[ \\]:
\\[\\frac{a}{b} = c\\]

### Your Bengali Text:
এখন, \\(\\frac{75}{360}\\) ভগ্নাংশটিকে লঘিষ্ঠ আকারে প্রকাশ করি: \\(\\frac{75}{360} = \\frac{15}{72} = \\frac{5}{24}\\)

সুতরাং, ক্ষেত্রফল \\(= \\frac{5}{24} \\times \\pi \\times 196\\) বর্গ সে.মি.

এখানে, \\(\\pi \\approx 3.1416\\) ধরে হিসাব করি: ক্ষেত্রফল \\(= \\frac{5}{24} \\times 3.1416 \\times 196\\) বর্গ সে.মি.

\\(= \\frac{5 \\times 3.1416 \\times 196}{24}\\) বর্গ সে.মি.

\\(= \\frac{3078.768}{24}\\) বর্গ সে.মি.

\\(\\approx 128.282\\) বর্গ সে.মি.

সুতরাং, নির্ণেয় বৃত্তাংশের ক্ষেত্রফল প্রায় ১২৮.২৮২ বর্গ সে.মি.।

**উত্তর:** প্রায় ১২৮.২৮২ বর্গ সে.মি.
`)

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
