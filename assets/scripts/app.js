//GLOBAL VARIABLES
const ATTACK_VALUE = 10;
const STROGN_ATTACK_VALUE = 15;
const HEAL_VALUE = 5;

//LOG EVENT VARIABLES
const PLAYER_ATTACK = "PLAYER ATTACK";
const MONSTER_ATTACK = "MONSTER_ATTACK";
const PLAYER_HEAL = "PLAYER_HEAL";
const GAME_OVER = "GAME_OVER";
const VICTORY = "VICTORY";
const DEFEAT = "DEFEAT";
const DRAW = "DRAW";
const BONUS_LIFE_USED = "BONUS_LIFE_USED";
let battleLog = [];

//GAME VARIABLES
let hasBonusLife = true;
let chosenMaxLife = 100;
let killedMonsters = 0;


//Defining the maximum health
chosenMaxLife = parseInt(prompt("Please enter the desired maximum health value: ", "100")); 
//Invalid entery results in a default value of 100
if (isNaN(chosenMaxLife) || chosenMaxLife<=0)
    chosenMaxLife = 100;
adjustHealthBars(chosenMaxLife);
displayStats(killedMonsters);

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function addToLog(event, value)
{
    let logElement = {
        event: event,
        value: value,
        playerHealth: currentPlayerHealth,
        monsterHealth: currentMonsterHealth
    };
    battleLog.push(logElement);
}

function writeLog()
{
    console.log(battleLog);
}

function reset(maxHealth = chosenMaxLife)
{
    currentMonsterHealth = maxHealth;
    currentPlayerHealth = maxHealth;
    resetGame(chosenMaxLife);
}

function endRound()
{
    //Checking if bonus life should be used
    if (currentPlayerHealth <= 0 && hasBonusLife)
    {
        hasBonusLife = false;
        removeBonusLife();
        increasePlayerHealth((-currentPlayerHealth)+chosenMaxLife/4)
        currentPlayerHealth = chosenMaxLife/4;
        alert("Bonus life used, your health is now at 25%!");
    }

    //Checking if the game is over
    if (currentMonsterHealth <=0 && currentPlayerHealth <= 0)
    {
        alert("It's a draw!");
        killedMonsters++;
        displayStats(killedMonsters);
        addToLog(GAME_OVER, DRAW);
        reset();
    }
    else if (currentMonsterHealth <= 0)
    {
        alert("You won!");
        killedMonsters++;
        displayStats(killedMonsters);
        addToLog(GAME_OVER, VICTORY);
        reset();
    }
    else if (currentPlayerHealth <= 0)
    {
        alert("You lost!");
        addToLog(GAME_OVER, DEFEAT);
        reset();
    }
}

function attackMonster(mode)
{
    //Checking attack type
    let damage = 0;
    if (mode === "normal")
    {
        damage = dealMonsterDamage(ATTACK_VALUE);
    }
    else if (mode ==="strong")
    {
        damage = dealMonsterDamage(STROGN_ATTACK_VALUE);
    }
    
    //Dammage distribution
    currentMonsterHealth -= damage;
    addToLog(MONSTER_ATTACK, damage);
    const recievedDmg = dealPlayerDamage(ATTACK_VALUE);
    currentPlayerHealth -= recievedDmg;
    addToLog(PLAYER_ATTACK, recievedDmg);

    endRound();
}

function onAttack()
{
    attackMonster("normal");
}
function onStrongAttack()
{
    attackMonster("strong");
}

function onHeal()
{
    if (currentPlayerHealth+HEAL_VALUE >= chosenMaxLife)
    {
        alert("You can't heal beyond maximum health");
        return;
    }

    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth+=HEAL_VALUE;
    addToLog(PLAYER_HEAL, HEAL_VALUE);

    const recievedDmg = dealPlayerDamage(ATTACK_VALUE);
    currentPlayerHealth -= recievedDmg;
    addToLog(PLAYER_ATTACK, recievedDmg);

    endRound();
}

attackBtn.addEventListener("click", onAttack);
strongAttackBtn.addEventListener("click", onStrongAttack);
healBtn.addEventListener("click", onHeal);
logBtn.addEventListener("click", writeLog);