import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CACHE_DIR = path.join(__dirname, 'cache', 'audio');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export function getHash(text, voiceId) {
  return crypto.createHash('sha256').update(`${voiceId || ''}:::${text}`).digest('hex');
}

export function getCachePath(hash) {
  return path.join(CACHE_DIR, `${hash}.mp3`);
}

export async function getSpeechAudio(text, customVoiceId) {
  const voiceId = customVoiceId || process.env.ELEVENLABS_VOICE_ID || 'pFZP5JQG7iQjIQuC4Bku';
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const hash = getHash(text, voiceId);
  const cachePath = getCachePath(hash);

  // 1. Check disk cache
  if (fs.existsSync(cachePath)) {
    const fileStats = fs.statSync(cachePath);
    if (fileStats.size > 500) {
      return {
        fromCache: true,
        buffer: fs.readFileSync(cachePath),
        hash,
        contentType: 'audio/mpeg'
      };
    }
  }

  // 2. If no API key configured, report fallback needed
  if (!apiKey || apiKey.trim() === '') {
    return {
      fallback: true,
      reason: 'MISSING_API_KEY',
      message: 'ElevenLabs API key is not configured. Falling back to browser speech synthesis.'
    };
  }

  // 3. Request ElevenLabs API
  try {
    const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.40,
          similarity_boost: 0.85,
          style: 0.45,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[ElevenLabs Error ${response.status}]:`, errText);
      return {
        fallback: true,
        reason: 'ELEVENLABS_API_ERROR',
        status: response.status,
        message: errText
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to disk cache
    fs.writeFileSync(cachePath, buffer);

    return {
      fromCache: false,
      buffer,
      hash,
      contentType: 'audio/mpeg'
    };
  } catch (error) {
    console.error('[ElevenLabs Network Error]:', error);
    return {
      fallback: true,
      reason: 'NETWORK_ERROR',
      message: error.message
    };
  }
}

export function getCachedCount() {
  try {
    if (!fs.existsSync(CACHE_DIR)) return 0;
    const files = fs.readdirSync(CACHE_DIR);
    return files.filter(f => f.endsWith('.mp3')).length;
  } catch {
    return 0;
  }
}

export function clearCache() {
  try {
    if (fs.existsSync(CACHE_DIR)) {
      const files = fs.readdirSync(CACHE_DIR);
      for (const file of files) {
        fs.unlinkSync(path.join(CACHE_DIR, file));
      }
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
