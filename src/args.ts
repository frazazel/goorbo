import { Args } from "grimoire-kolmafia";
import { Item, toClass } from "kolmafia";
import { $class, $classes, $item, $items, get } from "libram";
import { permTiers } from "./tasks/perm";
import { toMoonSign } from "./tasks/utils";

export const args = Args.create(
  "goorbo",
  `Written by frazazel #422389 (previous ign: SketchySolid). This is a full-day script for glooping. It aims to be a single-press script that will take you through your Aftercore and Grey You legs, collecting fat loot tokens, getting a Steel Liver, and leveling up to level 13 before running garbo. It chooses a class for you to learn guild skills, and to perm learned skills upon ascension.`,
  {
    //alternate-run flags
    version: Args.flag({
      help: "Output script version number and exit.",
      default: false,
      setting: "",
    }),
    sim: Args.flag({
      help: "If set, see the recommended items and skills, then return without taking any actions.",
      default: false,
      setting: "",
    }),
    simperms: Args.flag({
      help: "If set, see your current and available perms, as well as the plan for this run, then return without taking any actions.",
      default: false,
      setting: "",
    }),
    list: Args.flag({
      help: "Show the status of all tasks and exit.",
      setting: "",
    }),

    //partial run args
    actions: Args.number({
      help: "Maximum number of actions to perform, if given. Can be used to execute just a few steps at a time.",
    }),
    abort: Args.string({
      help: "If given, abort during the prepare() step for the task with matching name.",
    }),

    //configuration args
    permtier: Args.number({
      help: `Target perming all skills in the given tier and all better tiers. Choose 0 to only perm non-gnome, non-guild skills that you may have manually learned`,
      options: [[-1, "Do not perm anything"] as [number, (string | undefined)?]].concat(
        permTiers.map((str, num) => [
          num,
          str.length < 40 ? str.substring(9) : `${str.substring(9, 37)}...`,
        ])
      ),
      // options: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => [num]),
      default: 6,
    }),
    pvp: Args.flag({ help: "If true, break hippy stone and do pvp.", default: false }),
    astralpet: Args.custom(
      {
        help: "Choose the astral pet you want to buy in valhalla",
        options:
          $items`astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt, none`.map(
            (it) => [it]
          ),
        default: $item`astral pet sweater`,
      },
      Item.get,
      "ITEM"
    ),
    moonsign: Args.custom(
      {
        help: "Choose the moonsign you want to ascend into",
        options: [
          "mongoose",
          "wallaby",
          "vole",
          "platypus",
          "opossum",
          "marmot",
          "wombat",
          "blender",
          "packrat",
        ].map((str) => [toMoonSign(str)]),
        default: toMoonSign("blender"),
      },
      toMoonSign,
      "MOONSIGN"
    ),
    defaultclass: Args.custom(
      {
        help: "Choose your default class, if goorbo doesn't have any other goals this run",
        options:
          $classes`Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief`.map(
            (cl) => [cl]
          ),
        default: $class`Seal Clubber`,
      },
      toClass,
      "CLASS"
    ),
    class: Args.custom(
      {
        help: "Choose the class to choose at prism break. If set, will override any class that might be desired for skill-perming purposes",
        options:
          $classes`none, Seal Clubber, Turtle Tamer, Pastamancer, Sauceror, Disco Bandit, Accordion Thief`.map(
            (cl) => [cl]
          ),
        default: $class`none`,
      },
      toClass,
      "CLASS"
    ),
    clan: Args.string({
      help: `Your VIP Clan. Goorbo will whitelist into it at the beginning of your day. Requires clan whitelist.`,
    }),
    targetlevel: Args.number({
      help: `What level to target via adventuring in Uncle Gator's after breaking the prism`,
      default: 13,
    }),
    buffy: Args.boolean({
      help: "Set this to false to stop asking Buffy for buffs.",
      default: true,
    }),
    pulls: Args.items({
      help: "A list of items to pull at the start of the Grey You run.",
      default: [
        ...$items`mafia thumb ring, lucky gold ring`,
        ...(get("stenchAirportAlways") || get("_stenchAirportToday")
          ? []
          : $items`one-day ticket to Dinseylandfill`),
      ],
    }),
    ascend: Args.flag({
      help: "Run with this flag to skip tasks that prepare you for rollover, including steel liver.",
      default: false,
    }),
    gyouscript: Args.string({
      help: "The command that will do your Grey You run for you. Include any arguments desired.",
      default: "loopgyou chargegoose=20",
    }),
    garbo: Args.string({
      help: "The command that will be used to diet and use all your adventures after reaching level 13 in Day 1 aftercore.",
      default: "garbo",
    }),
    roninfarm: Args.string({
      help: "A command to be run at the start of ronin-farming. For best effect, make sure that it stops when your turncount reaches 1000.",
    }),
    garboascend: Args.string({
      help: `The command that will be used to diet and use all your adventures in Day 2 aftercore. If it is detected to be a garbo script call, it will function with voatest and CMC will be installed in last 100 turns. If it is not, then voatest will be ignored, and CMC will be installed prior to running this script.`,
      default: "garbo ascend",
    }),
    voatest: Args.boolean({
      help: `If set, will run your d2 garbo turns just like normal, but will separately track the last 100 turns, to give you an estimate of what your real-world valueOfAdventure is. Divide your total "VoA Test" profit by 100 for your VoA estimate. Note that it might show > 100 adventures spent, if garbo equipped the mafia thumb ring, June cleaver, or other adventure gaining equipment. This flag may be ignored if a custom setting of garboascend is used`,
      default: true,
    }),
    tip: Args.flag({
      help: "Send all your soap knives to the author. Thanks!",
      default: false,
    }),
  }
);
