import { CombatStrategy } from "grimoire-kolmafia";
import {
  cliExecute,
  drink,
  fullnessLimit,
  inebrietyLimit,
  myAdventures,
  myFamiliar,
  myFullness,
  myInebriety,
  mySpleenUse,
  spleenLimit,
  use,
  useSkill,
} from "kolmafia";
import {
  $effect,
  $effects,
  $familiar,
  $item,
  $items,
  $location,
  $skill,
  get,
  have,
  Macro,
  uneffect,
} from "libram";
import { getCurrentLeg, Leg, Quest, Task } from "./structure";

export function canEat(): boolean {
  return (
    myFullness() < fullnessLimit() ||
    mySpleenUse() < spleenLimit() ||
    myInebriety() < inebrietyLimit() ||
    get("currentMojoFilters") < 3
  );
}

function stooperDrunk(): boolean {
  return (
    myInebriety() > inebrietyLimit() ||
    (myInebriety() === inebrietyLimit() && myFamiliar() === $familiar`Stooper`)
  );
}

export function garboAscend(after: string[], garbo: string): Task[] {
  return [
    {
      name: "Garbo",
      after: after,
      completed: () => (myAdventures() === 0 && !canEat()) || stooperDrunk(),
      do: () => {
        if (have($item`can of Rain-Doh`) && !have($item`Rain-Doh blue balls`))
          use($item`can of Rain-Doh`);
        cliExecute(garbo);
      },
      limit: { tries: 1 },
      tracking: "Garbo",
    },
    {
      name: "Wish",
      after: [...after],
      completed: () => get("_genieWishesUsed") >= 3 || !have($item`genie bottle`),
      do: () => cliExecute(`genie wish for more wishes`),
      limit: { tries: 3 },
    },
    {
      name: "Stooper",
      after: [...after, "Garbo", "Wish"],
      do: () => cliExecute(`drink Sacramento wine`),
      completed: () => stooperDrunk(),
      outfit: { equip: $items`mafia pinky ring`, familiar: $familiar`Stooper` },
      effects: $effects`Ode to Booze`,
      limit: { tries: 1 },
    },
    {
      name: "Caldera",
      after: [...after, "Stooper"],
      acquire: [{ item: $item`heat-resistant sheet metal`, price: 5000, optional: true }],
      prepare: () => useSkill($skill`Cannelloni Cocoon`),
      do: $location`The Bubblin' Caldera`,
      completed: () =>
        $location`The Bubblin' Caldera`.turnsSpent >= 7 ||
        $location`The Bubblin' Caldera`.noncombatQueue.includes("Lava Dogs"),
      combat: new CombatStrategy().macro(new Macro().attack().repeat()),
      outfit: { modifier: "muscle", familiar: $familiar`Stooper` },
      limit: { tries: 10 }, // Clear intro adventure
    },
    {
      name: "Overdrink",
      after: [...after, "Stooper"],
      do: () => drink($item`Schrödinger's thermos`),
      completed: () => myInebriety() > inebrietyLimit(),
      effects: $effects`Ode to Booze`,
      limit: { tries: 1 },
    },
    {
      name: "Overdrunk",
      after: [...after, "Overdrink"],
      prepare: () => uneffect($effect`Drenched in Lava`),
      completed: () => myAdventures() === 0 && myInebriety() > inebrietyLimit(),
      do: () => cliExecute("garbo"),
      limit: { tries: 1 },
    },
  ];
}

export const AftercoreQuest: Quest = {
  name: "Aftercore",
  completed: () => getCurrentLeg() > Leg.Aftercore,
  tasks: [
    {
      name: "Breakfast",
      after: [],
      completed: () => get("breakfastCompleted"),
      do: () => cliExecute("breakfast"),
      limit: { tries: 1 },
    },
    ...garboAscend(["Breakfast"], "garbo yachtzeechain ascend"),
  ],
};