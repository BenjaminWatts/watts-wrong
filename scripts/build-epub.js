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

async function buildEPUB() {
    console.log('📚 Building EPUB...');
    
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
        
        // Add cover page first (if available)
        if (await fs.pathExists(path.join(__dirname, '..', 'assets', 'covers', 'watts-wrong-cover.png'))) {
            combinedContent += `<div class="cover-page">\n`;
            combinedContent += `![Cover](${path.join(__dirname, '..', 'assets', 'covers', 'watts-wrong-cover.png')})\n`;
            combinedContent += `</div>\n\n`;
            combinedContent += `\\newpage\n\n`; // Force page break after cover
        }
        
        // Add title page content
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
        
        // Build EPUB using Pandoc
        const outputFile = path.join(OUTPUT_DIR, 'watts-wrong.epub');
        
        // Check if cover image exists
        const coverImagePath = path.join(__dirname, '..', 'assets', 'covers', 'watts-wrong-cover.png');
        const hasCover = await fs.pathExists(coverImagePath);
        
        const pandocCommand = [
            'pandoc',
            combinedFile,
            '-o', outputFile,
            '--toc',
            '--toc-depth=2',
            '--metadata', `title="${BOOK_TITLE}"`,
            '--metadata', `author="${BOOK_AUTHOR}"`,
            '--metadata', `language=${BOOK_LANGUAGE}`,
            '--css', path.join(__dirname, '..', 'assets', 'epub.css')
        ];
        
        // Add cover image if it exists
        if (hasCover) {
            pandocCommand.push('--epub-cover-image', coverImagePath);
        }
        
        const commandString = pandocCommand.join(' ');
        
        console.log('Running Pandoc...');
        execSync(commandString, { stdio: 'inherit' });
        
        // Clean up temporary file
        await fs.remove(combinedFile);
        
        console.log(`✅ EPUB built successfully: ${outputFile}`);
        
        // Check file size
        const stats = await fs.stat(outputFile);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`📏 File size: ${fileSizeInMB} MB`);
        
    } catch (error) {
        console.error('❌ Error building EPUB:', error.message);
        
        if (error.message.includes('pandoc')) {
            console.log('\n💡 Make sure Pandoc is installed:');
            console.log('   macOS: brew install pandoc');
            console.log('   Ubuntu/Debian: sudo apt-get install pandoc');
            console.log('   Windows: Download from https://pandoc.org/installing.html');
        }
        
        process.exit(1);
    }
}

// Run the build
buildEPUB(); 