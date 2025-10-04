#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const marked = require('marked');

// Configuration
const BOOK_TITLE = "Watt's Wrong?";
const BOOK_AUTHOR = "Ben Watts";
const BOOK_SUBTITLE = "A comprehensive guide to what's wrong with Britain's electricity and energy system";
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');
const WEBSITE_DIR = path.join(OUTPUT_DIR, 'website');

// SEO Configuration
const SEO_CONFIG = {
    baseUrl: 'https://benjaminwatts.github.io/watts-wrong/',
    description: 'A comprehensive guide to what\'s wrong with Britain\'s electricity and energy system - covering grid infrastructure, renewable energy policies, market failures, and policy chaos.',
    keywords: 'UK energy policy, British electricity system, energy grid, renewable energy, energy markets, energy regulation, energy infrastructure, energy economics, policy analysis, energy transition, grid balancing, energy subsidies, energy pricing, energy storage, smart grid, energy efficiency, climate policy, carbon pricing, energy security',
    author: 'Ben Watts',
    publisher: 'Ben Watts',
    images: {
        // Primary image (current cover)
        primary: 'https://benjaminwatts.github.io/watts-wrong/assets/covers/watts-wrong-cover.png',
        // Social media optimized images (when available)
        socialOG: 'https://benjaminwatts.github.io/watts-wrong/assets/covers/watts-wrong-social-og.png',
        socialTwitter: 'https://benjaminwatts.github.io/watts-wrong/assets/covers/watts-wrong-social-twitter.png',
        socialSquare: 'https://benjaminwatts.github.io/watts-wrong/assets/covers/watts-wrong-social-square.png'
    },
    twitterHandle: '@BenjaminWatts',
    language: 'en-GB'
};

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
        
        // Generate SEO files
        await generateSEOFiles(chapters);
        
        // Copy download files to website (after all other operations)
        await copyDownloads();
        
        console.log(`✅ Website built successfully: ${WEBSITE_DIR}`);
        console.log(`📁 Website files: ${WEBSITE_DIR}`);
        
    } catch (error) {
        console.error('❌ Error building website:', error.message);
        process.exit(1);
    }
}

