import React from "react";
import { Badge } from "@/components/ui/badge";
import { Film, Target, Heart, Zap, Eye, Laugh } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Action",
    icon: Target,
    count: 1250,
    color: "from-red-600 to-red-500",
    description: "High-octane thrills and adrenaline-pumping adventures"
  },
  {
    id: 2,
    name: "Romance",
    icon: Heart,
    count: 890,
    color: "from-pink-600 to-pink-500",
    description: "Heartwarming stories of love and relationships"
  },
  {
    id: 3,
    name: "Sci-Fi",
    icon: Zap,
    count: 675,
    color: "from-blue-600 to-blue-500",
    description: "Futuristic worlds and mind-bending concepts"
  },
  {
    id: 4,
    name: "Horror",
    icon: Eye,
    count: 540,
    color: "from-purple-600 to-purple-500",
    description: "Spine-chilling tales that keep you on edge"
  },
  {
    id: 5,
    name: "Comedy",
    icon: Laugh,
    count: 980,
    color: "from-yellow-600 to-yellow-500",
    description: "Laugh-out-loud entertainment for all ages"
  },
  {
    id: 6,
    name: "Drama",
    icon: Film,
    count: 1100,
    color: "from-green-600 to-green-500",
    description: "Emotional journeys and compelling narratives"
  }
];

export function MovieCategories() {
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
            const Icon = category.icon;
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