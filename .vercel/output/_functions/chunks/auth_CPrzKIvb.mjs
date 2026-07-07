import crypto from "node:crypto";
//#region src/utils/auth.ts
var SECRET = process.env.KEYSTATIC_SECRET || "archbrutal-cms-secret-key-change-this";
function generateToken(username, timestamp) {
	const data = `${username}:${timestamp}`;
	return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}
function verifyToken(cookieValue) {
	try {
		const [username, timestampStr, signature] = cookieValue.split(":");
		if (!username || !timestampStr || !signature) return false;
		const timestamp = parseInt(timestampStr, 10);
		const now = Date.now();
		if (now - timestamp > 864e5 || now < timestamp) return false;
		const expectedSignature = generateToken(username, timestamp);
		return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
	} catch (e) {
		return false;
	}
}
//#endregion
export { verifyToken as n, generateToken as t };
