# Watt's Wrong?

*A comprehensive guide to what's wrong with Britain's electricity and energy system - perfect for newcomers seeking context and experts wanting to explore beyond their specialty*

## 📖 Read Online

This book is available to read online at: [https://benjaminwatts.github.io/watts-wrong/](https://benjaminwatts.github.io/watts-wrong/)

## 📚 Table of Contents

### Introduction
- [Chapter 1: What's Wrong with Britain's Energy?](chapters/01-introduction.md)

### Part 1: The Generation Mess
- [Chapter 2: Biomass - The Wood Pellet Problem](chapters/02-biomass.md)
        - [Chapter 3: Feed-in Tariffs and ROCs - How Subsidies Went Wrong](chapters/03-feed-in-tariffs-and-rocs.md)
- [Chapter 4: NIMBYs & Onshore Wind Ban - The Planning Disaster](chapters/04-nimbys-wind-ban.md)
- [Chapter 5: Political Instability - Nuclear Flip-Flopping and Policy Chaos](chapters/05-political-instability.md)

### Part 2: The Grid & Infrastructure Problems
- [Chapter 6: Transmission Constraints - Bottlenecks and Bottlenecks](chapters/06-transmission-constraints.md)
- [Chapter 7: Scotland - The North-South Divide](chapters/07-scotland.md)
- [Chapter 8: Regional Privatisation Model - How Fragmentation Hurts](chapters/08-regional-privatisation.md)

### Part 3: The Consumer & Market Failures
- [Chapter 9: Smart Meters Optional - Why the Rollout Failed](chapters/09-smart-meters.md)
- [Chapter 10: Electricity Levies - Hidden Costs Everywhere](chapters/10-electricity-levies.md)
- [Chapter 11: Price Cap - The Sticking Plaster Solution](chapters/11-price-cap.md)
- [Chapter 12: EPCs - Energy Performance Certificates That Don't Work](chapters/12-epcs.md)
- [Chapter 13: RHI vs BUS - Heating Policy Confusion](chapters/13-rhi-vs-bus.md)

### Part 4: The Policy & Pricing Chaos
- [Chapter 14: CfD vs Marginal Pricing - Market Design Disasters](chapters/14-cfd-vs-marginal-pricing.md)
- [Chapter 15: 2022 Subsidies - Emergency Measures That Became Permanent](chapters/15-2022-subsidies.md)
- [Chapter 16: Exercise Duty & Road Pricing - Transport Energy Policy](chapters/16-exercise-duty-road-pricing.md)
- [Chapter 17: Brexit Friction - How Leaving the EU Made Energy Harder](chapters/17-brexit-friction.md)

### Part 5: The Human Factor
- [Chapter 18: 9-5 & School Holidays - Why Timing Matters for Energy](chapters/18-9-5-school-holidays.md)
- [Chapter 19: The Planning Problem - Why Nothing Gets Built](chapters/19-planning-problem.md)

### Conclusion
- [Chapter 20: How to Fix Britain's Energy System](chapters/20-conclusion.md)

## 🚀 Quick Start

### Reading Online
Simply browse the chapters above or visit the [GitHub Pages site](https://yourusername.github.io/watts-wrong/) for the best reading experience.

### Building for Kindle/EPUB/PDF/Audiobook/Website
To build the book for different formats:

```bash
# Install dependencies
npm install

# Build EPUB
npm run build:epub

# Build Kindle (MOBI)
npm run build:kindle

# Build PDF
npm run build:pdf

# Build Audiobook
npm run build:audiobook

# Build Website
npm run build:website

# Build all formats
npm run build:complete
```

The built files will be available in the `dist/` directory.

## 📝 Contributing

This book is written in Markdown format. To contribute:

1. Fork the repository
2. Create a feature branch
3. Edit the Markdown files in the `chapters/` directory
4. Submit a pull request

## 🛠️ Development

### Project Structure
```
watts-wrong/
├── chapters/          # Markdown chapter files
├── assets/           # Images, diagrams, CSS files
├── scripts/          # Build scripts
├── dist/             # Built output files
├── README.md         # This file (also serves as online reader)
└── package.json      # Build dependencies
```

### Adding New Chapters
1. Create a new Markdown file in the `chapters/` directory
2. Follow the naming convention: `XX-chapter-title.md`
3. Update the table of contents in this README
4. The build scripts will automatically include new chapters

## 📖 Chapter Format

Each chapter should follow this structure:

```markdown
# Chapter Title

## Introduction
Brief overview of what this chapter covers.

## Main Content
Your chapter content goes here.

## Summary
Key takeaways from this chapter.

## Next Steps
What readers should do next or what's coming in the next chapter.
```

## 🔧 Build System

The build system uses:
- **Pandoc**: For converting Markdown to EPUB/MOBI/PDF
- **Node.js**: For build automation
- **GitHub Actions**: For automated builds and deployments
- **Text-to-Speech**: For generating audiobooks (local and cloud options)
- **CSS Styling**: For consistent formatting across all formats

## 📱 Publishing

### GitHub Pages
The book automatically deploys to GitHub Pages when you push to the main branch.

### Kindle Publishing
1. Build the MOBI file: `npm run build:kindle`
2. Upload to Kindle Direct Publishing (KDP)
3. Follow Amazon's publishing guidelines

### PDF Publishing
1. Build the PDF: `npm run build:pdf`
2. Perfect for:
   - Printing and physical distribution
   - Academic submissions
   - Professional presentations
   - Offline reading

### Audiobook Publishing
1. Build the audiobook: `npm run build:audiobook`
2. Choose your TTS provider:
   - **Local**: Free, uses system TTS (macOS: say, Linux: espeak)
   - **Cloud**: High quality, paid services (Azure, Google, ElevenLabs, OpenAI)
3. Upload to audiobook platforms (Audible, etc.)

## 📄 License

[Your chosen license here]

---

*Built with ❤️ using Markdown and open source tools* 