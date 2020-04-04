const ATTACK_VALUE = 10;
const STROGN_ATTACK_VALUE = 15;
let chosenMaxLife = 100;

adjustHealthBars(chosenMaxLife);
let currentMonsterHealth = chosenMaxLife;
let currentHealth = chosenMaxLife;

function setHealth(maxHealth)
{
    currentMonsterHealth = maxHealth;
    currentHealth = maxHealth;
}

function endRound()
{
    //Checking if the game is over
    if (currentMonsterHealth <=0 && currentHealth <= 0)
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
    else if (currentHealth <= 0)
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
    currentHealth -= recievedDmg;
}

function onAttack()
{
    attackMonster("normal");
}
function onStrongAttack()
{
    attackMonster("strong");
}

attackBtn.addEventListener("click", onAttack);
strongAttackBtn.addEventListener("click", onStrongAttack)