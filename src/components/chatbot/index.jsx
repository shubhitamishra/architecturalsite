'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ── Lightweight markdown → HTML ── */
function parseMarkdown(text) {
    if (!text) return ""
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.+?)__/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/^[\-•]\s+(.+)$/gm, '<div style="display:flex;gap:6px;align-items:baseline;margin:2px 0"><span style="color:#c8a96e;font-size:0.7em">●</span><span>$1</span></div>')
        .replace(/^(\d+)\.\s+(.+)$/gm, '<div style="display:flex;gap:6px;align-items:baseline;margin:2px 0"><span style="color:#c8a96e;font-weight:600;font-size:0.8em">$1.</span><span>$2</span></div>')
        .replace(/\n/g, '<br/>')
}

function MessageBubble({ content, isUser }) {
    const html = useMemo(() => parseMarkdown(content), [content])
    return (
        <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={isUser ? "chat-bubble-user" : "chat-bubble-bot"}
        />
    )
}

const INITIAL_MESSAGE = {
    role: "assistant",
    content: "Hello! I'm **Archi**, your **Architecture Site** assistant. 🏗️\n\nI can help you with:\n- Information about our services\n- Project inquiries & guidance\n- Connecting you with our team\n\nHow can I help you today?",
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([INITIAL_MESSAGE])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef(null)
    const inputRef = useRef(null)

    const scrollToBottom = useCallback(() => {
        const el = scrollRef.current
        if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
    }, [])

    useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])
    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
    }, [isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMsg = { role: "user", content: input.trim() }
        const updated = [...messages, userMsg]
        setMessages(updated)
        setInput("")
        setIsLoading(true)

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updated.map(m => ({
                        role: m.role === "assistant" ? "model" : "user",
                        content: m.content,
                    })),
                }),
            })
            if (!res.ok) throw new Error()
            const data = await res.json()
            setMessages(prev => [...prev, { role: "assistant", content: data.message }])
        } catch {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "I'm sorry, I'm having trouble connecting. Please try again or email us at **shubhitamishra@gmail.com**.",
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <style>{`
                /* ── Scrollbar ── */
                .chat-scroll::-webkit-scrollbar { width: 4px; }
                .chat-scroll::-webkit-scrollbar-track { background: transparent; }
                .chat-scroll::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.3); border-radius: 10px; }

                /* ── Typing dots ── */
                @keyframes dotPulse {
                    0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }

                /* ── Message bubbles ── */
                .chat-bubble-bot, .chat-bubble-user {
                    font-size: 0.85rem;
                    line-height: 1.65;
                    word-break: break-word;
                }
                .chat-bubble-bot strong { font-weight: 600; color: #2c2318; }
                .chat-bubble-bot em { font-style: italic; color: #9e7c5a; }
                .chat-bubble-user strong { font-weight: 600; color: #c8a96e; }
                .chat-bubble-user em { font-style: italic; color: #e8d9b8; }

                /* ── Chat window ── */
                .chat-window {
                    position: fixed;
                    z-index: 9998;
                    bottom: 90px;
                    right: 24px;
                    width: 390px;
                    height: 540px;
                    max-height: calc(100vh - 120px);
                    border-radius: 1.25rem;
                    background: #faf9f6;
                    border: 1px solid rgba(200,169,110,0.22);
                    box-shadow: 0 24px 80px -12px rgba(44,35,24,0.35);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                /* ── Mobile: bottom-sheet style ── */
                @media (max-width: 640px) {
                    .chat-window {
                        bottom: 0 !important;
                        right: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 65vh !important;
                        height: 65dvh !important;
                        max-height: none !important;
                        border-radius: 1.25rem 1.25rem 0 0 !important;
                        border: none !important;
                        box-shadow: 0 -8px 40px rgba(0,0,0,0.25) !important;
                    }
                }
            `}</style>

            {/* ── FAB BUTTON (hidden when open) ── */}
            {!isOpen && (
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed z-[9999]"
                style={{
                    bottom: 24, right: 24,
                    width: 58, height: 58,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2c2318, #3d3025)",
                    border: "1px solid rgba(200,169,110,0.35)",
                    boxShadow: "0 8px 32px rgba(44,35,24,0.4)",
                    cursor: "pointer",
                    color: "#c8a96e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
            >
                <motion.svg
                    initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
                </motion.svg>

                <motion.div
                    style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid rgba(200,169,110,0.3)" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.button>
            )}

            {/* ── CHAT WINDOW ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="chat-window"
                    >
                        {/* ── Header ── */}
                        <div style={{
                            background: "linear-gradient(135deg, #1c1510, #2c2318)",
                            padding: "14px 18px",
                            borderBottom: "1px solid rgba(200,169,110,0.15)",
                            display: "flex", alignItems: "center", gap: 12,
                            flexShrink: 0,
                        }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: "50%",
                                background: "linear-gradient(135deg, #c8a96e, #9e7c5a)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1510" strokeWidth="2" strokeLinecap="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#e8ddd0" }}>Archi</p>
                                <p style={{ margin: 0, fontSize: "0.62rem", color: "#7a6a58", letterSpacing: "0.12em", textTransform: "uppercase" }}>AI Assistant • Online</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    width: 30, height: 30, borderRadius: "50%",
                                    background: "rgba(200,169,110,0.15)",
                                    border: "none", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#c8a96e", flexShrink: 0,
                                }}
                                aria-label="Close chat"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* ── Messages ── */}
                        <div
                            ref={scrollRef}
                            data-lenis-prevent
                            className="chat-scroll"
                            style={{
                                flex: "1 1 0",
                                minHeight: 0,
                                overflowY: "auto",
                                overflowX: "hidden",
                                padding: 16,
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25 }}
                                        style={{
                                            display: "flex",
                                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: "82%",
                                            padding: "10px 14px",
                                            borderRadius: msg.role === "user" ? "1rem 1rem 0.2rem 1rem" : "1rem 1rem 1rem 0.2rem",
                                            background: msg.role === "user" ? "linear-gradient(135deg, #2c2318, #3d3025)" : "#f0ece5",
                                            color: msg.role === "user" ? "#e8ddd0" : "#2c2318",
                                            boxShadow: msg.role === "user" ? "0 2px 10px rgba(44,35,24,0.2)" : "0 1px 4px rgba(0,0,0,0.04)",
                                            border: msg.role === "user" ? "none" : "1px solid rgba(200,169,110,0.12)",
                                        }}>
                                            <MessageBubble content={msg.content} isUser={msg.role === "user"} />
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <div style={{ display: "flex" }}>
                                        <div style={{
                                            padding: "14px 20px",
                                            borderRadius: "1rem 1rem 1rem 0.2rem",
                                            background: "#f0ece5",
                                            border: "1px solid rgba(200,169,110,0.12)",
                                            display: "flex", gap: 5, alignItems: "center",
                                        }}>
                                            {[0, 0.2, 0.4].map((d, i) => (
                                                <div key={i} style={{
                                                    width: 7, height: 7, borderRadius: "50%", background: "#c8a96e",
                                                    animation: `dotPulse 1.4s infinite ${d}s`,
                                                }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Input ── */}
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                padding: "10px 14px",
                                borderTop: "1px solid rgba(200,169,110,0.15)",
                                background: "#faf9f6",
                                display: "flex", gap: 8, alignItems: "center",
                                flexShrink: 0,
                            }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about our services..."
                                disabled={isLoading}
                                style={{
                                    flex: 1,
                                    padding: "10px 14px",
                                    borderRadius: "0.75rem",
                                    border: "1px solid rgba(200,169,110,0.22)",
                                    background: "white",
                                    color: "#2c2318",
                                    fontSize: "0.85rem",
                                    outline: "none",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "rgba(200,169,110,0.55)"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(200,169,110,0.22)"}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                style={{
                                    width: 40, height: 40,
                                    borderRadius: "0.75rem",
                                    background: input.trim() && !isLoading ? "linear-gradient(135deg, #2c2318, #3d3025)" : "rgba(200,169,110,0.15)",
                                    border: "1px solid rgba(200,169,110,0.25)",
                                    color: input.trim() && !isLoading ? "#c8a96e" : "#b09070",
                                    cursor: input.trim() && !isLoading ? "pointer" : "default",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </form>

                        {/* ── Footer ── */}
                        <div style={{
                            padding: "6px 14px 10px",
                            textAlign: "center",
                            fontSize: "0.58rem",
                            color: "#b09070",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            flexShrink: 0,
                        }}>
                            Powered by Gemini AI • Architecture Site
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
