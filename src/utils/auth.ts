import crypto from 'node:crypto';

const SECRET = process.env.KEYSTATIC_SECRET || 'archbrutal-cms-secret-key-change-this';

export function generateToken(username: string, timestamp: number): string {
  const data = `${username}:${timestamp}`;
  return crypto.createHmac('sha256', SECRET).update(data).digest('hex');
}

export function verifyToken(cookieValue: string): boolean {
  try {
    const [username, timestampStr, signature] = cookieValue.split(':');
    if (!username || !timestampStr || !signature) return false;
    
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    
    // Token valid selama 1 hari (86.400.000 ms)
    if (now - timestamp > 86400000 || now < timestamp) return false;
    
    const expectedSignature = generateToken(username, timestamp);
    
    // Gunakan timingSafeEqual untuk mencegah timing attack
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (e) {
    return false;
  }
}
