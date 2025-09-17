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

> **📥 Download Options** - Multiple ways to get the book

| Format | Size | Description | Download Method |
|--------|------|-------------|-----------------|
| 📚 **EPUB** | 3.2 MB | For most e-readers and mobile devices | [⬇️ Direct Download](https://github.com/BenjaminWatts/watts-wrong/raw/main/dist/watts-wrong.epub) or [📁 Browse Files](https://github.com/BenjaminWatts/watts-wrong/tree/main/dist) |
| 📱 **MOBI** | 266 KB | For Amazon Kindle devices | [⬇️ Direct Download](https://github.com/BenjaminWatts/watts-wrong/raw/main/dist/watts-wrong.mobi) or [📁 Browse Files](https://github.com/BenjaminWatts/watts-wrong/tree/main/dist) |
| 📄 **PDF** | 3.5 MB | For printing and desktop reading | [⬇️ Direct Download](https://github.com/BenjaminWatts/watts-wrong/raw/main/dist/watts-wrong.pdf) or [📁 Browse Files](https://github.com/BenjaminWatts/watts-wrong/tree/main/dist) |
| 🎧 **Audiobook** | ~50 MB | Complete audiobook archive | [📁 Browse Files](https://github.com/BenjaminWatts/watts-wrong/tree/main/dist/audiobook) |
| 🌐 **Website** | - | Read online with full formatting | [🌐 Read Online](https://benjaminwatts.github.io/watts-wrong/) |

> **💡 If direct downloads don't work:**
> 1. **Browse the [dist/ directory](https://github.com/BenjaminWatts/watts-wrong/tree/main/dist)** and click on individual files
> 2. **Build locally**: Run `npm run build:complete` after installing dependencies with `npm install`
> 3. **Clone the repo**: `git clone https://github.com/BenjaminWatts/watts-wrong.git` and build your own copies

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
- [Chapter 1: Watt's Wrong with Britain's Energy?](chapters/01-introduction.md) - Welcome and overview

### Part 1: The Generation Mess
- [Chapter 2: Biomass](chapters/02-biomass.md) - The biomass energy problem
- [Chapter 3: Feed-in Tariffs and ROCs](chapters/03-feed-in-tariffs-and-rocs.md) - Renewable energy subsidies
- [Chapter 4: North-South and NIMBYs](chapters/04-north-south-and-nimbys.md) - Geographic and political opposition to energy infrastructure
- [Chapter 5: Nuclear](chapters/05-nuclear.md) - Nuclear power policy and development

### Part 2: The Grid & Infrastructure Problems
- [Chapter 8: Regional Privatisation](chapters/08-regional-privatisation.md) - Market fragmentation

### Part 3: The Consumer & Market Failures
- [Chapter 9: Smart Meters](chapters/09-smart-meters.md) - Digital infrastructure rollout
- [Chapter 10: Electricity Levies](chapters/10-electricity-levies.md) - Hidden costs and taxes
- [Chapter 11: Price Cap](chapters/11-price-cap.md) - Energy price regulation
- [Chapter 12: EPCs](chapters/12-epcs.md) - Energy Performance Certificates
- [Chapter 13: RHI vs Bus](chapters/13-rhi-vs-bus.md) - Renewable Heat Incentive comparison

### Part 4: The Policy & Pricing Chaos
- [Chapter 14: CFD vs Marginal Pricing](chapters/14-cfd-vs-marginal-pricing.md) - Energy market mechanisms
- [Chapter 15: Flexibility, Balancing and Storage](chapters/15-flexibility-balancing-storage.md) - The grid's hidden challenges and balancing mechanisms
- [Chapter 16: Exercise Duty and Road Pricing](chapters/16-exercise-duty-road-pricing.md) - Transport energy policy
- [Chapter 17: Brexit Friction](chapters/17-brexit-friction.md) - EU exit impacts on energy

### Part 5: The Human Factor
- [Chapter 18: Interest Rates](chapters/18-interest-rates.md) - Impact of interest rates on energy investment

### Conclusion
- [Chapter 19: Shale Gas - A Missed Opportunity](chapters/19-shale-gas.md) - Economic benefits, environmental considerations, and political factors
- [Chapter 20: Power Versus Other Sectors](chapters/20-power-versus-other-sectors.md) - Energy sector competition and policy priorities

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

## 🔧 Chapter Development Priorities

### 🚨 High Priority - Needs Significant Work
- **[Chapter 12: EPCs](chapters/12-epcs.md)** - Incomplete, needs completion of missing sections and data
- **[Chapter 13: RHI vs Bus](chapters/13-rhi-vs-bus.md)** - Needs expansion and completion
- **[Chapter 14: CFD vs Marginal Pricing](chapters/14-cfd-vs-marginal-pricing.md)** - Missing chapter (file not found)

### 🔄 Medium Priority - Needs Enhancement
- **[Chapter 18: Interest Rates](chapters/18-interest-rates.md)** - Needs expansion with more analysis
- **[Chapter 20: Power Versus Other Sectors](chapters/20-power-versus-other-sectors.md)** - Needs development

### ✅ Good Quality - Minor Improvements Needed
- **[Chapter 19: Shale Gas](chapters/19-shale-gas.md)** - Recently enhanced, good quality
- **[Chapter 10: Electricity Levies](chapters/10-electricity-levies.md)** - Well-developed
- **[Chapter 17: Brexit Friction](chapters/17-brexit-friction.md)** - Good content

### ✅ Recently Created
- **[Chapter 15: Flexibility, Balancing and Storage](chapters/15-flexibility-balancing-storage.md)** - New comprehensive chapter on grid flexibility challenges

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