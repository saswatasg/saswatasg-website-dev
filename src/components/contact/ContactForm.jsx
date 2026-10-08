import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight } from "lucide-react";
import { trackEvent, getUTM } from "@/utils/analytics";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { deliverContactMessage } from "@/utils/contactDelivery";

const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const MAX_MESSAGE_LENGTH = 1000;

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError(
        "That email won’t deliver — check the domain (e.g., ana@company.com)",
      );
      trackEvent("contact_form", "field_error", "email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailBlur = (e) => {
    validateEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\s\+\-]+$/.test(val)) setPhone(val);
  };
  const handleMessageChange = (e) => {
    if (e.target.value.length <= MAX_MESSAGE_LENGTH) setMessage(e.target.value);
  };

  const isFormValid =
    name.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    !emailError &&
    message.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!isFormValid) {
      trackEvent("contact_form", "validation_failed");
      if (!name.trim()) trackEvent("contact_form", "field_error", "name");
      if (!email.trim() || emailError)
        trackEvent("contact_form", "field_error", "email");
      if (message.trim().length < 10)
        trackEvent("contact_form", "field_error", "message");
      return;
    }
    const utm = getUTM();
    trackEvent("contact_form", "submit", name, 1);
    setIsSubmitting(true);
    setDeliveryStatus("Sending your message…");
    let error = null;
    try {
      await deliverContactMessage(
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          _subject: "New message from portfolio contact form",
          _replyto: email.trim(),
          _template: "table",
          _captcha: "false",
          _utm_source: utm.utm_source || "",
          _utm_medium: utm.utm_medium || "",
          _utm_campaign: utm.utm_campaign || "",
          _referrer: utm.referrer || "",
        },
        {
          store: (signal) =>
            supabase
              .from("contact_submissions")
              .insert([
                {
                  name: name.slice(0, 100),
                  email: email.slice(0, 100),
                  phone: phone.slice(0, 20),
                  message: message.slice(0, 2000),
                  utm_source: utm.utm_source || null,
                  utm_medium: utm.utm_medium || null,
                  utm_campaign: utm.utm_campaign || null,
                  referrer: utm.referrer || null,
                  landing_page: utm.landing_page || null,
                },
              ])
              .abortSignal(signal),
        },
      );
    } catch (e) {
      error = e;
    }
    setIsSubmitting(false);
    if (error) {
      setDeliveryStatus(
        "Delivery could not be confirmed. Your message is still here; email saswatasg@gmail.com instead.",
      );
      toast({
        title: "Message delivery could not be confirmed.",
        description: "Email me directly: saswatasg@gmail.com",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      setDeliveryStatus("Message sent. I’ll reply by email.");
      trackEvent("contact_form", "success", undefined, 1);
      toast({
        title: "Your message has been sent.",
        description: "Thanks for reaching out. I’ll reply by email.",
        duration: 5000,
      });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setEmailError("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-display font-black text-ink mb-1">
          Send me a message
        </h2>
        <p className="text-sm text-ink/70 font-medium mb-8">
          Share a little context and the best email to reach you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
          aria-busy={isSubmitting}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="text-xs font-black tracking-widest text-ink/70"
              >
                NAME *
              </label>
              <Input
                id="contact-name"
                autoComplete="name"
                type="text"
                placeholder="What should I call you?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
                className="mt-1 rounded-lg border-2 border-black"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="text-xs font-black tracking-widest text-ink/70"
              >
                EMAIL *
              </label>
              <Input
                id="contact-email"
                autoComplete="email"
                type="email"
                placeholder="ana@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={handleEmailBlur}
                required
                aria-required="true"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : "email-hint"}
                className={cn(
                  "mt-1 rounded-lg border-2 border-black",
                  emailError && "border-red-500 focus-visible:ring-red-500",
                )}
              />
              {emailError ? (
                <p
                  id="email-error"
                  role="alert"
                  className="text-red-600 text-xs font-bold mt-1"
                >
                  {emailError}
                </p>
              ) : (
                <p
                  id="email-hint"
                  className="text-[11px] font-bold text-ink/50 mt-1"
                >
                  Work email is fine — I only reply, never market.
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="text-xs font-black tracking-widest text-ink/70"
            >
              PHONE <span className="font-bold text-ink/40">(optional)</span>
            </label>
            <Input
              id="contact-phone"
              autoComplete="tel"
              type="tel"
              placeholder="+91 90000 00000"
              value={phone}
              onChange={handlePhoneChange}
              aria-describedby="phone-hint"
              className="mt-1 rounded-lg border-2 border-black"
            />
            <p
              id="phone-hint"
              className="text-[11px] font-bold text-ink/50 mt-1"
            >
              Only if you’d like me to call back.
            </p>
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="text-xs font-black tracking-widest text-ink/70"
            >
              MESSAGE *
            </label>
            <Textarea
              id="contact-message"
              aria-describedby="contact-message-hint"
              placeholder="Tell me about the project, opportunity or question you have in mind."
              rows={5}
              value={message}
              onChange={handleMessageChange}
              required
              aria-required="true"
              className="mt-1 rounded-xl border-2 border-black"
            />
            <p id="contact-message-hint" className="text-xs text-ink/70 mt-1">
              A little context helps—at least 10 characters.
            </p>
            <div className="text-xs font-bold text-ink/60 text-right mt-1">
              {message.length} / {MAX_MESSAGE_LENGTH}
            </div>
          </div>

          <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="wb-page-button wb-contact-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send message <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="text-sm font-medium text-ink"
          >
            {deliveryStatus}
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
