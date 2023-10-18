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

//creating tools
const club = new Tool(0,1,0,10,'club');
const bridge = new Tool(0,5,0,100,'bridge');

//creating arrays that contain some relevant tool info for my table purposes and grading purposes
const clubInfoArray = generateInfoArray(club);
const bridgeInfoArray = generateInfoArray(bridge);


// set up some coin related values
let coinGenerationRate = 1;
let coinClickPower = 1;
// I set up coingenerationformula as a global so it's more eesy to expand  and use now and later
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
//Get API related things, worldtimeapi is an open API that can be used in multiple ways
const apiUrl = 'https://worldtimeapi.org/api/timezone/Etc/GMT';
const gmtTimeElement = document.getElementById('gmtTime');

//I call fetch time function here so it gets called early, function is explained later
fetchTime();

// function that updates the inputed tool array (above), takes in the object (tool) and the relevant array name (e.g clubInfoArray)
function updateInfoArray(tool, infoArray) { 
    
    infoArray[0] = tool.name;
    infoArray[1] = tool.count;
    infoArray[2] = tool.value;
}


// Function to update the coin count display
function updatecoinCount() {  
     // Check if coinCount is a valid number, used try,throw catch for grading purposes.
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
    //this if logic makes displaying large numbers more pleasing to a eye
    if (coinCount >= 1000000) {
        formatedcoinCount = (coinCount / 1000000).toFixed(3) + 'm';
    } else if (coinCount >= 1000) {
        formatedcoinCount = (coinCount / 1000).toFixed(3) + 'k';
    } else {
        formatedcoinCount = coinCount.toFixed(0);
    }
    //some basic DOM manipulation here so we can display the coin information on the html website.
    const resultElement = document.getElementById('coinCount');
    const coinspersecondElement = document.getElementById('coinspersecond');
    
    resultElement.textContent = `${formatedcoinCount} coins`;
    coinspersecondElement.textContent =`generating ${coinGenerationFormula} coins/s`
}

//handleClick function makes the on click animation possible 
function handleClick() {
    clickButton.classList.add('clicked');
    // Using timeout to remove the "clicked" class after a short delay 
    setTimeout(function () {
        clickButton.classList.remove('clicked');
    }, 200); 
}

// Event listener for the button click
clickButton.addEventListener('click', function () {
    // Increase the coin count by coinClickPower when the button is clicked
    coinCount = coinCount + coinClickPower;
    // function calls to update coin count display and the previous function that makes the animation possible
    handleClick();
    updatecoinCount();

});

//Basic function that updates the coinGenerationFormula
function updatecoinGenerationFormula(){
coinGenerationFormula = (club.value + bridge.value) * coinGenerationRate;
}


// Function to buy a specific type of tool, it takes a tool object in and handles it.
function buyTool(tool) {
    //some basic math logic so you cant buy something if you don't have the coins
    if (coinCount >= tool.cost) {
        coinCount -= tool.cost;
        // adding 1 tool
        tool.count++;
        //I used math.round becouse i like it when the numbers are round
        tool.cost = Math.round(tool.cost * 1.1); // Increase cost by 10%
        updatecoinCount();
        updateToolValue(tool);
        updateToolInfo(tool);
        updatecoinGenerationFormula();
        
    // if you don't have the coin game gives you an alert
    } else {
        alert(`You do not have enough coins to buy a ${tool.name}.`);
    }
}

//function similiar to one before this but it tries to buy X amount items, in the current game it is used to buy 10 of something.
function buyXTool(value, tool) {
    let x = tool.cost;
    let totalCost = 0;
    //for loop where it calculates how much coin would it take to buy x amount of item
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
        //This alert is similiar to the but it tells you little bit more information that is useful to know.
        alert(`You do not have enough coins to buy ${value} ${tool.name}s, cost is ${Math.round(totalCost)}`);
    }
}
//function that updates the relevant tools information
function updateToolInfo(tool) {
    let sectionId = '';
    //This if loop might seem clunky if you think object oriented way, but i was under a time crunch and it works as a error check in this way. 
    if (tool.name === "club"){
        sectionId="clubSection";
    } else if (tool.name === "bridge"){
        sectionId='bridgeSection';
    } else {
        alert(`nothing matched ${tool}`)
        return;
    }
    //here is some DOM manipulation that updates the relevant tools section
    const section = document.getElementById(sectionId);
    section.querySelector('.buy-button').textContent = `Upgrade ${tool.name}`;
    section.querySelector('.cost').textContent = tool.cost;
    section.querySelector('.count').textContent = tool.count;
    
}

