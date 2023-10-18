// Initialize coin count
let coinCount = 0;

//constructor for Tool object
function Tool(count, basevalue,value, cost, name) {
    this.count = count;
    this.basevalue = basevalue;
    this.value = value
    this.cost = cost;
    this.name = name;
  }

const club = new Tool(0,1,0,10,'club');
const bridge = new Tool(0,5,0,100,'bridge');

const clubInfoArray = generateInfoArray(club);
const bridgeInfoArray = generateInfoArray(bridge);


function updateInfoArray(tool, infoArray) {
    // Update the existing infoArray in place
    infoArray[0] = tool.name;
    infoArray[1] = tool.count;
    infoArray[2] = tool.value;
}

let coinGenerationRate = 1;
let coinClickPower = 1;
let coinGenerationFormula = (club.value + bridge.value) * coinGenerationRate;





// Get references to buttons
const clickButton = document.getElementById('clickButton');
const buyclubButton = document.getElementById('buyclub');
const buy10clubsbutton = document.getElementById('buy10clubs')
const buybridgeButton = document.getElementById('buybridge');
const buy10bridgesbutton = document.getElementById('buy10bridges');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const darkmodebutton = document.getElementById('darkmodebutton');
const lighmodebutton = document.getElementById('lighmodebutton');

const apiUrl = 'https://worldtimeapi.org/api/timezone/Etc/GMT';
const gmtTimeElement = document.getElementById('gmtTime');

fetchTime();

// Function to update the coin count display
function updatecoinCount() {  
     // Check if coinCount is a valid number
        try {
            if (typeof coinCount !== 'number' || isNaN(coinCount)) {
                throw new Error("Invalid coinCount value");
            }
    
          } catch (err) {
            console.error(err);
            coinCount = 0;
            console.log("Coincount reset activated");
          }
        
    
    let formatedcoinCount = 0;


    if (coinCount >= 1000000) {
        formatedcoinCount = (coinCount / 1000000).toFixed(3) + 'm';
    } else if (coinCount >= 1000) {
        formatedcoinCount = (coinCount / 1000).toFixed(3) + 'k';
    } else {
        formatedcoinCount = coinCount.toFixed(0);
    }
    const resultElement = document.getElementById('coinCount');
    const coinspersecondElement = document.getElementById('coinspersecond');
    resultElement.textContent = `${formatedcoinCount} coins`;
    coinspersecondElement.textContent =`generating ${coinGenerationFormula} coins/s`
}

function handleClick() {
    // Add the "clicked" class to trigger the animation
    clickButton.classList.add('clicked');

    // Remove the "clicked" class after a short delay (e.g., 200ms)
    setTimeout(function () {
        clickButton.classList.remove('clicked');
    }, 200); // 200ms delay (adjust as needed)
}

// Event listener for button click
clickButton.addEventListener('click', function () {
    // Increase the coin count by coinClickPower when the button is clicked
    coinCount = coinCount + coinClickPower;
    // Update the coin count display
    handleClick();
    updatecoinCount();

});

function updatecoinGenerationFormula(){
coinGenerationFormula = (club.value + bridge.value) * coinGenerationRate;
}


// Function to buy a specific type of tool
function buyTool(tool) {

    if (coinCount >= tool.cost) {
        coinCount -= tool.cost;
        tool.count++;
        tool.cost = Math.round(tool.cost * 1.1); // Increase cost by 10%
        updatecoinCount();
        updateToolValue(tool);
        updateToolInfo(tool);
        updatecoinGenerationFormula();
        

    } else {
        alert(`You do not have enough coins to buy a ${tool.name}.`);
    }
}


function buyXTool(value, tool) {
    let x = tool.cost;
    let totalCost = 0;

    for (let i = 0; i < value; i++) {
        totalCost += x;
        x = Math.round(x * 1.1);
    } 

    if (coinCount >= totalCost) {
        coinCount -= totalCost;
        tool.count += value;
        tool.cost = Math.round(x);
        updatecoinCount();
        updateToolValue(tool);
        updateToolInfo(tool);
        updatecoinGenerationFormula();

    } else {
        alert(`You do not have enough coins to buy ${value} ${tool.name}s, cost is ${Math.round(totalCost)}`);
    }
}

