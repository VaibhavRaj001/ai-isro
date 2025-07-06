import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";

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

export function SatelliteAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message:
        "🚀 Welcome to the Bharatiya Antariksh Hackathon Satellite Assistant! I can help you access real-time satellite insights from MOSDAC, analyze satellite imagery, track missions, and answer questions about space data. What would you like to explore?",
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
    "Show me active Indian satellites",
    "Latest Chandrayaan mission data",
    "Weather satellite imagery",
    "ISRO launch schedule",
    "Satellite coverage over India",
    "Ocean monitoring data",
  ];

  const simulateAIResponse = (userQuery: string): Message => {
    const responses = {
      "active indian satellites": {
        message:
          "Here are the currently active Indian satellites with real-time data from MOSDAC:",
        satelliteData: {
          satellite: "CARTOSAT-3",
          altitude: "509 km",
          status: "Operational",
          lastUpdate: "2 minutes ago",
        },
      },
      chandrayaan: {
        message:
          "Latest Chandrayaan-3 mission telemetry and surface analysis data:",
        satelliteData: {
          satellite: "Chandrayaan-3",
          altitude: "Lunar Surface",
          status: "Surface Operations",
          lastUpdate: "15 minutes ago",
        },
      },
      weather: {
        message: "Current weather satellite data and meteorological insights:",
        satelliteData: {
          satellite: "INSAT-3DR",
          altitude: "35,786 km",
          status: "Monitoring",
          lastUpdate: "1 minute ago",
        },
      },
      launch: {
        message:
          "Upcoming ISRO launches and mission schedules retrieved from mission control systems:",
        satelliteData: {
          satellite: "PSLV-C57",
          altitude: "Launch Vehicle",
          status: "Pre-Launch",
          lastUpdate: "30 minutes ago",
        },
      },
      default: {
        message:
          "I've processed your query through our knowledge graph and web scraping systems. Here's the latest satellite data available:",
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
    } else if (query.includes("chandrayaan")) {
      response = responses.chandrayaan;
    } else if (query.includes("weather")) {
      response = responses.weather;
    } else if (query.includes("launch") || query.includes("schedule")) {
      response = responses.launch;
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
    setCurrentMessage(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-isro-saffron hover:bg-isro-saffron/90 text-isro-navy shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <div className="text-2xl">🛰️</div>
        </Button>
        <div className="absolute -top-12 right-0 bg-card border border-border rounded-lg px-3 py-2 text-sm whitespace-nowrap">
          Satellite Assistant
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col bg-card/95 backdrop-blur-sm border-border/50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-isro-navy/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-isro-saffron flex items-center justify-center">
              <div className="text-isro-navy text-sm">🛰️</div>
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-sm">
                MOSDAC AI Assistant
              </h3>
              <p className="text-xs text-muted-foreground">
                Bharatiya Antariksh Hackathon
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 p-0 hover:bg-muted"
          >
            ✕
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-b border-border bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2">Quick queries:</p>
          <div className="flex flex-wrap gap-1">
            {quickQueries.slice(0, 3).map((query, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => handleQuickQuery(query)}
                className="text-xs py-1 px-2 h-auto border-isro-cosmic/30 text-isro-cosmic hover:bg-isro-cosmic/10"
              >
                {query}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
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
                <div className="text-isro-navy text-sm">🛰️</div>
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
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about satellites, missions, or space data..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-isro-saffron/50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-isro-saffron hover:bg-isro-saffron/90 text-isro-navy px-3"
            >
              🚀
            </Button>
          </div>
          <div className="flex gap-1 mt-2">
            {quickQueries.slice(3).map((query, index) => (
              <Button
                key={index}
                size="sm"
                variant="ghost"
                onClick={() => handleQuickQuery(query)}
                className="text-xs py-1 px-2 h-auto text-muted-foreground hover:text-foreground"
              >
                {query}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
