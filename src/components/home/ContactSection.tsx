import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { Cta } from "@/components/ux/Cta";
import { PROFILE } from "@/data/site";
import { CONTACT_ENDPOINT } from "@/lib/site";

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

const LABEL = "block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-sub";

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} data-testid={id} className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#e5484d]" role="alert">
      {text}
    </p>
  );
}

const CHANNELS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, testid: "contact-email-link" },
  { label: "LinkedIn", value: "in/gauravmalode7", href: PROFILE.linkedin, testid: "contact-linkedin-link" },
  { label: "GitHub", value: "gauravmalode95", href: PROFILE.github, testid: "contact-github-link" },
  { label: "Website", value: "gauravmalode.in", href: PROFILE.website, testid: "contact-website-link" },
  { label: "Phone", value: PROFILE.phoneDisplay, href: `tel:${PROFILE.phone}`, testid: "contact-phone-link" },
];

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid email address.";
    if (message.trim().length < 10) next.message = "Please write a message of at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return setStatus("idle");
    const endpoint = CONTACT_ENDPOINT;
    setStatus("sending");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim(),
          _subject: `[Portfolio] ${topic} — ${name.trim()}`,
          _replyto: email.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      toast.success("Message sent — thank you. I'll reply soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      toast.error("The message could not be sent. Please email me directly instead.");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-hairline py-24 sm:py-32" aria-label="Contact">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="04" title="Contact" />
        <h2 className="mt-10 font-display text-4xl font-bold leading-[1.15] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          <MaskedLines
            lines={[
              "Have a difficult product problem?",
              <>Let&rsquo;s make it <em className="font-serif font-normal italic text-signal">clearer.</em></>,
            ]}
          />
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            {status === "sent" ? (
              <div className="border-t border-signal pt-8" data-testid="contact-success-state" role="status">
                <p className="font-display text-3xl font-bold tracking-[-0.03em]">Message sent.</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-sub">
                  Thank you — your message was delivered successfully. I usually reply within a day or two.
                </p>
                <button
                  type="button"
                  data-testid="contact-send-another"
                  onClick={() => setStatus("idle")}
                  className="link-draw mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                data-testid="contact-form"
                className="border border-hairline bg-surface/60 p-5 sm:p-8"
              >
                <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink">
                  Send a message
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={LABEL}>01 — Name</label>
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
                      className="field"
                    />
                    <FieldError id="contact-name-error" text={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={LABEL}>02 — Email</label>
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
                      className="field"
                    />
                    <FieldError id="contact-email-error" text={errors.email} />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="contact-topic" className={LABEL}>03 — Topic</label>
                  <select
                    id="contact-topic"
                    data-testid="contact-topic-select"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="field cursor-pointer appearance-none"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-6">
                  <label htmlFor="contact-message" className={LABEL}>04 — Message</label>
                  <textarea
                    id="contact-message"
                    data-testid="contact-message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the problem you're trying to solve…"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className="field"
                  />
                  <FieldError id="contact-message-error" text={errors.message} />
                </div>

                <div className="mt-8 flex flex-col gap-5 border-t border-hairline pt-6 sm:flex-row sm:items-center">
                  <Cta type="submit" testId="contact-submit-btn" icon={ArrowUpRight} disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Cta>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint" aria-live="polite" data-testid="contact-status-note">
                    {status === "mailto"
                      ? "Email client opened — press send there to deliver."
                      : status === "error"
                        ? "Send failed — please email me directly."
                        : "Replies within a day or two"}
                  </p>
                </div>
                {status === "mailto" && (
                  <p className="mt-6 border-l border-signal pl-4 text-xs leading-relaxed text-sub" role="status" data-testid="contact-mailto-note">
                    Your email client should have opened with a prefilled message addressed to {PROFILE.email}. If it didn&apos;t, write to me directly at{" "}
                    <a href={`mailto:${PROFILE.email}`} className="link-draw text-ink">{PROFILE.email}</a>.
                  </p>
                )}
              </form>
            )}
          </FadeUp>

          <FadeUp className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Direct channels</p>
            <ul className="mt-5 border-t border-hairline">
              {CHANNELS.map((l) => (
                <li key={l.label} className="border-b border-hairline">
                  <a
                    href={l.href}
                    data-testid={l.testid}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? l.label === "LinkedIn" || l.label === "GitHub"
                          ? "me noopener noreferrer"
                          : "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{l.label}</span>
                    <span className="flex items-center gap-3 text-sm text-sub transition-colors group-hover:text-ink">
                      {l.value}
                      <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={PROFILE.resumePath}
              download
              data-testid="contact-resume-download"
              className="group mt-8 flex items-center justify-between border border-hairline px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sub transition-colors hover:border-ink hover:text-ink"
            >
              Download resume (PDF)
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
