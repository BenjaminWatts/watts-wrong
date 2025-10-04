#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

// Script to help create GitHub issues from templates
// This creates a formatted list that can be copy-pasted to GitHub

async function generateIssueCreationGuide() {
    console.log('🔧 GitHub Issue Creation Helper');
    console.log('================================\n');
    
    const issuesDir = path.join(__dirname, '..', '.github', 'ISSUE_TEMPLATE');
    const files = await fs.readdir(issuesDir);
    
    const issueFiles = files.filter(file => file.endsWith('.md') && file !== 'issue_template.md');
    
    console.log('📝 To create GitHub issues, go to: https://github.com/BenjaminWatts/watts-wrong/issues/new\n');
    
    for (const file of issueFiles) {
        const filePath = path.join(issuesDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Extract key information from the template
        const titleMatch = content.match(/# (.+)/);
        const sourceMatch = content.match(/\*\*Source\*\*: (.+)/);
        const priorityMatch = content.match(/\*\*Priority\*\*: (.+)/);
        const typeMatch = content.match(/\*\*Type\*\*: (.+)/);
        
        const title = titleMatch ? titleMatch[1] : 'Untitled Issue';
        const source = sourceMatch ? sourceMatch[1] : 'Unknown source';
        const priority = priorityMatch ? priorityMatch[1] : 'Unknown priority';
        const type = typeMatch ? typeMatch[1] : 'Unknown type';
        
        console.log(`🎯 ${title}`);
        console.log(`   Source: ${source}`);
        console.log(`   Priority: ${priority} | Type: ${type}`);
        console.log(`   File: ${file}`);
        console.log('');
        
        // Create a simplified version for copy-paste
        const simplifiedContent = content
            .replace(/^# .+$/m, `# ${title}`)
            .replace(/^## 📋 Issue Summary$/m, '## Summary')
            .replace(/^## 🎯 Problem Statement$/m, '## Problem')
            .replace(/^## 📝 Current Status$/m, '## Current Status')
            .replace(/^## 🔍 What Needs to Be Done$/m, '## Tasks')
            .replace(/^## 📊 Expected Deliverables$/m, '## Deliverables')
            .replace(/^## 🏷️ Labels$/m, '## Labels')
            .replace(/^## 👥 Assignee$/m, '## Assignee')
            .replace(/^## 📅 Target Completion$/m, '## Timeline')
            .replace(/^## 🔗 Related Issues$/m, '## Related')
            .replace(/^## 💬 Discussion$/m, '## Notes');
        
        // Save simplified version
        const simplifiedFile = file.replace('.md', '-simplified.md');
        const outputPath = path.join(__dirname, '..', simplifiedFile);
        await fs.writeFile(outputPath, simplifiedContent);
        
        console.log(`   📄 Simplified version saved as: ${simplifiedFile}`);
        console.log(`   🔗 Copy content from ${simplifiedFile} to GitHub issue form\n`);
    }
    
    console.log('🚀 Quick Start Instructions:');
    console.log('1. Go to https://github.com/BenjaminWatts/watts-wrong/issues/new');
    console.log('2. Choose "Get started" for a blank issue');
    console.log('3. Copy the content from the *-simplified.md files');
    console.log('4. Add appropriate labels and assignee');
    console.log('5. Submit the issue');
    console.log('\n📋 Or use the GitHub CLI if you have it installed:');
    console.log('   gh issue create --title "Title" --body-file simplified-file.md');
}

// Run the script
generateIssueCreationGuide().catch(console.error);
