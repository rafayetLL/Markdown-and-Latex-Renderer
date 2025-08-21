import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import mathjax3 from 'markdown-it-mathjax3'
import './App.css'

function App() {
  const [markdownText, setMarkdownText] = useState(`# Testing Double Dollar Issues - NO Preprocessing Needed!

Here's the problematic case that should now work naturally:

$x^{8}-2 x^{4}+1$$=0, x>0$

$A=p+q$ এবং $\\mathrm{B}=\\mathrm{p}^{2}-\\mathrm{q}^{2}$

ক. উৎপাদকে বিশ্লেষণ কর: $y^{4}-79 y^{2}+1$

খ. $\\frac{3}{2}\\left(x^{3}+\\frac{1}{x^{3}}\\right)$ এর মান নির্ণয় কর।

গ. $A=\\sqrt{7}, B=\\sqrt{35}$ হলে, প্রমাণ কর যে, $\\frac{1}{3}\\left(p^{3} q+p q^{3}\\right)=1$

$\\boxed{\\mathbf{~ক~}}$

প্রদত্ত রাশি $=y^{4}-79 y^{2}+1$

$~~~~~~~~~~~~~~~~$$=\\left(y^{2}\\right)^{2}-2 \\cdot y^{2} \\cdot \\frac{79}{2}+$$\\left(\\frac{79}{2}\\right)^{2}-\\left(\\frac{79}{2}\\right)^{2}+1$

$~~~~~~~~~~~~~~~~$$=\\left(y^{2}-\\frac{79}{2}\\right)^{2}$$-\\frac{6241}{4}+1$

$\\boxed{\\mathbf{~খ~}}$ 

দেওয়া আছে,

$x^{x}-2 x^{4}+1$$=0, x>0$

বা, $x^{x}+1-2 x^{4}$

বা, $\\frac{x^{8}}{x^{4}}+\\frac{1}{x^{4}}$$=\\frac{2 x^{4}}{x^{4}}$ [উভয়পক্ষে $x^{4}$ দ্বারা ভাগ করে]

Working example with proper delimiters:

$$
\\begin{aligned}
& x^3 + 6x^2y + 11xy^2 + 6y^3 \\\\
&= \\{x^3 + 3 \\cdot x^2 \\cdot 2y + 3 \\cdot x \\cdot (2y)^2 + (2y)^3\\} - xy^2 - 2y^3 \\\\
&= (x + 2y)^3 - y^2(x + 2y) \\\\
&= (x + 2y)\\{(x + 2y)^2 - y^2\\} \\\\
&= (x + 2y)(x + 2y + y)(x + 2y - y) \\\\
&= (x + 2y)(x + 3y)(x + y) \\\\
&= (x + y)(x + 2y)(x + 3y)
\\end{aligned}
$$`)

  // Initialize markdown-it with mathjax3 - much better at handling edge cases
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
  }).use(mathjax3, {
    tex: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
      processEnvironments: true,
      tags: 'ams',
      // Key settings for handling malformed delimiters
      strict: false,
      maxMacroExpansion: 1000,
      maxBuffer: 5000,
      formatError: (jax, err) => {
        console.warn('LaTeX Error:', err)
        return jax.math // Return original math on error
      },
      macros: {
        '\\therefore': '\\therefore',
        '\\mathbb': '\\mathbb', 
        '\\text': '\\text',
        '\\boxed': '\\boxed',
        '\\mathrm': '\\mathrm'
      }
    }
  })

  // No preprocessing needed! markdown-it-mathjax3 handles the edge cases naturally
  const renderMarkdown = (text) => {
    try {
      return md.render(text)
    } catch (error) {
      console.error('Markdown rendering error:', error)
      return `<p>Error rendering markdown: ${error.message}</p>`
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Markdown + LaTeX with markdown-it (No Preprocessing!)</h1>
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
          <div 
            className="markdown-output"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdownText) }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
