const ATTACK_VALUE = 10;
const STROGN_ATTACK_VALUE = 15;
const HEAL_VALUE = 10;

let chosenMaxLife = 100;

adjustHealthBars(chosenMaxLife);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function setHealth(maxHealth)
{
    currentMonsterHealth = maxHealth;
    currentPlayerHealth = maxHealth;
}

function endRound()
{
    //Checking if the game is over
    if (currentMonsterHealth <=0 && currentPlayerHealth <= 0)
    {
        alert("It's a draw!");
        resetGame(chosenMaxLife);
        setHealth(chosenMaxLife);
    }
    else if (currentMonsterHealth <= 0)
    {
        alert("You won!");
        resetGame(chosenMaxLife);
        setHealth(chosenMaxLife);
    }
    else if (currentPlayerHealth <= 0)
    {
        alert("You lost!");
        resetGame(chosenMaxLife);
        setHealth(chosenMaxLife);
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