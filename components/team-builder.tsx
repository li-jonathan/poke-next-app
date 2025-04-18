"use client";

import type { Pokemon } from "@/lib/pokemon";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { TeamDisplay } from "./team-display";

interface TeamBuilderProps {
  myTeam: Pokemon[];
  enemyTeam: Pokemon[];
  activeTeam: "my" | "enemy";
  setActiveTeam: (team: "my" | "enemy") => void;
  removeFromTeam: (pokemonId: number, team: "my" | "enemy") => void;
}

export function TeamBuilder({
  myTeam,
  enemyTeam,
  activeTeam,
  setActiveTeam,
  removeFromTeam,
}: TeamBuilderProps) {

  const handleBattleClick = () => {
    if (myTeam.length === 0) {
      toast.error("Your team is empty", {
        description: "Please add at least one Pokémon to your team.",
      });
      return;
    }

    if (enemyTeam.length === 0) {
      toast.error("Enemy team is empty", {
        description: "Please add at least one Pokémon to your team.",
      });
      return;
    }

    localStorage.setItem("myTeam", JSON.stringify(myTeam));
    localStorage.setItem("enemyTeam", JSON.stringify(enemyTeam));
  };

  return (
    <div className="bg-muted/30 rounded-lg w-full">
      <div className="flex flex-col justify-between items-start gap-2">
        <h2 className="text-2xl font-semibold">Team Builder</h2>
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="team-toggle"
            className={
              activeTeam === "my" ? "font-medium" : "text-muted-foreground"
            }
          >
            My Team
          </Label>
          <Switch
            id="team-toggle"
            checked={activeTeam === "enemy"}
            onCheckedChange={(checked: boolean) =>
              setActiveTeam(checked ? "enemy" : "my")
            }
          />
          <Label
            htmlFor="team-toggle"
            className={
              activeTeam === "enemy" ? "font-medium" : "text-muted-foreground"
            }
          >
            Enemy Team
          </Label>
        </div>
      </div>

      <div className="my-6 text-sm text-muted-foreground">
        <p>
          Click on a Pokémon card below to add it to your{" "}
          {activeTeam === "my" ? "team" : "enemy team"}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
        <TeamDisplay
          team={myTeam}
          title="My Team"
          isActive={activeTeam === "my"}
          onRemove={(id) => removeFromTeam(id, "my")}
        />
        <TeamDisplay
          team={enemyTeam}
          title="Enemy Team"
          isActive={activeTeam === "enemy"}
          onRemove={(id) => removeFromTeam(id, "enemy")}
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Link href="/battle" onClick={handleBattleClick}>
          <Button className="gap-2">
            <Swords className="h-4 w-4" />
            Analyze Battle Matchup
          </Button>
        </Link>
      </div>
    </div>
  );
}
