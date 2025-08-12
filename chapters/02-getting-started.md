# Chapter 2: Getting Started

## Introduction

Now that we have the foundation from Chapter 1, let's get our hands dirty and start working with [your topic]. In this chapter, we'll set up our environment, create our first project, and understand the basic workflow.

## Setting Up Your Environment

Before we can start building, we need to ensure our development environment is properly configured.

### Prerequisites

First, let's verify you have the necessary tools installed:

```bash
# Check if Node.js is installed
node --version

# Check if npm is available
npm --version

# Check if Git is installed
git --version
```

If any of these commands fail, you'll need to install the missing tools:

- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)

### Installing Dependencies

Once your environment is ready, let's install the project dependencies:

```bash
# Navigate to your project directory
cd watts-wrong

# Install dependencies
npm install
```

## Your First Project

Let's create a simple example to get you familiar with the concepts we'll be exploring.

### Step 1: Create a Basic Structure

```bash
# Create a new directory for your first project
mkdir my-first-project
cd my-first-project

# Initialize a new project
npm init -y
```

### Step 2: Add Your First File

Create a file called `hello.js`:

```javascript
console.log("Hello from Watt's Wrong!");
console.log("This is my first project!");

// Basic function example
function greet(name) {
    return `Welcome, ${name}!`;
}

console.log(greet("Reader"));
```

### Step 3: Run Your Project

```bash
# Execute your JavaScript file
node hello.js
```

You should see output similar to:
```
Hello from Watt's Wrong!
This is my first project!
Welcome, Reader!
```

## Understanding the Basics

Now that we have something running, let's understand what we just did:

### What is Node.js?
Node.js is a JavaScript runtime that allows you to execute JavaScript code outside of a web browser. It's perfect for building applications and scripts.

### What is npm?
npm (Node Package Manager) is a tool that helps you manage dependencies and scripts for your projects. It's the default package manager for Node.js.

### Project Structure
Your project now has:
- `package.json`: Configuration file for your project
- `hello.js`: Your source code
- `node_modules/`: Directory containing installed dependencies (created when you run `npm install`)

## Common Commands

Here are some essential commands you'll use frequently:

```bash
# Install a package
npm install package-name

# Install a development dependency
npm install --save-dev package-name

# Run scripts defined in package.json
npm run script-name

# Update packages
npm update

# Check for outdated packages
npm outdated
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: "Command not found: node"
**Solution**: Install Node.js from the official website

**Issue**: "Permission denied" when installing packages globally
**Solution**: Use `sudo npm install -g package-name` (on macOS/Linux) or run as administrator on Windows

**Issue**: "Cannot find module" errors
**Solution**: Run `npm install` to ensure all dependencies are installed

## Best Practices

As you develop, keep these practices in mind:

1. **Always initialize Git** for version control
2. **Use meaningful commit messages** when saving your work
3. **Keep your dependencies updated** but test thoroughly
4. **Document your code** with comments and README files
5. **Test your code** before committing changes

## Summary

In this chapter, we've:
- ✅ Set up our development environment
- ✅ Created our first project
- ✅ Learned basic Node.js and npm commands
- ✅ Understood project structure
- ✅ Identified common issues and solutions

## Next Steps

In the next chapter, we'll explore [core concepts] and build upon this foundation. We'll create more complex examples and learn about [specific topics].

## Exercises

To reinforce what you've learned:

1. **Modify the greeting function** to accept multiple names
2. **Add a new function** that calculates the sum of two numbers
3. **Create a simple calculator** that can add, subtract, multiply, and divide
4. **Experiment with different npm commands** to understand package management

---

*Great job getting started! You're now ready to dive deeper into the world of [your topic].* 