"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResume } from "../Redux/ActionCreartors/ResumeActionCreators";

/* ===========================
   NAVBAR
=========================== */
export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showChat, setShowChat] = useState(false);
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.ResumeStateData);

  useEffect(() => {
    dispatch(getResume());
  }, []);

  return (
    <>
      <header
        id="header"
        className="header sticky-top mt-5 mx-4 navbar-light"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        <nav
          className="navbar navbar-expand-lg container shadow px-3 py-3"
          style={{ borderRadius: "50px" }}
        >
          {/* Mobile theme toggle */}
          <button
            className="btn btn-sm btn-outline-secondary me-3 d-lg-none"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <i className="bi bi-moon"></i>
            ) : (
              <i className="bi bi-sun"></i>
            )}
          </button>

          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4 ms-lg-3"
            style={{ color: "var(--text-color)" }}
          >
            Portfolio
          </Link>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <i
              className="bi bi-list"
              style={{ color: "var(--text-color)" }}
            ></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[
                "Home",
                "About",
                "Skills",
                "Resume",
                "Certificate",
                "Portfolio",
                "Testimonials",
                "Services",
                "Blog",
                "Contact",
              ].map((item, index) => (
                <li className="nav-item" key={index}>
                  {/* FIX: use <a href> for same-page hash links, not <a to> */}
                  <a
                    href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                    className="nav-link"
                    style={{ color: "var(--text-color)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons — FIX: use href instead of to */}
            <div className="d-none d-lg-inline-block ms-4 fs-5">
              <a
                href={resume?.contact?.github || "#"}
                target="_blank"
                rel="noreferrer"
                className="me-3"
                style={{ color: "var(--text-color)" }}
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href={resume?.contact?.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="me-3"
                style={{ color: "var(--text-color)" }}
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/_ishaan_12"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--text-color)" }}
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>

            {/* Desktop theme toggle */}
            <button
              className="btn btn-sm btn-outline-secondary ms-3 d-none d-lg-inline-block"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <i className="bi bi-moon"></i>
              ) : (
                <i className="bi bi-sun"></i>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          backgroundColor: "gold",
          color: "black",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 1050,
        }}
      >
        <i className="bi bi-robot"></i>
      </button>

      {showChat && <ChatModal setShowChat={setShowChat} />}
    </>
  );
}

/* ===========================
   CHAT MODAL
=========================== */
const ChatModal = ({ setShowChat }) => (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      style={{ maxWidth: "500px" }}
    >
      <div className="modal-content" style={{ borderRadius: "16px" }}>
        <div className="modal-header bg-primary text-white py-2">
          <h6 className="modal-title">
            <i className="bi bi-robot me-2"></i>Helping Assistant
          </h6>
          <button
            className="btn-close btn-close-white"
            onClick={() => setShowChat(false)}
          ></button>
        </div>
        <ChatbotUI />
      </div>
    </div>
  </div>
);

