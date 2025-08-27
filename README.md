# Watt's Wrong?

*A comprehensive guide to what's wrong with Britain's electricity and energy system - perfect for newcomers seeking context and experts wanting to explore beyond their specialty*

[![Build and Deploy](https://github.com/benjaminwatts/watts-wrong/workflows/Build%20and%20Deploy%20Book/badge.svg)](https://github.com/benjaminwatts/watts-wrong/actions)
[![Build Assets](https://github.com/benjaminwatts/watts-wrong/workflows/Build%20Downloadable%20Assets/badge.svg)](https://github.com/benjaminwatts/watts-wrong/actions)
[![Deploy to GitHub Pages](https://github.com/benjaminwatts/watts-wrong/workflows/Build%20and%20Deploy%20Book/badge.svg?branch=main)](https://benjaminwatts.github.io/watts-wrong/)

## 📖 Read Online

This book is available to read online at: [https://benjaminwatts.github.io/watts-wrong/](https://benjaminwatts.github.io/watts-wrong/)

## 📥 Download Latest Builds

All formats can be built locally using the provided scripts:

### 🚀 Quick Downloads
- **[📚 Ebooks](https://github.com/benjaminwatts/watts-wrong/tree/main/dist)** - EPUB and MOBI files
- **[🎧 Audiobook](https://github.com/benjaminwatts/watts-wrong/tree/main/dist/audiobook)** - Complete audiobook archive  
- **[🌐 Website](https://github.com/benjaminwatts/watts-wrong/tree/main/dist/website)** - Read online

> **Note:** To build these files locally, run `npm run build:complete` after installing dependencies with `npm install`

### 📋 How to Download

#### Option 1: Build Locally (Recommended)
1. Clone this repository: `git clone https://github.com/benjaminwatts/watts-wrong.git`
2. Install dependencies: `npm install`
3. Build all formats: `npm run build:complete`
4. Find your files in the `dist/` directory

#### Option 2: Download Built Files
The built files are available in the [dist/](https://github.com/benjaminwatts/watts-wrong/tree/main/dist) directory:
- **EPUB**: `dist/watts-wrong.epub` - For most e-readers
- **MOBI**: `dist/watts-wrong.mobi` - For Kindle devices
- **Website**: `dist/website/` - Read online in your browser

*💡 For PDF generation, you'll need LaTeX installed: `brew install --cask mactex` (macOS) or `sudo apt-get install texlive-full` (Ubuntu/Debian)*

## 📚 Table of Contents

### Introduction
- [Chapter 1: What's Wrong with Britain's Energy?](chapters/01-introduction.md)

### Part 1: The Generation Mess
- [Chapter 2: Biomass - The Wood Pellet Problem](chapters/02-biomass.md)
        - [Chapter 3: Feed-in Tariffs and ROCs - How Subsidies Went Wrong](chapters/03-feed-in-tariffs-and-rocs.md)
- [Chapter 4: NIMBYs & Onshore Wind Ban - The Planning Disaster](chapters/04-nimbys-wind-ban.md)
- [Chapter 5: Nuclear](chapters/05-nuclear.md)

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
- [Chapter 21: Shale Gas - A Missed Opportunity](chapters/21-shale-gas.md)

## 🚀 Quick Start

### Reading Online
Simply browse the chapters above or visit the [GitHub Pages site](https://benjaminwatts.github.io/watts-wrong/) for the best reading experience.

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

## 🔧 Build System

The build system uses:
- **Pandoc**: For converting Markdown to EPUB/MOBI/PDF
- **Node.js**: For build automation
- **Build Scripts**: For automated local builds and deployments
- **Text-to-Speech**: For generating audiobooks (local and cloud options)
- **CSS Styling**: For consistent formatting across all formats

### 🚀 Local Builds
Run these commands to build all formats:
- ✅ Website build: `npm run build:website`
- ✅ EPUB generation: `npm run build:epub`
- ✅ MOBI generation: `npm run build:kindle`
- ✅ PDF generation: `npm run build:pdf` (requires LaTeX)
- ✅ Audiobook creation: `npm run build:audiobook`
- ✅ All formats at once: `npm run build:complete`

## 📱 Publishing

### GitHub Pages
The book automatically deploys to GitHub Pages when you push to the main branch.

### Kindle Publishing
1. Build the MOBI file: `npm run build:kindle`
2. Upload to Kindle Direct Publishing (KDP)
3. Follow Amazon's publishing guidelines

### PDF Publishing
1. **Prerequisite**: Install LaTeX first:
   - macOS: `brew install --cask mactex`
   - Ubuntu/Debian: `sudo apt-get install texlive-full`
   - Windows: Install MiKTeX from https://miktex.org/
2. Build the PDF: `npm run build:pdf`
3. Perfect for:
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

This work is licensed under the [MIT License](LICENSE) - feel free to use, modify, and distribute as long as you include the original license and attribution.

## 🌟 Features

- **📱 Responsive Design** - Optimized for all devices
- **🎧 Audiobook Generation** - Multiple TTS options (local and cloud)
- **📚 Multi-format Export** - EPUB, MOBI, PDF, and website
- **🤖 Automated Builds** - Build scripts handle everything locally
- **📖 Markdown Source** - Easy to contribute and modify
- **🌐 GitHub Pages** - Instant online publishing

---

*Built with ❤️ using Markdown and open source tools* 