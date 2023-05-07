import { View, 
    Image, 
    Text, 
    ScrollView,
    StyleSheet, 
    useWindowDimensions,
    useRef
 } from 'react-native'

import PrimaryButton from '../components/PrimaryButton';
import Colors from '../assets/Colors';
import CharacterWindow from '../components/CharacterWindow';
import CharacterSelect from '../components/CharacterSelect';
import { useState } from 'react';

function BattleScreen({unitInfo, gameOverFunction, winStatusFunction}) {
    const [unitSelected, setUnitSelected] = useState(false)
    const [targetModeActive, setTargetModeActive] = useState(false)
    const [moveType, setMoveType] = useState("")
    const [unitID, setUnitID] = useState(0)
    const [playerTargettable, setPlayerTargettable] = useState([true, true, true, true])
    const [unitResets, setUnitResets] = useState(4)
    const [gameover, setGameover] = useState(false)
    const [battleText, setBattleText] = useState("")

    if(gameover != true)
    {
        if(playerTargettable.every(val=> val === false) && unitResets != 0)
        {
            for(var i = 0; i < 4; i++)
            {
                var unit = unitInfo("enemy", i)

                unit.sp += 4

                if(unit.sp > unit.maxSP)
                {
                    unit.sp = unit.maxSP
                }

                unit.temporaryDefense = 0
                unit.temporaryMagicDefense = 0
            }
            
            enemyTurn()

            for(var p = 0; p < 4; p++)
            {
                unit = unitInfo("player", p)

                unit.sp += 4

                if(unit.sp > unit.maxSP)
                {
                    unit.sp = unit.maxSP
                }

                unit.temporaryDefense = 0
                unit.temporaryMagicDefense = 0
            }

            setBattleText("")

            setUnitResets(0)
        }

        if(unitResets < 4)
        {
            var unit = unitInfo("player", unitResets)

            if(unit.hp > 0)
            {
                changePlayerTargetabble(true, unitResets)
            }
            
            setUnitResets(unitResets + 1)
        }
    }

    function enemyTurn()
    {
        for(var i = 0; i < 4; i++)
        {
            const unit = unitInfo("enemy", i)

            if(unit.hp > 0)
            {
                var choice = Math.floor(Math.random() * 3);
                var target = Math.floor(Math.random() * 4);

                if(unitInfo("player", target).hp <= 0)
                {
                    target = -1

                    for(var nt = 0; nt < 4; nt++)
                    {
                        if(unitInfo("player", nt).hp > 0)
                        {
                            target = nt
                        }
                    }
                }

                if(target == -1)
                {
                    break
                }

                switch(choice)
                {
                    case 0:
                        if(unit.unitType == "Knight" && unit.sp == unit.maxSP || unit.unitType == "Sorcerer" && unit.sp == unit.maxSP )
                        {
                            specialSkill("enemy", unit, unitInfo("player", target))
                        }

                        else
                        {
                            guard(unit.unitType, "enemy", unit.id)
                        }

                        break;
                    case 1:
                        attack(unit, unitInfo("player", target), 0)

                        break;
                    case 2:
                        if(unit.unitType == "Armored Knight" && unit.sp >= 8)
                        {
                            specialSkill("enemy", unit, "N/A")
                        }

                        else if(unit.unitType == "Knight" && unit.sp >= 15 || unit.unitType == "Sorcerer" && unit.sp >= 15)
                        {
                            specialSkill("enemy", unit, unitInfo("player", target))
                        }

                        else if(unit.unitType == "Cleric" && unit.sp >= 10)
                        {
                            var ranTarget = -1;

                            for(var a = 0; a < 4; a++)
                            {   
                                var newTarget = unitInfo("enemy", a)
                                
                                var hpMissing = newTarget.maxHp - newTarget.hp;
                                                            
                                if(newTarget.hp > 0)
                                {                                    
                                    if (hpMissing != 0)
                                    {
                                        
                                        if (ranTarget == -1)
                                        {
                                            ranTarget = a;
                                        }

                                        
                                        else
                                        {
                                            var currentTarget = unitInfo("enemy", ranTarget)
                                            
                                            var currentTargetHp = currentTarget.maxHp - currentTarget.hp

                                            if (hpMissing > currentTargetHp)
                                            {
                                                ranTarget = a;
                                            }
                                        }
                                    }
                                }
                            }

                            if (ranTarget == -1)
                            {
                                guard(unit.unitType, "enemy", unit.id)
                            }

                            else
                            {
                                specialSkill("enemy", unit, unitInfo("enemy", ranTarget))
                            }
                        }

                        else
                        {
                            guard(unit.unitType, "enemy", unit.id)
                        }

                        break;
                }
            }
        }

        var go = gameover;

        setGameover(true)
        go = true

        for(var g = 0; g < 4; g++)
        {
            if(unitInfo("player", g).hp > 0)
            {
                setGameover(false)
                go = false
                break
            }
        }

        if(go == true)
        {
            winStatusFunction("You Lose!")
            gameOverFunction()
        }
    }

    function moveTypeHandler(user, target, unitSide)
    {
        if(moveType == "attack")
        {
            if(unitSide == "player")
            {
                changePlayerTargetabble(false, user.id)
            }

            attack(user, target, 0)
        }

        else if(moveType == "special")
        {
            specialSkill(unitSide, user, target)
        }
    
        else
        {
            if(unitSide == "player")
            {
                closeCharacterWindow()
                setTargetModeActive(false)
            }
        }

        if(unitSide == "player")
        {
            var go = gameover;

            setGameover(true)
            go = true

            for(var i = 0; i < 4; i++)
            {
                if(unitInfo("enemy", i).hp > 0)
                {
                    setGameover(false)
                    go = false
                    break
                }
            }

            if(go == true)
            {
                winStatusFunction("You Win!")
                gameOverFunction()
            }
        }
    }

    function changePlayerTargetabble(targetabble, id)
    {
        var playerTargets = [4]

        for(var i = 0; i < 4; i++)
        {
            playerTargets[i] = playerTargettable[i]
        }

        playerTargets[id] = targetabble

        setPlayerTargettable(playerTargets)
    }
    
    function attack(attacker, defender, extraDamage)
    {
        var dmg = 0;

        if(attacker.unitType == "Armored Knight" || attacker.unitType == "Knight")
        {
        dmg = (attacker.att + extraDamage) - (defender.defense + defender.temporaryDefense)
        }

        else if(attacker.unitType == "Sorcerer" || attacker.unitType == "Cleric")
        {
        dmg = (attacker.att + extraDamage) - (defender.magicDefense + defender.temporaryMagicDefense)
        }

        if(dmg > 0)
        {
            defender.hp -= dmg

            closeCharacterWindow()
            setTargetModeActive(false)

            if(defender.hp <= 0)
            {
                defender.hp = 0

                setBattleText(battleText + "\n"  + defender.unitType + " " + defender.name + " has been killed by " + attacker.unitType + " " + attacker.name)
            }

            setBattleText(battleText + "\n"  + defender.unitType + " " + defender.name + " " + " took " + dmg + " damage!")
        }

        else
        {
            closeCharacterWindow()
            setTargetModeActive(false)
            
            setBattleText(battleText + "\n"  + defender.unitType + " " + defender.name + " " + " took no damage!")
        }
    }

    function heal(healer, target)
    {
        if(target == healer)
        {
            var healAmount = Math.round(target.maxHp * .50)
            target.hp += healAmount

            setBattleText(battleText + "\n" + "Unit was healed for " + healAmount + " hp!\n" 
            + healer.unitType + " " + healer.name + " used 10 sp")       

            if(target.hp > target.maxHp)
            {
                target.hp = target.maxHp
            }
        }

        else
        {
            var healAmount = Math.round(target.maxHp * .25)
            target.hp += healAmount

            setBattleText(battleText + "\n" + "Unit was healed for " + healAmount + " hp!\n" 
            + healer.unitType + " " + healer.name + " used 10 sp")       

            if(target.hp > target.maxHp)
            {
                target.hp = target.maxHp
            }
        }
    }

    function guard(unitType, unitSide, id)
    {
        const unit = unitInfo(unitSide, id)

        if(unitType == "Armored Knight")
        {
            unit.temporaryDefense += 6

            setBattleText(battleText + "\n"  + unit.unitType + " " + unit.name + " used guard. Defense has increased by 6.")
        }

        else if (unitType == "Knight")
        {
            unit.temporaryDefense += 3
            unit.sp += 4

            setBattleText(battleText + "\n"  + unit.unitType + " " + unit.name + " used guard. Defense has increased by 3 and 4 sp has been regained.")

            if(unit.sp > unit.maxSP)
            {
                unit.sp = unit.maxSP
            }
        }

        else if (unitType == "Sorcerer")
        {
            unit.temporaryMagicDefense += 3
            unit.sp += 4

            setBattleText(battleText + "\n"  + unit.unitType + " " + unit.name + " used guard. Magic defense has increased by 3 and 4 sp has been regained.")

            if(unit.sp > unit.maxSP)
            {
                unit.sp = unit.maxSP
            }
        }

        else
        {
            unit.temporaryDefense += 4
            unit.temporaryMagicDefense += 4

            setBattleText(battleText + "\n"  + unit.unitType + " " + unit.name + " used guard. Defense and magic defense has increased by 4.")
        }

        if(unitSide == "player")
        {
            changePlayerTargetabble(false, id)
        }
    }

    function specialSkill(unitSide, attacker, target)
    {
        var specialSkillUsed = false

        if(attacker.unitType == "Armored Knight" && attacker.sp >= 8)
        {
            attacker.temporaryDefense += 6
            attacker.temporaryMagicDefense += 6
            attacker.sp -= 8
            specialSkillUsed = true           
            setBattleText(battleText + "\n"  + attacker.unitType + " " + attacker.name + " used 8 sp"
            + "\ndefense and magic defense increase by 8!")

            if(unitSide == "player")
            {
                changePlayerTargetabble(false, attacker.id)
                closeCharacterWindow()
                setTargetModeActive(false)
            }
        }

        else if (attacker.unitType == "Knight" && attacker.sp >= 15)
        {
            const extraDamage = Math.round(attacker.att * .25);
            attack(attacker, target, extraDamage)
            attacker.sp -= 15
            specialSkillUsed = true
            setBattleText(battleText + "\n"  + attacker.unitType + " " + attacker.name + " used 15 sp")

            if(unitSide == "player")
            {
                changePlayerTargetabble(false, attacker.id)
                closeCharacterWindow()
                setTargetModeActive(false)
            }
        }

        else if (attacker.unitType == "Sorcerer" && attacker.sp >= 15)
        {
            const extraDamage = Math.round(attacker.att * .25)
            attack(attacker, target, extraDamage)
            attacker.sp -= 15
            specialSkillUsed = true
            setBattleText(battleText + "\n"  + attacker.unitType + " " + attacker.name + " used 15 sp")

            if(unitSide == "player")
            {
                changePlayerTargetabble(false, attacker.id)
                closeCharacterWindow()
                setTargetModeActive(false)
            }
        }

        else if(attacker.unitType == "Cleric" && attacker.sp >= 10)
        {
            if(target.hp <= 0)
            {
                closeCharacterWindow()
                setTargetModeActive(false)

                setBattleText(battleText + "\n"  + "Target is dead!")
            }

            else if(target.hp == target.maxHp)
            {
                closeCharacterWindow()
                setTargetModeActive(false)

                setBattleText(battleText + "\n"  + "Target's health is full!")
            }

            else
            {
                heal(unitInfo(unitSide, attacker.id), target)

                attacker.sp -= 10

                if(unitSide == "player")
                {
                    changePlayerTargetabble(false, attacker.id)
                    closeCharacterWindow()
                    setTargetModeActive(false)
                    specialSkillUsed = true
                }
            }
        }

        if(specialSkillUsed == false)
        {
            closeCharacterWindow()
            setTargetModeActive(false)

            setBattleText(battleText + "\n"  + "Not enough SP")
        }
    }

    let content = (
        <>
            <View style={styles.characterSelectContainer}>
                <CharacterSelect 
                    targetabble = {playerTargettable[0]}
                    unit={unitInfo("player", 0)} 
                    onPress={e => displayCharacterWindow(0)} 
                />
                <CharacterSelect 
                    targetabble = {playerTargettable[1]}
                    unit={unitInfo("player", 1)}
                    onPress={e => displayCharacterWindow(1)} 
                />
            </View>
            <View style={styles.characterSelectContainer}>
                <CharacterSelect 
                    targetabble = {playerTargettable[2]}
                    unit={unitInfo("player", 2)} 
                    onPress={e => displayCharacterWindow(2)} 
                />
                <CharacterSelect 
                    targetabble = {playerTargettable[3]}
                    unit={unitInfo("player", 3)} 
                    onPress={e => displayCharacterWindow(3)} />
            </View>
        </>
    );

    if(targetModeActive == true)
    {
        if(unitInfo("player", unitID).unitType == "Armored Knight" && moveType == "special")
        {
            specialSkill("player", unitInfo("player", unitID), "N/A")
        }

        else if(unitInfo("player", unitID).unitType == "Cleric" && moveType == "special")
        {
            content = (
                <CharacterWindow 
                    unit={unitInfo("player", unitID)} 
                    targetMode={true}
                    targets={[unitInfo("player", 0), unitInfo("player", 1), unitInfo("player", 2), unitInfo("player", 3)]}
                    moveTypeFunction = {moveTypeHandler}
                    backFunction={() => {setTargetModeActive(false); setMoveType("");}}     
                />
            );
        }

        else
        {
            content = (
                <CharacterWindow 
                    unit={unitInfo("player", unitID)} 
                    targetMode={true}
                    targets={[unitInfo("enemy", 0), unitInfo("enemy", 1), unitInfo("enemy", 2), unitInfo("enemy", 3)]}
                    moveTypeFunction = {moveTypeHandler}
                    backFunction={() => {setTargetModeActive(false); setMoveType("");}}     
                />
            );
        }
    }

    else if(unitSelected == true)
    {
        content = (
            <CharacterWindow 
                unit={unitInfo("player", unitID)} 
                backFunction={e => closeCharacterWindow()} 
                attackFunction={() => {setMoveType("attack"); setTargetModeActive(true)}} 
                guardFunction={ e => [guard(unitInfo("player", unitID).unitType, "player", unitID), closeCharacterWindow()]} 
                specialFunction={() => {setMoveType("special"); setTargetModeActive(true)}}     
            />
        );
    }

    function displayCharacterWindow(id)
    {
        setUnitID(id)
        setUnitSelected(true)
    }

    function closeCharacterWindow()
    {
        setUnitSelected(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.characterSelectContainer}>
                <CharacterSelect 
                    targetabble = {false}
                    unit={unitInfo("enemy", 0)} 
                />
                <CharacterSelect 
                    targetabble = {false}
                    unit={unitInfo("enemy", 1)} 
                />
            </View>
            <View style={styles.characterSelectContainer}>
                <CharacterSelect 
                    targetabble = {false}
                    unit={unitInfo("enemy", 2)} 
                />
                <CharacterSelect 
                    targetabble = {false}
                    unit={unitInfo("enemy", 3)} 
                />
            </View>
            <View style={styles.empty}>
            </View>
            <View>
                {content}
            </View>

            <View style={styles.messageBox}>
                <Text style={styles.messageBoxText}>{battleText}</Text>
            </View>
        </View>
    );
}

export default BattleScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 70,
        marginLeft: 100,
        marginRight: 100
    },
    characterSelectContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    empty: {
        marginVertical: 50
    },
    messageBox: {
        backgroundColor: "white",
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: "center"
    },
    messageBoxText: {
        textAlign: "center",
        fontSize: 11
    }
});