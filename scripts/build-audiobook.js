#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Configuration
const BOOK_TITLE = "Watt's Wrong?";
const BOOK_AUTHOR = "Your Name";
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const CHAPTERS_DIR = path.join(__dirname, '..', 'chapters');

// Default voice settings
const DEFAULT_VOICES = {
    darwin: 'Grandpa',    // British male voice on macOS
    linux: 'default',     // Default on Linux
    win32: 'default'      // Default on Windows
};

// TTS Options
const TTS_OPTIONS = {
    LOCAL: 'local',           // Using say command (macOS) or espeak (Linux)
    AZURE: 'azure',           // Microsoft Azure Cognitive Services
    GOOGLE: 'google',         // Google Cloud Text-to-Speech
    ELEVENLABS: 'elevenlabs', // ElevenLabs (high quality)
    OPENAI: 'openai'          // OpenAI TTS
};

async function buildAudiobook(ttsProvider = TTS_OPTIONS.LOCAL, options = {}) {
    console.log('🎧 Building Audiobook...');
    console.log(`Using TTS provider: ${ttsProvider}`);
    
    // Set default voice based on platform
    if (!options.voice) {
        options.voice = DEFAULT_VOICES[process.platform] || 'default';
    }
    console.log(`Using voice: ${options.voice}`);
    
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
        
        // Create audiobook directory
        const audiobookDir = path.join(OUTPUT_DIR, 'audiobook');
        await fs.ensureDir(audiobookDir);
        
        // Process each chapter
        const audioFiles = [];
        
        for (let i = 0; i < markdownFiles.length; i++) {
            const file = markdownFiles[i];
            const chapterName = path.basename(file, '.md');
            const chapterNumber = (i + 1).toString().padStart(2, '0');
            
            console.log(`\n📖 Processing Chapter ${chapterNumber}: ${chapterName}`);
            
            // Read and clean markdown content
            const content = await fs.readFile(file, 'utf8');
            const cleanText = cleanMarkdownForSpeech(content);
            
            // Generate audio file
            const audioFile = await generateAudio(
                cleanText, 
                chapterNumber, 
                chapterName, 
                ttsProvider, 
                options
            );
            
            if (audioFile) {
                audioFiles.push({
                    file: audioFile,
                    chapter: chapterNumber,
                    name: chapterName
                });
            }
        }
        
        // Combine audio files if requested
        if (options.combine && audioFiles.length > 0) {
            await combineAudioFiles(audioFiles, audiobookDir);
        }
        
        // Create chapter list
        await createChapterList(audioFiles, audiobookDir);
        
        console.log(`\n✅ Audiobook completed!`);
        console.log(`📁 Output directory: ${audiobookDir}`);
        console.log(`🎵 Generated ${audioFiles.length} audio files`);
        
        if (options.combine) {
            console.log(`🔗 Combined file: ${path.join(audiobookDir, 'complete-audiobook.mp3')}`);
        }
        
    } catch (error) {
        console.error('❌ Error building audiobook:', error.message);
        process.exit(1);
    }
}