async function copyAssets() {
    console.log('  📁 Copying assets...');
    
    // Copy CSS files and cover image
    await fs.copy(
        path.join(__dirname, '..', 'assets'),
        path.join(WEBSITE_DIR, 'assets')
    );
    
    // Ensure covers directory exists and copy cover image
    await fs.ensureDir(path.join(WEBSITE_DIR, 'assets', 'covers'));
    await fs.copy(
        path.join(__dirname, '..', 'assets', 'covers', 'watts-wrong-cover.png'),
        path.join(WEBSITE_DIR, 'assets', 'covers', 'watts-wrong-cover.png')
    );
    
    
    // Create website-specific CSS
    const websiteCSS = `
/* Website-specific styles for Watt's Wrong? - Matching Cover Art Design */
:root {
    --primary-color: #1E3A8A; /* Deep electric blue from cover */
    --secondary-color: #F59E0B; /* Warning amber accent */
    --accent-color: #EF4444; /* Red for warnings */
    --text-color: #1E3A8A; /* Deep electric blue text */
    --background-color: #fff;
    --code-bg: #E5E7EB; /* Stormy gray background */
    --border-color: #D1D5DB; /* Light gray borders */
    --stormy-gray: #374151; /* Stormy gray for secondary text */
    --light-amber: #FEF3C7; /* Light amber background */
    --light-red: #FEE2E2; /* Light red background */
    --light-green: #ECFDF5; /* Light green background */
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
    background: linear-gradient(135deg, var(--light-amber), var(--code-bg)); /* Light amber to stormy gray gradient */
    color: var(--primary-color); /* Deep electric blue text */
    margin-bottom: 3rem;
    border: 3px solid var(--secondary-color); /* Warning amber border */
    border-radius: 8px;
}

.header h1 {
    font-size: 3rem;
    margin: 0;
    font-weight: bold;
    font-family: 'Arial Black', 'Helvetica', sans-serif; /* Bold, distressed style like cover */
}

.draft-notice {
    background: linear-gradient(135deg, var(--light-red), #FFE4E1);
    border: 3px solid var(--accent-color);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    text-align: center;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.draft-notice h2 {
    color: var(--accent-color);
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    font-weight: bold;
}

.draft-notice p {
    color: var(--primary-color);
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.5;
}

.header .subtitle {
    font-size: 1.2rem;
    margin: 1rem 0 0 0;
    color: var(--stormy-gray); /* Stormy gray */
    font-weight: 500;
}

.header .author {
    font-size: 1rem;
    margin: 0.5rem 0 0 0;
    color: var(--stormy-gray); /* Stormy gray */
    font-weight: 500;
}

.cover-image {
    max-width: 300px;
    height: auto;
    margin-bottom: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
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

.part-section {
    margin-bottom: 2rem;
}

.part-section h3 {
    color: var(--primary-color);
    border-bottom: 2px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
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
    color: var(--stormy-gray); /* Stormy gray */
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
}

.chapter h4 {
    color: var(--stormy-gray); /* Stormy gray */
    margin-top: 1.2rem;
    margin-bottom: 0.6rem;
    font-weight: 600;
}

.chapter p {
    margin-bottom: 1rem;
    text-align: justify;
    color: var(--text-color); /* Deep electric blue */
}

.chapter ul, .chapter ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
}

.chapter li {
    margin-bottom: 0.5rem;
    color: var(--text-color); /* Deep electric blue */
}

.chapter blockquote {
    border-left: 4px solid var(--secondary-color); /* Warning amber accent */
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    background-color: var(--light-amber); /* Light amber background */
    font-style: italic;
    color: var(--primary-color); /* Deep electric blue text */
}

.chapter code {
    font-family: 'Courier New', monospace;
    background-color: var(--code-bg); /* Stormy gray background */
    color: var(--primary-color); /* Deep electric blue text */
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
    border: 1px solid var(--border-color);
}

.chapter pre {
    background-color: #F3F4F6; /* Light stormy gray */
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--secondary-color); /* Warning amber accent */
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
    border-top: 3px solid var(--secondary-color); /* Warning amber accent */
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
    
    // Load chapter configuration
    const configPath = path.join(__dirname, '..', 'chapters-config.json');
    const config = await fs.readJson(configPath);
    
    const chapters = [];
    
    for (let i = 0; i < markdownFiles.length; i++) {
        const file = markdownFiles[i];
        const chapterName = path.basename(file, '.md');
        const chapterNumber = (i + 1).toString().padStart(2, '0');
        
        // Find chapter config by filename
        const chapterConfig = config.chapters.find(ch => ch.id === chapterName);
        if (!chapterConfig) {
            console.warn(`⚠️  No configuration found for chapter: ${chapterName}`);
            continue;
        }
        
        // Read and parse markdown
        const content = await fs.readFile(file, 'utf8');
        const htmlContent = marked.parse(content);
        
        // Generate chapter HTML
        const chapterHTML = generateChapterHTML(
            chapterConfig.title,
            htmlContent,
            i,
            markdownFiles.length,
            chapters,
            getChapterPart(i, config)
        );
        
        const outputFile = path.join(WEBSITE_DIR, `${chapterNumber}-${chapterName}.html`);
        await fs.writeFile(outputFile, chapterHTML);
        
        chapters.push({
            number: chapterConfig.number.toString(),
            name: chapterName,
            title: chapterConfig.title,
            description: chapterConfig.description,
            filename: `${chapterNumber}-${chapterName}.html`,
            index: i
        });
    }
    
    return chapters;
}

function getChapterPart(chapterIndex, config) {
    if (!config) {
        // Fallback to hardcoded parts if config is not available
        if (chapterIndex === 0) return 'Introduction';
        if (chapterIndex <= 4) return 'Part 1: The Generation Mess (Chapters 2-5)';
        if (chapterIndex <= 7) return 'Part 2: The Grid & Infrastructure Problems (Chapters 6-8)';
        if (chapterIndex <= 12) return 'Part 3: The Consumer & Market Failures (Chapters 9-13)';
        if (chapterIndex <= 16) return 'Part 4: The Policy & Pricing Chaos (Chapters 14-17)';
        if (chapterIndex <= 18) return 'Part 5: The Human Factor (Chapters 18-19)';
        return 'Conclusion (Chapter 20)';
    }
    
    // Find which part this chapter belongs to
    const chapterNumber = chapterIndex + 1;
    const part = config.parts.find(p => p.chapters.includes(chapterNumber));
    return part ? part.title : 'Unknown Part';
}

function generateSEOMetaTags(title, description, url, image, isChapter = false) {
    const pageDescription = description || SEO_CONFIG.description;
    const pageTitle = isChapter ? `${title} - ${BOOK_TITLE}` : title;
    const pageUrl = `${SEO_CONFIG.baseUrl}${url}`;
    
    // Use primary image for now (social media optimized images not yet created)
    const pageImage = image || SEO_CONFIG.images.primary;
    const ogImage = image || SEO_CONFIG.images.primary;
    const twitterImage = image || SEO_CONFIG.images.primary;
    
    return `
    <!-- SEO Meta Tags -->
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDescription}">
    <meta name="keywords" content="${SEO_CONFIG.keywords}">
    <meta name="author" content="${SEO_CONFIG.author}">
    <meta name="publisher" content="${SEO_CONFIG.publisher}">
    <meta name="language" content="${SEO_CONFIG.language}">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="${isChapter ? 'article' : 'book'}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDescription}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="1536">
    <meta property="og:image:alt" content="${BOOK_TITLE} book cover - Britain's energy system analysis">
    <meta property="og:site_name" content="${BOOK_TITLE}">
    <meta property="og:locale" content="en_GB">
    ${isChapter ? `<meta property="article:author" content="${SEO_CONFIG.author}">` : ''}
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${SEO_CONFIG.twitterHandle}">
    <meta name="twitter:creator" content="${SEO_CONFIG.twitterHandle}">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDescription}">
    <meta name="twitter:image" content="${twitterImage}">
    <meta name="twitter:image:alt" content="${BOOK_TITLE} book cover - Britain's energy system analysis">
    
    <!-- Additional Meta Tags -->
    <meta name="theme-color" content="#1E3A8A">
    <meta name="msapplication-TileColor" content="#1E3A8A">
    <meta name="apple-mobile-web-app-title" content="${BOOK_TITLE}">
    <meta name="application-name" content="${BOOK_TITLE}">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "${isChapter ? 'Article' : 'Book'}",
        "name": "${pageTitle}",
        "description": "${pageDescription}",
        "author": {
            "@type": "Person",
            "name": "${SEO_CONFIG.author}"
        },
        "publisher": {
            "@type": "Person",
            "name": "${SEO_CONFIG.publisher}"
        },
        "url": "${pageUrl}",
        "image": "${ogImage}",
        "inLanguage": "${SEO_CONFIG.language}",
        "datePublished": "2024-01-01",
        "dateModified": "${new Date().toISOString().split('T')[0]}",
        ${isChapter ? `"articleSection": "Energy Policy",
        "articleBody": "${pageDescription.replace(/"/g, '\\"')}",` : `
        "bookFormat": "EBook",
        "numberOfPages": "500",
        "isbn": "978-0-000000-00-0",
        "genre": "Non-fiction, Energy Policy, Economics",`}
        "keywords": "${SEO_CONFIG.keywords}",
        "about": [
            {
                "@type": "Thing",
                "name": "Energy Policy"
            },
            {
                "@type": "Thing", 
                "name": "UK Energy System"
            },
            {
                "@type": "Thing",
                "name": "Electricity Grid"
            },
            {
                "@type": "Thing",
                "name": "Renewable Energy"
            }
        ]
    }
    </script>`;
}

function generateChapterHTML(title, content, currentIndex, totalChapters, chapters, part) {
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < totalChapters - 1 ? chapters[currentIndex + 1] : null;
    const chapterFilename = chapters[currentIndex]?.filename || `chapter-${currentIndex + 1}`;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${generateSEOMetaTags(title, `Chapter ${currentIndex + 1} of ${BOOK_TITLE}: ${title}`, chapterFilename, SEO_CONFIG.image, true)}
    <link rel="stylesheet" href="assets/website.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <img src="assets/covers/watts-wrong-cover.png" alt="Cover of ${BOOK_TITLE}" class="cover-image" />
            <h1>${BOOK_TITLE}</h1>
            <div class="draft-notice">
                <h2>🚧 DRAFT IN PROGRESS - WORK IN PROGRESS 🚧</h2>
                <p><strong>⚠️ IMPORTANT NOTICE:</strong> This book is currently a <strong>DRAFT IN PROGRESS</strong>. Content is being actively developed and may contain incomplete sections, placeholder text, or information that requires verification. Please check back regularly for updates and improvements.</p>
            </div>
            <p class="subtitle">${BOOK_SUBTITLE}</p>
            <p class="author">by ${BOOK_AUTHOR}</p>
        </header>
        
        <nav class="navigation">
            <h2>Table of Contents</h2>
            <div class="part-section">
                <h3>${part}</h3>
                <ul>
                    ${chapters.map(ch => 
                        `<li><a href="${ch.filename}">Chapter ${ch.number}: ${ch.title}</a></li>`
                    ).join('')}
                </ul>
            </div>
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
    
    // Load chapter configuration for proper part organization
    const configPath = path.join(__dirname, '..', 'chapters-config.json');
    const config = await fs.readJson(configPath);
    
    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${generateSEOMetaTags(`${BOOK_TITLE} - Online Reading`, SEO_CONFIG.description, '', SEO_CONFIG.image, false)}
    <link rel="stylesheet" href="assets/website.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <img src="assets/covers/watts-wrong-cover.png" alt="Cover of ${BOOK_TITLE}" class="cover-image" />
            <h1>${BOOK_TITLE}</h1>
            <div class="draft-notice">
                <h2>🚧 DRAFT IN PROGRESS - WORK IN PROGRESS 🚧</h2>
                <p><strong>⚠️ IMPORTANT NOTICE:</strong> This book is currently a <strong>DRAFT IN PROGRESS</strong>. Content is being actively developed and may contain incomplete sections, placeholder text, or information that requires verification. Please check back regularly for updates and improvements.</p>
            </div>
            <p class="subtitle">${BOOK_SUBTITLE}</p>
            <p class="author">by ${BOOK_AUTHOR}</p>
        </header>
        
        <main>
            <section class="introduction">
                <h2>Welcome to ${BOOK_TITLE}</h2>
                <p>This book is your comprehensive guide to understanding what's wrong with Britain's electricity and energy system. 
                From grid infrastructure to renewable energy policies, we'll examine what's working, 
                what's not, and what needs to change.</p>
                
                <p>Perfect for newcomers seeking context across every subsector, or experts wanting to explore 
                areas beyond their specialty. Written in accessible language that cuts through the complexity 
                to give you the full picture.</p>
            </section>
            
            <nav class="navigation">
                <h2>Start Reading</h2>
                
                ${config.parts.map(part => {
                    const partChapters = chapters.filter(ch => part.chapters.includes(parseInt(ch.number)));
                    if (partChapters.length === 0) return '';
                    
                    return `
                <div class="part-section">
                    <h3>${part.title}</h3>
                    <ul>
                        ${partChapters.map(ch => 
                            `<li><a href="${ch.filename}">Chapter ${ch.number}: ${ch.title}</a></li>`
                        ).join('')}
                    </ul>
                </div>`;
                }).join('')}
            </nav>
            
            <section class="downloads">
                <h2>Download Formats</h2>
                <p>Prefer to read offline? Download the book in your preferred format:</p>
                
                <div class="download-grid">
                    <div class="download-item">
                        <h3>📚 Ebooks</h3>
                        <ul>
                            <li><strong>EPUB:</strong> Perfect for e-readers and mobile devices</li>
                            <li><strong>Kindle (MOBI):</strong> Optimized for Amazon Kindle devices</li>
                            <li><strong>PDF:</strong> Great for printing and desktop reading</li>
                        </ul>
                    </div>
                    
                    <div class="download-item">
                        <h3>🎧 Audiobook</h3>
                        <ul>
                            <li><strong>Complete Package:</strong> All 20 chapters in one download</li>
                            <li><strong>Individual Chapters:</strong> Download specific chapters</li>
                            <li><strong>Formats:</strong> MP3 and AIFF available</li>
                        </ul>
                    </div>
                </div>
                
                <div class="download-instructions">
                    <h3>📥 How to Download</h3>
                    <p><strong>Latest Build:</strong> All formats are automatically built and available as GitHub Actions artifacts.</p>
                    <ol>
                        <li>Go to the <a href="https://github.com/benjaminwatts/watts-wrong/actions" target="_blank">Actions tab</a> in this repository</li>
                        <li>Click on the latest successful workflow run (green checkmark)</li>
                        <li>Scroll down to the <strong>Artifacts</strong> section</li>
                        <li>Download the format you want:
                            <ul>
                                <li><strong>ebooks</strong> - EPUB, MOBI, and PDF files</li>
                                <li><strong>audiobook</strong> - Complete audiobook archive</li>
                                <li><strong>complete-book</strong> - Everything in one package</li>
                            </ul>
                        </li>
                    </ol>
                    <p><em>💡 Artifacts are kept for 90 days and are updated with every push to the main branch.</em></p>
                </div>
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

async function generateSEOFiles(chapters) {
    console.log('  🔍 Generating SEO files...');
    
    // Generate sitemap.xml
    const sitemap = generateSitemap(chapters);
    await fs.writeFile(path.join(WEBSITE_DIR, 'sitemap.xml'), sitemap);
    
    // Generate robots.txt
    const robots = generateRobotsTxt();
    await fs.writeFile(path.join(WEBSITE_DIR, 'robots.txt'), robots);
    
    // Generate manifest.json for PWA
    const manifest = generateManifest(chapters);
    await fs.writeFile(path.join(WEBSITE_DIR, 'manifest.json'), manifest);
}

function generateSitemap(chapters) {
    const currentDate = new Date().toISOString();
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${SEO_CONFIG.baseUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;
    
    chapters.forEach(chapter => {
        sitemap += `
    <url>
        <loc>${SEO_CONFIG.baseUrl}${chapter.filename}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    return sitemap;
}

