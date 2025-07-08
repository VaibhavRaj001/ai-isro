import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "../components/ChatMessage";
import { fetchAIResponse } from "../utils/api";

interface Message {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
  satelliteData?: {
    satellite: string;
    altitude: string;
    status: string;
    lastUpdate: string;
  };
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message: `🚀 Welcome to your ISRO Satellite Assistant!
I'm your AI-powered companion built for the Bharatiya Antariksh Hackathon, ready to explore the cosmos with you using data from MOSDAC.

Whether it's accessing real-time satellite insights, analyzing space imagery, tracking Indian space missions, or answering your questions about ISRO — I’m here to assist you on your cosmic journey.

🌌 How can I guide you today?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const message = currentMessage.trim();
    if (!message) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage(""); // clears input
    setIsTyping(true);
    setStreamedMessage("");

    try {
      const aiResponse = await fetchAIResponse(message);

      let i = 0;
      const interval = setInterval(() => {
        setStreamedMessage((prev) => prev + aiResponse[i]);
        i++;
        if (i >= aiResponse.length) {
          clearInterval(interval);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              message: aiResponse,
              isUser: false,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          setStreamedMessage("");
          setIsTyping(false);
        }
      }, 20);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          message: "⚠️ Error retrieving AI response.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setStreamedMessage("");
      setIsTyping(false);
    }
  };

  return (
    <div className="overflow-hidden bg-background relative flex flex-col h-dvh max-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Space Elements */}
        <div
          className="absolute top-32 right-20 text-4xl opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          🚀
        </div>
        <div
          className="absolute top-20 left-1/4 text-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🛰️
        </div>
        <div
          className="absolute bottom-40 right-1/3 text-5xl opacity-8 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        >
          🌙
        </div>
        <div
          className="absolute top-1/2 left-10 text-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-32 left-20 text-6xl opacity-6 animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "5s" }}
        >
          🪐
        </div>

        {/* Orbital Paths */}
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 border border-isro-cosmic/10 rounded-full animate-spin"
          style={{ animationDuration: "30s" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg opacity-30">
            🛰️
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-isro-navy/20 via-transparent to-isro-cosmic/20"></div>
      </div>
      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-lg w-full px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-10 h-10 bg-isro-saffron rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-isro-navy font-orbitron font-bold text-lg">🛰️</div>
            </div>
            <div className="truncate">
              <h1 className="text-lg md:text-2xl font-orbitron font-bold bg-gradient-to-r from-isro-saffron to-isro-cosmic bg-clip-text text-transparent">
                BAH 2025 AI Assistant
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                Ask me anything about satellites, missions, or space data
              </p>
            </div>
          </div>

          {/* Right: Home Button and Status */}
          <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0">
            <a href="/" className="shrink-0">
              <Button
                variant="outline"
                className="border-isro-saffron text-isro-saffron hover:bg-isro-saffron hover:text-isro-navy transition-all duration-300 font-rajdhani font-semibold"
              >
                🏠 Home
              </Button>
            </a>
          </div>
        </div>
      </header>


      {/* Chat Section */}
      <main className="relative z-10 w-full px-4 py-4 md:px-6 md:py-6 flex-1 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <Card className="w-full h-[80vh] max-h-[90vh] mx-auto flex flex-col bg-card/80 backdrop-blur-lg border border-border/50 sm:rounded-xl overflow-hidden">
            {/* Messages */}
            <div
              className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-isro-saffron scrollbar-track-background"
              style={{ minHeight: 0 }}
            >
              {[...messages, isTyping && streamedMessage ? {
                id: 'streaming',
                message: streamedMessage,
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
              } : null].filter(Boolean).map((msg: any) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.message}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                  satelliteData={msg.satelliteData}
                />
              ))}


              {isTyping && (
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-isro-saffron flex items-center justify-center">
                    <div className="text-isro-navy text-sm">🤖</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-isro-cosmic rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-isro-cosmic rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-isro-cosmic rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Typing...</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 md:p-6 border-t border-border bg-muted/30">
              <div className="flex flex-nowrap items-center gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about satellites, missions, space data, or ISRO projects..."
                  className="flex-1 min-w-0 px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-isro-saffron/50 focus:border-isro-saffron/50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="whitespace-nowrap bg-isro-saffron hover:bg-isro-saffron/90 text-isro-navy px-6 font-rajdhani font-semibold"
                >
                  🚀 Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by advanced AI • Real-time MOSDAC integration • Knowledge graph analysis
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
