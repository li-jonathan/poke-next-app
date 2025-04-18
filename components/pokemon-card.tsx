import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Pokemon, getTypeColor } from "@/lib/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
  activeTeam?: "my" | "enemy";
}

export default function PokemonCard({
  pokemon,
  onClick,
  activeTeam,
}: PokemonCardProps) {
  return (
    <button
      className={`overflow-hidden hover:shadow-lg transition-shadow border border-gray-300 p-6 rounded-xl w-full ${
        onClick
          ? "hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          : ""
      }`}
      onClick={onClick}
    >
      {onClick && activeTeam && (
        <div
          className={`h-2 w-full rounded-full ${
            activeTeam === "my" ? "bg-blue-500" : "bg-red-500"
          }`}
        />
      )}
      <span className="block text-right font-semibold italic text-lg text-gray-500 my-2">
        #{pokemon.id}
      </span>
      <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md">
        {pokemon.image ? (
          <Image
            src={pokemon.image || "/placeholder.svg"}
            alt={pokemon.name}
            width={160}
            height={160}
            className="h-full object-contain p-4"
          />
        ) : (
          <div className="text-muted-foreground">No image available</div>
        )}
      </div>
      <p className="text-2xl font-semibold capitalize my-2 text-left">{pokemon.name}</p>
      <div className="flex gap-2 flex-wrap">
        {pokemon.types.map((type) => (
          <Badge
            key={type}
            className={`${getTypeColor(
              type
            )} uppercase text-sm font-semibold px-2 py-1`}
          >
            {type}
          </Badge>
        ))}
      </div>
    </button>
  );
}
