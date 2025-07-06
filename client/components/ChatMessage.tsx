interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  satelliteData?: {
    satellite: string;
    altitude: string;
    status: string;
    lastUpdate: string;
  };
}

export function ChatMessage({
  message,
  isUser,
  timestamp,
  satelliteData,
}: ChatMessageProps) {
  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-isro-saffron flex items-center justify-center flex-shrink-0">
          <div className="text-isro-navy text-sm font-orbitron font-bold">
            🛰️
          </div>
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "order-1" : "order-2"}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? "bg-isro-saffron text-isro-navy ml-auto"
              : "bg-card border border-border"
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
          {satelliteData && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border/50">
              <h4 className="font-rajdhani font-semibold text-isro-cosmic mb-2">
                📡 {satelliteData.satellite}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Altitude:</span>
                  <div className="font-semibold text-isro-teal">
                    {satelliteData.altitude}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className="font-semibold text-green-400">
                    {satelliteData.status}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Last Update: {satelliteData.lastUpdate}
              </div>
            </div>
          )}
        </div>
        {timestamp && (
          <div
            className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}
          >
            {timestamp}
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-isro-cosmic flex items-center justify-center flex-shrink-0">
          <div className="text-white text-sm">👤</div>
        </div>
      )}
    </div>
  );
}
