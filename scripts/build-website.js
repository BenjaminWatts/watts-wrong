#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const marked = require('marked');

// Configuration
const BOOK_TITLE = "Watt's Wrong?";
const BOOK_AUTHOR = "Your Name";
const BOOK_SUBTITLE = "What's Wrong with Electricity and Energy in Britain?";
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const WEBSITE_DIR = path.join(OUTPUT_DIR, 'website');

async function buildWebsite() {
    console.log('🌐 Building Website for GitHub Pages...');
    
    try {
        // Ensure output directory exists
        await fs.ensureDir(WEBSITE_DIR);
        
        // Find all markdown files
        const markdownFiles = glob.sync(path.join(CHAPTERS_DIR, '*.md'));
        
        if (markdownFiles.length === 0) {
            throw new Error('No markdown files found in chapters directory');
        }
        
        // Sort files by chapter number
        markdownFiles.sort((a, b) => {
            const aNum = parseInt(path.basename(a).match(/^(\d+)/)?.[1] || '0');
            const bNum = parseInt(path.basename(b).match(/^(\d+)/)?.[1] || '0');
            return aNum - bNum;
        });
        
        console.log(`Found ${markdownFiles.length} chapters`);
        
        // Copy assets
        await copyAssets();
        
        // Generate chapter HTML files
        const chapters = await generateChapterFiles(markdownFiles);
        
        // Generate index.html
        await generateIndexHTML(chapters);
        
        // Generate chapter navigation
        await generateChapterNavigation(chapters);
        
        console.log(`✅ Website built successfully: ${WEBSITE_DIR}`);
        console.log(`📁 Website files: ${WEBSITE_DIR}`);
        
    } catch (error) {
        console.error('❌ Error building website:', error.message);
        process.exit(1);
    }
}

async function copyAssets() {
    console.log('  📁 Copying assets...');
    
    // Copy CSS files
    await fs.copy(
        path.join(__dirname, '..', 'assets'),
        path.join(WEBSITE_DIR, 'assets')
    );
    
    // Create website-specific CSS
    const websiteCSS = `
/* Website-specific styles for Watt's Wrong? */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --background-color: #fff;
    --code-bg: #f8f9fa;
    --border-color: #ddd;
}

body {
    font-family: 'Georgia', 'Times New Roman', serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.header {
    text-align: center;
    padding: 3rem 0;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    margin-bottom: 3rem;
}

.header h1 {
    font-size: 3rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header .subtitle {
    font-size: 1.2rem;
    margin: 1rem 0 0 0;
    opacity: 0.9;
}

.header .author {
    font-size: 1rem;
    margin: 0.5rem 0 0 0;
    opacity: 0.8;
}

.navigation {
    background: var(--code-bg);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid var(--border-color);
}

.navigation h2 {
    margin-top: 0;
    color: var(--primary-color);
}

.navigation ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.navigation li {
    margin-bottom: 0.5rem;
}

.navigation a {
    color: var(--secondary-color);
    text-decoration: none;
    padding: 0.5rem;
    display: block;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.navigation a:hover {
    background-color: var(--border-color);
}

.chapter {
    margin-bottom: 4rem;
}

.chapter h1 {
    color: var(--primary-color);
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
}

.chapter h2 {
    color: var(--primary-color);
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.3rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.chapter h3 {
    color: var(--primary-color);
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
}

.chapter p {
    margin-bottom: 1rem;
    text-align: justify;
}

.chapter ul, .chapter ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
}

.chapter li {
    margin-bottom: 0.5rem;
}

.chapter blockquote {
    border-left: 4px solid var(--secondary-color);
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    background-color: var(--code-bg);
    font-style: italic;
}

.chapter code {
    font-family: 'Courier New', monospace;
    background-color: var(--code-bg);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
}

.chapter pre {
    background-color: var(--code-bg);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;
}

.chapter pre code {
    background-color: transparent;
    padding: 0;
}

.chapter hr {
    border: none;
    border-top: 2px solid var(--border-color);
    margin: 3rem 0;
}

.chapter-nav {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0;
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);
}

.chapter-nav a {
    color: var(--secondary-color);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 1px solid var(--secondary-color);
    border-radius: 4px;
    transition: all 0.2s;
}

.chapter-nav a:hover {
    background-color: var(--secondary-color);
    color: white;
}

.chapter-nav .disabled {
    color: var(--border-color);
    border-color: var(--border-color);
    pointer-events: none;
}

.footer {
    text-align: center;
    padding: 2rem 0;
    margin-top: 4rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-color);
    opacity: 0.7;
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .header h1 {
        font-size: 2rem;
    }
    
    .header .subtitle {
        font-size: 1rem;
    }
    
    .chapter h1 {
        font-size: 1.8rem;
    }
    
    .chapter h2 {
        font-size: 1.5rem;
    }
}
`;

    await fs.writeFile(path.join(WEBSITE_DIR, 'assets', 'website.css'), websiteCSS);
}

