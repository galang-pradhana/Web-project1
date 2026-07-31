import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'cloudinary-backup');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function findCloudinaryUrls(dir) {
  let urls = new Set();
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
      const subUrls = findCloudinaryUrls(fullPath);
      subUrls.forEach((u) => urls.add(u));
    } else if (file.endsWith('.json') || file.endsWith('.astro') || file.endsWith('.ts') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/https:\/\/res\.cloudinary\.com\/[^\s"'\)\`]+/g);
      if (matches) {
        matches.forEach((u) => urls.add(u));
      }
    }
  }
  return urls;
}

console.log('🔍 Mencari semua URL Cloudinary di folder src/...');
const srcDir = path.join(PROJECT_ROOT, 'src');
const allUrls = Array.from(findCloudinaryUrls(srcDir));

console.log(`📌 Ditemukan ${allUrls.length} URL Cloudinary.`);

// Save URL list to file
fs.writeFileSync(path.join(PROJECT_ROOT, 'scripts', 'cloudinary_urls_extracted.json'), JSON.stringify(allUrls, null, 2));

console.log('\n⬇️ Memulai proses download asset...');

let successCount = 0;
let failCount = 0;

async function downloadFile(url) {
  return new Promise((resolve) => {
    // Determine clean filename
    const parts = url.split('/');
    const rawFileName = parts[parts.length - 1];
    const fileExt = path.extname(rawFileName) || '.jpg';
    const baseName = path.basename(rawFileName, fileExt);

    const destPath = path.join(OUTPUT_DIR, `${baseName}${fileExt}`);

    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ [200 OK] Terunduh: ${baseName}${fileExt}`);
          successCount++;
          resolve(true);
        });
      } else {
        file.close();
        fs.unlinkSync(destPath);
        console.log(`❌ [HTTP ${response.statusCode}] Gagal: ${url}`);
        failCount++;
        resolve(false);
      }
    }).on('error', (err) => {
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      console.log(`❌ [ERROR] Gagal ${url}: ${err.message}`);
      failCount++;
      resolve(false);
    });
  });
}

async function run() {
  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    console.log(`[${i + 1}/${allUrls.length}] Mengunduh ${url}...`);
    await downloadFile(url);
  }

  console.log('\n====================================');
  console.log(`🎉 Proses Selesai!`);
  console.log(`✅ Berhasil: ${successCount}`);
  console.log(`❌ Gagal (Limit/Error): ${failCount}`);
  console.log(`📁 Lokasi Backup: ${OUTPUT_DIR}`);
  console.log('====================================');
}

run();
