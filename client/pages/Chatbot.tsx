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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [streamedMessage, setStreamedMessage] = useState("");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message: currentMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);
    setStreamedMessage(""); // reset previous

    try {
      const aiResponse = await fetchAIResponse(currentMessage);

      // Typewriter effect
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
      }, 20); // 20ms per character
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
    <div className="overflow-auto bg-background relative flex flex-col h-screen">
      {/* Animated Background (Optional - leave as-is) */}
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
        {/* Add stars, planets, rockets... */}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-isro-saffron rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-isro-navy font-orbitron font-bold text-xl">🛰️</div>
              </div>
              <div>
                <h1 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-isro-saffron to-isro-cosmic bg-clip-text text-transparent">
                  Bharatiya Antariksh AI Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  Intelligent Space Data Companion • MOSDAC Integration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/">
                <Button
                  variant="outline"
                  className="border-isro-saffron text-isro-saffron hover:bg-isro-saffron hover:text-isro-navy transition-all duration-300 font-rajdhani font-semibold"
                >
                  🏠 Back to Home
                </Button>
              </a>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Live Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-rajdhani text-sm font-semibold text-green-400">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="relative z-10 container mx-auto px-6 py-8 flex-1 flex overflow-y-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex flex-col bg-card/80 backdrop-blur-lg border-border/50 min-h-[calc(100vh-120px)]" style={{ height: "calc(100vh - 120px)" }}>
              {/* Chat Header */}
              <div className="p-6 border-b border-border bg-gradient-to-r from-isro-navy/20 to-isro-cosmic/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-isro-saffron flex items-center justify-center">
                    <div className="text-isro-navy text-lg">🤖</div>
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold">Space Data Assistant</h3>
                    <p className="text-sm text-muted-foreground">
                      Ask me anything about satellites, missions, or space data
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-rajdhani">Active</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-isro-saffron scrollbar-track-background" style={{ flex: 1, minHeight: 0 }}>
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg.message}
                    isUser={msg.isUser}
                    timestamp={msg.timestamp}
                    satelliteData={msg.satelliteData}
                  />
                ))}

                {streamedMessage && (
                  <ChatMessage
                    key="streaming"
                    message={streamedMessage}
                    isUser={false}
                    timestamp={new Date().toLocaleTimeString()}
                  />
                )}
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
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about satellites, missions, space data, or ISRO projects..."
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-isro-saffron/50 focus:border-isro-saffron/50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim()}
                    className="bg-isro-saffron hover:bg-isro-saffron/90 text-isro-navy px-6 font-rajdhani font-semibold"
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
        </div>
      </main>
    </div>
  );
}