/* ===========================
   CHATBOT UI
=========================== */
const ChatbotUI = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.ResumeStateData);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! Ask anything about Ishaan — skills, projects, experience, services, certificates, or contact!",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    dispatch(getResume());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ================================
     FULL ABOUT RESPONSE
  ================================ */
  const getFullAbout = () => {
    const a = resume?.about;
    return `
👤 *About Ishaan*
${a?.summary}

⭐ *Skills:*
${a?.skills?.map((s) => "• " + s).join("\n")}

🎓 *Education:*
${a?.education?.map((e) => "• " + e).join("\n")}

💼 *Experience:*
${a?.experience?.map((e) => "• " + e).join("\n")}

💡 *Projects:*
${a?.projects?.map((p) => "• " + p).join("\n")}

📜 *Certificates:*
${a?.certificates?.map((c) => "• " + c).join("\n")}

🛠 *Services:*
${a?.services?.map((s) => "• " + s).join("\n")}
    `.trim();
  };

  /* ================================
     BOT REPLY LOGIC
  ================================ */
  const botReply = (q) => {
    if (!resume) return "⏳ Loading resume data...";
    const nq = q.toLowerCase().trim();

    /* ABOUT */
    if (nq.includes("about")) return getFullAbout();

    /* CONTACT */
    if (nq.includes("contact")) {
      const c = resume.contact;
      if (!c) return "📞 Contact info not available.";
      return `📬 *Contact Ishaan*\n📧 Email: ${c.email || "N/A"}\n🐙 GitHub: ${c.github || "N/A"}\n💼 LinkedIn: ${c.linkedin || "N/A"}`;
    }

    /* MATCH SPECIFIC SKILL */
    const skill = resume.skills?.find((s) =>
      nq.includes(s.name.toLowerCase())
    );
    if (skill) {
      setActiveItem({ type: "skill", data: skill });
      return `🧠 *${skill.name}*\n${skill.description}\n⭐ Level: ${skill.level}%`;
    }

    /* FOLLOW UP: SKILL */
    if (activeItem?.type === "skill") {
      if (nq.includes("level")) return `⭐ Level: ${activeItem.data.level}%`;
      if (nq.includes("description")) return activeItem.data.description;
    }

    /* MATCH SPECIFIC PROJECT */
    const project = resume.projects?.find((p) =>
      nq.includes(p.name.toLowerCase())
    );
    if (project) {
      setActiveItem({ type: "project", data: project });
      return `💡 *${project.name}*\n${project.shortDescription}\nAsk: technology, category, live, github`;
    }

    /* FOLLOW UP: PROJECT */
    if (activeItem?.type === "project") {
      const p = activeItem.data;
      if (nq.includes("tech")) return `🛠 Tech: ${p.tech}`;
      if (nq.includes("category")) return `📂 Category: ${p.category}`;
      if (nq.includes("live")) return p.liveUrl ? `🌐 Live: ${p.liveUrl}` : "Live URL not available.";
      if (nq.includes("github")) return p.githubRepo ? `🐙 GitHub: ${p.githubRepo}` : "GitHub repo not available.";
    }

    /* MATCH SPECIFIC SERVICE */
    const service = resume.services?.find((s) =>
      nq.includes(s.name.toLowerCase())
    );
    if (service) {
      setActiveItem({ type: "service", data: service });
      return `🛠️ *${service.name}*\n${service.shortDescription}\nAsk: price, duration, technology, details`;
    }

    /* FOLLOW UP: SERVICE */
    if (activeItem?.type === "service") {
      const s = activeItem.data;
      if (nq.includes("price")) return `💰 Price: ₹${s.price}`;
      if (nq.includes("duration")) return `⏳ Duration: ${s.duration} days`;
      if (nq.includes("tech")) return `🛠 Tech: ${s.technology}`;
      if (nq.includes("detail"))
        return s.longDescription?.replace(/<\/?[^>]+>/g, "") || "No details available.";
    }

    /* CATEGORY RESPONSES */
    if (nq.includes("skills"))
      return resume.skills?.map((s) => `• ${s.name} (${s.level}%)`).join("\n") || "No skills found.";

    if (nq.includes("projects"))
      return resume.projects?.map((p) => `💡 ${p.name} — ${p.shortDescription}`).join("\n\n") || "No projects found.";

    if (nq.includes("services"))
      return resume.services?.map((s) => `🛠️ ${s.name} — ${s.shortDescription}`).join("\n\n") || "No services found.";

    if (nq.includes("experience"))
      return resume.experience?.map((e) => `💼 ${e.jobTitle} @ ${e.companyName}`).join("\n") || "No experience found.";

    if (nq.includes("certificate"))
      return resume.certificates?.map((c) => `📜 ${c.name} — ${c.issuedBy}`).join("\n") || "No certificates found.";

    return "🤖 I didn't understand that. Try asking about:\nskills, projects, services, experience, certificates, contact, or about.";
  };

  /* ================================
     SEND MESSAGE
  ================================ */
  const sendMessage = (msg = null) => {
    const final = (msg || input).trim();
    if (!final) return;

    setMessages((prev) => [...prev, { sender: "user", text: final }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = botReply(final);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setTyping(false);
    }, 600);
  };

  return (
    <div
      className="modal-body d-flex flex-column p-0"
      style={{ minHeight: "480px" }}
    >
      {/* CHAT WINDOW */}
      <div
        className="flex-grow-1 p-3"
        style={{ overflowY: "auto", maxHeight: "380px" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`d-flex my-2 ${
              msg.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "10px 14px",
                borderRadius: "14px",
                background: msg.sender === "user" ? "#0078ff" : "#f1f1f1",
                color: msg.sender === "user" ? "#fff" : "#333",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                whiteSpace: "pre-line",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="d-flex justify-content-start my-2">
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "14px",
                background: "#f1f1f1",
                color: "#666",
                fontSize: "14px",
              }}
            >
              🤖 Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          gap: "8px",
          padding: "10px",
          background: "#f8f9fa",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {[
          "About",
          "Skills",
          "Projects",
          "Services",
          "Experience",
          "Certificates",
          "Contact",
        ].map((label, i) => (
          <button
            key={i}
            onClick={() => sendMessage(label.toLowerCase())}
            style={{
              padding: "6px 14px",
              background: "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "20px",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="p-2 border-top bg-white">
        <div className="input-group shadow-sm rounded-pill overflow-hidden">
          <input
            type="text"
            className="form-control border-0 ps-3"
            style={{ outline: "none", boxShadow: "none" }}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="btn btn-primary px-4"
            onClick={() => sendMessage()}
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};