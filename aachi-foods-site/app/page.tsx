import HeroSection from "@/components/HeroSection";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import AnimatedSection from "@/components/AnimatedSection";
import StatsCounter from "@/components/StatsCounter";
import CTABanner from "@/components/CTABanner";
import { productCategories } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-chili">
              Our Range
            </p>
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
              From Our Kitchen to Yours
            </h2>
            <p className="mt-4 font-body text-charcoal/70">
              200+ products spanning spices, masalas, ready-to-cook mixes, and
              traditional pickles — every one true to its South Indian roots.
            </p>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {productCategories.map((category) => (
              <ProductCategoryCard key={category.slug} category={category} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      <StatsCounter />
      <CTABanner />
    </>
  );
}
