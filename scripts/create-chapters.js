#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const chapters = [
    { number: '03', filename: '03-feed-in-tariffs.md', title: 'Feed-in Tariffs & RO - How Subsidies Went Wrong' },
    { number: '04', filename: '04-nimbys-wind-ban.md', title: 'NIMBYs & Onshore Wind Ban - The Planning Disaster' },
    { number: '05', filename: '05-political-instability.md', title: 'Political Instability - Nuclear Flip-Flopping and Policy Chaos' },
    { number: '06', filename: '06-transmission-constraints.md', title: 'Transmission Constraints - Bottlenecks and Bottlenecks' },
    { number: '07', filename: '07-scotland.md', title: 'Scotland - The North-South Divide' },
    { number: '08', filename: '08-regional-privatisation.md', title: 'Regional Privatisation Model - How Fragmentation Hurts' },
    { number: '09', filename: '09-smart-meters.md', title: 'Smart Meters Optional - Why the Rollout Failed' },
    { number: '10', filename: '10-electricity-levies.md', title: 'Electricity Levies - Hidden Costs Everywhere' },
    { number: '11', filename: '11-price-cap.md', title: 'Price Cap - The Sticking Plaster Solution' },
    { number: '12', filename: '12-epcs.md', title: 'EPCs - Energy Performance Certificates That Don\'t Work' },
    { number: '13', filename: '13-rhi-vs-bus.md', title: 'RHI vs BUS - Heating Policy Confusion' },
    { number: '14', filename: '14-cfd-vs-marginal-pricing.md', title: 'CfD vs Marginal Pricing - Market Design Disasters' },
    { number: '15', filename: '15-2022-subsidies.md', title: '2022 Subsidies - Emergency Measures That Became Permanent' },
    { number: '16', filename: '16-exercise-duty-road-pricing.md', title: 'Exercise Duty & Road Pricing - Transport Energy Policy' },
    { number: '17', filename: '17-brexit-friction.md', title: 'Brexit Friction - How Leaving the EU Made Energy Harder' },
    { number: '18', filename: '18-9-5-school-holidays.md', title: '9-5 & School Holidays - Why Timing Matters for Energy' },
    { number: '19', filename: '19-planning-problem.md', title: 'The Planning Problem - Why Nothing Gets Built' }
];

const chaptersDir = path.join(__dirname, '..', 'chapters');

async function createChapters() {
    console.log('📚 Creating placeholder chapters...');
    
    for (const chapter of chapters) {
        const filePath = path.join(chaptersDir, chapter.filename);
        
        const content = `# Chapter ${chapter.number}: ${chapter.title}

## Introduction

[This chapter will explore ${chapter.title.toLowerCase()} in Britain's energy system.]

## Key Issues

- [Issue 1]
- [Issue 2]
- [Issue 3]

## What Went Wrong

[Analysis of the problem and its causes.]

## The Impact

[How this affects consumers, the economy, and the environment.]

## What Should Happen

[Potential solutions and policy recommendations.]

## Summary

[Key takeaways from this chapter.]

## Next Steps

[What the next chapter will cover.]

---

*This chapter is a placeholder and will be expanded with full content.*`;

        await fs.writeFile(filePath, content);
        console.log(`  ✅ Created: ${chapter.filename}`);
    }
    
    console.log(`\n🎉 Created ${chapters.length} placeholder chapters!`);
    console.log('📝 Edit each chapter file to add your content.');
}

createChapters(); 