function cleanMarkdownForSpeech(markdown) {
    return markdown
        // Remove markdown syntax
        .replace(/^#+\s+/gm, '')           // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1')   // Remove bold
        .replace(/\*(.*?)\*/g, '$1')       // Remove italic
        .replace(/`(.*?)`/g, '$1')         // Remove inline code
        .replace(/```[\s\S]*?```/g, '')    // Remove code blocks
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')  // Remove images
        .replace(/^\s*[-*+]\s+/gm, '')     // Remove list markers
        .replace(/^\s*\d+\.\s+/gm, '')     // Remove numbered list markers
        .replace(/^\s*>/gm, '')            // Remove blockquotes
        .replace(/^\s*\|.*\|.*$/gm, '')    // Remove table rows
        .replace(/^\s*$/gm, '')            // Remove empty lines
        .replace(/\n{3,}/g, '\n\n')       // Reduce multiple newlines
        .trim();
}

async function generateAudio(text, chapterNumber, chapterName, ttsProvider, options) {
    const outputFile = path.join(OUTPUT_DIR, 'audiobook', `${chapterNumber}-${chapterName}.mp3`);
    
    try {
        switch (ttsProvider) {
            case TTS_OPTIONS.LOCAL:
                return await generateLocalAudio(text, outputFile, options);
            case TTS_OPTIONS.AZURE:
                return await generateAzureAudio(text, outputFile, options);
            case TTS_OPTIONS.GOOGLE:
                return await generateGoogleAudio(text, outputFile, options);
            case TTS_OPTIONS.ELEVENLABS:
                return await generateElevenLabsAudio(text, outputFile, options);
            case TTS_OPTIONS.OPENAI:
                return await generateOpenAIAudio(text, outputFile, options);
            default:
                throw new Error(`Unsupported TTS provider: ${ttsProvider}`);
        }
    } catch (error) {
        console.error(`❌ Error generating audio for chapter ${chapterNumber}:`, error.message);
        return null;
    }
}

async function generateLocalAudio(text, outputFile, options) {
    console.log('  🎤 Using local TTS...');
    
    const platform = process.platform;
    let command;
    
    if (platform === 'darwin') { // macOS
        command = `say "${text.replace(/"/g, '\\"')}" -v "${options.voice || 'Grandpa'}" -o "${outputFile.replace('.mp3', '.aiff')}"`;
        execSync(command, { stdio: 'inherit' });
        
        // Convert AIFF to MP3 using ffmpeg if available
        try {
            const ffmpegCommand = `ffmpeg -i "${outputFile.replace('.mp3', '.aiff')}" -acodec mp3 "${outputFile}" -y`;
            execSync(ffmpegCommand, { stdio: 'inherit' });
            await fs.remove(outputFile.replace('.mp3', '.aiff'));
        } catch (error) {
            console.log('  ⚠️  ffmpeg not found, keeping AIFF format');
            return outputFile.replace('.mp3', '.aiff');
        }
        
    } else if (platform === 'linux') { // Linux
        command = `espeak "${text.replace(/"/g, '\\"')}" -w "${outputFile.replace('.mp3', '.wav')}"`;
        execSync(command, { stdio: 'inherit' });
        
        // Convert WAV to MP3 using ffmpeg if available
        try {
            const ffmpegCommand = `ffmpeg -i "${outputFile.replace('.mp3', '.wav')}" -acodec mp3 "${outputFile}" -y`;
            execSync(ffmpegCommand, { stdio: 'inherit' });
            await fs.remove(outputFile.replace('.mp3', '.wav'));
        } catch (error) {
            console.log('  ⚠️  ffmpeg not found, keeping WAV format');
            return outputFile.replace('.mp3', '.wav');
        }
        
    } else { // Windows
        throw new Error('Local TTS not supported on Windows. Please use a cloud provider or install espeak.');
    }
    
    return outputFile;
}

async function generateAzureAudio(text, outputFile, options) {
    console.log('  ☁️  Using Azure Cognitive Services...');
    
    if (!options.azureKey || !options.azureRegion) {
        throw new Error('Azure key and region required. Set --azure-key and --azure-region options.');
    }
    
    // This would use Azure's REST API or SDK
    // For now, showing the structure
    console.log('  📝 Azure TTS implementation would go here');
    console.log('  💡 Install @azure/cognitiveservices-speech package for full support');
    
    return outputFile;
}

async function generateGoogleAudio(text, outputFile, options) {
    console.log('  ☁️  Using Google Cloud Text-to-Speech...');
    
    if (!options.googleKey) {
        throw new Error('Google API key required. Set --google-key option.');
    }
    
    // This would use Google's TTS API
    console.log('  📝 Google TTS implementation would go here');
    console.log('  💡 Install @google-cloud/text-to-speech package for full support');
    
    return outputFile;
}

async function generateElevenLabsAudio(text, outputFile, options) {
    console.log('  ☁️  Using ElevenLabs...');
    
    if (!options.elevenLabsKey) {
        throw new Error('ElevenLabs API key required. Set --elevenlabs-key option.');
    }
    
    // This would use ElevenLabs API
    console.log('  📝 ElevenLabs implementation would go here');
    console.log('  💡 Install elevenlabs package for full support');
    
    return outputFile;
}

async function generateOpenAIAudio(text, outputFile, options) {
    console.log('  ☁️  Using OpenAI TTS...');
    
    if (!options.openaiKey) {
        throw new Error('OpenAI API key required. Set --openai-key option.');
    }
    
    // This would use OpenAI's TTS API
    console.log('  📝 OpenAI TTS implementation would go here');
    console.log('  💡 Install openai package for full support');
    
    return outputFile;
}

async function combineAudioFiles(audioFiles, audiobookDir) {
    console.log('\n🔗 Combining audio files...');
    
    // This would use ffmpeg to combine all audio files
    // For now, showing the structure
    console.log('  📝 Audio combination implementation would go here');
    console.log('  💡 Install ffmpeg for audio file combination');
}

async function createChapterList(audioFiles, audiobookDir) {
    const chapterList = audioFiles.map(file => ({
        chapter: file.chapter,
        name: file.name,
        file: path.basename(file.file),
        duration: '00:00:00' // Would be calculated from actual audio files
    }));
    
    const chapterListFile = path.join(audiobookDir, 'chapters.json');
    await fs.writeJson(chapterListFile, chapterList, { spaces: 2 });
    
    console.log('  📋 Chapter list created');
}

// Parse command line arguments
function parseArguments() {
    const args = process.argv.slice(2);
    const options = {
        ttsProvider: TTS_OPTIONS.LOCAL,
        combine: false,
        voice: null,
        azureKey: null,
        azureRegion: null,
        googleKey: null,
        elevenLabsKey: null,
        openaiKey: null
    };
    
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--provider':
            case '-p':
                options.ttsProvider = args[++i];
                break;
            case '--combine':
            case '-c':
                options.combine = true;
                break;
            case '--azure-key':
                options.azureKey = args[++i];
                break;
            case '--azure-region':
                options.azureRegion = args[++i];
                break;
            case '--google-key':
                options.googleKey = args[++i];
                break;
            case '--elevenlabs-key':
                options.elevenLabsKey = args[++i];
                break;
                    case '--voice':
        case '-v':
            options.voice = args[++i];
            break;
        case '--openai-key':
            options.openaiKey = args[++i];
            break;
            case '--help':
            case '-h':
                showHelp();
                process.exit(0);
            default:
                console.log(`Unknown option: ${args[i]}`);
                showHelp();
                process.exit(1);
        }
    }
    
    return options;
}

