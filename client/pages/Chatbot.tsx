import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "../components/ChatMessage";

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
      message:
        "🚀 Welcome to your ISRO Satellite Assistant!
I'm your AI-powered companion built for the Bharatiya Antariksh Hackathon, ready to explore the cosmos with you using data from MOSDAC. Whether it's accessing real-time satellite insights, analyzing space imagery, tracking Indian space missions, or answering your questions about ISRO — I’m here to assist you on your cosmic journey.
🌌 How can I guide you today?",
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQueries = [
    "🛰️ Show active Indian satellites",
    "🌙 Latest Chandrayaan mission data",
    "🌤️ Weather satellite imagery",
    "🚀 ISRO launch schedule",
    "🌍 Satellite coverage over India",
    "🌊 Ocean monitoring data",
    "📡 Satellite sensor details",
    "🔬 Space research updates",
  ];

  const simulateAIResponse = (userQuery: string): Message => {
    const responses = {
      "active indian satellites": {
        message:
          "���️ Here are the currently active Indian satellites with real-time data retrieved from MOSDAC systems using advanced web scraping and knowledge graph analysis:",
        satelliteData: {
          satellite: "CARTOSAT-3",
          altitude: "509 km",
          status: "Operational",
          lastUpdate: "2 minutes ago",
        },
      },
      chandrayaan: {
        message:
          "🌙 Latest Chandrayaan-3 mission telemetry and lunar surface analysis data from our AI-driven space data processing:",
        satelliteData: {
          satellite: "Chandrayaan-3",
          altitude: "Lunar Surface",
          status: "Surface Operations",
          lastUpdate: "15 minutes ago",
        },
      },
      weather: {
        message:
          "🌤️ Current weather satellite data and meteorological insights from our intelligent data retrieval system:",
        satelliteData: {
          satellite: "INSAT-3DR",
          altitude: "35,786 km",
          status: "Monitoring",
          lastUpdate: "1 minute ago",
        },
      },
      launch: {
        message:
          "🚀 Upcoming ISRO launches and mission schedules retrieved from mission control systems through our knowledge graph:",
        satelliteData: {
          satellite: "PSLV-C57",
          altitude: "Launch Vehicle",
          status: "Pre-Launch",
          lastUpdate: "30 minutes ago",
        },
      },
      sensor: {
        message:
          "📡 Detailed sensor specifications and capabilities from our comprehensive satellite database:",
        satelliteData: {
          satellite: "RESOURCESAT-2A",
          altitude: "817 km",
          status: "Active Sensing",
          lastUpdate: "8 minutes ago",
        },
      },
      default: {
        message:
          "🔍 I've processed your query through our advanced AI system, combining web scraping, knowledge graphs, and real-time MOSDAC data analysis. Here's what I found:",
        satelliteData: {
          satellite: "RISAT-2B",
          altitude: "557 km",
          status: "Active Scanning",
          lastUpdate: "5 minutes ago",
        },
      },
    };

    const query = userQuery.toLowerCase();
    let response = responses.default;

    if (query.includes("satellite") || query.includes("active")) {
      response = responses["active indian satellites"];
    } else if (query.includes("chandrayaan") || query.includes("moon")) {
      response = responses.chandrayaan;
    } else if (query.includes("weather") || query.includes("climate")) {
      response = responses.weather;
    } else if (query.includes("launch") || query.includes("schedule")) {
      response = responses.launch;
    } else if (query.includes("sensor") || query.includes("detail")) {
      response = responses.sensor;
    }

    return {
      id: Date.now().toString(),
      message: response.message,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      satelliteData: response.satelliteData,
    };
  };

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

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = simulateAIResponse(currentMessage);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuery = (query: string) => {
    setCurrentMessage(query.replace(/^🛰️|🌙|🌤️|🚀|🌍|🌊|📡|🔬\s/, ""));
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-yScroll">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Rockets */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">
          🚀
        </div>
        <div className="absolute top-40 right-20 text-8xl opacity-15 animate-pulse">
          🛰️
        </div>
        <div
          className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🌙
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-5xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-20 right-10 text-9xl opacity-10 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🪐
        </div>
        <div
          className="absolute top-1/2 left-10 text-6xl opacity-15 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          🌟
        </div>

        {/* Orbital Paths */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-isro-cosmic/20 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
            🛰️
          </div>
        </div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-isro-teal/20 rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xl">
            📡
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-isro-navy/40 via-transparent to-isro-cosmic/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-isro-teal/10 to-transparent"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-isro-saffron rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-isro-navy font-orbitron font-bold text-xl">
                  🛰️
                </div>
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
                  🏠 Back to Mission Control
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
      <main className="relative z-10 container mx-auto px-6 py-8 h-[calc(100vh-120px)]">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/80 backdrop-blur-lg border-border/50 h-full">
              <h3 className="font-orbitron font-bold mb-4 text-isro-cosmic">
                🚀 Quick Queries
              </h3>
              <div className="space-y-2">
                {quickQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleQuickQuery(query)}
                    className="w-full justify-start text-left p-3 h-auto border border-border/30 hover:bg-isro-cosmic/10 hover:border-isro-cosmic/50 hover:text-isro-saffron"
                  >
                    <span className="text-sm">{query}</span>
                  </Button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-isro-navy/20 to-isro-cosmic/20 rounded-lg border border-isro-cosmic/30">
                <h4 className="font-rajdhani font-semibold text-isro-saffron mb-2">
                  💡 AI Capabilities
                </h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Real-time MOSDAC data retrieval</li>
                  <li>• Advanced web scraping</li>
                  <li>• Knowledge graph analysis</li>
                  <li>• Satellite imagery processing</li>
                  <li>• Mission status tracking</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col bg-card/80 backdrop-blur-lg border-border/50">
              {/* Chat Header */}
              <div className="p-6 border-b border-border bg-gradient-to-r from-isro-navy/20 to-isro-cosmic/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-isro-saffron flex items-center justify-center">
                    <div className="text-isro-navy text-lg">🤖</div>
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold">
                      Space Data Assistant
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ask me anything about satellites, missions, or space data
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-rajdhani">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
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
                        <div
                          className="w-2 h-2 bg-isro-cosmic rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-isro-cosmic rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Processing satellite data...
                      </p>
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
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
                  Powered by advanced AI • Real-time MOSDAC integration •
                  Knowledge graph analysis
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
