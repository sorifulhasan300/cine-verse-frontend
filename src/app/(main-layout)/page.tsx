import React from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { TrendingMovies } from "@/components/ui/trending-movies";
import { MovieCategories } from "@/components/ui/movie-categories";
import { WhyChooseUs } from "@/components/ui/why-choose-us";
import { PricingSection } from "@/components/ui/pricing-section";
import { get } from "http";
import { getCurrentUser } from "@/lib/auth-session";

async function MainLayoutPage() {
  const session = await getCurrentUser();
  const user = session?.user;
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <MovieCategories />
      <WhyChooseUs />
      {user.plan != "FREE" ? (
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
