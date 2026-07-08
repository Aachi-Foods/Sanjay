import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import StorySection from "@/components/about/StorySection";
import Philosophy from "@/components/about/Philosophy";
import TeamGrid from "@/components/about/TeamGrid";
import InvitationTeaser from "@/components/home/InvitationTeaser";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Bells n Rings Event Planners and the philosophy that shapes every wedding, corporate event, birthday, and destination celebration we design.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Our Story, Our Team, Our Philosophy"
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Placeholder — Bells n Rings team styling a wedding tablescape"
      />
      <StorySection />
      <Philosophy />
      <TeamGrid />
      <InvitationTeaser />
    </>
  );
}
