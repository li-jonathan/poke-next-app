export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: string[];
  image: string;
}

export async function fetchPokemon(
  offset: number,
  limit: number
): Promise<Pokemon[]> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      return [];
    }

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();

        return {
          name: pokemon.name,
          url: pokemon.url,
          id: detailData.id,
          types: detailData.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          image:
            detailData.sprites.other["official-artwork"].front_default ||
            detailData.sprites.front_default,
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return [];
  }
}

export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ghost: "bg-purple-700",
    dragon: "bg-violet-700",
    dark: "bg-gray-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300",
  }

  return typeColors[type] || "bg-gray-500"
}