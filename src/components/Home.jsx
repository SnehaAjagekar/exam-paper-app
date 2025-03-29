export default function Home() {
    return (
      <div className="text-center text-white"
        style={{
          backgroundImage: "url('/WhatsApp Image 2025-03-18 at 12.36.16.jpeg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h1>Welcome to Our Platform</h1>
        <p>Please sign in or log in to continue</p>
      </div>
    );
  }
  