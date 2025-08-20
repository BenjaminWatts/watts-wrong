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
        
        // Create temporary combined markdown file
        const combinedFile = path.join(OUTPUT_DIR, 'combined.md');
        let combinedContent = '';
        
        // Add title page
        combinedContent += `# ${BOOK_TITLE}\n\n`;
        combinedContent += `**Author:** ${BOOK_AUTHOR}\n\n`;
        combinedContent += `**Language:** ${BOOK_LANGUAGE}\n\n`;
        combinedContent += `---\n\n`;
        
        // Combine all chapters
        for (const file of markdownFiles) {
            const chapterContent = await fs.readFile(file, 'utf8');
            combinedContent += chapterContent + '\n\n---\n\n';
        }
        
        await fs.writeFile(combinedFile, combinedContent);
        
        // Check if cover image exists
        const coverImagePath = path.join(__dirname, '..', 'assets', 'cover.jpg');
        const hasCover = await fs.pathExists(coverImagePath);
        
        // Build PDF using Pandoc
        const outputFile = path.join(OUTPUT_DIR, 'watts-wrong.pdf');
        
        const pandocCommand = [
            'pandoc',
            combinedFile,
            '-o', outputFile,
            '--toc',
            '--toc-depth=2',
            '--metadata', `title="${BOOK_TITLE}"`,
            '--metadata', `author="${BOOK_AUTHOR}"`,
            '--metadata', `language=${BOOK_LANGUAGE}`,
            '--css', path.join(__dirname, '..', 'assets', 'pdf.css')
        ];
        
        // Add cover image if it exists
        if (hasCover) {
            pandocCommand.push('--pdf-cover-image', coverImagePath);
        }
        
        const commandString = pandocCommand.join(' ');
        
        console.log('Running Pandoc for PDF...');
        execSync(commandString, { stdio: 'inherit' });
        
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