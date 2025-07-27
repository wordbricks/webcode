#!/usr/bin/env zx

import { $ } from 'zx';

// Parse command line arguments
const args = process.argv.slice(3); // Skip node, script path, and zx

// Check if this is a git clone command
if (args[0] === 'clone' && args[1]) {
  const gitUrl = args[1];
  
  // Additional arguments after the URL (e.g., target directory)
  const additionalArgs = args.slice(2);
  
  // Build isogit command
  const isogitArgs = ['clone', `--url=${gitUrl}`, ...additionalArgs];
  
  // Execute isogit command
  await $`isogit ${isogitArgs}`;
} else {
  // For non-clone commands, pass through to regular git
  await $`git ${args}`;
}