async function generateChapterFiles(markdownFiles) {
    console.log('  📖 Generating chapter HTML files...');
    
    const chapters = [];
    
    for (let i = 0; i < markdownFiles.length; i++) {
        const file = markdownFiles[i];
        const chapterName = path.basename(file, '.md');
        const chapterNumber = (i + 1).toString().padStart(2, '0');
        const chapterTitle = chapterName.replace(/^\d+-/, '').replace(/-/g, ' ');
        
        // Read and parse markdown
        const content = await fs.readFile(file, 'utf8');
        const htmlContent = marked.parse(content);
        
        // Generate chapter HTML
        const chapterHTML = generateChapterHTML(
            chapterTitle,
            htmlContent,
            i,
            markdownFiles.length,
            chapters
        );
        
        const outputFile = path.join(WEBSITE_DIR, `${chapterNumber}-${chapterName}.html`);
        await fs.writeFile(outputFile, chapterHTML);
        
        chapters.push({
            number: chapterNumber,
            name: chapterName,
            title: chapterTitle,
            filename: `${chapterNumber}-${chapterName}.html`,
            index: i
        });
    }
    
    return chapters;
}

function generateChapterHTML(title, content, currentIndex, totalChapters, chapters) {
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < totalChapters - 1 ? chapters[currentIndex + 1] : null;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${BOOK_TITLE}</title>
    <link rel="stylesheet" href="assets/website.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${BOOK_TITLE}</h1>
            <p class="subtitle">${BOOK_SUBTITLE}</p>
            <p class="author">by ${BOOK_AUTHOR}</p>
        </header>
        
        <nav class="navigation">
            <h2>Table of Contents</h2>
            <ul>
                ${chapters.map(ch => 
                    `<li><a href="${ch.filename}">Chapter ${ch.number}: ${ch.title}</a></li>`
                ).join('')}
            </ul>
        </nav>
        
        <main class="chapter">
            ${content}
        </main>
        
        <nav class="chapter-nav">
            <a href="${prevChapter ? prevChapter.filename : '#'}" 
               class="${prevChapter ? '' : 'disabled'}">
                ← Previous Chapter
            </a>
            <a href="index.html">Table of Contents</a>
            <a href="${nextChapter ? nextChapter.filename : '#'}" 
               class="${nextChapter ? '' : 'disabled'}">
                Next Chapter →
            </a>
        </nav>
        
        <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} ${BOOK_AUTHOR}. All rights reserved.</p>
            <p>Built with ❤️ using Markdown and open source tools</p>
        </footer>
    </div>
</body>
</html>`;
}

async function generateIndexHTML(chapters) {
    console.log('  🏠 Generating index.html...');
    
    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${BOOK_TITLE} - Online Reading</title>
    <link rel="stylesheet" href="assets/website.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>${BOOK_TITLE}</h1>
            <p class="subtitle">${BOOK_SUBTITLE}</p>
            <p class="author">by ${BOOK_AUTHOR}</p>
        </header>
        
        <main>
            <section class="introduction">
                <h2>Welcome to ${BOOK_TITLE}</h2>
                <p>This book explores the challenges and issues facing electricity and energy in Britain. 
                From grid infrastructure to renewable energy policies, we'll examine what's working, 
                what's not, and what needs to change.</p>
                
                <p>Whether you're interested in energy policy, infrastructure, or simply want to understand 
                the current state of Britain's energy system, this book provides a comprehensive overview 
                written in accessible language.</p>
            </section>
            
            <nav class="navigation">
                <h2>Start Reading</h2>
                <ul>
                    ${chapters.map(ch => 
                        `<li><a href="${ch.filename}">Chapter ${ch.number}: ${ch.title}</a></li>`
                    ).join('')}
                </ul>
            </nav>
            
            <section class="downloads">
                <h2>Download Formats</h2>
                <p>Prefer to read offline? Download the book in your preferred format:</p>
                <ul>
                    <li><strong>EPUB:</strong> Perfect for e-readers and mobile devices</li>
                    <li><strong>Kindle (MOBI):</strong> Optimized for Amazon Kindle devices</li>
                    <li><strong>PDF:</strong> Great for printing and desktop reading</li>
                    <li><strong>Audiobook:</strong> Listen while you commute or exercise</li>
                </ul>
                <p><em>Note: Download links will be available once the book is published.</em></p>
            </section>
        </main>
        
        <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} ${BOOK_AUTHOR}. All rights reserved.</p>
            <p>Built with ❤️ using Markdown and open source tools</p>
        </footer>
    </div>
</body>
</html>`;
    
    await fs.writeFile(path.join(WEBSITE_DIR, 'index.html'), indexHTML);
}

async function generateChapterNavigation(chapters) {
    console.log('  🧭 Generating chapter navigation...');
    
    // Create a JSON file with chapter information for potential future use
    const chapterData = chapters.map(ch => ({
        number: ch.number,
        name: ch.name,
        title: ch.title,
        filename: ch.filename,
        index: ch.index
    }));
    
    await fs.writeJson(path.join(WEBSITE_DIR, 'chapters.json'), chapterData, { spaces: 2 });
}

// Run the build
buildWebsite(); 