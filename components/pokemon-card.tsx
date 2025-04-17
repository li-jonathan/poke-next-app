import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Pokemon, getTypeColor } from "@/lib/pokemon";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="capitalize text-lg font-semibold">
            {pokemon.name}
          </span>
          <span className="text-md italic text-muted-foreground">
            #{pokemon.id}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="h-40 flex items-center justify-center mb-3 bg-gray-100 rounded-md">
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
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <Badge key={type} className={`${getTypeColor(type)} capitalize`}>
              {type}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
