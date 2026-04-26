import React from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { TrendingMovies } from "@/components/ui/trending-movies";
import { MovieCategories } from "@/components/ui/movie-categories";
import { WhyChooseUs } from "@/components/ui/why-choose-us";
import { PricingSection } from "@/components/ui/pricing-section";
import { getCurrentUser } from "@/lib/auth-session";

async function MainLayoutPage() {
  let session = null;
  try {
    session = await getCurrentUser();
  } catch (error) {
    console.error("Failed to get current user:", error);
  }
  const user = session?.user;
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <MovieCategories />
      <WhyChooseUs />
      {user?.plan != "FREE" ? (
        <></>
      ) : (
        <>
          <PricingSection />
        </>
      )}
    </div>
  );
}

export default MainLayoutPage;
