import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidgetLazy } from "@/components/ChatbotWidgetLazy";

// No group-wide metadata here: a shared alternates.canonical would be inherited
// by every page that doesn't override it, telling Google they're all duplicates
// of that one URL. Each page/layout declares its own relative canonical.

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/story/01-who-we-are-opt.jpg" />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidgetLazy />
    </>
  );
}
