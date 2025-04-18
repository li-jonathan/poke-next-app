import type { Pokemon } from "@/lib/pokemon";
import { Badge } from "./ui/badge";
import { TeamPokemonIcon } from "./team-pokemon-icon";

interface TeamDisplayProps {
  team: Pokemon[];
  title: string;
  isActive: boolean;
  onRemove: (id: number) => void;
}

export const TeamDisplay = ({
  team,
  title,
  isActive,
  onRemove,
}: TeamDisplayProps) => {
  return (
    <div
      className={`border rounded-md p-3 ${
        isActive ? "border-primary" : "border-border"
      }`}
    >
      <h3 className="text-sm font-medium mb-2 flex justify-between">
        <span>{title}</span>
        <Badge variant="outline" className="ml-2">
          {team.length}/6
        </Badge>
      </h3>
      <div className="grid grid-cols-6 xl:grid-cols-3 gap-2">
        {team.map((pokemon) => (
          <TeamPokemonIcon
            key={pokemon.id}
            pokemon={pokemon}
            onRemove={onRemove}
          />
        ))}
        {Array.from({ length: 6 - team.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square bg-muted/50 rounded-md flex items-center justify-center"
          >
            <span className="text-muted-foreground text-xs">Empty</span>
          </div>
        ))}
      </div>
    </div>
  );
};
