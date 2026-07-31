import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');
const TARGET_R2_DOMAIN = process.argv[2] || process.env.PUBLIC_R2_PUBLIC_DOMAIN || 'https://pub-xxx.r2.dev';

if (!TARGET_R2_DOMAIN || TARGET_R2_DOMAIN === 'https://pub-xxx.r2.dev') {
  console.log('⚠️ Harap masukkan URL Cloudflare R2 Public Domain Anda!');
  console.log('Penggunaan: node scripts/replace-cloudinary-urls.js https://media.domainanda.com');
  process.exit(1);
}

const cleanR2Domain = TARGET_R2_DOMAIN.replace(/\/$/, '');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

let replacedCount = 0;
let fileModifiedCount = 0;

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.json') || file.endsWith('.astro') || file.endsWith('.ts') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Pattern Cloudinary URL
      const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/[^\/]+\/(?:image|video)\/upload\/(?:[^\/]+\/)?(?:v\d+\/)?([^\s"'\)\`]+)/g;

      if (cloudinaryRegex.test(content)) {
        const updatedContent = content.replace(cloudinaryRegex, (match, filename) => {
          replacedCount++;
          return `${cleanR2Domain}/${filename}`;
        });

        fs.writeFileSync(fullPath, updatedContent, 'utf8');
        fileModifiedCount++;
        console.log(`✅ Update: ${path.relative(PROJECT_ROOT, fullPath)}`);
      }
    }
  }
}

console.log(`🔄 Mengganti semua URL Cloudinary ke R2 Domain: ${cleanR2Domain}`);
processDirectory(SRC_DIR);

console.log('\n====================================');
console.log(`🎉 Penggantian URL Selesai!`);
console.log(`📄 File Terupdate: ${fileModifiedCount}`);
console.log(`🔗 Total URL Diubah: ${replacedCount}`);
console.log('====================================');
