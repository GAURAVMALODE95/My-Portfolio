import { ArrowUpRight, Github, Globe, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { PROFILE } from "@/data/site";

const TOPICS = [
  "Product engineering role",
  "Fintech / mobile project",
  "Consulting / collaboration",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const inputClass =
  "w-full border border-hairline bg-transparent px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-signal focus:outline-none";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (message.trim().length < 10)
      next.message = "Please write a message of at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("idle");
      return;
    }
    const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT;
    setStatus("sending");

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, topic, message }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        setStatus("sent");
        toast.success("Message sent — thank you. I'll reply soon.");
        setName("");
        setEmail("");
        setMessage("");
      } catch {
        setStatus("error");
        toast.error(
          "The message could not be sent. Please email me directly instead.",
        );
      }
    } else {
      const subject = encodeURIComponent(
        `[Portfolio] ${topic} — from ${name.trim()}`,
      );
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic}\n\n${message.trim()}`,
      );
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      toast("Opening your email client with a prefilled message…");
    }
  };

  const links = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, testid: "contact-email-link" },
    { icon: Linkedin, label: "LinkedIn", value: "gauravmalode7", href: PROFILE.linkedin, testid: "contact-linkedin-link" },
    { icon: Github, label: "GitHub", value: "gauravmalode95", href: PROFILE.github, testid: "contact-github-link" },
    { icon: Globe, label: "Website", value: "gauravmalode.in", href: PROFILE.website, testid: "contact-website-link" },
    { icon: Phone, label: "Phone", value: PROFILE.phoneDisplay, href: `tel:${PROFILE.phone}`, testid: "contact-phone-link" },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-hairline py-24 sm:py-32"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="05" title="Contact" />
        <h2 className="mt-8 font-display text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
          <MaskedLines
            lines={[
              "Have a difficult product problem?",
              "Let\u2019s make it clearer.",
            ]}
          />
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            {status === "sent" ? (
              <div
                className="border border-signal/40 bg-signal/5 p-8"
                data-testid="contact-success-state"
                role="status"
              >
                <p className="font-display text-2xl font-bold tracking-tight">
                  Message sent.
                </p>
                <p className="mt-2 text-sm text-sub">
                  Thank you — your message was delivered successfully. I usually
                  reply within a day or two.
                </p>
                <button
                  type="button"
                  data-testid="contact-send-another"
                  onClick={() => setStatus("idle")}
                  className="link-draw mt-5 font-mono text-xs uppercase tracking-[0.15em] text-signal"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate data-testid="contact-form">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      data-testid="contact-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p id="contact-name-error" data-testid="contact-name-error" className="mt-2 text-xs text-red-500" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      data-testid="contact-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p id="contact-email-error" data-testid="contact-email-error" className="mt-2 text-xs text-red-500" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="contact-topic"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
                  >
                    Topic <span className="normal-case tracking-normal">(optional)</span>
                  </label>
                  <select
                    id="contact-topic"
                    data-testid="contact-topic-select"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`${inputClass} cursor-pointer bg-canvas`}
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    data-testid="contact-message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the problem you're trying to solve…"
                    rows={6}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${inputClass} resize-y`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" data-testid="contact-message-error" className="mt-2 text-xs text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    data-testid="contact-submit-btn"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-canvas transition-colors hover:bg-signal-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="cta-shift">
                      <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                    </span>
                    <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint" aria-live="polite" data-testid="contact-status-note">
                    {status === "mailto"
                      ? "Email client opened — press send there to deliver."
                      : status === "error"
                        ? "Send failed — please email me directly."
                        : "Replies within a day or two"}
                  </p>
                </div>
                {status === "mailto" && (
                  <p className="mt-4 border border-hairline bg-surface/50 p-4 text-xs leading-relaxed text-sub" role="status" data-testid="contact-mailto-note">
                    Your email client should have opened with a prefilled
                    message addressed to {PROFILE.email}. If it didn&apos;t,
                    write to me directly at{" "}
                    <a href={`mailto:${PROFILE.email}`} className="link-draw text-signal">
                      {PROFILE.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </FadeUp>

          <FadeUp className="lg:col-span-5" delay={0.15}>
            <div className="border border-hairline bg-surface/40 p-7 sm:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                Direct channels
              </p>
              <ul className="mt-6 space-y-5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      data-testid={l.testid}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-sub transition-colors group-hover:border-signal group-hover:text-signal">
                        <l.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                          {l.label}
                        </span>
                        <span className="link-draw block text-sm text-ink">
                          {l.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={PROFILE.resumePath}
                download
                data-testid="contact-resume-download"
                className="group mt-8 flex items-center justify-between border border-hairline px-5 py-4 transition-colors hover:border-signal"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-sub group-hover:text-ink">
                  Download résumé (PDF)
                </span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" aria-hidden="true" />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
