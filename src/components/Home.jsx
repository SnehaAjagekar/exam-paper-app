import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/WhatsApp Image 2025-04-13 at 19.42.30.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <h1 className="text-white text-3xl font-bold text-center">
        Secure Exam Paper Upload
      </h1>
      <p className="text-white mt-2 text-center">
        Please sign in or log in to continue
      </p>

      {/* Buttons */}
      <div className="mt-3 d-flex gap-3">
        <button className="btn btn-primary" onClick={() => navigate("/register")}>
          Sign In
        </button>
        <button className="btn btn-outline-light" onClick={() => navigate("/loginAs")}>
          Login
        </button>
      </div>
    </div>
  );
}
