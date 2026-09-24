import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  ArrowLeft,
  RotateCw,
  AlertCircle,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  Maximize2,
  Loader2,
  X,
  Lock,
  Heart,
} from 'lucide-react';
import {
  fetchOrCreateRelationship,
  fetchRelationshipMessages,
  sendChatMessageStream,
  uploadMedia,
  unlockCompanionPhoto,
  fetchGemsBalance,
  claimDailyGems,
  claimWelcomeGems,
  resetWebUserId,
  publicMediaUrl,
  ensureTestProfile,
} from '../services/api';

export default function LiveChat({ character, onBack }) {
  const [messages, setMessages] = useState([]);
  const [relationshipId, setRelationshipId] = useState(null);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [viewerImage, setViewerImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingBubbles, setStreamingBubbles] = useState([]);
  const [isCompanionTyping, setIsCompanionTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [unlockingIds, setUnlockingIds] = useState(new Set());
  const [gems, setGems] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [isClaimingGems, setIsClaimingGems] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleUnlockPhoto = async (messageId) => {
    if (!messageId || !relationshipId) return;
    if (gems < 99) {
      setErrorMessage(`Not enough Gems! You have ${gems} Gems, but unlocking takes 99 Gems. Click "+ Claim" above to top up.`);
      return;
    }
    setUnlockingIds((prev) => new Set(prev).add(messageId));
    setErrorMessage(null);
    try {
      const res = await unlockCompanionPhoto(relationshipId, messageId);
      if (typeof res?.remainingGems === 'number') {
        setGems(res.remainingGems);
      } else {
        setGems((prev) => Math.max(0, prev - 99));
      }
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId
            ? {
                ...m,
                mediaMeta: {
                  ...m.mediaMeta,
                  locked: false,
                  unlockedAt: new Date().toISOString(),
                },
              }
            : m
        )
      );
    } catch (err) {
      console.error('[LiveChat] Photo unlock failed:', err);
      setErrorMessage(`Photo unlock failed: ${err.message}`);
    } finally {
      setUnlockingIds((prev) => {
        const next = new Set(prev);
        next.delete(messageId);
        return next;
      });
    }
  };

  const handleClaimGems = async () => {
    if (isClaimingGems) return;
    setIsClaimingGems(true);
    setErrorMessage(null);
    try {
      let newBalance = await claimWelcomeGems().catch(() => null);
      if (newBalance == null) {
        newBalance = await claimDailyGems();
      }
      if (typeof newBalance === 'number') {
        setGems(newBalance);
      } else {
        const fresh = await fetchGemsBalance();
        setGems(fresh);
      }
    } catch (err) {
      setErrorMessage(`Claim failed: ${err.message}`);
    } finally {
      setIsClaimingGems(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function loadChat() {
      if (!character) return;
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const profile = await ensureTestProfile();
        if (!cancelled) setMyProfile(profile);
        const charId = character._id || character.id;
        const rel = await fetchOrCreateRelationship(charId);
        if (cancelled) return;
        setRelationshipId(rel._id);
        if (rel.freeMessageLimit) {
          setAvailability({
            companionOffline: Boolean(rel.companionOffline),
            companionOfflineUntil: rel.companionOfflineUntil,
            freeMessageLimit: rel.freeMessageLimit,
            userMessageCount: rel.userMessageCount ?? 0,
            isPremium: Boolean(rel.isPremium),
          });
        }

        const [history, currentGems] = await Promise.all([
          fetchRelationshipMessages(rel._id),
          fetchGemsBalance(),
        ]);
        if (cancelled) return;
        setMessages(history);
        setGems(currentGems);
      } catch (err) {
        console.error('[LiveChat] Failed to load chat:', err);
        if (!cancelled) {
          if (character.sampleChat?.length) {
            setMessages(
              character.sampleChat.map((msg, idx) => ({
                _id: `sample_${idx}`,
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
                createdAt: new Date().toISOString(),
              }))
            );
          }
          setErrorMessage(err.message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadChat();
    return () => {
      cancelled = true;
    };
  }, [character]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingBubbles, isCompanionTyping, selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && viewerImage) {
        setViewerImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerImage]);

  const handleResetChat = async () => {
    if (isStreaming || isUploading) return;
    resetWebUserId();
    setMessages([]);
    setStreamingBubbles([]);
    setIsCompanionTyping(false);
    setSelectedImage(null);
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const profile = await ensureTestProfile();
      setMyProfile(profile);
      const rel = await fetchOrCreateRelationship(character._id || character.id);
      if (rel?._id) {
        setRelationshipId(rel._id);
        if (rel.freeMessageLimit) {
          setAvailability({
            companionOffline: Boolean(rel.companionOffline),
            companionOfflineUntil: rel.companionOfflineUntil,
            freeMessageLimit: rel.freeMessageLimit,
            userMessageCount: rel.userMessageCount ?? 0,
            isPremium: Boolean(rel.isPremium),
          });
        }
        const [history, currentGems] = await Promise.all([
          fetchRelationshipMessages(rel._id),
          fetchGemsBalance(),
        ]);
        setMessages(history);
        setGems(currentGems);
      }
    } catch (err) {
      setErrorMessage('Could not initialize clean session: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please choose a valid image file');
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 12MB limit');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSelectedImage({
        file,
        previewUrl,
        width: img.naturalWidth || 800,
        height: img.naturalHeight || 800,
        size: file.size,
        mimeType: file.type || 'image/jpeg',
        name: file.name,
      });
      setErrorMessage(null);
    };
    img.onerror = () => {
      setSelectedImage({
        file,
        previewUrl,
        width: 800,
        height: 800,
        size: file.size,
        mimeType: file.type || 'image/jpeg',
        name: file.name,
      });
    };
    img.src = previewUrl;
    e.target.value = '';
  };

  const handleRemoveSelectedImage = () => {
    if (selectedImage?.previewUrl) {
      URL.revokeObjectURL(selectedImage.previewUrl);
    }
    setSelectedImage(null);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    const imageToSend = selectedImage;

    if ((!text && !imageToSend) || isStreaming || isUploading) return;

    setInput('');
    setSelectedImage(null);
    setErrorMessage(null);

    const tempUserMsg = {
      _id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      mediaUrl: imageToSend?.previewUrl,
      mediaType: imageToSend ? 'image' : undefined,
      mediaMeta: imageToSend
        ? {
            width: imageToSend.width,
            height: imageToSend.height,
            size: imageToSend.size,
            mimeType: imageToSend.mimeType,
          }
        : undefined,
      status: imageToSend ? 'pending' : 'completed',
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setIsStreaming(true);
    setStreamingBubbles([]);
    setIsCompanionTyping(true);

    try {
      let uploadedMediaData = null;
      if (imageToSend) {
        setIsUploading(true);
        try {
          uploadedMediaData = await uploadMedia(imageToSend.file, relationshipId);
          setMessages((prev) =>
            prev.map((m) =>
              m._id === tempUserMsg._id
                ? {
                    ...m,
                    mediaUrl: publicMediaUrl(uploadedMediaData?.url || imageToSend.previewUrl),
                    mediaKey: uploadedMediaData?.key,
                    status: 'completed',
                  }
                : m
            )
          );
        } catch (uploadErr) {
          console.error('[LiveChat] Image upload failed:', uploadErr);
          setErrorMessage(`Image upload failed: ${uploadErr.message}`);
          setIsStreaming(false);
          setIsUploading(false);
          setIsCompanionTyping(false);
          return;
        } finally {
          setIsUploading(false);
        }
      }

      if (relationshipId) {
        let finalReply = null;
        let lastStreamText = '';
        await sendChatMessageStream({
          relationshipId,
          content: text,
          clientGems: gems,
          mediaUrl: uploadedMediaData?.url,
          mediaKey: uploadedMediaData?.key,
          mediaType: uploadedMediaData ? 'image' : undefined,
          mediaMeta: uploadedMediaData
            ? {
                width: imageToSend.width,
                height: imageToSend.height,
                size: uploadedMediaData.size,
                mimeType: uploadedMediaData.mimeType,
              }
            : undefined,
          onBubbleStart: ({ bubbleIndex, id }) => {
            setIsCompanionTyping(false);
            setStreamingBubbles((prev) => {
              const next = [...prev];
              if (!next[bubbleIndex]) {
                next[bubbleIndex] = { id: id || `bubble_${bubbleIndex}`, text: '', isDone: false };
              }
              return next;
            });
          },
          onDelta: (chunk, bubbleIndex = 0) => {
            setIsCompanionTyping(false);
            lastStreamText += chunk;
            setStreamingBubbles((prev) => {
              const next = [...prev];
              if (!next[bubbleIndex]) {
                next[bubbleIndex] = { id: `bubble_${bubbleIndex}`, text: chunk, isDone: false };
              } else {
                next[bubbleIndex] = {
                  ...next[bubbleIndex],
                  text: (next[bubbleIndex].text || '') + chunk,
                };
              }
              return next;
            });
          },
          onBubbleEnd: ({ bubbleIndex, text: endText }) => {
            setStreamingBubbles((prev) => {
              const next = [...prev];
              if (next[bubbleIndex]) {
                next[bubbleIndex] = {
                  ...next[bubbleIndex],
                  text: endText !== undefined ? endText : next[bubbleIndex].text,
                  isDone: true,
                };
              }
              return next;
            });
          },
          onTyping: ({ isTyping }) => {
            setIsCompanionTyping(Boolean(isTyping));
          },
          onReply: (reply) => {
            finalReply = reply;
          },
          onDone: async () => {
            setIsCompanionTyping(false);
            setAvailability((prev) => {
              if (!prev) return prev;
              const nextCount = (prev.userMessageCount ?? 0) + 1;
              const isNowOffline = prev.freeMessageLimit > 0 && nextCount >= prev.freeMessageLimit && !prev.isPremium;
              return {
                ...prev,
                userMessageCount: nextCount,
                companionOffline: isNowOffline,
              };
            });
            // Refresh durable messages from database to fetch all persisted bubbles and media attachments
            try {
              const updated = await fetchRelationshipMessages(relationshipId);
              setMessages(updated);
            } catch {
              if (finalReply?.content || lastStreamText) {
                setMessages((prev) => [
                  ...prev,
                  {
                    _id: finalReply?.id || `assistant_${Date.now()}`,
                    role: 'assistant',
                    content: finalReply?.content || lastStreamText,
                    bubbles: finalReply?.bubbles,
                    createdAt: new Date().toISOString(),
                  },
                ]);
              }
            } finally {
              setStreamingBubbles([]);
              setIsStreaming(false);
            }
          },
          onError: (err) => {
            console.error('[LiveChat] Stream error:', err);
            setErrorMessage(err.message || 'Stream connection error');
            setIsStreaming(false);
            setStreamingBubbles([]);
            setIsCompanionTyping(false);
          },
        });
      } else {
        // Mock fallback if offline
        setTimeout(() => {
          setIsStreaming(false);
          setMessages((prev) => [
            ...prev,
            {
              _id: `assistant_${Date.now()}`,
              role: 'assistant',
              content: imageToSend
                ? `I love that photo you shared! Make sure the backend server (lofnb) is running to see vision responses in real-time.`
                : `Hey! I heard you say: "${text}". Make sure the backend server (lofnb) is running on port 4000 to test live engine responses!`,
              createdAt: new Date().toISOString(),
            },
          ]);
        }, 800);
      }
    } catch (err) {
      console.error('[LiveChat] Error sending message:', err);
      const msg = err.message || '';
      if (msg.includes('offline') || msg.includes('COMPANION_OFFLINE') || msg.includes('403')) {
        setAvailability((prev) => prev ? { ...prev, companionOffline: true } : { companionOffline: true });
        setErrorMessage(`${character.name} is offline. Free message limit reached.`);
      } else {
        setErrorMessage(msg);
      }
      setIsStreaming(false);
      setIsUploading(false);
      setIsCompanionTyping(false);
    }
  };

  const avatar = publicMediaUrl(character.avatarUrl || character.avatar || character.photos?.[0]);
  const myAvatar = publicMediaUrl(myProfile?.avatarUrl);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-[780px] max-h-[85vh]">
      {/* Container squircle */}
      <div className="flex-1 flex flex-col rounded-3xl overflow-hidden bg-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-xl relative">
        {/* Subtle glowing ambient behind top */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#FF375F]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Chat Header */}
        <div className="px-5 py-3.5 bg-zinc-900/80 border-b border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Back to all characters"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative">
              <img
                src={avatar}
                alt={character.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#30D158] ring-2 ring-black" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {character.name}
                </h3>
                {character.age && (
                  <span className="text-xs text-zinc-400 font-normal">
                    {character.age}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                <span>Online &bull; {character.occupation || 'Companion'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gems / Hearts Balance Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-white/10 text-xs font-medium text-white shadow-xs">
              <Heart className="w-3.5 h-3.5 text-[#FF375F] fill-[#FF375F]" />
              <span className="font-mono font-bold">{gems}</span>
              <button
                type="button"
                onClick={handleClaimGems}
                disabled={isClaimingGems}
                className="ml-1 text-[10px] text-zinc-400 hover:text-white transition-colors underline cursor-pointer disabled:opacity-50"
                title="Claim daily reward / welcome gems"
              >
                {isClaimingGems ? '...' : '+ Claim'}
              </button>
            </div>

            {/* Free Message Limit Indicator */}
            {availability?.freeMessageLimit > 0 && (
              <div
                className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-mono ${
                  availability.companionOffline
                    ? 'bg-red-500/20 border-red-500/30 text-red-300'
                    : 'bg-zinc-800/80 border-white/10 text-zinc-300'
                }`}
                title={availability.companionOffline ? 'Companion is offline (limit reached)' : 'Free messages used'}
              >
                <span>Msgs: {availability.userMessageCount ?? 0}/{availability.freeMessageLimit}</span>
              </div>
            )}

            <button
              onClick={() => {
                if (relationshipId) {
                  fetchRelationshipMessages(relationshipId).then(setMessages);
                  fetchGemsBalance().then(setGems);
                }
              }}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Refresh messages and gems"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetChat}
              className="p-2 rounded-full text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
              title="Reset conversation (Fresh test session)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {myProfile?.name && (
          <div className="px-4 py-3 border-b border-white/10 bg-zinc-900/60 flex items-center gap-3 z-10">
            {myAvatar ? (
              <img
                src={myAvatar}
                alt={myProfile.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/10 shrink-0"
              />
            ) : null}
            <div className="min-w-0 text-left">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Your profile</p>
              <p className="text-sm font-semibold text-white">
                {myProfile.name}
                {myProfile.age ? <span className="font-normal text-zinc-400">, {myProfile.age}</span> : null}
              </p>
              {myProfile.bio ? (
                <p className="text-xs text-zinc-300 leading-snug mt-0.5">{myProfile.bio}</p>
              ) : null}
            </div>
          </div>
        )}

        {/* Error Alert Bar */}
        {errorMessage && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center gap-2 text-xs text-red-300 z-10">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="flex-1 truncate">{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-200 text-xs p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Message Thread Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-2 text-zinc-500 text-xs">
              <div className="w-6 h-6 rounded-full border-2 border-[#FF375F] border-t-transparent animate-spin" />
              <span>Opening session with {character.name}...</span>
            </div>
          ) : messages.length === 0 && !isStreaming ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-zinc-500 max-w-sm mx-auto">
              <img
                src={avatar}
                alt={character.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10 opacity-70"
              />
              <p className="text-xs">
                No messages yet. Say hello or share a photo with {character.name} to see vision and chat in action!
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isImage = (Boolean(msg.mediaUrl) || msg.mediaType === 'image') && msg.mediaType !== 'audio';
                const rawUrl = msg.mediaUrl || msg.localUri;
                const imageUrl = rawUrl ? publicMediaUrl(rawUrl) : null;
                const rawCaption = msg.content?.trim() || '';
                const cleanCaption = rawCaption
                  .replace(/^\[The user sent an image[^\]]*\]/i, '')
                  .replace(/\s*\[(?:sent|refused) a (?:photo|picture|voice note)\]/gi, '')
                  .trim();
                const captionText = cleanCaption;
                const rawBubbles = !isUser && msg.bubbles?.length
                  ? msg.bubbles
                  : (captionText ? [{ id: `${msg._id || idx}:0`, text: captionText }] : []);
                const bubbles = rawBubbles.map(b => ({
                  ...b,
                  text: (b.text || '').replace(/\s*\[(?:sent|refused) a (?:photo|picture|voice note)\]/gi, '').trim(),
                })).filter(b => b.text);

                const isLocked = !isUser && (msg.mediaMeta?.locked === true || (msg.mediaMeta?.locked !== false && !msg.mediaMeta?.unlockedAt));
                const isUnlocking = unlockingIds.has(msg._id);

                return (
                  <div key={msg._id || idx} className="space-y-1.5">
                    {isImage ? (
                      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[85%] sm:max-w-[340px] rounded-2xl overflow-hidden border shadow-lg ${
                            isUser
                              ? 'bg-zinc-900 border-white/10 rounded-br-xs'
                              : 'bg-zinc-900/95 border-white/15 rounded-bl-xs'
                          }`}
                        >
                          <div
                            className={`relative overflow-hidden bg-black/40 ${isLocked ? 'cursor-default' : 'cursor-pointer group'}`}
                            onClick={() => {
                              if (!isLocked) {
                                setViewerImage({ url: imageUrl, caption: captionText, name: isUser ? 'You' : character.name });
                              }
                            }}
                          >
                            <img
                              src={imageUrl}
                              alt={captionText || 'Shared moment'}
                              className={`w-full max-h-[380px] object-cover transition-all duration-500 ${
                                isLocked ? 'blur-2xl scale-110 select-none pointer-events-none' : 'group-hover:scale-[1.02]'
                              }`}
                              loading="lazy"
                            />
                            {!isLocked && (
                              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                                <Maximize2 className="w-3.5 h-3.5" />
                              </div>
                            )}

                            {isLocked && (
                              <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2.5 shadow-2xl backdrop-blur-md">
                                  <Lock className="w-5 h-5 text-[#FF375F]" />
                                </div>
                                <p className="text-white text-xs sm:text-[13px] font-semibold mb-0.5">
                                  {character.name} sent a photo
                                </p>
                                <p className="text-white/60 text-[11px] mb-3.5">
                                  Exclusive snapshot • Tap to reveal
                                </p>
                                <button
                                  type="button"
                                  disabled={isUnlocking}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUnlockPhoto(msg._id);
                                  }}
                                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF375F] to-[#E0244D] text-white text-xs font-semibold shadow-lg shadow-[#FF375F]/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                                >
                                  {isUnlocking ? (
                                    <>
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      <span>Unlocking...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-3.5 h-3.5" />
                                      <span>Unlock Photo • 99 Gems</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}

                            {isUser && msg.status === 'pending' && (
                              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center gap-2 text-white text-xs font-medium">
                                <Loader2 className="w-4 h-4 animate-spin text-[#FF375F]" />
                                <span>Sending photo...</span>
                              </div>
                            )}
                          </div>

                          {captionText ? (
                            <div className="p-3 text-xs sm:text-[13px] leading-relaxed text-zinc-100 border-t border-white/10 whitespace-pre-wrap">
                              {captionText}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      bubbles.map((bubble) => (
                        <div key={bubble.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl leading-relaxed text-left text-xs sm:text-[13px] shadow-sm whitespace-pre-wrap ${
                              isUser
                                ? 'bg-[#FF375F] text-white rounded-br-xs'
                                : 'bg-zinc-900/90 text-zinc-100 border border-white/10 rounded-bl-xs'
                            }`}
                          >
                            {bubble.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}

              {isStreaming && (
                <div className="space-y-1.5" aria-live="polite">
                  {streamingBubbles.map((bubble, index) => (
                    <div key={bubble.id || index} className="flex justify-start">
                      <div className="max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl rounded-bl-xs bg-zinc-900/90 text-zinc-100 border border-white/10 leading-relaxed text-left text-xs sm:text-[13px] whitespace-pre-wrap">
                        {bubble.text}
                        {!bubble.isDone && (
                          <span className="inline-block w-1.5 h-3.5 bg-[#FF375F] ml-1 animate-pulse align-middle" />
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator pulse: active initially or during inter-bubble pause */}
                  {isCompanionTyping && (
                    <div className="flex justify-start">
                      <div className="px-4 py-2.5 rounded-2xl rounded-bl-xs bg-zinc-900 text-zinc-400 border border-white/10 flex items-center gap-1.5 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF375F] animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF375F] animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF375F] animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Selected Image Attachment Preview Bar */}
        {selectedImage && (
          <div className="px-4 py-2 bg-zinc-950/95 border-t border-white/10 flex items-center justify-between z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#FF375F]/50 shrink-0 shadow-md">
                <img src={selectedImage.previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                  {selectedImage.name}
                </p>
                <p className="text-[10px] text-zinc-400">
                  {(selectedImage.size / 1024).toFixed(0)} KB &bull; Photo ready to send
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveSelectedImage}
              disabled={isStreaming || isUploading}
              className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shrink-0 cursor-pointer"
              title="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hidden File Input for Image Selection */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleSelectImage}
          className="hidden"
        />

        {/* Companion Offline Banner when limit reached */}
        {availability?.companionOffline && (
          <div className="bg-red-500/10 border-t border-red-500/20 px-4 py-2.5 flex items-center justify-between text-xs text-red-200 z-10">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                {character.name} is offline. Free messages limit ({availability.freeMessageLimit}) reached
                {availability.companionOfflineUntil ? ` until ${new Date(availability.companionOfflineUntil).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}.
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetChat}
              className="text-xs text-red-400 hover:text-white underline font-medium cursor-pointer"
            >
              Reset Session
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-zinc-900/90 border-t border-white/10 flex items-center gap-2 z-10"
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isStreaming || isUploading || availability?.companionOffline}
            className="w-10 h-10 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95 disabled:opacity-40 transition-all flex items-center justify-center shrink-0 border border-white/5 cursor-pointer disabled:cursor-not-allowed"
            title="Attach a photo"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              availability?.companionOffline
                ? `${character.name} is offline. Free message limit reached.`
                : selectedImage
                  ? 'Add a caption...'
                  : `Message ${character.name}...`
            }
            disabled={isStreaming || isUploading || availability?.companionOffline}
            className="flex-1 bg-zinc-950 text-white placeholder-zinc-500 px-4 py-2.5 rounded-full text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-[#FF375F]/60 transition-colors disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={(!input.trim() && !selectedImage) || isStreaming || isUploading || availability?.companionOffline}
            className="w-10 h-10 rounded-full bg-[#FF375F] hover:bg-[#E02850] disabled:opacity-40 disabled:hover:bg-[#FF375F] text-white flex items-center justify-center transition-all shadow-md shadow-[#FF375F]/20 shrink-0 cursor-pointer disabled:cursor-not-allowed"
            title="Send"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {viewerImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 select-none"
          onClick={() => setViewerImage(null)}
        >
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setViewerImage(null)}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={viewerImage.url}
              alt={viewerImage.caption || 'Full view'}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/15 ring-1 ring-white/10"
            />
            {viewerImage.caption && (
              <div className="mt-3.5 px-5 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs sm:text-sm text-zinc-100 max-w-lg text-center backdrop-blur-md shadow-xl">
                {viewerImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

