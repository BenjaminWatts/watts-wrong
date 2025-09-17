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
        
        // Create temporary markdown file with cover image first
        const combinedFile = path.join(OUTPUT_DIR, 'combined.md');
        let combinedContent = '';
        
        // Add cover image first as markdown
        if (hasCover) {
            combinedContent += `![Cover](${coverImagePath})\n\n`;
            combinedContent += `\\newpage\n\n`;
        }
        
        // Add title and draft notice
        combinedContent += `# ${BOOK_TITLE}\n\n`;
        combinedContent += `## 🚧 DRAFT IN PROGRESS - WORK IN PROGRESS 🚧\n\n`;
        combinedContent += `> **⚠️ IMPORTANT NOTICE:** This book is currently a **DRAFT IN PROGRESS**. Content is being actively developed and may contain incomplete sections, placeholder text, or information that requires verification. Please check back regularly for updates and improvements.\n\n`;
        combinedContent += `**Author:** ${BOOK_AUTHOR}\n\n`;
        combinedContent += `**Language:** ${BOOK_LANGUAGE}\n\n`;
        combinedContent += `\\newpage\n\n`;

        // Add manual table of contents
        combinedContent += `# Table of Contents\n\n`;
        markdownFiles.forEach((file, index) => {
            const filename = path.basename(file, '.md');
            combinedContent += `${index + 1}. [${filename}](#chapter-${index + 1})\n`;
        });
        combinedContent += `\n\\newpage\n\n`;

        // Combine all chapters
        for (let index = 0; index < markdownFiles.length; index++) {
            const file = markdownFiles[index];
            const chapterContent = await fs.readFile(file, 'utf8');
            // Add chapter anchor
            combinedContent += `<div id="chapter-${index + 1}"></div>\n\n`;
            combinedContent += chapterContent + '\n\n\\newpage\n\n';
        }

        await fs.writeFile(combinedFile, combinedContent);
        
        // Build PDF using Pandoc with different engines
        const outputFile = path.join(OUTPUT_DIR, 'watts-wrong.pdf');
        
    // Try different PDF engines in order of preference
    const engines = ['prince', 'wkhtmltopdf', 'weasyprint', 'pdflatex'];
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
                    '--css', path.join(__dirname, '..', 'assets', 'pdf.css')
                ];
                
                // Cover image is embedded in HTML, no need for separate option
                
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
                
                // Cover image is embedded in the content
                
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
        
        // Clean up temporary file (commented out for debugging)
        // await fs.remove(combinedFile);
        
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