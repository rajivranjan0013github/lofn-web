import { featuredCharacters } from '../data/characters';

const STORAGE_USER_KEY = 'lofn_web_user_id';

export function getWebUserId() {
  let userId = localStorage.getItem(STORAGE_USER_KEY);
  if (!userId) {
    userId = 'web_tester_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(STORAGE_USER_KEY, userId);
  }
  return userId;
}

export function resetWebUserId() {
  const newId = 'web_tester_' + Math.random().toString(36).slice(2, 10);
  localStorage.setItem(STORAGE_USER_KEY, newId);
  return newId;
}

const API_BASE = '';
const R2_PUBLIC = 'https://r2.lofnchat.com';

export function publicMediaUrl(url) {
  if (typeof url !== 'string' || !url.startsWith(R2_PUBLIC)) return url;
  if (!import.meta.env.DEV) return url;
  return `/r2${url.slice(R2_PUBLIC.length)}`;
}

const TEST_PROFILE = {
  name: 'Alex',
  age: 28,
  bio: 'Product designer. Big fan of live indie gigs, black coffee, and thrift store jackets with mystery pockets.',
  avatarUrl: 'https://r2.lofnchat.com/templates/portraits/male_02.jpg',
  interestedIn: ['female'],
};

export async function ensureTestProfile(retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const current = await fetch(`${API_BASE}/api/profile`, { headers: getHeaders() });
      const profile = current.ok ? (await current.json())?.data : null;
      if (profile?.bio === TEST_PROFILE.bio && profile?.avatarUrl && profile?.name && profile?.onboardedAt) {
        return profile;
      }
      const saved = await fetch(`${API_BASE}/api/profile`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          ...TEST_PROFILE,
          completeOnboarding: true,
        }),
      });
      if (saved.ok) {
        await fetch(`${API_BASE}/api/gems/welcome`, {
          method: 'POST',
          headers: getHeaders(),
        }).catch(() => {});
        return (await saved.json())?.data;
      }
      if (attempt === retries) {
        const error = await saved.json().catch(() => ({}));
        throw new Error(error.error?.message || `Could not save the test profile (${saved.status})`);
      }
    } catch (err) {
      if (attempt === retries) throw err;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-user-id': getWebUserId(),
    'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  };
}

export async function fetchCharacters() {
  try {
    const res = await fetch(`${API_BASE}/api/characters`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`Characters status: ${res.status}`);
    const json = await res.json();
    const list = json?.data || [];
    if (list.length > 0) {
      return list.map((character) => ({
        ...character,
        avatarUrl: publicMediaUrl(character.avatarUrl),
        photos: Array.isArray(character.photos) ? character.photos.map(publicMediaUrl) : character.photos,
      }));
    }
  } catch (err) {
    console.warn('[lofn-web] Using static fallback characters:', err.message);
  }
  return featuredCharacters.map((c) => ({
    _id: c.id,
    id: c.id,
    slug: c.id.replace('demo-', ''),
    name: c.name,
    age: c.age,
    avatarUrl: publicMediaUrl(c.avatar),
    photos: c.photos.map(publicMediaUrl),
    occupation: c.occupation,
    location: c.location,
    hobbies: c.hobbies,
    persona: {
      summary: c.bio,
      personalityTraits: c.traits,
    },
    sampleChat: c.sampleChat,
  }));
}

export async function fetchOrCreateRelationship(characterId) {
  const res = await fetch(`${API_BASE}/api/relationships`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ characterId: String(characterId) }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || `Failed to create relationship (${res.status})`);
  }
  const json = await res.json();
  return json?.data;
}

export async function uploadMedia(file, relationshipId) {
  const formData = new FormData();
  formData.append('file', file);
  if (relationshipId) {
    formData.append('relationshipId', relationshipId);
  }
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    headers: {
      'x-user-id': getWebUserId(),
    },
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || `Upload failed (${res.status})`);
  }
  const json = await res.json();
  return json?.data;
}

export async function unlockCompanionPhoto(relationshipId, messageId) {
  const res = await fetch(`${API_BASE}/api/relationships/${relationshipId}/messages/${messageId}/unlock`, {
    method: 'POST',
    headers: getHeaders(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || error.message || `Unlock failed (${res.status})`);
  }
  const json = await res.json();
  return json?.data || json;
}

export async function fetchGemsBalance() {
  try {
    const res = await fetch(`${API_BASE}/api/gems`, { headers: getHeaders() });
    if (!res.ok) return 0;
    const json = await res.json();
    return typeof json?.gems === 'number' ? json.gems : 0;
  } catch {
    return 0;
  }
}

export async function claimDailyGems() {
  const res = await fetch(`${API_BASE}/api/gems/daily-reward/claim`, {
    method: 'POST',
    headers: getHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || err.message || `Claim failed (${res.status})`);
  }
  const json = await res.json();
  return json?.remainingGems ?? json?.data?.remainingGems ?? 0;
}

export async function claimWelcomeGems() {
  const res = await fetch(`${API_BASE}/api/gems/welcome`, {
    method: 'POST',
    headers: getHeaders(),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.remainingGems ?? json?.data?.remainingGems ?? null;
}

export async function fetchRelationshipMessages(relationshipId) {
  const res = await fetch(`${API_BASE}/api/relationships/${relationshipId}/messages?limit=50`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch messages (${res.status})`);
  }
  const json = await res.json();
  const list = json?.data || [];
  return list.map((msg) => ({
    ...msg,
    mediaUrl: msg.mediaUrl ? publicMediaUrl(msg.mediaUrl) : msg.mediaUrl,
  }));
}

export async function sendChatMessageStream({
  relationshipId,
  content = '',
  clientGems = 0,
  mediaUrl,
  mediaKey,
  mediaType,
  mediaMeta,
  onDelta,
  onBubbleStart,
  onBubbleEnd,
  onTyping,
  onDone,
  onReply,
  onError,
}) {
  const clientMessageId = `web_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const body = {
    content: (content || '').trim(),
    clientMessageId,
    clientGems: typeof clientGems === 'number' ? clientGems : 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    ...(mediaUrl ? { mediaUrl } : {}),
    ...(mediaKey ? { mediaKey } : {}),
    ...(mediaType ? { mediaType } : {}),
    ...(mediaMeta ? { mediaMeta } : {}),
  };

  const response = await fetch(`${API_BASE}/api/relationships/${relationshipId}/chat`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Reply generation failed (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const blocks = buffer.split('\n\n');
      buffer = blocks.pop() || '';

      for (const block of blocks) {
        if (!block.trim()) continue;
        const lines = block.split('\n');
        let event = '';
        let dataStr = '';

        for (const line of lines) {
          if (line.startsWith('event:')) {
            event = line.slice(6).trim();
          } else if (line.startsWith('data:')) {
            dataStr = line.slice(5).trim();
          }
        }

        if (dataStr) {
          try {
            const data = JSON.parse(dataStr);
            if (event === 'delta') {
              onDelta?.(data.content || '', data.bubbleIndex ?? 0);
            } else if (event === 'bubble_start') {
              onBubbleStart?.(data);
            } else if (event === 'bubble_end') {
              onBubbleEnd?.(data);
            } else if (event === 'typing') {
              onTyping?.(data);
            } else if (event === 'reply') {
              onReply?.(data);
            } else if (event === 'done') {
              await onDone?.(data);
            } else if (event === 'error') {
              onError?.(new Error(data.message || 'Error occurred during generation'));
            }
          } catch {
            // Ignore parse errors on partial frames
          }
        }
      }
    }
  } catch (error) {
    onError?.(error);
    throw error;
  }
}
