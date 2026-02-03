"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDestination?: string;
}

export function BookingModal({ isOpen, onClose, prefilledDestination }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: prefilledDestination || "",
    groupSize: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (prefilledDestination) {
      setFormData((prev) => ({ ...prev, destination: prefilledDestination }));
    }
  }, [prefilledDestination]);

  useEffect(() => {
    if (isOpen) {
      trackEvent({ action: "modal_open", category: "booking", label: "booking_modal" });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent({ action: "form_submit", category: "lead", label: "booking_form" });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    trackEvent({ action: "form_success", category: "lead", label: "booking_form" });
    // Reset after a delay or keep success state
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-background border-4 border-foreground p-6 retro-shadow shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 hover:bg-accent hover:text-accent-foreground border-2 border-transparent hover:border-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!isSuccess ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">Secure Your Spot</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours with a custom quote.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase">
                      Group Leader Name
                    </label>
                    <input
                      id="name"
                      required
                      className="w-full bg-white border-2 border-foreground p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full bg-white border-2 border-foreground p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="destination" className="text-sm font-bold uppercase">
                        Destination
                      </label>
                      <select
                        id="destination"
                        className="w-full bg-white border-2 border-foreground p-3 focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      >
                        <option value="">Select...</option>
                        <option value="Budapest">Budapest</option>
                        <option value="Krakow">Krakow</option>
                        <option value="Lisbon">Lisbon</option>
                        <option value="Prague">Prague</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="groupSize" className="text-sm font-bold uppercase">
                        Group Size
                      </label>
                      <input
                        id="groupSize"
                        type="number"
                        min="1"
                        className="w-full bg-white border-2 border-foreground p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                        value={formData.groupSize}
                        onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold uppercase">
                      Special Requests
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full bg-white border-2 border-foreground p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Request Quote"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4 border-2 border-foreground">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Request Received!</h3>
                <p className="text-muted-foreground mb-6">
                  Sit tight! We'll be in touch shortly to plan the ultimate trip.
                </p>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
