import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Hero } from '@/components/Hero';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col gap-12 sm:gap-16">
      <Hero />
      <About />
      <Contact />
    </main>
  );
}