function generateRobotsTxt() {
    return `User-agent: *
Allow: /

Sitemap: ${SEO_CONFIG.baseUrl}sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
}

function generateManifest(chapters) {
    return JSON.stringify({
        "name": BOOK_TITLE,
        "short_name": "Watt's Wrong?",
        "description": SEO_CONFIG.description,
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#1E3A8A",
        "orientation": "portrait",
        "icons": [
            {
                "src": "assets/covers/watts-wrong-cover.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
            }
        ],
        "categories": ["books", "education", "reference"],
        "lang": "en-GB"
    }, null, 2);
}

async function copyDownloads() {
    console.log('  📁 Copying download files...');
    
    // Copy download files to website
    const downloadsDir = path.join(WEBSITE_DIR, 'downloads');
    console.log(`  📁 WEBSITE_DIR: ${WEBSITE_DIR}`);
    console.log(`  📁 Creating downloads directory: ${downloadsDir}`);
    await fs.ensureDir(downloadsDir);
    console.log(`  📁 Downloads directory created successfully`);
    
    // Verify the directory was actually created
    const exists = await fs.pathExists(downloadsDir);
    console.log(`  📁 Directory exists after creation: ${exists}`);
    
    const downloadFiles = ['watts-wrong.epub', 'watts-wrong.mobi', 'watts-wrong.pdf'];
    for (const file of downloadFiles) {
        const sourcePath = path.join(__dirname, '..', 'dist', file);
        const destPath = path.join(downloadsDir, file);
        console.log(`  📁 Checking ${sourcePath}...`);
        if (await fs.pathExists(sourcePath)) {
            console.log(`  📁 Copying ${file} to ${destPath}...`);
            await fs.copy(sourcePath, destPath);
            console.log(`  ✅ Copied ${file} successfully`);
        } else {
            console.log(`  ⚠️  File not found: ${sourcePath}`);
        }
    }
    
    // Verify downloads directory exists after copying
    if (await fs.pathExists(downloadsDir)) {
        const files = await fs.readdir(downloadsDir);
        console.log(`  📁 Downloads directory contents: ${files.join(', ')}`);
    } else {
        console.log(`  ❌ Downloads directory does not exist after copying!`);
    }
}

// Run the build
buildWebsite(); 