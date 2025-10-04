#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

// Image optimization script for social media sharing
// This script creates optimized versions of the cover image for different platforms

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const COVERS_DIR = path.join(ASSETS_DIR, 'covers');
const SOURCE_IMAGE = path.join(COVERS_DIR, 'watts-wrong-cover.png');

async function createSocialMediaImages() {
    console.log('🖼️  Creating optimized social media images...');
    
    try {
        // Check if source image exists
        if (!await fs.pathExists(SOURCE_IMAGE)) {
            throw new Error(`Source image not found: ${SOURCE_IMAGE}`);
        }
        
        // Create social media optimized versions
        const socialImages = [
            {
                name: 'watts-wrong-social-og.png',
                width: 1200,
                height: 630,
                description: 'Open Graph (Facebook, LinkedIn) - 1200x630px'
            },
            {
                name: 'watts-wrong-social-twitter.png', 
                width: 1200,
                height: 675,
                description: 'Twitter Card - 1200x675px'
            },
            {
                name: 'watts-wrong-social-square.png',
                width: 600,
                height: 600,
                description: 'Square format - 600x600px'
            }
        ];
        
        console.log('📝 Note: This script creates placeholder files.');
        console.log('🖼️  To create actual optimized images, you need to:');
        console.log('   1. Use an image editor (Photoshop, GIMP, Canva, etc.)');
        console.log('   2. Or use online tools like:');
        console.log('      - https://www.canva.com/');
        console.log('      - https://www.remove.bg/');
        console.log('      - https://squoosh.app/');
        console.log('   3. Or use command-line tools like ImageMagick:');
        console.log('');
        
        for (const image of socialImages) {
            const outputPath = path.join(COVERS_DIR, image.name);
            
            // Create a placeholder file with instructions
            const instructions = `# ${image.description}
# Source: ${SOURCE_IMAGE}
# Target dimensions: ${image.width}x${image.height} pixels
# 
# Instructions for creating this image:
# 1. Open the source image in your image editor
# 2. Crop/resize to ${image.width}x${image.height} pixels
# 3. Ensure the main elements (lightbulb, wind turbines, text) are visible
# 4. Save as PNG with good quality
# 5. Optimize file size (aim for < 500KB)
#
# Recommended tools:
# - Canva: https://www.canva.com/
# - GIMP: https://www.gimp.org/
# - ImageMagick: convert ${SOURCE_IMAGE} -resize ${image.width}x${image.height}! ${image.name}
# - Squoosh: https://squoosh.app/
`;
            
            await fs.writeFile(outputPath + '.instructions.txt', instructions);
            console.log(`✅ Created instructions for: ${image.name}`);
        }
        
        console.log('');
        console.log('🎯 Next steps:');
        console.log('1. Create the optimized images using the instructions above');
        console.log('2. Update the SEO_CONFIG in build-website.js with new image URLs');
        console.log('3. Test social media sharing with the new images');
        
    } catch (error) {
        console.error('❌ Error creating social media images:', error.message);
        process.exit(1);
    }
}

// Run the script
createSocialMediaImages();