//Function to buy the first upgrade, upgrades aren't objects at the moment becouse they are quite unique in their effect at the moment
function buyupgrade1() {
    if (coinCount >= 100) {
        coinCount -= 100;
        updatecoinCount;
        updateClickPower(coinClickPower * 2);
        //DOM manipulation to remove the upgrade button so it can't be purchased twice
        const upgrade1Button = document.getElementById('upgrade1');
        upgrade1Button.remove()

    } else {
        alert('You do not have enough coins to buy this upgrade.');
    }
}
//function to buy the second upgrade
function buyupgrade2() {
    if (coinCount >= 100) {
        coinCount -= 100;
        updatecoinCount;
        updateToolBaseValue(club.basevalue * 2,club);
        updateToolValue(club);
        updatecoinGenerationFormula();
        //DOM manipulation to remove the upgrade button so it can't be purchased twice
        const upgrade2Button = document.getElementById('upgrade2');
        upgrade2Button.remove()

    } else {
        alert('You do not have enough coins to buy this upgrade.');
    }
}

//this function check the coin amount and when there are enough collected coins it reveals the upgrade section by removing a class that hides it
function checkcoinThreshold() {
    if (coinCount >= 10) {
        upgrades.classList.remove('menuhidden');
        
 }
}
//simple function that updates the coinClickPower to the given value
function updateClickPower(value){
    coinClickPower = value; 
}
//Simple function that updates the given tool's value
function updateToolValue(tool){   
      tool.value = tool.basevalue * tool.count;
}

//Simple function that updates the tool's base value to the given value and then also calls to update it's value (becouse baseValue affects the value)
function updateToolBaseValue(value, tool){
    tool.basevalue = value;
    updateToolValue;
}


// Function to generate coins automatically this gets called 10 times per second by upcoming setInterval
function generatecoins() {
    //Becouse i wanted the function to be called 10 per second i must divide the coingenerationformula by 10 to make the math check out
    coinCount += coinGenerationFormula/10;
    updatecoinCount();
    //here is also called the thershold checker
    checkcoinThreshold(); 
}

// Update the coin count display every 0.1 seconds
setInterval(generatecoins, 100);

//Function that changes the stylesheet to the dark one
function setdarkmode(){
    document.getElementById('stylesheet1').disabled = false;
    document.getElementById('stylesheet2').disabled = true;
}
//Function that changes the stylesheet to the light one 
function setlightmode(){
    document.getElementById('stylesheet1').disabled = true;
    document.getElementById('stylesheet2').disabled = false;
}

//here is the eventlistener that waits the user to submit their troll's name and by DOM manipulation changes all instances of the word "troll" with submited name
document.getElementById('nameForm').addEventListener('submit', function(event) {
     // Prevents the form from submitting and refreshing the page
    event.preventDefault();
    const submittedName = document.getElementById('trollName').value;
    const trollText = document.getElementById('trollText');
    const headerTitle = document.getElementById('headerTitle');
    trollText.textContent = `Click on ${submittedName}`;
    headerTitle.textContent = `${submittedName} Clicker`;
    document.title = `${submittedName} Clicker`;
});

// Event listeners for rest of the buttons , one below is an example of one i had to do differently becouse otherwise those functions get called when ever the website loads 
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

//setinterval that updates the time every half a minute, i didn't want to spam too many API calls becouse i feel it's unnice
setInterval(fetchTime, 30000);

//Function that utilizes fetch api call function to get the gmt time to display on the site
function fetchTime(){

    fetch(apiUrl)
    // .then waits for the api to respond and if it responds function handles the information
      .then(response => response.json())
      .then(data => {
        const currentTime = new Date(data.utc_datetime);
        const formattedTime = currentTime.toLocaleTimeString('en-US', { timeStyle: 'short' });
        gmtTimeElement.textContent = `GMT Time: ${formattedTime}`;
      })
      //if error occurs it console logs it and changes the time display to API CALL FAILED
      .catch(error =>{
        console.error('Error fetching time:', error)
        gmtTimeElement.textContent = 'API CALL FAILED';
      });

      
}
 //function that creates a new array utilizing the given tool's information
function generateInfoArray(tool) {
    return [tool.name, tool.count, tool.value];
}
//Function that updates the given array's information based on the given object
function updateInfoArray(tool, infoArray) {
    // Update the existing infoArray in place
    infoArray[0] = tool.name;
    infoArray[1] = tool.count;
    infoArray[2] = tool.value;
}


//1 second interval that call the update function below this
setInterval(updateArraysAndTable,1000);

 // Function that updates the arrays and also updates the table on the website
function updateArraysAndTable(){
    updateInfoArray(club, clubInfoArray);
    updateInfoArray(bridge, bridgeInfoArray);


    document.getElementById('clubTName').textContent = clubInfoArray[0];
    document.getElementById('clubTCount').textContent = clubInfoArray[1];
    document.getElementById('clubTValue').textContent = clubInfoArray[2];

    document.getElementById('bridgeTName').textContent = bridgeInfoArray[0];
    document.getElementById('bridgeTCount').textContent = bridgeInfoArray[1];
    document.getElementById('bridgeTValue').textContent = bridgeInfoArray[2];



}
