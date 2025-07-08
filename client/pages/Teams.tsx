import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Teams() {
  const teamMembers = [
    {
      name: "Anushka Shekhawat",
      role: "Mission Director",
      expertise: "Satellite Systems & AI Integration",
      avatar: "👨‍🚀",
      bio: "Leading ISRO's next-generation satellite intelligence systems with over 15 years in space technology.",
      achievements: [
        "Chandrayaan-3 Mission Lead",
        "AI Systems Pioneer",
        "MOSDAC Integration Expert",
      ],
      contact: {
        email: "btech10161.23@bitmesra.ac.in",
        linkedin: "#",
      },
    },
    {
      name: "Sameena Parveen",
      role: "Data Science Lead",
      expertise: "Machine Learning & Space Analytics",
      avatar: "👩‍💻",
      bio: "Specializing in advanced ML algorithms for satellite data processing and real-time space analytics.",
      achievements: [
        "Knowledge Graph Architect",
        "MOSDAC AI Developer",
        "Space Data Scientist",
      ],
      contact: {
        email: "saminaparveen2005@gmail.com",
        linkedin: "#",
      },
    },
    {
      name: "Vaibhav Raj",
      role: "Frontend Engineer",
      expertise: "Space UI/UX & Dashboard Systems",
      avatar: "👨‍💼",
      bio: "Creating intuitive interfaces for mission control systems and satellite monitoring dashboards.",
      achievements: [
        "Mission Control UI Lead",
        "Space Dashboard Expert",
        "React Specialist",
      ],
      contact: {
        email: "vaibhavraj73400@gmail.com",
        linkedin: "https://www.linkedin.com/in/vaibhav-raj-bitmesra27/",
      },
    },
    {
      name: "Anant Kumar",
      role: "Backend Engineer",
      expertise: "Satellite APIs & Data Integration",
      avatar: "👩‍🔬",
      bio: "Building robust backend systems for real-time satellite data processing and MOSDAC integration.",
      achievements: [
        "API Architecture Lead",
        "Database Optimization",
        "System Integration",
      ],
      contact: {
        email: "anant2004infinity@gmail.com",
        linkedin: "#",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background font-space text-foreground relative overflow-hidden">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(120)].map((_, i) => (
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

        {/* Floating Space Elements */}
        <div
          className="absolute top-20 left-10 text-6xl opacity-15 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          🚀
        </div>
        <div
          className="absolute top-40 right-20 text-7xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🛰️
        </div>
        <div
          className="absolute bottom-32 left-1/4 text-8xl opacity-8 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        >
          🌙
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-4xl opacity-20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-20 right-10 text-9xl opacity-6 animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "5s" }}
        >
          🪐
        </div>
        <div
          className="absolute top-1/2 left-10 text-5xl opacity-15 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        >
          🌟
        </div>

        {/* Orbital Paths */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-isro-cosmic/20 rounded-full animate-spin"
          style={{ animationDuration: "25s" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl opacity-40">
            🛰️
          </div>
        </div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-isro-teal/20 rounded-full animate-spin"
          style={{ animationDuration: "18s", animationDirection: "reverse" }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xl opacity-30">
            📡
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-isro-navy/30 via-transparent to-isro-cosmic/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-isro-teal/10 to-transparent"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-isro-saffron rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-isro-navy font-orbitron font-bold text-xl">
                  👥
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-isro-saffron to-isro-cosmic bg-clip-text text-transparent">
                  Mission Team
                </h1>
                <p className="text-sm text-muted-foreground">
                  Bharatiya Antariksh Hackathon 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/">
                <Button
                  variant="outline"
                  className="border-isro-saffron text-isro-saffron hover:bg-isro-saffron hover:text-isro-navy transition-all duration-300 font-rajdhani font-semibold"
                >
                  🏠 Home
                </Button>
              </a>
              <a href="/chatbot">
                <Button className="bg-isro-cosmic hover:bg-isro-cosmic/90 text-white font-rajdhani font-semibold">
                  🤖 AI Assistant
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-orbitron font-bold mb-6 bg-gradient-to-r from-isro-saffron via-isro-cosmic to-isro-teal bg-clip-text text-transparent">
              Rookus Flyover
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Meet the brilliant minds behind the Bharatiya Antariksh AI
              Assistant. Our diverse team combines decades of space technology
              expertise with cutting-edge AI innovation to bring you the future
              of satellite data accessibility.
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-isro-saffron rounded-full animate-pulse"></div>
                <span>Mission Directors</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 bg-isro-cosmic rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span>AI Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 bg-isro-teal rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span>Data Scientists</span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-8 bg-card/80 backdrop-blur-lg border-border/50 hover:border-isro-cosmic/50 transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 text-6xl flex items-center justify-center bg-gradient-to-br from-isro-navy/20 to-isro-cosmic/20 rounded-full border-2 border-isro-cosmic/30 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-2xl font-orbitron font-bold text-isro-saffron mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg font-rajdhani font-semibold text-isro-cosmic mb-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.expertise}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-rajdhani font-semibold text-isro-teal mb-3">
                    🏆 Key Achievements
                  </h4>
                  <div className="space-y-2">
                    {member.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-isro-cosmic rounded-full"></div>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="text-xs text-muted-foreground">
                    {member.contact.email}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-isro-cosmic/30 text-isro-cosmic hover:bg-isro-cosmic/10 hover:text-white text-xs"
                    >
                      📧 Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-isro-teal/30 text-isro-teal hover:bg-isro-teal/10 hover:text-white text-xs"
                    >
                      💼 Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="p-8 bg-gradient-to-r from-isro-teal/20 to-isro-cosmic/20 border-isro-cosmic/30">
            <h3 className="text-3xl font-orbitron font-bold mb-4 text-isro-cosmic">
              🚀 Ready to Explore Space Data?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI assistant is ready to help you navigate the cosmos of
              satellite data. Ask anything about missions, satellites, or space
              analytics!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/chatbot">
                <Button className="bg-gradient-to-r from-isro-saffron to-isro-cosmic hover:from-isro-saffron/90 hover:to-isro-cosmic/90 text-white font-rajdhani font-bold text-lg px-8 py-3">
                  🛰️ Launch AI Assistant
                </Button>
              </a>
              <a href="/">
                <Button
                  variant="outline"
                  className="border-isro-cosmic text-isro-cosmic hover:bg-isro-cosmic/10 font-rajdhani font-semibold"
                >
                  📊 View Dashboard
                </Button>
              </a>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-16 py-8 bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 Bharatiya Antariksh Team • ISRO Mission Support
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/"
                className="text-muted-foreground hover:text-isro-saffron transition-colors"
              >
                Mission Control
              </a>
              <a
                href="/chatbot"
                className="text-muted-foreground hover:text-isro-saffron transition-colors"
              >
                AI Assistant
              </a>
              <a
                href="/teams"
                className="text-muted-foreground hover:text-isro-saffron transition-colors"
              >
                Team
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
