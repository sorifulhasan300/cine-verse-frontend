"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Film, Target, Heart, Zap, Eye, Laugh } from "lucide-react";
import { categoryService, Category } from "@/services/category.service";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Action: Target,
  Romance: Heart,
  "Sci-Fi": Zap,
  Horror: Eye,
  Comedy: Laugh,
  Drama: Film,
};

const colorMap: Record<string, string> = {
  Action: "from-red-600 to-red-500",
  Romance: "from-pink-600 to-pink-500",
  "Sci-Fi": "from-blue-600 to-blue-500",
  Horror: "from-purple-600 to-purple-500",
  Comedy: "from-yellow-600 to-yellow-500",
  Drama: "from-green-600 to-green-500",
};

const descriptionMap: Record<string, string> = {
  Action: "High-octane thrills and adrenaline-pumping adventures",
  Romance: "Heartwarming stories of love and relationships",
  "Sci-Fi": "Futuristic worlds and mind-bending concepts",
  Horror: "Spine-chilling tales that keep you on edge",
  Comedy: "Laugh-out-loud entertainment for all ages",
  Drama: "Emotional journeys and compelling narratives",
};

export function MovieCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories({ limit: 6 });
        if (response.error) {
          throw new Error(response.error);
        }

        const apiCategories = response.data || [];
        const categoriesWithMeta: Category[] = apiCategories.slice(0, 6).map((category) => ({
          ...category,
          icon: iconMap[category.name] || Film,
          color: colorMap[category.name] || "from-gray-600 to-gray-500",
          description: descriptionMap[category.name] || "Explore this genre",
          count: category.movieCount || category.count || 0,
        }));

        setCategories(categoriesWithMeta);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-6 w-32 bg-slate-700 animate-pulse rounded mb-4 mx-auto"></div>
            <div className="h-12 w-64 bg-slate-700 animate-pulse rounded mb-4 mx-auto"></div>
            <div className="h-6 w-96 bg-slate-700 animate-pulse rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
                    <div>
                      <div className="h-6 w-20 bg-slate-700 rounded mb-2"></div>
                      <div className="h-4 w-16 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                  <div className="h-16 bg-slate-700 rounded mb-4"></div>
                  <div className="h-6 w-24 bg-slate-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load categories: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-red-600/10 text-red-400 border-red-600/20">
            🎭 Explore Genres
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Movie Categories
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Find your perfect movie in our extensive collection of genres.
            From action-packed blockbusters to heartwarming dramas.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon!;
            return (
              <div
                key={category.id}
                className="group relative bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-slate-400">{category.count} movies</p>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{category.description}</p>

                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                    Explore {category.name}
                  </Badge>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Can&apos;t find what you&apos;re looking for? Browse all our movies.
          </p>
          <button className="text-red-400 hover:text-red-300 font-semibold transition-colors">
            View Complete Collection →
          </button>
        </div>
      </div>
    </section>
  );
}