function updateToolInfo(tool) {
    let sectionId = '';
    if (tool.name === "club"){
        sectionId="clubSection";
    } else if (tool.name === "bridge"){
        sectionId='bridgeSection';
    } else {
        alert(`nothing matched ${tool}`)
        return;
    }
    
    const section = document.getElementById(sectionId);
    section.querySelector('.buy-button').textContent = `Upgrade ${tool.name}`;
 
    section.querySelector('.cost').textContent = tool.cost;
   
    section.querySelector('.count').textContent = tool.count;
    
}

function buyupgrade1() {
    if (coinCount >= 100) {
        coinCount -= 100;
        updatecoinCount;
        updateClickPower(coinClickPower * 2);
        const upgrade1Button = document.getElementById('upgrade1');
        upgrade1Button.remove()

    } else {
        alert('You do not have enough coins to buy this upgrade.');
    }
}

function buyupgrade2() {
    if (coinCount >= 100) {
        coinCount -= 100;
        updatecoinCount;
        updateToolBaseValue(club.basevalue * 2,club);
        updateToolValue(club);
        updatecoinGenerationFormula();
        const upgrade2Button = document.getElementById('upgrade2');
        upgrade2Button.remove()

    } else {
        alert('You do not have enough coins to buy this upgrade.');
    }
}

function checkcoinThreshold() {
    if (coinCount >= 10) {
        upgrades.classList.remove('menuhidden');
        
 }
}

function updateClickPower(value){
    coinClickPower = value; 
}

function updateToolValue(tool){   
      tool.value = tool.basevalue * tool.count;
}

function updateToolBaseValue(value, tool){
    tool.basevalue = value;
    updateToolValue;
}


// Function to generate coins automatically
function generatecoins() {
    coinCount += coinGenerationFormula/10;
    updatecoinCount();
    checkcoinThreshold(); // Check if the threshold is met
}

// Update the coin count display every 0.1 seconds
setInterval(generatecoins, 100);

function setdarkmode(){
    document.getElementById('stylesheet1').disabled = false;
    document.getElementById('stylesheet2').disabled = true;
}

function setlightmode(){
    document.getElementById('stylesheet1').disabled = true;
    document.getElementById('stylesheet2').disabled = false;
}

document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page
    const submittedName = document.getElementById('trollName').value;
    const trollText = document.getElementById('trollText');
    const headerTitle = document.getElementById('headerTitle');
    trollText.textContent = `Click on ${submittedName}`;
    headerTitle.textContent = `${submittedName} Clicker`;
    document.title = `${submittedName} Clicker`;
});

// Event listener for each button
buyclubButton.addEventListener('click',function(){
    buyTool(club);
});

buybridgeButton.addEventListener('click',function(){
    buyTool(bridge);
});
upgrade1Button.addEventListener('click',buyupgrade1);
upgrade2Button.addEventListener('click',buyupgrade2);
darkmodebutton.addEventListener('click',setdarkmode);
lighmodebutton.addEventListener('click',setlightmode);
buy10clubsbutton.addEventListener('click',function(){
    buyXTool(10,club);
});

buy10bridgesbutton.addEventListener('click',function(){
    buyXTool(10,bridge);
});

setInterval(fetchTime, 30000);


function fetchTime(){

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const currentTime = new Date(data.utc_datetime);
        const formattedTime = currentTime.toLocaleTimeString('en-US', { timeStyle: 'short' });
        gmtTimeElement.textContent = `GMT Time: ${formattedTime}`;
      })
      .catch(error =>{
        console.error('Error fetching time:', error)
        gmtTimeElement.textContent = 'API CALL FAILED';
      });

      
}

function generateInfoArray(tool) {
    return [tool.name, tool.count, tool.value];
}

function updateInfoArray(tool, infoArray) {
    // Update the existing infoArray in place
    infoArray[0] = tool.name;
    infoArray[1] = tool.count;
    infoArray[2] = tool.value;
}

setInterval(updateArraysAndTable,1000);

function updateArraysAndTable(){
    updateInfoArray(club, clubInfoArray);
    updateInfoArray(bridge, bridgeInfoArray);


    document.getElementById('clubTName').textContent = clubInfoArray[0];
    document.getElementById('clubTCount').textContent = clubInfoArray[1];
    document.getElementById('clubTValue').textContent = clubInfoArray[2];

    document.getElementById('bridgeTName').textContent = bridgeInfoArray[0];
    document.getElementById('bridgeTCount').textContent = bridgeInfoArray[1];
    document.getElementById('bridgeTValue').textContent = bridgeInfoArray[2];


    console.log('clubinfo',clubInfoArray);
    console.log('bridgeinfo',bridgeInfoArray)
}
