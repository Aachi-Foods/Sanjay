import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import CTABanner from "@/components/CTABanner";
import { productCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products | Aachi Foods",
  description:
    "Explore Aachi Foods' full range: masalas, ready-to-cook mixes, pickles, whole spices, papads, and instant gravy mixes.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-chili-gradient pb-20 pt-40">
        <AnimatedSection className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-turmeric">
            Our Products
          </p>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
            200+ Products, One Standard of Quality
          </h1>
          <p className="mt-6 font-body text-cream/80">
            Every Aachi product is made the way it always has been — with
            care, honest ingredients, and respect for tradition.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <AnimatedSection
            stagger
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {productCategories.map((category) => (
              <ProductCategoryCard key={category.slug} category={category} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
