const ATTACK_VALUE = 10;
const STROGN_ATTACK_VALUE = 15;
const HEAL_VALUE = 5;

let hasBonusLife = true;
let chosenMaxLife = 100;
let killedMonsters = 0;
adjustHealthBars(chosenMaxLife);
displayStats(killedMonsters);

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

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
        reset();
    }
    else if (currentMonsterHealth <= 0)
    {
        alert("You won!");
        killedMonsters++;
        displayStats(killedMonsters);
        reset();
    }
    else if (currentPlayerHealth <= 0)
    {
        alert("You lost!");
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
    const recievedDmg = dealPlayerDamage(ATTACK_VALUE);
    currentPlayerHealth -= recievedDmg;

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

    const recievedDmg = dealPlayerDamage(ATTACK_VALUE);
    currentPlayerHealth -= recievedDmg;

    endRound();
}

attackBtn.addEventListener("click", onAttack);
strongAttackBtn.addEventListener("click", onStrongAttack);
healBtn.addEventListener("click", onHeal);