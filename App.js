import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
//import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar';

import PrimaryButton from './components/PrimaryButton';
import Title from './components/Title';
import StartScreen from './screens/StartScreen';
import UnitSelectScreen from './screens/UnitSelectScreen';
import InfoScreen from './screens/InfoScreen';
import GameOverScreen from './screens/GameOverScreen';
import BattleScreen from './screens/BattleScreen';
import BattleLogic from './assets/BattleLogic';


export default function App() {
  const [playerUnits, setPlayerUnits] = useState([]);
  const [enemyUnits, setEnemyUnits] = useState([]);
  const [screenID, setScreenID] = useState(0);
  const [winStatus, setWinStatus] = useState();
  
  /*const [fontsLoader] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoader) {
    return <AppLoading />;
  }*/

  function displayUnits()
  {
    console.log(playerUnits)
  }

  function displayEnemyUnits()
  {
    console.log(enemyUnits)
  }

  function generatePlayerUnits(types, names)
  {
    var units = [4]

    for(var i = 0; i < 4; i++)
    {
      
      if(types[i] == "Armored Knight")
      {
        units[i] = generateUnit("player", "Armored Knight", names[i], "Fortify", 
        "Increases the unit defense and magic defense. Cost 8 sp!", i, [200, 45, 35, 15, 30])
      }

      else if (types[i] == "Knight")
      {
        units[i] = generateUnit("player", "Knight", names[i], "Heavy Blow", 
        "Unit attacks an enemy with a powerful blow. Cost 15 sp!", i, [150, 50, 20, 20, 30])
      }

      else if (types[i] == "Sorcerer")
      {
        units[i] = generateUnit("player", "Sorcerer", names[i], "Lighting", 
        "Attack the enemy with a powerful magic attack. Cost 15 sp!", i, [150, 50, 10, 30, 30])
      }

      else
      {
        units[i] = generateUnit("player", "Cleric", names[i], "Heal", 
        "Heals a single ally and this unit for 25% of their max hp. Can use on self to heal for 50% of hp. Cost 10 sp!",  
        i, [120, 30, 25, 25, 40])
      }
    }

    setPlayerUnits(units)
  }

  function generateEnemyUnits()
  {
    var units = [4]
    const names = ["Cedric", "Ella", "Joslynn", "Jaeden", "Earl", "Grace", "Davon", "Kaliah", "Alan", "Keenan",
        "Kiera", "May", "Aryan", "Melanie", "Terry", "Camille" ];
    const unitType = ["Armored Knight", "Knight", "Sorcerer", "Cleric"]

    for(var i = 0; i < 4; i++)
    {
      var ranName = Math.floor(Math.random() * names.length);
      var ranType = Math.floor(Math.random() * unitType.length);

      if(unitType[ranType] == "Armored Knight")
      {
        units[i] = generateUnit("enemy", "Armored Knight", names[ranName], "Fortify", 
        "Increases the unit defense and magic defense. Cost 8 sp!", i, [200, 45, 35, 15, 30])
      }

      else if (unitType[ranType] == "Knight")
      {
        units[i] = generateUnit("enemy", "Knight", names[ranName], "Heavy Blow", 
        "Unit attacks an enemy with a powerful blow. Cost 15 sp!", i, [150, 50, 20, 20, 30])
      }

      else if (unitType[ranType] == "Sorcerer")
      {
        units[i] = generateUnit("enemy", "Sorcerer", names[ranName], "Lighting", 
        "Attack the enemy with a powerful magic attack. Cost 15 sp!", i, [150, 50, 10, 30, 30])
      }

      else
      {
        units[i] = generateUnit("enemy", "Cleric", names[ranName], "Heal", 
        "Heals a single ally and this unit for 25% of their max hp. Can use on self to heal for 50% of hp. Cost 10 sp!", 
        i, [120, 30, 25, 25, 40])
      }
    }

    setEnemyUnits(units)
  }

  function generateUnit(unitSide, type, name, skName, skDesc, id, unitStats) {
    if(unitSide === 'player')
    {
      const addUnit = 
      {
        id: id,
        name: name,
        unitType: type,
	      maxHp: generateStat(unitStats[0]),
	      hp: 0,
	      att: generateStat(unitStats[1]),
	      defense: generateStat(unitStats[2]),
	      temporaryDefense: 0,
	      magicDefense: generateStat(unitStats[3]),
	      temporaryMagicDefense: 0,
	      maxSP: generateStat(unitStats[4]),
	      sp: 0,
        specialSkill: skName,
        specialSkillDesc: skDesc
      };

      addUnit.hp = addUnit.maxHp
      addUnit.sp = Math.round(addUnit.maxSP * .25)

      return addUnit
    }

    else if(unitSide === 'enemy')
    {
      const addUnit = 
      {
        id: id,
        name: name,
        unitType: type,
	      maxHp: generateStat(unitStats[0]),
	      hp: 0,
	      att: generateStat(unitStats[1]),
	      defense: generateStat(unitStats[2]),
	      temporaryDefense: 0,
	      magicDefense: generateStat(unitStats[3]),
	      temporaryMagicDefense: 0,
	      maxSP: generateStat(unitStats[4]),
	      sp: 0,
        specialSkill: skName,
        specialSkillDesc: skDesc
      };

      addUnit.hp = addUnit.maxHp
      addUnit.sp = Math.round(addUnit.maxSP * .25)

      return addUnit
    }
  }

  // This is used to randomize a stat for a unit
  function generateStat(unitStat)
  {
    const min = Math.round(unitStat * .85)
    stat = Math.floor(Math.random() * (unitStat - min + 1) + min)

    return stat;
  }

  function clearUnitList() {
    setPlayerUnits([]);
    setEnemyUnits([]);
  }

  // This is used to change the screenID variable
  function changeScreenID(screenNumber)
  {
    setScreenID(screenNumber);
  }

  function changeWinStatus(status)
  {
    setWinStatus(status);
  }

  function retrieveUnitInfo(side, id)
  {
    //console.log(obj)

    if(side == "player")
    {
      return playerUnits[id]
    }

    else if(side == "enemy")
    {
      return enemyUnits[id]
    }

    return "Can't retrieve unit"
  }


  let screen = <StartScreen startFunction={changeScreenID} infoFunction={changeScreenID} />

  switch(screenID)
  {
    case 0 :
      screen = <StartScreen startFunction={changeScreenID} infoFunction={changeScreenID} />
      break;
    case 1 :
      screen = <InfoScreen backFunction={changeScreenID} units={displayEnemyUnits} /> 

      break;
      
    case 2 :
      screen = <UnitSelectScreen backFunction={changeScreenID} startFunction={generatePlayerUnits} generateEnemies={generateEnemyUnits} />

      break;

    case 3 :
      screen = <BattleScreen unitInfo={retrieveUnitInfo} unitDisplay={displayEnemyUnits} gameOverFunction={e => changeScreenID(4)} winStatusFunction={changeWinStatus}/>

      break;
    
    case 4 : 
      screen = <GameOverScreen gameOverText={winStatus} backFunction={changeScreenID} />

      break;
  }

  return (
    <>
      <SafeAreaView style={styles.rootScreen}>
        {screen}
      </SafeAreaView> 
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: 'orange'
  }
});