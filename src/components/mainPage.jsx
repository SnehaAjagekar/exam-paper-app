export default function MainPage() {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center vh-100 text-white"
        style={{
          backgroundImage: "url('/WhatsApp Image 2025-03-18 at 12.36.16.jpeg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
      >
        <h1 className="mb-4">Welcome to Our Platform</h1>
        <p className="text-light">Please sign in or log in to continue</p>
        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-primary">Sign In</button>
          <button className="btn btn-outline-light">Login</button>
        </div>
      </div>
    );
  }
  