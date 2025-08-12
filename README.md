# Watt's Wrong?

*A book about [your book's topic/theme]*

## 📖 Read Online

This book is available to read online at: [https://benjaminwatts.github.io/watts-wrong/](https://benjaminwatts.github.io/watts-wrong/)

## 📚 Table of Contents

- [Chapter 1: Introduction](chapters/01-introduction.md)
- [Chapter 2: Getting Started](chapters/02-getting-started.md)
- [Chapter 3: Core Concepts](chapters/03-core-concepts.md)
- [Chapter 4: Advanced Topics](chapters/04-advanced-topics.md)
- [Chapter 5: Conclusion](chapters/05-conclusion.md)

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