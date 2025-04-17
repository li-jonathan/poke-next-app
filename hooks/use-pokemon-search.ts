"use client"

import { useState, useEffect } from "react"
import { type Pokemon, fetchPokemon } from "@/lib/pokemon"
import { useInfiniteScroll } from "./use-infinite-scroll"

export function usePokemonSearch(searchQuery: string) {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const limit = 20

  const {
    isLoading: isLoadingMore,
    setIsLoading: setIsLoadingMore,
    offset,
    hasMore,
    setHasMore,
    lastElementRef,
  } = useInfiniteScroll({
    initialOffset: limit,
    limit,
    shouldLoad: !searchQuery,
  })

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true)
      const initialPokemon = await fetchPokemon(0, limit)
      setAllPokemon(initialPokemon)
      setFilteredPokemon(initialPokemon)
      setIsLoading(false)
    }

    initialLoad()
  }, [limit])

  useEffect(() => {
    const loadMorePokemon = async () => {
      if (offset === limit || !isLoadingMore || searchQuery) return;
      try {
        const morePokemon = await fetchPokemon(offset, limit)

        if (morePokemon.length === 0) {
          setHasMore(false)
        } else {
          setAllPokemon((prev) => [...prev, ...morePokemon])
          setFilteredPokemon((prev) => (searchQuery ? prev : [...prev, ...morePokemon]))
        }
      } catch (error) {
        console.error("Error loading more Pokemon:", error)
      } finally {
        setIsLoadingMore(false)
      }
    }

    loadMorePokemon()
  }, [offset, limit, searchQuery, setHasMore, isLoadingMore, setIsLoadingMore])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPokemon(allPokemon)
    } else {
      const filtered = allPokemon.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pokemon.id.toString().includes(searchQuery) ||
          pokemon.types.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredPokemon(filtered)
    }
  }, [searchQuery, allPokemon])

  return {
    allPokemon,
    filteredPokemon,
    isLoading,
    isLoadingMore,
    hasMore,
    lastPokemonElementRef: lastElementRef,
  }
}
