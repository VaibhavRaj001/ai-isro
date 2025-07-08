import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Index() {
  const [missionTime, setMissionTime] = useState(new Date());
  const [activeProjects, setActiveProjects] = useState(0);
  const [launchCountdown, setLaunchCountdown] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionTime(new Date());
      setLaunchCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate active projects counter
    const projectInterval = setInterval(() => {
      setActiveProjects((prev) => (prev + 1) % 8);
    }, 3000);
    return () => clearInterval(projectInterval);
  }, []);

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const missions = [
    { name: "Chandrayaan-4", status: "Planning", progress: 25 },
    { name: "Gaganyaan", status: "Testing", progress: 78 },
    { name: "Aditya-L1", status: "Active", progress: 100 },
    { name: "NISAR", status: "Development", progress: 56 },
  ];

  const satellites = [
    { name: "CARTOSAT-3", orbit: "Sun-Synchronous", altitude: "509 km" },
    { name: "RISAT-2B", orbit: "Low Earth", altitude: "557 km" },
    { name: "EMISAT", orbit: "Sun-Synchronous", altitude: "749 km" },
  ];

  return (
    <div className="min-h-screen bg-background font-space text-foreground relative overflow-hidden">
      {/* Animated Space Background */}
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
      <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-isro-saffron rounded-lg flex items-center justify-center">
                <div className="text-isro-navy font-orbitron font-bold text-xl">
                  I
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-orbitron font-bold">
                  Bharatiya Antariksh Hackathon 2025
                </h1>
                <p className="text-sm text-muted-foreground">
                  Indian Space Research Organisation
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="font-rajdhani text-lg font-semibold">
                {missionTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-1 gap-8 items-center">
            <div className="flex justify-between items-start flex-col lg:flex-row gap-6">
              {/* Left side: Heading and Description */}
              <div className="lg:w-3/4">
                <h2 className="text-4xl lg:text-6xl font-orbitron font-bold mb-6 bg-gradient-to-r from-isro-saffron to-isro-cosmic bg-clip-text text-transparent">
                  Your Gateway to Space Intelligence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-sans">
                  An AI-powered help assistant that retrieves the most relevant information from both static and real-time content—bridging users with the vast knowledge stored on space data portals.
                </p>
              </div>

              {/* Right side: Button */}
              <div className=" w-full lg:w-auto flex justify-center lg:justify-end">
                <a href="/chatbot">
                  <Button className="mt-12 bg-isro-saffron hover:bg-isro-saffron/90 text-isro-navy font-rajdhani font-semibold">
                    🚀 Launch AI Assistant
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>



        {/* AI Assistant Highlight */}
        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-br from-isro-teal/30 to-isro-neon/20 border-isro-teal/30 relative overflow-hidden">
            {/* Background space elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-4xl animate-pulse">
                🚀
              </div>
              <div className="absolute bottom-4 left-4 text-3xl animate-bounce">
                🛰️
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl opacity-30">
                ✨
              </div>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl font-orbitron font-bold mb-4 bg-gradient-to-r from-isro-teal to-isro-cosmic bg-clip-text text-transparent">
                  🤖 Bharatiya Antariksh AI Assistant
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                  Our intelligent assistant dynamically retrieves and serves
                  real-time satellite insights from MOSDAC. Using advanced web
                  scraping, knowledge graphs, and AI-driven search, this bot
                  bridges the gap between space data and seamless accessibility.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-isro-teal rounded-full animate-pulse"></div>
                    <span>Real-time satellite data and imagery</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div
                      className="w-2 h-2 bg-isro-cosmic rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span>Mission status and telemetry</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div
                      className="w-2 h-2 bg-isro-saffron rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span>Intelligent space data analysis</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <a href="/chatbot">
                    <Button className="bg-gradient-to-r from-isro-saffron to-isro-cosmic hover:from-isro-saffron/90 hover:to-isro-cosmic/90 text-white font-rajdhani font-bold text-lg px-8 py-3 shadow-lg">
                      🚀 Launch AI Assistant
                    </Button>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-2xl">
                  <div className="text-8xl mb-4 animate-bounce">🛰️</div>
                  <h4 className="font-rajdhani font-bold text-2xl mb-3 text-isro-cosmic">
                    Ask Anything About Space
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Satellite data, imagery, sensors, missions — our bot's got
                    the cosmos covered!
                  </p>
                  <div className="bg-gradient-to-r from-isro-navy/20 to-isro-cosmic/20 rounded-lg p-4 border border-isro-cosmic/30">
                    <div className="text-sm text-isro-cosmic font-rajdhani font-semibold">
                      💡 Ready to explore the universe of data?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Technology Highlights */}
        <section>
          <Card className="p-8 bg-gradient-to-br from-isro-navy/30 to-isro-cosmic/20 border-isro-cosmic/30">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-orbitron font-bold mb-4">
                Core Technologies Powering the Bot
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built at the intersection of space data and artificial intelligence, our solution integrates real-time scraping, semantic understanding, and knowledge graph intelligence to unlock the MOSDAC data universe.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-isro-saffron/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-isro-saffron text-2xl">🧠</div>
                </div>
                <h4 className="font-rajdhani font-semibold mb-2">
                  AI-Powered Knowledge Graphs
                </h4>
                <p className="text-sm text-muted-foreground">
                  Structured and semantic representation of both static and dynamic space data.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-isro-cosmic/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-isro-cosmic text-2xl">🔍</div>
                </div>
                <h4 className="font-rajdhani font-semibold mb-2">
                  Real-Time Data Scraping
                </h4>
                <p className="text-sm text-muted-foreground">
                  Fetches updated satellite, mission, and sensor data directly from MOSDAC APIs and web content.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-isro-teal/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-isro-teal text-2xl">🛰️</div>
                </div>
                <h4 className="font-rajdhani font-semibold mb-2">Satellite Intelligence</h4>
                <p className="text-sm text-muted-foreground">
                  Visualizes key parameters such as altitude, status, and operational scope across satellite networks.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-isro-neon/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-isro-neon text-2xl">💬</div>
                </div>
                <h4 className="font-rajdhani font-semibold mb-2">Natural Language Chat</h4>
                <p className="text-sm text-muted-foreground">
                  Ask space-related questions in plain English and receive accurate, real-time answers from the bot.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-isro-saffron/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-isro-saffron text-2xl">📡</div>
                </div>
                <h4 className="font-rajdhani font-semibold mb-2">Telemetry Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Enables access to live mission telemetry, satellite health, and observational insights.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-isro-cosmic/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-isro-cosmic text-2xl">🌐</div>
                </div>
                <h4 className="font-rajdhani font-semibold mb-2">Modular Deployment</h4>
                <p className="text-sm text-muted-foreground">
                  Deployed as independent modules for scraping, reasoning, and front-end control—easily scalable.
                </p>
              </div>
            </div>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-16 py-8 bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 Rookus Flyover. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-isro-saffron transition-colors"
              >
                Home
              </a>
              <a
                href="/Chatbot"
                className="text-muted-foreground hover:text-isro-saffron transition-colors"
              >
                Assistant
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
