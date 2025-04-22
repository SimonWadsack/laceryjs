// Clean all .d.ts files in the dist folder except index.d.ts
// This script is run after the Rollup build process to remove unnecessary type declaration files.

import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { rm } from 'fs';

const distPath = './dist';

async function clean() {
    // delete all .d.ts files in the dist folder except index.d.ts
    const files = await readdir(distPath, { withFileTypes: true });

    for (const file of files) {
        if (file.isFile() && file.name.endsWith('.d.ts') && file.name !== 'index.d.ts') {
        await unlink(join(distPath, file.name));
        }
    }

    // delete the elements folder and all its contents
    const elementsPath = join(distPath, 'elements');
    try {
        rm(elementsPath, { recursive: true, force: true }, () => {});
    } catch (error) {
        console.error(`Error deleting elements folder: ${error}`);
    }
}

console.log('Cleaning up type declaration files...');
clean()
  .then(() => console.log('Cleanup complete.'))
  .catch((error) => console.error('Error during cleanup:', error));