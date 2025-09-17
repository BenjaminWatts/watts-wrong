#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Configuration
const BOOK_TITLE = "Watt's Wrong?";
const BOOK_AUTHOR = "Ben Watts";
const BOOK_LANGUAGE = "en";
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');

async function buildPDF() {
    console.log('📄 Building PDF...');
    
    try {
        // Ensure output directory exists
        await fs.ensureDir(OUTPUT_DIR);
        
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
        
        // Check if cover image exists
        const coverImagePath = path.join(__dirname, '..', 'assets', 'covers', 'watts-wrong-cover.png');
        const hasCover = await fs.pathExists(coverImagePath);
        
        // Create temporary combined markdown file
        const combinedFile = path.join(OUTPUT_DIR, 'combined.md');
        let combinedContent = '';
        
        // Add title page with cover image
        if (hasCover) {
            combinedContent += `<div class="title-page">\n`;
            combinedContent += `<img src="${coverImagePath}" alt="Cover" style="max-width: 100%; height: auto; margin-bottom: 2em;" />\n`;
            combinedContent += `</div>\n\n`;
        }
        combinedContent += `# ${BOOK_TITLE}\n\n`;
        combinedContent += `## 🚧 DRAFT IN PROGRESS - WORK IN PROGRESS 🚧\n\n`;
        combinedContent += `> **⚠️ IMPORTANT NOTICE:** This book is currently a **DRAFT IN PROGRESS**. Content is being actively developed and may contain incomplete sections, placeholder text, or information that requires verification. Please check back regularly for updates and improvements.\n\n`;
        combinedContent += `**Author:** ${BOOK_AUTHOR}\n\n`;
        combinedContent += `**Language:** ${BOOK_LANGUAGE}\n\n`;
        combinedContent += `---\n\n`;
        
        // Combine all chapters
        for (const file of markdownFiles) {
            const chapterContent = await fs.readFile(file, 'utf8');
            combinedContent += chapterContent + '\n\n---\n\n';
        }
        
        await fs.writeFile(combinedFile, combinedContent);
        
        // Build PDF using Pandoc with different engines
        const outputFile = path.join(OUTPUT_DIR, 'watts-wrong.pdf');
        
        // Try different PDF engines in order of preference
        const engines = ['weasyprint', 'prince', 'wkhtmltopdf', 'pdflatex'];
        let success = false;
        let lastError = null;
        
        for (const engine of engines) {
            try {
                console.log(`Trying PDF engine: ${engine}`);
                
                const pandocCommand = [
                    'pandoc',
                    combinedFile,
                    '-o', outputFile,
                    '--pdf-engine', engine,
                    '--toc',
                    '--toc-depth=2',
                    '--metadata', `title="${BOOK_TITLE}"`,
                    '--metadata', `author="${BOOK_AUTHOR}"`,
                    '--metadata', `language=${BOOK_LANGUAGE}`,
                    '--css', path.join(__dirname, '..', 'assets', 'pdf.css')
                ];
                
                // Add engine-specific options for hyperlinks
                if (engine === 'weasyprint') {
                    // WeasyPrint options for better link support
                    pandocCommand.push('--pdf-engine-opt', '--base-url=file://');
                    // Enable hyperlinks in PDF
                    pandocCommand.push('--pdf-engine-opt', '--pdf-forms');
                } else if (engine === 'wkhtmltopdf') {
                    pandocCommand.push('--pdf-engine-opt', '--enable-local-file-access');
                } else if (engine === 'prince') {
                    pandocCommand.push('--pdf-engine-opt', '--baseurl=file://');
                }
                
                // Cover image is embedded in the content, no need for --pdf-cover-image
                
                const commandString = pandocCommand.join(' ');
                console.log(`Running Pandoc for PDF with ${engine}...`);
                execSync(commandString, { stdio: 'inherit' });
                
                // Check if file was created successfully
                if (await fs.pathExists(outputFile)) {
                    console.log(`✅ Successfully used ${engine} engine`);
                    success = true;
                    break;
                }
            } catch (error) {
                console.log(`⚠️ ${engine} failed: ${error.message}`);
                lastError = error;
                continue;
            }
        }
        
        if (!success) {
            throw lastError || new Error('All PDF engines failed');
        }
        
        // Clean up temporary file
        await fs.remove(combinedFile);
        
        console.log(`✅ PDF built successfully: ${outputFile}`);
        
        // Check file size
        const stats = await fs.stat(outputFile);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`📏 File size: ${fileSizeInMB} MB`);
        
        console.log('\n📚 PDF ready for printing and sharing!');
        
    } catch (error) {
        console.error('❌ Error building PDF:', error.message);
        
        if (error.message.includes('pdf')) {
            console.log('\n💡 PDF generation requires a LaTeX installation:');
            console.log('   macOS: brew install --cask mactex');
            console.log('   Ubuntu/Debian: sudo apt-get install texlive-full');
            console.log('   Windows: Install MiKTeX from https://miktex.org/');
        }
        
        process.exit(1);
    }
}

// Run the build
buildPDF(); 