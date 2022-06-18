const version_name = "v1.6.0a";
let blank_save = "0|1|0|10|0|50|0|250|0|1500|0|2750|0|4750|0|10000|0|15000|0|30000|0|35000|0|45000|0|55000|0|69000|0|0|0|0|100000|0|0|120000|0|1|0|4|0|0|150000|0|0|undefined|"
let premade_names = ['Josh',
'John',
'Jack',
'Eli',
'Shane',
'WhateverYourNameIs',
'']
let current_name = "&quot;";
let slogans = ['Free!',
'Where stupidity is breeded!',
'Where assholes get made fun of!',
"The dumping ground for rschoolu's inside jokes.",
'Eternal Screaming!',
'You did not ask for this game, yet you played it.',
'Brain cells die here.',
'IQ Graveyard!',
'Javascript!',
'const stupidity_level = infinity;',
'Born yesterday!',
'Janky!']
const tooltip_margin = 22;
let rubies = 0;
let rubylock = false;
const emerald_container = document.querySelector('#emerald-container');
const emerald = document.querySelector('#emerald');
const emerald_count_display = document.querySelector('#emerald-count-display');
const emerald_per_second_display = document.querySelector('#emerald-per-second-display');
const emerald_per_click_display = document.querySelector('#emerald-per-click-display')
const shop_container = document.querySelector('#shop-container');
const tooltip = document.querySelector('#tooltip');
const rich_div = document.querySelector('#rich-div');
const vol_control = document.querySelector('#volume-control');
const short_numbers_div = document.querySelector('#short-numbers-div');
const short_numbers_check = document.querySelector('#short-numbers-checkbox');
const ruby_counter_container = document.querySelector('#ruby-counter-container');
const ruby_count = document.querySelector('#ruby-count');
let rubylockdis;
short_numbers_div.addEventListener('mousemove', (e)=>{
    tooltip.innerHTML = "<a><b>Short Numbers</b></a><br><a>Just makes numbers more readable, and shorter.</a>"
    tooltip.hidden = false;
})
function openRubyShop() {
    if(!rubylock) { alert('Ruby shards are locked. Maybe get more emeralds?'); return }
    document.querySelector('#ruby-shop-container').hidden = false;
}
function closeRubyShop() {
    document.querySelector('#ruby-shop-container').hidden = true;
}
short_numbers_div.addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
short_numbers_check.addEventListener('change', (e)=>{
    if(short_numbers_check.checked) {
        shortnumbers = true;
    } else {
        shortnumbers = false;
    }
})
// https://stackoverflow.com/questions/9071573/is-there-a-simple-way-to-make-a-random-selection-from-an-array-in-javascript-or
function choose(choices) {
    /* var */let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
let shortnumbers = false;
vol_control.value = 100;
function doTheFormat(thing) {
    if(shortnumbers) {
        return new Intl.NumberFormat(undefined, {notation: "compact",compactDisplay: "long"}).format(thing)
    } else {
        return new Intl.NumberFormat().format(thing)
    }
}
ruby_counter_container.addEventListener('mousemove', (e)=>{
    if(rubylock) {
        rubylockdis = "<span style='color: green;'>Ruby shards are unlocked. You can collect them.</span>"
    } else {
        rubylockdis = "<span style='color: darkred;'>Ruby shards are locked. You are not able to collect them.</span>"
    }
    tooltip.hidden = false;
    tooltip.innerHTML = "<a><b>Ruby Shards</b></a><br><a>You can do amazing things with them, but there's a 1 in 10,000 chance of you getting one on a click.</a><br><a>" + rubylockdis + "</a>";
})
ruby_counter_container.addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
emerald.ondragstart = function() { return false; };
document.querySelector('#logo-png').ondragstart = function() { return false; };
document.querySelector("#ruby-thing").ondragstart = function() { return false; };
document.querySelector('#vol-display').innerHTML = vol_control.value;
vol_control.addEventListener('change', (e)=>{
    document.querySelector('#vol-display').innerHTML = vol_control.value;
})
vol_control.addEventListener('input', (e)=>{
    document.querySelector('#vol-display').innerHTML = vol_control.value;
})
document.querySelector('#volume-control-div').addEventListener('mousemove', (e)=>{
    tooltip.hidden = false;
    tooltip.innerHTML = "<a><b>Volume Control</b></a><br><a>It controls the volume of all the sounds.</a>";
})
document.querySelector('#volume-control-div').addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
emerald_count_display.addEventListener('mousemove', (e)=>{
    tooltip.hidden = false;
    tooltip.innerHTML = "<a>You have: " + new Intl.NumberFormat().format(money) + " Emeralds.</a>";
    
})
emerald_count_display.addEventListener("mouseout", (e)=>{
    tooltip.hidden = true;
})
function createLilFloatThing(e, epc) {
    //alert('1')
    const what = document.createElement('div');
    //alert('2')
    what.style = "position: absolute; top: " + (e.clientY - 25) + "; left: " + (e.clientX + 5) + "; animation: up 1s 1; font-size: 25px; ";
    //alert('3')
    what.innerHTML = "+" + epc;
    //alert('4')
    document.body.appendChild(what);
    //alert('5')
    setTimeout(()=>{ $(what).remove() }, 1000)
    
}
const upgrade_container = document.querySelector('#upgrades-container');
let low_fps_tooltip = false;
let music_disabled_pre = true; // this is useless
let money = 0;
let moneyPerSecond = 0;
let moneyPerClick = 1;
/* slogan */
function rerollSlogans() {
    document.querySelector('#slogan-text').innerHTML = choose(slogans);
}
rerollSlogans()
function rerollName() {
    current_name = choose(premade_names);
}
rerollName()
function sanitize(string) {
    let sani1 = string.replaceAll('"', '&quot;');
    return sani1;
}
document.querySelector('#emerald-mine-name').addEventListener('mousedown', (e)=>{
    let lelyouthink = prompt('Enter a new name:')
    if(lelyouthink == null) {
        return
    }
    current_name = sanitize(lelyouthink);
})
/* items */
let shop1 = {
    name: "Drill",
    desc: "Why use your hand to dig out the emeralds when you can drill them?",
    mps: 1,
    costMulti: 1.4,
    has: 0,
    cost: 10,
    rubyItem: false,
    upgrade: false
}
let shop2 = {
    name: "Pickaxe",
    desc: "Why not? Why not use a pickaxe?",
    mps: 2,
    costMulti: 1.4,
    has: 0,
    cost: 50,
    rubyItem: false,
    upgrade: false
}
let shop3 = {
    name: "Miner",
    desc: "Hire a miner to mine for you!",
    mps: 5,
    costMulti: 1.4,
    has: 0,
    cost: 250,
    rubyItem: false,
    upgrade: false
}
let shop4 = {
    name: "Robot",
    desc: "Why not a robot? How could a robot screw up?",
    mps: 10,
    costMulti: 1.4,
    has: 0,
    cost: 1500,
    rubyItem: false,
    upgrade: false
}
let shop5 = {
    name: "Machine",
    desc: "Why do you need people and robots when you can have BIG MACHINES?!?!?",
    mps: 20,
    costMulti: 1.4,
    has: 0,
    cost: 2750,
    rubyItem: false,
    upgrade: false
}
let shop6 = {
    name: "Shanebot",
    desc: "Shanebot can help you!",
    mps: 36,
    costMulti: 1.4,
    has: 0,
    cost: 4750,
    rubyItem: false,
    upgrade: false
}
let shop7 = {
    name: "Tommyrang",
    desc: "Tommyrang goes and mines emeralds and comes back to you with them!",
    mps: 50,
    costMulti: 1.4,
    has: 0,
    cost: 10000,
    rubyItem: false,
    upgrade: false
}
let shop8 = {
    name: "Druggy",
    desc: "la lala la la lalalalala la la lalala la laaa, laaa",
    mps: 69,
    costMulti: 1.4,
    has: 0,
    cost: 15000,
    rubyItem: false,
    upgrade: false
}
let shop9 = {
    name: "Detective",
    desc: "Finds missing emeralds in the mines.",
    mps: 100,
    costMulti: 1.4,
    has: 0,
    cost: 30000,
    rubyItem: false,
    upgrade: false
}
let shop10 = {
    name: "Sir Airpod",
    desc: "Sir Airpod uses his powers to mine up emeralds.",
    mps: 150,
    costMulti: 1.4,
    has: 0,
    cost: 35000,
    rubyItem: false,
    upgrade: false
}
let shop11 = {
    name: "Lucas Wooden Ring Maker",
    desc: "If he can make wooden rings, can't he mine emeralds?",
    mps: 175,
    costMulti: 1.4,
    has: 0,
    cost: 45000,
    rubyItem: false,
    upgrade: false
}
let shop12 = {
    name: "Luis The Asshole",
    desc: "His anger could have lots of potential...",
    mps: 200,
    costMulti: 1.4,
    has: 0,
    cost: 55000,
    rubyItem: false,
    upgrade: false
}
let shop13 = {
    name: "Shopping Carter",
    desc: "His selfies are family photos.",
    mps: 250,
    costMulti: 1.4,
    has: 0,
    cost: 69000,
    rubyItem: false,
    upgrade: false
}
let shop14 = {
    name: "School Router",
    desc: "Hijack the router to mine crypto-emeralds, trading them for real emeralds.",
    mps: 300,
    costMulti: 1.4,
    has: 0,
    cost: 100000,
    rubyItem: false,
    upgrade: false
}
let shop15 = {
    name: "School Chromebook",
    desc: "2GB of ram. 16GB of local storage. It'll do.",
    mps: 400,
    costMulti: 1.4,
    has: 0,
    cost: 120000,
    rubyItem: false,
    upgrade: false
}
let shop16 = {
    name: "Jamaal",
    desc: "He failed at school, maybe give him a shot at mining???",
    mps: 500,
    costMulti: 1.4,
    has: 0,
    cost: 150000,
    rubyItem: false,
    upgrade: false
}
let up1 = {
    name: "Mikey Mouse",
    id: "mikeymouse",
    desc: "It's the least an offbrand can do for you.",
    epc: 1,
    cost: 500,
    src: "./images/icons/mickey-mouse.png",
    soldout: false,
    special: false,
    upgrade: true
}
let up2 = {
    name: "Another Mouse",
    id: "anothermouse",
    desc: "Get another mouse!",
    epc: 1,
    cost: 600,
    src: "./images/icons/cursor-item.png",
    soldout: false,
    special: false,
    upgrade: true
}
/*let up3 = {
    name: "Exploits",
    desc: "This upgrade can multiply your Emeralds Per Click by 2! But there is a 50% chance that all your emeralds will be converted into negative emeralds!",
    src: "",
    epc: 0,
    cost: 0,
    soldout: false,
    special: false,
    upgrade: true
}*/
let up3 = {
    name: "Jase",
    id: "jase",
    desc: "Rodent Clicker.",
    epc: 10,
    cost: 5000,
    src: "./images/icons/jase.png",
    soldout: false,
    special: false,
    upgrade: true
}
let up4 = {
    name: "Jaelynn",
    id: "jae",
    desc: "YOU.",
    epc: 20,
    cost: 12000,
    src: "./images/icons/jae.png",
    soldout: false,
    special: false,
    upgrade: true
}
let up5 = {
    name: "Brandon Lice",
    id: "blice",
    desc: "lel its brandon lice",
    epc: 30,
    cost: 20000,
    src: "./images/icons/blice.png",
    soldout: false,
    special: false,
    upgrade: true
}
let ruby1 = {
    name: "Ruby Pickaxe",
    desc: "Ruby Pickaxes are WAY more valuable!",
    mps: 100000,
    costMulti: 2,
    has: 0,
    cost: 1,
    upgrade: false,
    rubyItem: true
}
let ruby2 = {
    name: "Ruby Miner",
    desc: "Miners made of rubies? If you say so...",
    mps: 250000,
    costMulti: 2,
    has: 0,
    cost: 4,
    upgrade: false,
    rubyItem: true
}
let up69 = {
    name: "Test",
    desc: "This is the description.",
    epc: 0,
    cost: 0,
    src: "",
    soldout: false,
    upgrade: true
}
let shop69 = {
    name: "Test",
    desc: "This is the description.",
    mps: 0,
    costMulti: 1,
    has: 0,
    cost: 0,
    upgrade: false
}
function nameTick() {
    document.querySelector('#emerald-mine-name').innerHTML = current_name + "'s Mine";
}
function positionRich(lel) {
    //$('#rich-div').css('bottom', lel - 999900);
    //if(lel >= 999900) {
    //    $('#rich-div').css('bottom', 2 / 999900);
    //}
    
}
document.querySelector('#version-display').innerHTML = version_name;
document.querySelector('#diamond-clicker-link').addEventListener('mousemove', (e)=>{
    tooltip.hidden = false;
    
    tooltip.innerHTML = "<a><b>https://edca.w3spaces.com/v3/index-1.html</b></a>";
})
document.querySelector('#diamond-clicker-link').addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
emerald.addEventListener('mousedown', (e)=>{
    $('#emerald').css('max-width', 225)
    $('#emerald').css('max-height', 150)
})
emerald.addEventListener('mouseup', (e)=>{
    setTimeout(()=>{$('#emerald').css('max-width', 300); $('#emerald').css('max-height', 200)}, 50)
})
function nofunc() {}
let ending;
function updateCAC(item) {
    if(item['rubyItem']) { ending = " Ruby Shards" } else {ending = " Emeralds"}
    const itemcount = window[item['name'] + "count"]
    const itemcost = window[item['name']+"cost"]
    itemcount.innerHTML = "You have: " + item['has'] + "."

    itemcost.innerHTML = ' Cost: ' + doTheFormat(item['cost']) + ending
}
let xpos;
let ypos;
document.addEventListener('mousemove', (e)=>{
    positionTooltip(e)
})
function positionTooltip(e){
    if(e.clientX > window.innerWidth - 200) {
        xpos = (e.clientX - tooltip_margin) - (parseInt($('#tooltip').css('width').replace("px", "")));
    } else {
        xpos = (e.clientX + tooltip_margin);
    } if (e.clientY > window.innerHeight - 400) {
        ypos = (e.clientY) - (parseInt($('#tooltip').css('height').replace("px", "")));
    } else {
        ypos = (e.clientY + tooltip_margin);
    }
    if(!low_fps_tooltip) {
        $('#tooltip').css('top', ypos + "px")
        $('#tooltip').css('left', xpos + "px")
    } else if (low_fps_tooltip) {
        setTimeout(()=>{$('#tooltip').css('top', ypos + "px")
        $('#tooltip').css('left', xpos + "px")}, 50)
    }
    
}
document.querySelector('#low-fps-tooltip-div').addEventListener('mousemove', (e)=>{
    tooltip.hidden = false;
    
    tooltip.innerHTML = "<a><b>Enable Low FPS Tooltip</b></a><br><a>Adds a delay before positioning the tooltip, if that's what you like.</a>"
})
document.querySelector('#low-fps-tooltip-div').addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
document.querySelector('#low-fps-tooltip').addEventListener('click', (e)=>{
    if(document.querySelector('#low-fps-tooltip').checked) {
        low_fps_tooltip = true;
    } else {
        low_fps_tooltip = false;
    }
})
function processPurchase(item, obj) {
    if(!item['rubyItem']) {
    if(money < item['cost'] || item['soldout']){
        return false
    }
}
    const purchaseSound = new Audio("./music/sound-effect/purchase.mp3")
    purchaseSound.volume = volume;
    purchaseSound.play()
    if(!item['upgrade']){
        if(item['rubyItem']) {
            if(rubies < item['cost']) {
                return false
            }
            rubies = rubies - item['cost']
            moneyPerSecond = moneyPerSecond + item['mps']
            item['cost'] = item['cost'] * item['costMulti']
            item['cost'] = Math.round(1*item['cost'])/1;
            item['has']++
            updateGame()
            return
        }
    money = money - item['cost'];
    // EFFECT!!!!!
    moneyPerSecond = moneyPerSecond + item['mps']
    // NOT EFFECT!!!!!
    item['cost'] = item['cost'] * item['costMulti']
    item['cost'] = Math.round(1*item['cost'])/1; // round cost to onethes?!?
    item['has']++
    updateGame()
} else {
    item['soldout'] = true;
    tooltip.hidden = true;
    money = money - item['cost'];
    moneyPerClick = moneyPerClick + item['epc']
    return true;
}
}
const ost = new Audio('./music/ost01.mp3');
ost.loop = true;
document.querySelector('#music').addEventListener('click', (e)=>{
    
    if(document.querySelector('#music').checked){
        ost.play()
    } else {
        ost.pause()
    }
})
document.querySelector('#modcheck-toltip').addEventListener('mousemove', (e)=>{
    tooltip.hidden = false;
    
    tooltip.innerHTML = "<a><b>Modcheck Help</b></a><br><a>This checks if you are a mod, enter the right password, and it lets you in.</a>"
})
document.querySelector('#modcheck-toltip').addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
document.querySelector('#music-option-div').addEventListener('mousemove', (e)=>{
    tooltip.hidden = false;
    
    tooltip.innerHTML = "<a><b>Enable Background Music</b></a><br><a>Enables Background Music.</a>"
})
document.querySelector('#music-option-div').addEventListener('mouseout', (e)=>{
    tooltip.hidden = true;
})
document.querySelector('#modcheck-button').addEventListener('mouseenter', (e)=>{clickSound()});
document.querySelector('#settings').addEventListener('mouseenter', (e)=>{clickSound()});
document.querySelector('#credits').addEventListener('mouseenter', (e)=>{clickSound()});
document.querySelector('#ruby-shop-button').addEventListener('mouseenter', (e)=>{clickSound()});
document.querySelector('#download-enter').addEventListener('mouseenter', (e)=>{clickSound()});
document.querySelector('#downloadFolder').addEventListener('mouseenter', (e)=>{clickSound()});
document.querySelector('#byMe').addEventListener('mouseenter', (e)=>{clickSound()});
function createShopItem(item) {
    let canbuy;
    let soldout;
    // do this if this is NOT an upgrade
    if(item['upgrade']==false) {
        if(item['rubyItem']==true) {
            const rubyItem = document.createElement('div');
            rubyItem.classList.add('ruby-item');
            rubyItem.innerHTML = '<a style="font-size: 18;"><b>' + item['name'] + '</b></a> <br><a>' + item['desc'] + '</a>';
            const costOfThat = document.createElement('a');
            const br = document.createElement('br')
            const br2 = document.createElement('br')
            const count = document.createElement('a')
            count.id = item['name'] + "count";
            count.innerHTML = "You have " 
            costOfThat.id = item['name'] + "cost";
            costOfThat.innerHTML = ' Cost: ' + doTheFormat(item['cost']);
            rubyItem.addEventListener('click', (e)=>{
                processPurchase(item)
            })
            rubyItem.addEventListener('mousemove', (e)=>{
                tooltip.hidden = false;
                if(rubies < item['cost']) {
                    canbuy = "<span style='color: darkred;'>You can't buy this item. You need " + doTheFormat(item['cost'] - rubies) + " more ruby shards.</span>"
                } else if (rubies == item['cost']) {
                    canbuy = "<span style='color: goldenrod;'>You can buy this item, but it will leave you with no more ruby shards.</span>"
                } else if (rubies > item['cost']) {
                    canbuy = "<span style='color: green'>You can buy this item, and it will leave you with " + doTheFormat(rubies - item['cost']) + " ruby shards left over.</span>"
                }
                tooltip.innerHTML = "<a style='font-size: 18;'><b>" + item['name'] + "</b></a><br><a>" + item['desc'] + "</a><br><a>Cost: " + doTheFormat(item['cost']) + " Ruby Shards</a><br><a>You have: " + item['has'] + ".</a><br><a>This adds " + doTheFormat(item['mps']) + " Emeralds Per Second.</a><br><a>" + canbuy + "</a>";
                
            })
            rubyItem.addEventListener('mouseenter', (e)=>{
                clickSound()
            })
            rubyItem.addEventListener('mouseout', (e)=>{
                tooltip.hidden = true;
            })
            document.querySelector('#ruby-shop').appendChild(rubyItem)
            rubyItem.appendChild(br2)
            rubyItem.appendChild(costOfThat)
            rubyItem.appendChild(br)
            rubyItem.appendChild(count) 
            return
        }
    const shopItem = document.createElement('div');
    shopItem.classList.add('shop-item');
    shopItem.innerHTML = '<a style="font-size: 18;"><b>' + item['name'] + '</b></a> <br><a>' + item['desc'] + '</a>';
    const costOfThat = document.createElement('a');
    const br = document.createElement('br')
    const br2 = document.createElement('br')
    const count = document.createElement('a')
    count.id = item['name'] + "count";
    count.innerHTML = "You have " 
    costOfThat.id = item['name'] + "cost";
    costOfThat.innerHTML = ' Cost: ' + doTheFormat(item['cost']);
    shopItem.addEventListener('click', (e)=>{
        processPurchase(item)
    })
    shopItem.addEventListener('mousemove', (e)=>{
        tooltip.hidden = false;
        if(money < item['cost']) {
            canbuy = "<span style='color: darkred;'>You can't buy this item. You need " + doTheFormat(item['cost'] - money) + " more emeralds.</span>"
        } else if (money == item['cost']) {
            canbuy = "<span style='color: goldenrod;'>You can buy this item, but it will leave you with no more emeralds.</span>"
        } else if (money > item['cost']) {
            canbuy = "<span style='color: green'>You can buy this item, and it will leave you with " + doTheFormat(money - item['cost']) + " emeralds left over.</span>"
        }
        tooltip.innerHTML = "<a style='font-size: 18;'><b>" + item['name'] + "</b></a><br><a>" + item['desc'] + "</a><br><a>Cost: " + doTheFormat(item['cost']) + " Emeralds</a><br><a>You have: " + item['has'] + ".</a><br><a>This adds " + doTheFormat(item['mps']) + " Emeralds Per Second.</a><br><a>" + canbuy + "</a>";
        
    })
    shopItem.addEventListener('mouseenter', (e)=>{
        clickSound()
    })
    shopItem.addEventListener('mouseout', (e)=>{
        tooltip.hidden = true;
    })
    document.querySelector('#shop-container').appendChild(shopItem)
    shopItem.appendChild(br2)
    shopItem.appendChild(costOfThat)
    shopItem.appendChild(br)
    shopItem.appendChild(count)
    // do this if it is an upgrade
} else {
    const upgradeItem=document.createElement('div')
    const imag = document.createElement('img')
    const name = document.createElement('a');
    name.style = "font-size: 20; position: relative; top: -20%; left: 20px; transform: translate(0px, -50%); color: black;"
    name.innerHTML = item['name']
    imag.src = item['src']
    imag.style = "width: 40px; height: 40px; position: relative; top: 50%; left: 5px; transform: translate(0px, -50%);"
    upgradeItem.id = item['id'] + "up"
    upgradeItem.classList.add('upgrade-item')
    upgradeItem.addEventListener('mouseenter', (e)=>{
        clickSound()
    })
    upgradeItem.addEventListener('mousemove', (e)=>{
        if(item['soldout']) {
            soldout = "<br><a><span style='color: darkred'>You've already have bought this item. It cannot be boughten again.</span></a>"
        } else {
            soldout = ""
        }
        if(money < item['cost']) {
            canbuy = "<span style='color: darkred;'>You can't buy this item. You need " + doTheFormat(item['cost'] - money) + " more emeralds.</span>"
        } else if (money == item['cost']) {
            canbuy = "<span style='color: goldenrod;'>You can buy this item, but it will leave you with no more emeralds.</span>"
        } else if (money > item['cost']) {
            canbuy = "<span style='color: green'>You can buy this item, and it will leave you with " + doTheFormat(money - item['cost']) + " emeralds left over.</span>"
        }
        tooltip.hidden = false;
        
        if(!item['soldout']) {
        tooltip.innerHTML = '<a style="font-size: 18;"><b>' + item['name'] + '</b></a><br><a>' + item['desc'] + '</a><br><a>Cost: ' + doTheFormat(item['cost']) + ' Emeralds</a><br><a>This adds ' + doTheFormat(item['epc']) + ' Emeralds Per Click.</a><br><a>' + canbuy + '</a>' + soldout
    } else {
        tooltip.innerHTML = '<a><b>' + item['name'] + '</b></a><a>' + soldout + '</a>';
    }
    })
    upgradeItem.addEventListener('mouseout', (e)=>{
        tooltip.hidden = true;
    })
    upgradeItem.addEventListener('click', ()=>{
        if(!item['soldout']) {
            if(processPurchase(item)){
                $(upgradeItem).remove()
            } else {
                
            }
        }
    })
    imag.ondragstart = function() { return false; };
    upgradeItem.appendChild(imag)
    upgradeItem.appendChild(name)
    upgrade_container.appendChild(upgradeItem)
}
}
function updateGame() {
    emerald_count_display.innerHTML = 'Emeralds: ' + doTheFormat(money);
    emerald_per_second_display.innerHTML = 'Emeralds per second: ' + new Intl.NumberFormat().format(moneyPerSecond);
    emerald_per_click_display.innerHTML = 'Emeralds per click: ' + new Intl.NumberFormat().format(moneyPerClick)
    updateCAC(shop1)
    updateCAC(shop2)
    updateCAC(shop3)
    updateCAC(shop4)
    updateCAC(shop5)
    updateCAC(shop6)
    updateCAC(shop7)
    updateCAC(shop8)
    updateCAC(shop9)
    updateCAC(shop10)
    updateCAC(shop11)
    updateCAC(shop12)
    updateCAC(shop13)
    updateCAC(shop14)
    updateCAC(shop15)
    updateCAC(shop16)
    updateCAC(ruby1)
    updateCAC(ruby2)
    positionRich(money)
    ruby_count.innerHTML = rubies;
}
/* thank you, mdn web docs :)*/
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function clangSound() {
    let sideways = getRandomArbitrary(1, 4);
    if(sideways == 1) {
        const audio = new Audio('./music/sound-effect/metalPickaxeClang01.mp3');
        audio.volume = volume;
        audio.play();
    } else if(sideways == 2) {
        const audio1 = new Audio('./music/sound-effect/metalPickaxeClang02.mp3');
        audio1.volume = volume;
        audio1.play();
    } else if(sideways == 3) {
        const audio2 = new Audio('./music/sound-effect/metalPickaxeClang03.mp3');
        audio2.volume = volume;
        audio2.play();
    }
}
const selAud = new Audio('./music/sound-effect/select.mp3');
function clickSound() {
    selAud.pause()
    selAud.currentTime = 00;
    selAud.volume = volume;
    selAud.play();
}
emerald.addEventListener('click', (e)=>{
    money = moneyPerClick + money;
    if(rubylock) {
        let chance = getRandomArbitrary(0, 10000);
        if(chance == 0) {
            rubies++
        }
    }
    updateGame()
    clangSound()
    createLilFloatThing(e, moneyPerClick)
})

createShopItem(shop1)
createShopItem(shop2)
createShopItem(shop3)
createShopItem(shop4)
createShopItem(shop5)
createShopItem(shop6)
createShopItem(shop7)
createShopItem(shop8)
createShopItem(shop9)
createShopItem(shop10)
createShopItem(shop11)
createShopItem(shop12)
createShopItem(shop13)
createShopItem(shop14)
createShopItem(shop15)
createShopItem(shop16)
createShopItem(ruby1)
createShopItem(ruby2)
createShopItem(up1)
createShopItem(up2)
createShopItem(up3)
createShopItem(up4)
createShopItem(up5)
let volume;
setInterval(()=>{
    volume = vol_control.value / 100;
    ost.volume = 0.1 * volume;
}, 0);
setInterval(()=>{
    money = money + moneyPerSecond;
    updateGame();
}, 1000);
updateGame();
function s(string) {
    return string+"|"
}
/* times 
0) money
1) moneyperclick
2) moneypersecond
3) shop1['cost']
4) shop1['has']
5) shop2['cost']
6) shop2['has']
7) shop3['cost']
8) shop3['has']
9) shop4['cost']
10) shop4['has']
11) shop5['cost']
12) shop5['has']
13) shop6['cost']
14) shop6['has']
15) shop7['cost']
16) shop7['has']
17) shop8['cost']
18) shop8['has']
19) shop9['cost']
20) shop9['has']
21) shop10['cost']
22) shop10['has']
23) shop11['cost']
24) shop11['has']
25) shop12['cost']
26) shop12['has']
27) shop13['cost']
28) shop13['has']
*/
const prin = function(string) {
    return parseInt(string)
}
function load(string) {
    let on = 0;
    let ram = "";
    for(let i = 0;; i++) {
        if(string.charAt(i) == "|") {
            if(on == 0) {
                money = prin(ram)
                ram = "";
                on++
            } else if (on == 1) {
                moneyPerClick = prin(ram)
                ram = "";
                on++
            } else if (on == 2) {
                moneyPerSecond = prin(ram)
                ram = "";
                on++
            } else if (on == 3) {
                shop1['cost'] = prin(ram)
                ram = "";
                on++
            } else if (on == 4) {
                shop1['has'] = prin(ram)
                ram = "";
                on++
            } else if (on == 5) {
                shop2['cost'] = prin(ram)
                ram = "";
                on++
            } else if (on == 6) {
                shop2['has'] = prin(ram)
                ram = "";
                on++
            } else if(on == 7) {
                shop3['cost'] = prin(ram)
                ram = "";
                on++
            } else if(on == 8) {
                shop3['has'] = prin(ram)
                ram="";
                on++
            } else if(on == 9) {
                shop4['cost'] = prin(ram)
                ram="";
                on++
            } else if(on == 10) {
                shop4['has'] = prin(ram)
                ram="";
                on++
            } else if (on == 11) {
                shop5['cost'] = prin(ram)
                ram="";
                on++
            } else if (on == 12) {
                shop5['has'] = prin(ram);
                ram="";
                on++
            } else if (on == 13) {
                shop6['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 14) {
                shop6['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 15) {
                shop7['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 16) {
                shop7['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 17) {
                shop8['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 18) {
                shop8['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 19) {
                shop9['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 20) {
                shop9['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 21) {
                shop10['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 22) {
                shop10['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 23) {
                shop11['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 24) {
                shop11['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 25) {
                shop12['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 26) {
                shop12['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 27) {
                shop13['cost'] = prin(ram)
                ram="";
                on++
            }else if (on == 28) {
                shop13['has'] = prin(ram)
                ram="";
                on++
            }else if (on == 29) {
                if(ram=="1"){
                    up1['soldout'] = true;
                    $("#mikeymouseup").remove()
                }else{

                }
                ram="";
                on++
            }else if (on == 30) {
                if(ram=="1"){
                    up2['soldout'] = true;
                    $("#anothermouseup").remove()
                }else{

                }
                ram="";
                on++
            }else if (on == 31) {
                if(ram=="1"){
                    up3['soldout'] = true;
                    $("#jaseup").remove()
                }else{

                }
                ram="";
                on++
            } else if (on == 32) {
                shop14['cost'] = prin(ram)
                ram=""
                on++
            } else if (on == 33) {
                shop14['has'] = prin(ram)
                ram=""
                on++
            } else if (on == 34) {
                rubies = prin(ram);
                ram=""
                on++
            } else if (on == 35) {
                shop15['cost'] = prin(ram);
                ram=""
                on++
            } else if (on == 36) {
                shop15['has'] = prin(ram)
                ram=""
                on++
            } else if (on == 37) {
                ruby1['cost'] = prin(ram)
                ram=""
                on++
            } else if (on == 38) {
                ruby1['has'] = prin(ram)
                ram=""
                on++
            } else if (on == 39) {
                ruby2['cost'] = prin(ram)
                ram=""
                on++
            } else if (on == 40) {
                ruby2['has'] = prin(ram)
                ram=""
                on++
            } else if (on == 41) {
                if(ram=="1"){
                    up4['soldout'] = true;
                    $("#jaeup").remove()
                }else{

                }
                ram="";
                on++
            } else if (on == 42) {
                shop16['cost'] = prin(ram)
                ram="";
                on++
            } else if (on == 43) {
                shop16['has'] = prin(ram)
                ram=""
                on++
            } else if (on ==44) {
                if(ram=="1"){
                    up5['soldout'] = true;
                    $("#bliceup").remove()
                }else{

                }
                ram="";
                on++
            } else if (on == 45) {
                current_name = ram;
                ram=""
                on++
            }
        } else if(string.charAt(i) != "") {
            ram += string.charAt(i)
        } else {
            break
        }
    }
}
function save() {
    prompt('Save this file somewhere safe, after all it contains your save.', 
    s(money) + s(moneyPerClick) + s(moneyPerSecond) +
    s(shop1['cost']) + s(shop1['has']) + s(shop2['cost']) +
    s(shop2['has']) + s(shop3['cost']) + s(shop3['has']) +
    s(shop4['cost']) + s(shop4['has']) + s(shop5['cost']) +
    s(shop5['has']) + s(shop6['cost']) + s(shop6['has']) +
    s(shop7['cost']) + s(shop7['has']) + s(shop8['cost']) + 
    s(shop8['has']) + s(shop9['cost']) + s(shop9['has']) +
    s(shop10['cost']) + s(shop10['has']) + s(shop11['cost']) +
    s(shop11['has']) + s(shop12['cost']) + s(shop12['has']) +
    s(shop13['cost']) + s(shop13['has']) + s(up1['soldout'] + 0) +
    s(up2['soldout'] + 0) + s(up3['soldout'] + 0) + s(shop14['cost']) +
    s(shop14['has']) + s(rubies) + s(shop15['cost']) + s(shop15['has']) +
    s(ruby1['cost']) + s(ruby1['has']) + s(ruby2['cost']) + s(ruby2['has']) +
    s(up4['soldout'] + 0) + s(shop16['cost']) + s(shop16['has']) + s(up5['soldout'] + 0) +
    s(current_name)
    )
}
setInterval(() => {
    if(money >= 10000000) {
        rubylock = true;
    }
    nameTick()
}, 0);
closeRubyShop()
function preLoadSave() {
    let sure = confirm("Do you REALLY want to load a save?");
    if(sure) {
        load(blank_save);
        let propt = prompt('Enter a save:');
        load(propt)
    }
}