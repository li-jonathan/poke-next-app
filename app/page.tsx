"use client";

import { useState } from "react";
import SearchBar from "@/components/search-bar";
import PokemonGrid from "@/components/pokemon-grid";
import LoadingSkeletons from "@/components/loading-skeletons";
import { usePokemonSearch } from "@/hooks/use-pokemon-search";
import type { Pokemon } from "@/lib/pokemon";
import { TeamBuilder } from "@/components/team-builder";
import { toast } from "sonner";

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    filteredPokemon,
    isLoading,
    isLoadingMore,
    hasMore,
    lastPokemonElementRef,
  } = usePokemonSearch(searchQuery);

  const [myTeam, setMyTeam] = useState<Pokemon[]>([]);
  const [enemyTeam, setEnemyTeam] = useState<Pokemon[]>([]);
  const [activeTeam, setActiveTeam] = useState<"my" | "enemy">("my");

  const addToTeam = (pokemon: Pokemon) => {
    const team = activeTeam === "my" ? myTeam : enemyTeam;
    const setTeam = activeTeam === "my" ? setMyTeam : setEnemyTeam;
    const teamName = activeTeam === "my" ? "your team" : "enemy team";

    if (team.length >= 6) {
      toast.error("Team is full", {
        description: `You can only have 6 Pokémon in ${teamName}.`,
      });
      return;
    }

    if (team.some((p) => p.id === pokemon.id)) {
      toast.error("Already in team", {
        description: `${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        } is already in ${teamName}.`,
      });
      return;
    }

    setTeam([...team, pokemon]);
    toast.success("Added to team", {
      description: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} added to ${teamName}.`,
    });
  };

  const removeFromTeam = (pokemonId: number, team: "my" | "enemy") => {
    if (team === "my") {
      setMyTeam(myTeam.filter((p) => p.id !== pokemonId));
    } else {
      setEnemyTeam(enemyTeam.filter((p) => p.id !== pokemonId));
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="mx-auto flex flex-col bg-gray-100 rounded-md p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Pokémon Battle Buddy
          </h1>
          <TeamBuilder
            myTeam={myTeam}
            enemyTeam={enemyTeam}
            activeTeam={activeTeam}
            setActiveTeam={setActiveTeam}
            removeFromTeam={removeFromTeam}
          />
        </div>
        <div className="w-full">
          <div className="mx-auto mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          {isLoading ? (
            <LoadingSkeletons count={12} />
          ) : (
            <PokemonGrid
              pokemon={filteredPokemon}
              lastPokemonRef={lastPokemonElementRef}
              isSearching={!!searchQuery}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              onPokemonClick={addToTeam}
              activeTeam={activeTeam}
            />
          )}
        </div>
      </div>
    </div>
  );
}