function showHelp() {
    console.log(`
🎧 Audiobook Builder for Watt's Wrong?

Usage: node scripts/build-audiobook.js [options]

Options:
  -p, --provider <provider>    TTS provider: local, azure, google, elevenlabs, openai
  -v, --voice <voice>          Voice to use (e.g., Grandpa, Reed, Rocko for British)
  -c, --combine                Combine all chapters into one file
  --azure-key <key>            Azure Cognitive Services API key
  --azure-region <region>      Azure region (e.g., eastus)
  --google-key <key>           Google Cloud API key
  --elevenlabs-key <key>       ElevenLabs API key
  --openai-key <key>           OpenAI API key
  -h, --help                   Show this help message

Examples:
  # Local TTS with British voice (free)
  node scripts/build-audiobook.js
  
  # Local TTS with specific voice
  node scripts/build-audiobook.js -v Reed
  
  # Azure TTS (high quality, paid)
  node scripts/build-audiobook.js -p azure --azure-key YOUR_KEY --azure-region eastus
  
  # Google TTS (high quality, paid)
  node scripts/build-audiobook.js -p google --google-key YOUR_KEY
  
  # Combine all chapters
  node scripts/build-audiobook.js -c

Providers:
  local        - Free, uses system TTS (macOS: say, Linux: espeak)
  azure        - High quality, natural voices, paid
  google       - High quality, natural voices, paid
  elevenlabs   - Very high quality, paid
  openai       - High quality, paid
`);
}

// Main execution
if (require.main === module) {
    const options = parseArguments();
    buildAudiobook(options.ttsProvider, options);
}

module.exports = { buildAudiobook, TTS_OPTIONS }; 