"use client";
import type { Pokemon } from "@/lib/pokemon";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface TeamPokemonIconProps {
  pokemon: Pokemon;
  onRemove: (id: number) => void;
}

export const TeamPokemonIcon = ({ pokemon, onRemove }: TeamPokemonIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-square bg-muted/30 rounded-md overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRemove(pokemon.id)}
    >
      <Image
        src={pokemon.image || "/placeholder.svg"}
        alt={pokemon.name}
        width={100}
        height={100}
        className="w-full h-full object-contain p-1"
      />
      <div
        className={`absolute inset-0 bg-red-500/20 flex items-center justify-center transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100`}
      >
        <X className="w-4 h-4 text-red-500" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-0.5 px-1">
        <p className="text-[10px] text-white truncate text-center capitalize">
          {pokemon.name}
        </p>
      </div>
    </div>
  );
}
