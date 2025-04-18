import { Loader2 } from "lucide-react";
import PokemonCard from "./pokemon-card";
import type { Pokemon } from "@/lib/pokemon";

interface PokemonGridProps {
  pokemon: Pokemon[];
  lastPokemonRef: (node: HTMLDivElement | null) => void;
  isSearching: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  onPokemonClick?: (pokemon: Pokemon) => void;
  activeTeam?: "my" | "enemy";
}

export default function PokemonGrid({
  pokemon,
  lastPokemonRef,
  isSearching,
  isLoadingMore,
  hasMore,
  onPokemonClick,
  activeTeam,
}: PokemonGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pokemon.map((pokemonItem, index) => {
          const isLastElement = index === pokemon.length - 1;
          return (
            <div
              key={pokemonItem.id}
              ref={isLastElement && !isSearching ? lastPokemonRef : null}
            >
              <PokemonCard
                pokemon={pokemonItem}
                onClick={
                  onPokemonClick ? () => onPokemonClick(pokemonItem) : undefined
                }
                activeTeam={activeTeam}
              />
            </div>
          );
        })}
      </div>

      {isLoadingMore && !isSearching && (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading more Pokémon...</span>
        </div>
      )}

      {!hasMore && !isSearching && pokemon.length > 0 && (
        <p className="text-center mt-8 text-muted-foreground">
          You&apos;ve reached the end! All Pokémon have been loaded.
        </p>
      )}

      {pokemon.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg">No Pokémon found matching your search.</p>
        </div>
      )}
    </>
  );
}
