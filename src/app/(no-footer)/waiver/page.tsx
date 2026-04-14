import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Event Participation Waiver | Colorado Springs Health Collective",
  description: "Participation waiver for Colorado Springs Health Collective community events.",
};

export default function Waiver() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(210, 32%, 12%)" }}>
      <div className="container mx-auto px-5 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="rounded-2xl p-8 lg:p-12" style={{ background: "hsla(210, 22%, 18%, 0.9)" }}>
            <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center" style={{ color: "hsl(0, 0%, 100%)" }}>
              Community Event Participation Waiver
            </h1>
            <div className="text-lg leading-relaxed space-y-6" style={{ color: "hsl(0, 0%, 90%)" }}>
              <p>By signing up, you acknowledge that this group activity is voluntary and not medical care.</p>
              <p>Outdoor fitness carries risks such as falls, uneven terrain, weather, and traffic. You are responsible for your own safety and fitness level.</p>
              <p>By participating, you assume all risks and agree not to hold Colorado Springs Health Collective – Direct Primary Care or its organizers liable for any injury or loss.</p>
              <h2 className="text-xl font-semibold pt-4" style={{ color: "hsl(0, 0%, 100%)" }}>Photo & Video Release</h2>
              <p>You consent to being photographed or recorded during events. These images or videos may be used for promotional purposes, social media, or marketing by Colorado Springs Health Collective – Direct Primary Care. If you do not wish to be photographed, please notify an organizer before the event begins.</p>
              <h2 className="text-xl font-semibold pt-4" style={{ color: "hsl(0, 0%, 100%)" }}>Medical Acknowledgment</h2>
              <p>You confirm that you are physically capable of participating in outdoor fitness activities. If you have any medical conditions, injuries, or limitations that may affect your ability to safely participate, you agree to consult with your healthcare provider before joining. You are solely responsible for monitoring your own health and stopping activity if you experience pain, dizziness, or other warning signs.</p>
            </div>
            <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: "hsla(0, 0%, 100%, 0.1)" }}>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 70%)" }}>Colorado Springs Health Collective – Direct Primary Care</p>
              <p className="text-sm mt-1" style={{ color: "hsl(0, 0%, 60%)" }}>(719) 824-4716 | dpc@coshealthcollective.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
