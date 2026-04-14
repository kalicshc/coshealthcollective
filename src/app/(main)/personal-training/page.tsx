import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal Training Colorado Springs | Strength Training & Fitness Plans",
  description: "Personalized strength and fitness training in Colorado Springs. Custom workout plans tailored to your goals, abilities, and lifestyle. Focus on education, proper technique, injury prevention, and lasting results.",
};

export default function PersonalTraining() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "transparent" }}>
      <div className="container mx-auto px-5 lg:px-8 text-center py-20">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(30,75%,60%), hsl(177,70%,59%))" }}>
            <Dumbbell className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210,32%,12%)" }} />
          </div>
        </div>

        <div className="mb-8">
          <span className="inline-block px-6 py-2 text-sm font-medium rounded-full" style={{ background: "linear-gradient(135deg, hsl(30,75%,60%), hsl(177,70%,59%))", color: "hsl(210,32%,12%)" }}>
            Personalized Fitness
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "hsl(0,0%,100%)" }}>
          Personal Training
        </h1>

        <p className="text-xl lg:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210,40%,89%)" }}>
          Personalized strength and fitness plans tailored to your goals, abilities, and lifestyle.
          Focus on education and proper strength training techniques to prevent injury and achieve lasting results.
        </p>

        <p className="text-lg mb-8" style={{ color: "hsl(210,25%,69%)" }}>
          Full service details coming soon. Contact us to learn more.
        </p>

        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, hsl(30,75%,60%), hsl(177,70%,59%))", color: "hsl(210,32%,12%)" }}>
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
