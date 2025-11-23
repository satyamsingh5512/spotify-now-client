~#!/usr/bin/env node

/**
 * Spotify Widget Setup Validator
 * 
 * This script checks if all required files and dependencies are in place
 * Run: node validate-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🎵 SPOTIFY WIDGET SETUP VALIDATOR\n');
console.log('═'.repeat(50));

let errors = 0;
let warnings = 0;

// File checks
const requiredFiles = [
  { path: '.env.local', critical: true, description: 'Environment variables' },
  { path: 'lib/spotify.js', critical: true, description: 'Spotify API helpers' },
  { path: 'app/api/spotify/route.js', critical: true, description: 'API endpoint' },
  { path: 'components/SpotifyPill.tsx', critical: true, description: 'Widget component' },
  { path: 'tailwind.config.js', critical: true, description: 'Tailwind config' },
  { path: 'package.json', critical: true, description: 'Package manifest' },
];

console.log('\n📁 FILE STRUCTURE CHECK\n');

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file.path);
  const status = exists ? '✅' : (file.critical ? '❌' : '⚠️');
  console.log(`${status} ${file.path} - ${file.description}`);
  
  if (!exists && file.critical) {
    errors++;
  } else if (!exists) {
    warnings++;
  }
});

// Package.json dependencies check
console.log('\n📦 DEPENDENCIES CHECK\n');

if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = pkg.dependencies || {};
  
  const requiredDeps = ['swr', 'framer-motion', 'react-icons'];
  
  requiredDeps.forEach(dep => {
    if (deps[dep]) {
      console.log(`✅ ${dep} (${deps[dep]})`);
    } else {
      console.log(`❌ ${dep} - NOT INSTALLED`);
      errors++;
    }
  });
} else {
  console.log('❌ package.json not found');
  errors++;
}

// Environment variables check
console.log('\n🔑 ENVIRONMENT VARIABLES CHECK\n');

if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  const requiredVars = [
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'SPOTIFY_REFRESH_TOKEN'
  ];
  
  requiredVars.forEach(varName => {
    const hasVar = envContent.includes(varName);
    const hasValue = envContent.includes(`${varName}=`) && 
                     !envContent.includes(`${varName}=your_`) &&
                     !envContent.includes(`${varName}=\n`);
    
    if (hasValue) {
      console.log(`✅ ${varName} - configured`);
    } else if (hasVar) {
      console.log(`⚠️  ${varName} - needs value`);
      warnings++;
    } else {
      console.log(`❌ ${varName} - missing`);
      errors++;
    }
  });
} else {
  console.log('❌ .env.local file not found');
  errors++;
}

// Tailwind config check
console.log('\n🎨 TAILWIND CONFIG CHECK\n');

if (fs.existsSync('tailwind.config.js')) {
  const tailwindContent = fs.readFileSync('tailwind.config.js', 'utf8');
  
  if (tailwindContent.includes('spin-slow')) {
    console.log('✅ Custom animation "spin-slow" configured');
  } else {
    console.log('⚠️  Custom animation "spin-slow" not found');
    warnings++;
  }
  
  if (tailwindContent.includes('components/**')) {
    console.log('✅ Components path included in content');
  } else {
    console.log('⚠️  Components path may be missing from content array');
    warnings++;
  }
} else {
  console.log('❌ tailwind.config.js not found');
  errors++;
}

// Component structure check
console.log('\n🧩 COMPONENT STRUCTURE CHECK\n');

if (fs.existsSync('components/SpotifyPill.tsx')) {
  const componentContent = fs.readFileSync('components/SpotifyPill.tsx', 'utf8');
  
  const checks = [
    { pattern: "'use client'", name: 'Client directive' },
    { pattern: 'useSWR', name: 'SWR hook' },
    { pattern: 'framer-motion', name: 'Framer Motion import' },
    { pattern: 'react-icons', name: 'React Icons import' },
    { pattern: 'backdrop-blur-xl', name: 'Glassmorphic effect' },
    { pattern: 'animate-spin-slow', name: 'Album rotation animation' },
    { pattern: 'refreshInterval', name: 'Auto-refresh polling' },
  ];
  
  checks.forEach(check => {
    if (componentContent.includes(check.pattern)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`⚠️  ${check.name} - may be missing`);
      warnings++;
    }
  });
} else {
  console.log('❌ SpotifyPill.tsx not found');
  errors++;
}

// API route check
console.log('\n🌐 API ROUTE CHECK\n');

if (fs.existsSync('app/api/spotify/route.js')) {
  const routeContent = fs.readFileSync('app/api/spotify/route.js', 'utf8');
  
  const checks = [
    { pattern: "export const dynamic = 'force-dynamic'", name: 'Dynamic route config' },
    { pattern: 'export async function GET', name: 'GET handler' },
    { pattern: 'getNowPlaying', name: 'Spotify API call' },
    { pattern: 'isPlaying', name: 'Playing state check' },
  ];
  
  checks.forEach(check => {
    if (routeContent.includes(check.pattern)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`⚠️  ${check.name} - may be missing`);
      warnings++;
    }
  });
} else {
  console.log('❌ API route not found');
  errors++;
}

// Final summary
console.log('\n' + '═'.repeat(50));
console.log('\n📊 VALIDATION SUMMARY\n');

if (errors === 0 && warnings === 0) {
  console.log('🎉 PERFECT! All checks passed!');
  console.log('\n✨ Your Spotify widget is ready to use!');
  console.log('\nNext steps:');
  console.log('1. Fill in .env.local with your Spotify credentials');
  console.log('2. Add <SpotifyPill /> to your page');
  console.log('3. Run: npm run dev');
  console.log('4. Play music on Spotify!');
} else if (errors === 0) {
  console.log(`⚠️  Setup is mostly complete (${warnings} warning${warnings !== 1 ? 's' : ''})`);
  console.log('\n📝 Review warnings above and fix if needed.');
  console.log('Most warnings are non-critical but good to address.');
} else {
  console.log(`❌ Setup incomplete (${errors} error${errors !== 1 ? 's' : ''}, ${warnings} warning${warnings !== 1 ? 's' : ''})`);
  console.log('\n🔧 Fix the errors above before continuing.');
  console.log('\nCommon fixes:');
  console.log('• Missing files: Check file paths and names');
  console.log('• Missing dependencies: Run `npm install swr framer-motion react-icons`');
  console.log('• Environment variables: Fill in .env.local with real credentials');
}

console.log('\n' + '═'.repeat(50) + '\n');

// Exit with error code if there are errors
process.exit(errors > 0 ? 1 : 0);
