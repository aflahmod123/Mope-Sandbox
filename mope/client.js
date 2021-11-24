
var gamever = 99;
var KTestingModeON = true;
var KTestingBetaMode = true && !KTestingModeON;
var ACTIVATEOURGAMEMODE = false
var url = new URL(window.location.href);
var secr = url.searchParams.get("ModeActivate");

if (secr === "true") {

ACTIVATEOURGAMEMODE = true
}
console.log("CLIENT BY MOPE.IO , I DO NOT OWN ANY OF THIS , ADDICTINGGAMES OWN MOPE.IO THIS IS JUST A PRIVATE SERVER MADE WITH MOPE CLIENT..");

console.log("\n\n\n");
console.log("--------------------------------------------");
console.log("");
console.log("#    #  ####  #####  ######     #  ####");
console.log("##  ## #    # #    # #          # #    #");
console.log("# ## # #    # #    # #####      # #    #");
console.log("#    # #    # #####  #      ### # #    #");
console.log("#    # #    # #      #      ### # #    #");
console.log("#    #  ####  #      ###### ### #  ####");
console.log("___ Mope.io™ Copyright 2017- Mopeio Ltd. ___");
console.log("--------------------------------------------");
console.log(
  "-----------Game Version " +
    gamever +
    (KTestingBetaMode ? " (BETA)" : "") +
    " ----------------"
);
console.log("\n\n\n");
console.log("CLIENT BY MOPE.IO , I DO NOT OWN ANY OF THIS , ADDICTINGGAMES OWN MOPE.IO THIS IS JUST A PRIVATE SERVER MADE WITH MOPE CLIENT..");
//import all js files (correct order matters if using global, lower lvl files first! Eg. GameObj before GameObjBerry)


///////
// file: js_src/gameobj/GameObjType.js
///////

//definitions of game objects (variables declared without 'var' are GLOBAL)

var o_biome_land = 1,
  o_animal = 2,
  o_hill = 3,
  o_waterSpot = 4,
  o_hidingHole = 5,
  o_hidingBush = 6,
  o_mudSpot = 7,
  o_rockHill = 8,
  o_bigHidingHole = 9,
  o_lake = 10,
  o_lakeIsland = 11,
  o_biome_ocean = 12,
  o_hidingHoleOcean = 13,
  o_abilityGObj = 14,
  o_fruitTree = 15,
  o_biome_arctic = 16,
  o_arcticIce = 17,
  o_fireBall = 18,
  o_snowBall = 19,
  o_berry = 20,
  o_water = 21,
  o_mushroom = 22,
  o_lillypad = 23,
  o_bigMushroom = 24,
  o_bigMushroomBush = 25,
  o_plankton = 26,
  o_berryBush = 27,
  o_planktonBush = 28,
  o_banana = 29,
  o_coconut = 30,
  o_raspberry = 31,
  o_pear = 32,
  o_beach = 33,
  o_biome_ocean_extraWater = 34,
  o_seaweed = 35,
  o_starfish = 36,
  o_kelp = 37,
  o_clam = 38,
  o_conchShell = 39,
  o_river = 40,
  o_volcano = 42,
  o_lava = 43,
  o_lavaLake = 44,
  o_healingStone = 46,
  o_biome_volcano = 47,
  o_arcticNut = 48,
  o_carrot = 49,
  o_watermelon = 50,
  o_watermelonSlice = 51,
  o_meatSmall = 52,
  o_meatMedium = 53,
  o_meatLarge = 54,
  // poison biome
  o_biome_poison = 55,
  o_poisonBerry = 56,
  o_spiderWeb = 57,
  o_bog = 58,
  o_poisonBall = 59,
  o_cloudBerry = 60,
  o_flock = 61,
  o_flockspot = 62,
  o_egg = 63,
  o_sleigh = 64,
  o_quill = 65,
  o_ostrichEgg = 66,
  o_waterDrop = 67,
  o_beeHive = 68,
  o_honeyComb = 69,
  o_fire = 70,
  o_fireTornado = 71,
  o_sinkHole = 72,
  o_DangerAreaCircle = 73,
  o_animalCarcass = 74,
  o_chilli = 75,
  o_safeArea = 76,
  o_spawnEgg = 77,
  o_teamStone = 78,
    o_biome_desert = 79,
o_turkishflag = 80,
o_infectionDrop = 81,
o_dragonfruit = 82,
o_raspberrynew = 83,
o_firerange = 84,
o_gift = 85,
o_particles = 86,
o_firewood = 87;
//o_hat = 99;
var GameObjType = {
  //makes it easy to add new subclasses- each class will add itself!
  customClassesForOType: {},

  setClassForAnimalType: function(theClass, aniT) {
    this.setCustomClassForGameObjType(theClass, o_animal, aniT);
  },

  //set a class to be used for creating GameObjs with a certain 'oType' and/or secondaryType (eg. animalType)
  setCustomClassForGameObjType: function(theClass, oType, secondaryType) {
    //if (!(oType in this.customClassesForOType)) { //create def. if doesnt exist
    if (!this.customClassesForOType[oType]) {
      //create def. if doesnt exist
      this.customClassesForOType[oType] = {
        oTypeMainClass: null,
        secondaryTypeClasses: {}
      };
    }
    var classesObj = this.customClassesForOType[oType];

    if (secondaryType == null) {
      //no eg. 'animalType', just the classes

      if (classesObj.oTypeMainClass != null)
        //if something already set
        console.log(
          "ERROR 'GameObjType.setCustomClassForGameObjType': a class (" +
            this.customClassesForOType[oType] +
            ") is already set for oType " +
            oType +
            "! Check for duplicate calls!"
        );
      classesObj.oTypeMainClass = theClass;
    } else {
      //secondary type

      if (secondaryType in classesObj.secondaryTypeClasses)
        //if something already set
        console.log(
          "ERROR 'GameObjType.setCustomClassForGameObjType': a class is already set for oType " +
            oType +
            " AND secondaryType (eg. animalType) " +
            secondaryType +
            "! Check for duplicate calls!"
        );

      classesObj.secondaryTypeClasses[secondaryType] = theClass;
    }
    this.onClassSet(theClass, oType, secondaryType);
  },

  getClassForGameObjType: function(oType, secondaryType) {
    if (oType in this.customClassesForOType) {
      var classesObj = this.customClassesForOType[oType];

      if (secondaryType == null || secondaryType == 0)
        return classesObj.oTypeMainClass;
      else {
        if (secondaryType in classesObj.secondaryTypeClasses)
          //if has a subclass for the secondary type (aniT), use this
          return classesObj.secondaryTypeClasses[secondaryType];
        //otherwise, return the main type class (eg. Animal)
        else return classesObj.oTypeMainClass;
      }
    } else return GameObj;
  },

  /*setGameObjClassForGameObjType:function(theClass, theOType){
        this.registedClassesAtObjTypes[theOType]=theClass;
    }*/

  //creates gameobj of correct GameObj subclass for newlyVisible Msg
  newlyVis_createGameObjFromMsg: function(msg) {
    var oType = msg.readUInt8();
	
    var secondaryType = null;

    if (oType == o_animal || oType == o_abilityGObj|| oType == o_particles) {
      //read secondary type for certain object types
   
      secondaryType = msg.readUInt8();
      if(oType == o_particles)console.log(secondaryType)
    }
//	console.log("oType: " + oType + " 2: " + secondaryType);
    //create the GameObj
    var newObj = GameObjType.createGameObjOfOType(oType, secondaryType);
    //setup from msg
    newObj.worldUpd_readMsgNewlyVisible(msg, oType, secondaryType);
    return newObj;
  },

  //sepearte method, useful for stand-alone gameObjs, eg for octopus
  createGameObjOfOType: function(oType, secondaryType) {
    var chosenClass = this.getClassForGameObjType(oType, secondaryType); //class to create obj
    //console.log("Class for oType "+oType+" (secondaryType "+secondaryType+") is "+chosenClass.name);

    //create the GameObj
    var newObj = new chosenClass(oType, secondaryType);
    return newObj;
  },
  onClassSet: function(theClass) {}
};

//window.GameObjType=GameObjType;


///////
// file: js_src/gameobj/animal/AnimalType.js
///////

var a_mouse = 1,
  a_rabbit = 2,
  a_fox = 4,
  a_deer = 5,
  a_mole = 6,
  a_zebra = 7,
  a_lion = 8,
  a_bigCat = 9,
  a_bear = 10,
  a_croc = 11,
  a_rhino = 12,
  a_hippo = 13,
  a_dragn = 14,
  a_shrimp = 15,
  a_trout = 16,
  a_crab = 17,
  a_squid = 18,
  a_shark = 19,
  a_stingray = 20,
  a_turtle = 21,
  a_seaHorse = 22,
  a_jellyFish = 23,
  a_kraken = 24,
  a_pufferFish = 25,
  a_killerWhale = 26,
  a_swordfish = 27,
  a_gorilla = 28,
  a_octopus = 29,
  a_wolf = 30,
  a_arcticHare = 31,
  a_yeti = 32,
  a_chipmunk = 33,
  a_muskox = 34,
  a_penguin = 35,
  a_polarBear = 36,
  a_seal = 37,
  a_snowLeopard = 38,
  a_walrus = 39,
  a_reindeer = 40,
  a_arcticFox = 41,
  a_wolverine = 42,
  a_mammoth = 43,
  a_donkey = 44,
  a_snail = 45,
  a_blackDragon = 46,
  a_sabertoothTiger = 47,
  a_elephant = 48,
  a_blueWhale = 49,
  a_cobra = 50,
  a_boaConstrictor = 51,
  a_giantSpider = 52,
  a_trex = 53,
  a_tiger = 54,
  a_giraffe = 55,
  a_eagle = 56,
  a_hedgehog = 57,
  a_duck = 58,
  a_duckling = 59,
  a_lemming = 60,
  a_kingCrab = 61,
  a_frog = 62,
  a_ostrich = 63,
  a_pelican = 64,
  a_falcon = 65,
  a_snowyOwl = 66,
  a_honeyBee = 67,
  a_phoenix = 68,
  a_ostrichBaby = 69,
  a_seaMonster = 70,
  a_landMonster = 71,
  a_iceMonster = 72,
  a_dinoMonster = 73,
  a_pigeon = 74,
  a_toucan = 75,
a_thunderbird = 76,
a_pterodactyl = 77,
a_scorpion = 78,
    a_kingdragon = 79,
    a_bigfoot = 80,
a_lochness = 83,
a_griffin = 84,
a_santa = 85,
a_finaldragon = 86;
var infoForAnimalType = function (aniT) {
    var infoO = {};
    switch (aniT) {
        case a_snail:
            infoO.aniName = "Snail";
            infoO.aniDesc = "";
            infoO.upgradeText = "You're a super slow snail!";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "snail";
            break;
      case a_bigfoot:
            infoO.aniName = "The BigFoot";
            infoO.aniDesc = "";
            infoO.upgradeText= 'UPGRADED to ' + infoO.aniName + `! So it really exists... \n
 Right click/W to throw Spears. \n
Hold to make a fire (every 30s)`;
            infoO.aniCol = "#839eb5";
            infoO.skinName = "bigfoot/thebigfoot";
        break;
        case a_kingdragon:
            infoO.aniName = "King Dragon";
            infoO.aniDesc = "";
            infoO.upgradeText = "!\
You got firestream that burns your victim alive! Watch your tail and slap them hard.";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "kingdragon/kingdragon";
            break;
     
         case a_scorpion:
            infoO.aniName = "Giant Scorpion";
            infoO.aniDesc = "";
            infoO.upgradeText = 'UPGRADED to ' + infoO.aniName + "\nSting and Shiver your prey to death.\n(Press W to Sting)";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "giantscorpion";
            break;
         case a_pterodactyl:
            infoO.aniName = "Pterodactyl";
            infoO.aniDesc = "";
            infoO.upgradeText = 'UPGRADED to ' + infoO.aniName + '\nFly and dive onto prey to pick it up.';

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "pterodactyl";
            break;
              case a_lochness:
            infoO.aniName = "Loch Ness";
            infoO.aniDesc = "";
               infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Tear Apart your preys with your mouth!";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "lochness/lochness";
            break;
                    case a_finaldragon:
            infoO.aniName = "Final Dragon";
            infoO.aniDesc = "";
               infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Fly Tail Slap and fire stream! you're powerful!";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "lochness/lochness";
            break;
         
      case a_griffin:
            infoO.aniName = "Griffin";
            infoO.aniDesc = "";
          infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Catch Animals with your strong claws!";

            infoO.aniCol = "#22FF8A";
            infoO.skinName = "griffin";
            break;
        
    
           case a_santa:
            infoO.aniName = "Santa";
            infoO.aniDesc = "";
            infoO.upgradeText ="Drop Gifts with S (random loots!)"
            infoO.aniCol = "#22FF8A";
            infoO.skinName = "santa/eagle";
            break;
       
        
              case a_mouse:
            infoO.aniName = "Mouse";
            infoO.aniDesc = "";
            infoO.upgradeText = "";

            infoO.aniCol = "#9BA9B9";
            infoO.skinName = "mouse";
            break;
       case a_rabbit:
            infoO.aniName = "Rabbit";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to RABBIT! \nPress W to burrow a hole to hide in!";
            infoO.aniCol = "#AA937E";
            infoO.skinName = "rabbit";
            break;
        case a_fox:
            infoO.aniName = "Fox";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to FOX! ,\n You can kick players out of hiding holes! (Press W when in one!)\n+ Hide in red berry bushes!";
            infoO.aniCol = "#FF9D43";
            infoO.skinName = "fox";
            break;
        case a_deer:
            infoO.aniName = "Deer";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to DEER! \nPress W to dig up food! \nDig in mud for better food!\n Hint:Check water areas for new food sources!";
            infoO.aniCol = "#C4773E";
            infoO.skinName = "deer";
            break;
        case a_mole:
            infoO.aniName = "Mole";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to MOLE!\n Hold W to dig underground!\nGo under anything, do surprise attacks!";
            infoO.aniCol = "#4C4A45";
            infoO.skinName = "mole";
            break;
        case a_zebra:
            infoO.aniName = "Zebra";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to ZEBRA! \nPress W to kick side ways!";
            infoO.aniCol = "#FFFFFF";
            infoO.skinName = "zebra";
            break;
        case a_lion:
            infoO.aniName = "Lion";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to LION!\n Press W to release a mighty ROAR (Rawr!)!";
            infoO.aniCol = "#f8c923";
            infoO.skinName = "lion";
            break;

        case a_bigCat:
            infoO.aniName = "CHEETAH";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to CHEETAH!\n Press W to get a speed boost! (Every 8 seconds)!";
            infoO.aniCol = "#CAC05B";
            infoO.skinName = "bigcat/cheetah";
            break;
        case a_bear:
            infoO.aniName = "Bear";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to BEAR!\n Bears climb through green hills! (Press W to use your claw!)";
            infoO.aniCol = "#99591C";
            infoO.skinName = "bear";
            break;
        case a_croc:
            infoO.aniName = "Croc";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to CROCODILE!\n Press W to bite and drag around animals! \n+ (Now hide in water spots)+ Swim well in Mud, Lakes & Oceans!";
            infoO.aniCol = "#30F51C";
            infoO.skinName = "croc";
            break;
        case a_hippo:
            infoO.aniName = "Hippo";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to HIPPO!\nHippos are great swimmers, dominate the Lakes/Oceans/Mud!";
            infoO.aniCol = "#945A99";
            infoO.skinName = "hippo";
            break;
        case a_rhino:
            infoO.aniName = "Rhino";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to RHINO!\n Press W to CHARGE with your mighty horn!";
            infoO.aniCol = "#94a3a9";
            infoO.skinName = "rhino";
            break;
        case a_shrimp:
            infoO.aniName = "Shrimp";
            infoO.aniDesc = "";
            infoO.upgradeText = "";
            infoO.aniCol = "#f88e37";
            infoO.skinName = "shrimp";
            break;
        case a_trout:
            infoO.aniName = "Trout";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to TROUT!\nHint: Hold Left-click to RUN! (Uses extra water)";
            infoO.aniCol = "#ac8686";
            infoO.skinName = "trout";
            break;
        case a_crab:
            infoO.aniName = "Crab";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to CRAB!\n Crabs can survive on dry land!\n (On land, Press W to go into your shell!)";
            infoO.aniCol = "#bf2408";
            infoO.skinName = "crab";
            break;
        case a_squid:
            infoO.aniName = "Squid";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to SQUID!\n Squids can use INK when injured (press W!) \n+ you can hide in plankton bushes!";
            infoO.aniCol = "#40dda4";
            infoO.skinName = "squid";
            break;
        case a_shark:
            infoO.aniName = "Shark";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to SHARK!\n A vicious predator of the oceans!";
            infoO.aniCol = "#999fc6";
            infoO.skinName = "shark";
            break;
        case a_seaHorse:
            infoO.aniName = "Sea-horse";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to SEA HORSE!\n An agile hunter!";
            infoO.aniCol = "#73BE2F";
            infoO.skinName = "seahorse";
            break;
        case a_jellyFish:
            infoO.aniName = "Jellyfish";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to JELLYFISH!\n A slowly-turning animal that can grow quite large!";
            infoO.aniCol = "#FDB9BA";
            infoO.skinName = "jellyfish";
            break;
        case a_turtle:
            infoO.aniName = "Turtle";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to TURTLE!\n Lives well on land & water! (On land, Press W to go into your shell!)";
            infoO.aniCol = "#502E1A";
            infoO.skinName = "turtle";
            break;
        case a_stingray:
            infoO.aniName = "Stringray";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to STINGRAY!\n Use electic shock (Release W key!) to shock animals! \n(Takes time to recharge)";
            infoO.aniCol = "#164336";
            infoO.skinName = "stingray";
            break;
        case a_kraken:
            infoO.aniName = "The Kraken";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to THE KRAKEN!\n Terrorize the oceans, and be feared by all!\n (Release W to use whirlpool ability!)";
            infoO.aniCol = "#64a034";
            infoO.skinName = "kraken";
            break;
        case a_pufferFish:
            infoO.aniName = "Pufferfish";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to PUFFERFISH!\n (Hold W to inflate- become spiky, and dangerous to touch!)";
            infoO.aniCol = "#6C5C2C";
            infoO.skinName = "pufferfish";
            break;
        case a_killerWhale:
            infoO.aniName = "Killer Whale";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Killer Whale! \nWhales blow out water when diving! (And sometimes other loot!)";
            infoO.aniCol = "#141414";
            infoO.skinName = "killerwhale";
            break;
        case a_swordfish:
            infoO.aniName = "Swordfish";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n (Press W to rush with your sharp nose!)";
            infoO.aniCol = "#689CD7";
            infoO.skinName = "swordfish";
            break;
        case a_gorilla:
            infoO.aniName = "Gorilla";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Gorillas are very fast on hills/trees!\n Press W to throw bananas! (from trees)";
            infoO.aniCol = "#323232";
            infoO.skinName = "gorilla";
            break;
        case a_octopus:
            infoO.aniName = "Octopus";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Octopus!\nHold W to use your 'Disguise' ability!\n(Hint: wait for prey to bite you- they get stunned!)";
            infoO.aniCol = "#ff8340";
            infoO.skinName = "octopus";
            break;
        case a_dragn:
            infoO.aniName = "Dragon";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n (You're amazing!) \nFly over everything, Hold W to shoot fire!";
            infoO.aniCol = "#22FF8A";
            infoO.skinName = "dragon/0/dragon";
            break;
        case a_blackDragon:
            infoO.aniName = "Black Dragon";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Black dragons drink lava instead of water! Black dragons only heal on healing stones/lava!";
            infoO.aniCol = "black";
            infoO.skinName = "blackdragon/blackdragon";
            break;

        case a_giantSpider:
            infoO.aniName = "Giant Spider";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Place web around the game to catch prey!";
            infoO.aniCol = "black";
            infoO.skinName = "giantSpider";
            break;

        case a_cobra:
            infoO.aniName = "Cobra";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Hold W to Spit venom, and poison animals with your bite!";
            infoO.aniCol = "black";
            infoO.skinName = "cobra";
            break;

        case a_boaConstrictor:
            infoO.aniName = "Boa Constrictor";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Coil and suffocate other animals!";
            infoO.aniCol = "black";
            infoO.skinName = "boaConstrictor";
            break;

        case a_trex:
            infoO.aniName = "T-REX";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + " The Dinosaur!\n This ancient dinosaur has powerful jaws that can drag prey around!!";
            infoO.aniCol = "#862A2A";
            infoO.skinName = "trex";
            break;
        case a_tiger:
            infoO.aniName = "Tiger";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Tiger!\n Tigers can launch an ambush attack (HOLD W to grow a bush) Release to attack!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "tiger";
            break;

        case a_giraffe:
            infoO.aniName = "Giraffe";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Giraffe!\nGiraffe have huge legs and stomp anyone in their way!";
            infoO.aniCol = "#E9BD23";
            infoO.skinName = "giraffe";
            break;


        case a_eagle:
            infoO.aniName = "Eagle";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Eagle!\nEagles can fly up other animals in the air! !\n";
            infoO.aniCol = "#5b400d";
            infoO.skinName = "eagle";
            break;

        case a_arcticFox:
            infoO.aniName = "Arctic Fox";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n You can kick players out of hiding holes! (Press W when in one!)\n+ Hide in red berry bushes!";
            infoO.aniCol = "#CFCFCF";
            infoO.skinName = "arctic/arcticfox";
            break;
        case a_arcticHare:
            infoO.aniName = "Arctic Hare";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n \nPress W to burrow a hole to hide in!";
            infoO.aniCol = "#D5D5D5";
            infoO.skinName = "arctic/arctichare";
            break;
        case a_yeti:
            infoO.aniName = "The Yeti!";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n So it really exists... \n Hold W to turn into snow, release W to freeeeeze!";
            infoO.aniCol = "#839eb5";
            infoO.skinName = "arctic/yeti";
            break;
        case a_chipmunk:
            infoO.aniName = "Chipmunk";
            infoO.aniDesc = "";
            infoO.upgradeText = ""; //A little "+infoO.aniName+"...";
            infoO.aniCol = "#A77C30";
            infoO.skinName = "arctic/chipmunk";
            break;

        case a_muskox:
            infoO.aniName = "Muskox";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Press W to charge with your horns! \nPlus move decently on ice!";
            infoO.aniCol = "#231f18";
            infoO.skinName = "arctic/muskox";
            break;
        case a_penguin:
            infoO.aniName = "Penguin";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Left-click to run!\n (HOLD W to slide FAST on ice)!";
            infoO.aniCol = "#FFFFFF";
            infoO.skinName = "arctic/penguin";
            break;
        case a_polarBear:
            infoO.aniName = "Polar Bear";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Polar bears can climb hills! \n+ They're amazing swimmers!";
            infoO.aniCol = "#e4e4e4";
            infoO.skinName = "arctic/polarbear";
            break;
        case a_seal:
            infoO.aniName = "Seal";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Seals can slide on ice (Hold W) + can climb hills (rocks too!)";
            infoO.aniCol = "#cfcfcf";
            infoO.skinName = "arctic/seal";
            break;
        case a_snowLeopard:
            infoO.aniName = "Snow leopard";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Press W to get a speed boost! (Every 8 seconds)!";
            infoO.aniCol = "#cfcfcf";
            infoO.skinName = "arctic/snowleopard";
            break;
        case a_walrus:
            infoO.aniName = "Walrus";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n You can slide on ice (Hold W) + can climb hills (rocks too!)";
            infoO.aniCol = "#633838";
            infoO.skinName = "arctic/walrus";
            break;
        case a_reindeer:
            infoO.aniName = "Reindeer";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Press W to dig up food! \n Your sharp hooves let you turn very well on ice!";
            infoO.aniCol = "#a68976";
            infoO.skinName = "arctic/reindeer";
            break;
        case a_wolf:
            infoO.aniName = "Wolf";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Wolf paws turn very well on ice!\n Press W to howl!";
            infoO.aniCol = "#6B6B6B";
            infoO.skinName = "arctic/wolf";
            break;
        case a_wolverine:
            infoO.aniName = "Wolverine";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Press W to Let out a Powerful GROWL! (Knocks back prey!)";
            infoO.aniCol = "#843A0F";
            infoO.skinName = "arctic/wolverine";
            break;
        case a_mammoth:
            infoO.aniName = "Mammoth";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Press W to roll snowballs with your trunk!\n The bigger the snowball gets, the longer the freeze!";
            infoO.aniCol = "#9d4717";
            infoO.skinName = "arctic/mammoth";
            break;
        case a_donkey:
            infoO.aniName = "Donkey";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Press W to Kick any animal behind you";
            infoO.aniCol = "#8c7c64";
            infoO.skinName = "donkey";
            break;
            /* NEW ANIMALS */
        case a_sabertoothTiger:
            infoO.aniName = "Sabertooth Tiger";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Sabertooth Tiger!\nSabertooth Tigers are great swimmers, dominate the Lakes/Oceans/Mud!";
            infoO.aniCol = "#945A99";
            infoO.skinName = "sabertoothtiger";
            break;
        case a_elephant:
            infoO.aniName = "Elephant";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to " + infoO.aniName + "!\n Use your long trunk to attack and eat food!";
            infoO.aniCol = "#945A99";
            infoO.skinName = "elephant";
            break;

        case a_blueWhale:
            infoO.aniName = "Blue Whale";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Blue Whale!\n Smash with your powerful tail!";
            infoO.aniCol = "#945A99";
            infoO.skinName = "bluewhale";
            break;

        // case a_duck:
        //     infoO.aniName = "Duck";
        //     infoO.aniDesc = "";
        //     infoO.upgradeText = "UPGRADED to a DUCK!";
        //     infoO.aniCol = "#FF9000";
        //     infoO.skinName = "duck";
        //     break;
        case a_duckling:
            infoO.aniName = "Duckling";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to a DUCK!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "duck/duckling";
            break;

        case a_hedgehog:
            infoO.aniName = "Hedgehog";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Hedgehog!\n (Hold W to become spiky, and dangerous to touch!)";
            infoO.aniCol = "#5b400d";
            infoO.skinName = "hedgehog";
            break;


        case a_kingCrab:
            infoO.aniName = "King Crab";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to a KING CRAB!";
            infoO.aniCol = "#971f0e";
            infoO.skinName = "kingcrab";
            break;
        case a_lemming:
            infoO.aniName = "Lemming";
            infoO.aniDesc = "";
            infoO.upgradeText = ""; //A little "+infoO.aniName+"...";
            infoO.aniCol = "#A77C30";
            infoO.skinName = "arctic/lemming";
            break;

        case a_frog:

            infoO.aniName = "Frog";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Frog!!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "frog/frog";

            break;

        case a_ostrich:

            infoO.aniName = "Ostrich";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Ostrich! Lay eggs to hatch babies! \nCommand babies by placing your crosshair (right-click/W)-\n They can attack prey!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "ostrich/ostrich";

            break;
        case a_pelican:

            infoO.aniName = "Pelican";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Pelican! \nPick up water (and prey!) in your mouth,\nfly, and drop water on prey! (press W again)";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "pelican/pelican";

            break;
        case a_falcon:

            infoO.aniName = "Falcon";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Falcon! \nFly, and do a powerful dive attack! Aim it well.";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "falcon/falcon";

            break;
        case a_thunderbird:

            infoO.aniName = "The Thunderbird!";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Thunderbird! \nFly, and do a powerful thunderous dive attack!\nWhen flying stay still to blend with the sky!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "thunderbird/thunderbird";

            break;
        case a_snowyOwl:

            infoO.aniName = "Snowy Owl";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Snowy Owl!\n Aim the crosshair, \n right click/W when it's on top of prey, to attack!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "snowyowl/snowyowl";

            break;


        case a_ostrichBaby:

            infoO.aniName = "Baby Ostrich";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to Baby Ostrich!!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "ostrich/baby-ostrich";

            break;
        case a_phoenix:

            infoO.aniName = "Phoenix";
            infoO.upgradeText = "UPGRADED to Phoenix!\nCreate powerful fire tornados to burn your enemies alive!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "phoenix/phoenix";
            break;

        case a_seaMonster:
            infoO.aniName = "Sea Monster";
            infoO.upgradeText = "UPGRADED to Sea Monster!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "seamonster";
            break;
        case a_landMonster:
            infoO.aniName = "Land Monster";
            infoO.upgradeText = "UPGRADED to Land Monster!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "landmonster";
            break;
        case a_iceMonster:
            infoO.aniName = "Ice Monster";
            infoO.upgradeText = "UPGRADED to Ice Monster!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "monsters/icemonster/icemonster";
            break;
        case a_dinoMonster:
            infoO.aniName = "Dino Monster";
            infoO.upgradeText = "UPGRADED to Dino Monster!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "monsters/dinomonster/dinomonster4";
            break;
        case a_pigeon:
            infoO.aniName = "Pigeon";
            infoO.upgradeText = "UPGRADED to Pigeon!\nHold W to fly around. ";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "pigeon/1/pigeon";
            break;
        case a_toucan:
            infoO.aniName = "Toucan";
            infoO.upgradeText = "UPGRADED to Toucan!\nHold W to fly around. ";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "toucan/toucan";
            break;


        default:
            infoO.aniName = "(Animal)";
            infoO.aniDesc = "";
            infoO.aniCol = "#000000";
            infoO.upgradeText = "UPGRADED!";
    }

    return infoO;
}

function onAniTypeSet() {

}


///////
// file: js_src/gameobj/ability/AbilityType.js
///////

var ability_dive = 100,
  ability_boost = 101,
  ability_none = 0,
  ability_digUnderground = 1,
  ability_shell = 2,
  ability_stingRayShock = 3,
  ability_squidInk = 4,
  ability_krakenSpec = 5,
  ability_whaleBlow = 6,
  ability_octoDisguise = 7,
  ability_iceSlide = 8,
  ability_charge = 9,
  ability_pufferFishPuff = 10,
  //new abilities! :)
  ability_yetiTransform = 11,
  ability_wolfHowl = 12,
  ability_snowShot = 13,
  ability_clawSlash = 14,
  ability_extraBoost = 15,
  ability_snowPoop = 16,
  ability_mammothThrow = 17,
  ability_lionRoar = 18,
  ability_fireShoot = 19,
  ability_backLegKick = 20,
  ability_crocWaterGrab = 21,
  ability_makeHidingHole = 22,
  ability_foxhidingHoleKickout = 23,
  ability_fruitThrow = 24,
  ability_foodSlowDig = 25,
  ability_jellyFishSting = 26,
  ability_spawnGrass = 27,
  ability_orcaWave = 28,
  ability_fireShoot2 = 30,
  ability_elephantTrunkSmack = 31,
  ability_whaleTailHit = 32,
  ability_sabertoothJawAttack = 33,
  ability_cobraVenomSpit = 34,
  ability_spiderWeb = 35,
  ability_boaSuffocate = 36,
  // trex update
  ability_trexShake = 37,
  ability_tiger = 38,
  ability_tigerSlash = 39,
  ability_tigerJump = 40,
  ability_pounce = 41,
  ability_giraffeStomp = 42,
  ability_zebraKick = 43,
  ability_sharkBite = 46,
  ability_eagleAttack = 47,
  ability_fart = 48,
  ability_hedgehogAttack = 49,
  ability_crabSmash = 51,
  ability_ostrich = 54,
  ability_pelican = 55,
  ability_waterSplash = 56,
  ability_falconAttack = 57,
  ability_owlAttack = 58,
  ability_targetCircle = 59,
  ability_honeyBee = 60,
  ability_phoenix = 61,
  ability_bearSlash = 62,
  // monster update
  ability_seaMonsterSpec = 63,
  ability_pigeon = 64,
  ability_toucan = 65,
  ability_landmonsterSpec = 66,
  ability_1v1 = 67,
  ability_1v1Arena = 68,
  ability_soccerPass = 69,
  ability_soccerKick = 70,
  ability_goalScored = 71,
  ability_zombieInfection = 72,
  ability_tsunamiWave = 73,
  ability_finalhit = 74,
  ability_flyhigh = 75,
  ability_freezeprey = 76,
  ability_kickinair = 77,
  ability_thunderbirdAttack = 78,
   ability_stingscorp= 79,
   ability_pterodactyl= 80,
    ability_spear = 81;
var infoForAbilityT = function(abilT) {
  var infoO = {};
  var zombieFolder = "";

  var myPlayer = gameObjsByID[myPlayerID];

  

  switch (abilT) {
      
         case ability_pterodactyl:
        infoO.abilName = "Dive Attack\n(Fly with Prey)";
      if(myPlayer){
      infoO.abilImg =
        "skins/desert/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +"/" +
        myPlayer.animalSpecies + "/"
        +
        "pterodactyl_ability.png";
      }
      break;
    case ability_stingscorp:
      
        infoO.abilName = "Sting!\n(Shivers Prey)";
       if(myPlayer){
      infoO.abilImg =
        "skins/desert/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName + "/" +
        myPlayer.animalSpecies + "/"
        +
        "scorpion_ability.png";
              }
      break;

    case ability_whaleTailHit:
      infoO.abilName = "Tail Slap";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
        case ability_finalhit:
   if(myPlayer){
      infoO.abilName = "Tail Slap";
      infoO.abilImg =
         "skins/" +
          zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName + "/" +
        myPlayer.animalSpecies + "/"
        +
        "tail.png";
     }
      break;
    case ability_elephantTrunkSmack:
      infoO.abilName = "Trunk Hit";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_dive:
      infoO.abilName = "Dive";
      infoO.abilImg = "img/ability_dive.png";
      break;
    case ability_foodSlowDig:
      infoO.abilName = "Dig For Food";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_shell:
      infoO.abilName = "Shell";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        "2.png";
      break;
    case ability_crocWaterGrab:
      infoO.abilName = "Bite Drag";
      infoO.abilImg =crocBite
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_boaSuffocate:
      infoO.abilName = "Suffocate prey";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;

    case ability_pelican:
      infoO.abilName = "Fly with water";
      infoO.abilImg = "skins/pelican/ability_pelican.png";
      break;

    case ability_octoDisguise:
      infoO.abilName = "Disguise";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_makeHidingHole:
      infoO.abilName = "Burrow Hole";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_foxhidingHoleKickout:
      infoO.abilName = "Pull from Hole";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_kickinair:
      
       infoO.abilName = "Kick in air";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_charge:
      infoO.abilName = "Charge";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_mammothThrow:
      infoO.abilName = "Roll snow";
      infoO.abilImg = "img/snowball.png";
      break;
    case ability_cobraVenomSpit:
      infoO.abilName = "Venom Spit";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_spiderWeb:
      infoO.abilName = "Spin Web";
      infoO.abilImg = "img/spiderWeb.png";
      break;
    case ability_snowShot:
      infoO.abilName = "Throw Snow";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_snowPoop:
      infoO.abilName = "Drop Snow";
      infoO.abilImg = "img/snowball.png";
      break;

    case ability_lionRoar:
      infoO.abilName = "Loud Noise";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_clawSlash:
      infoO.abilName = "Claw Slash";
      infoO.abilImg = "img/ability_claw.png";
      break;
    case ability_squidInk:
      infoO.abilName = "Ink";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_stingRayShock:
      infoO.abilName = "Shock";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_digUnderground:
      infoO.abilName = "Hold to Dig";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_wolfHowl:
      infoO.abilName = "Howl";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_fruitThrow:
      infoO.abilName = "Throw Banana";
      infoO.abilImg =
        "skins/" +
        +zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_orcaWave:
      infoO.abilName = "Cause Wave";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_extraBoost:
      infoO.abilName = "Extra Boost";

      if (myPlayerLastAniT == a_bigCat) {
        if (myPlayer) {
          var aniInfoO = myPlayer.animalInfo();
          infoO.abilImg = "skins/" + zombieFolder + aniInfoO.skinName + ".png";
        }
      } else
        infoO.abilImg =
          "skins/" +
          zombieFolder +
          infoForAnimalType(myPlayerLastAniT).skinName +
          ".png";
      break;
    case ability_iceSlide:
      infoO.abilName = "Slide on ice";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;

    case ability_pufferFishPuff:
      infoO.abilName = "Inflate";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_hedgehogAttack:
      infoO.abilName = "Spikes";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        "2.png";
      break;
    case ability_fireShoot:
      infoO.abilName = "Fire";
      infoO.abilImg = "img/fire.png";
      break;
    case ability_yetiTransform:
       infoO.abilName = "Yeti Roar!";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName + "/" +
        myPlayer.animalSpecies + "/"
        +
        "ability.png";
      break;
    case ability_fireShoot2:
      infoO.abilName = "Firestream\n& Tail Slap";
      infoO.abilImg = "img/fire.png";
      break;

    case ability_crabSmash:
      infoO.abilName = "Arm Smash";

      infoO.abilImg = "img/ability_crabSmashSkin.png";
      break;

    case ability_trexShake:
      infoO.abilName = "Jaws Bite";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;

    case ability_sharkBite:
      infoO.abilName = "Jaws Bite";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;

    case ability_ostrich:
      infoO.abilName = "Command Babies";
      infoO.abilImg = "skins/" + zombieFolder + "ostrich/ostrich-baby.png";
      break;

    case ability_owlAttack:
      infoO.abilName = "Target prey";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_falconAttack:
      infoO.abilName = "Sky dive";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
   case ability_thunderbirdAttack:
      infoO.abilName = "Thunderous\nDive";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_tiger:
      infoO.abilName = "Ambush Attack";
      var myPlayer = gameObjsByID[myPlayerID];

      if (myPlayer) {
        var aniInfoO = myPlayer.animalInfo();
        infoO.abilImg = "skins/" + zombieFolder + aniInfoO.skinName + ".png";
      }
      //infoO.abilImg = "skins/" + infoForAnimalType(myPlayerLastAniT).skinName + ".png";
      break;

    case ability_giraffeStomp:
      infoO.abilName = "Stomp";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_eagleAttack:
      infoO.abilName = "Fly with prey";

      if (myPlayer) {
        var aniInfoO = myPlayer.animalInfo();

        infoO.abilImg = "skins/" + zombieFolder + "eagle/" + myPlayer.animalSpecies + "/eagle" + ".png";
      }
      /*
      infoO.abilImg =
        "skins/" + infoForAnimalType(myPlayerLastAniT).skinName + ".png";
        */
      break;
    case ability_fart:
      infoO.abilName = "Stink";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
    case ability_pigeon:
    case ability_toucan:
      infoO.abilName = "HOLD to fly";

      var myPlayer = gameObjsByID[myPlayerID];

      if (myPlayer) {
        var aniInfoO = myPlayer.animalInfo();
        infoO.abilImg = "skins/" + zombieFolder + aniInfoO.skinName + ".png";
      }
      break;
   case ability_flyhigh:
      infoO.abilName = "Fly High";

      var myPlayer = gameObjsByID[myPlayerID];

      if (myPlayer) {
        var aniInfoO = myPlayer.animalInfo();
        infoO.abilImg = "skins/" + zombieFolder + aniInfoO.skinName + ".png";
      }
      break;
       case ability_freezeprey:
      infoO.abilName = "Freeze Prey!";

      var myPlayer = gameObjsByID[myPlayerID];

      if (myPlayer) {
        var aniInfoO = myPlayer.animalInfo();
        infoO.abilImg = "skins/" + infoForAnimalType(myPlayerLastAniT).skinName + ".png";
      }
      break;
    case ability_phoenix:
      infoO.abilName = "Fire Tornado";
      infoO.abilImg = "img/firetornado.png";
      break;

    case ability_landmonsterSpec:
      infoO.abilName = "Sink Hole";

      infoO.abilImg =
        "skins/" + infoForAnimalType(myPlayerLastAniT).skinName + ".png";

      break;
    case ability_seaMonsterSpec:
      infoO.abilName = "Giant Whirlpool";

      infoO.abilImg =
        "skins/" + infoForAnimalType(myPlayerLastAniT).skinName + ".png";

      break;

    case ability_zombieInfection:
      infoO.abilName = "Zombie Infection";
      infoO.abilImg = "img/ability_infection.png";
      break;

    default:
      infoO.abilName = "Ability";
      infoO.abilImg =
        "skins/" +
        zombieFolder +
        infoForAnimalType(myPlayerLastAniT).skinName +
        ".png";
      break;
  }
  return infoO;
};
///////
// file: js_src/game/particle.js
///////


var p_confetti = 1;


///////
// file: js_src/game/utils.js
///////



//UTILITIES
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


var getRandomDouble = function(min, max) {
  return Math.random() * (max - min) + min;
}

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var angle_1to360 = function(angle) {
var angle = (Math.trunc(angle) % 360) + (angle - Math.trunc(angle)); //converts angle to range -360 + 360
  if (angle > 0.0)
    return angle;
  else
    return angle + 360.0;
}
//convert ip string to int32
var dot2numIP = function(dot) {
  var d = dot.split('.');
  return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}
//convert int32 num to ip string
var num2dotIP = function(num) {
  var d = num % 256;
  for (var i = 3; i > 0; i--) {
    num = Math.floor(num / 256);
    d = num % 256 + '.' + d;
  }
  return d;
}
//replace part of url
var removeParam = function(key, sourceURL) {
  var rtn = sourceURL.split("?")[0],
    param,
    params_arr = [],
    queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
}

var toDegrees = function(angle) {
  return angle * (180 / Math.PI);
}

var toRadians = function(angle) {
  return angle * (Math.PI / 180);
}

//returns angle in rad
var angleAimingBetweenPoints = function(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

var bit_get = function(num, bit) {
  return ((num >> bit) % 2 != 0);
}

var bit_set = function(num, bit, setTo1) {
  if (setTo1)
    return num | 1 << bit; //set 1
  else
    return num & ~(1 << bit); //set 0
}

/** gives shortest angle dist between two angles, (dist negative or positive!)*/
//accepts/returns RADIANS
var distBetweenAngles = function(fromAngle, toAngle) {
  var rawDiff = toAngle - fromAngle;
  var d = angle_1to360(toDegrees(rawDiff));
  if (d > 180.0) //going backwards is shorter
    d = d - 360; //gives negative angle
  return toRadians(d);
}

var clamp = function(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

var encode_utf8 = function(s) {
  return unescape(encodeURIComponent(s));
}

var decode_utf8 = function(s) {
  return decodeURIComponent(escape(s));
}

var fillTextMultiLine = function(text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

var formatTimeSecs = function(theT) {
  var sec_num = parseInt(theT, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

var numberWithCommas=function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var formatNumK = function(num) {
  return abbreviate_number(num);
  /*if (num < 1000)
      return num; //theS.toLocaleString();
  else if (num < 1000000)
      return (Math.trunc(10 * (num / 1000)) / 10.0) + "k";
  else
      return (Math.trunc(100 * (num / 1000000)) / 100.0) + "m";*/
}
var abbreviate_number = function(num, fixed) {
  if (num === null) {
    return null;
  } // terminate early
  if (num === 0) {
    return '0';
  } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(2), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}



var drawCircle= function (x, y, rad, col) {
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0, rad), 0, Math.PI * 2);
  ctx.fill();
}

var drawStroke = function (x, y, rad, lineWidth, col) {
    ctx.strokeStyle = col;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0, rad), 0, Math.PI * 2);
    ctx.stroke();
}
  



var getAnimFrame= function(tSinceSpawn, period, shiftAm, sinF) {

  var moveA = shiftAm * Math.sin((sinF * Math.PI) / period * tSinceSpawn);
  return moveA;

}

var log = function(txt, showLog) {
	if(KTestingModeON || showLog) {
    //if(txt=="Stats.onInterfaceReset")
	  // throw new Error();
		console.log(txt);
	}
};


function secToTime(sec) {
    var date = new Date(null);
    date.setSeconds(sec); // specify value for SECONDS here
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    var result = "";
    if (mm > 0)
        result = mm + "m ";
    if (ss > 0)
        result += ss + "s";

    return result;
}



///////
// file: js_src/interface/CachedText.js
///////

//a node that can cache text, call draw() to draw it, set pos with .x, .y
CachedText.prototype = {

  //can edit stroke vars, before first render!
  strokeW: 1.0, //0 to turn off stroke
  strokeColor: "#000000",
  multiLine: false,
  playername: false,
  choicetxt:false,
  _text: "",
  _color: "#000000",
  x: 0,
  y: 0, //pos drawn at
  _fntSize: 16,
  _canvas: null,
  _ctx: null,
  _dirty: false,
  _angle: 0,
  //text can be rendered larger for clearer text when scaling
  renderScale: 1.5,
  _scale: 1, //not used atm

  //read-ony vars
  width: 0,
  height: 0, //canvas w/h (fast)
  

  /*setScale: function(a) {
      if (this._scale != a) {
          this._scale = a;
          this._dirty = true;
      }
  },
  */
  setColor: function(a) {
    if (this._color != a) {
      this._color = a;
      this._dirty = true;
    }
  },
  setFontSize: function(a) {
    if (this._fntSize != a) {
      this._fntSize = a;
      this._dirty = true;
    }
  },
 rotate: function(a) {
    if (a != this._text) {
      this._angle = a;
      this._dirty = true;
    }
  },
  setText: function(a) {
    if (a != this._text) {
      this._text = a;
      this._dirty = true;
    }
  },
  //updates cached txt canvas, returns canvas (to draw!)
  getRenderedCanvas: function() {
    if (null == this._canvas) {
      this._canvas = document.createElement("canvas");
      this._ctx = this._canvas.getContext("2d");
    }
    //render canvas if needed
    if (this._dirty) {
      this._dirty = false;
      var _canvas = this._canvas,
        _ctx = this._ctx,
        text = this._text,
        _angle = this._angle,
          scale = this._scale,
        fontsize = this._fntSize * this.renderScale,
        font = (fontsize) + 'px Arial';

      _ctx.font = font;
      var h = ~~(.2 * fontsize);
      _ctx.font = font; //set font before measureText

      //_ctx.scale(scale, scale);

      if (this.multiLine) {
        //basic multi-line fill!
        var lineHeight = _ctx.measureText("M").width * 1.2;
        var lines = text.split("\n");
      
        //re-size the canvas for mutiple lines...
        var maxW = 0;
        for (var i = 0; i < lines.length; ++i) {
          maxW = Math.max(maxW, _ctx.measureText(lines[i]).width);
        }
        this.width = (maxW + 6) * scale;
        this.height = (lineHeight * lines.length + h) * scale;
        _canvas.width = this.width;
        _canvas.height = this.height;
        //fix size for renderScale
        this.width /= this.renderScale;
        this.height /= this.renderScale;
   
        _ctx.globalAlpha = 1;
        _ctx.font = font;
        //_ctx.lineWidth = 6;
        if (this.strokeW > 0.0) {
          _ctx.shadowOffsetX = this.strokeW; //0.3333 *this.renderScale;
          _ctx.shadowOffsetY = this.strokeW; //0.3333 * this.renderScale;
          _ctx.shadowColor = this.strokeColor; //"black";
        }
        _ctx.fillStyle = this._color;
        _ctx.textAlign = "center";
        //  _ctx.textBaseline = "middle"; //vertical center

        var x = 3 + _canvas.width / 2,
          y = fontsize - h / 2;
        for (var i = 0; i < lines.length; ++i) {
          _ctx.fillText(lines[i], x, y);
          y += lineHeight;
        }
      } else {
        this.width = (_ctx.measureText(text).width +
          6) * scale;
        this.height = (fontsize + h) * scale;
        _canvas.width = this.width;
        _canvas.height = this.height;
        //fix size for renderScale
        this.width /= this.renderScale;
        this.height /= this.renderScale;

        //set style/font
        _ctx.globalAlpha = 1;
        _ctx.font = font;
        //_ctx.lineWidth = 6;
        if (this.strokeW > 0.0 ) {
          _ctx.shadowOffsetX = this.strokeW; //0.3333 *this.renderScale;
          _ctx.shadowOffsetY = this.strokeW; //0.3333 * this.renderScale;
          _ctx.shadowColor = this.strokeColor; //"black";
        }
        _ctx.fillStyle = this._color;


        _ctx.fillText(text, 3, fontsize - h / 2);
      }
      
      if (this.choicetxt) {
        //basic multi-line fill!
        var lineHeight = _ctx.measureText("M").width * 1.2;
        var lines = text.split(" ");
      
        //re-size the canvas for mutiple lines...
        var maxW = 0;
        for (var i = 0; i < lines.length; ++i) {
          maxW = Math.max(maxW, _ctx.measureText(lines[i]).width);
        }
        this.width = (maxW + 6) * scale;
        this.height = (lineHeight * lines.length + h) * scale;
        _canvas.width = this.width;
        _canvas.height = this.height;
        //fix size for renderScale
        this.width /= this.renderScale;
        this.height /= this.renderScale;
   
        _ctx.globalAlpha = 1;
        _ctx.font = font;
        //_ctx.lineWidth = 6;
        if (this.strokeW > 0.0) {
          _ctx.shadowOffsetX = this.strokeW; //0.3333 *this.renderScale;
          _ctx.shadowOffsetY = this.strokeW; //0.3333 * this.renderScale;
          _ctx.shadowColor = this.strokeColor; //"black";
        }
        _ctx.fillStyle = this._color;
        _ctx.textAlign = "center";
        //  _ctx.textBaseline = "middle"; //vertical center

        var x = 3 + _canvas.width / 2,
          y = fontsize - h / 2;
        for (var i = 0; i < lines.length; ++i) {
          _ctx.fillText(lines[i], x, y);
          y += lineHeight;
        }
      }
      //console.log("cached name : "+text);
    }
    return this._canvas
  },

  //convinience method to draw pre-rendered canvas at x/y pos
  draw: function() {
    if (this._text) {
      var nscale = this.renderScale;
      var rnchache = this.getRenderedCanvas(),
        nw = rnchache.width / nscale, //scale down by camzoom (constant font size!)
        nh = rnchache.height / nscale;
      this.setPos(nw, nh);
      ctx.drawImage(rnchache, this.x - nw / 2.0, this.y - nh / 2.0, nw, nh);
    }
  },
  setPos: function(w,h) {
    
  }
};

function CachedText(uFntSize, ucolor) {
  uFntSize && (this._fntSize = uFntSize);
  ucolor && (this._color = ucolor);

}

window.CachedText=CachedText;


///////
// file: js_src/interface/InterfaceButtons.js
///////


//button that appears in animal choice interface
function AniChoiceButton(x, y, w, h, aniT, biomeNum, spec) {
  //button gets resized on draw (due to varying screen size)
  this.x = x;
  this.y = y;
  this.w = w; //width of pressable region
  this.h = h;
  this.aniT = aniT;
//  this.col = animalcol;
  this.species = spec;
  this.teamID = 0;
  this.btnHotkey = '0';

  //this.text = infoForAnimalType(aniT).aniName;//isOcean ? "Ocean Animal" : "Land Animal";
  this.buttonTXT = new CachedText(10.0, "white");
  this.buttonTXT.renderScale = 1.5;
  this.buttonTXT.choicetxt = true
  this.buttonTXT.setText(infoForAnimalType(aniT).aniName);
  this.setHotKey = function (_0xb26fc2) {
        _0xb26fc2 && (this.btnHotkey = _0xb26fc2, this.hotkey = new CachedText(10, 'white'), this.hotkey.renderScale = 1.5, this.hotkey.multiLine = false, this.hotkey.setText(this.btnHotkey.toUpperCase()));

    };
  this.isHighLighted = false; //highlight if mouse goes on it
  this.biomeNum = biomeNum; //draw ocean or land background
  //drawn animal img
  //var anO = new Animal(0, o_animal, 0, 0, 30);
  var anO = GameObjType.createGameObjOfOType(o_animal, aniT);
  anO.animalType = aniT;
  anO.animalSpecies = spec;
  anO.lava = 100;
 anO.alwaysPlainOutline = true;
  this.buttonTXT.setText(anO.animalInfo().aniName);

  anO.x = anO.ox = anO.nx = 0;
  anO.y = anO.oy = anO.ny = 0;
  anO.rad=anO.oRad=anO.nRad= 30;
  
  this.drawnAniObj = anO;
  
  this.buttonScaleF = 0; //scale primary button
  //this.touchMarginEx=20.0;
 
  //used to check clicks
  this.testPosHitsButton = function(posX, posY) {

    if (posX < this.x - this.w / 2 || posX > this.x + this.w / 2)
      //outside x bounds
      return false;
    if (posY < this.y - this.w / 2 || posY > this.y + this.w / 2) {
      //outside y bounds
      return false;
    } else
      return true;
  };
  this.setPosAndSize = function(newX, newY, newW, newH, anchorX, anchorY) {
      this.w = newW;
      this.h = newH;
      //set middle x/y based on anchorX/anchorY -(0,0) is top-left corner
      this.x = newX + (newW) * (0.5 - anchorX);
      this.y = newY + (newH) * (0.5 - anchorY);
    },

    this.draw = function() { //ani draw mod
      //draw button bg square
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.buttonScaleF, this.buttonScaleF);
      var origA = ctx.globalAlpha;

      //console.log("drawing button at "+this.x,this.y);


      //bg square
      ctx.globalAlpha = origA * 0.50;
      switch (this.biomeNum) {
      
        case 0:
            this.drawnAniObj.curBiome = 0
          ctx.fillStyle = "#26A73A";
          break; //land
        case 1:
         this.drawnAniObj.curBiome = 1
          ctx.fillStyle = "#1C91B8";
          break;  //ocean
        case 2:
         this.drawnAniObj.curBiome = 2
          ctx.fillStyle = "#B2B2B2";
      

          break; //arctic

          case 3:
         this.drawnAniObj.curBiome = 3
          ctx.fillStyle = "#ff6000";
      

          break; //arctic
                  
            case 4:
                ctx.fillStyle = "#9F8641";
                break;
            case 5:
                ctx.fillStyle = "#00db22";
                break;
            }
      
      
      ctx.fillRect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h);
      //draw highlight
      if (this.isHighLighted) {
        ctx.fillStyle = "white";
        ctx.globalAlpha = origA * 0.2;
        ctx.fillRect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h);
      }

      //draw animal
      ctx.globalAlpha = origA;
var _0x224eeb = this.w * (0.22500000000036);
        this.drawnAniObj.nRad = this.drawnAniObj.rad = _0x224eeb;
      ctx.save();
      ctx.scale(2,2);
      this.drawnAniObj.teamID = teamID;
      this.drawnAniObj.draw();
      ctx.restore();

      this.buttonTXT.setFontSize(23 * interfS);
      this.buttonTXT.x = 0;
      this.buttonTXT.y = -this.h * 0.4 * 0.75;
      this.buttonTXT.draw();

      //ctx.font = 23 * interfS + "px Arial";
      //ctx.fillText(this.text, 0, -this.h *0.5 * 0.75);
      //}
      ctx.restore();
    };
};


window.AniChoiceButton=AniChoiceButton;

//button for touch controls (and abilities display)
TouchButton.prototype = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  visible: true,
  buttonTXT: null,
  pressed: false,
  pressedTouchID: -1,
  touchEnabled: true,
  //does this position land inside the button
  testPosHitsButton: function(posX, posY) {
    //x/y are always the middle of the button

    if (posX < this.x - this.w / 2 || posX > this.x + this.w / 2)
      //outside x bounds
      return false;

    if (posY < this.y - this.w / 2 || posY > this.y + this.w / 2) {
      //outside y bounds
      return false;
    } else
      return true;
  },
  //set x/y, set to an anchorpoint (0)=0.5
  setPosAndSize: function(newX, newY, newW, newH, anchorX, anchorY) {
    this.w = newW;
    this.h = newH;
    //set middle x/y based on anchorX/anchorY -(0,0) is top-left corner
    this.x = newX + (newW) * (0.5 - anchorX);
    this.y = newY + (newH) * (0.5 - anchorY);
  },
  //set this for each button
  onButtonTouchStart: function() {
    //console.log("button touch started!");
  },
  onButtonTouchEnd: function() {
    //console.log("button touch ended!");
  }
};

function TouchButton(text) {

  this.buttonTXT = new CachedText(10.0, "white");
  this.buttonTXT.renderScale = 1.5;
  this.buttonTXT.setText(text);

  this.draw = function() {
    if (!this.visible)
      return;

    //draw button square
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = (this.pressed) ? "white" : "#000000";
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

    //draw button text
    ctx.globalAlpha = 0.2;

    this.buttonTXT.setFontSize(25 * interfS);
    this.buttonTXT.x = this.x;
    this.buttonTXT.y = this.y;
    this.buttonTXT.draw();

    ctx.restore();

  };
}
window.TouchButton=TouchButton;

var AbilityButton = function () {
  this.buttonTXT = new CachedText(10.0, "white");
  this.buttonTXT.renderScale = 1.5;
  //this.buttonTXT.setText("");

  //abilities vars (if ability button)
  this.isMiniRechargeBut = false; //shows above W button, when dive is available
  this.abil_Type = 0;
  this.abil_possible = this.abil_usable = this.abil_recharging = this.abil_active = false;
  this.abil_rechargeEndT = 0, this.abil_rechargeTotalT = 0;
  this.abil_rechargeBarA = 0, this.abil_avilableA = 0;

  this.draw = function () {
    if (!this.visible)
      return;

    this.abil_rechargeBarA += ((this.abil_recharging ? 1.0 : 0.0) - this.abil_rechargeBarA) * 0.1;
    this.abil_avilableA += (((this.abil_usable || this.abil_active) ? 1.0 : 0.2) - this.abil_avilableA) * 0.1;
    if (this.isMiniRechargeBut) {
      this.h = this.w * 0.6;
    }

    if (this.abil_possible) {
      var oAlpha = 1.0;
      ctx.save();

      if (this.isMiniRechargeBut) {
        this.h = this.w * 0.8;
        ctx.translate(this.x, this.y + this.h * 0.36);
        ctx.scale(0.65, 0.65);
      } else
        ctx.translate(this.x, this.y);

      //draw button square
      var fillOp = 0.2 * this.abil_avilableA;
      var fillCol = (this.pressed || controls_rightClicked) ? "#CECECE" : "#000000";
      if (this.abil_active) {
        fillCol = col_edibleOutline;
        fillOp = 0.7;
      }
      ctx.fillStyle = fillCol;
      ctx.globalAlpha = oAlpha * fillOp;
      ctx.fillRect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h);

      //ability img
      var abilityInfo = infoForAbilityT(this.abil_Type);

      if (this.abil_Type == ability_fireShoot || this.abil_Type == ability_fireShoot2) {

        var imNum = Math.trunc(timestamp / 120) % 5;
        //var theImg = getLoadedImg(imNum == 1 ? "img/fire.png" : "img/fire2.png");
         if (gameObjsByID[myPlayerID]) {
        var theImg = getLoadedImg("img/fireball/" + gameObjsByID[myPlayerID].specType2 + "/" +imNum + ".png");
         }
        if (theImg) {
          var rad = this.w * 0.4;
          var frame = 0;
          if (gameObjsByID[myPlayerID]) {
            var tSpawn = gameObjsByID[myPlayerID].spawnTime;

            var tSinceSpawn = (timestamp - tSpawn) / 1000.0
            frame = (getAnimFrame(tSinceSpawn, 1, 10, 2));
          }
          ctx.globalAlpha = oAlpha * this.abil_avilableA;
          ctx.drawImage(theImg, -rad, -rad * 0.85 - frame, 2 * rad, 2 * rad + frame);
        }

      } else {
        var abilImg = abilityInfo.abilImg;
        //  console.log("abilImg: " + abilImg)

        var myPlayer = gameObjsByID[myPlayerID];
        if (myPlayer && myPlayer.animalType == a_phoenix && this.abil_Type == ability_dive)
          abilImg = "img/ability_dive_lava.png";

        var theImg = getLoadedImg(abilImg);
        //console.log("image info "+theImg);
        if (theImg) {
          var rad = this.w * 0.4;
          ctx.globalAlpha = oAlpha * this.abil_avilableA;
          ctx.drawImage(theImg, -rad, -rad * 0.85, 2 * rad, 2 * rad);
        }
      }
      this.buttonTXT.multiLine = true
      
      this.buttonTXT.setText(abilityInfo.abilName);
      this.buttonTXT.setFontSize(25 * interfS);
      this.buttonTXT.x = 0;
      this.buttonTXT.y = -this.w * 0.35;
      this.buttonTXT.draw();

      //rercharging bar (fade based on updated recharing var, as more accurte)
      var tTillRecharged = Math.max(0, this.abil_rechargeEndT - timestamp);
      //console.log("recharged in "+tTillRecharged);
      this.abil_rechargeBarA += ((this.abil_recharging ? 1.0 : 0.0) - this.abil_rechargeBarA) * 0.1;

      if (this.abil_rechargeBarA > 0.01) {



        //recharge bar
        ctx.globalAlpha = (oAlpha * this.abil_rechargeBarA) * 0.35;
        ctx.fillStyle = "#000000"; //bar bg
        var bx = 0,
          by = 0;
        var barW = this.w * 0.8;
        var barH = this.h * 0.5;


        ctx.fillRect(bx - barW / 2, by - barH / 2, barW, barH); //bg
        ctx.globalAlpha = (oAlpha * this.abil_rechargeBarA) * 1.0;
        ctx.fillStyle = "#F3C553";
        ctx.fillRect(bx - barW / 2, by - barH / 2, barW * (tTillRecharged / this.abil_rechargeTotalT), barH); //fill

      }


      ctx.restore();
    }
  }
}
AbilityButton.prototype = Object.create(TouchButton.prototype); //inherit from TouchButton

window.AbilityButton=AbilityButton;



///////
// file: js_src/game/typedefs.js
///////

// GET url arguments (?arg=2)
function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;
  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}
var $_GET = getQueryParams(document.location.search);

//read link/ app flags
var isMobileAppIOS = $_GET["mobileios"] > 0;
var isMobileAppAndroid = $_GET["mobileAndroid"] > 0;
var isMobileApp = isMobileAppIOS || isMobileAppAndroid;

var alwaysShowVideo = $_GET["videoson"] > 0;

//var urlServerName = ($_GET['server']);

//for now, most defs are in here (other than subclassed ones)
var lerpI = 0.175; //@10fps; // 0.12 for 20fps;  //ag@r is 0.125

//common game colors
var col_invisborder = "#2A2A2A60",
    col_gameBg1 = "#3FBA54", //light-green background color of mope.io
    col_gameBg = "#3FBA54", //light-green background color of mope.io
    col_snowcolor = "#f7f7f7",
    col_outline_land = "#09992F",
    col_outline_ocean = "#007ec0",
    col_outline_arctic = "grey",
    col_bg3 = "#09992F", //"#3D7447";
    col_wat1 = "#4E66E4",
    col_lava = "#ff6000",
    col_lava2 = "#bf4f0b",
    col_wat2 = "#4651a6", //#4651a6 - non snow color
    col_ocean = col_wat2, // "#1898bd";// (old oc)
    col_ocean_sand = "#c8b745",
    col_outline_desert = "#a59215",
    col_desert_hill = "#d6c348",

    col_food1 = "#F35F53",
    col_food2 = "#CF6259",
    col_plankton1 = "#FF911E",
    col_plankton2 = "#C67019",

    col_dangerOutline = "#EF3C31",
    col_edibleOutline = "#4AE05E",
    col_rockHill = "#8C9688", 
    col_rockHill_desert = "#878053";

var outlineColForBiome = function(biomeN) {
  switch (biomeN) {
    case biome_ocean:
      return col_outline_ocean;
      case biome_arctic:
      return col_outline_arctic;
      case biome_desert:
      return col_outline_desert;
      case biome_volcano:
      return col_lava2;
    default:
    case biome_land:
      return col_outline_land;
  }
};
// custom interface buttons
var interfaceButtons = [];
//biome types
var biome_land = 0;
var biome_ocean = 1;
var biome_arctic = 2;
var biome_volcano = 3;
var biome_desert = 4;

//HANDLE WORLD UPDATE
var timestamp = +new Date();
var lastUpdT = +new Date();

// Team Mode vars start
var teamID = 0;
// team mode vars end

//
var isInArena = true;
var isAbility1v1Active = true;
var isSoccerEnabled = false;
var show1v1Button = true;
var can1v1 = true;
var btn1v1 = null;
var player1v1ArenaWins = 0;
var playerGoalsScore = 0;
var serverAllTimeGoals = 0;
var playersInfected = 0;
var zombiesKilled = 0;
var player1v1Requests = [];
var isInBonusRound = false;
var bonusRoundDur = 0;
var homeButton = null;
var isSpectateMode = false;
var eggID = 0;
var isDevMode = true;
//canvases
var canvas = document.getElementById("gCanvas");
var lbCanvas = null;
var miniMapCanvas = null;
var nPlayersViewing = 0;
var nPlayersAlive = 0;
var ctx = canvas.getContext("2d");
ctx.shadowColor = "black"; //default for everything
//global settings
var localStorageOn = false;
var pixelRat = Math.min(window.devicePixelRatio, 2.0); //limit to 2 for performance
//set mobile
var isTouchEnabled =
  ("ontouchstart" in window || navigator.maxTouchPoints) == true;
if (isTouchEnabled) console.log("mobile touch device detected!");

//music, game music lazy loaded (to prevent initial lag!)
var loadedAudio = {};

var getLazyLoadAudio = function(theUrl) {
  //start loading audio (if it's not muted!)
  if (!loadedAudio.hasOwnProperty(theUrl) && !options_musicMuted) {
    //start loading if not loaded
    var newAudio = new Audio(theUrl);
    console.log("loading audio: " + theUrl);
    loadedAudio[theUrl] = newAudio;

    /*if (theUrl == menuMusicURL) { //loop menu music!
        newAudio.addEventListener('ended', function() {
            this.currentTime = 0; //restart on music end
            try {
                this.play();
            } catch (err) {}
        }, false);
    }*/
    newAudio.volume = 0.7;
    newAudio.muted = options_musicMuted;
  }

  return loadedAudio[theUrl];
};
var currentMusic = null; //currently playing music audio instance
var currentMusicUrl = ""; //url that would be playing (even if muted)
//var menuMusicURL = 'audio/music_menu.mp3';
var gameMusicURL = "audio/music_game.mp3";

var changeMusicTo = function(theUrl) {
  if (currentMusic) {
    //stop/reset current music
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
  currentMusicUrl = theUrl;
  if (!options_musicMuted) {
    //dont load music if sound is muted!
    console.log("changed music to " + theUrl);
    currentMusic = getLazyLoadAudio(theUrl, true);
    try {
      currentMusic.play();
    } catch (err) {}
  }
};

//mute button was pressed, update muted
var onMuteButtonChange = function() {
  var theDOM = document.getElementById("button_mute_img"); //button img
  if (theDOM) {
    theDOM.src = options_musicMuted ? "img/sound_off.png" : "img/sound_on.png";

    //update .muted for all already-loaded audio/music
    for (var aProp in loadedAudio) {
      if (loadedAudio.hasOwnProperty(aProp)) {
        loadedAudio[aProp].muted = options_musicMuted;
      }
    }

    //start current music (if music should be playing, but not loaded!)
    if (!options_musicMuted && currentMusicUrl && currentMusic == null) {
      changeMusicTo(currentMusicUrl);
    }
  }
};

//camera
var instantSetCamNextUpd = false;
var camzoom = (camzoom_n = 2.7); //effective zoom
var camzoom = 1.0; //zoom effect on start
var camx = 0.0;
var camy = 0.0;
var camx_n = 0.0;
var camy_n = 0.0;
var camx_o = 0.0;
var camy_o = 0.0;
var interfS = 1.0; //scale of ingame interfaces
//interFaceA=0.0; //pretty animation

//mouse
var rawMouseX = 0, //in CANVAS coordinates (multiplied by pix ratio)
  rawMouseY = 0,
  gameMouseX = 0, //in actual game
  gameMouseY = 0,
  lastMouseX = 0,
  lastMouseY = 0;
//game controls (for use with multiple buttons)
var controls_leftClicked = false,
  controls_rightClicked = false,
    cNum_keyEused = false,
cNum_keyDused = false;
//game size, vars, get set on game join
var canvasW = 0;
var canvasH = 0;
var gameW = 0,
  gameH = 0; //size of game area (for bounds)

var gameMode_FFA = 0;
var gameMode_sandbox = 1;
//var gameMode_battleRoyal = 2; discontinued game mode
var gameMode_teamMode = 3;
var gameMode_troll = 4;
var gameMode_zombie = 5;
var gameMode = gameMode_FFA; //NOT USED ATM

var gameState = 0;

//varsa

//get lazy loaded img (calling this starts load)
var loadedImgs = {};

var getLoadedImg = function(imgUrl) {
  if (!loadedImgs.hasOwnProperty(imgUrl)) {
    //start loading if not loaded
    loadedImgs[imgUrl] = new Image();
    loadedImgs[imgUrl].src = imgUrl; //"./skins/" + skinName + '.png';
  }
  if (0 != loadedImgs[imgUrl].width && loadedImgs[imgUrl].complete) {
    return loadedImgs[imgUrl];
  } else {
    return null;
  }
};

//game vars
var xpNextAni = 100;
var dangerAniTypes = Array.apply(null, new Array(50)).map(
  Number.prototype.valueOf,
  0
);
var edibAniTypes = Array.apply(null, new Array(50)).map(
  Number.prototype.valueOf,
  0
);
var tailBiteAniTypes = Array.apply(null, new Array(50)).map(
  Number.prototype.valueOf,
  0
);
var edibleObjTypes = Array.apply(null, new Array(50)).map(
  Number.prototype.valueOf,
  0
);
var clearedTypesSinceSpawnRequest = false;
var t = [];
var gameObjs = []; //sorted drawn list of objs
var gameObjsByID = {}; //hashed list by ID
var remGameObjs = []; //to be deleted after draw
//latest recharging msg info (global for player)
var abil_recharging = false;
var abil_rechargeTotalT = 0;
var abil_rechargeEndT = 1.0;
var abil_dive_recharging = false;
var abil_dive_rechargeTotalT = 0;
var abil_dive_rechargeEndT = 1.0;

//global vars
var abil_dive_isMain = false;
var ocean_anim_startT = +new Date(); //sync all ocean water

//load options
var options_noImages = false;
var options_noNames = false;
var options_lowGraphics = false; //main optimizations: next shadows off,
var options_noJoystick = false;
var options_leftHanded = false;
var options_noXpPopup = false;
var options_musicMuted = false;
var options_winterskins = true;
//options_snowfall = false;

function addDOMOptionHtml(opID, opDesc, opColor) {
  var contaierElem = document.getElementById("optionsContainer");
  var lab = document.createElement("label");
  lab.innerHTML =
    "<input type='checkbox' id='" +
    opID +
    "'><span style='color: " +
    opColor +
    ";''>" +
    opDesc +
    "</span>";
  contaierElem.appendChild(lab);
}
addDOMOptionHtml("options_noImages", "No Animal images  ", "black");
addDOMOptionHtml("options_noNames", "No Names & Chat  ", "black");
addDOMOptionHtml("options_lowGraphics", "Use Low graphics ", "black");
if (isTouchEnabled) {
  addDOMOptionHtml("options_noJoystick", "No Joystick", "#194614");
  addDOMOptionHtml("options_leftHanded", "LEFT-handed Joystick", "#194614");
}
addDOMOptionHtml("options_noXpPopup", "Don't show +XP popups", "black");

if (window.localStorage) {
  options_noNames = window.localStorage.getItem("options_noNames") + 0 > 0;
  var theDOM = document.getElementById("options_noNames");
  if (theDOM) {
    theDOM.checked = options_noNames;
  }
  options_noImages = window.localStorage.getItem("options_noImages") + 0 > 0;
  var theDOM = document.getElementById("options_noImages");
  if (theDOM) {
    theDOM.checked = options_noImages;
  }

  options_lowGraphics =
    window.localStorage.getItem("options_lowGraphics") + 0 > 0;
  var theDOM = document.getElementById("options_lowGraphics");
  if (theDOM) {
    theDOM.checked = options_lowGraphics;
  }

  options_noJoystick =
    window.localStorage.getItem("options_noJoystick") + 0 > 0;
  var theDOM = document.getElementById("options_noJoystick");
  if (theDOM) {
    theDOM.checked = options_noJoystick;
  }

  options_leftHanded =
    window.localStorage.getItem("options_leftHanded") + 0 > 0;
  var theDOM = document.getElementById("options_leftHanded");
  if (theDOM) {
    theDOM.checked = options_leftHanded;
  }

  options_noXpPopup = window.localStorage.getItem("options_noXpPopup") + 0 > 0;
  var theDOM = document.getElementById("options_noXpPopup");
  if (theDOM) theDOM.checked = options_noXpPopup;

  //mute button
  options_musicMuted = window.localStorage.getItem("options_muted") + 0 > 0;
  onMuteButtonChange();
}

//mute button
var theDom = document.getElementById("button_mute");
if (theDom) {
  theDom.onclick = function() {
    options_musicMuted = !options_musicMuted;
    onMuteButtonChange();
    try {
      window.localStorage.setItem("options_muted", options_musicMuted ? 1 : 0);
    } catch (err) {} //no localStorage
  };
}
document.getElementById("settingsButton").onclick = function() {
  var theDom = document.getElementById("optionsDiv");
  let setsOpen = theDom.style.display == "block";
  if (!setsOpen) {
    masterServer_getServerStats();
  }
  theDom.style.display = setsOpen ? "none" : "block";

  //play sound (if not muted)
  var sound_click = getLazyLoadAudio("audio/click.mp3");
  if (sound_click) {
    try {
      sound_click.play();
    } catch (err) {}
  }
};
document.getElementById("closeBut").onclick = function() {
  var theDom = document.getElementById("optionsDiv");
  theDom.style.display = theDom.style.display == "block" ? "none" : "block";

  //play sound (if not muted)
  var sound_click = getLazyLoadAudio("audio/click.mp3");
  if (sound_click) {
    try {
      sound_click.play();
    } catch (err) {}
  }
};
//save options

// normal options
var theDom = document.getElementById("options_noImages");
if (theDom) {
  theDom.onchange = function() {
    if (window.localStorage) {
      options_noImages = this.checked;
      try {
        window.localStorage.setItem(
          "options_noImages",
          options_noImages ? 1 : 0
        );
      } catch (err) {} //no localStorage

      //console.log("options_noimages: saved as " + window.localStorage.getItem("options_noImages"));
    }
  };
}
var theDom = document.getElementById("options_noNames");
if (theDom) {
  theDom.onchange = function() {
    if (window.localStorage) {
      options_noNames = this.checked;
      try {
        window.localStorage.setItem("options_noNames", options_noNames ? 1 : 0);
      } catch (err) {} //no localStorage

      //console.log("options_noNames: saved as " + window.localStorage.getItem("options_noNames"));
    }
  };
}

var theDom = document.getElementById("options_lowGraphics");
if (theDom) {
  theDom.onchange = function() {
    if (window.localStorage) {
      options_lowGraphics = this.checked;
      try {
        window.localStorage.setItem(
          "options_lowGraphics",
          options_lowGraphics ? 1 : 0
        );
      } catch (err) {} //no localStorage

      //resize canvas
      onResize();

      //console.log("options_lowGraphics: saved as " + window.localStorage.getItem("options_lowGraphics"));
    }
  };
}

var theDom = document.getElementById("options_noJoystick");
if (theDom) {
  theDom.onchange = function() {
    if (window.localStorage) {
      options_noJoystick = this.checked;
      try {
        window.localStorage.setItem(
          "options_noJoystick",
          options_noJoystick ? 1 : 0
        );
      } catch (err) {} //no localStorage

      //resize canvas
      onResize();

      //console.log("options_noJoystick: saved as " + window.localStorage.getItem("options_noJoystick"));
    }
  };
}
var theDom = document.getElementById("options_leftHanded");
if (theDom)
  theDom.onchange = function() {
    if (window.localStorage) {
      options_leftHanded = this.checked;
      try {
        window.localStorage.setItem(
          "options_leftHanded",
          options_leftHanded ? 1 : 0
        );
      } catch (err) {} //no localStorage

      //resize canvas
      onResize();

      console.log(
        "options_leftHanded: saved as " +
          window.localStorage.getItem("options_leftHanded")
      );
    }
  };

var theDom = document.getElementById("options_noXpPopup");
if (theDom) {
  theDom.onchange = function() {
    if (window.localStorage) {
      options_noXpPopup = this.checked;
      try {
        window.localStorage.setItem(
          "options_noXpPopup",
          options_noXpPopup ? 1 : 0
        );
      } catch (err) {} //no localStorage

      //resize canvas
      onResize();

      //console.log("options_noXpPopup: saved as " + window.localStorage.getItem("options_noXpPopup"));
    }
  };
}

var fps_framesCount = 0;
var fps_drawTimeCount = 0;
var fps_timeStart = +new Date();
var fpsText = "... fps";
var fps_startTime = +new Date();
var fps_totalFramesDone = 0;
var fps_totalTime = 0;

//current game vars
var plOnlineStr = "...";
var myBrowserUniqueID = 0;
var myPlayerID = 0;
var myPlayerLastAniT = a_mouse;
var serverCon_aliveInAGame = false;
var serverCon_spectatingInAGame = false;
var serverConnected = false;
var serverFirstConnected = false;
var afkTimeStart = +new Date();
var dcedFromAfk = false;
_0x8b4348 = !1,
    _0x55dda5 = !1,
    _0x33bbe8 = !1,
    _0x573fdc = !1
var isAirBar = false;
var animalBarType = 0;
var waterBarPerc = (waterBarPerc_n = 100);
var xpPer_n = (xp = xpPer = 0);
var infectionBarPerc = infectionBarPerc_n = 100;
//interface/animation vars
var waterBarTXT = new CachedText(16.0, "white");
var player1v1TXT = new CachedText(16.0, "white");
var xpBarTXT = new CachedText(16.0, "white");
var objEdibleTXT = new CachedText(16.0, "white");
var screenTXT = new CachedText(16.0, "white");
var playersOnlTXT = new CachedText(10.0, "white");
screenTXT.multiLine = true;
objEdibleTXT.renderScale = 1.0; //better quality
screenTXT.renderScale = 1.0; //better quality
playersOnlTXT.renderScale = 1.0; //better quality
var showPlaersOnServer = false;
var lowBarPercLabelA = 0.0;
var respawnMsgA = 0.0; //'respawn with 10.3k xp!'
var respawnMsgText = "";
//hurtTintA = hurtTintA_n = 0.0;

//create touch buttons
var allTouchButtons = []; //all drawn/active buttons
var button_w = new AbilityButton();
button_w.onButtonTouchStart = function () {
  controlsPressEvent(cNum_rightClick, true);
};
button_w.onButtonTouchEnd = function () {
  controlsPressEvent(cNum_rightClick, false);

  //unselect run (if pressed through sliding down finger)
  if (button_run.pressed && button_run.pressedTouchID == -1) {
    //button RELEASED!
    button_run.pressed = false;
    controlsPressEvent(cNum_leftClick, false);
  }
};
allTouchButtons.push(button_w);

var button_w_mini = new AbilityButton(); //not pressable
button_w_mini.isMiniRechargeBut = true;
button_w_mini.touchEnabled = false;
//no touch handlers (doesn't get touched)
allTouchButtons.push(button_w_mini);

var button_run = new TouchButton("HOLD TO RUN");
button_run.onButtonTouchStart = function () {
  controlsPressEvent(cNum_leftClick, true);
};
button_run.onButtonTouchEnd = function () {
  controlsPressEvent(cNum_leftClick, false);
};
allTouchButtons.push(button_run);


var button_chat = new TouchButton("CHAT");
button_chat.onButtonTouchStart = function() {
  toggleChatOpen();
};
allTouchButtons.push(button_chat);

var button_sKey = new TouchButton("S"); //in sandbox
button_sKey.onButtonTouchStart = function() {
  controlsPressEvent(cNum_watershoot, true);
};
allTouchButtons.push(button_sKey);

var button_SBdowngrade = new TouchButton("DOWN↓"); //in sandbox
button_SBdowngrade.onButtonTouchStart = function() {
  controlsPressEvent(cNum_SBdowngrade, true);
};
allTouchButtons.push(button_SBdowngrade);

//joystickDisabled = false, //temporary
var joyStickOpen = false,
  joysickTouchID = -1,
  joystickStartX = 0,
  joystickStartY = 0,
  joystickTipX = 0,
  joystickTipY = 0,
  joystickRad = 50.0, //in CANVAS coords
  joystickA = 0.0,
  joystickDirArrowAngle = 0,
  joystickDirArrowAngle_nDelta = 0,
  joystickDistF = 0.0,
  joystickDistF_n = 0.0;

/*abil_possible=false;
var abil_usable=false;
var abil_recharging=false;
var abil_active=false;*/

//update/lerpF
var lastUpdT = +Date.now();

var ws = null;
_0x1abe2b.wave = 1;
_0x1abe2b.halfWave = 2;
_0x1abe2b.arc = 3;
_0x1abe2b.quad = 4;
_0x1abe2b.bow = 5;
_0x1abe2b.bounce = 6;
_0x1abe2b.elastic = 7;
_0x1abe2b.bounceEaseOut = 8;
_0x1abe2b.bounceEaseInOut = 9;

function _0x1abe2b(_0x4b9ad5, _0x148a85, _0x2b7224, _0x59b622,workafter) {
    this.forObj = _0x4b9ad5;
    this.duration = _0x148a85;
    this.animation = _0x2b7224;
    this.startTime = null;
    this.frame = 0;
    this.frameRate = 1000;
    this.timePassed = 0;
    this.stopWhenDurationPassed = this.generate = true;
    this.accelerateEnd = this.state = 0;
    this.hasStopped = false;
    this.img = null;
    this.vars = _0x59b622;
    this.loop = this.keepLastFrame = true;
    this.setImage = function (_0x1f9afa) {
        this.img = _0x510f5a(_0x1f9afa);
    };
    this.run = function () {
    if(!workafter && this.timePassed >= this.duration && this.stopWhenDurationPassed){
      this.hasStopped = true
    }
    
        null == this.startTime && (this.startTime = timestamp);
        if (null != this.startTime && (2 != this.state || this.hasStopped || 
                                       (this.hasStopped = true, this.onStop()),
                                       this.hasStopped || (this.calcTimePassed(),
                                                           this.generateFrame(), 
                                                           this.onFrameEntered(this.frame),
                                                           
                                                         !workafter&&this.timePassed >= this.duration && this.stopWhenDurationPassed && (this.state = 2)),
                                       this.hasStopped)) {
            if (this.keepLastFrame) this.onFrameEntered(this.frame);
            this.loop && this.reset();
        }
    };
    this.reset = function () {
        this.timestamp = null;
        this.hasStopped = true;
        this.state = 0;
    };
      this.timing = function (_0x1868f0) {
        return _0x1868f0;
    };
    this.halfWave = function (_0x5b1e15) {
        return 1 * Math.sin(0.5 * Math.PI / this.duration * _0x5b1e15);
    };
    this.wave = function (_0x5052b4) {
        return 1 * Math.sin(1 * Math.PI / this.duration * _0x5052b4);
    };
    this.arc = function (_0x109adf) {
        return 0x1 - Math.sin(Math.acos(_0x109adf));
    };
    this.quad = function (_0x5c29f0) {
        return Math.pow(_0x5c29f0, 2);
    };
    this.bow = function (_0x5ac2d4) {
        var _0x148a85 = this.vars.v1;
        return Math.pow(_0x5ac2d4, 2) * ((_0x148a85 + 1) * _0x5ac2d4 - _0x148a85);
    };
    this.bounce = function (_0x2000e8) {
        for (var _0x148a85 = 0, _0x2b7224 = 1;; _0x148a85 += _0x2b7224, _0x2b7224 /= 2)
            if (_0x2000e8 >= (3 * _0x148a85) / 11) return -Math.pow((5 * _0x148a85 - 11 * _0x2000e8) / 4, 2) + Math.pow(_0x2b7224, 2);
    };
    this.elastic = function (_0x1acff4) {
        return Math.pow(2, 10 * (_0x1acff4 - 1)) * Math.cos(20 * Math.PI * this.vars.v1 / 3 * _0x1acff4);
    };
    this.bounceEaseOut = function (_0x5c10ac) {
        return 0x1 - this.bounce(1 - _0x5c10ac);
    };
    this.bounceEaseInOut = function (_0x5c1fb1) {
        return 0.5 > _0x5c1fb1 ? this.bounce(2 * _0x5c1fb1) / 2 : (2 - this.bounce(2 * (1 - _0x5c1fb1))) / 2;
    };
    this.calcTimePassed = function () {
        this.timePassed = (timestamp - this.startTime) / this.frameRate;
    };
    this.onFrameEntered = function (_0x3b867c) {};
    this.onStop = function () {};
    this.generateFrame = function () {
   
        if (this.generate) switch (this.state = 1, this.animation) {
        case _0x1abe2b.wave:
            this.frame = this.wave(this.timePassed);
          
            break;
        case _0x1abe2b.halfWave:
            this.frame = this.halfWave(this.timePassed);
            break;
        case _0x1abe2b.arc:
            this.frame = this.arc(this.timePassed);
            
            break;
        case _0x1abe2b.quad:
            this.frame = this.quad(this.timePassed);
            break;
        case _0x1abe2b.bow:
            void 0x0 == this.vars && (this.vars = {
                'v1': 0x1
            });
            this.frame = this.bow(this.timePassed);
            break;
        case _0x1abe2b.bounce:
            this.frame = this.bounce(this.timePassed);
            break;
        case _0x1abe2b.elastic:
            void 0x0 == this.vars && (this.vars = {
                'v1': 0x1
            });
            this.frame = this.elastic(this.timePassed);
            break;
        case _0x1abe2b.bounceEaseOut:
            this.frame = this.bounceEaseOut(this.timePassed);
            break;
        case _0x1abe2b.bounceEaseInOut:
            this.frame = this.bounceEaseInOut(this.timePassed);
         
        }
    };

}
///////
// file: js_src/client/login.js
///////

//handles login stuff

//handle logins
var $_GET = getQueryParams(document.location.search);
var token = $_GET["token"];

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};



function loginWithFB(){

}


///////
// file: js_src/client/desktopAds.js
///////

//adblock detected
//detect adblock
var vidAdCount = 0;
var adBlockEnabled = false;
if (!isMobileApp) {
  var testAd = document.createElement("div");
  testAd.innerHTML = "&nbsp;";
  testAd.className = "adsbox";
  document.body.appendChild(testAd);
  window.setTimeout(function() {
    if (testAd.offsetHeight === 0) {
      //adblocker detected

      console.log("@@@@@@@@@@ is is blocked");
      adBlockEnabled = true;
      document.getElementById("blockedImg").style.display = "block";
    }
    testAd.remove();
    console.log("AdBlock Enabled? ", adBlockEnabled);
  }, 1000);
}

//@@@@@@@@@@@@@@@ load google analytics @@@@@@@@@@@@@@@@@

if (!isMobileApp) {
  //load analytics.js file
  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "http://web.archive.org/web/20201010193727/https://www.google-analytics.com/analytics.js",
    "ga"
  );

  //creates google analytics trackers
  ga("create", "UA-36494583-11", "auto"); //regular mope.io player (always track)
  //send pageviews
  ga("send", "pageview");
}

//video ads  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var gamesPlayedSinceLastAd = 0;
var lastAdShowT = 0;

if (window.localStorage) {
  //load last ad show time
  var savT = window.localStorage.getItem("lastAdShowT") * 1 || 0;
  var tSinceLastShow = +new Date() - savT; //make sure last ad shown time is in the past!
  lastAdShowT = tSinceLastShow > 0 ? savT : 0;
  //console.log("videoAd: ad last shown " + (tSinceLastShow / 1000.0) + "s ago!");
  //load games played since ad
  gamesPlayedSinceLastAd = window.localStorage.getItem("gamesSinceAd") * 1;
  //console.log("videoAd: " + gamesPlayedSinceLastAd + " games since last ad!");
}
var gamesPlayedThisSession = 0; //dont show ads on first game
var sessionStartT = +new Date();
var videoAdIsPlaying = false; //ad is being displayed at the moment?

//should ad be displayed this game
var shouldShowVideoAd = function() {
  if (!videoAdsAvailable()) {
    console.log("videoAd: no show: ads disabled");
    return false;
  }
  if (alwaysShowVideo) {
    console.log("videoAd: test mode, always show video ad!");
    return true;
  }
  if (adBlockEnabled) {
    console.log("videoAd: no show: ad blocker on!");
    return false;
  }
  //show ads for NEW players (test)
  /*if (gamesPlayedThisSession < 1 && lastAdShowT == 0) {
      console.log("videoAd: no show: NEW PLAYER, no games yet started!");
      return false;
  }*/

  //show ad if 5+ mins passed
  var tSecsSinceLastShow = (+new Date() - lastAdShowT) / 1000.0;
  if (tSecsSinceLastShow > 2 * 60 && gamesPlayedSinceLastAd > 0) {
    //only if actually started a game!
    console.log("videoAd: show: time limit passed!");
    return true;
  }
  if (gamesPlayedSinceLastAd >= 2) {
    console.log("videoAd: show: 3+ games passed!");
    return true;
  }
  //reached here, no ad this time

  //console.log("videoAd: no show: no ad this time (next ad in " + (5 * 60.0 - tSecsSinceLastShow) + "s) OR in " + (3 - gamesPlayedSinceLastAd) + " games started.");
  return false;
};

var videoAdsADINPLAY = false; //true;

var videoAdsAvailable = function() {
  var isTestMode = KTestingModeON;
  var adPossible = !isMobileApp && !isTestMode;
  if (videoAdsADINPLAY) return adPossible && typeof adplayer != "undefined";
  //adinplay
  else return adPossible;
};

var initVideoAds = function() {
  //ADINPLAY VIDEO ADS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  if (videoAdsADINPLAY) {
    getScript(
      "//web.archive.org/web/20201010193727/http://api.adinplay.com/player/v2/MOP/mope.io/player.min.js",
      function() {
        if (typeof aipPlayer != "undefined") {
          console.log("Loading video preroll...");
          adplayer = new aipPlayer({
            AD_WIDTH: 960, //1200
            AD_HEIGHT: 540, //675
            AD_FULLSCREEN: false,
            PREROLL_ELEM: document.getElementById("preroll"),
            AIP_COMPLETE: function() {
              //alert("prerollComplete");
              console.log("Video ad finished.");
              onVideoAdFinished(true); //successfully played and finished
            }
          });
        } else {
          // failed to load the adslib ads are probably blocked don't call startPreRoll
          console.log("Video ad (blocked) -finished.");
          onVideoAdFinished(false);
        }
      }
    );
  } else {
    //PLAYVIEW MEDIA VIDEO ADS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //load is done on-play
  }
};

function refreshBannerAds() {
  if (isMobileApp) return;

  try {
    console.log("refreshing banner ads...");

    console.log("CALLED FROM: "+new Error().stack);

      //CURSE
      //curse refresh banners

      factorem.refreshAds([1, 2], true);

      //setTimeout(factorem.refreshAds.bind(factorem, null, true), 800);

      //adinplay
      //googletag.pubads().refresh();
    
  } catch (ex) {
    //factorem/ads dont exist
    console.log("error refreshing ad: " + ex);
  }
}

//remove ads when menu is hidden- > to be reloaded later

//play a loaded ad
var videoAdShowLoading = false; //show loading... animation
var videoAdStartedPlaying = false;
var videoAdShowLoadingTXT = new CachedText(10.0, "white");
videoAdShowLoadingTXT.setText("Connecting...");
videoAdShowLoadingTXT.renderScale = 1.0; //better quality

var playVideoAd = function() {
  onVideoAdPlaying();
  //lower music volume for the ad
  if (currentMusic) currentMusic.volume = 0.2;
  videoAdIsPlaying = true;

  setSiteMenuVisible(false);

  // do something while video ad is played!

  videoAdShowLoading = true;
  videoAdStartedPlaying = false;

  //adinplay video
  if (videoAdsADINPLAY) {
    adplayer.startPreRoll();
  } else {
    //bolt/playview video
    document.getElementById("pvVidContainer").style.display = "block";

    playPVAd();
  }
};

//ad finished, start game
var onVideoAdFinished = function(successfulPlay) {
  if (!videoAdIsPlaying) {
    console.log("ad isn't playing!");
    //return;
  }

  videoAdIsPlaying = false;

  videoAdStartedPlaying = false;
  videoAdShowLoading = false; //stop showing loading... animation
  //successfulPlay=true; //always success

  //adinplay video
  if (videoAdsADINPLAY) {
  } else {
    //hide video container
    document.getElementById("pvVidContainer").style.display = "none";
    document.getElementById("my-content-2").style.display = "none";
  }

  //save that ad played (only on success!)
  if (successfulPlay) {
    gamesPlayedSinceLastAd = 0;
    lastAdShowT = +new Date();
    if (window.localStorage) {
      //save last ad show time
      try {
        window.localStorage.setItem("lastAdShowT", lastAdShowT);
        window.localStorage.setItem("gamesSinceAd", gamesPlayedSinceLastAd);
      } catch (err) {} //no localStorage
    }
  }

  // so if onFinished function is executed, and if the player is NOT alive in game or Ani-choice
  // shown then join the player otherwise ignore (it could be false execution)

  if (!serverCon_aliveInAGame && !aniChoice_isOpen) {
    //restore music volume for the ad
    if (currentMusic) currentMusic.volume = 0.7;
    //play sound (if not muted)
    var sound_click = getLazyLoadAudio("audio/click.mp3");
    if (sound_click) {
      try {
        sound_click.play();
      } catch (err) {}
    }

    console.log("Video done (success: " + successfulPlay + "), joining game!");
    joinGame(false); //not spectator
  }
};

//helper to load adinplay ads script
var getScript = function(src, callback) {
  var headElm = document.head || document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  var once = true;
  script.async = "async";
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.src = src;
  script.onload = script.onreadystatechange = function() {
    if (
      once &&
      (!script.readyState || /loaded|complete/.test(script.readyState))
    ) {
      once = false;
      callback();
      script.onload = script.onreadystatechange = null;
    }
  };

  headElm.appendChild(script);
};

//load video ads
if (!isMobileApp) {
  initVideoAds();
  //initBannerAds();
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  PLAYWIRE MEDIA video ads
var pvAdSuccess = false;
var pvAdStartTimeout = null;
var boltPlayerID = "player-2";

var pvFirstLoad = true; //preload ad
var playPVAd = function(firstLoad) {
  pvAdSuccess = false;

  //load/ play ad
  var pvVidContainer = document.getElementById("pvVidContainer");

  //if ad wont start playing for x seconds, skip it!
  pvAdStartTimeout = setTimeout(function() {
    //if this runs, script/ad failed to load
    console.log("Error: ad failed to start playing in time!");
    onVideoAdFinished(true); //prevent trying to play ad again, if failing to load
  }, 10000);

  //start loading ad
  try {
    script = document.createElement("script");
    script.src = "http://web.archive.org/web/20201010193727/http://cdn.playwire.com/bolt/js/zeus/embed.js";
    script.type = "text/javascript";
    script.id = "script";
    script.setAttribute("charset", "utf-8");
    script.setAttribute(
      "data-config",
      "http://web.archive.org/web/20201010193727/http://config.playwire.com/1018393/v2/pre_content.json"
    );
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-height", "100%");
    script.setAttribute("data-id", boltPlayerID); //name of player

    //added data-onready attribute
    script.setAttribute("data-onready", "onBoltLoaded");
    script.setAttribute("data-post-ad-container", "my-content-2");

    script.setAttribute(
      "data-theme",
      "http://web.archive.org/web/20201010193727/http://cdn.playwire.com/bolt/js/zeus/themes/orion/main.js"
    );

    pvVidContainer.appendChild(script);
    console.log("loading player...");
  } catch (e) {
    console.log("Error: " + e);
  }
};

//prevent obfuscation of callback method, create var from string!
window["onBoltLoaded"] = function(playerName) {
  console.log("onBoltLoaded: playerName '" + playerName + "'");

  Bolt.on(playerName, "showHiddenContainer", function() {
    console.log("BOLT showHiddenContainer fired");
    onVideoAdFinished(pvAdSuccess);
  });
  Bolt.on(playerName, Bolt.BOLT_AD_STARTED, function() {
    clearTimeout(pvAdStartTimeout);
    console.log("AD STARTED: SUCCESS");

    videoAdStartedPlaying = true;
    pvAdSuccess = true; //mark that ad finished!
  });
  Bolt.on(playerName, Bolt.BOLT_AD_ERROR, function() {
    console.log("AD ERROR EVENT FIRED");
    onVideoAdFinished(pvAdSuccess); //could have started, but experienced an error later
  });
  /*Bolt.on(playerName, Bolt.BOLT_AD_COMPLETE, function() {
    // do something
  	console.log( 'BOLT_AD_COMPLETE Fired' );
    pvAdSuccess = true;
    onVideoAdFinished(true);
});*/
};


///////
// file: js_src/client/mobileApp.js
///////

//detelct mobile app/ mobile browser @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//console.log("is mobile? " + isMobileAppIOS);

//obj-c bridge for ios app
var jsObjcBridge;

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

if (isMobileAppIOS) {
  setupWebViewJavascriptBridge(function(bridge) {
    var uniqueId = 1;
    jsObjcBridge = bridge;
  });
}
//call this to show ad in ios mobile app
var showAdMobileIOS = function() {
  if (jsObjcBridge && isMobileAppIOS) {
    console.log("Showing ad IOS...");
    jsObjcBridge.callHandler('adShowCallBack', {
      'foo': 'bar'
    }, function(response) {
      console.log('JS got response ' + response);
    });
  }
}

//android app ads calling
var showAdMobileAndroid = function() {
  console.log("Showing ad android...");
  window.location = "myscheme://showAdmob";
}

function showMobileAd(){
  console.log("showing mobile ad......");
  if (isMobileAppIOS) showAdMobileIOS();
  if (isMobileAppAndroid) showAdMobileAndroid();
}


//@@@@@@@@@@@@@@@@@@@@  SETUP MOBILE @@@@@@@@@@@@@@@@@@@@@@@@@@

//detect iOS device (redirect to app!)
var isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
if ((isiOS || isAndroid) && !isMobileApp) {
  var oldVisitor = false;
  if (window.localStorage) {
    //dont redirect people more than once
    oldVisitor = window.localStorage.getItem("oldVisitor") > 0;
    try {
      window.localStorage.setItem("oldVisitor", 1);
    } catch (err) {
      oldVisitor = true;
    } //no localStorage= no redirects
  }

}




///////

var animalcol = {

    if (animalcol = 0) {
    ctx.fillStyle = col_land;
    },
  
   if (animalcol = 1) {
    ctx.fillStyle = col_water;
    },

   if (animalcol = 2) {
    ctx.fillStyle = col_arctic;
    },
  
   if (animalcol = 3) {
    ctx.fillStyle = col_lava;
    },
}

///////
// file: js_src/interface/interface.js
///////

//like a static class, for better organization
var GameInterface = {};
function drawGameInterface() {
  if (!serverCon_aliveInAGame) return;

  ctx.save();

  //ease animated vars
  waterBarPerc += (waterBarPerc_n - waterBarPerc) * 0.1;

  xpPer += (xpPer_n - xpPer) * 0.03;
  //flashing LOW water animation

  var myPlayer = gameObjsByID[myPlayerID];
  if (myPlayer) {
    myPlayerLastAniT = myPlayer.animalType;
  }

  var waterBarA = 1.0;
  var lowBarPerc = waterBarPerc <= 25;
  if (lowBarPerc) {
    var period = 1.2; //periodic func with time
    var p_min = 0.4,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    waterBarA =
      p_min +
      amp +
      amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));
  }

  //water bar
  var barW = Math.min(450, canvasW * 0.9) * interfS,
    barH = 30 * interfS;
  var bx = canvasW / 2, //from bottom
    by = canvasH - 60 * interfS;
  ctx.globalAlpha = 0.35 * waterBarA; //bar bg
  ctx.fillStyle = "#000000";
  ctx.fillRect(bx - barW / 2, by - barH / 2, barW, barH);

  ctx.globalAlpha = waterBarA;
  if (animalBarType == 3)
    ctx.fillStyle = '#ff894b';
    else if (animalBarType == 2)
    // myPlayerLastAniT == a_blackDragon || myPlayerLastAniT == a_phoenix)
    ctx.fillStyle = col_lava;
  else ctx.fillStyle = isAirBar || animalBarType == 1 ? "#8CCEF4" : col_wat1; //bar fill

  ctx.fillRect(
    bx - barW / 2,
    by - barH / 2,
    barW * (waterBarPerc / 100.0),
    barH
  );

  ctx.fillStyle = controls_leftClicked
    ? lowBarPerc
      ? col_food1
      : "orange"
    : lowBarPerc
      ? col_food1
      : "white";
  ctx.globalAlpha = 1.0 * waterBarA;

  //text settings
  var barTxt;
  if (animalBarType == 1) barTxt = lowBarPerc ? "LOW AIR" : "AIR";
  else if (animalBarType == 2) barTxt = lowBarPerc ? "LOW LAVA" : "LAVA";
  else if (animalBarType == 3) barTxt = lowBarPerc ? "LOW ENERGY" : "ENERGY";
  else {
    barTxt = lowBarPerc ? "LOW WATER" : "WATER";
  }

  waterBarTXT.setText(barTxt);
  waterBarTXT.setFontSize(22.0 * interfS);
  if (animalBarType == 4) waterBarTXT.setColor("black");
  else waterBarTXT.setColor(lowBarPerc ? col_food1 : "white");
  waterBarTXT.x = bx;
  waterBarTXT.y = by;
  ctx.globalAlpha *= lowBarPerc ? 1.0 : 0.5;
  waterBarTXT.draw();

  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#000000"; //bar bg
  by = canvasH - barH / 2 - 5;
  // by = by + 5 + barH;
  barW = canvasW * 0.9;

  ctx.fillRect(bx - barW / 2, by - barH / 2, barW, barH); //bg
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = "#F3C553"; //col_food2; //bar
  ctx.fillRect(bx - barW / 2, by - barH / 2, barW * (xpPer / 100.0), barH); //fill
  ctx.globalAlpha = 1.0;

  xpBarTXT.setText(
    "" +
    formatNumK(xp) +
    " xp  (" +
    formatNumK(xpNextAni) +
    " xp Next Animal)"
  );
  xpBarTXT.setFontSize(22.0 * interfS);
  xpBarTXT.x = bx;
  xpBarTXT.y = by;
  xpBarTXT.draw();

  ctx.globalAlpha = 1.0;
  //}

  //draw touch/ability buttons
  for (var k = 0; k < allTouchButtons.length; k++) {
    var aTouchBut = allTouchButtons[k];
    aTouchBut.draw();
  }

  create1v1Button();

  if (isTouchEnabled) {
    //draw joystick
    joystickA += ((joyStickOpen ? 1.0 : 0.0) - joystickA) * 0.1;
    if (joystickA > 0.005 && serverCon_aliveInAGame) {
      //base
      ctx.globalAlpha = 0.3 * joystickA;
      ctx.beginPath();
      ctx.arc(
        joystickStartX,
        joystickStartY,
        joystickRad * pixelRat,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "#000000";
      ctx.fill();
      //top
      ctx.globalAlpha = 0.5 * joystickA;
      ctx.beginPath();
      ctx.arc(
        joystickTipX,
        joystickTipY,
        joystickRad * pixelRat * 0.57,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "#000000";
      ctx.fill();

      //direciton arrow (on screen center)
      var dChange = joystickDirArrowAngle_nDelta * 0.3; //* a;
      joystickDirArrowAngle_nDelta -= dChange;
      joystickDirArrowAngle += dChange;
      joystickDistF += (joystickDistF_n - joystickDistF) * 0.1;
      ctx.save();
      ctx.translate(canvasW / 2, canvasH / 2); //center to screen middle
      ctx.rotate(joystickDirArrowAngle);
      ctx.globalAlpha = 0.5 * joystickA;
      ctx.beginPath();

      ctx.fillStyle = "#000000";

      var arrowRad = 40.0 * pixelRat;
      if (gameObjsByID[myPlayerID])
        //set to own animal rad
        arrowRad = (9.0 + gameObjsByID[myPlayerID].rad) * camzoom;
      arrowRad *= 0.1 + 0.9 * joystickDistF;
      var arrowW = 15.0 * pixelRat; //this gets complied away anyways
      var arrowL = 30.0 * pixelRat * (0.2 + 0.8 * joystickDistF);
      //console.log("len "+arrowL+" f "+joystickDistF);
      //start at angle 0 (rad), so move rightwards
      ctx.moveTo(arrowRad + arrowL, 0); //tip of arrow
      ctx.lineTo(arrowRad, arrowW / 2);
      ctx.lineTo(arrowRad, -arrowW / 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  //DRAW: xp plus popups
  for (var k = plusXpPopups.length - 1; k >= 0; k--) {
    //iterate backwards to allow removing
    var anItem = plusXpPopups[k];
    anItem.draw();

    if (anItem.timedOut) plusXpPopups.splice(k, 1); //remove timed out item
  }

  ctx.restore();

  if (endScreenCanvas != null) {
    ctx.save();
    endScreenCanvas.width &&
      ctx.drawImage(
        endScreenCanvas,
        canvasW / 2 - endScreenCanvas.width / 2,
        endScreenY,
        endScreenCanvas.width,
        endScreenCanvas.height
      );
    ctx.restore();
  }
}
//draw big midscreen text
var screenText = "Survive!";
var screenTextFontSize = 25.0;
var screenTextCol = "white";
var screenTextEndT = +new Date() + 0;

//instructions
var screenIns_objsEdible = []; //array of new edible objs (shown in instructions)
var screenIns_EndT = +new Date() + 0;
var screenIns_A = 0.0;
var screenIns_objsEdible_fullW = 100;
var screenIns_scaleF = 2.0;
var screenIns_drawNewPlayerIns = false;

//animal choice interface
var aniChoice_isOpen = false;
var aniChoice_A = 0.0;
var aniChoice_choiceButtons = []; //buttons to be rendered
var aniChoice_joinGameAfter = false;
var aniChoice_startT = 0;
var aniChoice_timeOutT = 0;

function showScreenTextWithDur(newText, newDur) {
  screenText = newText;
  screenTextEndT = +new Date() + newDur;
}
function drawGamePlay(){
 //draw instructions if needed
   var fadeDur = 0.1;
  var a = (screenIns_EndT - timestamp) / 1000.0 / fadeDur;
  a = 0 > a ? 0 : 1 < a ? 1 : a; //clamp from 0-1

  var idealA = screenIns_EndT - timestamp > 0 ? 1.0 : 0.0;
  screenIns_A +=.1 * (a - screenIns_A)
  //var fadeDur = 1.0;
  //var a = (screenIns_EndT - timestamp) / 1000.0 / fadeDur;
  //a = 0 > a ? 0 : 1 < a ? 1 : a; //clamp from 0-1
  //screenIns_A=a;

   if (screenIns_A > 0.01 && !options_lowGraphics) {
          ma = 40 + 10 / screenIns_scaleF;
            if (0 < screenIns_objsEdible.length) {
                ctx.save();
                ctx.translate(canvasW / 2, canvasH * (.7 + .5 * (1 - screenIns_A)));
                ctx.scale(screenIns_scaleF * interfS, screenIns_scaleF * interfS);
                ctx.globalAlpha = .2 * screenIns_A;
                ctx.fillStyle = "black";
                var t = 70 * (screenIns_objsEdible.length) / screenIns_scaleF
                   
                ctx.fillRect(-t / 2, -30 / 2, t, 30);
                ctx.globalAlpha = screenIns_A;
                for (e = 0; e < screenIns_objsEdible.length; e++) {
                    
                   var anO = screenIns_objsEdible[e];
    
                    anO.draw();
                }
            }
            if (e = getLoadedImg("./img/instr_eatsymbol.png")) i = ma  / e.height * screenIns_A
            , ctx.drawImage(e, -t / 2 - e.width * i - 15, -ma  / 2, e.width * i, e.height * i);
            screenIns_drawNewPlayerIns && (ctx.save()
            , ctx.fillStyle = "#52EB59"
            , ctx.font = 16 * interfS + "px Arial"
            ,
             ctx.textAlign = "center", ctx.textBaseline = "middle", 
             options_lowGraphics || (ctx.shadowOffsetX = 1, ctx.shadowOffsetY = 1, ctx.shadowColor = "black"), 
             ctx.fillText("HINT: Edible food is outlined LIGHT-GREEN!", 0, -45), 
             ctx.restore());
             ctx.restore()
        
  }

}
function drawScreenText() {
 
  //draw screen text
  var fadeDur = 1.0;
  var a = (screenTextEndT - timestamp) / 1000.0 / fadeDur;
  a = 0 > a ? 0 : 1 < a ? 1 : a; //clamp from 0-1

  if (a > 0) {
    ctx.save();
    ctx.globalAlpha = a;

    /*ctx.font = 25.0 * interfS + "px Arial";
        ctx.lineWidth = 1;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; //vertical center
        if (!options_lowGraphics) {
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowColor = "black";
        }
        ctx.fillStyle = screenTextCol;

        fillTextMultiLine(screenText, canvasW / 2, canvasH * 0.3); 
*/
    screenTXT.setText(screenText);
    screenTXT.setColor(screenTextCol)
    screenTXT.setFontSize(screenTextFontSize * interfS);
    screenTXT.x = canvasW / 2;
    screenTXT.y = canvasH * 0.3;
    screenTXT.draw();

    ctx.restore();
  }

 
  //draw animal choice interface
  //draw instructions if needed
  var idealA = aniChoice_isOpen ? 1.0 : 0.0;
  aniChoice_A += (idealA - aniChoice_A) * 0.1;
  
  var _0x1ac04e = 3
  var hotkeys = [];
hotkeys.push('1234567'.split(''));
hotkeys.push('qertyui'.split(''));
hotkeys.push('adfghjk'.split(''));
hotkeys.push('zxcvbnm'.split(''));
  if (0.01 < aniChoice_A) {
        if (0 < aniChoice_choiceButtons.length) {
            ctx.save();
            _0x2f1044 = +new Date();
            idealA = 150;
            ispopup = !1;
            window.matchMedia('(orientation: portrait)').matches && (ispopup = !1);
            window.matchMedia('(orientation: landscape)').matches && (ispopup = !0);
            ispopup ? 15 <= aniChoice_choiceButtons.length ? idealA = 120 : 10 <= aniChoice_choiceButtons.length ? idealA = 130 : 5 <= aniChoice_choiceButtons.length && (idealA = 140) : idealA = Math.max(80, window.innerWidth / 2 / 4);
            var idealA = (idealA * interfS) / 1.2,
                totalW = Math.max(0, aniChoice_choiceButtons.length);
            7 < aniChoice_choiceButtons.length && (totalW = Math.min(6, totalW));
            var _0x469399, ispopup = 0.25 * canvasH,
                _0x4d5d9e = 1.15 * idealA;
            _0x469399 = canvasW / 2 - totalW * _0x4d5d9e / 2 + _0x4d5d9e / 2;
            var _0x1b8a84 = 1,
                choicelen = aniChoice_choiceButtons.length,
                idk = 0.5 + Math.floor(choicelen / totalW) / 10,
                idk = Math.max(0.5, idk),
                idk = Math.min(0.9, idk);
            ctx.translate(0, canvasH * -idk * (1 - aniChoice_A));
            for (var J = idk = 0; J < choicelen; J++) {
                var anO = aniChoice_choiceButtons[J];
                0 < J && 7 < choicelen && 0 == J % 6 && (_0x1b8a84++, idk = 0, ispopup += 1.15 * _0x4d5d9e, _0x469399 = choicelen - J, totalW = 6 > _0x469399 ? _0x469399 : 6, _0x469399 = totalW * _0x4d5d9e, _0x469399 = canvasW / 2 - _0x469399 / 2 + _0x4d5d9e / 2);
                anO.buttonScaleF = 0 == J ? 1.2 : 1;
                anO.w = idealA;
                anO.h = idealA;
                anO.x = _0x469399;
                anO.y = ispopup;
                _0x469399 += _0x4d5d9e / 2 * anO.buttonScaleF + _0x4d5d9e / 2;
                _0x1b8a84 < hotkeys.length && anO.setHotKey(hotkeys[_0x1b8a84 - 1][idk].toUpperCase());
                idk++;
            }
            ctx.globalAlpha = aniChoice_A;
            for (J = 0; J < aniChoice_choiceButtons.length; J++) anO = aniChoice_choiceButtons[J], anO.imgSizeF = 0.5, anO.draw();
        }
    
        idealA = Math.max(0, _0x2af9ee - _0x2f1044) / 1000;
        ispopup = 1;
        0 != idealA && 8 > idealA && (ispopup = 0.7 + 0.3 * Math.sin(2 * Math.PI / 1.2 * (_0x2f1044 / 1000)));
        ctx.save();
        ctx.globalAlpha = aniChoice_A * ispopup;
        ctx.fillStyle = 0 != idealA && 8 > idealA ? 'red' : 'white';
        ctx.font = 25 * interfS + 'px Arial';
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.shadowColor = 'black'
        idealA = 0 < idealA ? ' (auto in ' + Math.trunc(idealA) + 's)' : '';
        _0x4cd58d = Math.min(window.devicePixelRatio, 2),
        ctx.fillText(aniChoice_joinGameAfter ? 'Choose which animal to spawn as:' : 'Choose an upgrade:' + idealA, canvasW / 2, aniChoice_choiceButtons[0].y - aniChoice_choiceButtons[0].w / 2 - 25 * _0x4cd58d);
        ctx.restore();
        ctx.restore();
    }

  // we need an anchor here to inject custom interface methods
  /// battle royal messages:
  //    if (window.gameMode_interface)
  //        window.gameMode_interface();
  if (_gameMode != null) {
    _gameMode.interface();
  }

  buildInviteScreen();

  if (inviteScreenCanvas != null) {
    inviteScreenCanvas.width &&
      ctx.drawImage(
        inviteScreenCanvas,
        canvasW / 2 - inviteScreenCanvas.width / 2,
        inviteScreenPos,
        inviteScreenCanvas.width,
        inviteScreenCanvas.height
      );
  }

  gameModeDrawInterfaceButtons();
  display1v1TopperInfo();
}
function gameModeDrawInterfaceButtons() {
  if (_gameMode != null)
    if (_gameMode.interfaceButtons) {
      for (var i = 0; i < _gameMode.interfaceButtons.length; i++) {
        var aBut = _gameMode.interfaceButtons[i];
        if (aBut.isVisible) {
          aBut.draw();
        }
      }
    }
}
var minimapW = 250.0,
   minimapH = 250.0; //width of the canvas (used during draw)

var oceanWid = 0;
var arcticW = 0;
var arcticH = 0;
function generateMinimap(msg) {
  //scale minimap based on ratio for minimap
  minimapW = minimapH * (gameW / gameH);

  //offscreen canvas to render and save minimap (performance+ease)
  if (!miniMapCanvas) miniMapCanvas = document.createElement("canvas");

  miniMapCanvas.width = minimapW;
  miniMapCanvas.height = minimapH;
  var ctx_ = miniMapCanvas.getContext("2d");

  ctx_.globalAlpha = 0.35;
  ctx_.fillStyle = "#000000";
  ctx_.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  //parse msg, draw data on miniMap
  var minimapScaleF_x = minimapW / 200.0; // / size scaled to for msg send
  var minimapScaleF_y = minimapH / 200.0;
  
console.log(minimapScaleF_x,minimapScaleF_y)
  //oceans: just send width (oceans are always at left/right sides)
  oceanWid = msg.readUInt16();
  arcticW = msg.readUInt16();
  arcticH = msg.readUInt16();

  //if(!snowflakesDrawnForActic) drawSnowFlakesInArctic(arcticW, arcticH);
  for (var i = 0; i < 2; i++) {
    ctx_.fillStyle = col_ocean;
    ctx_.globalAlpha = 0.5;
    var tF = minimapW / gameW;
    if (i == 0)
      //left SIDE
      ctx_.fillRect(0 * tF, arcticH * tF, oceanWid * tF, gameH * tF);
    //r SIDE
    else
      ctx_.fillRect(
        (gameW - oceanWid) * tF,
        arcticH * tF,
        oceanWid * tF,
        gameH * tF
      );
  }
  //draw arctic (centered at top)
  ctx_.fillStyle = "white";
  ctx_.globalAlpha = 0.5;
  var tF = minimapW / gameW;
  ctx_.fillRect(
    (gameW / 2 - arcticW / 2) * tF,
    0 * tF,
    arcticW * tF,
    arcticH * tF
  );

  //draw river
  var numWater = msg.readUInt16();
  ctx_.fillStyle = col_ocean;
  ctx_.globalAlpha = 0.5;
  for (var i = 0; i < numWater; i++) {
    // rivers
    var riverW = msg.readUInt16() * (minimapW / gameW);
    var riverH = msg.readUInt16() * (minimapH / gameH);
    var riverX = msg.readUInt16() * (minimapW / gameW);
    var riverY = msg.readUInt16() * (minimapH / gameH);

    ctx_.globalAlpha = 0.5;
    var tF = minimapW / gameW;
    ctx_.fillRect(riverX - riverW / 2, riverY - riverH / 2, riverW, riverH);
  }

  //volcano biome
  var numWater = msg.readUInt16();
  ctx_.fillStyle = col_lava;
  for (var i = 0; i < numWater; i++) {
    var volcanoRad = msg.readUInt8() * 5.0;
    var volcanoX = msg.readUInt16() * (minimapW / gameW);
    var volcanoY = msg.readUInt16() * (minimapH / gameH);
    ctx_.beginPath();
    ctx_.arc(
      volcanoX,
      volcanoY,
      Math.max(1, volcanoRad * (minimapW / gameW)),
      0,
      2 * Math.PI
    );
    ctx_.fill();
  }

  // danger area
  /*var numWater = msg.readUInt16();
    for (var i = 0; i < numWater; i++) {
        var mainRad = msg.readUInt8() * 5.0;
        var shrinkRad = msg.readUInt8() * 5.0;
        var areaX = msg.readUInt16() * (minimapW / gameW);
        var areaY = msg.readUInt16() * (minimapH / gameH);
        var areaW = msg.readUInt16() * (minimapW / gameW);
        var areaH = msg.readUInt16() * (minimapH / gameH);
        ctx_.beginPath();
        ctx_.fillStyle = "red";
        ctx_.globalAlpha = 0.3;
        ctx_.fillRect(areaX - areaW / 2, areaY - areaH / 2, areaW, areaH);


        ctx_.fillStyle = "limegreen";
        ctx_.globalAlpha = 0.7;
        ctx_.arc(areaX, areaY, Math.max(1, shrinkRad * (minimapW / gameW)), 0, 2 * Math.PI);
        ctx_.fill()
    }*/

  //lakes
  var numWater = msg.readUInt16();
  ctx_.fillStyle = col_wat1;
  ctx_.globalAlpha = 0.5;
  for (var i = 0; i < numWater; i++) {
    //lakes
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;
    var rad = msg.readUInt8() * 5.0; //scaled down here
    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(1, rad * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }

  //mud spots
  var numWater = msg.readUInt16();
  ctx_.fillStyle = "#907A33";
  ctx_.globalAlpha = 0.7;
  for (var i = 0; i < numWater; i++) {
    //mud areas
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;
    var rad = msg.readUInt8() * 5.0; //scaled down here
    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(1, rad * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }
  var numWater = msg.readUInt16();
  ctx_.fillStyle = "#7BB7BB";
  ctx_.globalAlpha = 0.85;
  for (var i = 0; i < numWater; i++) {
    //ice areas
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;
    var rad = msg.readUInt8() * 5.0; //scaled down here
    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(1, rad * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }
  var numWater = msg.readUInt16();
  ctx_.fillStyle = col_outline_land;
  ctx_.globalAlpha = 1.0;
  for (var i = 0; i < numWater; i++) {
    //hills
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;
    var rad = msg.readUInt8() * 5.0; //scaled down here
    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(1, rad * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }
  var numWater = msg.readUInt16();
  ctx_.fillStyle = "#A89937";
  ctx_.globalAlpha = 0.6;
  for (var i = 0; i < numWater; i++) {
    //lake islands
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;
    var rad = msg.readUInt8() * 5.0; //scaled down here
    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(1, rad * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }
  var numWater = msg.readUInt16(); //food spots
  ctx_.fillStyle = col_food1;
  ctx_.globalAlpha = 1.0;
  for (var i = 0; i < numWater; i++) {
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;

    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(2.5, 40.0 * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }

  var numWater = msg.readUInt16(); //water spots
  ctx_.fillStyle = col_wat1;
  ctx_.globalAlpha = 1.0;
  for (var i = 0; i < numWater; i++) {
    var x = msg.readUInt8() * minimapScaleF_x;
    var y = msg.readUInt8() * minimapScaleF_y;

    ctx_.beginPath();
    ctx_.arc(x, y, Math.max(2.5, 50.0 * (minimapW / gameW)), 0, 2 * Math.PI);
    ctx_.fill();
  }
}

//XP popups

var  plusXpPopups = [];

var  lastPopupXPAm = 0;

var  lastPopupT = 0;
var  lastPopupC = 0;


function interface_onXPAmountUpdate(newAmount, oldAmount) {
  var xpGained = newAmount - lastPopupXPAm;

  if (
    newAmount - lastPopupXPAm != 0 &&
    (timestamp - lastPopupT) / 1000.0 > 0.7
  ) {
    //over 0.5s since last popup
    lastPopupXPAm = newAmount;
    lastPopupT = timestamp;

    //new popup
    var newPop = new PlusXPPopup(xpGained);

    plusXpPopups.push(newPop);
  }
}

function drawLeaderboard() {
  // if (gameMode != gameMode_teamMode)
  //   if (lbCanvas && serverCon_aliveInAGame) {
  //     lbCanvas.width &&
  //       ctx.drawImage(
  //         lbCanvas,
  //         10 * pixelRat,
  //         28 * pixelRat,
  //         lbCanvas.width * interfS,
  //         lbCanvas.height * interfS
  //       );
  //   }

  if (_gameMode != null) _gameMode.drawLeaderboard();
}

function drawMinimap() {
  //draw minimap (pre-rendered)
  if (
    canvasW / pixelRat >= 500 &&
    miniMapCanvas && 
    miniMapCanvas.width &&
    serverCon_aliveInAGame
  ) {
    ctx.drawImage(
      miniMapCanvas,//minimapCanvas == width & height of minimapW/H
      canvasW - (10 * pixelRat + miniMapCanvas.width * interfS),
      10 * pixelRat,
      minimapW * interfS, //minimapW && h == 250;
      minimapH * interfS  //interfS = 0.85 * pixelRat * Math.max(windowW / 1920, windowH / 1080); || maybe 1.0
    );

    //draw own player on minimap
    var myPlayerObj = gameObjsByID[myPlayerID];
    if (myPlayerObj) drawPlayerOnMiniMap(myPlayerObj, "white", 1.0);
  }
}

function drawPlayerOnMiniMap(myPlayerObj, color, radF) {
  if (myPlayerObj) {
    ctx.fillStyle = color;
    ctx.beginPath();
    var plR =
      pixelRat * Math.max(3, myPlayerObj.rad * (miniMapCanvas.width / gameW));
    ctx.arc(
      canvasW -
      (10 * pixelRat + miniMapCanvas.width * interfS) +
      (myPlayerObj.x * (miniMapCanvas.width * interfS)) / gameW,
      10 * pixelRat +
      (myPlayerObj.y * (miniMapCanvas.height * interfS)) / gameH,
      plR * radF,
      0,
      2 * Math.PI
    );
    ctx.fill();
   
  }
}

function drawObjOnMiniMap(obj, color, radF) {
  if (obj) {
    ctx.fillStyle = color;
    ctx.beginPath();
    var plR = pixelRat * Math.max(2, obj.rad);
    ctx.arc(
      canvasW -
        (10 * pixelRat + miniMapCanvas.width * interfS) +
        (obj.x * (miniMapCanvas.width * interfS)) / gameW,
      10 * pixelRat + (obj.y * (miniMapCanvas.height * interfS)) / gameH,
      plR * radF,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

//generate leaderboard
function updateLeaderBoard(lbData, roomPlayers, ownRank) {
  lbCanvas = null;
  if (0 != lbData.length) {
    lbCanvas = document.createElement("canvas");
    var ctx_ = lbCanvas.getContext("2d"),
      boardLength = 55;
    var nameH = 22;
    boardLength = boardLength + nameH * lbData.length;
    lbCanvas.width = 270;
    lbCanvas.height = boardLength;

    ctx_.globalAlpha = 0.2;
    ctx_.fillStyle = "#000000";
    ctx_.fillRect(0, 0, lbCanvas.width, lbCanvas.height);

    ctx_.globalAlpha = 1;
    ctx_.fillStyle = "#FFFFFF";
    var str = curServer.name; //"Top Players";
    ctx_.font = "24px Arial";
    if (!options_lowGraphics) {
      ctx_.shadowOffsetX = 1;
      ctx_.shadowOffsetY = 1;
    }
    ctx_.shadowColor = "black";
    ctx_.fillText(
      str,
      lbCanvas.width / 2 - ctx_.measureText(str).width / 2,
      40
    );
    var rank;

    ctx_.textAlign = "left";
    //ctx_.textBaseline = "middle"; //vertical center

    for (ctx_.font = "17px Arial", rank = 0; rank < lbData.length; ++rank) {
      str = options_noNames ? "" : lbData[rank].name || "mope2.io/1v1";

      if (ownRank == lbData[rank].rank) {
        ctx_.fillStyle = "#FEED92";
        if (options_noNames) str = "you";
      } else ctx_.fillStyle = "#FFFFFF";

      str =
        lbData[rank].rank +
        ". " +
        str +
        " (" +
        formatNumK(lbData[rank].score) +
        ")";
      ctx_.fillText(str, 15, 65 + nameH * rank);
    }
  }
}

//interface hide/shows
function setSiteMenuVisible(visible) {
  document.getElementById("startMenuWrapper").style.display = visible
    ? "block"
    : "none";
}
function onClickContinue() {
  playPressed();
  //setSiteMenuVisible(true);
  document.getElementById("endScreen").style.display = "none";
}

function hideEndScreen() {
  var endScreen = document.getElementById("endScreen");
  if (endScreen) {
    this.endScreenDisplayed = true;
    endScreen.innerHTML = "";
    endScreen.style.display = "none";
    endScreen.style.marginTop = "0px";
  }
}
function onClickShowMenu() {
  setSiteMenuVisible(true);
  document.getElementById("moneyRectangle").style.marginTop = "55px";
  document.getElementById("mopeMenu").style.display = "block";
  document.getElementById("endScreen").style.display = "none";
}

function showBannerAds() {}

function showMopeMenu() {
  document.getElementById("mopeMenu").style.display = "block";
}

function resetClient() {
  // call this funciton when a game mode is reset. this way client no longer retains old game objects
  // start again!
  console.log("client objs reset!");
  gameObjs = [];
  gameObjsByID = {};
  remGameObjs = [];
}

var drawLabelValueOn = function(c, label, value, x, y) {
  c.fillText(label, x, y);
  c.fillText(": " + value, x + 120, y);
};

function create1v1Button() {
  if (can1v1) {
    if (btn1v1 == null) {
      btn1v1 = new InterfaceButton(0, 0, 60, 60, "It No Work :Facetroll:", 30);
      btn1v1.showLabeleOnHover = true;
      btn1v1.textShadow = true;
      btn1v1.drawTextOnHowever = function() {
        this.drawText(this.w / 2, this.h + this.h / 2);
      };

      btn1v1.onClick = function() {
        if (!this.clicked  ) {
          this.isVisible = false;
          this.clicked = true;
          this.isHighLighted = false;
          var mes = new MsgWriter(2);
          mes.writeUInt8(52); // Msg_1v1Mode_invitePlayer;
          mes.writeUInt8(0); //1=down, 0=up
          wsSendMsg(mes);
        }
      };
      btn1v1.onMouseMove = function() {};
      btn1v1.update = function() {
        this.x = canvasW / 2 - this.w / 2;
        this.y = 45 * interfS + this.h / 2; //(canvasH / 2) - 250;
        //if (gameMode == gameMode_battleRoyal) this.y += 50 * interfS;
      };

      btn1v1.onInterfaceReset = function() {
        this.isVisible = false;
        btn1v1 = null;
      };

      btn1v1.onAfterDraw = function() {
        var theImg = getLoadedImg("img/icons/1v1.png");
        if (theImg) {
          ctx.save();

          var iw = this.w * 0.8;
          var pad = (this.w - iw) / 2;
          ctx.drawImage(theImg, this.x + pad, this.y + pad, iw, iw);
          ctx.restore();
        }
      };
      _gameMode.interfaceButtons.push(btn1v1);
    } else {
      if (btn1v1 != null) {
        btn1v1.isVisible = show1v1Button;
        if (btn1v1.isVisible) btn1v1.clicked = false;
        btn1v1.draw();
      }
    }
  }
}

var _displayPlayerCounter = 0;
function displayPlayerStats() {
  _displayPlayerCounter++;

  if (_displayPlayerCounter % 500 == 0) {
    _displayPlayerCounter = 0;
    if (displayWinsGoals == 1) displayWinsGoals = 0;
    else displayWinsGoals = 1;
  }

  if (!can1v1 || player1v1ArenaWins == 0) displayWinsGoals = 1;

  if (player1v1ArenaWins > 0 || playerGoalsScore > 0) {
    var displayCounterNumb = 0;
    var displayLabel = "";
    if (displayWinsGoals == 0) {
      displayCounterNumb = player1v1ArenaWins;
      displayLabel = "1v1 WINS";
    } else if (displayWinsGoals == 1) {
      displayCounterNumb = playerGoalsScore;
      displayLabel = "GOALS";
    }

    if (displayCounterNumb > 0) {
      ctx.save();
      player1v1TXT.setText(displayLabel + ": " + displayCounterNumb);
      player1v1TXT.setFontSize(30.0 * interfS);
      player1v1TXT.setColor("white");
      player1v1TXT.x = canvasW / 2;
      player1v1TXT.y = canvasH - 95 * interfS;
      ctx.globalAlpha = 1;
      player1v1TXT.draw();
      ctx.restore();
    }
  }
}


  

var displayWinsGoals = 0;
var inviteScreenCanvas = null;
var inviteScreenPos = 0;
function buildInviteScreen() {
  /* player1v1Requests = [];
  for (i = 0; i < 1; i++) {
    var id = i;
    var fromPlayer = "test " + (i + 1);
    var reqDur = 10000;
    player1v1Requests.push({
      id: id,
      requestee: fromPlayer,
      aniType: 1,
      wins: 1,
      teamID: 1,
      rank: 1,
      dur: reqDur
    });
  }
  */
  if (player1v1Requests.length == 0) {
    removeExpiredRequestButtons();
    inviteScreenCanvas = null;
    return;
  }

  if (inviteScreenCanvas == null)
    inviteScreenCanvas = document.createElement("canvas");

  if (inviteScreenCanvas == null) return;

  var ctx_ = inviteScreenCanvas.getContext("2d");
  var boardLength = 55;
  var nameH = 40;
  var pad = 5;

  var borad_height = 200 + player1v1Requests.length * 80;
  var borad_width = 420;

  boardLength = borad_height + pad * 2;
  inviteScreenCanvas.width = borad_width + pad * 2;
  inviteScreenCanvas.height = boardLength;
  var screenPos =300
  inviteScreenPos = screenPos;
  ctx_.globalAlpha = 0.2;
  ctx_.fillStyle = "#000000";
  ctx_.fillRect(0, 0, inviteScreenCanvas.width, inviteScreenCanvas.height);
  ctx_.fillStyle = "#000000";
  ctx_.fillRect(
    pad,
    pad,
    inviteScreenCanvas.width - pad * 2,
    inviteScreenCanvas.height - pad * 2
  );
  var y = pad;
  ctx_.globalAlpha = 1;
  ctx_.fillStyle = "#FFFFFF";
  ctx_.font = "30px Arial";

  y += 55;

  var str = "1v1 REQUEST"; //"Top Players";
  ctx_.font = "30px Arial";
  ctx_.fillText(
    str,
    inviteScreenCanvas.width / 2 - ctx_.measureText(str).width / 2,
    y
  );

  //screenPos -= boardLength / 2;
  // screenPos += 40;
  screenPos = 100;
  var btnY = 0;
  for (r = 0; r < player1v1Requests.length; r++) {
    var req = player1v1Requests[r];
    ctx_.save();
    ctx_.font = "20px Arial";

    str = req.requestee + " invites you for 1v1 ";
    ctx_.fillText(
      str,
      inviteScreenCanvas.width / 2 - ctx_.measureText(str).width / 2,
      screenPos
    );

    var x = pad + 15;
    y = screenPos + 40;
    drawLabelValueOn(ctx_, "Animal", "", x, y);

    var aniInfo = infoForAnimalType(req.aniType);
    var theImg = getLoadedImg("./skins/" + aniInfo.skinName + ".png");

    if (theImg) {
      ctx_.save();

      ctx_.drawImage(theImg, x + 130, y - 30, 50, 50);
      ctx_.restore();
    }

    x += 210;
    drawLabelValueOn(ctx_, "1v1 Wins", req.wins, x, y);
    y += 40;
    x = pad + 15;
    var teamLabel = gameMode == gameMode_teamMode ? "Team" : "Kills";
    var teamVal = gameMode == gameMode_teamMode ? "" : req.kills;
    drawLabelValueOn(ctx_, teamLabel, "", x, y);

    if (gameMode == gameMode_teamMode) {
      ctx_.save();
      var cx = x + 155;
      var cy = y - 10 / 2;
      ctx_.fillStyle = _gameMode.teamColors[req.teamID];
      ctx_.beginPath();
      ctx_.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx_.fill();

      ctx_.restore();
    }
    x += 210;
    drawLabelValueOn(ctx_, "Rank", req.rank, x, y);
    screenPos += 100;
    var btnAccept = create1v1RequestButton(req, "Accept");

    btnAccept.yPos = screenPos;
    btnAccept.update = function() {
      this.x = canvasW / 2 - 140;
      this.y = inviteScreenPos + this.yPos + 10;
    };

    var btnReject = create1v1RequestButton(req, "Reject");
    btnReject.yPos = screenPos;
    btnReject.update = function() {
       this.x = canvasW / 2 + 60;
      this.y = inviteScreenPos + this.yPos + 10;
    };



    screenPos += 80;
  }
}

function removeExpiredRequestButtons() {
  if (_gameMode == null || _gameMode.interfaceButtons == null) return;
  for (d = 0; d < _gameMode.interfaceButtons.length; d++) {
    var aBut = _gameMode.interfaceButtons[d];

    if (aBut.reqID !== undefined) {
      var activeRequest = true;
      var found = false;
      for (r = 0; r < player1v1Requests.length; r++) {
        var req = player1v1Requests[r];
        if (req.id == aBut.reqID) {
          found = true;
          break;
        }
      }

      if (!found) activeRequest = false;

      if (!activeRequest || isInArena) {
        var tmp = _gameMode.interfaceButtons.indexOf(aBut);
        if (-1 != tmp) {
          _gameMode.interfaceButtons.splice(tmp, 1);
        }
      }
    }
  }
}
function create1v1RequestButton(req, label) {
  var hasFound = false;
  for (i = 0; i < _gameMode.interfaceButtons.length; i++) {
    btn = _gameMode.interfaceButtons[i];
    if (btn.reqID == req.id && btn.label == label) {
      hasFound = true;
      return btn;
    }
  }

  if (hasFound) return;

  var btn = new InterfaceButton(0, 0, 80, 40, label, 20);
  btn.reqID = req.id;
  btn.reqAction = btn.onClick = function() {
    this.isHighLighted = false;
    var actionType = 0;
    switch (this.label) {
      case "Accept":
        actionType = 1;
        break;
      case "Reject":
        actionType = 0;
        break;
      
    }
    var mes = new MsgWriter(3);
    mes.writeUInt8(53); // Msg_1v1Mode_RequestAction;
    mes.writeUInt8(actionType); //1=accept, 0=reject,2=ignore
    mes.writeUInt8(this.reqID);
    wsSendMsg(mes);
    
  };
  btn.onInterfaceReset = function() {
    this.isVisible = true;
  };

  btn.isVisible = true;
  _gameMode.interfaceButtons.push(btn);

  return btn;
}


var topperInfoX = 10 * pixelRat;
var topperInfoY = 15 * pixelRat;
var top1v1_isHistoric = false;
var top1v1_wins = "";
var top1v1_name = "";
var topperInfoTxt = null;
var top1v1_since = "";
function buildTopperInfo() {
  var name = "" + top1v1_name;
  if (name.lenght == 0) name = "mope2.io/1v1";

  var gameType = "";
  var achievType = "";

  gameType = "1v1";
  achievType = "WINS";
  var txt =
    (top1v1_isHistoric ? " ALL TIME " : "") +
    gameType +
    " Pro: " +
    name +
    " (" +
    achievType +
    ": " +
    top1v1_wins +
    ") "
  if (null == topperInfoTxt) {
    topperInfoTxt = new CachedText(20, "#FFFFFF"); //"#043400");
    topperInfoTxt.strokeW = 2;
    topperInfoTxt.multiLine = true;
    topperInfoTxt.renderScale = 2.0; //render larger to undo 'zoom of 3x'
    topperInfoTxt.setText(txt);
    topperInfoTxt.setPos = function(nw, nx) {
      this.x += nw / 2;
    };
  } else {
    topperInfoTxt.setFontSize(20);
    topperInfoTxt.setText(txt);
    topperInfoTxt.setPos = function(nw, nx) {
      this.x += nw / 2;
    };
  }
}

function display1v1TopperInfo() {
  if (topperInfoTxt != null) {
    topperInfoTxt.x = topperInfoX;
    topperInfoTxt.y = topperInfoY;
    topperInfoTxt.draw();
  }
}


///////
// file: js_src/client/masterServerClient.js
///////

//client interface for talking with the master server
var gotMasterServerStats = false;

let KMasterServMsg_serverPlayerCounts = 100;
let KMasterServMsg_bestBrServer = 101;

//update client player coutns from server
function masterServer_getServerStats() {
  masterServer_ConnectWithRequestType(KMasterServMsg_serverPlayerCounts);
}

//get best BR server, then calls callback func
var callback_masterServer_getBestBRServer = null; //arguments (bestServerIP string, noServerFound boolean)

function masterServer_getBestBRServer(callBackFunc) {
  callback_masterServer_getBestBRServer = callBackFunc; //returns result on success
  console.log("Getting best br server...");
  masterServer_ConnectWithRequestType(KMasterServMsg_bestBrServer);
}

//connects to the master server, will recieve a reply based on the requested data
function masterServer_ConnectWithRequestType(msgType) {
  var wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  var wsPort = wsProtocol == "ws://" ? 80 : 80;
  var masterServerIP = "minimaptest-qwplh.run-eu-central1.goorm.io"; //"0.0.0.0";//"master1.mope.io";
  var conUrl = wsProtocol + masterServerIP + ":" + wsPort;
  console.log("Master server: connecting " + conUrl + "...");
  //console.log("Protocol is " + wsProtocol + ", window protocol is " + window.location.protocol);
  var masterWs = new WebSocket(conUrl);
  masterWs.binaryType = "arraybuffer";
  masterWs.onopen = function() {
    console.log("MasterServer: Connected!");

    //authenticate as client, with correct data request
    var authmsg = new MsgWriter(1);
    var masterServerRequestType = 1; //1- get stats, 2- get best BR server
    authmsg.writeUInt8(msgType);
    //send msg
    masterWs.send(authmsg.dataView.buffer);
  };
  masterWs.onmessage = function(msg) {
    //handle message
    var msg = new MsgReader(new DataView(msg.data));
    var msgType = msg.readUInt8();
    //console.log("MasterServer: Msg of type "+msgType);

    switch (msgType) {
      case KMasterServMsg_serverPlayerCounts:
        masterServer_gotReponse_getServerStats(msg);
        break;
      case KMasterServMsg_bestBrServer:
        masterServer_gotRespose_getBestBRServer(msg);
        break;

      default:
        console.log("Unknown master server msg type " + msgType);
        break;
    }
  };
  masterWs.onerror = function(err) {
    console.log("MasterServer: error connecting!");
  };
  masterWs.onclose = function(evt) {
    //console.log("Disconnected from master server!");
  };
}
function masterServer_gotReponse_getServerStats(msg) {
  gotMasterServerStats = true;
  //read players online # for each 'connected' server
  var nPlayers = msg.readUInt32();
  console.log(
    "MasterServer got server stats! " + nPlayers + " total players online!"
  );
  playersOnlTXT.setText(numberWithCommas(nPlayers) + " players");

  var numServers = msg.readUInt16();
  console.log("MasterServer: " + numServers + " servers online!");
  for (var i = 0; i < numServers; i++) {
    var aServIp = num2dotIP(msg.readUInt32());
    var aServNumPl = msg.readUInt16();
    var gameMode = msg.readUInt8();
    var BR_waitingForPlayers = msg.readUInt8();
    console.log(aServIp,aServNumPl,gameMode);
    //console.log("info for server "+aServIp);

    //find matching gameServer info-obj in list
    var matchF = false;
    for (var j = 0; j < gameServersList.length; j++) {
      /*var clientServerIP =
        gameServersList[j].name == "LOCAL"
          ? "110.93.246.138"
          : gameServersList[j].ip;*/

      if (gameServersList[j].ip == aServIp) {
        var theServ = gameServersList[j];
        if (aServNumPl == 60000){
          // 60000 players recieved = offline server
          theServ.playersCount = -1;

        }else
        theServ.playersCount = aServNumPl;

        theServ.gameMode = gameMode;
        //console.log("--matched server " + theServ.ip + " gameMode " + gameMode + " "+theServ.playersCount+ "players ");
        theServ.BR_waitingForPlayers = BR_waitingForPlayers;

        matchF = true;
        //console.log("Match found for server");
        //console.log(aServNumPl + " in server " + gameServersList[j].name);
        break;
      }
    }
    //if (!matchF)
    // console.log(" No matching server def for ip " + aServIp);
  }

  updateRegionsList();
  updateServersList(); //update options shown
  updateGmModeButtons();
}

function masterServer_gotRespose_getBestBRServer(msg) {
  var bestIPEnc = msg.readUInt32();
  var noValidServer = bestIPEnc == 0;
  var bestBRServerIP = num2dotIP(bestIPEnc);

  //IP can be 0!
  console.log("Got new BEST BR server! " + bestBRServerIP);

  //call callback func
  if (callback_masterServer_getBestBRServer != null)
    callback_masterServer_getBestBRServer(bestBRServerIP, noValidServer);
}

masterServer_getServerStats();

//masterServer_getBestBRServer();


///////
// file: js_src/client/gameServer.js
///////

//servers in list
var gameServersList = [];
var gameRegions = [];
var gameServersByRegion = {};

var gameRegionsNoPingTest = [ "Team Mode" ,"Wild Mope"]; //these regions DONT get included in auto join (eg, game modes)

function addRegionDef(regName) {
  gameRegions.push(regName);
  gameServersByRegion[regName] = []; //set empty array for each region key
}
//for (var i = 0; i < gameRegions.length; i++)
//addRegionDef(gameRegions[i]);

GameServer.prototype = {
  name: "Server",

  ip: "0.0.0.0",
  serverConnURL: "0.0.0.0", //url to connect to (needed for wss to work!)
  region: "",
  playersCount: -2,
  gameMode: 0,
  BR_waitingForPlayers: false,
  ping: 10000,
  domOptionIndex: 0, //what index is this server in the option dom

  getServerListString: function() {
    var brWaitingStr = "";
    if (this.gameMode == 2)
      brWaitingStr = this.BR_waitingForPlayers
        ? " -STARTING NEW GAME"
        : " -GAME IN PROGRESS";
    var plStr = this.playersCount < 0 ? "..." : this.playersCount;

    var theStr =
      this.name +
      " [" +
      plStr +
      " players " +
      (this.playersCount >= numFULLServerPlayers ? "-FULL!" : "") +
      "]" +
      brWaitingStr;
    return theStr;
  }
};
function GameServer(nm, ip, theReg,port) {
  this.name = nm;
  this.ip = ip;
  this.port = port
  this.serverConnURL = ip;
  this.region = theReg;
}




function addServerDef(nm, ip, theReg,port) {
  var newDef = new GameServer(nm, ip, theReg,port);
  //auto-change IP to URL (for ssl wildcard certificate to work)
  //if (!KTestingModeON && !isNaN(parseInt((newDef.ip).substring(0, 1), 10)))
  //    newDef.serverConnURL = "gameserv-" + ((newDef.ip + "").replace(/\./g, '-')) + ".mope.io";

  gameServersList.push(newDef);
  if (!(theReg in gameServersByRegion)) addRegionDef(theReg);

  gameServersByRegion[theReg].push(newDef); //add
  // else
  //   console.log("Region doesn't exist: " + theReg);
  return newDef;
}

/*function addServerWithPortDef(nm, ip, port, theReg) {
 var newDef = {
   name: nm,
   ip: ip,
   serverConnURL: ip, //url to connect to (needed for wss to work!)
   serverPort: port,
   region: theReg,
   playersCount: -1,
   ping: 10000,
   domOptionIndex: 0 //what index is this server in the option dom
 };
 //auto-change IP to URL (for ssl wildcard certificate to work)
 //if (!KTestingModeON && !isNaN(parseInt((newDef.ip).substring(0, 1), 10)))
 //    newDef.serverConnURL = "gameserv-" + ((newDef.ip + "").replace(/\./g, '-')) + ".mope.io";

 log(
   "region: " +
   theReg +
   " => " +
   newDef.serverConnURL +
   ":" +
   newDef.serverPort
 );t
 gameServersList.push(newDef);
 gameServersByRegion[theReg].push(newDef); //add
 return newDef;
}*/

if (KTestingModeON) {

    

    reg = "Local Test";
  
  if(ACTIVATEOURGAMEMODE){addServerDef("FFA", "ahmetcan-channel-1.paiza-user-free.cloud/", reg,"80")}else{
addServerDef("Local Test 1", "127.0.0.1", reg,"80"); 
//addServerDef("Local Test 2", "e7a3-190-215-158-88.ap.ngrok.io", reg,"80"); 

//reg = "FFA";
 //  addServerDef("FFA", "146.148.81.224", reg);
     reg = "Team Mode";
    addServerDef("LOCALHOST", "788f-190-215-158-88.eu.ngrok.io", reg,"80");
  //  addServerDef("Team Mode 2", "149.28.48.20", reg);
  //  reg = "Battle Royale";
  //  addServerDef("Battle Royale 1", "144.202.12.79", reg);
  //  addServerDef("Battle Royale 2", "144.202.56.145", reg);
  //  addServerDef("Battle Royale 3", "144.202.117.100", reg);

  //addServerDef("LOCAL", "0.0.0.0", reg); //linode_mopeio

  //addServerDef("TESTSERVER", "testserver.mope.io", reg); //"0.0.0.0"
  //addServerDef("LOCAL TEST", "45.76.2.164", reg);

  // reg = "Team Mode";
  // //  //addServerDef("LCOAL", "127.0.0.1", reg); // "0.0.0.0", reg); //"0.0.0.0"
  // addServerDef("TEAM MODE 1", "8.12.17.70", reg);
  // addServerDef("TEAM MODE 2", "209.246.143.231", reg);
  // addServerDef("TEAM MODE 3", "149.28.229.26", reg);
  // addServerDef("TEAM MODE 4", "108.61.158.209", reg);
  // addServerDef("TEAM MODE 5", "149.28.37.161", reg);

  // reg = "Battle Royale Mode";
  // //  //addServerDef("LCOAL", "127.0.0.1", reg); // "0.0.0.0", reg); //"0.0.0.0"
  // addServerDef("Battle Royale 1", "104.238.159.157", reg);
  // addServerDef("Battle Royale 2", "140.82.37.229", reg);
  // addServerDef("Battle Royale 3", "95.179.169.179", reg);
  // addServerDef("Battle Royale 4", "104.207.131.51", reg);
  // addServerDef("Battle Royale 5", "80.240.28.111", reg);

  //  addServerDef("Battle Royal 2", "173.199.118.126", reg);
  //  addServerDef("Battle Royal 3", "8.9.6.115", reg);
  //addServerWithPortDef("Battle Royal 22", "127.0.0.1", 7022, reg); // "0.0.0.0", reg); //"0.0.0.0"
  } 
} else {
  if (KTestingBetaMode) {



    var reg = "Wild Mope";
    addServerDef("Wild Mope 1", "144.202.12.79", reg); 
    addServerDef("Wild Mope 2", "144.202.56.145", reg);

    var reg = "Team Mode";
    addServerDef("Team Mode 1", "144.202.60.26", reg);
    addServerDef("Team Mode 2", "149.28.48.20", reg);

    var reg = "Normal";
    addServerDef("FFA", "45.76.11.35", reg);

  } else {
    // USA @@@@@@@@@@@@
    var reg = "USA-East";

    addServerDef("USA 1", "149.28.118.240", reg); //linode_mopeio
    addServerDef("USA 2", "45.76.31.141", reg);
    addServerDef("USA 3", "207.148.10.110", reg);
    addServerDef("USA 4", "149.28.116.164", reg);
    addServerDef("USA 5", "207.148.15.67", reg);
    addServerDef("USA 6", "149.28.112.152", reg);
    addServerDef("USA 7", "149.28.116.61", reg);
    addServerDef("USA 8", "149.28.120.151", reg);
    addServerDef("USA 9", "149.28.123.198", reg);
    addServerDef("USA 10", "45.76.17.180", reg);

    reg = "USA-West";
    addServerDef("USA W 1", "45.63.87.103", reg);
    addServerDef("USA W 2", "45.32.137.149", reg);
    addServerDef("USA W 3", "45.76.67.64", reg);
    addServerDef("USA W 4", "45.63.51.60", reg);
    addServerDef("USA W 5", "45.32.228.141", reg);
    addServerDef("USA W 6", "104.207.158.226", reg);

    //BRAZIL @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    reg = "Brazil/ USA-South";
    addServerDef("USA S 1", "108.61.224.165", reg);
    addServerDef("USA S 2", "107.191.55.233", reg);
    addServerDef("USA S 3", "45.32.198.173", reg);
    addServerDef("USA S 4", "104.238.147.152", reg);


    //EUROPE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    reg = "Europe"; //first server must be LONDON (+ 4core!)

    addServerDef("Europe 1", "45.77.88.81", reg);
    addServerDef("Europe 2", "104.238.170.8", reg);
    addServerDef("Europe 3", "45.76.129.33", reg);
    addServerDef("Europe 4", "45.76.134.74", reg);
    addServerDef("Europe 5", "45.76.135.33", reg);
    addServerDef("Europe 6", "45.76.129.125", reg);

    reg = "Russia";
    addServerDef("Russia 1", "45.32.152.68", reg);
    addServerDef("Russia 2", "45.32.156.214", reg);
    addServerDef("Russia 3", "45.32.154.83", reg);
    addServerDef("Russia 4", "104.238.159.143", reg);
    addServerDef("Russia 5", "45.32.144.28", reg);
    addServerDef("Russia 6", "185.92.221.137", reg);

    //  ASIA   @@@@@@@@@@@@@@
    reg = "Asia/Australia";
    addServerDef("Asia 1", "45.63.28.66", reg);
    addServerDef("Asia 2", "45.76.112.176", reg);
    addServerDef("Asia 3", "45.32.101.8", reg);

    reg = "Wild Mope";
    //  //addServerDef("LCOAL", "127.0.0.1", reg); // "0.0.0.0", reg); //"0.0.0.0"
    addServerDef("Wild Mope 1", "104.238.159.157", reg);
    addServerDef("Wild Mope 2", "140.82.37.229", reg);
    addServerDef("Wild Mope 3", "95.179.169.179", reg);
    addServerDef("Wild Mope 4", "104.207.131.51", reg);
    addServerDef("Wild Mope 5", "80.240.28.111", reg);


    reg = "Team Mode";
    //  //addServerDef("LCOAL", "127.0.0.1", reg); // "0.0.0.0", reg); //"0.0.0.0"
    addServerDef("TEAM MODE 1", "8.12.17.70", reg);
    addServerDef("TEAM MODE 2", "209.246.143.231", reg);
    addServerDef("TEAM MODE 3", "108.61.205.88", reg);



  }
}

var numNotIdealServer = 2; //x servers from BOTTOM

//check for server name in link

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SERVER PING AUTO-SELECT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//ping one server from each region
var RegionPingTester = function(serverObj) {
  this.serverObj = serverObj;

  var wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  var wsPort = 7020;
  var conUrl = wsProtocol + this.serverObj.serverConnURL + ":" + wsPort;
  // if (KTestingBetaMode) conUrl = wsProtocol + this.serverObj.serverConnURL + ":" + this.serverObj.serverPort;

  this.testWs = new WebSocket(conUrl); //connect, but measure time to connect?
  this.startT = +new Date();
  this.testWs.binaryType = "arraybuffer";
  //console.log("pingtest: Connecting to " + this.serverObj.name + "...");
  var that = this;
  this.pingsRec = 0;
  this.pingsDelayMsTot = 0;

  this.testWs.onopen = function() {
    //console.log("connected to ping server "+conUrl);
    that.sendPing();
  };
  this.sendPing = function() {
    //send ping
    var authmsg = new MsgWriter(1);
    authmsg.writeUInt8(255);
    that.testWs.send(authmsg.dataView.buffer);
    this.startT = +new Date(); //start timing message
  };
  this.testWs.onmessage = function(msg) {
    //handle message
    var msg = new MsgReader(new DataView(msg.data));
    //console.log("got msg");
    if (msg.readUInt8() == 255) {
      var connectPingMs = +new Date() - that.startT;
      that.pingsRec += 1;
      that.pingsDelayMsTot += connectPingMs;
      //console.log("pingtest: Got PING from " + that.serverObj.name + " after " + connectPingMs + "ms ");

      if (that.pingsRec >= 3) {
        //got final ping for this server!
        that.serverObj.ping = that.pingsDelayMsTot / that.pingsRec;

        console.log(
          "pingtest: Final PING " +
            that.serverObj.ping +
            " from " +
            that.serverObj.name
        );
        that.testWs.close();
        aRegPingTestFinished(that);
      } else {
        that.sendPing(); //send next ping
      }
    }
  };
  this.testWs.onerror = function(err) {
    console.log("TestWS: error connecting! " + err);
  };
  this.testWs.onclose = function(evt) {
    console.log("TestWS: disconnected");
    //console.log("Disconnected from master server!");
  };
};

//pick random server by default
var curRegion = KTestingModeON
  ? gameRegions[0]
  : gameRegions[getRandomInt(0, Math.max(0, gameRegions.length - 1 - 1))]; //pick a random region (for those who fail ping test) (except asia, LAST ONE)
var curServerIndex = 0; //
var curServer = gameServersByRegion[curRegion][curServerIndex];
var curRegion = curServer.region;

//find server with lowest ping, connect to a server there
var lowestPingRegServer = curServer; //this server will be used if none work (make it random)
//var bestRegion = lowestPingRegServer.region;
var pingTestCons = [];

var pingTestOnGoing = false;
var pingTestDoneOnce = false; //only test ping once
var slowTimeout;

function regionNotPingTested(theReg) {
  for (var h = 0; h <= gameRegionsNoPingTest.length; h++) {
    if (gameRegionsNoPingTest[h] == theReg) return true;
  }
  return false;
}

function findAndConnectToNearestServer() {
  //if already tested ping, just use the result!
  if (pingTestDoneOnce) {
    quickestConnectRegionFound();
    return;
  }

  if (pingTestOnGoing) return;

  pingTestOnGoing = true;
  for (var aRegion in gameServersByRegion) {
    if (
      gameServersByRegion.hasOwnProperty(aRegion) &&
      gameServersByRegion[aRegion].length > 0 &&
      !regionNotPingTested(aRegion)
    ) {
      var mainServer = gameServersByRegion[aRegion][0]; //pick first one as main
      //console.log("Pinging Region "+aRegion+" with server "+mainServer.name+")........");
      pingTestCons.push(new RegionPingTester(mainServer));
    }
  }

  slowTimeout = setTimeout(function() {
    //end ping test early (slower ones are likely too slow anyways)
    //console.log("pingtest: too long passed, ending early");
    //close all remaining test connections
    for (var i = 0; i < pingTestCons.length; i++) {
      pingTestCons[i].testWs.close();
    }
    quickestConnectRegionFound();
  }, 1200);
}

//a region finished getting ping
function aRegPingTestFinished(aTest) {
  if (aTest.serverObj.ping < lowestPingRegServer.ping) {
    lowestPingRegServer = aTest.serverObj;
  }
  //remove from conn list, check if all are done
  var tmp = pingTestCons.indexOf(aTest);
  if (-1 != tmp) {
    pingTestCons.splice(tmp, 1);
  }
  if (pingTestCons.length == 0) {
    //test done!
    //console.log("pingtest: all finished");
    if (slowTimeout) clearTimeout(slowTimeout);
    quickestConnectRegionFound();
  }
}

function quickestConnectRegionFound() {
  if (pingTestOnGoing) {
    pingTestDoneOnce = true;
  }
  pingTestOnGoing = false;

  console.log(
    "@@@@  Fastest region is " +
      lowestPingRegServer.region +
      " with ping " +
      lowestPingRegServer.ping +
      "ms "
  );
  curRegion = lowestPingRegServer.region; //set region to fastest one
  //update region/servers list

  //connect to server!
  joinBestServerInRegion();
}

//picks best gameServer for the current region
var numIdealServerPlayers = 400.0; //dont let servers overfill to second room
var numFULLServerPlayers = 500.0; //dont let servers overfill to second room

function joinBestServerInRegion() {
  console.log("Joining best server...");
  console.log(
    "region " + curRegion + " servsInReg " + gameServersByRegion[curRegion]
  );
  var serversInReg = gameServersByRegion[curRegion].slice(); //copies array
  //sort by number of players
  function compare(a, b) {
    if (a.playersCount < b.playersCount) return 1;
    if (a.playersCount > b.playersCount) return -1;
    return 0;
  }
  serversInReg.sort(compare);

  //pick most-popular server that's NOT overfilled in your region
  var found = false;
  var allServersInRegionFull = true;

  for (var i = 0; i < serversInReg.length; i++) {
    var aServ = serversInReg[i];
    //console.log("-checking server "+aServ.name+" players "+aServ.playersCount);
    if (aServ.playersCount < numFULLServerPlayers && aServ.playersCount >= 0)
      //also check if all servers are FULLY full
      allServersInRegionFull = false;

    if (
      aServ.playersCount < numIdealServerPlayers &&
      aServ.playersCount >= 0
    ) {
      //fill servers to X players
      curServer = aServ;
      curServerIndex = gameServersByRegion[curRegion].indexOf(curServer); //serversInReg is not the same array!
      found = true;
      break;
    }
  }

  if (!found) {
    //if all servers in region over ideal #, spread players across all servers evenly
    if (!allServersInRegionFull || !gotMasterServerStats) {
      //random server in region
      curServer = serversInReg[getRandomInt(0, serversInReg.length - 1)];
      curServerIndex = serversInReg.indexOf(curServer);
    } else {
      //all regions are full/no player count available- pick ANY non-full server across ALL regions
      if (!gotMasterServerStats)
        console.log(
          "Error loading server player counts from master server! Picking random server..."
        );
      else
        console.log(
          "All servers in region " +
            curRegion +
            " are full/offline! Picking random server..."
        );
      var allServersInRegionFull = true;
      for (var i = 0; i < gameServersList.length; i++) {
        if (gameServersList[i].playersCount < numFULLServerPlayers) {
          curServer = gameServersList[i];
          curServerIndex = gameServersByRegion[curServer.region].indexOf(
            curServer
          );
          curRegion = curServer.region;
          break;
        }
      }
    }
  }

  console.log("Connecting to best server...");
  /*if (wsIsOpen()) {
     ws.close();
   }*/
  gameServerConnect(curServer);
}

var retryTimeout;
var connectFailsCount = 0;
var lastConnectServer = null;

function findGameServerObjForIP(serverIP) {
  for (var i = 0; i < gameServersList.length; i++) {
    var aServer = gameServersList[i];
    //console.log("a server " + aServer.ip);
    if (aServer.ip == serverIP) return aServer;
  }
  return null;
}

//connectes to a server with this IP (creates it in the list if it doesnt Exist)
function gameServerConnectForIP(serverIP, autoClickPlay = false) {
  console.log("connecting to server of IP: " + serverIP);
  //find if it exists
  var serverObj = findGameServerObjForIP(serverIP);
  //console.log("server for ip " + serverIP + " is " + findGameServerObjForIP(serverIP).name);

  /*//create server DEF if it doesnt exist?
  if(serverObj==null){

  }*/
  if (serverObj == null) {
    console.log("No client server DEF exists for server IP " + serverIP);
    addServerDef("Unknown server", serverIP, "Unknown servers");
  }

  gameServerConnect(serverObj, autoClickPlay);
}

//connect to current gameserver (newGameServer is def from gameServersList)
var autoClickPlayOnJoin = false;
function gameServerConnect(newGameServer, autoClickPlay = false) {
  autoClickPlayOnJoin = autoClickPlay; //server
  //just in case

  curServer = newGameServer;
  curRegion = newGameServer.region;
  curServerIndex = gameServersByRegion[newGameServer.region].indexOf(
    newGameServer
  );

  updateGmModeButtons();
  updateRegionsList();
  updateServersList();
  udpForServIndex();

  if (wsIsOpen()) {
    //close current ws
    theWs = ws;
    ws = null; //prevent reconnect
    theWs.close();
  }

  //after two failed connections, try connecting to another server!
  //console.log("con fails "+connectFailsCount);
  if (newGameServer == lastConnectServer) {
    if (connectFailsCount > 1) {
      console.log("too many fails, trying next server");
      //choose NEXT server
      curServerIndex += 1;
      if (curServerIndex > gameServersByRegion[curRegion].length - 1)
        curServerIndex = 0;
      curServer = gameServersList[curServerIndex];
      curRegion = curServer.region;
      udpForServIndex(); //update gui
    }
  } else {
    //new server, reset fails count
    //console.log("fails reset because new server");
    connectFailsCount = 0;
    lastConnectServer = newGameServer;
  }

  dcedFromAfk = false; //reset on connect

  document.getElementById("connecting").style.visibility = "visible";
 

  var wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  var wsPort = wsProtocol == "wss://" ? 80: 80;

  var conUrl = wsProtocol + curServer.serverConnURL + ":" + curServer.port;

  /*
    if (KTestingBetaMode) {
        conUrl = wsProtocol + curServer.serverConnURL + ":" + curServer.serverPort;
    }
	*/
  console.log("Connecting to " + curServer.name + " (" + conUrl + ")...");
  ws = new WebSocket(conUrl); //Main server connection

  ws.binaryType = "arraybuffer";
  ws.onopen = function() {
    //console.log("socket connected!");
    connectFailsCount = 0;
    /*if (retryTimeout) {
            clearTimeout(retryTimeout);
            retryTimeout = null;
        }*/
 document.getElementById("onconnectDiv").style.visibility = "visible";
    document.getElementById("startMenu").style.visibility = "visible";
    document.getElementById("connecting").style.visibility = "hidden";

    
    
  };
  ws.onmessage = function(msg) {
    //console.log("socket message! " + msg.data);
    handleWsMessage(new DataView(msg.data));
  };
  ws.onclose = function(evt) {
    if (this == ws) {
      //active ws closed- retry soon!
      connectFailsCount += 1;
      serverConnected = false;
      serverCon_aliveInAGame = false;
      serverCon_spectatingInAGame = false;
      //console.log("Current socket closed- retrying soon...");
      if (!dcedFromAfk) {
        retryTimeout = setTimeout(function() {
          //console.log("Timeout hit, trying!!!!");
          gameServerConnect(newGameServer);
        }, 2000);
        //show connecting label
              document.getElementById("startMenu").style.visibility = "hidden";
       document.getElementById("onconnectDiv").style.visibility = "hidden";
        document.getElementById("connecting").style.visibility = "visible";
      } else {
        //dced, show dom?
      }
    } else {
      //old ws closed, ignore
      //, ignore, ignore
      //console.onsole.log("OLD socket closed.");
    }
  };
  ws.onerror = function() {
    console.log("socket error!");
  };
}

//@@@@@@@@@@@@@@@@@@@@  CONNECT TO GAME SERVER @@@@@@@@@@@@@@@@@@@@@@@@@

//find URL server in list
findAndConnectToNearestServer();

//try to connect to master server, grab stats

//user selected new server
document.getElementById("serverSelect").onchange = onServerChanged;

function onServerChanged() {
  var e = document.getElementById("serverSelect");
  curServerIndex = e.selectedIndex - 1;
  console.log(gameServersByRegion);
  curServer = gameServersByRegion[curRegion][curServerIndex];
  udpForServIndex();

  console.log("Server changed to " + curServer.name + "...");
  if (wsIsOpen()) {
    ws.close();
  }

  //hide label
  var xpLab = document.getElementById("spawnXpLabel");
  xpLab.style.opacity = 0;

  partyLinkIP = null;
  partyLinkKey = null;

  gameServerConnect(curServer);
  //connect AFTER close
}

document.getElementById("regionSelect").onchange = onRegionChanged;

function onRegionChanged() {
  console.log("Region changed...");
  var e = document.getElementById("regionSelect");
  var curRegIndex = e.selectedIndex - 1;
  curRegion = gameRegions[curRegIndex];

  console.log(curRegion);
  //udpForServIndex();

  if (wsIsOpen()) {
    ws.close();
  }

  //hide label
  var xpLab = document.getElementById("spawnXpLabel");
  xpLab.style.opacity = 0;

  joinBestServerInRegion();
  //gameServerConnect(curServer);
  //connect AFTER close
}
//set index of selected server
function udpForServIndex() {
  //save last used server
  /*if (window.localStorage) {
       try {
           window.localStorage.setItem("lastServerIP", curServer.ip);
       } catch (err) {} //no localStorage
       //console.log("Last used server is NOW " + localStorage.getItem("lastServerIP"));
   }*/
  //update gui selected index
  var e = document.getElementById("serverSelect");
  e.selectedIndex = curServerIndex + 1;
}

//server list got  updated
function updateServersList() {
  //clear current options
  var selNode = document.getElementById("serverSelect");
  while (selNode.lastChild) {
    selNode.removeChild(selNode.lastChild);
  }
  //add title
  var newOp = document.createElement("option");
  newOp.text = "Choose a server:";
  newOp.disabled = true;
  selNode.add(newOp);
  //newOp<option selected disabled>Choose one</option>

  //add new ones
  var foundIndex = -1;
  var serversInReg = gameServersByRegion[curRegion];
  for (var i = 0; i < serversInReg.length; i++) {
    var aServ = serversInReg[i];
    var newOp = document.createElement("option");

    newOp.text = aServ.getServerListString();

    if (aServ.ip == curServer.ip) {
      //effectively the same server
      foundIndex = i;
    }
    selNode.add(newOp);
  }
  if (foundIndex == -1)
    //if current server no longer in list
    foundIndex = 0;
  selNode.selectedIndex = foundIndex + 1; //0;
}

function updateRegionsList() {
  //clear current options
  var selNode = document.getElementById("regionSelect");
  while (selNode.lastChild) {
    selNode.removeChild(selNode.lastChild);
  }
  //add title
  var newOp = document.createElement("option");
  newOp.text = "Choose a region:";
  newOp.disabled = true;
  selNode.add(newOp);

  //add new ones
  var foundIndex = -1;
  for (var i = 0; i < gameRegions.length; i++) {
    //find total players in region (add up servers in it)
    var aReg = gameRegions[i];
    var serversInReg = gameServersByRegion[aReg];
    var numPl = 0;
    for (var j = 0; j < serversInReg.length; j++) {
      numPl +=
        serversInReg[j].playersCount >= 0 ? serversInReg[j].playersCount : 0;
    }

    var newOp = document.createElement("option");
    newOp.text = aReg + " [" + numPl + " players ]";

    if (aReg == curRegion) {
      //set current region
      foundIndex = i;
    }
    selNode.add(newOp);
  }
  if (foundIndex == -1)
    //if cant find cur region
    foundIndex = 0;
  selNode.selectedIndex = foundIndex + 1; //0;
}

/*//network debugging
var bytesLastSec=0;
window.setInterval(function(){
 /// call your function here
 console.log("Current packet rate Kb/s "+bytesLastSec*8/1000.0);
 bytesLastSec=0;
}, 1000);
*/

//connected to a game server, joined as a spectator
function onConnectedAndJoinedGameServer() {
  //joining the game makes this a successful server connection!
  serverConnected = true;
  //first time server connected!
  if (!serverFirstConnected) {
    document.getElementById("onconnectDiv").style.visibility = "visible";
  }
  serverFirstConnected = true; //doesnt change after first connect
  setSiteMenuVisible(true);

  if (autoClickPlayOnJoin) playPressed(); //press play to join server

  updateGmModeButtons();
}

//connected to a game server (not joined a room yet)
function onConnectedToGameServer() {
  //update URL to show ?server= ...
  /*if (!isMobileApp) {
       var serverName = ((curServer.name).replace(/\W/g, '')).toUpperCase(); //remove non-alphanum
       var newURL_noParams = window.location.href.split('?')[0]; //URL without params
       //console.log("URL is "+location.protocol + '//' + location.host + location.pathname);
       window.history.replaceState({ foo: "foo" }, "mope.io (" + serverName + ")", newURL_noParams + "?server=" + serverName);
   }*/

  //show INTERFACE
  setSiteMenuVisible(true);

  joinGame(true); //spectator
}

function gmModeButtonClicked(whichButtonID) {
  //play sound (if not muted)
  var sound_click = getLazyLoadAudio("audio/click.mp3");
  if (sound_click) {
    try {
      sound_click.play();
    } catch (err) {}
  }

  if (whichButtonID == "gmButton_FFA") {
    //switch to FFA
    findAndConnectToNearestServer();
  } else if (whichButtonID == "gmButton_TEAMS") {
    //find server in teams to join
    curRegion = "Team Mode";
    joinBestServerInRegion();
  }  else if (whichButtonID == "gmButton_WILD") {
    //find server in teams to join
    curRegion = "Wild Mope";
    joinBestServerInRegion();
  }

  updateGmModeButtons();
}

function updateGmModeButtons() {
 /* var theDom = document.getElementById("gmButton_FFA");
  if (gameMode == 0) {
  //  theDom.style.opacity = 0.5;
  } else theDom.style.opacity = 1.0;

  var theDom = document.getElementById("gmButton_TEAMS");
  if (gameMode == 3) {
    theDom.style.opacity = 0.5;
  } else theDom.style.opacity = 1.0;

  var theDom = document.getElementById("gmButton_WILD");
  if (gameMode == 4) {
    theDom.style.opacity = 0.5;
  } else theDom.style.opacity = 1.0;*/

}




///////
// file: js_src/interface/PlusXpPopup.js
///////


function PlusXPPopup(xpAm){
    this.animStep=1;
    this.animStartT=timestamp;
    this.animDur=3000;
    this.timedOut=false;

    //allow nice turning animation
    this.xShift=getRandomDouble(-10,10);
    this.yShift=getRandomDouble(-10,10);
    this.anlgeShift = getRandomDouble(-10, 10);

    this.text = new CachedText(16.0, "white");
    this.text.setText((xpAm>=0?"+ ":"") + abbreviate_number(xpAm) + " XP");
    //set special params for higher xp amounts
    this.textFontSz = 30;
    var xpCol = "white";
    if (xpAm > 10000) {
      xpCol = "#c7b753"; // yellow 10K+
      this.textFontSz = 40;
      this.animDur += 1000;
    }
    if (xpAm > 100000) {
      xpCol = "#fdca5b"; //yellow 100K+
      this.textFontSz = 45;
      this.animDur += 2000;
    }
    if (xpAm > 1000000) {
      xpCol = "#c7b753"; //yellow 1M+
      this.textFontSz = 51;
      this.animDur += 2000;
    }

    if (xpAm < 0) {
      xpCol = "#c65f59"; //red -ve
      this.animDur += 2000;
    }
    this.text.setColor(xpCol);

    //console.log("popup + "+abbreviate_number(xpAm)+" XP");

//call draw manually
    this.draw=function(){
      if(options_noXpPopup)
      return;

      var anim0_1=clamp( (timestamp-this.animStartT)/(this.animDur) , 0,1);

      ctx.save();

      var posX=(canvasW / 2);
      var posY=(canvasH - 85 * interfS) + anim0_1 * (-150*interfS);

      ctx.translate(posX,posY);

      //animate the text


      ctx.rotate( toRadians( this.anlgeShift * anim0_1 ));
      //ctx.translate(this.xShift,this.yShift);
      ctx.globalAlpha=1.0-anim0_1;

      this.text.setFontSize(this.textFontSz * interfS);
      this.text.x= 0;
      this.text.y= 0;
      this.text.draw();
      //console.log("drawing pop!" +anim0_1);

      ctx.restore();

      if(timestamp>=this.animStartT + this.animDur)
        this.timedOut=true;
    }
}


///////
// file: js_src/interface/TextPopup.js
///////




function TextPopup(text, fontSize, color, dur) {
    this.animStep = 1;
    this.animStartT = timestamp;
    this.timedOut = false;
    //allow nice turning animation
    this.xShift = getRandomDouble(-10, 10);
    this.yShift = getRandomDouble(-10, 10);
    this.anlgeShift = getRandomDouble(-10, 10);
    this.text = new CachedText(fontSize, color);
    this.text.setText(text);
    //set special params for higher xp amounts
    this.textFontSz = fontSize;
    this.animDur = dur;
    this.text.setColor(color);

    //console.log("popup + "+abbreviate_number(xpAm)+" XP");

    //call draw manually
    this.draw = function () {
        if (options_noXpPopup)
            return;

        var anim0_1 = clamp((timestamp - this.animStartT) / (this.animDur), 0, 1);

        ctx.save();

        var posX = (canvasW / 2);
        var posY = (canvasH - 85 * interfS) + anim0_1 * (-150 * interfS);

        ctx.translate(posX, posY);

        //animate the text


        // ctx.rotate( toRadians( this.anlgeShift * anim0_1 ));
        //ctx.translate(this.xShift,this.yShift);
        ctx.globalAlpha = 1.0 - anim0_1;

        this.text.setFontSize(this.textFontSz * interfS);
        this.text.x = 0;
        this.text.y = 0;
        this.text.draw();
        //console.log("drawing pop!" +anim0_1);

        ctx.restore();

        if (timestamp >= this.animStartT + this.animDur)
            this.timedOut = true;
    }
}



///////
// file: js_src/gameobj/GameObj.js
///////

//basic 'class' declaration (declare anything that will be thisClassed in PROTOTYPE!)
GameObj.prototype = {
  id: 0,
  oType: o_berry,
  spawnTime: 0,
  rPer: 0,
  updateTime: 0,
  x: 0,
  y: 0,
  ox: 0,
  oy: 0,
  nx: 0,
  ny: 0,
  rad: 0,
  oRad: 0,
  nRad: 0,
  //some objs have angles
  angle: 0,
  oAngle: 0,
  angleDelta: 0,
  moveUpdF: 0.0,
  z: 0,

  name: "",
  dead: false,
  type: 0, //type of animal/ type of abilityCircle
  curBiome: 0, //display outline based on biome
  //rect stuff
  isRectangle: false,
  rectW: 0,
  rectH: 0,
  specType: 0,
  spawnFromObj: 0,
  toString: function() {
    return "[GObj t=" + this.oType + " id=" + this.id + "]";
  }
};

//declare extra vars
GameObj.prototype.flag_hurt = false; //all objs can have hp
GameObj.prototype.hpPer = GameObj.prototype.hpPer_n = GameObj.prototype.hpBarA = 0.0;
GameObj.prototype.infectionPer = GameObj.prototype.infectionPer_n = GameObj.prototype.infectionBarA = 0.0;
GameObj.prototype.hpBarTimeoutT = 0;
GameObj.prototype.alwaysPlainOutline = false; //for display objs\

//stretches sideways and back
GameObj.prototype.doesDrawEffectScale = false;
GameObj.prototype.drawEffectScale_Slow = false;

// if an object has to be manually drawn by the interface then set this to true
GameObj.prototype.customInterfaceDraw = false;

// obj spawn with radius animation
// some objects dont need this animation so set this to false in their subclasses
GameObj.prototype.animateRadOnSpawn = true;
GameObj.prototype.drawImage = function (_0x5c79c3, _0x16e8d0, _0x45e376, _0x2482d0, _0x4b23e3, _0x43c8a8) {
    if (_0x43c8a8 !== undefined) ctx.rotate(_0x43c8a8);
    ctx.drawImage(_0x5c79c3, _0x16e8d0, _0x45e376, _0x2482d0, _0x4b23e3);
}
//subclassable
GameObj.prototype.customDraw = function(batchDrawOutline) {
  // switch(this.oType ) {
  //     case 20:
  //     case 21:
  //     case 22:
  //     case 40:
  //     case 1:
  //     case 7:
  //     case 4:
  //     case 24:
  //     case 3:
  //     case 8:
  //     case 36:
  //     case 5:
  //     case 52:
  //     case  53:
  //     case  54:
  //     case  49:
  //     case  38:
  //     break;
  //     default:
  //     console.log("this.oType: " + this.oType);
  // }
  switch (this.oType) {
       case o_hill:
      {
        switch (this.curBiome) {
          case biome_desert:
            //drawn as batch: (either draw outline or top part)
            if (batchDrawOutline)
              //1) first draw outline circle (only)
              drawCircle(0, 0, this.rad, col_outline_desert);
            //2) draw top parts (that will combine)
            else drawCircle(0, 0, this.rad - 1.5, col_desert_hill);

            break;

          case biome_ocean:
            //drawn as batch: (either draw outline or top part)
            if (batchDrawOutline)
              //1) first draw outline circle (only)
              drawCircle(0, 0, this.rad, this.getOutlineColor());
            //2) draw top parts (that will combine)
            else drawCircle(0, 0, this.rad - 1.5, col_ocean_sand);

            break;
          case biome_arctic:
            //this.drawOutlinedCircle("", col_outline_land); //col_outline_land);
            if (batchDrawOutline)
              //1) first draw outline circle (only)
              drawCircle(0, 0, this.rad, "white");
            // this.getOutlineColor());
            else {
              //2) draw top parts (that will combine)
              drawCircle(0, 0, this.rad - 1.5, col_snowcolor); //"#1f893a");
              //
              /*var theImg = getLoadedImg("img/fir2.png");
                            if (theImg) {
                                var rad = this.rad*1.22;
                                //ctx.rotate(this.rPer * Math.PI * 2.0);
                                ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
                                //console.log("drawing banana");
                            }*/
            }

            break;

          case biome_land:
          default:
            if (batchDrawOutline)
              //1) first draw outline circle (only)
              drawCircle(0, 0, this.rad, this.getOutlineColor());
            else drawCircle("", col_outline_land); //col_outline_land);
            break;
        }
      }
      break;
      
      /* case o_lochnessbite:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.15 * oldA;
        //drawCircle(0, 0, this.rad, "#862A2A");

        ctx.globalAlpha = 1.0 * oldA;

        var theImg = getLoadedImg("skins/lochness/lochness-bite.png");

        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);

          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //clip to sliwly show the claw
          //var rad=this.rad * 0.85;
          ctx.rotate(Math.PI);
          var imX = 0,
            imY = this.rad * 0.5;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );
   
        }
         ctx.restore(); 
      }
      break;*/
       case o_firerange:
      {
            bushBgCol = "";

                    switch (this.curBiome) {
          case biome_ocean:
            bushBgCol = "#786810";
            break;
          case biome_arctic:
            bushBgCol = "#CED0D0";
            break;
          default:
          case biome_land:
            bushBgCol = "#45D157";
            break;
        }
            //this.drawOutlinedCircle("",bushBgCol)
                    this.drawfireCircle("#FF7000");
                    e = .15;
                    i = .5 * (.8 - e);
                    e = e + i + i * Math.sin(2 * Math.PI / 1 * (timestamp / 1000));
                    ctx.save();
                    ctx.globalAlpha *= e;
      
      
             //       drawCircle(0, 0, Math.max(0, this.rad), "#FF6100");
                    ctx.restore();
                    e = .5;
                    i = .5 * (1 - e);
                    e = e + i + i * Math.sin(2 * Math.PI / 1 * (timestamp / 1000));
                    if (i = getLoadedImg(1 == Math.trunc(timestamp / 300) % 2 ? "img/fire.png" : "img/fire2.png")) s = .3 * this.rad, n = 2 * this.rad * (2 + 2 * e) / 3, r = 2 * this.rad * e, ctx.save(), i && (ctx.globalAlpha = ctx.globalAlpha * this.onFireEffA * e, ctx.drawImage(i, 0 + -.5 * n, s + -.95 * r, n, r)), 
                    ctx.restore();
      }
      break;
    case ability_extraBoost:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.15 * oldA;
        drawCircle(0, 0, this.rad, "#755A2A");

        ctx.restore();
      }
      break;
    case o_berryBush:
      {
        //this.drawOutlinedCircle("", col_food2);

        //draw bush animation
        ctx.save();
        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        var bushColor =
          this.curBiome == biome_ocean ? col_plankton2 : col_food2;
        ctx.fillStyle = bushColor;
        var drawRad = this.rad * 0.8;

        this.drawOutlinedCircle("", bushColor); //"#00B343");
        ctx.globalAlpha *= 0.98;

        var dx = -drawRad * 0.5,
          dy = -drawRad * 0.5 + 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.65 + rShift) + 2;
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, bushColor); //outline

        var dx = drawRad * 0.5,
          dy = -drawRad * 0.5 - 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.73 - rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, bushColor); //outline
        var dx = drawRad * 0.6,
          dy = drawRad * 0.4,
          drad = Math.max(0, drawRad * 0.78 + rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, bushColor); //outline

        var dx = -drawRad * 0.5,
          dy = drawRad * 0.5 + 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.6 + this.rPer - rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, bushColor); //outline

        ctx.restore();

        //draw berries on bush
        /*var drawRad=this.rad*1.0;
                var dx=drawRad*-0.3, dy=drawRad*-0.2, drad=7;
                drawCircle(dx, dy, drad+2, col_outline_land); //outline
                drawCircle(dx, dy, drad, col_food1);
                var dx=drawRad*0.3, dy=drawRad*-0.1, drad=8;
                drawCircle(dx, dy, drad+2, col_outline_land); //outline
                drawCircle(dx, dy, drad, col_food1);
                var dx=drawRad*0.1, dy=drawRad*0.2, drad=7;
                drawCircle(dx, dy, drad+2, col_outline_land); //outline
                drawCircle(dx, dy, drad, col_food1);*/
      }
      break;
    case o_fruitTree:
      {
        this.drawOutlinedCircle("", "#1AAE31"); //less diff. spawner colors, so no extra col
        ctx.save();

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.fillStyle = col_gameBg;
        var rad = this.rad * 0.75;

        ctx.globalAlpha *= 0.8;
        ctx.beginPath();
        ctx.arc(
          -rad * 0.5,
          -rad * 0.5 + 10.0 * this.rPer,
          Math.max(0, rad * 0.65 + rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          rad * 0.5,
          -rad * 0.5 - 10.0 * this.rPer,
          Math.max(0, rad * 0.73 - rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        //ctx.globalAlpha = 0.95;
        ctx.arc(
          rad * 0.6,
          rad * 0.4,
          Math.max(0, rad * 0.78 + rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          -rad * 0.5,
          rad * 0.5,
          Math.max(0, rad * 0.6 + this.rPer - rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.restore();
      }
      break;
    case o_planktonBush:
      {
        //this.drawOutlinedCircle("", col_plankton2);

        //draw bush animation
        ctx.save();
        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //ctx.fillStyle = ;
        var drawRad = this.rad * 0.8;
        var drawCol = col_plankton2;

        this.drawOutlinedCircle("", drawCol); //"#00B343");
        ctx.globalAlpha *= 0.98;

        var dx = -drawRad * 0.5,
          dy = -drawRad * 0.5 + 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.65 + rShift) + 2;
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, drawCol); //outline

        var dx = drawRad * 0.5,
          dy = -drawRad * 0.5 - 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.73 - rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, drawCol); //outline
        var dx = drawRad * 0.6,
          dy = drawRad * 0.4,
          drad = Math.max(0, drawRad * 0.78 + rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, drawCol); //outline

        var dx = -drawRad * 0.5,
          dy = drawRad * 0.5 + 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.6 + this.rPer - rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, drawCol); //outline

        ctx.restore();

        //draw berries on bush
        /*var drawRad=this.rad*1.0;
                var dx=drawRad*-0.3, dy=drawRad*-0.2, drad=7;
                drawCircle(dx, dy, drad+2, col_outline_land); //outline
                drawCircle(dx, dy, drad, col_food1);
                var dx=drawRad*0.3, dy=drawRad*-0.1, drad=8;
                drawCircle(dx, dy, drad+2, col_outline_land); //outline
                drawCircle(dx, dy, drad, col_food1);
                var dx=drawRad*0.1, dy=drawRad*0.2, drad=7;
                drawCircle(dx, dy, drad+2, col_outline_land); //outline
                drawCircle(dx, dy, drad, col_food1);*/
      }
      break;
    case o_waterSpot:
      {
        ctx.save();

        var col = this.curBiome == biome_arctic ? "#7790d8" : col_wat2;
        this.drawOutlinedCircle("", col);

        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 7.0;
        var shiftAm = 4; //5.5
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        /*//sand 'outline'
                var strokeW = 4;
                ctx.fillStyle = col_ocean_sand;
                ctx.beginPath();
                ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
                ctx.fill();*/

        //ctx.fillStyle = "#73602A"; //98803A";

        if (this.curBiome == biome_arctic) ctx.fillStyle = "#7790d8";
        else ctx.fillStyle = col_wat2; //98803A";
        //ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0, this.rad - strokeW + rShift), 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.3,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.35 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          /*ctx.beginPath();
                    ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI);
                    ctx.fill();*/
        }

        ctx.restore();
      }
      break;
    case o_berry:
      {
        var berryCol = col_food1;
        if (this.curBiome == biome_arctic) {
          berryCol = "#ac443c";
        }
        this.drawOutlinedCircle("", berryCol); //draws with outline

        //arctic berry
        /*if(this.curBiome==biome_arctic){
                        //planktop eyes
                        ctx.rotate(this.rPer * Math.PI * 2.0);
                        drawCircle(this.rad * 0.25, this.rad * 0.4, (0.1 + 0.15 * this.rPer) * this.rad, "#723730");
                      }*/
      }
      break;
    case o_banana:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/banana" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_raspberry:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/rasp" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_pear:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/pear" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;

    case o_seaweed:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/seaweed" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;

          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_starfish:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/starfish" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_kelp:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/kelp" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_clam:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/clam" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    
    case o_conchShell:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/conch" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad * 1.0;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
          ctx.restore();
        }
      }
      break;

    case o_coconut:
      {
        //draw banana img
        var theImg = getLoadedImg(
          "img/coconut" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_flockspot:
    case o_flock: {
      //drawCircle(0,0, this.rad, "black");
      break;
    }
   
      break;
    case o_sleigh:
      {
        //draw banana img
      
        var theImg = getLoadedImg("img/santa/sleig.png");
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.angle);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
          //console.log("drawing banana");
        }
        
      }
      break;
    case o_ostrichEgg:
      {
        var theImg = getLoadedImg(
          "img/ostrichEgg" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }
      }
      break;
        case o_raspberrynew:
      {
        var theImg = getLoadedImg(
          "img/raspberry"+ this.specType + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }
      }
      break;
          case o_dragonfruit:
      {
        var theImg = getLoadedImg(
          "img/dragonfruit" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }
      }
      break;
   case o_turkishflag:
      {
        var theImg = getLoadedImg(
          "img/turkishflag" + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
        ctx.rotate(0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2.5 * rad);
          ctx.restore();
        }
      }
      break;
   

   
      

    case o_egg:
      {
        //draw banana img

        var golden = "";
        if (this.specType == 1) golden = "golden";
        var theImg = getLoadedImg(
          "img/" +
            golden +
            "egg" +
            (this.isEdibleOutlined() ? "_e" : "") +
            ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();

          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
          //console.log("drawing banana");
        }
      }
      break;
    case o_beeHive:
      {
        //draw banana img
        // console.log("bee hive");
        var theImg = getLoadedImg(
          "img/beehive" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * 0.5 * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
          //console.log("drawing banana");
        }
      }
      break;
    case o_honeyComb:
      {
        var theImg = getLoadedImg(
          "img/honeycomb" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * 0.5 * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
          //console.log("drawing banana");
        }
      }
      break;
    case o_quill:
      {
        //draw banana img
        var theImg = getLoadedImg("img/quill.png");
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.angle);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
      }
      break;
    case o_plankton:
      {
        this.drawOutlinedCircle("", col_plankton1); //draws with outline
        //planktop eyes
        ctx.rotate(this.rPer * Math.PI * 2.0);
        drawCircle(
          this.rad * 0.25,
          this.rad * 0.4,
          (0.3 + 0.15 * this.rPer) * this.rad,
          "#905113"
        );
      }
      break;
    case o_healingStone:
      {
        //set correct biome outline
        var biomeExt = "";
        switch (this.curBiome) {
          case biome_ocean:
            biomeExt = "_ocean";
            break;
          case biome_arctic:
            biomeExt = "_arctic";
            break;
          case biome_land:
          default:
            biomeExt = "";
            break;
        }
        var theImg = getLoadedImg("img/healingStone" + biomeExt + ".png");
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

          ctx.restore();
        }
      }
      break;

    case o_volcano:
      {
        /*var theImg = getLoadedImg("img/volcano_im.png");
                if (theImg) {
                    var rad = this.rad*(300.0/236.0);
                    ctx.save()
                    ctx.rotate(this.rPer * Math.PI * 2.0);
                    ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

                    ctx.restore();
                }*/

        //drawCircle(0, 0, Math.max(0, this.rad*1.0), "#09992f");

        drawCircle(0, 0, Math.max(0, this.rad * 1), "#815427");

        drawCircle(0, 0, Math.max(0, this.rad * 0.6), "#6e4b29");

        drawCircle(0, 0, Math.max(0, this.rad * 0.5), "#543d28");

        drawCircle(0, 0, Math.max(0, this.rad * 0.45), "#3f3124");

        drawCircle(0, 0, Math.max(0, this.rad * 0.33), "#241e19");

        drawCircle(0, 0, Math.max(0, this.rad * 0.25), "#120f0d");

        drawCircle(0, 0, Math.max(0, this.rad * 0.2), col_lava);
      }

      break;

    case o_lavaLake:
      {
        ctx.save();

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 4.0;
        var shiftAm = 2.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        if (batchDrawOutline) {
          //sand 'outline'
          var strokeW = 4;
          ctx.fillStyle = col_lava;
          ctx.beginPath();
          ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
          ctx.fill();
        } else {
          //ctx.fillStyle = "#73602A"; //98803A";
          ctx.fillStyle = col_lava; //98803A";
          //ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          if (!options_lowGraphics) {
            ctx.beginPath(); //top right
            ctx.arc(
              this.rad * 0.45,
              -this.rad * 0.45 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.5 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath(); //bottom right
            ctx.arc(
              this.rad * 0.5,
              this.rad * 0.5 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.4 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath(); //bottom left
            ctx.arc(
              -this.rad * 0.55 * 0.707,
              +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.5 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              -this.rad * 0.75,
              -this.rad * 0.35 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.3 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
              this.rad + 10 * this.rPer,
              50 * this.rPer,
              8,
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
              this.rad - 20 * this.rPer,
              50 * this.rPer,
              10,
              0,
              2 * Math.PI
            );
            ctx.fill();
          }

          ctx.save();
          ctx.globalAlpha = 1.0 - this.underwaterA; //bubbles appear as animal fades

          var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
          var period = 1.5;
          var shiftAm = 8.0;
          var moveA =
            shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

          if (this.flag_underWater) {
            ctx.globalAlpha *= 0.5;

            if (this.animalType == a_croc) ctx.globalAlpha = 0.3;
          }
          ctx.fillStyle = "yellow";
          var bubRad = this.rad * 0.15;
          ctx.beginPath(); //top left, right

          var bubbles = 1;
          for (i = 1; i <= bubbles; i++) {
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.rotate(this.rPer * Math.PI * 2.0 * i);
            ctx.beginPath(); //top left, right
            ctx.arc(
              this.rad * -0.35,
              this.rad * -0.33,
              Math.max(0, bubRad + moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              this.rad * 0.35,
              this.rad * -0.32,
              Math.max(0, bubRad - moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();

            ctx.beginPath(); //bottom 2
            ctx.arc(
              this.rad * 0.35,
              this.rad * 0.36,
              Math.max(0, bubRad + moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              this.rad * -0.35,
              this.rad * 0.35,
              Math.max(0, bubRad - moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.restore();
          }
          ctx.restore();
        }

        ctx.restore();
      }
      break;

    case o_bog:
      {
        ctx.save();

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 4.0;
        var shiftAm = 2.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        if (batchDrawOutline) {
          //sand 'outline'
          var strokeW = 4;
          ctx.fillStyle = "#5e5348";
          ctx.beginPath();
          ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
          ctx.fill();
        } else {
          //ctx.fillStyle = "#73602A"; //98803A";
          ctx.fillStyle = "#706962"; //98803A";
          //ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          if (!options_lowGraphics) {
            ctx.beginPath(); //top right
            ctx.arc(
              this.rad * 0.45,
              -this.rad * 0.45 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.5 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath(); //bottom right
            ctx.arc(
              this.rad * 0.5,
              this.rad * 0.5 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.4 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath(); //bottom left
            ctx.arc(
              -this.rad * 0.55 * 0.707,
              +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.5 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              -this.rad * 0.75,
              -this.rad * 0.35 + 15.0 * this.rPer,
              Math.max(0, this.rad * 0.3 + rShift),
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
              this.rad + 10 * this.rPer,
              50 * this.rPer,
              8,
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
              this.rad - 20 * this.rPer,
              50 * this.rPer,
              10,
              0,
              2 * Math.PI
            );
            ctx.fill();
          }

          ctx.save();
          ctx.globalAlpha = 1.0 - this.underwaterA; //bubbles appear as animal fades

          var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
          var period = 1.5;
          var shiftAm = 8.0;
          var moveA =
            shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

          if (this.flag_underWater) {
            ctx.globalAlpha *= 0.5;

            if (this.animalType == a_croc) ctx.globalAlpha = 0.3;
          }
          ctx.fillStyle = "yellow";
          var bubRad = this.rad * 0.15;
          ctx.beginPath(); //top left, right

          var bubbles = 1;
          for (i = 1; i <= bubbles; i++) {
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.rotate(this.rPer * Math.PI * 2.0 * i);
            ctx.beginPath(); //top left, right
            ctx.arc(
              this.rad * -0.35,
              this.rad * -0.33,
              Math.max(0, bubRad + moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              this.rad * 0.35,
              this.rad * -0.32,
              Math.max(0, bubRad - moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();

            ctx.beginPath(); //bottom 2
            ctx.arc(
              this.rad * 0.35,
              this.rad * 0.36,
              Math.max(0, bubRad + moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              this.rad * -0.35,
              this.rad * 0.35,
              Math.max(0, bubRad - moveA),
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.restore();
          }
          ctx.restore();
        }

        ctx.restore();
      }
      break;

    case o_cloudBerry:
      {
        var theImg = getLoadedImg(
          "img/cloudberry" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();

          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

          ctx.restore();
        }
      }
      break;

    case o_arcticNut:
      {
        var theImg = getLoadedImg(
          "img/arcticNut" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();

          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

          ctx.restore();
        }
      }
      break;


    case o_carrot:
      {
        var theImg = getLoadedImg(
          "img/carrot" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

          ctx.restore();
        }
      }
      break;
    case o_watermelon:
      {
        var theImg = getLoadedImg(
          "img/watermelon" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

          ctx.restore();
        }
      }
      break;
    case o_poisonBerry:
      {
        ctx.save();
      
        drawCircle(0, 0, Math.max(0, this.rad - this.rad / 5), col_edibleOutline);

        ctx.restore();

        var theImg = getLoadedImg("img/poisonBerry" + this.specType + ".png");// + (this.isEdibleOutlined() ? "_e" : "") + ".png");
                            if (theImg) {
                                var rad = this.rad;
                                ctx.save();
                                ctx.rotate(this.rPer * Math.PI * 2.0);
                                ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

                                ctx.restore();
                            }
      }

      break;
    case o_watermelonSlice:
      {
        var theImg = getLoadedImg(
          "img/watermelonSlice" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);

          ctx.restore();
        }
      }
      break;

    case o_meatSmall:
    case o_meatMedium:
    case o_meatLarge:
      {
        var meatType = 0;
        var theImg = getLoadedImg(
          "img/" + meatType + "meat" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }
      }
      break;

    case o_mushroom:
    case o_bigMushroom:
      {
        var strokeW = 2;
        var wid = this.oType == o_bigMushroom ? 15 : 9;

        //mushroom leg stroke outline
        ctx.fillStyle = this.getOutlineColor();
        ctx.beginPath();
        ctx.rect(
          -wid / 2 - strokeW,
          -strokeW,
          wid + strokeW * 2,
          this.rad * 0.8 + strokeW * 2
        );
        ctx.fill();

        //mushroom leg
        ctx.fillStyle = "#FFCA49";
        ctx.beginPath();
        ctx.rect(-wid / 2, 0 + strokeW / 2, wid, this.rad * 0.8 - strokeW / 2);
        ctx.fill();

        //head outline
        if (!options_lowGraphics) {
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI);
          ctx.fillStyle = this.getOutlineColor(); //col_outline_land;
          ctx.fill();
        }
        //head
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0, this.rad - strokeW), Math.PI, 2 * Math.PI);
        ctx.fillStyle = this.oType == o_bigMushroom ? "#B8413B" : "#CFAD59";
        ctx.fill();
      }
      break;
    case o_bigMushroomBush:
      {
        //ctx.strokeStyle = col_outline_land; //outline
        //ctx.lineWidth = 2;
        var strokeW = 2;
        //console.log("big mush!");

        ctx.save();

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.fillStyle = "#45D157";

        ctx.globalAlpha *= 0.93;
        ctx.beginPath();
        ctx.arc(
          -this.rad * 0.5,
          -this.rad * 0.5 + 10.0 * this.rPer,
          Math.max(0, this.rad * 0.55 + rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          this.rad * 0.5,
          -this.rad * 0.5 - 10.0 * this.rPer,
          Math.max(0, this.rad * 0.43 - rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        //ctx.globalAlpha = 0.95;
        ctx.arc(
          this.rad * 0.6,
          this.rad * 0.4,
          Math.max(0, this.rad * 0.48 + rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          -this.rad * 0.5,
          this.rad * 0.5,
          Math.max(0, this.rad * 0.4 + this.rPer - rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.restore();

        var wid = 20;
        //stroke outline
        ctx.fillStyle = this.getOutlineColor();
        ctx.beginPath();
        ctx.rect(
          -wid / 2 - strokeW,
          -strokeW,
          wid + strokeW * 2,
          this.rad * 0.8 + strokeW * 2
        );
        ctx.fill();
        //mushroom leg
        ctx.fillStyle = "#FFCA49";
        ctx.beginPath();
        ctx.rect(-wid / 2, 0 + strokeW / 2, wid, this.rad * 0.8 - strokeW / 2);
        ctx.fill();
        //ctx.stroke();

        //outline
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0, this.rad * 0.8), Math.PI, 2 * Math.PI);
        ctx.fillStyle = this.getOutlineColor();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          0,
          0,
          Math.max(0, this.rad * 0.8 - strokeW),
          Math.PI,
          2 * Math.PI
        );
        ctx.fillStyle = "#B8413B";
        ctx.fill();
        //ctx.stroke();
      }
      break;
    case o_lillypad:
      {
        //outline drawing

        var theImg = getLoadedImg(
          "img/lillypad" + (this.isEdibleOutlined() ? "_e" : "") + ".png"
        );

        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
          /*if(this.rPer<0.2){
                      var rad=this.rad*0.25;
                        var flowImg=getLoadedImg("img/lilly_fl.png");
                        if(flowImg){
                        ctx.drawImage(flowImg, -rad , -rad , 2 * rad, 2 * rad);
                      }
                    }*/
        }
      }
      break;
    case o_hidingHole:
      {
        this.drawOutlinedCircle("", "#9F8641");

        drawCircle(
          0 - this.rPer,
          0 - this.rPer,
          Math.max(0, this.rad - 7),
          "#7E6A35"
        );

        drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28");
      
      }
      break;
    case o_abilityGObj:
    case o_particles:
      {
        console.log("ERROR: " + this + " should be subclassed!");

        //drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28");
      }
      break;
      
    case o_hidingHoleOcean:
      {
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 1.2;
        var xShift = 2.5 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
        var yShift = 2.5 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        this.drawOutlinedCircle("", "#2CAAC4");

        if (!options_lowGraphics) {
          drawCircle(
            0 + xShift / 2 - this.rPer,
            0 + yShift / 2 - this.rPer,
            Math.max(0, this.rad - 6),
            "#2D93B0"
          );
        }
        drawCircle(
          0 + xShift / 4.5 + this.rPer,
          1 + yShift / 1.5,
          Math.max(0, this.rad - 14),
          "#29A0BA"
        );
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, this.rad - 18.5 + yShift / 5),
          "#2B8CAA"
        );
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, this.rad - 24.5 + yShift / 11),
          "#28829E"
        );

        
      }
      break;
     case o_bigHidingHole:
      {
        this.drawOutlinedCircle("", "#9F8641");
        //drawCircle(0, 0, this.rad, "#9F8641");

        if (!options_lowGraphics) {
          drawCircle(
            0 - this.rPer,
            0 - this.rPer,
            Math.max(0, this.rad - 7),
            "#7E6A35"
          );
        }

        drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 14), "#5C4E28");
        drawCircle(
          0 - this.rPer * 2 - 3,
          1,
          Math.max(0, this.rad - 18.5),
          "#40371D"
        );


      }
      break;
    case o_hidingBush:
      {
        ctx.save();

        //draw bush animation
        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        var bushBgCol = "#45D157";
        switch (this.curBiome) {
          case biome_ocean:
            bushBgCol = "#786810";
            break;
          case biome_arctic:
            bushBgCol = "#CED0D0";
            break;
          default:
          case biome_land:
            bushBgCol = "#45D157";
            break;
        }
        ctx.fillStyle = bushBgCol;

        ctx.globalAlpha *= 0.93;
        ctx.beginPath();
        ctx.arc(
          -this.rad * 0.5,
          -this.rad * 0.5 + 10.0 * this.rPer,
          Math.max(0, this.rad * 0.65 + rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          this.rad * 0.5,
          -this.rad * 0.5 - 10.0 * this.rPer,
          Math.max(0, this.rad * 0.73 - rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        //ctx.globalAlpha = 0.95;
        ctx.arc(
          this.rad * 0.6,
          this.rad * 0.4,
          Math.max(0, this.rad * 0.78 + rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          -this.rad * 0.5,
          this.rad * 0.5,
          Math.max(0, this.rad * 0.6 + this.rPer - rShift),
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.restore();
      }
      break;
    case o_biome_volcano:
      {
        ctx.save();
        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 6.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //console.log("Mud");
        //ctx.globalAlpha = 1;
        //green outline (without stroke- optimized)
        var strokeW = 4;
        ctx.fillStyle = "#604729";
        ctx.beginPath();
        ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.fillStyle = "#8A681B";
          //ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.45,
            -this.rad * 0.45 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(
            this.rad - 20 * this.rPer,
            50 * this.rPer,
            10,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
        }

        ctx.restore();
      }
      break;
    case o_biome_poison:
      {
        ctx.save();
        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 6.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //console.log("Mud");
        //ctx.globalAlpha = 1;
        //green outline (without stroke- optimized)
        var strokeW = 4;
        ctx.fillStyle = "#605649";
        ctx.beginPath();
        ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.fillStyle = "#5e4f36";
          //ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.45,
            -this.rad * 0.45 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(
            this.rad - 20 * this.rPer,
            50 * this.rPer,
            10,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
        }

        ctx.restore();
      }
      break;
    case o_mudSpot:
      {
        ctx.save();
        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 6.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //console.log("Mud");
        //ctx.globalAlpha = 1;
        //green outline (without stroke- optimized)
        var strokeW = 4;
        ctx.fillStyle = "#8B7833";
        ctx.beginPath();
        ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.fillStyle = "#98803A";
          //ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.45,
            -this.rad * 0.45 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(
            this.rad - 20 * this.rPer,
            50 * this.rPer,
            10,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
        }

        ctx.restore();
      }
      break;
    case o_arcticIce:
      {
        ctx.save();
        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 6.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //console.log("Mud");
        //ctx.globalAlpha = 1;
        //green outline (without stroke- optimized)
        var strokeW = 4;
        ctx.fillStyle = "#8CC3C7";
        ctx.beginPath();
        ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.fillStyle = "#9DDADE";
          //ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.45,
            -this.rad * 0.45 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(
            this.rad - 20 * this.rPer,
            50 * this.rPer,
            10,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
        }

        ctx.restore();
      }
      break;
    case o_lake:
      {
        ctx.save();
        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 4.0;
        var shiftAm = 5.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //sand 'outline'
        var strokeW = 4;
        ctx.fillStyle = col_ocean_sand;
        ctx.beginPath();
        ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
        ctx.fill();

        //ctx.fillStyle = "#73602A"; //98803A";

        if (this.curBiome == biome_arctic) ctx.fillStyle = "#8da0d6";
        else ctx.fillStyle = col_wat2; //98803A";
        //ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0, this.rad - strokeW + rShift), 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.45,
            -this.rad * 0.45 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();

          ctx.beginPath();
          ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(
            this.rad - 20 * this.rPer,
            50 * this.rPer,
            10,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }

        ctx.restore();
      }
      break;
    //water pouring out of the ocean
    case o_biome_ocean_extraWater:
      {
        ctx.save();
        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - ocean_anim_startT) / 1000.0;
        var period = 5.0;
        var shiftAm = 5.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        var strokeW = 4;

        //sand 'outline'
        if (batchDrawOutline) {
          /*var strokeW = 4;
                    ctx.fillStyle = col_ocean_sand;
                    ctx.beginPath();
                    ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
                    ctx.fill();*/
        } else {
          ctx.fillStyle = col_ocean; //98803A";
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();

          if (!options_lowGraphics) {
            ctx.beginPath(); //little puddles around 'lake'
            ctx.arc(
              this.rad + 10 * this.rPer,
              50 * this.rPer,
              8,
              0,
              2 * Math.PI
            );
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
              this.rad - 20 * this.rPer,
              50 * this.rPer,
              10,
              0,
              2 * Math.PI
            );
            ctx.fill();
          }
        }

        ctx.restore();
      }
      break;
    case o_biome_ocean:
      {
        //draw ocean (just a rectangle)
        var waveDelta = 0;
        var tSinceSpawn = (timestamp - ocean_anim_startT) / 1000.0;
        var period = 5.0;
        var shiftAm = -8.5;
        waveDelta =
          shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        var beachW = 10.0;

        var oceanNum = this.x > gameW / 2 ? 1 : 0; //left vs. right ocean
        if (oceanNum == 1) {
          //RIGHT side =1, 0=right

          //dark rect outside ocean bounds
          /*var wid = 500.0;
                    var oAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = oAlpha * 1.0;
                    ctx.fillStyle = "#16799F"; //"#3A4495";
                    ctx.fillRect((this.rectW / 2), (-this.rectH / 2), wid, this.rectH + 2 * wid); //right
                    //ctx.fillRect((-this.rectW/ 2) , (-this.rectH/ 2) - wid, this.rectW, wid + 1); //top
                    ctx.fillRect((-this.rectW / 2), (this.rectH / 2) - 0.5, this.rectW, wid + 1); //bottom*/

          //beach L
          /*ctx.globalAlpha = oAlpha * 1.0;
                    ctx.fillStyle = col_ocean_sand;
                    ctx.fillRect(-this.rectW / 2 - beachW, -this.rectH / 2, beachW * 2, this.rectH);
                    //beach top (beach aligns with top, fills gap)
                    ctx.fillRect(-this.rectW / 2 - beachW, -this.rectH / 2, this.rectW + beachW, beachW * 2);*/
          //main water
          ctx.fillStyle = col_ocean;

          ctx.fillRect(
            -this.rectW / 2 + waveDelta,
            -this.rectH / 2 + waveDelta + beachW,
            this.rectW - waveDelta,
            this.rectH - waveDelta - beachW
          );
          //circle
          ctx.beginPath();
          ctx.arc(
            -this.rectW / 2 + 50,
            -this.rectH / 2 + 50,
            70.0 - waveDelta,
            0,
            2 * Math.PI
          );
          ctx.fill();

          var minusForEdge = 35;
          fillGrid(
            -this.rectW / 2 + minusForEdge,
            -this.rectH / 2 + minusForEdge,
            this.rectW / 2 - minusForEdge,
            this.rectH / 2 - minusForEdge,
            this.x,
            this.y
          );
        } else {
          //LEFT side

          //dark rect outside ocean bounds
          /*var wid = 1200.0;
                    var oAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = oAlpha * 1.0;
                    ctx.fillStyle = "#16799F"; //"#3A4495";
                    ctx.fillRect((-this.rectW / 2) - wid, (-this.rectH / 2), wid + 0.5, this.rectH + 2 * wid); //left
                    //ctx.fillRect((-this.rectW/ 2) , (-this.rectH/ 2) - wid, this.rectW, wid + 2); //top
                    ctx.fillRect((-this.rectW / 2), (this.rectH / 2) - 0.5, this.rectW, wid + 1); //bottom*/

          //beach R (overlaps by beachW in)
          /*ctx.globalAlpha = oAlpha * 1.0;
                    ctx.fillStyle = col_ocean_sand;
                    ctx.fillRect(this.rectW / 2 - beachW, -this.rectH / 2, beachW * 2, this.rectH);
                    //beach top
                    ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW + beachW, beachW * 2);*/
          //main water
          ctx.fillStyle = col_ocean;
          waveDelta *= -1;
          ctx.fillRect(
            -this.rectW / 2,
            -this.rectH / 2 - waveDelta + beachW,
            this.rectW + waveDelta,
            this.rectH + waveDelta - beachW
          );

          var minusForEdge = 25;
          fillGrid(
            -this.rectW / 2 + minusForEdge,
            -this.rectH / 2 + minusForEdge,
            this.rectW / 2 - minusForEdge,
            this.rectH / 2 - minusForEdge,
            this.x,
            this.y
          );
        }
      }
      break;
    case o_beach:
      {
        //draw jagged un-even polygon
        ctx.fillStyle = col_ocean_sand;
        //ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

        var x_min = -this.rectW / 2; //of box to draw jagged around
        var x_max = this.rectW / 2;
        var y_min = -this.rectH / 2;
        var y_max = this.rectH / 2;

        //jagged vertically (top-bottom)
        ctx.beginPath();
        ctx.moveTo(x_min, y_min);
        var extraBeachW = 20.0;

        var offsetsLst = [-15, 10, -10, 12, 0, 5, -10, 5, -12, 5, 10, 0, -6];
        var oSpread = 45; //dist between offset points
        var oCount = 0;

        //clamp vars to keep drawing in room!
        var relMaxX = gameW - this.x;
        var relMinX = 0 - this.x;
        var relMaxY = gameH - this.y;
        var relMinY = 0 - this.y;
        //jagged: top-left to bottom-left
        var dy;
        var dx = x_min - extraBeachW;
        for (dy = y_min; dy < y_max; dy += oSpread) {
          ctx.lineTo(
            Math.min(relMaxX, Math.max(relMinX, dx + offsetsLst[oCount])),
            dy
          );
          oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
        }

        ctx.lineTo(x_min, y_max); //connect to bl

        // jagged: bl - br
        dy = y_max + extraBeachW;
        for (dx = x_min; dx < x_max; dx += oSpread) {
          ctx.lineTo(
            dx,
            Math.min(relMaxY, Math.max(relMinY, dy + offsetsLst[oCount]))
          );
          oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
        }
        ctx.lineTo(x_max, y_max); //connect to br

        //X jagged: br- tr
        dx = x_max + extraBeachW;
        for (dy = y_max; dy > y_min; dy -= oSpread) {
          ctx.lineTo(
            Math.min(relMaxX, Math.max(relMinX, dx + offsetsLst[oCount])),
            dy
          ); //clamp to keep drawing in-game
          oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
        }
        ctx.lineTo(x_max, y_min); //to tr

        //X jagged: tr-tl
        dy = y_min - extraBeachW;
        for (dx = x_max; dx > x_min; dx -= oSpread) {
          ctx.lineTo(
            dx,
            Math.min(relMaxY, Math.max(relMinY, dy + offsetsLst[oCount]))
          );
          oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
        }

        ctx.closePath(); //to tl
        ctx.fill();

        //draw dark grid
        //fillGrid(-this.rectW / 2, -this.rectH / 2, this.rectW / 2, this.rectH / 2);
      }
      break;
    case o_biome_desert:
      {
        var oAlpha = ctx.globalAlpha;
        //ctx.globalAlpha = oAlpha * 0.8;
        //var gradLen = 30.0;
        ctx.fillStyle = col_ocean_sand; // col_wat2;
        ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

        var minusForEdge = 35;
        fillGrid(
          -this.rectW / 2 + minusForEdge,
          -this.rectH / 2 + minusForEdge,
          this.rectW / 2 - minusForEdge,
          this.rectH / 2 - minusForEdge,
          this.x,
          this.y
        );

        //top of river
        var edgeW = 15;
        {
          ctx.fillStyle = col_ocean_sand;

          var x_min = -this.rectW / 2; //of box to draw jagged around
          var x_max = this.rectW / 2;
          var y_min = -this.rectH / 2 + 3.0;
          var y_max = -this.rectH / 2 - edgeW;

          //jagged vertically (top-bottom)
          ctx.beginPath();
          ctx.moveTo(x_min, y_min);
          var extraBeachW = 0.0;

          var offsetsLst = [
            -15,
            5,
            10,
            0,
            -10,
            3,
            12,
            4,
            0,
            3,
            5,
            -10,
            5,
            -12,
            5,
            10,
            0,
            -6
          ];
          var oSpread = 60; //dist between offset points
          var oCount = 0;

          //clamp vars to keep drawing in room!
          var relMaxX = gameW - this.x;
          var relMinX = 0 - this.x;
          var relMaxY = gameH - this.y;
          var relMinY = 0 - this.y;
          //jagged: top-left to bottom-left
          var dy;
          var dx = x_min - extraBeachW;
          /*for(dy=y_min; dy<y_max; dy+=oSpread){
                      ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy);
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/

          ctx.lineTo(x_min, y_max); //connect to bl

          // jagged: bl - br
          dy = y_max + extraBeachW;
          for (dx = x_min; dx < x_max; dx += oSpread) {
            ctx.lineTo(
              dx,
              Math.min(relMaxY, Math.max(relMinY, dy + offsetsLst[oCount]))
            );
            oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
          }

          ctx.lineTo(x_max, y_max); //connect to br

          //X jagged: br- tr
          /*dx=x_max + extraBeachW;
                    for(dy=y_max; dy>y_min; dy-=oSpread){
                      ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy); //clamp to keep drawing in-game
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/
          ctx.lineTo(x_max, y_min); //to tr

          //X jagged: tr-tl
          /*dy=y_min - extraBeachW;
                    for(dx=x_max; dx>x_min; dx-=oSpread){
                      ctx.lineTo(dx , Math.min(relMaxY, Math.max(relMinY,dy+offsetsLst[oCount])));
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/

          ctx.closePath(); //to tl

          ctx.fill();
        }
      }
      break;
    case o_biome_arctic:
      {
        var oAlpha = ctx.globalAlpha;
        //ctx.globalAlpha = oAlpha * 0.8;
        //var gradLen = 30.0;
        ctx.fillStyle = "#ececec"; // col_wat2;
        ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

        //ctx.fillStyle = col_ocean_sand;
        //ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

        var x_min = -this.rectW / 2; //of box to draw jagged around
        var x_max = this.rectW / 2;
        var y_min = this.rectH / 2 - 20;
        var y_max = this.rectH / 2;

        snowLandWidth = this.rectW;
        snowLandHeight = this.rectH;

        //jagged vertically (top-bottom)
        ctx.beginPath();
        ctx.moveTo(x_min, y_min);
        var extraBeachW = 20.0;

        var offsetsLst = [
          -15,
          5,
          10,
          0,
          -10,
          3,
          12,
          4,
          0,
          3,
          5,
          -10,
          5,
          -12,
          5,
          10,
          0,
          -6
        ];
        var oSpread = 60; //dist between offset points
        var oCount = 0;

        //clamp vars to keep drawing in room!
        var relMaxX = gameW - this.x;
        var relMinX = 0 - this.x;
        var relMaxY = gameH - this.y;
        var relMinY = 0 - this.y;
        //jagged: top-left to bottom-left
        var dy;
        var dx = x_min - extraBeachW;
        /*for(dy=y_min; dy<y_max; dy+=oSpread){
                    ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy);
                    oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                }*/

        ctx.lineTo(x_min, y_max); //connect to bl

        // jagged: bl - br
        dy = y_max + extraBeachW;
        for (dx = x_min; dx < x_max; dx += oSpread) {
          ctx.lineTo(
            dx,
            Math.min(relMaxY, Math.max(relMinY, dy + offsetsLst[oCount]))
          );
          oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
        }
        ctx.lineTo(x_max, y_max); //connect to br

        //X jagged: br- tr
        /*dx=x_max + extraBeachW;
                for(dy=y_max; dy>y_min; dy-=oSpread){
                    ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy); //clamp to keep drawing in-game
                    oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                }*/
        ctx.lineTo(x_max, y_min); //to tr

        //X jagged: tr-tl
        /*dy=y_min - extraBeachW;
                for(dx=x_max; dx>x_min; dx-=oSpread){
                    ctx.lineTo(dx , Math.min(relMaxY, Math.max(relMinY,dy+offsetsLst[oCount])));
                    oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                }*/

        ctx.closePath(); //to tl
        ctx.fill();

        //draw dark grid
        var minusForEdge = 20;
        fillGrid(
          -this.rectW / 2 + minusForEdge,
          -this.rectH / 2 + minusForEdge,
          this.rectW / 2 - minusForEdge,
          this.rectH / 2 - minusForEdge,
          this.x,
          this.y
        );
      }
      break;
    case o_river:
      {
        var oAlpha = ctx.globalAlpha;
        //ctx.globalAlpha = oAlpha * 0.8;
        //var gradLen = 30.0;

        ctx.fillStyle = col_wat2;
        ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

        //top of river
        var edgeW = 15;
        {
          ctx.fillStyle = col_wat2;

          var x_min = -this.rectW / 2; //of box to draw jagged around
          var x_max = this.rectW / 2;
          var y_min = -this.rectH / 2 + 3.0;
          var y_max = -this.rectH / 2 - edgeW;

          //jagged vertically (top-bottom)
          ctx.beginPath();
          ctx.moveTo(x_min, y_min);
          var extraBeachW = 0.0;

          var offsetsLst = [
            -15,
            5,
            10,
            0,
            -10,
            3,
            12,
            4,
            0,
            3,
            5,
            -10,
            5,
            -12,
            5,
            10,
            0,
            -6
          ];
          var oSpread = 60; //dist between offset points
          var oCount = 0;

          //clamp vars to keep drawing in room!
          var relMaxX = gameW - this.x;
          var relMinX = 0 - this.x;
          var relMaxY = gameH - this.y;
          var relMinY = 0 - this.y;
          //jagged: top-left to bottom-left
          var dy;
          var dx = x_min - extraBeachW;
          /*for(dy=y_min; dy<y_max; dy+=oSpread){
                      ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy);
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/

          ctx.lineTo(x_min, y_max); //connect to bl

          // jagged: bl - br
          dy = y_max + extraBeachW;
          for (dx = x_min; dx < x_max; dx += oSpread) {
            ctx.lineTo(
              dx,
              Math.min(relMaxY, Math.max(relMinY, dy + offsetsLst[oCount]))
            );
            oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
          }

          ctx.lineTo(x_max, y_max); //connect to br

          //X jagged: br- tr
          /*dx=x_max + extraBeachW;
                    for(dy=y_max; dy>y_min; dy-=oSpread){
                      ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy); //clamp to keep drawing in-game
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/
          ctx.lineTo(x_max, y_min); //to tr

          //X jagged: tr-tl
          /*dy=y_min - extraBeachW;
                    for(dx=x_max; dx>x_min; dx-=oSpread){
                      ctx.lineTo(dx , Math.min(relMaxY, Math.max(relMinY,dy+offsetsLst[oCount])));
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/

          ctx.closePath(); //to tl

          ctx.fill();
        }

        {
          ctx.fillStyle = col_wat2;

          var x_min = -this.rectW / 2; //of box to draw jagged around
          var x_max = this.rectW / 2;
          var y_min = this.rectH / 2 - 3.0;
          var y_max = this.rectH / 2 + edgeW;

          //jagged vertically (top-bottom)
          ctx.beginPath();
          ctx.moveTo(x_min, y_min);
          var extraBeachW = 0.0;

          var offsetsLst = [
            -15,
            5,
            10,
            0,
            -10,
            3,
            12,
            4,
            0,
            3,
            5,
            -10,
            5,
            -12,
            5,
            10,
            0,
            -6
          ];
          var oSpread = 60; //dist between offset points
          var oCount = 0;

          //clamp vars to keep drawing in room!
          var relMaxX = gameW - this.x;
          var relMinX = 0 - this.x;
          var relMaxY = gameH - this.y;
          var relMinY = 0 - this.y;
          //jagged: top-left to bottom-left
          var dy;
          var dx = x_min - extraBeachW;
          /*for(dy=y_min; dy<y_max; dy+=oSpread){
                      ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy);
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/

          ctx.lineTo(x_min, y_max); //connect to bl

          // jagged: bl - br
          dy = y_max + extraBeachW;
          for (dx = x_min; dx < x_max; dx += oSpread) {
            ctx.lineTo(
              dx,
              Math.min(relMaxY, Math.max(relMinY, dy + offsetsLst[oCount]))
            );
            oCount = (oCount + 1) % offsetsLst.length; //loop through offsets
          }

          ctx.lineTo(x_max, y_max); //connect to br

          //X jagged: br- tr
          /*dx=x_max + extraBeachW;
                    for(dy=y_max; dy>y_min; dy-=oSpread){
                      ctx.lineTo(Math.min(relMaxX, Math.max(relMinX,dx+ offsetsLst[oCount])), dy); //clamp to keep drawing in-game
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/
          ctx.lineTo(x_max, y_min); //to tr

          //X jagged: tr-tl
          /*dy=y_min - extraBeachW;
                    for(dx=x_max; dx>x_min; dx-=oSpread){
                      ctx.lineTo(dx , Math.min(relMaxY, Math.max(relMinY,dy+offsetsLst[oCount])));
                      oCount=(oCount+1)%(offsetsLst.length); //loop through offsets
                    }*/

          ctx.closePath(); //to tl

          ctx.fill();
        }
        //draw dark grid
        var minusForEdge = 20;

        var theImg = getLoadedImg(
          "img/riverCurrent" + this.riverSpecT + ".png"
        );

        if (theImg) {
          var imgX = -this.rectW / 2;
          var imgWid = 100;
          var riverFlowSpeed = 120.0; //same as server! (but 60* larger)
          for (i = 0; i < 40; i++) {
            var waveMoveTms =
              this.riverFlowSpeedX * (imgWid / riverFlowSpeed) * 500; //ms to one full movement- t=dist * v
            var fac0to1 =
              ((timestamp - this.spawnTime) % waveMoveTms) / waveMoveTms;
            var dist = imgWid;
            var waveX = imgX + dist * fac0to1;

            ctx.drawImage(theImg, waveX, -this.rectH / 2, imgWid, this.rectH);
            imgX += imgWid;
          }
        }

         fillGrid(-this.rectW / 2 + minusForEdge, -this.rectH / 2 + minusForEdge, this.rectW / 2 - minusForEdge, this.rectH / 2 - minusForEdge);
      }
      break;
    case o_biome_land:
      {
        ctx.fillStyle = col_gameBg1;
        ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

        //draw dark grid
        var minusForEdge = 45;
        fillGrid(
          -this.rectW / 2 + minusForEdge,
          -this.rectH / 2 + minusForEdge,
          this.rectW / 2 - minusForEdge,
          this.rectH / 2 - minusForEdge,
          this.x,
          this.y
        );
      }
      break;
    case o_rockHill:
      {
        //draw outline

        /*var theImg=getLoadedImg("img/rockhill.png");
                if(theImg){
                  //outline green
                  drawCircle(0,0,this.rad,col_outline_land);

                  var rad=this.rad - 2.5;
                  ctx.rotate(this.rPer * Math.PI * 2.0);
                  ctx.drawImage(theImg, -rad , -rad , 2 * rad, 2 * rad);
                    //console.log("drawing banana");
                }
                else*/
        //this.drawOutlinedCircle("", col_rockHill);

        var rockColor =
          this.curBiome == biome_desert ? col_rockHill_desert : col_rockHill;

        if (batchDrawOutline)
          //first draw outline circle (only)
          drawCircle(0, 0, this.rad, this.getOutlineColor());
        else drawCircle(0, 0, this.rad - 1.5, rockColor);
      }
      break;
    case o_lakeIsland:
      {
        ctx.fillStyle = col_ocean_sand;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0, this.rad), 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#E4D04C";
        ctx.beginPath();
        ctx.arc(
          -5 + this.rPer * 10,
          -5 + this.rPer * 10,
          this.rad * 0.8,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
      break;
    case o_waterDrop:
      var rShift = 0;
      var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
      var frame = getAnimFrame(tSinceSpawn, 1, 5, 2);
      var frame2 = getAnimFrame(tSinceSpawn, 1, 0.2, 2);

      ctx.globalAlpha = 0.5;
      drawCircle(0, 0, this.rad, col_wat1);

      var extraRotate = -(-0.2 + frame) * toRadians(90.0); //spin animation
      ctx.save();
      ctx.scale(1, 1 + frame2);
      ctx.globalAlpha = 0.3;

      ctx.rotate(extraRotate);
      drawCircle(0, 0, this.rad - frame, "#2CAAC4");
      ctx.restore();

      ctx.save();
      ctx.scale(1 + frame2, 1);
      ctx.globalAlpha = 0.1;

      ctx.rotate(extraRotate);
      drawCircle(0, 0, this.rad * 0.9 - frame, "white");
      ctx.restore();

      break;
    case o_water:
      {
        var col = this.curBiome == biome_arctic ? "#8fa4e0" : col_wat1;

        this.drawOutlinedCircle("", col);

        //console.log("spectype "+this.specType);
        /*else {
                  var theImg = getLoadedImg("img/santa/gifts/" + this.specType + ".png");
                  if (theImg) {
                    ctx.save();
                    var rad = this.rad;
                    ctx.rotate(this.angle);
                    ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
                    ctx.restore();
                    //console.log("drawing banana");
                  }
                }*/
      }
      break;


case o_gift:
    {
                 var theImg = getLoadedImg("img/santa/gifts/" + this.specType + ".png");
                  if (theImg) {
                    ctx.save();
                    var rad = this.rad;
                  ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
                    ctx.restore();
                    //console.log("drawing banana");
                  }
                }
            
    
    break;
    case o_snowBall:
      {
        //DEBUG
        //this.drawOutlinedCircle("", "white");
        var theImg = getLoadedImg("img/snowball.png");
        if (theImg) {
          var rad = this.rad;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        } else this.drawOutlinedCircle("", "white");
      }
      break;

    case o_spiderWeb:
      {
        //console.log("spiderweb draw: handled by subcalss now!");
      }
      break;

    case o_poisonBall:
      {
        //DEBUG

        ctx.save();
        //outlineCol
        drawCircle(
          0,
          0,
          this.rad,
          !this.isEdibleOutlined()
            ? outlineColForBiome(this.curBiome)
            : col_edibleOutline
        );
        drawCircle(0, 0, Math.max(0, this.rad - 2), col_wat1);

        ctx.restore();

        //on fire glow

        //POISON outline 'glow'

        ctx.save();

        //effect also flashes
        var period = 1.2; //periodic func with time
        var p_min = 0.3,
          p_max = 0.7;
        var amp = 0.5 * (p_max - p_min);
        ctx.globalAlpha *=
          p_min +
          amp +
          amp *
            Math.sin(
              ((2.0 * Math.PI) / period) *
                ((timestamp - this.spawnTime) / 1000.0)
            );

        ctx.globalAlpha *= this.effA_poison;
        var effectRad = 2.6;
        drawCircle(0, 0, this.rad + effectRad, "#7FF600");

        ctx.restore();
      }
      break;
    case o_infectionDrop:
      {
        //DEBUG

        ctx.save();
        //outlineCol
        drawCircle(
          0,
          0,
          this.rad,
          !this.isEdibleOutlined()
            ? outlineColForBiome(this.curBiome)
            : col_edibleOutline
        );
        drawCircle(0, 0, Math.max(0, this.rad - 2), "#f87b05");

        ctx.restore();

        //on fire glow

        //POISON outline 'glow'

        ctx.save();

        //effect also flashes
        var period = 1.2; //periodic func with time
        var p_min = 0.3,
          p_max = 0.7;
        var amp = 0.5 * (p_max - p_min);
        ctx.globalAlpha *=
          p_min +
          amp +
          amp *
            Math.sin(
              ((2.0 * Math.PI) / period) *
                ((timestamp - this.spawnTime) / 1000.0)
            );

        ctx.globalAlpha *= this.effA_poison;
        var effectRad = 2.6;
        drawCircle(0, 0, this.rad + effectRad, "#f00");

        ctx.restore();
      }
      break;

   
    case o_fireTornado:
      {
        ctx.save();

        var tornado = getLoadedImg("img/firetornado.png");
        if (tornado) {
          var rad = this.rad;

          var rps = 60 / 60;
          var rotationTms = 1000 / rps; //ms to one full movement- t=dist * v
          var fac0to1 =
            ((timestamp - this.spawnTime) % rotationTms) / rotationTms;
          var rotation1 = fac0to1 * 2 * Math.PI;

          var rps = 30 / 60;
          var rotationTms = 1000 / rps; //ms to one full movement- t=dist * v
          var fac0to1 =
            ((timestamp - this.spawnTime) % rotationTms) / rotationTms;
          var rotation2 = fac0to1 * 2 * Math.PI;

          ctx.save();
          ctx.rotate(rotation1);
          //ctx.drawImage(tornado, -rad, -rad, 2 * rad, 2 * rad);

          var oldA = ctx.globalAlpha;
          ctx.globalAlpha = 1 * oldA;
          //var rad = Math.max(0, this.rad - 30);

          var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
          var period = 2.2;
          var xShift = 6.5 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
          var yShift = 6.5 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

          ctx.globalAlpha = 1;
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();

          ctx.save();
          ctx.rotate(rotation2);
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }

        ctx.restore();
      }
      break;
  
    /*      this.drawOutlinedCircle("", "orange"); 

        //on fire glow

        //glow stronger/weaker like a fire
        var period = 1.0; //periodic func with time
        var p_min = 0.15,
          p_max = 0.8; //set these!
        var amp = 0.5 * (p_max - p_min);
        var flashA =
          p_min +
          amp +
          amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

        ctx.save();
       
     
        ctx.restore();

        //glow stronger/weaker like a fire
        var period = 1.0; //periodic func with time
        var p_min = 0.0,
          p_max = 1.1; //set these!
        var amp = 0.5 * (p_max - p_min);
        var moveA =
          p_min +
          amp +
          amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

        var imNum = Math.trunc(timestamp / 100) % 2;
        var theImg = getLoadedImg(
          imNum == 1 ? "img/fire.png" : "img/fire2.png"
        );

          ctx.save();
        if (theImg) {
          var imX = 0,
            imY = this.rad * 0.3;
          var imW = (this.rad * 2.0 * (2.0 + moveA * 2.0)) / 3.0,
            imH = this.rad * 2.0 * moveA;
          var imAnchorX = 0.0,
            imAnchorY = 1.5; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          
      

          ctx.restore();
        }
      }
      */
  case o_fireBall:
      {
        //DEBUG

        //on fire glow

        //glow stronger/weaker like a fire
        var period = 1.0; //periodic func with time
        var p_min = 0.15,
          p_max = 0.8; //set these!
        var amp = 0.5 * (p_max - p_min);
        var flashA =
          p_min +
          amp +
          amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

        ctx.save();
        ctx.globalAlpha *= flashA;
        drawCircle(0, 0, Math.max(0, this.rad), "#F6EA65");
        ctx.restore();

        //glow stronger/weaker like a fire
        var period = 1.0; //periodic func with time
        var p_min = 0.85,
          p_max = 1.0; //set these!
        var amp = 0.5 * (p_max - p_min);
        var moveA =
          p_min +
          amp +
          amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

        var imNum = Math.trunc(timestamp / 300) % 2;
        var theImg = getLoadedImg(
          imNum == 1 ? "img/fire.png" : "img/fire2.png"
        );
        if (theImg) {
          var imX = 0,
            imY = this.rad * 0.3;
          var imW = (this.rad * 2.0 * (2.0 + moveA * 2.0)) / 3.0,
            imH = this.rad * 2.0 * moveA;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.save();
          if (theImg) {
            ctx.globalAlpha *= this.onFireEffA * moveA;
            ctx.drawImage(
              theImg,
              imX + imW * -imAnchorX,
              imY + imH * -imAnchorY,
              imW,
              imH
            );
          }

          ctx.restore();
        }
      }
      break;
    case o_animal:
      {
        //this.drawAnimal(f);
        //console.log("SHOULD BE HANDLED BY ANIMAL thisClass METHOD! Type? " + this.constructor.name);
        //this.drawPlayerText(f);
      }
      break;

    default:
      {
        //console.log("Unhandled obj " + this);
        //console.log("rect? " + this.isRectangle + " pos " + this.x + "," + this.y);
        //unknown type
        if (this.isRectangle) {
          ctx.fillStyle = "black"; // col_wat2;
          ctx.fillRect(
            -this.rectW / 2,
            -this.rectH / 2,
            this.rectW,
            this.rectH
          );
        } else this.drawOutlinedCircle("????", "black");
      }
      break;
  } //end of .oType switch()
};

//main draw method (NOT subclassable)
GameObj.prototype.beforeCustomDraw = function () {};
GameObj.prototype.draw = function(batchDrawOutline) {
  //console.log("drawing obj "+this.id);

  //");
  //apply interpolation (before translate)
  this.moveUpdF = this.moveUpdate();
this.beforeCustomDraw();
  ctx.save();
  ctx.translate(this.x, this.y);

  //zoom in/out effect
  if (this.doesDrawEffectScale && !options_lowGraphics) {
    var rShift = 0;
    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
    var period = 1.5; // (this.oType == o_mushroom || this.oType == o_bigMushroom || this.oType == o_lillypad) ? 2.0 : 1.3; //slower warping
    var shiftAm = 0.1;
    if (this.drawEffectScale_Slow) {
      period = 2.5;
      shiftAm = 0.04;
    }
    rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

    ctx.scale(1.0 + rShift, 1.0 + rShift / 2);
  }

  var outlineCol = this.getOutlineColor();
  var strokeW = 2; //default

  //fade on death
  if (this.dead) ctx.globalAlpha *= 1 - this.moveUpdF;
  //fade in on spawn
  else {
    //if (oType != o_biome_ocean) {
    ctx.globalAlpha *= Math.min(
      1.0,
      (timestamp - this.spawnTime) / (lerpI * 1000.0)
    );
    //console.log("a * "+Math.min(1.0, (timestamp-this.spawnTime)/(lerpI*1000.0)));
  }

  //draw method without applying extra scaling

  this.customDraw(batchDrawOutline);

  //hurt red glow
  if (this.flag_hurt) {
    ctx.fillStyle = "rgba(255,0,0,0.3)";
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(0, this.rad - strokeW), 0, Math.PI * 2);
    ctx.fill();
  }

  //draw HP bar
  this.drawHealthBar();

  ctx.restore(); //restore from fade
};

GameObj.prototype.drawHealthBar = function() {
  ctx.save();
  //ease vars
  var hpBarA_n = timestamp < this.hpBarTimeoutT ? 1.0 : 0.0;
  this.hpBarA += (hpBarA_n - this.hpBarA) * 0.04;

  if (this.hpBarA > 0.001) {
    this.hpPer += (this.hpPer_n - this.hpPer) * 0.1;

    //draw bar
    var eyeS = Math.max(1.0, this.rad / 25.0);
    var barW = 20.0 * eyeS,
      barH = 5 * eyeS;
    var bx = 0,
      by = -this.rad - 10 * eyeS;
    ctx.globalAlpha *= this.hpBarA; //bar bg
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(bx - barW / 2, by - barH / 2, barW, barH);

    //ctx.globalAlpha = this.hpBarA * f;
    ctx.fillStyle = "#16D729"; //bar fill
    ctx.fillRect(
      bx - barW / 2,
      by - barH / 2,
      barW * (this.hpPer / 100.0),
      barH
    );
  }
  ctx.restore(); //restore from fade

  if(this.id == myPlayerID)
    this.drawInfectionBar();
};

GameObj.prototype.drawInfectionBar = function() {
  var infectionBarA_n = timestamp < this.infectionBarTimeoutT ? 1.0 : 0.0;
  this.infectionBarA += (infectionBarA_n - this.infectionBarA) * 0.04;
  if (this.infectionBarA > 0.001) {
    this.infectionPer += (this.infectionPer_n - this.infectionPer) * 0.1;

    this.drawBar("red", this.infectionBarA, this.infectionPer, 10);
  }
};

GameObj.prototype.drawBar = function(color, hpBarA, hpPer, yPoz) {
  ctx.save();

  //draw bar
  var eyeS = Math.max(1.0, this.rad / 25.0);
  var barW = 20.0 * eyeS,
    barH = 2.5 * eyeS ;
  var bx = 0,
    by = -this.rad - yPoz * eyeS;
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(bx - barW / 2, by - barH / 2, barW, barH);
  
  //ctx.globalAlpha = this.hpBarA * f;
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = color; //bar fill
  ctx.fillRect(bx - barW / 2, by - barH / 2, barW * (hpPer / 100.0), barH);
  ctx.restore(); //restore from fade
};
GameObj.prototype.drawChat = function() {
  if (this.chatLines.length < 1) return;

  ctx.save();
  //set text settings
  ctx.font = "10px Arial";
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; //vertical center

  var baseY = this.hpBarA > 0.01 ? -10.0 : 0.0; //raise chat when hp bar is open
  var toDelete = [];
  for (var i = this.chatLines.length - 1; i >= 0; i--) {
    var aLine = this.chatLines[i];
    var textY = (this.chatLines.length - 1 - i) * -13.0 + baseY; //draw earlies text at bottom

    //time-out text
    var idealA = timestamp > aLine.chatFadeT ? 0.0 : 1.0;
    aLine.chatA += (idealA - aLine.chatA) * 0.1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    if (aLine.chatA < 0.02) {
      if (idealA < 0.02) aLine.chatTxt = ""; //timed out text
      toDelete.push(i); //push index
      continue;
    }
    //green chat bg
    var text_w = ctx.measureText(aLine.chatTxt).width;
    var text_h = 10.0; //same as font height
    var padx = 1,
      pady = 1;
    ctx.globalAlpha = 0.8 * aLine.chatA;
    ctx.fillStyle = outlineColForBiome(this.curBiome); //"white";

    ctx.fillRect(
      this.x - padx - text_w / 2,
      textY + this.y - this.rad - 10 - text_h / 2 - pady,
      text_w + padx * 2,
      text_h + pady * 2
    );

    ctx.fillStyle = "#F1C34C";
    if (!options_lowGraphics) {
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowColor = "black";
    }
    ctx.globalAlpha = aLine.chatA;
    ctx.fillText(aLine.chatTxt, this.x, textY + this.y - this.rad - 10);
  }

  //remove timed-out text
  for (var i = 0; i < toDelete.length; i++) {
    this.chatLines.splice(toDelete[i], 1);
  }
  ctx.restore();
};

GameObj.prototype.getOutlineColor = function() {

  if (this.isEdibleOutlined()) {
      if (!this.alwaysPlainOutline) {
    return col_edibleOutline;
      }
  }
  //red outline for dangerous animals
  if (
    this.oType == o_animal &&
    dangerAniTypes[this.animalType - 1] > 0 &&
    this.id != myPlayerID
  ) {
         if (!this.alwaysPlainOutline) {
    return col_dangerOutline;
         }
  }
  //plain outline (based on biome)
  var biome = this.curBiome;

  if (this.flag_inWater) biome = biome_ocean;
  else if (this.flag_inLava) return "#c64a00";
  else if (biome == 3) return "#c64a00";
else if (this.flag_inDesert) return "#a59215"
  
  
  return outlineColForBiome(biome);
};



GameObj.prototype.isEdibleOutlined = function() {
  if (this.oType == o_animal)
    return edibAniTypes[this.animalType - 1] > 0 && this.id != myPlayerID;
  else return edibleObjTypes[this.oType - 1] > 0;
};
GameObj.prototype.gotChat = function(chatTxt) {
  if (this.chatLines) {
    this.chatLines.push({
      chatTxt: chatTxt,
      chatFadeT: timestamp + 4000,
      chatA: 0.0
    });
    if (this.chatLines.length > 5)
      this.chatLines.splice(this.chatLines.length - 1, 1); //remove last chat item
  }
};

GameObj.prototype.drawOutlinedCircle = function(nm, col) {
  var outlineCol = this.getOutlineColor();

  //green outline (without stroke- optimized)
  var strokeW = 1.5;
  if (!(options_lowGraphics && outlineCol == col_outline_land))
    //dont draw plain outlines!
    drawCircle(0, 0, this.rad, outlineCol);
  drawCircle(0, 0, Math.max(0, this.rad - strokeW), col);
};
GameObj.prototype.drawfireCircle = function(col) {
 

  //green outline (without stroke- optimized)
  var strokeW = 1.5;
    //dont draw plain outlines!

  drawCircle(0, 0, Math.max(0, (this.rad) - this.rad / 8), col);
};
//moves the obj,  interpolating between udpates
GameObj.prototype.moveUpdate = function() {
  var a = (timestamp - this.updateTime) / 1000 / lerpI;
  a = 0 > a ? 0 : 1.0 < a ? 1.0 : a; //clamp from 0-1
  /*if (a > 1.0) { //lag smoothing?{
        a = Math.pow(a, 0.25);
    }*/

  if (this.dead && a >= 1) {
    //dead, done anim
    remGameObjs.push(this); //delete after draw loop
  }

  //  console.log("a=" + a);
  this.x = a * (this.nx - this.ox) + this.ox;
  this.y = a * (this.ny - this.oy) + this.oy;

  //if(this.oType==o_abilityGObj)
  //console.log("(dead? "+this.dead+") a= "+a+"x="+this.x+" nx "+this.nx+" ox "+this.ox);

  this.rad += (this.nRad - this.rad) * 0.1; //a * (this.nRad - this.oRad) + this.oRad;;
  if (this.angle != undefined) {
    //ease angle rot
    //var idealA = this.angle + this.angleDelta
    //var oldA =
    //this.angle = a * (this.angleDelta) + this.oAngle; //(9 * this.angle + idealA) / 10.0;
    var dChange = this.angleDelta * 0.1; //* a;
    this.angleDelta -= dChange;
    this.angle += dChange;
    //new accurate interpolation
    //this.angle=this.oAngle+this.angleDelta*a;
  }
  return Math.min(1.0, a); //re-use move factor
};

//read data that is only written for a certain object type (oType) / oType class
GameObj.prototype.readCustomData_onUpdate = function(msg) {
  //console.log("Gameobj read update custom data id "+this.id);
};

//read data that is only written for a certain object type (oType) / oType class
//custom data for this class (must be matched by server-side write of this data!)
GameObj.prototype.readCustomData_onNewlyVisible = function(msg) {
  //special vars

  switch (this.oType) {
       case o_river:
    case o_poisonBerry:
    case o_meatLarge:
    case o_meatMedium:
    case o_meatSmall:
    case o_raspberrynew:
     case o_gift:
     case o_bigHidingHole:
     case o_fireBall:
     case o_sinkHole:
     this.specType = msg.readUInt8();
  }
  
  if (this.oType == o_river) {
    // river flow direction
    var riverSpecT = this.specType; // msg.readUInt8();
    
    this.riverSpecT = riverSpecT;
    this.riverFlowSpeedX = riverSpecT ? 1.0 : -1.0;
  }

  // if (this.oType == o_poisonBerry) {
  //   // which color this berry is?
  //   this.specType = msg.readUInt8();
  // }

  /*if (this.oType == o_spiderWeb) {
      //1 or 9, is the web transparent
      this.specType = msg.readUInt8();
    }*/
};

//overridden by Animal, makes code neat
GameObj.prototype.setObjTypes = function(oType, secondaryType) {
  this.oType = oType;
};

//setup from newly visible message
GameObj.prototype.worldUpd_readMsgNewlyVisible = function(
  msg,
  oType,
  secondaryType
) {
  //thisClasses eg. Aniaml have a seconary type 'animalType' that affects class
  this.setObjTypes(oType, secondaryType);
//console.log(msg.data.getUint32(19, false))

  var nw_id = msg.readUInt32();
  var nw_rad = msg.readUInt16() / 4.0;
  var nw_x = msg.readUInt16() / 4.0;
  var nw_y = msg.readUInt16() / 4.0;

  this.id = nw_id;
  this.ox = this.x = this.nx = nw_x; //set initial vars here
  this.oy = this.y = this.ny = nw_y; //'new' vars will be set after create
  this.nRad = nw_rad;
  this.oRad =this.rad = 0; //default: objs animate in from 0 rad (on spawn)

  //these objs start at full rad (no anim)
  if (
    oType == o_biome_poison ||
    oType == o_biome_volcano ||
    oType == o_mudSpot ||
    oType == o_arcticIce ||
    oType == o_lake ||
    oType == o_abilityGObj ||
    oType == o_hill ||
    oType == o_rockHill ||
    oType == o_fruitTree ||
    oType == o_lakeIsland
  ) {
    this.animateRadOnSpawn = false;
  }

  if (!this.animateRadOnSpawn) this.oRad = this.rad = nw_rad;

  // cur biome of the obj (since we have more biomes so they dont fit in 0-3 bits)
  var f_curBiome = msg.readUInt8();
  //read flags
 /* var oFlags = msg.readBitGroup();
  var f_spawnedFromID = oFlags.getBool(); //bit_get(flags, 0) > 0;
  var f_rectObj = oFlags.getBool();
  var f_sendsAngle = oFlags.getBool();*/
   //var oFlags = msg.readBitGroup();
  var f_spawnedFromID = msg.readUInt8() == 1;
  var f_rectObj = msg.readUInt8() == 1;
  var f_sendsAngle = msg.readUInt8() == 1;
  //var f_curBiome = oFlags.getInt0to3(); //2 * bit_get(flags, 3) + 1 * bit_get(flags, 2); //encoded 2-bit num
  
  this.curBiome = f_curBiome;
  this.objGetsAngleUpdate = f_sendsAngle;

  //show animation spawning from original obj
  var spawnFromObj = null;
  if (f_spawnedFromID) {
    spawnFromObj = gameObjsByID[msg.readUInt32()];
  }
  if (spawnFromObj) {
    this.updateTime = timestamp;
    this.nx = this.x;
    this.ny = this.y;
    this.ox = spawnFromObj.x;
    this.oy = spawnFromObj.y;
    this.x = spawnFromObj.x;
    this.y = spawnFromObj.y;
  }

  //rectangle objs (eg. biomes)
  if (f_rectObj) {
    this.isRectangle = true;
    this.rectW = msg.readUInt16();
    this.rectH = msg.readUInt16();

  }

  //this.objGetsAngleUpdate = msg.readUInt8() == 1;
  if (this.objGetsAngleUpdate) {
 
    var angleDeg = msg.readUInt8() * 3.0;
	//console.log("angle: " + angleDeg/3)  //heree
    var angleCorrection = this.oType == o_abilityGObj ? 180 : 90;
    this.angle = toRadians(angleDeg + angleCorrection);
    //this.specType = msg.readUInt8();
  }

  //now, read custom data!
 
  this.readCustomData_onNewlyVisible(msg);
};

GameObj.prototype.worldUpd_readMsgUpdate = function(msg) {
  var px = msg.readUInt16() / 4.0;
  var py = msg.readUInt16() / 4.0;
  var rad = msg.readUInt16() / 10.0;

  this.specType = msg.readUInt8();
 /* //universal obj 'flags'
  var objFlags = msg.readBitGroup();
  var flag_sendHp = objFlags.getBool();
  var flag_flashHurt = objFlags.getBool();
*/
  
  //var objFlags = msg.readUInt8();
  var flag_sendHp = msg.readUInt8() == 1;
  var flag_flashHurt = msg.readUInt8() == 1;
  
  this.updateTime = timestamp; //only set timestamp for moving items
  this.ox = this.x;
  this.oy = this.y;
  this.nx = px;
  this.ny = py;
  this.oRad = this.rad;
  this.nRad = rad;

  this.flag_hurt = flag_flashHurt;
  if (flag_sendHp) {
    //update/show health bar
    var hpPer = msg.readUInt8();
    if (this.hpBarA < 0.001) {
      //bar appeared, instantly set to full hp amount
      this.hpPer = hpPer;
    }
    this.hpPer_n = hpPer;
    //this.hpBarA_n = 1.0;

    //if(this.oType!=o_animal){
    //non-animals get quickly-dissapearing hp bars
    this.hpBarTimeoutT = +new Date() + 3000.0;
    //}
  } else {
    this.hpBarTimeoutT = +new Date(); //hp bar timed out
  }

  if (this.objGetsAngleUpdate) {
    var angleDeg = msg.readUInt8() * 3.0;
       
    
    var angleCorrection = this.oType == o_abilityGObj ? 180 : 90;
    this.angle = toRadians(angleDeg + angleCorrection);
	//console.log("angle1: " + angleDeg)
    // this.specType = msg.readUInt8();
  }

  //CUSTOM DATA!
  this.readCustomData_onUpdate(msg);

  this.firstPosUpd = false;
};

GameObj.prototype.worldUpd_readMsgRemovedObj = function(msg) {
  var killerId = msg.readUInt32();
  var killerObj = gameObjsByID[killerId] 

  this.dead = true;
  this.updateTime = timestamp; //count as update, kill on next upd

  if (this.oType == o_abilityGObj||this.oType == o_particles) {
    //no radius animation
    this.ox = this.x;
    this.oy = this.y;
    //this.oRad = this.rad;
    
    this.nx = this.x;
    this.ny = this.y;
    if(this.abilityType == ability_freezeprey){
    this.nx = killerObj.nx; //move to future pos
    this.ny = killerObj.ny;
    }
  } else if (killerObj) {
    //kill with animation
    this.ox = this.x;
    this.oy = this.y;
    this.oRad = this.rad;
    this.nx = killerObj.nx; //move to future pos
    this.ny = killerObj.ny;
    this.nRad = Math.min(this.rad, killerObj.rad);

    //fade possible hp bar
    this.hp_n = 0;
  } else {
   
    //kill with animation
 
    this.ox = this.x;
    this.oy = this.y;
    this.oRad = this.rad;
    this.nx = this.x;
    this.ny = this.y;
     this.nRad = 0
  }
};

//call on draw
GameObj.prototype.updateZ = function() {
  switch (this.oType) {
    case o_biome_land:
      this.z = -220;
      break;
    case o_biome_desert:
    case o_biome_arctic: //for water to pour on top
      this.z = -210;
      break;
    case o_biome_volcano:
       this.z = -200
      break;
    case o_biome_poison:
      this.z = 20;
      break;
    case o_beach:
      this.z = -202;
      break;
    case o_biome_ocean_extraWater:
      this.z = -201;
      break;


    case o_river:
    case o_lake:

    case o_lavaLake:
 this.z = -157
      break;    
    case o_bog:
      this.z = 21;
      break;
    case o_biome_ocean:
    case o_mudSpot:
      this.z = -158;
      break;

    //on top of volcano biome, under everything else
    case o_volcano:
        this.z = -158;
      break;
    case o_arcticIce:
      this.z = -156;
      break;
    case o_waterSpot:
      this.z = -155;
      break;
    case o_lakeIsland:
      this.z = -154;
      break;

    case o_abilityGObj:
      if (
        this.type == ability_eagleAttack ||
        this.type == ability_falconAttack ||
          this.type == ability_thunderbirdAttack ||
        this.type == ability_owlAttack ||
        this.type == ability_targetCircle ||
        this.type == ability_bearSlash
      ) {
        this.z = 100002;
        break;
      }

      //if(this.type==ability_krakenSpec || this.type==ability_stingRayShock || this.type==ability_squidInk)
      if (
        this.type == ability_iceSlide ||
        this.type == ability_clawSlash ||
        this.type == ability_backLegKick ||
        this.type == ability_whaleTailHit ||
        this.type == ability_finalhit ||
        this.type == ability_elephantTrunkSmack ||
        this.type == ability_crabSmash ||
        this.type == ability_crocWaterGrab ||
        this.type == ability_boaSuffocate ||
        this.type == ability_sabertoothJawAttack ||
        this.type == ability_trexShake ||
       
        this.type == ability_tigerSlash ||
        this.type == ability_pounce ||
        //this.type == ability_tigerJump ||
        this.type == ability_giraffeStomp ||
        this.type == ability_zebraKick ||
        this.type == ability_sharkBite ||
        this.type == ability_fart
      )
        this.z = 10001;
      //above all
      else if (this.type == ability_orcaWave) this.z = 1002;
      //above lake island, above hills
      else if (this.type == ability_waterSplash) this.z = 10001;
      //above lake island, above hills
      else if (this.type == ability_pelican) {
        if (this.specType == 1) this.z = 10001;
        //above lake island, above hills
        else if (this.specType == 2)
          // beak with animal
          this.z = 1013; // below animal grabbed
      } else this.z = -152; //below everything, but above ground stuff
      break;
    case o_hidingHoleOcean:
      this.z = -150;
      break;

    case o_bigHidingHole:
    
      this.z = -101;
        
      break;
    case o_hidingHole:
      this.z = -100;
      break;
    case o_healingStone:
      this.z = 1002;
      break;

    case o_hill:
      this.z = 999;
      
      break;
      case o_sleigh:
          this.z = -1 
          break;
      
    case o_poisonBerry:
    case o_arcticNut:
    case o_cloudBerry:
    case o_pear:
    case o_kelp:
    case o_seaweed:
        this.z = 999.5
        break;
           case o_gift:
        this.z = 999.6 
        break;
    case o_quill:
    case o_fruitTree:
      this.z = 1000; //above hill
      break;
    case o_honeyComb:
      this.z = 1002; //above all hills, just below drag
      break;
    case o_beeHive:
    case o_rockHill:
      this.z = 999.4; 
      break;
       
       case o_turkishflag:
      this.z = -1; 
      break;
    
    case o_spiderWeb:
      this.z = 1003;
      break;

    case o_berryBush: //above hill, and above tree-climbers
    case o_planktonBush:
      this.z = 1002 + this.rad;
      break;

    case o_hidingBush: //bushes hide everything
      this.z = 10000;
      break;

    case o_waterDrop:
      this.z = 1015; // splashes on top of all objects
      break;

    case o_coconut:
    case o_banana: //fruit shows up on top
      this.z = 1006;
      break;
    case o_fireTornado:
      this.z = 1002; 
      break;
   case o_firerange:
   this.z = 1005; //fireball just under dragon
   break;  
         
    case o_fireBall:
this.z = 1005; //fireball just under dragon
    case o_poisonBall:
      this.z = 1006; //fireball just under dragon
      break;

    case o_animal:
      if (this.flag_flying) {
        this.z = 10000;

        if (!this.flag_isGrabbed) this.z += this.rad;
        if (this.specType2 == 100) {
          // grabed by pelican
          this.z = 1014; // below water splash
        }
      } else {
        // if not flying then

        // if under water

        if (
          this.flag_underWater ||
          (this.flag_usingAbility && this.animalType == a_mole)
        ) {
          this.z = -100; //above lake and lake island
        } else {
          // not in under water!

          if (
            this.flag_usingAbility &&
            (this.animalType == a_eagle || this.animalType == a_pelican)
          )
            this.z = 10001 + this.rad;
          //flies even above blackdragon
          else if (
            this.flag_canClimbHill ||
            this.animalType == a_bear ||
            this.animalType == a_rhino ||
            this.animalType == a_gorilla ||
            this.animalType == a_polarBear ||
            this.animalType == a_crab ||
            this.animalType == a_turtle ||
            this.animalType == a_seal ||
            this.animalType == a_walrus ||
            this.animalType == a_yeti ||
            this.animalType == a_sabertoothTiger ||
            this.animalType == a_boaConstrictor ||
            this.animalType == a_giantSpider
          )
            this.z = 1000 + this.rad;

       
          else if (this.animalType == a_blackDragon) this.z = 1015 + this.rad;
          //flies above hill, water/food also 
    else if (this.animalType == a_dinoMonster) this.z = 1002 + this.rad;
          else if (this.animalType == a_iceMonster) this.z = 1003 + this.rad;
          
           else if (this.animalType == a_seaMonster) this.z = 1004 + this.rad;
             else if (this.animalType == a_landMonster) this.z = 1005 + this.rad;
    
          //flies above hill, water/food also
          else if (this.animalType == a_trex)
            this.z = 1008 + (this.flag_usingAbility ? 1 : 0) + this.rad;
          else if (this.animalType == a_dragn) this.z = 1007;
                   else if (this.animalType == a_griffin) this.z = 1005;
          else if (this.animalType ==  a_kingCrab) this.z = 1006;
          //flies above hill, water/food also
          else this.z = this.rad;
        }
      }

      break;
    default:
      this.z = this.rad;

      break;
  }
};

function GameObj(oType) {
  this.oType = oType;

  //spawn vars
  this.rPer = getRandomDouble(0, 1.0);
  this.spawnTime = timestamp;
  this.updateTime = timestamp;
  this.firstPosUpd = true; //for things like setting animal angle instantly

  //init certain vars in here, they arent shared
  this.chatLines = []; //certain objs can show chat (eg. hiding holes)

  //set general drawing vars (example)
  switch (this.oType) {
    case o_berry:
    case o_banana:

    case o_raspberry:
    case o_pear:
    case o_coconut:

    case o_water:
    case o_fireBall:
    case o_poisonBall:
    case o_spiderWeb:

    case o_mushroom:
    case o_bigMushroom:
    case o_lillypad:
    case o_hidingHole:
    case o_hidingHoleOcean:
    case o_bigHidingHole:

    //ocean food
    case o_plankton:
    case o_seaweed:
    case o_starfish:
    case o_kelp:
    case o_clam:
    case o_conchShell:
    case o_cloudBerry:
    case o_arcticNut:
    case o_carrot:
    case o_poisonBerry:
    case o_watermelon:
    case o_watermelonSlice:
    case o_meatSmall:
    case o_meatMedium:
    case o_meatLarge:
    case o_raspberrynew:
    case o_egg:
    case o_ostrichEgg:
    case o_quill:
    case o_beeHive:
    case o_honeyComb:
      this.doesDrawEffectScale = true;
      break;
    default:
      break;
  }

  if (
    this.oType == o_hidingHole ||
    this.oType == o_bigHidingHole ||
    this.oType == o_hidingHoleOcean ||
    this.oType == o_spiderWeb
  )
    this.drawEffectScale_Slow = true;
}

window.GameObj = GameObj;

//console.log("GameObj method: "+GameObj.factory_NewlyVisibleObjMessage);

//module.exports= GameObj; //sets the 'return' type if this module 'kinda like a class'


///////
// file: js_src/gameobj/GameObjBatchDraw.js
///////

//class for batch-drawing a list of GameObjs with the same z, implements gameObj-style  draw, z

//SUBCLASS! inherit prototype/properties from superclass
var subClass=GameObjBatchDraw;
var superClass=GameObj;
subClass.prototype = Object.create(superClass.prototype);  //properly inherit prototype of superclass
subClass.prototype.constructor = subClass;



function GameObjBatchDraw() {
  this.objs= [];


  this.updateZ= function() {
    //assumes all objs (of this type) will have same Z
    if (this.objs.length > 0) {
      this.objs[0].updateZ(); //force extra update (to be sure)
      this.z = this.objs[0].z;
    }
  };
  this.draw= function() {
    //console.log("drawing t "+this.oType+"batched os ("+this.objs.length+" objs) z="+this.z);
    //draw outline
    for (var i = 0; i < this.objs.length; i++) {
      var anObj = this.objs[i];
      anObj.draw(true);
      //console.log("->drawing batched o: "+anObj);
    }

    //draw rest of obj
    for (var i = 0; i < this.objs.length; i++) {
      var anObj = this.objs[i];
      anObj.draw(false);
    }

  };
  this.addBatchedObj=function(newObj) {
    if (this.objs.length == 0) {
      //this.z=newObj.z; //z may not be updated
      this.oType = newObj.oType;
      this.objs = [];
    }
    this.objs.push(newObj);
  };

}


//make this class globally acessible
window.GameObjBatchDraw=GameObjBatchDraw;

///////
// file: js_src/gameobj/ability/AbilityObj.js
///////

//thisClass! inherit prototype/properties from superclass
//global AbilityObj;
var thisClass = Particle;
var superClass = GameObj
thisClass.prototype = Object.create(superClass.prototype); //properly inherit prototype of superclass
thisClass.prototype.constructor = thisClass;
thisClass.superClass = superClass; //'class' var
Particle.prototype.particleType = p_confetti;
Particle.prototype.updateZ = function() {
  this.z = 100002;
 }
 Particle.prototype.customDraw = function(batchDrawOutline) {
  switch (this.particleType) {
     
    case p_confetti:
      {
          console.log('hi')
        ctx.save();
        var oldA = ctx.globalAlpha;
        //ctx.globalAlpha = 0.1 * oldA;
        //drawCircle(0, 0, this.rad, "#755A2A");

        ctx.globalAlpha = 1.0 * oldA;
        var theImg = getLoadedImg("img/particle/confettis.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          var rad = this.rad - 2.5;
          ctx.rotate(this.angle);
          //clip to sliwly show the claw
          ctx.drawImage(
            theImg,
            0,
            0,
            theImg.width * fac0to1,
            theImg.height,
            -rad,
            -rad,
            2 * rad * fac0to1,
            2 * rad
          ); //sx,sy,swidth,sheight,x,y,width,height);
          //ctx.drawImage(theImg, );
          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
  }
 }
 Particle.prototype.setObjTypes = function(oType, secondaryType) {
  this.oType = oType;
  this.particleType = secondaryType; //secondaryType can be different for eg.
};
 
function Particle() {
  Particle.superClass.call(this, o_particles); //call superclass init method (if needed, or write a new one below)
  //  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@AbilityObj constructor run");
}

window.Particle = Particle; //make class global!

//add this class as a thisClass for the right oType!
GameObjType.setCustomClassForGameObjType(Particle, o_particles);

var thisClass = AbilityObj;
var superClass = GameObj;
thisClass.prototype = Object.create(superClass.prototype); //properly inherit prototype of superclass
thisClass.prototype.constructor = thisClass;
thisClass.superClass = superClass; //'class' var

AbilityObj.prototype.abilityType = ability_stingRayShock;
AbilityObj.prototype.showHalloweenSkins = true;

//call on draw
AbilityObj.prototype.updateZ = function() {
  ///web.archive.org/web/20201010193727/http://console.log("inside ability updateZ: " + this.abilityType);

  if (
    this.abilityType == ability_eagleAttack ||
    this.abilityType == ability_falconAttack ||
    this.abilityType == ability_thunderbirdAttack ||
    this.abilityType == ability_owlAttack ||
    this.abilityType == ability_targetCircle ||
    this.abilityType == ability_bearSlash
  ) {
    this.z = 100002;
  }
  //if(this.abilityType==ability_krakenSpec || this.abilityType==ability_stingRayShock || this.abilityType==ability_squidInk)
  else if (
    this.abilityType == ability_bearSlash ||
    this.abilityType == ability_iceSlide ||
    this.abilityType == ability_clawSlash ||
    this.abilityType == ability_backLegKick ||
    this.abilityType == ability_whaleTailHit ||
    this.abilityType == ability_finalhit||
     this.abilityType == ability_freezeprey||
    this.abilityType == ability_elephantTrunkSmack ||
    this.abilityType == ability_crabSmash ||
   
    this.abilityType == ability_crocWaterGrab ||
    this.abilityType == ability_boaSuffocate ||
    this.abilityType == ability_sabertoothJawAttack ||
    this.abilityType == ability_trexShake ||
    this.abilityType == ability_tigerSlash ||
    this.abilityType == ability_pounce ||
    //this.abilityType == ability_tigerJump ||
    this.abilityType == ability_giraffeStomp ||
    this.abilityType == ability_zebraKick ||
    this.abilityType == ability_sharkBite ||
    this.abilityType == ability_fart
  )
    this.z = 10001;
  //above all
  else if (
    this.abilityType == ability_orcaWave ||
    this.abilityType == ability_tsunamiWave ||
    this.abilityType == ability_tsunamiWave
  )
    this.z = 1002;
  //above lake island, above hills
  else if (this.abilityType == ability_waterSplash) this.z = 10001;
  //above lake island, above hills
  else if (this.abilityType == ability_pelican) {
    if (this.specType == 1) this.z = 10001;
    //above lake island, above hills
    else if (this.specType == 2)
      // beak with animal
      this.z = 1013; // below animal grabbed
  } else this.z = -152; //below everything, but above ground stuff
};
//subclassable part of draw()
AbilityObj.prototype.customDraw = function(batchDrawOutline) {
  switch (this.abilityType) {
    case ability_ostrich:
    case ability_hedgehogAttack: {
      // do nothing!
      break;
    }
    case ability_yetiTransform:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.4 * oldA;
        drawCircle(0, 0, this.rad, "#7EBCC0");

        //snowflake
        ctx.globalAlpha = 1.0 * oldA;
        ctx.strokeStyle = "white";
        ctx.beginPath();

        var wid = 10;
        //make X on 3 axis

        ctx.translate(-5, this.rad * -0.7);
        ctx.moveTo(0, -wid); //vertical lineTo
        ctx.lineTo(0, wid);
        ctx.moveTo(-wid, -wid);
        ctx.lineTo(wid, wid);
        ctx.moveTo(wid, -wid);
        ctx.lineTo(-wid, wid);
        ctx.moveTo(-wid, 0);
        ctx.lineTo(wid, 0);
        ctx.lineWidth = 3.0;
        ctx.stroke();
        ctx.restore();
      }
      break;

    case ability_extraBoost:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.15 * oldA;
        drawCircle(0, 0, this.rad, "#755A2A");

        ctx.restore();
      }
      break;
    case ability_sabertoothJawAttack:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        //ctx.globalAlpha = 0.1 * oldA;
        //drawCircle(0, 0, this.rad, "#755A2A");

        ctx.globalAlpha = 1.0 * oldA;
        var theImg = getLoadedImg("img/ability_sabertoothJawAttack.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          var rad = this.rad - 2.5;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          //clip to sliwly show the claw
          ctx.drawImage(
            theImg,
            0,
            0,
            theImg.width * fac0to1,
            theImg.height,
            -rad,
            -rad,
            2 * rad * fac0to1,
            2 * rad
          ); //sx,sy,swidth,sheight,x,y,width,height);
          //ctx.drawImage(theImg, );
          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_clawSlash:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        //ctx.globalAlpha = 0.1 * oldA;
        //drawCircle(0, 0, this.rad, "#755A2A");

        ctx.globalAlpha = 1.0 * oldA;
        var theImg = getLoadedImg("/img/ability_claw.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          var rad = this.rad - 2.5;
          ctx.rotate(this.rPer * Math.PI * 2.0);
          //clip to sliwly show the claw
          ctx.drawImage(
            theImg,
            0,
            0,
            theImg.width * fac0to1,
            theImg.height,
            -rad,
            -rad,
            2 * rad * fac0to1,
            2 * rad
          ); //sx,sy,swidth,sheight,x,y,width,height);
          //ctx.drawImage(theImg, );
          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_finalhit:
    {
        console.log(this.specType)
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.1 * oldA;
        drawCircle(0, 0, this.rad, "#475AD4");

        ctx.globalAlpha = 1.0 * oldA;
    
 
        var theImg = getLoadedImg("skins/kingdragon/" + this.specType +
        "/tail.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.85;
          ctx.rotate(this.angle);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
    break;
    case ability_whaleTailHit:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.1 * oldA;
        drawCircle(0, 0, this.rad, "#5B7EC7");

        ctx.globalAlpha = 1.0 * oldA;
        var skinFolder = "img";
        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        var theImg = getLoadedImg("img/ability_whaleTailHit.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.85;
          ctx.rotate(this.angle);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
          case ability_freezeprey:
    {
                 var theImg = getLoadedImg("skins/monsters/icemonster/crystalfire.png");
                  if (theImg) {
                    ctx.save();
                    var rad = this.rad;
                  ctx.rotate(this.angle);
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2.5 * rad);
                    ctx.restore();
            
                    //console.log("drawing banana");
                  }
                }
            
    
    break;
    case ability_bearSlash:
      {
        var oldA = ctx.globalAlpha;

        ctx.save();
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 1.5;
        var shiftAm = 1.0;
        var moveA =
          shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        var theA = ctx.globalAlpha;
        ctx.globalAlpha *= 0.6 * moveA; //- 0.2 * moveA;
        ctx.rotate(this.angle);
        ctx.globalAlpha = 0.15 * oldA;
        if (this.specType2 == 0) drawCircle(0, 0, this.rad, "#96661C");
        else drawCircle(0, 0, this.rad, "#e0dfde");

        ctx.restore();
        ctx.save();

        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        var theImg = getLoadedImg(
        "/img/ability_bearSlash0.png"
        );
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);
          var rotfac0to1 = clamp(
            (timestamp - this.spawnTime) / 300.0,
            0.0,
            1.0
          ); //delay rotate animation a bit
          var extraRotate = -(-0.5 + rotfac0to1) * toRadians(90.0); //spin animation

          //clip to sliwly show the claw

          var angle = this.angle; // + (toRadians(45) * (Math.random() > 0.5 ? -1 : 1));
          ctx.rotate(this.angle + extraRotate * (this.specType == 0 ? 1 : -1));

          //ctx.rotate(angle);
          //clip to sliwly show the claw
          var rad = -this.rad * 1;
          //ctx.rotate(toRadians(180));
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.8; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY + rad,
            imW,
            imH
          );

          //console.log("drawing banana");
        }
        ctx.restore();
        /*
                              ctx.save();
                                var oldA = ctx.globalAlpha;
                                //ctx.globalAlpha = 0.1 * oldA;
                                //drawCircle(0, 0, this.rad, "#755A2A");
  
                                ctx.globalAlpha = 1.0 * oldA;
                                var theImg = getLoadedImg("img/ability_claw.png");
                                if (theImg) {
                                  var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);
  
                                  var rad = this.rad - 2.5;
                                  ctx.rotate(this.angle);
                                  //clip to sliwly show the claw
                                  ctx.drawImage(theImg, this.rad, 0, theImg.width * fac0to1, theImg.height, -rad, -rad, 2 * rad * fac0to1, 2 * rad);
                                }
  
  
                                ctx.restore();
                              */
      }
      break;

    case ability_fart:
      {
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var frame = getAnimFrame(tSinceSpawn, 1, 0.1, 1);

        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.1 - frame;
        //	drawCircle(0, 0, this.rad, "brown");
        ctx.restore();

        ctx.save();
        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.fillStyle = "white";
        var drawRad = this.rad * 0.7;

        ctx.globalAlpha = 0.3 - frame;

        //this.drawOutlinedCircle("", "white"); //"#00B343");

        var dx = -drawRad * 0.6,
          dy = -drawRad * 0.5 + 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.65 + rShift) + 2;
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, "#654321"); //outline

        var dx = drawRad * 0.5,
          dy = -drawRad * 0.5 - 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.73 - rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, "#654321"); //outline
        var dx = drawRad * 0.6,
          dy = drawRad * 0.5,
          drad = Math.max(0, drawRad * 0.78 + rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, "#654321"); //outline

        var dx = -drawRad * 0.5,
          dy = drawRad * 0.5 + 10.0 * this.rPer,
          drad = Math.max(0, drawRad * 0.6 + this.rPer - rShift);
        //drawCircle(dx, dy, drad+2, col_outline_land); //outline
        drawCircle(dx, dy, drad, "#654321"); //outline

        ctx.restore();
      }
      break;
    case ability_eagleAttack:
      {
        //ctx.globalAlpha = 0.5;
        //drawCircle(0, 0, this.rad, "red");
      }
      break;
case ability_thunderbirdAttack:
      {
        // do nothing.
        //ctx.globalAlpha = 0.2;
        //drawCircle(0, 0, this.rad, "limegreen");
      }
      break;

    case ability_falconAttack:
      {
        // do nothing.
        //ctx.globalAlpha = 0.2;
        //drawCircle(0, 0, this.rad, "limegreen");
      }
      break;

    case ability_honeyBee:
      {
        // do nothing.
        //ctx.globalAlpha = 0.2;
        // drawCircle(0, 0, this.rad, "red");
      }
      break;
    case ability_phoenix:
      {
        //ctx.globalAlpha = 0.5;
        // drawCircle(0, 0, this.rad, "#ef6e24");
      }
      break;

    case ability_targetCircle:
      {
        this.drawEffectScale_Slow = true;
        this.doesDrawEffectScale = true;

        ctx.globalAlpha = 0.2;
        drawCircle(0, 0, this.rad * 0.85, "white");

        //console.log(this.specType);
        var spec = this.specType == 3 ? "_e" : "";

        var theImg = getLoadedImg("img/target" + spec + ".png");
        if (theImg) {
          var rad = this.rad;
          ctx.save();
          ctx.globalAlpha = 0.5; //this.specType  == 3 ? 1 : 0.5;
          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }

        ctx.save();
        if (this.is1v1Target && this.timerTxt != null) {
          ctx.globalAlpha = 1;
          this.timerTxt.x = 0;
          this.timerTxt.y = 0;
          this.timerTxt.draw();
        }
        ctx.restore();
      }
      break;
    case ability_owlAttack:
      {
        ctx.globalAlpha = 0.5;
        //drawCircle(0, 0, this.rad, "white");
      }
      break;

    case ability_crabSmash:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.05 * oldA;
        drawCircle(0, 0, this.rad, "#B32E10");

        ctx.globalAlpha = 1.0 * oldA;
        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "img/";

        var theImg = getLoadedImg(
          "img/ability_crabSmash" + this.specType+".png"
        );
        if (theImg) {
          //var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 300.0);

          var rotfac0to1 = clamp(
            (timestamp - this.spawnTime) / 200.0,
            0.0,
            1.0
          ); //delay rotate animation a bit
          var mf = this.specType == 1 ? -1 : 1;
          var extraRotate = -(-0.2 + rotfac0to1) * toRadians(-90.0 * mf); //spin animation
          extraRotate = mf * (0.3 + rotfac0to1) + toRadians(mf * -30); //spin animation
          //	extraRotate = -(0.3 + rotfac0to1) + toRadians(30); //spin animation

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle + extraRotate);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0 * 0.7,
            imH = rad * 2.0; // * fac0to1;
          var imAnchorX = 0.75,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          if (this.specType == 1) {
            (imAnchorX = 0.25), (imAnchorY = 0.95); //top-left= 0,0, bottom-right=1,1 (canvas coords)
          }
          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_elephantTrunkSmack:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.05 * oldA;
        drawCircle(0, 0, this.rad, "#E4E7C8");

        ctx.globalAlpha = 1.0 * oldA;

        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

         var theImg = getLoadedImg(
          skinFolder + "/ability_elephantTrunkSmack.png"
        );
        if (theImg) {
          //var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 300.0);

          var rotfac0to1 = clamp(
            (timestamp - this.spawnTime) / 300.0,
            0.0,
            1.0
          ); //delay rotate animation a bit
          var extraRotate = -(-0.5 + rotfac0to1) * toRadians(90.0); //spin animation

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle + extraRotate);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0 * 0.7,
            imH = rad * 2.0; // * fac0to1;
          var imAnchorX = 0.75,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
  
    case ability_backLegKick:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.1 * oldA;
        drawCircle(0, 0, this.rad, "#755A2A");

        ctx.globalAlpha = 1.0 * oldA;
        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        var theImg = getLoadedImg(skinFolder + "/ability_backkick.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_crocWaterGrab:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.25 * oldA;
        drawCircle(0, 0, this.rad, "#44d31f");

        ctx.globalAlpha = 1.0 * oldA;
        var theImg = getLoadedImg("img/ability_crocBite.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);

          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //clip to sliwly show the claw
          //var rad=this.rad * 0.85;
          ctx.rotate(Math.PI);
          var imX = 0,
            imY = this.rad * 0.5;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;

    case ability_boaSuffocate:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.25 * oldA;
        drawCircle(0, 0, this.rad, "#44d31f");

        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        ctx.globalAlpha = 1.0 * oldA;
        var theImg = getLoadedImg(skinFolder + "/ability_boaBite.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);

          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //clip to sliwly show the claw
          //var rad=this.rad * 0.85;
          ctx.rotate(Math.PI);
          var imX = 0,
            imY = this.rad * 0.5;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    // trex update abilities
    case ability_tigerJump:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.1 * oldA;
        drawCircle(0, 0, this.rad, "#755A2A");

        ctx.globalAlpha = 1.0 * oldA;

        var skinFolder = "skins";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie";

        var theImg = getLoadedImg(
          skinFolder + "/tiger/" + this.specType2 + "/ability_tigerJump.png"
        );
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 100.0);

          //clip to sliwly show the claw
          var rad = this.rad * 1.1;
          ctx.rotate(this.angle);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 1; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;

    case ability_pounce:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.05 * oldA;
        drawCircle(0, 0, this.rad, "#44d31f");

        ctx.globalAlpha = 1.0 * oldA;
        var theImgUpper = getLoadedImg("img/ability_pounce2.png");
        var theImgLower = getLoadedImg("img/ability_pounce1.png");

        if (theImgUpper && theImgLower) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.4;
          ctx.rotate(this.angle);

          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImgUpper,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //clip to sliwly show the claw
          //var rad=this.rad * 0.85;
          //ctx.rotate(Math.PI);
          rad = this.rad * 0.6;
          var imX = 0,
            imY = this.rad * 0.5;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImgLower,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );
        }

        ctx.restore();
      }
      break;

    case ability_tigerSlash:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.05 * oldA;
        drawCircle(0, 0, this.rad, "#E4E7C8");

        ctx.globalAlpha = 1.0 * oldA;

        var img =
          "skins/tiger/" +
          this.specType2 +
          "/ability_tigerSlash" +
          this.specType +
          ".png";

        var theImg = getLoadedImg(img);

        if (theImg) {
          //var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 300.0);

          var rotfac0to1 = clamp(
            (timestamp - this.spawnTime) / 300.0,
            0.0,
            1.0
          ); //delay rotate animation a bit
          var extraRotate =
            (this.specType == 1 ? 1 : -1) *
            (-0.6 + rotfac0to1) *
            toRadians(90.0); //spin animation

          //clip to sliwly show the claw
          var rad = this.rad * 1.2;
          ctx.rotate(this.angle + extraRotate);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0 * 0.7,
            imH = rad * 2.0; // * fac0to1;
          var imAnchorX = 0.2,
            imAnchorY = 0.5; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_zebraKick:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.1 * oldA;
        drawCircle(0, 0, this.rad, "#755A2A");

        ctx.globalAlpha = 1.0 * oldA;

        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        var theImg = getLoadedImg(skinFolder + "/ability_zebraKick.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 3.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 1; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_giraffeStomp:
      {
        var oldA = ctx.globalAlpha;

        ctx.save();
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 1.5;
        var shiftAm = 1.0;
        var moveA =
          shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        var theA = ctx.globalAlpha;
        ctx.globalAlpha *= 0.6 * moveA; //- 0.2 * moveA;
        ctx.rotate(this.angle);
        ctx.globalAlpha = 0.15 * oldA;
        //drawCircle(0, 0, this.rad, "#E4E7C8");
        drawCircle(
          this.rad * 0.3,
          0,
          this.rad * (0.9 + 0.12 * moveA),
          "#E4E7C8"
        );
        drawCircle(
          -this.rad * 0.3,
          0,
          this.rad * (1.05 + 0.09 * moveA),
          "#E4E7C8"
        );
        ctx.globalAlpha = theA;
        ctx.restore();
        ctx.save();

        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        var theImg = getLoadedImg(skinFolder + "/ability_giraffeStompLeg.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          var angle = this.angle; // + (toRadians(45) * (Math.random() > 0.5 ? -1 : 1));
          ctx.rotate(angle);
          //clip to sliwly show the claw
          var rad = -this.rad * 1;
          //ctx.rotate(toRadians(180));
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.8; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY + rad,
            imW,
            imH
          );

          //console.log("drawing banana");
        }
        ctx.restore();

        /*
                var bubbles = 1
                for (i = 1; i <= bubbles; i++) {
                  ctx.save();
  
                  ctx.fillStyle = "#6183d3";
                  ctx.globalAlpha = 0.1;
                  ctx.rotate(this.rPer * Math.PI * 2.0 * i);
                  ctx.beginPath(); //top left, right
                  ctx.arc(0, this.rad * 0.3, this.rad * (0.9 + 0.12 * moveA), 0, Math.PI * 2);
                  ctx.fill();
                  ctx.beginPath();
                  ctx.arc(0, -this.rad * 0.3, this.rad * (1.05 + 0.09 * moveA), 0, Math.PI * 2);
                  ctx.fill();
  
                   ctx.restore();
                }
                */

        /*
                                  ctx.save();
                                  var oldA = ctx.globalAlpha;
  
                                  ctx.globalAlpha = 0.1 * oldA;
                                  drawCircle(0, 0, this.rad, "#755A2A");
  
                                  ctx.globalAlpha = 1.0 * oldA;
                                  var theImg = getLoadedImg("img/ability_giraffeStomp.png");
                                  if (theImg) {
                                      var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);
  
                                      //clip to sliwly show the claw
                                      var rad = this.rad * 1.0;
                                      ctx.rotate(this.angle + toRadians(180));
                                      var imX = 0,
                                          imY = this.rad;
                                      var imW = (rad * 2.0),
                                          imH = (rad * 2.0) * fac0to1;
                                      var imAnchorX = 0.5,
                                          imAnchorY = 1.2; //top-left= 0,0, bottom-right=1,1 (canvas coords)
  
                                      ctx.drawImage(theImg, imX + (imW) * (-imAnchorX), imY + (imH) * (-imAnchorY), imW, imH);
  
                                      //console.log("drawing banana");
                                  }
  
  
                                  ctx.restore();
                                  */
      }
      break;
    case ability_sharkBite:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.15 * oldA;

        ctx.globalAlpha = 1.0 * oldA;

        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";

        var theImg = getLoadedImg("img/ability_sharkBite.png");

        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);

          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //clip to sliwly show the claw
          //var rad=this.rad * 0.85;
          ctx.rotate(Math.PI);
          var imX = 0,
            imY = this.rad * 0.5;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 1.35; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }
        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";
        var theImg = getLoadedImg(skinFolder + "/shark-head.png");
        if (theImg) {
          var frame = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);
          ctx.globalAlpha = 0.9;
          //clip to sliwly show the claw
          var rad = -this.rad * 1.75;
          ctx.rotate(toRadians(180));
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * frame;
          var imAnchorX = 0.5,
            imAnchorY = 0.5; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY + rad,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;
    case ability_waterSplash:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.5 * oldA;
        var rad = this.rad;

        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.2;
        var xShift = 6.5 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
        var yShift = 6.5 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.globalAlpha = 0.3 * oldA;
        drawCircle(0, 0, rad, "#2CAAC4");

        ctx.globalAlpha = 0.5 * oldA;

        drawCircle(
          0 + xShift / 4.5 + this.rPer,
          1 + yShift / 1.5,
          Math.max(0, rad - 14),
          "#29A0BA"
        );
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, rad - 38.5 + yShift / 5),
          "#2B8CAA"
        );
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, rad - 54.5 + yShift / 11),
          "#28829E"
        );
        ctx.restore();
      }
      break;
    case ability_pelican: {
      if (this.specType == 0 || this.specType == 2) {
        ctx.save();
        //drawCircle(0, 0, this.rad, "red");
        var btype = ""; //this.specType == 0 ? "" : "2";
        var theImg = getLoadedImg(
          "skins/pelican/ability_pelican" + btype + ".png"
        );
        if (theImg) {
          //clip to sliwly show the claw
          var rad = -this.rad * 1.5;
          ctx.rotate(this.angle);
          var imX = 0,
            imY = this.rad;
          var imW = rad,
            imH = rad;
          var imAnchorX = 0.5,
            imAnchorY = 0.5; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY + rad,
            imW,
            imH
          );
        }

        ctx.restore();
      }
      break;
    }
      case ability_trexShake:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        ctx.globalAlpha = 0.15 * oldA;
        //drawCircle(0, 0, this.rad, "#862A2A");

        ctx.globalAlpha = 1.0 * oldA;

        var theImg = getLoadedImg("img/ability_trexBite.png");

        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = this.rad * 0.6;
          ctx.rotate(this.angle);

          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //clip to sliwly show the claw
          //var rad=this.rad * 0.85;
          ctx.rotate(Math.PI);
          var imX = 0,
            imY = this.rad * 0.5;
          var imW = rad * 2.5,
            imH = rad * 2.5 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );

          //console.log("drawing banana");
        }
        var skinFolder = "img";

        if (_gameMode.isHalloween) skinFolder = "skins/ability_skins";

        var theImg = getLoadedImg(skinFolder + "/trex-head.png");
        if (theImg) {
          var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 200.0);

          //clip to sliwly show the claw
          var rad = -this.rad * 1.5;
          ctx.rotate(toRadians(180));
          var imX = 0,
            imY = this.rad;
          var imW = rad * 2.0,
            imH = rad * 2.0 * fac0to1;
          var imAnchorX = 0.5,
            imAnchorY = 0.5; //top-left= 0,0, bottom-right=1,1 (canvas coords)

          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY + rad,
            imW,
            imH
          );

          //console.log("drawing banana");
        }

        ctx.restore();
      }
      break;


    // trex update end
    case ability_wolfHowl:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.15 * oldA;
        drawCircle(0, 0, this.rad, "#6D7471");
        ctx.restore();
      }
      break;
    case ability_cobraVenomSpit:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.15 * oldA;
        drawCircle(0, 0, this.rad, "#6D7471");
        ctx.restore();
      }
      break;
    case ability_spiderWeb:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.15 * oldA;
        drawCircle(0, 0, this.rad, "#f2f2f2");
        ctx.restore();
      }
      break;
    case ability_tsunamiWave:
    case ability_orcaWave:
      {
        ctx.save();
        if (this.abilityType == ability_tsunamiWave)
          ctx.rotate(this.angle - toRadians(90.0));
        else ctx.rotate(this.angle + toRadians(180.0));

        var oldA = ctx.globalAlpha;
        //ctx.globalAlpha = 0.1 * oldA;
        //drawCircle(0, 0, this.rad, "#1898BD");

        ctx.globalAlpha = 0.8 * oldA;
        var theImg = getLoadedImg("img/wave.png");
        if (theImg) {
          var rad = this.rad;

          ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
          //console.log("drawing banana");
        }
        ctx.restore();
      }
      break;
    case ability_lionRoar:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.2 * oldA;
        drawCircle(0, 0, this.rad, "#746B3E");
        ctx.restore();
      }
      break;
    case ability_stingRayShock:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.5 * oldA;
        drawCircle(0, 0, this.rad, "#62C5FF");

        //bolt
        ctx.globalAlpha = 1.0 * oldA;
        ctx.strokeStyle = "#62C5FF";
        ctx.beginPath();
        var px = this.rad * -0.7,
          py = -5;
        var boltSz = 10;
        ctx.moveTo(px, py);
        ctx.lineTo(px - boltSz * 0.4, py + boltSz);
        ctx.lineTo(px + boltSz * 0.4, py + boltSz * 0.7);
        ctx.lineTo(px + boltSz * 0.4 * 0.5, py + boltSz * 2);
        ctx.lineWidth = 3.0;
        ctx.stroke();

        ctx.restore();
      }
      break;
    case ability_seaMonsterSpec:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.5 * oldA;
        var rad = Math.max(0, this.rad - 30);

        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.2;
        var xShift = 6.5 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
        var yShift = 6.5 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.globalAlpha = 0.05 * oldA;
        drawCircle(0, 0, rad, "#2CAAC4");

        ctx.globalAlpha = 0.05 * oldA;
        if (!options_lowGraphics) {
          drawCircle(
            0 + xShift / 2 - this.rPer,
            0 + yShift / 2 - this.rPer,
            Math.max(0, rad - 6),
            "#2D93B0"
          );
        }
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, rad - 54.5 + yShift / 11),
          "#28829E"
        );

        ctx.restore();
        ctx.save();
        var oldA = ctx.globalAlpha;

        var rad = Math.max(0, this.rad - 30);

        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 3.2;
        var xShift = 30 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
        var yShift = 30 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.globalAlpha = 0.05 * oldA;
        drawCircle(0, 0, rad, "white");
        drawCircle(
          0 + xShift / 2 - this.rPer,
          0 + yShift / 2 - this.rPer,
          Math.max(0, rad * 0.95),
          "white"
        );
        drawCircle(
          0 + xShift / 4.5 + this.rPer,
          1 + yShift / 1.5,
          Math.max(0, rad * 0.85),
          "white"
        );

        ctx.restore();

        var tornado = getLoadedImg("img/whirlpool2.png");
        if (tornado) {
          var rad = this.rad;

          var rps = 5 / 60;
          var rotationTms = 1000 / rps; //ms to one full movement- t=dist * v
          var fac0to1 =
            ((timestamp - this.spawnTime) % rotationTms) / rotationTms;
          var rotation1 = fac0to1 * 2 * Math.PI;

          rps = 8 / 60;
          rotationTms = 1000 / rps; //ms to one full movement- t=dist * v
          fac0to1 = ((timestamp - this.spawnTime) % rotationTms) / rotationTms;
          rotation2 = fac0to1 * 2 * Math.PI;

          ctx.save();
          ctx.rotate(rotation1);
          //ctx.drawImage(tornado, -rad, -rad, 2 * rad, 2 * rad);

          var oldA = ctx.globalAlpha;
          ctx.globalAlpha = 1 * oldA;
          //var rad = Math.max(0, this.rad - 30);

          var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
          var period = 2.2;
          var xShift = 6.5 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
          var yShift = 6.5 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

          ctx.globalAlpha = 0.2;
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.1;
          ctx.rotate(rotation2 * 0.8);
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.2;
          ctx.rotate(rotation2);
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.2;
          ctx.rotate(rotation2);
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.2;
          ctx.rotate(rotation1);
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.2;
          ctx.rotate(rotation1);
          ctx.drawImage(tornado, -rad - xShift / 2.2, -rad, 2 * rad, 2 * rad);
          ctx.restore();
        }
      }
      break;

    case ability_krakenSpec:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.5 * oldA;
        var rad = Math.max(0, this.rad - 30);

        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 2.2;
        var xShift = 6.5 * Math.cos(((2.0 * Math.PI) / period) * tSinceSpawn);
        var yShift = 6.5 * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        ctx.globalAlpha = 0.4 * oldA;
        drawCircle(0, 0, rad, "#2CAAC4");

        ctx.globalAlpha = 0.7 * oldA;
        if (!options_lowGraphics) {
          drawCircle(
            0 + xShift / 2 - this.rPer,
            0 + yShift / 2 - this.rPer,
            Math.max(0, rad - 6),
            "#2D93B0"
          );
        }
        drawCircle(
          0 + xShift / 4.5 + this.rPer,
          1 + yShift / 1.5,
          Math.max(0, rad - 14),
          "#29A0BA"
        );
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, rad - 38.5 + yShift / 5),
          "#2B8CAA"
        );
        drawCircle(
          0 + xShift / 1.5 - this.rPer * 2,
          yShift,
          Math.max(0, rad - 54.5 + yShift / 11),
          "#28829E"
        );

        ctx.restore();
      }
      break;
    case ability_squidInk:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;

        if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

        var rShift = 0;
        var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
        var period = 6.0;
        var shiftAm = 1.5;
        rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

        //console.log("Mud");
        ctx.globalAlpha = 0.7 * oldA;
        //green outline (without stroke- optimized)
        var strokeW = 4;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
        ctx.fill();

        if (!options_lowGraphics) {
          ctx.fillStyle = "black";
          ctx.globalAlpha = 0.5 * oldA;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            Math.max(0, this.rad - strokeW + rShift),
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.beginPath(); //top right
          ctx.arc(
            this.rad * 0.45,
            -this.rad * 0.45 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath(); //bottom right
          ctx.arc(
            this.rad * 0.5,
            this.rad * 0.5 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.4 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath(); //bottom left
          ctx.arc(
            -this.rad * 0.55 * 0.707,
            +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.5 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            -this.rad * 0.75,
            -this.rad * 0.35 + 15.0 * this.rPer,
            Math.max(0, this.rad * 0.3 + rShift),
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.beginPath();
          ctx.arc(
            this.rad - 20 * this.rPer,
            50 * this.rPer,
            10,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
        }

        ctx.restore();
      }
      break;
    case ability_makeHidingHole:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.25 * oldA;
        drawCircle(0, 0, this.rad, "#9F8641");

        ctx.restore();
      }
      break;

    case ability_foxhidingHoleKickout:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.25 * oldA;
        drawCircle(0, 0, this.rad, "#785228");

        ctx.restore();
      }
      break;

    default:
      {
        ctx.save();
        var oldA = ctx.globalAlpha;
        ctx.globalAlpha = 0.15 * oldA;
        drawCircle(0, 0, this.rad, "black");

        ctx.restore();
      }
      break;
  }
};

//this method is important in the subclassing hierachry
AbilityObj.prototype.setObjTypes = function(oType, secondaryType) {
  this.oType = oType;
  this.abilityType = secondaryType; //secondaryType can be different for eg.
};

//override this to read in custom spawn data
AbilityObj.prototype.readCustomData_onNewlyVisible = function(msg) {
  AbilityObj.superClass.prototype.readCustomData_onNewlyVisible.call(this, msg);

  //console.log("reading ABILITY ONNEWLYVIS");
  this.specType = msg.readUInt8();
  this.specType2 = msg.readUInt8();

  //start at 0 rad! (animate in, by default it doesnt)
  if (
    this.abilityType == ability_yetiTransform ||
    this.abilityType == ability_wolfHowl ||
    this.abilityType == ability_orcaWave ||
    this.abilityType == ability_tsunamiWave ||
    this.abilityType == ability_lionRoar ||
    this.abilityType == ability_foxhidingHoleKickout
  ) {
    this.rad = this.oRad = 0;
  }
};

AbilityObj.prototype.readCustomData_onUpdate = function(msg) {
  AbilityObj.superClass.prototype.readCustomData_onUpdate.call(this, msg); //call superclass version of this method

  //console.log("reading ABILITY ONUPDATE");
  this.specType = msg.readUInt8();
  this.specType2 = msg.readUInt8();

  this.is1v1Target = msg.readUInt8() == 1;

  if (this.is1v1Target) {
    this.timer = msg.readUInt16() / 100.0;
    if (this.timer < 15) this.updateTimer();
  }
};

AbilityObj.prototype.updateTimer = function() {
  this.timer = Math.round(this.timer);

  var txt = this.timer;

  this.setTimer(txt);
};
AbilityObj.prototype.timerTxt = null;

AbilityObj.prototype.setTimer = function(a) {
  var txt = "" + a;
  if (null == this.timerTxt) {
    this.timerTxt = new CachedText(20, "#FFFFFF"); //"#043400");
    this.timerTxt.strokeW = 2;
    this.timerTxt.multiLine = true;
    this.timerTxt.renderScale = 5.0;
    this.timerTxt.setText(txt);
  } else {
    this.timerTxt.setFontSize(20);
    this.timerTxt.setText(txt);
  }
};

function AbilityObj() {
  AbilityObj.superClass.call(this, o_abilityGObj); //call superclass init method (if needed, or write a new one below)

  //  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@AbilityObj constructor run");
}

window.AbilityObj = AbilityObj; //make class global!

//add this class as a thisClass for the right oType!
GameObjType.setCustomClassForGameObjType(AbilityObj, o_abilityGObj);
///////
// file: js_src/gameobj/ability/AbilityObjElephant.js
///////

var thisClass = AbilityObjSpear;
var superClass = AbilityObj;
thisClass.prototype = Object.create(superClass.prototype);
thisClass.prototype.constructor = thisClass;
thisClass.superClass = superClass;
AbilityObj.prototype.victimID = 0;
AbilityObjSpear.prototype.updateZ = function () {
    this.effect_flying ? this.z = 100000 : 0 == this.victimID && (this.z = 1100);
};
AbilityObjSpear.prototype.customDraw = function (_0x423c5e) {
    ctx.save();
    if (0 == this.specType) {
        if (_0x423c5e = getLoadedImg('skins/bigfoot/spear.png')) {
            ctx.save();
            var _0xd67ac0 = 2 * this.rad;
            ctx.rotate(this.angle + toRadians(90));
            ctx.drawImage(_0x423c5e, -_0xd67ac0 / 2, -_0xd67ac0 / 2, _0xd67ac0, 4 * _0xd67ac0);
            ctx.restore();
        }
    } else if (3 == this.specType) {
        ctx.save();
        if (_0x423c5e = getLoadedImg('skins/bigfoot/spear2.png')) _0xd67ac0 = 2 * this.rad, ctx.rotate(this.angle + toRadians(90)), ctx.drawImage(_0x423c5e, -_0xd67ac0 / 2, -_0xd67ac0 / 2, _0xd67ac0, 4 * _0xd67ac0);
        ctx.restore();
    } else if (_0x423c5e = getLoadedImg('skins/bigfoot/arm' + (this.specType + (1 == this.specType2 ? '1' : '')) + '.png')) {
  
      var _0x24150b = Math.min(1, (timestamp - this.spawnTime) / 200),
            _0xd67ac0 = -clamp((timestamp - this.spawnTime) / 300, 0, 1) * toRadians(90);
        ctx.rotate(this.angle + _0xd67ac0 * (1 == this.specType ? 1 : -1));
      var ae_0xd67ac0 = 2 * this.rad;  
      var _0xd67ac0 = 1.5 * -this.rad,
            _0x41fc4a = 2 * _0xd67ac0,
            _0x24150b = 2 * _0xd67ac0 * _0x24150b;
        ctx.drawImage(_0x423c5e, ae_0xd67ac0/2, ae_0xd67ac0 /2, _0x41fc4a, _0x24150b);
    }
    ctx.restore();
};
AbilityObjSpear.prototype.effect_flying = true;
AbilityObjSpear.prototype.readCustomData_onNewlyVisible = function (_0x4e70ff) {
    AbilityObjSpear.superClass.prototype.readCustomData_onNewlyVisible.call(this, _0x4e70ff);
};
AbilityObjSpear.prototype.readCustomData_onUpdate = function (_0x304c65) {
    AbilityObjSpear.superClass.prototype.readCustomData_onUpdate.call(this, _0x304c65);
    this.victimID = _0x304c65.readUInt32();
    this.effect_flying = 1 == _0x304c65.readUInt8();
    0x0 != this.victimID && gameObjsByID[this.victimID] && (this.z = gameObjsByID[this.victimID].z + 1);
};

function AbilityObjSpear() {
    AbilityObjSpear.superClass.call(this);
    AbilityObjSpear.prototype.easeAngleChanges = true;
}
window.AbilityObjSpear = AbilityObjSpear;
GameObjType.setCustomClassForGameObjType(AbilityObjSpear, o_abilityGObj, ability_spear);
///////
// file: js_src/gameobj/ability/AbilityObjElephant.js
///////

var thisClass = AbilityObjElephant;
var superClass = AbilityObj;
thisClass.prototype = Object.create(superClass.prototype); //properly inherit prototype of superclass
thisClass.prototype.constructor = thisClass;
thisClass.superClass = superClass; //'class' var

//subclassable part of draw()
AbilityObjElephant.prototype.customDraw = function(batchDrawOutline) {
  ctx.save();
  var oldA = ctx.globalAlpha;

  ctx.globalAlpha = 0.05 * oldA;
  drawCircle(0, 0, this.rad, "#E4E7C8");

  ctx.globalAlpha = 1.0 * oldA;
  var skinFolder = "img";
  if (_gameMode.isHalloween) skinFolder = "skins/zombie/ability_skins";


  var theImg = getLoadedImg(skinFolder + "/ability_elephantTrunkSmack.png");
  if (theImg) {
    //var fac0to1 = Math.min(1.0, (timestamp - this.spawnTime) / 300.0);

    var rotfac0to1 = clamp((timestamp - this.spawnTime) / 300.0, 0.0, 1.0); //delay rotate animation a bit
    var extraRotate = -(-0.5 + rotfac0to1) * toRadians(90.0); //spin animation

    //clip to sliwly show the claw
    var rad = this.rad * 0.6;
    ctx.rotate(this.angle + extraRotate);
    var imX = 0,
      imY = this.rad;
    var imW = rad * 2.0 * 0.7,
      imH = rad * 2.0; // * fac0to1;
    var imAnchorX = 0.75,
      imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

    ctx.drawImage(
      theImg,
      imX + imW * -imAnchorX,
      imY + imH * -imAnchorY,
      imW,
      imH
    );

    //console.log("drawing banana");
  }

  ctx.restore();
};

//override this to read in custom spawn data
AbilityObjElephant.prototype.readCustomData_onNewlyVisible = function(msg) {
  AbilityObjElephant.superClass.prototype.readCustomData_onNewlyVisible.call(
    this,
    msg
  );

  //console.log("reading ELE ONNEWLYVIS a=" + toDegrees(this.angle));
};

AbilityObjElephant.prototype.readCustomData_onUpdate = function(msg) {
  AbilityObjElephant.superClass.prototype.readCustomData_onUpdate.call(
    this,
    msg
  ); //call superclass version of this method

 // console.log("reading ELE ONUPDATE a=" + toDegrees(this.angle));
};

function AbilityObjElephant() {
  AbilityObjElephant.superClass.call(this); //call superclass init method (if needed, or write a new one below)

  // console.log(
  //   "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@AbilityObjElephant constructor run"
  // );
}

window.AbilityObjElephant = AbilityObjElephant; //make class global!

//add this class as a thisClass for the right oType!
GameObjType.setCustomClassForGameObjType(
  AbilityObjElephant,
  o_abilityGObj,
  ability_elephantTrunkSmack
);

//subclassed animals


///////
// file: js_src/gameobj/animal/Animal.js
///////

//thisClass! inherit prototype/properties from superclass
//global Animal;
var thisClass = Animal;
var superClass = GameObj;
thisClass.prototype = Object.create(superClass.prototype); //properly inherit prototype of superclass
thisClass.prototype.constructor = thisClass;
thisClass.superClass = superClass; //'class' var

Animal.prototype.animalType = a_mouse;
Animal.prototype.animalSpecies = 0; // if ani has different skill set will use this var to show them
Animal.prototype.nickName = "";
Animal.prototype.skinImgName = null; //eg. mouse.png
Animal.prototype.skinNotLoadedColor = "#75ce67"; //draw color when no skin is yet loaded

Animal.prototype.flag_lowWat = false;
Animal.prototype.flag_tailBitten = false;
Animal.prototype.flag_underWater = false;
Animal.prototype.flag_eff_stunned = false;
Animal.prototype.flag_eff_frozen = false;
Animal.prototype.flag_eff_shivering = false;

Animal.prototype.flag_usingAbility = false;
Animal.prototype.flag_eff_invincible = false;
Animal.prototype.flag_eff_healing = Animal.prototype.flag_eff_poison = Animal.prototype.flag_eff_bleeding = false;
Animal.prototype.flag_eff_hot = false;

Animal.prototype.flag_iceSliding = false;
Animal.prototype.underwaterA = 0.0; //for fading animal under water
Animal.prototype.nickNameA = 0.0;
Animal.prototype.nickTXTcolor = "#FFFFFF";
Animal.prototype.bleedingA = 0.0;
Animal.prototype.stunA = 0.0; //for fading animal under water
Animal.prototype.frozenEffA = Animal.prototype.onFireEffA = Animal.prototype.effA_healing = Animal.prototype.effA_hot = 0.0;
Animal.prototype.effA_poison = Animal.prototype.effA_bleeding = Animal.prototype.effA_stunk = 0.0;
Animal.prototype.effA_constricted = Animal.prototype.effA_slimed = Animal.prototype.effA_webStuck = 0.0; //for fading animal under water
Animal.prototype.objs = [];

Animal.prototype.nameA = 0.0;
Animal.prototype.loadedSkinImg = null;
Animal.prototype.outlineW = null;
Animal.prototype.teamID = 0;
Animal.prototype.wins1v1 = 0;
Animal.prototype.birdNoAnimationFlyWingAngle = -0.2;
//name font size
Animal.prototype.setSkinScale = function () {
    this.skinRad = this.rad - this.outlineW;
    this.skinScale = 1.4705882352941;
};
Animal.prototype.getNameSize = function() {
  return 10.0; //Math.max(~~(.3 * this.size), 24)
};

Animal.prototype.setNick = function(a) {
  //if (this.nickName = a) {
  this.nickName = a;
 
  if (null == this.nickTXT) {
   
    
    this.nickTXT = new CachedText(this.getNameSize(),  this.nickTXTcolor); //"#043400");
    this.nickTXT.strokeW = 1.5;
    this.nickTXT.multiLine = false;
    this.nickTXT.playername = true

    this.nickTXT.renderScale = 5.0; //render larger to undo 'zoom of 3x'
    this.nickTXT.setText(this.nickName);
  } else {
    this.nickTXT.setFontSize(this.getNameSize());
    this.nickTXT.setText(this.nickName);
 

  }
    
  //}
};

//drawing helpers
Animal.prototype.drawEyeAtPos = function(x, y) {
  var eyeRad = 4.5;

  ctx.beginPath();
  ctx.arc(x, y, eyeRad, 0, Math.PI * 2); //white bg
  ctx.fillStyle = "black";
  //ctx.globalAlpha = 1;
  ctx.fill();

  //ctx.restore();

  ctx.beginPath();
  ctx.fillStyle = "white"; //"rgba(255,255,255,0.8)";
  var px = x - 2;
  var py = y - 1; //+ eyeRad * 0.41 * Math.sin(-this.angle + 3.29);
  ctx.arc(px, py, eyeRad * 0.22, 0, Math.PI * 2); //pupil
  //ctx.arc(x - 2, y - 1, eyeRad * 0.2, 0, Math.PI * 2); //pupil
  ctx.fill();
};
Animal.prototype.animalInfo = function() {
  var infoO = {};
  switch (this.animalType) {
    case a_snail:
      infoO.aniName = "Snail";
      infoO.aniDesc = "";
      infoO.upgradeText = "You're a super slow snail!";

      infoO.aniCol = "#fcc02b";
      infoO.skinName = "snail";
      break;
          case a_bigfoot:
            infoO.aniName = "The BigFoot";
            infoO.aniDesc = "";
            infoO.upgradeText= 'UPGRADED to ' + infoO.aniName + `! So it really exists... \n
 Right click/W to throw Spears. \n
Hold to make a fire (every 30s)`;
            infoO.aniCol = "#839eb5";
            infoO.skinName = "bigfoot/thebigfoot";
        break;
        case a_kingdragon:
            infoO.aniName = "King Dragon";
            infoO.aniDesc = "";
            infoO.upgradeText = "!\
You got firestream that burns your victim alive! Watch your tail and slap them hard.";

            infoO.aniCol = "black";
            infoO.skinName = "kingdragon/kingdragon";
            break;
          case a_scorpion:
            infoO.aniName = "Giant Scorpion";
            infoO.aniDesc = "";
            infoO.upgradeText = 'UPGRADED to ' + infoO.aniName + "\nSting and Shiver your prey to death.\n(Press W to Sting)";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "giantscorpion";
            break;
       case a_pterodactyl:
            infoO.aniName = "Pterodactyl";
            infoO.aniDesc = "";
            infoO.upgradeText = 'UPGRADED to ' + infoO.aniName + '\nFly and dive onto prey to pick it up.';

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "pterodactyl";
            break;
         case a_lochness:
            infoO.aniName = "Loch Ness";
            infoO.aniDesc = "";
               infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Tear Apart your preys with your mouth!";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "lochness/lochness";
            break;
        case a_griffin:
            infoO.aniName = "Griffin";
            infoO.aniDesc = "";
          infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Catch Animals with your strong claws!";

            infoO.aniCol = "#22FF8A";
            infoO.skinName = "griffin";
            break;
        
                case a_finaldragon:
            infoO.aniName = "Final Dragon";
            infoO.aniDesc = "";
               infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Fly Tail Slap and fire stream! you're powerful!";

            infoO.aniCol = "#fcc02b";
            infoO.skinName = "lochness/lochness";
            break;
             case a_santa:
            infoO.aniName = "Santa";
            infoO.aniDesc = "";
                  infoO.upgradeText =
                "UPGRADED to " +
              infoO.aniName +
            "!\n Drop Gifts with S (random loots!)"
   
            infoO.aniCol = "#22FF8A";
            infoO.skinName = "santa/eagle";
            break;
       
    
         
       case a_mouse:
            infoO.aniName = "Mouse";
            infoO.aniDesc = "";
            infoO.upgradeText = "";

            infoO.aniCol = "#9BA9B9";
            infoO.skinName = "mouse";
            break;
    case a_rabbit:
            infoO.aniName = "Rabbit";
            infoO.aniDesc = "";
            infoO.upgradeText = "UPGRADED to RABBIT! \nPress W to burrow a hole to hide in!";
            infoO.aniCol = "#AA937E";
            infoO.skinName = "rabbit";
            break;

    case a_fox:
      infoO.aniName = "Fox";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to FOX! ,\n You can kick players out of hiding holes! (Press W when in one!)\n+ Hide in red berry bushes!";
      infoO.aniCol = "#FF9D43";
      infoO.skinName = "fox";
      break;
    case a_deer:
      infoO.aniName = "Deer";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to DEER! \nPress W to dig up food! \nDig in mud for better food!\n Hint:Check water areas for new food sources!";
      infoO.aniCol = "#C4773E";
      infoO.skinName = "deer";
      break;
    case a_mole:
      infoO.aniName = "Mole";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to MOLE!\n Hold W to dig underground!\nGo under anything, do surprise attacks!";
      infoO.aniCol = "#4C4A45";
      infoO.skinName = "mole";
      break;
    case a_zebra:
      infoO.aniName = "Zebra";
      infoO.aniDesc = "";
      infoO.upgradeText = "UPGRADED to ZEBRA! \nPress W to kick side ways!";
      infoO.aniCol = "#FFFFFF";
      infoO.skinName = "zebra";
      break;
    case a_lion:
      infoO.aniName = "Lion";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to LION!\n Press W to release a mighty ROAR (Rawr!)!";
      infoO.aniCol = "#f8c923";
      infoO.skinName = "lion";
      break;

    //case a_cheetah:
    //    infoO.aniName = "Cheetah";
    //    infoO.aniDesc = "";
    //    infoO.upgradeText = "UPGRADED to CHEETAH!\n Press W to get a speed boost! (Every 8 seconds)!";
    //    infoO.aniCol = "#CAC05B";
    //    infoO.skinName = "cheetah";
    //    break;
    case a_bear:
      infoO.aniName = "Bear";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to BEAR!\n Bears climb through green hills! (Press W to use your claw!)";
      infoO.aniCol = "#99591C";
      infoO.skinName = "bear";
      break;
    case a_croc:
      infoO.aniName = "Croc";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to CROCODILE!\n Press W to bite and drag around animals! \n+ (Now hide in water spots)+ Swim well in Mud, Lakes & Oceans!";
      infoO.aniCol = "#30F51C";
      infoO.skinName = "croc";
      break;
    case a_hippo:
      infoO.aniName = "Hippo";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to HIPPO!\nHippos are great swimmers, dominate the Lakes/Oceans/Mud!";
      infoO.aniCol = "#945A99";
      infoO.skinName = "hippo";
      break;
    case a_rhino:
      infoO.aniName = "Rhino";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to RHINO!\n Press W to CHARGE with your mighty horn!";
      infoO.aniCol = "#94a3a9";
      infoO.skinName = "rhino";
      break;
    case a_shrimp:
      infoO.aniName = "Shrimp";
      infoO.aniDesc = "";
      infoO.upgradeText = "";
      infoO.aniCol = "#f88e37";
      infoO.skinName = "shrimp";
      break;
    case a_trout:
      infoO.aniName = "Trout";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to TROUT!\nHint: Hold Left-click to RUN! (Uses extra water)";
      infoO.aniCol = "#ac8686";
      infoO.skinName = "trout";
      break;
    case a_crab:
      infoO.aniName = "Crab";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to CRAB!\n Crabs can survive on dry land!\n (On land, Press W to go into your shell!)";
      infoO.aniCol = "#bf2408";
      infoO.skinName = "crab";
      break;
    case a_squid:
      infoO.aniName = "Squid";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to SQUID!\n Squids can use INK when injured (press W!) \n+ you can hide in plankton bushes!";
      infoO.aniCol = "#40dda4";
      infoO.skinName = "squid";
      break;
    case a_shark:
      infoO.aniName = "Shark";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to SHARK!\n A vicious predator of the oceans!";
      infoO.aniCol = "#999fc6";
      infoO.skinName = "shark";
      break;
    case a_seaHorse:
      infoO.aniName = "Sea-horse";
      infoO.aniDesc = "";
      infoO.upgradeText = "UPGRADED to SEA HORSE!\n An agile hunter!";
      infoO.aniCol = "#73BE2F";
      infoO.skinName = "seahorse";
      break;
    case a_jellyFish:
      infoO.aniName = "Jellyfish";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to JELLYFISH!\n A slowly-turning animal that can grow quite large!";
      infoO.aniCol = "#FDB9BA";
      infoO.skinName = "jellyfish";
      break;
    case a_turtle:
      infoO.aniName = "Turtle";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to TURTLE!\n Lives well on land & water! (On land, Press W to go into your shell!)";
      infoO.aniCol = "#502E1A";
      infoO.skinName = "turtle";
      break;
    case a_stingray:
      infoO.aniName = "Stringray";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to STINGRAY!\n Use electic shock (Release W key!) to shock animals! \n(Takes time to recharge)";
      infoO.aniCol = "#164336";
      infoO.skinName = "stingray";
      break;
    case a_kraken:
      infoO.aniName = "The Kraken";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to THE KRAKEN!\n Terrorize the oceans, and be feared by all!\n (Release W to use whirlpool ability!)";
      infoO.aniCol = "#64a034";
      infoO.skinName = "kraken";
      break;
    case a_pufferFish:
      infoO.aniName = "Pufferfish";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to PUFFERFISH!\n (Hold W to inflate- become spiky, and dangerous to touch!)";
      infoO.aniCol = "#6C5C2C";
      infoO.skinName = "pufferfish";
      break;
    case a_killerWhale:
      infoO.aniName = "Killer Whale";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Killer Whale! \nWhales blow out water when diving! (And sometimes other loot!)";
      infoO.aniCol = "#141414";
      infoO.skinName = "killerwhale";
      break;
    case a_swordfish:
      infoO.aniName = "Swordfish";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n (Press W to rush with your sharp nose!)";
      infoO.aniCol = "#689CD7";
      infoO.skinName = "swordfish";
      break;
    case a_gorilla:
      infoO.aniName = "Gorilla";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Gorillas are very fast on hills/trees!\n Press W to throw bananas! (from trees)";
      infoO.aniCol = "#323232";
      infoO.skinName = "gorilla";
      break;
    case a_octopus:
      infoO.aniName = "Octopus";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Octopus!\nHold W to use your 'Disguise' ability!\n(Hint: wait for prey to bite you- they get stunned!)";
      infoO.aniCol = "#ff8340";
      infoO.skinName = "octopus";
      break;
    case a_dragn:
      infoO.aniName = "Dragon";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n (You're amazing!) \nFly over everything, Hold W to shoot fire!";
      infoO.aniCol = "#22FF8A";
      infoO.skinName = "dragon/0/dragon";
      break;
    case a_blackDragon:
      infoO.aniName = "Black Dragon";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Black dragons drink lava instead of water! Black dragons only heal on healing stones/lava!";
      infoO.aniCol = "black";
      infoO.skinName = "blackdragon/blackdragon";
      break;

    case a_giantSpider:
      infoO.aniName = "Giant Spider";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Place web around the game to catch prey!";
      infoO.aniCol = "black";
      infoO.skinName = "giantSpider";
      break;

    case a_cobra:
      infoO.aniName = "Cobra";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Hold W to Spit venom, and poison animals with your bite!";
      infoO.aniCol = "black";
      infoO.skinName = "cobra";
      break;

    case a_boaConstrictor:
      infoO.aniName = "Boa Constrictor";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Coil and suffocate other animals!";
      infoO.aniCol = "black";
      infoO.skinName = "boaConstrictor";
      break;

    case a_trex:
      infoO.aniName = "T-REX";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        " The Dinosaur!\n This ancient dinosaur has powerful jaws that can drag prey around!!";
      infoO.aniCol = "#862A2A";
      infoO.skinName = "trex";
      break;

    case a_giraffe:
      infoO.aniName = "Giraffe";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Giraffe!\nGiraffe have huge legs and stomp anyone in their way!";
      infoO.aniCol = "#E9BD23";
      infoO.skinName = "giraffe";
      break;

    case a_eagle:
      infoO.aniName = "Eagle";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Eagle!\nEagles can fly up other animals in the air! !\n";
      infoO.aniCol = "#5b400d";
      infoO.skinName = "eagle";
      break;

    case a_arcticFox:
      infoO.aniName = "Arctic Fox";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n You can kick players out of hiding holes! (Press W when in one!)\n+ Hide in red berry bushes!";
      infoO.aniCol = "#CFCFCF";
      infoO.skinName = "arctic/arcticfox";
      break;
    case a_arcticHare:
      infoO.aniName = "Arctic Hare";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n \nPress W to burrow a hole to hide in!";
      infoO.aniCol = "#D5D5D5";
      infoO.skinName = "arctic/arctichare";
      break;
    case a_yeti:
      infoO.aniName = "The Yeti!";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n So it really exists... \n Hold W to turn into snow, release W to freeeeeze!";
      infoO.aniCol = "#839eb5";
      infoO.skinName = "arctic/yeti";
      break;
    case a_chipmunk:
      infoO.aniName = "Chipmunk";
      infoO.aniDesc = "";
      infoO.upgradeText = ""; //A little "+infoO.aniName+"...";
      infoO.aniCol = "#A77C30";
      infoO.skinName = "arctic/chipmunk";
      break;

    case a_muskox:
      infoO.aniName = "Muskox";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Press W to charge with your horns! \nPlus move decently on ice!";
      infoO.aniCol = "#231f18";
      infoO.skinName = "arctic/muskox";
      break;
    case a_penguin:
      infoO.aniName = "Penguin";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Left-click to run!\n (HOLD W to slide FAST on ice)!";
      infoO.aniCol = "#FFFFFF";
      infoO.skinName = "arctic/penguin";
      break;
    case a_polarBear:
      infoO.aniName = "Polar Bear";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Polar bears can climb hills! \n+ They're amazing swimmers!";
      infoO.aniCol = "#e4e4e4";
      infoO.skinName = "arctic/polarbear";
      break;
    case a_seal:
      infoO.aniName = "Seal";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Seals can slide on ice (Hold W) + can climb hills (rocks too!)";
      infoO.aniCol = "#cfcfcf";
      infoO.skinName = "arctic/seal";
      break;
    case a_snowLeopard:
      infoO.aniName = "Snow leopard";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Press W to get a speed boost! (Every 8 seconds)!";
      infoO.aniCol = "#cfcfcf";
      infoO.skinName = "arctic/snowleopard";
      break;
    case a_walrus:
      infoO.aniName = "Walrus";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n You can slide on ice (Hold W) + can climb hills (rocks too!)";
      infoO.aniCol = "#633838";
      infoO.skinName = "arctic/walrus";
      break;
    case a_reindeer:
      infoO.aniName = "Reindeer";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Press W to dig up food! \n Your sharp hooves let you turn very well on ice!";
      infoO.aniCol = "#a68976";
      infoO.skinName = "arctic/reindeer";
      break;
    case a_wolf:
      infoO.aniName = "Wolf";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Wolf paws turn very well on ice!\n Press W to howl!";
      infoO.aniCol = "#6B6B6B";
      infoO.skinName = "arctic/wolf";
      break;
    case a_wolverine:
      infoO.aniName = "Wolverine";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Press W to Let out a Powerful GROWL! (Knocks back prey!)";
      infoO.aniCol = "#843A0F";
      infoO.skinName = "arctic/wolverine";
      break;
    case a_mammoth:
      infoO.aniName = "Mammoth";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Press W to roll snowballs with your trunk!\n The bigger the snowball gets, the longer the freeze!";
      infoO.aniCol = "#9d4717";
      infoO.skinName = "arctic/mammoth";
      break;
    case a_donkey:
      infoO.aniName = "Donkey";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Press W to Kick any animal behind you";
      infoO.aniCol = "#8c7c64";
      infoO.skinName = "donkey";
      break;
    /* NEW ANIMALS */
    case a_sabertoothTiger:
      infoO.aniName = "Sabertooth Tiger";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Sabertooth Tiger!\nSabertooth Tigers are great swimmers, dominate the Lakes/Oceans/Mud!";
      infoO.aniCol = "#945A99";
      infoO.skinName = "sabertoothtiger";
      break;
    case a_elephant:
      infoO.aniName = "Elephant";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to " +
        infoO.aniName +
        "!\n Use your long trunk to attack and eat food!";
      infoO.aniCol = "#945A99";
      infoO.skinName = "elephant";
      break;

    case a_blueWhale:
      infoO.aniName = "Blue Whale";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Blue Whale!\n Smash with your powerful tail!";
      infoO.aniCol = "#945A99";
      infoO.skinName = "bluewhale";
      break;

    // case a_duck:
    //   infoO.aniName = "Duck";
    //   infoO.aniDesc = "";
    //   infoO.upgradeText = "UPGRADED to a DUCK!";
    //   infoO.aniCol = "#FF9000";
    //   infoO.skinName = "duck";
    //   break;
    // case a_duckling:
    //   infoO.aniName = "Duckling";
    //   infoO.aniDesc = "";
    //   infoO.upgradeText = "UPGRADED to a DUCK!";
    //   infoO.aniCol = "#FF9000";
    //   infoO.skinName = "duckling";
    //   break;

    case a_hedgehog:
      infoO.aniName = "Hedgehog";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Hedgehog!\n (Hold W to become spiky, and dangerous to touch!)";
      infoO.aniCol = "#5b400d";
      infoO.skinName = "hedgehog";
      break;

    case a_kingCrab:
      infoO.aniName = "King Crab";
      infoO.aniDesc = "";
      infoO.upgradeText = "UPGRADED to a KING CRAB!";
      infoO.aniCol = "#971f0e";
      infoO.skinName = "kingcrab";
      break;
    case a_lemming:
      infoO.aniName = "Lemming";
      infoO.aniDesc = "";
      infoO.upgradeText = ""; //A little "+infoO.aniName+"...";
      infoO.aniCol = "#A77C30";
      infoO.skinName = "arctic/lemming";
      break;

    case a_frog:
      infoO.aniName = "Frog";
      infoO.aniDesc = "";
      infoO.upgradeText = "UPGRADED to Frog!!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "frog/frog2";

      break;

    case a_ostrich:
      infoO.aniName = "Ostrich";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Ostrich! Lay eggs to hatch babies! \nCommand babies by placing your crosshair (right-click/W)-\n They can attack prey!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "ostrich/ostrich";

      break;
    case a_pelican:
      infoO.aniName = "Pelican";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Pelican! \nPick up water (and prey!) in your mouth,\nfly, and drop water on prey! (press W again)";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "pelican/pelican";

      break;
    case a_falcon:
      infoO.aniName = "Falcon";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Falcon! \nFly, and do a powerful dive attack! Aim it well.";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "falcon/0/falcon";

      break;
  case a_thunderbird:

            infoO.aniName = "The Thunderbird!";
            infoO.aniDesc = "";
       infoO.upgradeText = "UPGRADED to Thunderbird! \nFly, and do a powerful thunderous dive attack!\nWhen flying stay still to blend with the sky!";
            infoO.aniCol = "#FF9000";
            infoO.skinName = "thunderbird/thunderbird";

            break;
    case a_snowyOwl:
      infoO.aniName = "Snowy Owl";
      infoO.aniDesc = "";
      infoO.upgradeText =
        "UPGRADED to Snowy Owl!\n Aim the crosshair, \n right click/W when it's on top of prey, to attack!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "snowyowl/snowyowl";

      break;

    case a_ostrichBaby:
      infoO.aniName = "Baby Ostrich";
      infoO.aniDesc = "";
      infoO.upgradeText = "UPGRADED to Baby Ostrich!!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "ostrich/ostrich-baby";

      break;
    case a_phoenix:
      infoO.aniName = "Phoenix";
      infoO.upgradeText =
        "UPGRADED to Phoenix!\nCreate powerful fire tornados to burn your enemies alive!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "phoenix/phoenix";
      break;

    case a_seaMonster:
      infoO.aniName = "Sea Monster";
      infoO.upgradeText = "UPGRADED to Sea Monster!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "monsters/seamonster";
      break;
    case a_landMonster:
      infoO.aniName = "Land Monster";
      infoO.upgradeText = "UPGRADED to Land Monster!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "monsters/landmonster";
      break;
    case a_iceMonster:
      infoO.aniName = "Ice Monster";
      infoO.upgradeText = "UPGRADED to Ice Monster!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "monsters/icemonster/icemonster";
      break;
    case a_dinoMonster:
      infoO.aniName = "Dino Monster";
      infoO.upgradeText = "UPGRADED to Dino Monster!";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "monsters/dinomonster/dinomonster";
      break;
    case a_pigeon:
      infoO.aniName = "Pigeon";
      infoO.upgradeText =
        "UPGRADED to Pigeon!\nHold right click (or W) to fly!\n";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "pigeon/pigeon";
      break;
    case a_toucan:
      infoO.aniName = "Toucan";
      infoO.upgradeText =
        "UPGRADED to Toucan!\nHold right click (or W) to fly!(HINT: Start flying from a fruit tree or bush to throw fruit upon landing!)";
      infoO.aniCol = "#FF9000";
      infoO.skinName = "toucan/toucan";

      break;

    default:
      infoO.aniName = "(Animal)";
      infoO.aniDesc = "";
      infoO.aniCol = "#000000";
      infoO.upgradeText = "if you read this you will give me robux or money!";
  }

  return infoO;
};

// load animal skin into a var that can be used later
Animal.prototype.loadAnimalSkinImg = function() {
  //get skin name
  var skinName = this.getSkinName();

  //grab/load skin
  this.loadedSkinImg = null;
  if (skinName && !options_noImages) {
    this.loadedSkinImg = getLoadedImg("./skins/" + skinName + ".png");
  }
};
//override GameObj method (in prototype!)

Animal.prototype.preLoad = function () {};
     Animal.prototype.shakeOffsetX = 0;
    Animal.prototype.shakeOffsetY = 0;
Animal.prototype.shiverF = 0.02;
Animal.prototype.customDraw = function(batchDrawOutline) {
  
  this.preLoad();

  var infoO = this.animalInfo(); //infoForAnimalType(this.animalType);
  var aniCol = infoO.aniCol;
  this.skinImgName = infoO.skinName;
  var tailLen = this.rad * 0.1;
  this.skinNotLoadedColor = aniCol;

  switch (this.animalType) {
    case a_pufferFish:
    case a_muskox:
    case a_swordfish:
    case a_turtle:
    case a_croc:
      tailLen = this.rad * 0.16;
      break;
  }

  this.loadAnimalSkinImg();

  ctx.save();
  ctx.rotate(this.angle);

  var rShift = 0;
  var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
  var period = 2.5;
  var rshiftAm = 0.7;
  rShift = rshiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

  //honeybee sting effect
  if (this.flag_eff_wobbling) {
    var wobble = getAnimFrame(tSinceSpawn, 1.25, 0.3, 2);
    this.rad += wobble;
  }

 
  //apply opacity from underwater effect
  var idealOp =
    this.flag_underWater ||
    (this.flag_usingAbility &&
      (this.animalType == a_mole ||
        this.animalType == a_octopus ||
        this.isTransforming&& this.animalType == a_yeti))
      ? 0.0
      : 1.0;

  // specialy invisiblity for tiger
  if (this.flag_stealth) {
    if (this.animalType == a_seaHorse) idealOp = 0.0;
    // seahorse completely hides
    else idealOp = 0.2;
  }

   
  if (this.flag_flying && this.id != myPlayerID ) {
    idealOp = 0.6;
  }

 if(this.animalType == a_thunderbird){
 
   if(this.flag_flying&&idealOp > this.transparancy / 100)
idealOp = this.transparancy / 100;
}   
  this.underwaterA += (idealOp - this.underwaterA) * 0.1;
  ctx.globalAlpha *= this.underwaterA;

  //flash when invincible
  if (this.flag_eff_invincible) {
    var period = 1.0; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );
  }

  //animal under-skin outline (without stroke- optimized)
  this.outlineW = 2.0 + rShift;

  if (
    !(
      this.dead ||
      this.flag_underWater ||
      (this.animalType == a_mole && this.flag_usingAbility)
    )
  )
    if (gameMode == gameMode_teamMode && this.teamID != 0) {
      var teamColor = _gameMode.teamColors[this.teamID];
      /*
    if (this.teamID == 1) teamColor = "#ff0000";
    else if (this.teamID == 2) teamColor = "#00ff00";
    else if (this.teamID == 3) teamColor = "#0000ff";
    */
      ctx.save();
      ctx.globalAlpha = idealOp;
      drawCircle(0, 0, this.rad + 2, teamColor);
      ctx.restore();
    }
  var outlineCol = this.getOutlineColor();
  if (
    !(
    this.flag_flying || this.flag_isGrabbed||
 
   
      (options_lowGraphics &&
        !(outlineCol == col_edibleOutline || outlineCol == col_dangerOutline))
    )
  ) {
    //dont draw plain outlines!

    drawCircle(0, 0, this.rad, outlineCol);
    //if(outlineCol==col_dangerOutline)
  } else this.outlineW = 0;

  //draw tail
  if (
    this.animalType != a_rabbit &&
    this.animalType != a_mouse &&
    this.animalType != a_crab
  ) {
    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
    var period = 5.0;
    var shiftAm = 4.0;
    var tailAShift =
      shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

    var oWidSc = this.outlineW * 2.5; //scale with rad
    var tailW = 25.0; //angle width
    //tailLen = this.rad * 0.08; //angle width
    var pF = Math.PI / 180.0;

    //tail background (stroke)


        if (this.flag_eff_shivering) {
            var _0x333d1a = (timestamp - this.spawnTime) / 1000,
                _0x2b42c6 = this.rad * this.shiverF;
            this.shakeOffsetX = _0x2b42c6 * Math.sin(2 * Math.PI / 0.1 * _0x333d1a);
            _0x2b42c6 = this.rad * this.shiverF;
            this.shakeOffsetY = _0x2b42c6 * Math.sin(2 * Math.PI / 0.05 * _0x333d1a);
            ctx.translate(-this.shakeOffsetX, -this.shakeOffsetY);
        }
    if (this.flag_tailBitten) {
      ctx.fillStyle = col_dangerOutline;
    } else {
      var _thisAniType = this.animalType;
      
      if (tailBiteAniTypes[_thisAniType - 1] > 0 && this.id != myPlayerID) {
        ctx.fillStyle = col_edibleOutline; //edible
      } else {
        ctx.fillStyle = outlineCol;
      }
    }

    if (
      !(options_lowGraphics && ctx.fillStyle != col_outline_land) &&
      !this.flag_flying
    ) {
      //no plain tails
      ctx.beginPath();
      ctx.moveTo(
        (this.rad - this.outlineW + 1) *
          Math.cos((270 + tailW / 2.0 + oWidSc) * pF),
        (this.rad - this.outlineW + 1) * Math.sin((270 + tailW / 2.0) * pF)
      ); //bottom of tail
      ctx.lineTo(
        (this.rad - this.outlineW + 1) *
          Math.cos((270 - tailW / 2.0 - oWidSc) * pF),
        (this.rad - this.outlineW + 1) * Math.sin((270 - tailW / 2.0) * pF)
      ); //bottom of tail
      ctx.lineTo(
        (this.rad + tailLen + this.outlineW) *
          Math.cos((270 + tailAShift) * pF),
        (this.rad + tailLen + this.outlineW) * Math.sin((270 + tailAShift) * pF)
      ); //point
      ctx.lineTo(
        (this.rad - this.outlineW + 1) *
          Math.cos((270 + tailW / 2.0 + oWidSc) * pF),
        (this.rad - this.outlineW + 1) * Math.sin((270 + tailW / 2.0) * pF)
      ); //connect to start
      ctx.fill();
    }

    //tail inner drawing
    if (!options_lowGraphics) {
      if (!this.loadedSkinImg || this.flag_tailBitten) {
        ctx.fillStyle = this.flag_tailBitten ? col_dangerOutline : aniCol; //tail color
        ctx.beginPath();
        ctx.moveTo(
          (this.rad - this.outlineW) * Math.cos((270 + tailW / 2.0) * pF),
          (this.rad - this.outlineW) * Math.sin((270 + tailW / 2.0) * pF)
        ); //bottom of tail
        ctx.lineTo(
          (this.rad - this.outlineW) * Math.cos((270 - tailW / 2.0) * pF),
          (this.rad - this.outlineW) * Math.sin((270 - tailW / 2.0) * pF)
        ); //bottom of tail
        ctx.lineTo(
          (this.rad + tailLen) * Math.cos((270 + tailAShift) * pF),
          (this.rad + tailLen) * Math.sin((270 + tailAShift) * pF)
        ); //point
        ctx.lineTo(
          (this.rad - this.outlineW) * Math.cos((270 + tailW / 2.0) * pF),
          (this.rad - this.outlineW) * Math.sin((270 + tailW / 2.0) * pF)
        ); //connect to start
        ctx.fill();
      }
    }
  }

  this.drawUnderSkinImgOutline();
  this.drawUnderSkinImg();
  this.drawSkinImg();
  this.drawOnTopOfSkinImg();

  ctx.restore(); //done rotate/ opacity

  this.drawTopEffects();

  //low water drop
  if (this.flag_lowWat) {
    var period = 1.2; //periodic func with time
    var p_min = 0.2,
      p_max = 0.8; //set these!
    var amp = 0.5 * (p_max - p_min);
    var flashA =
      p_min +
      amp +
      amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

    ctx.save();
    ctx.globalAlpha = flashA;
    ctx.fillStyle =
      this.animalType == a_blackDragon || this.animalType == a_phoenix|| this.animalType == a_landMonster|| this.animalType == a_kingdragon
        ? col_lava
        : col_wat1;
 if(this.animalType == a_pterodactyl){
   ctx.fillStyle = "#ff894b"
 }
    ctx.beginPath();
    //sweat bottom
    ctx.arc(0, this.rad + 5, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  //player name text
  this.drawNickName(idealOp);

  this.drawCustomUIForAni();
  //ctx.restore();
};

Animal.prototype.drawCustomUIForAni = function() {
  if (gameMode == gameMode_teamMode && _gameMode) _gameMode.drawPlayerUI(this);
};

Animal.prototype.hasMultipleSpecies = function() {
  return false;
};

//first draw
Animal.prototype.drawNickName = function(idealOp) {
  var nameOpIdeal = idealOp;
  this.nickNameA += (nameOpIdeal - this.nickNameA) * 0.1;

  if (this.nickName && this.nickTXT && !options_noNames) {
    ctx.save();
    //player name text- without caching
    //ctx.lineWidth = 1;
    /*ictx.textAlign = "center";
                ctx.textBaseline = "middle"; //vertical center
                if (!options_lowGraphics) {
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.shadowColor = "black"
                }
                ctx.fillStyle = "white"
        */

    if (this.dead) ctx.globalAlpha *= 1 - this.moveUpdF;
    else ctx.globalAlpha = 1;
    ctx.globalAlpha *= this.nickNameA; //name alpha

    //draw cached name
    this.nickTXT.x = 0;
    this.nickTXT.y = this.rad + 9;
    this.nickTXT.draw();

    ctx.restore();
  }
};

//first draw
Animal.prototype.drawUnderSkinImgOutline = function() {
  //underwater bubbles/ effects

  if (
    this.flag_underWater ||
    (this.flag_usingAbility && this.animalType == a_mole)
  ) {
    ctx.save();
    ctx.globalAlpha = 1.0 - this.underwaterA; //bubbles appear as animal fades

    this.drawWhenUnderwater();
    ctx.restore();
  }

  if (this.flag_eff_stunk) {
    ctx.save();
    var period = 1.0; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    var a =
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= a;
    var effectRad = 2.6;
    drawCircle(0, 0, this.rad + effectRad * a, "brown");

    ctx.restore();
  }

  //ice sliding effect
  if (this.flag_iceSliding) {
    //var fac0to1 = (timestamp - this.spawnTime) % 1000.0/1000.0;
    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;

    var period = 0.75;
    var shiftAm = 1.0;
    var moveA = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

    /*var waveMoveTms=1.0*1000; //ms to one full movement
        var fac0to1 = (timestamp - this.spawnTime) % waveMoveTms /waveMoveTms;
        var waveX= x + dist * (fac0to1);*/

    var theA = ctx.globalAlpha;
    ctx.globalAlpha *= 0.8 - 0.2 * moveA;
    drawCircle(0, this.rad * 0.3, this.rad * (0.9 + 0.15 * moveA), "#7BB7BB");
    drawCircle(0, -this.rad * 0.3, this.rad * (1.05 + 0.1 * moveA), "#7BB7BB");
    //console.log("drawing ice slide");
    ctx.globalAlpha = theA;
  }

  if (
    this.flag_usingAbility &&
    (this.animalType == a_deer ||
      /*this.animalType == a_zebra || */ this.animalType == a_reindeer)
  ) {
    //console.log("dig");
    //digging ability (bg circle)
    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;

    var period = 1.5;
    var shiftAm = 1.0;
    var moveA = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

    var theA = ctx.globalAlpha;
    ctx.globalAlpha *= 0.8; //- 0.2 * moveA;
    drawCircle(0, this.rad * 0.3, this.rad * (0.9 + 0.12 * moveA), "#7F582B");
    drawCircle(0, -this.rad * 0.3, this.rad * (1.05 + 0.09 * moveA), "#7F582B");
    ctx.globalAlpha = theA;
  }
  //frozen effect (extra white outline!)
  var idealOp = this.flag_eff_frozen || this.flag_cold ? 1.0 : 0.0;
  this.frozenEffA += (idealOp - this.frozenEffA) * 0.1;

  if (this.frozenEffA > 0.01) {
    var theA = ctx.globalAlpha;
    ctx.globalAlpha *= this.frozenEffA;
    var effectRad = 1.6;
    drawCircle(0, 0, this.rad + effectRad * this.frozenEffA, "white");

    ctx.globalAlpha = theA; //reset Alpha
  }

  //healing purple outline 'glow'
  var idealOp = this.flag_eff_healing ? 1.0 : 0.0;
  this.effA_healing += (idealOp - this.effA_healing) * 0.1;
  if (this.effA_healing > 0.01) {
    ctx.save();
    ctx.globalAlpha *= this.effA_healing;
    var effectRad = 2.6;
    drawCircle(0, 0, this.rad + effectRad * this.effA_healing, "purple");

    ctx.restore();
  }


  var idealOp = this.flag_eff_hot ? 1.0 : 0.0;
  this.effA_hot += (idealOp - this.effA_hot) * 0.1;
  if (this.effA_hot > 0.01) {
    ctx.save();
    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    var effectRad = 2.6;
    drawCircle(
      0,
      0,
      this.rad + effectRad * this.effA_hot,
      "rgba(249, 212, 77, 0.5)"
    );

    ctx.restore();
  }
  //POISON outline 'glow'
  var idealOp = this.flag_eff_poison ? 1.0 : 0.0;
  this.effA_poison += (idealOp - this.effA_poison) * 0.1;
  if (this.effA_poison > 0.01) {
    ctx.save();

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= this.effA_poison;
    var effectRad = 2.6;
    drawCircle(0, 0, this.rad + effectRad * this.effA_poison, "#7FF600");

    ctx.restore();
  }


  //BLEEDING outline 'glow'

  var idealOp = this.flag_eff_bleeding || this.flag_eff_wobbling ? 1.0 : 0.0;
  this.effA_bleeding += (idealOp - this.effA_bleeding) * 0.1;
  if (this.effA_bleeding > 0.01) {
    ctx.save();

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= this.effA_bleeding;
    var effectRad = 2.6;
    var color = this.flag_eff_wobbling ? "brown" : "red";
    drawCircle(0, 0, this.rad + effectRad * this.effA_bleeding, color);

    ctx.restore();
  }

  var idealOp = this.flag_eff_slimed ? 1.0 : 0.0;
  this.effA_slimed += (idealOp - this.effA_slimed) * 0.1;
  if (this.effA_slimed > 0.01) {
    ctx.save();

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= this.effA_slimed;
    var effectRad = 2.6;
    drawCircle(0, 0, this.rad + effectRad * this.effA_slimed, "grey");

    ctx.restore();
  }
};

Animal.prototype.drawUnderSkinImg = function() {};

//draws when underwater! (eg. draw shark fin)
Animal.prototype.drawWhenUnderwater = function() {
  var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
  var period = 1.5;
  var shiftAm = 1.0;
  var moveA = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

  //if(this.animalType!=a_shark){
  //var oldA=ctx.globalAlpha;
  //ctx.globalAlpha *= 0.5;

  if (this.animalType == a_croc) ctx.globalAlpha *= 0.3;
  var diveColor = this.flag_underWater ? "#4E71C3" : "#7E6A35";

  if (this.animalType == a_phoenix) diveColor = "#f9d43b";

  ctx.fillStyle = diveColor;
  var bubRad = this.flag_underWater ? this.rad * 0.15 : this.rad * 0.1;
  ctx.beginPath(); //top left, right
  ctx.arc(
    this.rad * -0.35,
    this.rad * -0.33,
    Math.max(0, bubRad + moveA),
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    this.rad * 0.35,
    this.rad * -0.32,
    Math.max(0, bubRad - moveA),
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath(); //bottom 2
  ctx.arc(
    this.rad * 0.35,
    this.rad * 0.36,
    Math.max(0, bubRad + moveA),
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    this.rad * -0.35,
    this.rad * 0.35,
    Math.max(0, bubRad - moveA),
    0,
    Math.PI * 2
  );
  ctx.fill();
  //}

  //shark fin

  if (this.animalType == a_shark) {
    ctx.globalAlpha = 1.0 - this.underwaterA;
    ctx.fillStyle = "#73799b";

    ctx.beginPath();
    //var px = this.rad * -0.008; //middle of horn circle
    var rad = this.rad;
    var py = rad * 0.25; //0.68; //692;
    ctx.moveTo(rad * -0.07, py); //bottom L
    //if()
    ctx.lineTo(0, py - rad * 0.5); //peak of horn (up)
    //ctx.lineTo(px - rad * 0.5, py - 12); //curve point in horn
    ctx.lineTo(rad * 0.35, py); //bottom right
    ctx.closePath();
    ctx.fill();
  } else if (this.animalType == a_killerWhale) {
    //blowhole
    drawCircle(0, this.rad * 0.2, this.rad * 0.12, "#4D4D4D");
  } else if (this.animalType == a_blueWhale) {
    //blowhole
    drawCircle(0, this.rad * 0.45, this.rad * 0.08, "#202A65");
  } else if (this.animalType == a_kingCrab) {
    var frame = getAnimFrame(tSinceSpawn, 1, 1, 1);

    ctx.save();

    ctx.rotate(toRadians(40));
    ctx.scale(1, 2); //B32E10
    ctx.globalAlpha = 0.08;
    drawCircle(
      this.rad * 1,
      this.rad * 0.2,
      this.rad * 0.1 + this.rad * 0.1 * frame,
      "#B32E10"
    );
    ctx.globalAlpha = 0.2;
    drawCircle(this.rad * 1, this.rad * 0.2, this.rad * 0.15, "#B32E10");

    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.rotate(toRadians(-40));
    ctx.scale(1, 2);
    ctx.globalAlpha = 0.08;
    drawCircle(
      this.rad * -1,
      this.rad * 0.2,
      this.rad * 0.1 + this.rad * 0.1 * -frame,
      "#B32E10"
    );
    ctx.globalAlpha = 0.2;
    drawCircle(this.rad * -1, this.rad * 0.2, this.rad * 0.15, "#B32E10");
    ctx.restore();
  } else if (this.animalType == a_kraken) {
      if( this.animalSpecies == 0){
    ctx.globalAlpha = 1.0 - this.underwaterA;
    drawCircle(this.rad * 0.4, this.rad * 0.75, this.rad * 0.12, "#598b30");
    drawCircle(this.rad * 0.65, this.rad * 0.55, this.rad * 0.1, "#64a034");
    drawCircle(this.rad * -0.4, this.rad * 0.75, this.rad * 0.12, "#64a034");
    drawCircle(this.rad * -0.65, this.rad * 0.55, this.rad * 0.1, "#598b30");
      }
        if( this.animalSpecies == 1){
    ctx.globalAlpha = 1.0 - this.underwaterA;
    drawCircle(this.rad * 0.4, this.rad * 0.75, this.rad * 0.12, "#45DFC7");
    drawCircle(this.rad * 0.65, this.rad * 0.55, this.rad * 0.1, "#36DAD2");
    drawCircle(this.rad * -0.4, this.rad * 0.75, this.rad * 0.12, "#36DAD2");
    drawCircle(this.rad * -0.65, this.rad * 0.55, this.rad * 0.1, "#45DFC7");
      }
        if( this.animalSpecies == 2){
    ctx.globalAlpha = 1.0 - this.underwaterA;
    drawCircle(this.rad * 0.4, this.rad * 0.75, this.rad * 0.12, "#FFBD25");
    drawCircle(this.rad * 0.65, this.rad * 0.55, this.rad * 0.1, "#F9C438");
    drawCircle(this.rad * -0.4, this.rad * 0.75, this.rad * 0.12, "#F9C438");
    drawCircle(this.rad * -0.65, this.rad * 0.55, this.rad * 0.1, "#FFBD25");
      }
           if( this.animalSpecies == 3){
    ctx.globalAlpha = 1.0 - this.underwaterA;
    drawCircle(this.rad * 0.4, this.rad * 0.75, this.rad * 0.12, "#838383");
    drawCircle(this.rad * 0.65, this.rad * 0.55, this.rad * 0.1, "#555555");
    drawCircle(this.rad * -0.4, this.rad * 0.75, this.rad * 0.12, "#555555");
    drawCircle(this.rad * -0.65, this.rad * 0.55, this.rad * 0.1, "#838383");
      }
  } else if (this.animalType == a_trex) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.scale(1, 2);
    drawCircle(0, this.rad * 0.24, this.rad * 0.08, "#202A65");
    drawCircle(0, this.rad * -0.02, this.rad * 0.06, "#202A65");
    drawCircle(0, this.rad * -0.28, this.rad * 0.05, "#202A65");
    drawCircle(0, this.rad * -0.54, this.rad * 0.04, "#202A65");
    ctx.restore();
  }
};

Animal.prototype.skinRad = 0;
Animal.prototype.skinScale = 0;
 
//just draw the circle, aside from all kinds of specific effects
Animal.prototype.basicDrawSkinImg = function() {
  var iScale = 500 / 340.0; //scale up ps image to fit (to remove blank space)
  var rad = this.rad - this.outlineW;
  this.skinRad = rad;
  this.skinScale = iScale;
  if (this.loadedSkinImg) {
    if (this.animalType == a_trex || this._animalType == a_trex) {
      overSizeOffset = rad / 2;
      ctx.drawImage(
        this.loadedSkinImg,
        -rad - overSizeOffset,
        -rad - overSizeOffset,
        2 * rad * iScale,
        2 * rad * (iScale * 1.2)
      );
    } else {
      ctx.drawImage(
        this.loadedSkinImg,
        -rad * iScale,
        -rad * iScale,
        2 * rad * iScale,
        2 * rad * iScale
      );
    }
  }
  //not loaded yet- draw plain color circle
  else {
    //drawCircle(0,0,this.rad, col);
    ctx.fillStyle = this.skinNotLoadedColor;
    //var oldA=ctx.alpha;
    //ctx.alpha*=0.5;

    ctx.beginPath();
    ctx.arc(0, 0, Math.max(0, this.rad - this.outlineW), 0, Math.PI * 2);
    ctx.fill();

    //ctx.alpha=oldA; //draw faded color
  }
};

//draw image for the animal skin (along with extra images on it, eg wings)
Animal.prototype.drawSkinImg = function() {
  var rad = this.rad - this.outlineW;

  this.basicDrawSkinImg(); //just draw the image

  // custom animations or skin overlays
  this.drawSkinCustomization();
};

Animal.prototype.drawSkinCustomization = function() {};

Animal.prototype.drawOnTopOfSkinImg = function() {
  //image-free drawing
  if (!this.loadedSkinImg) {
    //animal eyes

    ctx.save();
    var eyeS = Math.max(1.0, this.rad / 25.0); //make eyes bigger for bigger animals
    ctx.scale(eyeS, eyeS);
    this.drawEyeAtPos(6.0, this.rad * 0.32);
    this.drawEyeAtPos(-6.0, this.rad * 0.32);
    ctx.restore();
  }

  //skin enchancements
  if (this.animalType == a_rhino) {
    ctx.fillStyle = "#E5CF79";

    ctx.beginPath();
    //var px = this.rad * -0.008; //middle of horn circle
    var rad = this.rad - this.outlineW;
    var py = rad * 1.0; //0.68; //692;
    ctx.moveTo(rad * -0.16, py); //bottom L
    //if()

    ctx.lineTo(0, rad * (this.flag_usingAbility ? 1.41 : 0.7)); //peak of horn (up)
    //ctx.lineTo(px - rad * 0.5, py - 12); //curve point in horn
    ctx.lineTo(rad * 0.153, py); //bottom right
    ctx.closePath();
    ctx.fill();
  }

};

//top layer, NOT ROTATED
Animal.prototype.drawTopEffects = function() {
  //stun effect
    if (this.animalType == a_giantSpider) {
    ctx.save();

    var fac0to1 = (timestamp - this.spawnTime) % 1000.0/1000.0;
    var period = 0.75;
    var shiftAm = 1.0;
    var moveA = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);
    var x = 100
    var waveMoveTms=1.0*1000; //ms to one full movement
        var fac0to1 = (timestamp - this.spawnTime) % waveMoveTms /waveMoveTms;
        var waveX= x + this.rad * 2  * (fac0to1);

    var theA = 1;
    ctx.globalAlpha *= 0.8 - 0.2 * moveA;
    drawCircle(
      this.rad * 0.15,
      -this.rad * 1.27,
      this.rad * (0.1 + 0.05 * moveA),
      "#efefef"
    );
    drawCircle(
      -this.rad * 0.15,
      -this.rad * 1.27,
      this.rad * (0.1 - 0.05 * moveA),
      "#efefef"
    );
    drawCircle(0, -this.rad * 0.3, this.rad * (1.05 + 0.1 * moveA), "#7BB7BB");
    ctx.globalAlpha = 100;
    ctx.restore();
  }
  var idealOp = this.flag_eff_stunned ? 1.0 : 0.0;
  this.stunA += (idealOp - this.stunA) * 0.1;
  if (this.stunA > 0.01) {
    ctx.save();
    var spinPer = 2.5; //spin around every X s
    var spinRot = (timestamp % (spinPer * 1000.0)) / (spinPer * 1000.0); //gets number from 0-1
    ctx.rotate(spinRot * (2 * Math.PI));

    ctx.globalAlpha *= this.stunA; //bubbles appear as animal fades

    var bubRad = this.rad * 0.2;

    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
    var period = 1.0;
    var shiftAm = 0.5 + bubRad * 0.07;
    var moveA = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

    ctx.fillStyle = "#F3D444";
    ctx.beginPath(); //top left, right
    ctx.arc(
      this.rad * -0.22,
      this.rad * -0.22,
      Math.max(0, bubRad + moveA),
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      this.rad * 0.22,
      this.rad * -0.22,
      Math.max(0, bubRad - moveA),
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.beginPath(); //bottom 2
    ctx.arc(
      this.rad * 0.22,
      this.rad * 0.22,
      Math.max(0, bubRad + moveA),
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      this.rad * -0.22,
      this.rad * 0.22,
      Math.max(0, bubRad - moveA),
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
  }
  //on fire glow

  var idealOp = this.flag_eff_onFire ? 1.0 : 0.0;
  this.onFireEffA += (idealOp - this.onFireEffA) * 0.1;
  if (this.onFireEffA > 0.01) {
    //glow stronger/weaker like a fire
    var period = 1.0; //periodic func with time
    var p_min = 0.15,
      p_max = 0.4; //set these!
    var amp = 0.5 * (p_max - p_min);
    var flashA =
      p_min +
      amp +
      amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

    ctx.save();
    ctx.globalAlpha *= flashA * this.onFireEffA;
    drawCircle(0, 0, Math.max(0, this.rad), "orange");
    ctx.restore();

    if (!options_lowGraphics) {
      //glow stronger/weaker like a fire
      var period = 1.0; //periodic func with time
      var p_min = 0.5,
        p_max = 1.0; //set these!
      var amp = 0.5 * (p_max - p_min);
      var moveA =
        p_min +
        amp +
        amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

      var imNum = Math.trunc(timestamp / 100) % 5;
      var imNum2 = Math.trunc(timestamp / 150) % 5;
      //var theImg = getLoadedImg(imNum == 1 ? "img/fire.png" : "img/fire2.png");
      var theImg = getLoadedImg("img/fire/0/" + imNum + ".png");
      var theImg2 = getLoadedImg("img/fire/0/" + imNum2 + ".png");

      //var imNum = Math.trunc(timestamp / 300) % 2;

      //var theImg = getLoadedImg(imNum == 1 ? "img/fire.png" : "img/fire2.png");
      //var theImg2 = getLoadedImg(imNum == 0 ? "img/fire.png" : "img/fire2.png");
      if (theImg || theImg2) {
        var imX = 0 - this.rad * 0.3,
          imY = this.rad * 0.2 - this.rad * 0.3;
        var imW = (this.rad * 1.0 * (2.0 + moveA * 2.0)) / 3.0,
          imH = this.rad * 1.0 * moveA;
        var imAnchorX = 0.5,
          imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

        ctx.save();
        if (theImg) {
          ctx.globalAlpha *= this.onFireEffA * moveA;
          ctx.drawImage(
            theImg,
            imX + imW * -imAnchorX,
            imY + imH * -imAnchorY,
            imW,
            imH
          );
        }
        if (theImg2) {
          ctx.globalAlpha *= this.onFireEffA * moveA;
          ctx.drawImage(
            theImg2,
            imX + this.rad * 0.5 + imW * -imAnchorX,
            imY + this.rad * 0.5 + imH * -imAnchorY,
            imW,
            imH
          );
        }
        ctx.restore();
      }
    } else {
      var period = 1.0; //periodic func with time
      var p_min = 0.5,
        p_max = 1.0; //set these!
      var amp = 0.5 * (p_max - p_min);
      var moveA =
        p_min +
        amp +
        amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

      var theImg = getLoadedImg("img/fire/0/0.png");
      if (theImg) {
        var imX = 0 - this.rad * 0.3,
          imY = this.rad * 0.2 - this.rad * 0.3;
        var imW = (this.rad * 1.0 * (2.0 + moveA * 2.0)) / 3.0,
          imH = this.rad * 1.0 * moveA;
        var imAnchorX = 0.5,
          imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

        ctx.save();

        ctx.globalAlpha *= this.onFireEffA * moveA;
        ctx.drawImage(
          theImg,
          imX + imW * -imAnchorX,
          imY + imH * -imAnchorY,
          imW,
          imH
        );

        ctx.globalAlpha *= this.onFireEffA * moveA;
        ctx.drawImage(
          theImg,
          imX + this.rad * 0.5 + imW * -imAnchorX,
          imY + this.rad * 0.5 + imH * -imAnchorY,
          imW,
          imH
        );

        ctx.restore();
      }
    }
  }

  /// alkdjflkdjfsd


  //frozen effect 2 (circles)
  if (this.frozenEffA > 0.01 && this.flag_eff_frozen) {
    ctx.save();
    var spinPer = 7.0; //spin around every X s
    var spinRot = (timestamp % (spinPer * 1000.0)) / (spinPer * 1000.0); //gets number from 0-1
    ctx.rotate(spinRot * (2 * Math.PI));

    ctx.globalAlpha *= this.frozenEffA; //bubbles appear as animal fades

    var bubRad = this.rad * 0.2;
    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
    var period = 1.0;
    var shiftAm = 0.5 + bubRad * 0.07;
    var moveA = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

    ctx.fillStyle = "white";
    var bubSpread = this.rad * 0.27; //spread in a square
    ctx.beginPath(); //top left, right
    ctx.arc(
      -bubSpread,
      -bubSpread,
      Math.max(0, bubRad + moveA),
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(bubSpread, -bubSpread, Math.max(0, bubRad - moveA), 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath(); //bottom 2
    ctx.arc(bubSpread, bubSpread, Math.max(0, bubRad + moveA), 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-bubSpread, bubSpread, Math.max(0, bubRad - moveA), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  //draw skin

  //frozen white glow
  if (this.frozenEffA > 0.01) {
    ctx.save();
    var effectN = 0.3;
    ctx.globalAlpha *= effectN * this.frozenEffA;

    drawCircle(0, 0, Math.max(0, this.rad - this.outlineW), "white");
    ctx.restore();
  }

  //healing effect purple 'glow'
  if (this.effA_healing > 0.01) {
    ctx.save();
    var effectN = 0.3;
    ctx.globalAlpha *= effectN * this.effA_healing;

    drawCircle(0, 0, Math.max(0, this.rad - this.outlineW), "#ef24ed");
    ctx.restore();
  }
 

  //healing effect purple 'glow'
  if (this.effA_hot > 0.01) {
    ctx.save();
    var effectN = 0.3;
    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    drawCircle(
      0,
      0,
      Math.max(0, this.rad - this.outlineW),
      "rgba(249, 212, 77, 0.3)"
    );
    ctx.restore();
  }
  //POISON green 'glow'
  if (this.effA_poison > 0.01) {
    ctx.save();
    var effectN = 0.3;
    ctx.globalAlpha *= effectN * this.effA_poison;

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.5 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    drawCircle(0, 0, Math.max(0, this.rad - this.outlineW), "#9FDA00");
    ctx.restore();
  }
 

  var idealOp = this.flag_eff_bleeding ? 0.8 : 0.0;
  this.effA_bleeding += (idealOp - this.effA_bleeding) * 0.1;
  if (this.effA_bleeding > 0.01) {
    ctx.save();

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.3 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= this.effA_bleeding;
    var effectRad = -2.6;
    drawCircle(0, 0, this.rad + effectRad * this.effA_bleeding, "red");

    ctx.restore();
  }

  var idealOp = this.flag_eff_slimed ? 0.8 : 0.0;
  this.effA_slimed += (idealOp - this.effA_slimed) * 0.1;
  if (this.effA_slimed > 0.01) {
    ctx.save();

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.3 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= this.effA_slimed;
    var effectRad = -2.6;
    drawCircle(0, 0, this.rad + effectRad * this.effA_slimed, "grey");

    ctx.restore();
  }

  var idealOp = this.flag_eff_stunk ? 0.8 : 0.0;
  this.effA_stunk += (idealOp - this.effA_stunk) * 0.1;
  if (this.effA_stunk > 0.01) {
    ctx.save();

    //effect also flashes
    var period = 1.2; //periodic func with time
    var p_min = 0.3,
      p_max = 1.0;
    var amp = 0.3 * (p_max - p_min);
    ctx.globalAlpha *=
      p_min +
      amp +
      amp *
        Math.sin(
          ((2.0 * Math.PI) / period) * ((timestamp - this.spawnTime) / 1000.0)
        );

    ctx.globalAlpha *= this.effA_stunk;
    var effectRad = -2.6;
    drawCircle(0, 0, this.rad + effectRad * this.effA_stunk, "brown");

    ctx.restore();
  }

  //ice sliding effect


  //web stuck
  var idealOp = this.flag_webStuck ? 1.0 : 0.0;
  this.effA_webStuck += (idealOp - this.effA_webStuck) * 0.02;

  if (this.effA_webStuck > 0.01) {
    ctx.save();
    var effectN = 0.9;
    ctx.globalAlpha *= effectN * this.effA_webStuck;

    var theImg = getLoadedImg("img/spiderWeb_stuck.png");
    if (theImg) {
      var rad = this.rad * 1.3;
      //ctx.rotate(-this.angle); //undo rotation
      ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
      //console.log("drawing banana");
    }
    ctx.restore();
  }

  //constrict
  var idealOp = this.flag_constricted ? 1.0 : 0.0;
  this.effA_constricted += (idealOp - this.effA_constricted) * 0.04;

  if (this.effA_constricted > 0.01) {
    ctx.save();
    var effectN = 0.9;
    ctx.globalAlpha *= effectN * this.effA_constricted;

    var skinFolder = "img";
   
    var theImg = getLoadedImg(skinFolder + "/constrict.png");
    if (theImg) {
      var rad = this.rad * 1.3;
      ctx.rotate(-this.angle); //undo rotation
      ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2 * rad);
      //console.log("drawing banana");
    }
    ctx.restore();
  }
};
 
//returns the name of the main skin img to draw
Animal.prototype.getSkinName = function() {
  var skinName = this.skinImgName;
  switch (this.animalType) {
    // add a 2 for using ability
    case a_pufferFish:
    case a_muskox:
    case a_swordfish:
    case a_turtle:
    case a_crab:
    case a_snail:
    case a_cobra:
    case a_boaConstrictor:
    case a_hedgehog:
      var skinFolder = "";
      
      if (this.flag_usingAbility) skinName = skinFolder + skinName + "2";
      break;
 
      
      /*
          case a_pelican:
            skinName = skinName + (this.specType == 0 ? "" : this.specType);
            break;
          case a_eagle:
            skinName = skinName + (this.specType == 0 ? "" : this.specType);
            break;

          case a_frog:
            if (this.flag_usingAbility && !this.flag_underWater)
              skinName = skinName + "2";
            break;

          case a_ostrich:
            if (this.specType == 1)
              skinName = "baby_ostrich";
            break; */
    case a_tiger:
      this.z = this.z * 2; // above hill but under the trees
      if (this.flag_usingAbility && this.specType == 4)
        skinName = skinName + "2";
      break;
  }

  if (this.flag_flying && !this.flag_isGrabbed) {
    if (this.animalType == a_duck || this.animalType == a_blackDragon)
      skinName = "flying_" + skinName;
  }
              
            

  return skinName;
};
  

Animal.prototype.setObjTypes = function(oType, secondaryType) {
  this.oType = oType;
  this.animalType = secondaryType; //secondaryType can be different for eg.
};

//override this to read in custom spawn data
Animal.prototype.readCustomData_onNewlyVisible = function(msg) {
  Animal.superClass.prototype.readCustomData_onNewlyVisible.call(this, msg);

  //read custom data here!
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //var animtype = msg.readUInt8();
//  console.log(msg)
  var nickName = msg.readString();
 