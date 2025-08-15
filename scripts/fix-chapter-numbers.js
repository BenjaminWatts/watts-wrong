#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const chapters = [
    { filename: '01-introduction.md', number: '1', title: 'What\'s Wrong with Britain\'s Energy?' },
    { filename: '02-biomass.md', number: '2', title: 'Biomass - The Wood Pellet Problem' },
    { filename: '03-feed-in-tariffs.md', number: '3', title: 'Feed-in Tariffs & RO - How Subsidies Went Wrong' },
    { filename: '04-nimbys-wind-ban.md', number: '4', title: 'NIMBYs & Onshore Wind Ban - The Planning Disaster' },
    { filename: '05-political-instability.md', number: '5', title: 'Political Instability - Nuclear Flip-Flopping and Policy Chaos' },
    { filename: '06-transmission-constraints.md', number: '6', title: 'Transmission Constraints - Bottlenecks and Bottlenecks' },
    { filename: '07-scotland.md', number: '7', title: 'Scotland - The North-South Divide' },
    { filename: '08-regional-privatisation.md', number: '8', title: 'Regional Privatisation Model - How Fragmentation Hurts' },
    { filename: '09-smart-meters.md', number: '9', title: 'Smart Meters Optional - Why the Rollout Failed' },
    { filename: '10-electricity-levies.md', number: '10', title: 'Electricity Levies - Hidden Costs Everywhere' },
    { filename: '11-price-cap.md', number: '11', title: 'Price Cap - The Sticking Plaster Solution' },
    { filename: '12-epcs.md', number: '12', title: 'EPCs - Energy Performance Certificates That Don\'t Work' },
    { filename: '13-rhi-vs-bus.md', number: '13', title: 'RHI vs BUS - Heating Policy Confusion' },
    { filename: '14-cfd-vs-marginal-pricing.md', number: '14', title: 'CfD vs Marginal Pricing - Market Design Disasters' },
    { filename: '15-2022-subsidies.md', number: '15', title: '2022 Subsidies - Emergency Measures That Became Permanent' },
    { filename: '16-exercise-duty-road-pricing.md', number: '16', title: 'Exercise Duty & Road Pricing - Transport Energy Policy' },
    { filename: '17-brexit-friction.md', number: '17', title: 'Brexit Friction - How Leaving the EU Made Energy Harder' },
    { filename: '18-9-5-school-holidays.md', number: '18', title: '9-5 & School Holidays - Why Timing Matters for Energy' },
    { filename: '19-planning-problem.md', number: '19', title: 'The Planning Problem - Why Nothing Gets Built' },
    { filename: '20-conclusion.md', number: '20', title: 'How to Fix Britain\'s Energy System' }
];

const chaptersDir = path.join(__dirname, '..', 'chapters');

async function fixChapterNumbers() {
    console.log('🔢 Fixing chapter numbers...');
    
    for (const chapter of chapters) {
        const filePath = path.join(chaptersDir, chapter.filename);
        
        try {
            let content = await fs.readFile(filePath, 'utf8');
            
            // Fix the chapter title line
            content = content.replace(
                /^# Chapter \d+: .*$/m,
                `# Chapter ${chapter.number}: ${chapter.title}`
            );
            
            // Fix any other references to chapter numbers in the content
            content = content.replace(
                new RegExp(`Chapter \\d+:`, 'g'),
                `Chapter ${chapter.number}:`
            );
            
            await fs.writeFile(filePath, content);
            console.log(`  ✅ Fixed: ${chapter.filename}`);
            
        } catch (error) {
            console.error(`  ❌ Error fixing ${chapter.filename}:`, error.message);
        }
    }
    
    console.log('\n🎉 Chapter numbers fixed!');
}

fixChapterNumbers(); 