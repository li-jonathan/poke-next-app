import type { Pokemon } from "./pokemon";

const typeEffectivenessChart: Record<string, Record<string, number>> = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5,
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

interface MatchUp {
  myPokemon: Pokemon;
  enemyPokemon: Pokemon;
  effectiveness: number;
}

export function calculateSingleTypeEffectiveness(
  attackType: string,
  defenseType: string
): number {
  if (!typeEffectivenessChart[attackType]) return 1;
  return typeEffectivenessChart[attackType][defenseType] || 1;
}

export function calculatePokemonEffectiveness(
  attacker: Pokemon,
  defender: Pokemon
): number {
  let maxEffectiveness = 0;
  attacker.types.forEach((attackType) => {
    let effectiveness = 1;
    defender.types.forEach((defenseType) => {
      effectiveness *= calculateSingleTypeEffectiveness(
        attackType,
        defenseType
      );
    });
    if (effectiveness > maxEffectiveness) {
      maxEffectiveness = effectiveness;
    }
  });
  return maxEffectiveness;
}

export function calculateTypeEffectiveness(
  myTeam: Pokemon[],
  enemyTeam: Pokemon[]
) {
  const matchups: MatchUp[] = [];

  myTeam.forEach((myPokemon) => {
    enemyTeam.forEach((enemyPokemon) => {
      const effectiveness = calculatePokemonEffectiveness(
        myPokemon,
        enemyPokemon
      );
      matchups.push({
        myPokemon,
        enemyPokemon,
        effectiveness,
      });
    });
  });

  return matchups;
}

export function calculateTeamScore(matchups: MatchUp[]): number {
  if (matchups.length === 0) return 50;
  const favorableMatchups = matchups.filter((m) => m.effectiveness > 1).length;
  const totalMatchups = matchups.length;
  const baseScore = (favorableMatchups / totalMatchups) * 100;
  return Math.min(Math.max(Math.round(baseScore), 0), 100);
}

export function findWeakPokemon(
  myTeam: Pokemon[],
  enemyTeam: Pokemon[]
): { pokemon: Pokemon; score: number }[] {
  const weakPokemon: { pokemon: Pokemon; score: number }[] = [];

  myTeam.forEach((myPokemon) => {
    let favorableMatchups = 0;
    let totalMatchups = 0;

    enemyTeam.forEach((enemyPokemon) => {
      const effectiveness = calculatePokemonEffectiveness(
        myPokemon,
        enemyPokemon
      );
      if (effectiveness > 1) {
        favorableMatchups++;
      }
      totalMatchups++;
    });

    const effectivenessScore = Math.round(
      (favorableMatchups / totalMatchups) * 100
    );

    if (effectivenessScore < 40) {
      weakPokemon.push({
        pokemon: myPokemon,
        score: effectivenessScore,
      });
    }
  });
  return weakPokemon.sort((a, b) => a.score - b.score);
}
