"use client"

import { useState } from "react"
import SearchBar from "@/components/search-bar"
import PokemonGrid from "@/components/pokemon-grid"
import LoadingSkeletons from "@/components/loading-skeletons"
import { usePokemonSearch } from "@/hooks/use-pokemon-search"

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const { filteredPokemon, isLoading, isLoadingMore, hasMore, lastPokemonElementRef } =
    usePokemonSearch(searchQuery)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Pokémon Battle Buddy</h1>

      <div className="max-w-xl mx-auto mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {isLoading ? (
        <LoadingSkeletons count={12} />
      ) : (
        <>
          <p className="text-center mb-8 text-muted-foreground">
            Found {filteredPokemon.length} Pokémon
            {searchQuery ? " matching your search" : ""}
          </p>

          <PokemonGrid
            pokemon={filteredPokemon}
            lastPokemonRef={lastPokemonElementRef}
            isSearching={!!searchQuery}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        </>
      )}
    </div>
  )
}
