import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Education } from '@/components/Education';
import { WorkExperience } from '@/components/WorkExperience';
import { Blog } from '@/components/Blog';
import { Contact } from '@/components/Contact';
import { ScrollUrlUpdater } from '@/components/ScrollUrlUpdater';

export default function SkillsPage() {
  return (
    <>
      <ScrollUrlUpdater />
      <Hero />
      <Skills />
      <Projects />
      <Education />
      <WorkExperience />
      <Blog />
      <Contact />
    </>
  );
}
