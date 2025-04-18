"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import type { Pokemon } from "@/lib/pokemon";
import {
  calculateTypeEffectiveness,
  calculateTeamScore,
  findWeakPokemon,
} from "@/lib/battle-logic";
import { RatingPie } from "@/components/rating-pie";
import Image from "next/image";

export default function BattlePage() {
  const router = useRouter();
  const [teamScore, setTeamScore] = useState(0);
  const [weakPokemon, setWeakPokemon] = useState<
    { pokemon: Pokemon; score: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const myTeamData = localStorage.getItem("myTeam");
      const enemyTeamData = localStorage.getItem("enemyTeam");

      if (!myTeamData || !enemyTeamData) {
        router.push("/");
        return;
      }

      const myTeamParsed = JSON.parse(myTeamData);
      const enemyTeamParsed = JSON.parse(enemyTeamData);

      if (!myTeamParsed.length || !enemyTeamParsed.length) {
        router.push("/");
        return;
      }

      const calculatedMatchups = calculateTypeEffectiveness(
        myTeamParsed,
        enemyTeamParsed
      );

      const score = calculateTeamScore(calculatedMatchups);
      setTeamScore(score);

      const weak = findWeakPokemon(myTeamParsed, enemyTeamParsed);
      setWeakPokemon(weak);

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading team data:", error);
      router.push("/");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-bold mb-4">
            Analyzing battle matchups...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold">Team Analysis</h2>
      <div className="flex flex-col justify-center p-8">
        <div className="flex flex-col justify-center items-center border border-gray-400 rounded-md p-6">
          <RatingPie
            value={teamScore}
            size={180}
            strokeWidth={15}
            className="mb-6"
          />

          {teamScore >= 75 ? (
            <div className="flex items-center gap-2 text-green-500 text-lg font-semibold">
              <CheckCircle className="h-5 w-5" />
              <span>Your team has a strong advantage!</span>
            </div>
          ) : teamScore >= 50 ? (
            <div className="flex items-center gap-2 text-yellow-500 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5" />
              <span>Your team is evenly matched.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500 text-lg font-semibold">
              <XCircle className="h-5 w-5" />
              <span>Your team is at a disadvantage!</span>
            </div>
          )}
        </div>
        <h3 className="text-xl mt-6 font-semibold mb-2">Improvements</h3>
        <div className="mb-6">
          {weakPokemon.length > 0 ? (
            <div className="space-y-4">
              {weakPokemon.map((item) => (
                <div key={item.pokemon.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.pokemon.image || "/placeholder.svg"}
                      alt={item.pokemon.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium capitalize">
                        {item.pokemon.name}
                      </h4>
                      <span className="text-red-500 text-sm">
                        {item.score}% effective
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Weak against most of the enemy team&apos;s types
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="h-5 w-5" />
              <span>All your Pokémon have good matchups!</span>
            </div>
          )}
        </div>
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
