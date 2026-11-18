
const $=id=>document.getElementById(id), screens=["homeScreen","settingsScreen","auctionScreen","resultsScreen"];
const state={mode:"marvel",budget:200,opponents:3,difficulty:"easy",teams:[],lots:[],lotIndex:0,current:null,bid:0,leader:null,passed:new Set(),closed:false,deadline:0,timer:null,aiTimer:null,results:[],battleRun:0,lastCountdown:null,aiThinking:false,paused:false,remaining:5,speed:1,skipMode:false,fixtures:[],matchDetails:[]};
const marvel=[
["Iron Man","iron","Genius · Tech armour",88,12,"Genius inventor with advanced armour and powerful weapons."],
["Captain America","captain","Leader · Tactician",79,10,"Peak human conditioning, vibranium shield and exceptional leadership."],
["Thor","thor","God · Heavy hitter",97,14,"Asgardian god with immense strength, lightning and Mjolnir or Stormbreaker."],
["Spider-Man","spider","Agile · Quick thinker",84,8,"Superhuman strength, spider-sense, agility and web technology."],
["Black Panther","panther","Tactician · Warrior",82,9,"Elite warrior, tactical genius and vibranium suit."],
["Doctor Strange","strange","Mystic · Support",98,13,"Master of mystic arts with portals, shields and powerful spells."],
["Hulk","hulk","Power · Tank",95,11,"Grows stronger with anger and possesses extraordinary durability."],
["Black Widow","widow","Spy · Specialist",70,6,"Highly trained spy, tactician and hand-to-hand combat expert."],
["Scarlet Witch","witch","Mystic · Reality warper",96,15,"Chaos magic, telekinesis and reality-altering abilities."],
["Loki","loki","Trickster · Mystic",89,7,"Illusions, sorcery, shapeshifting and cunning strategy."],
["Captain Marvel","marvel","Cosmic · Power",96,14,"Cosmic energy projection, flight and immense physical power."],
["Ant-Man","ant","Stealth · Specialist",76,5,"Size manipulation and clever use of Pym technology."],
["Doctor Doom","doom","Genius · Mystic · Ruler",99,18,"Brilliant scientist and sorcerer with advanced armour and powerful magic."],
["Thanos","thanos","Titan · Heavy hitter",98,20,"A near-unstoppable Titan with immense strength, durability and tactical skill."],
["Silver Surfer","surfer","Cosmic · Energy",98,18,"Power Cosmic grants energy control, flight, speed and matter manipulation."],
["Jean Grey (Phoenix)","phoenix","Mystic · Cosmic",100,25,"Phoenix Force host with vast telepathy, telekinesis and cosmic power."],
["Galactus","galactus","Cosmic · Entity",100,30,"Cosmic entity with power on a scale far beyond most heroes and villains."],
["Deadpool","deadpool","Regeneration · Specialist",80,8,"Unpredictable fighter with an extraordinary healing factor."],
["Wolverine","wolverine","Regeneration · Warrior",85,9,"Adamantium claws, enhanced senses and powerful regeneration."],
["Vision","vision","Android · Energy",90,10,"Density control, flight, super strength and energy projection."],
["Sentry","sentry","Cosmic · Power",100,28,"Overwhelming strength, flight and energy abilities with immense potential."],
["Ultron","ultron","AI · Technology",91,11,"Adaptive artificial intelligence with advanced armour and weapon systems."],
["Hawkeye","hawkeye","Archer · Tactician",76,6,"Master archer with trick arrows, precision and exceptional aim."],
["Magneto","magneto","Mutant · Energy control",97,17,"Controls magnetic fields and can manipulate metal on a massive scale."],
["Ghost Rider","ghost","Supernatural · Mystic",98,18,"Supernatural Spirit of Vengeance with hellfire and formidable resilience."],
["Hela","hela","Asgardian · Mystic",96,16,"Asgardian goddess with immense strength and conjured weapons."],
["Venom","venom","Symbiote · Heavy hitter",89,10,"Powerful alien symbiote with strength, agility and regeneration."],
["Carnage","carnage","Symbiote · Heavy hitter",91,12,"Extremely dangerous symbiote with shapeshifting weapons and regeneration."],
["Quicksilver","quicksilver","Speedster · Specialist",86,9,"Superhuman speed and rapid reflexes."],
["Shang-Chi","shangchi","Martial artist · Warrior",86,9,"Exceptional martial artist with mastery of combat techniques."],
["Winter Soldier","winter","Assassin · Warrior",82,8,"Elite combatant with a powerful cybernetic arm."],
["Daredevil","daredevil","Martial artist · Specialist",78,7,"Enhanced senses, radar perception and elite martial arts."],
["War Machine","warmachine","Genius · Tech armour",87,10,"Military-grade powered armour with heavy weapons and flight."],
["Adam Warlock","adam","Cosmic · Mystic",97,17,"Cosmic energy, enhanced physical abilities and powerful mystical potential."],
["Star-Lord","starlord","Tactician · Tech",80,8,"Resourceful leader using advanced gear and tactical improvisation."],
["Groot","groot","Flora · Heavy hitter",82,8,"Powerful plant-based body, regeneration and limb manipulation."],
["Rocket Raccoon","rocket","Genius · Tech",78,7,"Brilliant engineer, weapons expert and tactical problem-solver."],
["Mysterio","mysterio","Illusion · Tactician",77,7,"Master of elaborate illusions, drones and psychological tricks."],
["Green Goblin","goblin","Tech · Heavy hitter",84,9,"Enhanced strength, agility and advanced weapons on a glider."]];
const cricketRoster=[{"name":"Virat Kohli","id":"virat-kohli","role":"Batter","rating":96,"base":1,"desc":"Batter · Current IPL pool","group":0},{"name":"Jasprit Bumrah","id":"jasprit-bumrah","role":"Bowler","rating":98,"base":1,"desc":"Bowler · Current IPL pool","group":1},{"name":"Rohit Sharma","id":"rohit-sharma","role":"Batter","rating":94,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Hardik Pandya","id":"hardik-pandya","role":"All-rounder","rating":90,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Ravindra Jadeja","id":"ravindra-jadeja","role":"All-rounder","rating":94,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Suryakumar Yadav","id":"suryakumar-yadav","role":"Batter","rating":95,"base":1,"desc":"Batter · Current IPL pool","group":0},{"name":"Rashid Khan","id":"rashid-khan","role":"Bowler","rating":96,"base":1,"desc":"Bowler · Current IPL pool","group":1},{"name":"Jos Buttler","id":"jos-buttler","role":"Wicketkeeper","rating":95,"base":1,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Trent Boult","id":"trent-boult","role":"Bowler","rating":89,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Glenn Maxwell","id":"glenn-maxwell","role":"All-rounder","rating":84,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Rishabh Pant","id":"rishabh-pant","role":"Wicketkeeper","rating":82,"base":0.2,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Pat Cummins","id":"pat-cummins","role":"Bowler","rating":94,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"MS Dhoni","id":"ms-dhoni","role":"Wicketkeeper","rating":91,"base":0.5,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Ruturaj Gaikwad","id":"ruturaj-gaikwad","role":"Batter","rating":83,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Sanju Samson","id":"sanju-samson","role":"Wicketkeeper","rating":88,"base":0.2,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Shivam Dube","id":"shivam-dube","role":"All-rounder","rating":82,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Dewald Brevis","id":"dewald-brevis","role":"Batter","rating":90,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Noor Ahmad","id":"noor-ahmad","role":"Bowler","rating":91,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"KL Rahul","id":"kl-rahul","role":"Wicketkeeper","rating":89,"base":0.5,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Axar Patel","id":"axar-patel","role":"All-rounder","rating":88,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Kuldeep Yadav","id":"kuldeep-yadav","role":"Bowler","rating":93,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Mitchell Starc","id":"mitchell-starc","role":"Bowler","rating":94,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Tristan Stubbs","id":"tristan-stubbs","role":"Batter","rating":90,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"David Miller","id":"david-miller","role":"Batter","rating":92,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Shubman Gill","id":"shubman-gill","role":"Batter","rating":84,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Sai Sudharsan","id":"sai-sudharsan","role":"Batter","rating":88,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Mohammed Siraj","id":"mohammed-siraj","role":"Bowler","rating":83,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Kagiso Rabada","id":"kagiso-rabada","role":"Bowler","rating":91,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Prasidh Krishna","id":"prasidh-krishna","role":"Bowler","rating":85,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Washington Sundar","id":"washington-sundar","role":"All-rounder","rating":89,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Shreyas Iyer","id":"shreyas-iyer","role":"Batter","rating":82,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Arshdeep Singh","id":"arshdeep-singh","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Yuzvendra Chahal","id":"yuzvendra-chahal","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Marcus Stoinis","id":"marcus-stoinis","role":"All-rounder","rating":86,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Marco Jansen","id":"marco-jansen","role":"All-rounder","rating":91,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Rinku Singh","id":"rinku-singh","role":"Batter","rating":84,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Sunil Narine","id":"sunil-narine","role":"All-rounder","rating":93,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Varun Chakravarthy","id":"varun-chakravarthy","role":"Bowler","rating":82,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Cameron Green","id":"cameron-green","role":"All-rounder","rating":84,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Matheesha Pathirana","id":"matheesha-pathirana","role":"Bowler","rating":86,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Nicholas Pooran","id":"nicholas-pooran","role":"Wicketkeeper","rating":90,"base":0.5,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Mitchell Marsh","id":"mitchell-marsh","role":"All-rounder","rating":83,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Avesh Khan","id":"avesh-khan","role":"Bowler","rating":91,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Mohammed Shami","id":"mohammed-shami","role":"Bowler","rating":88,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Wanindu Hasaranga","id":"wanindu-hasaranga","role":"All-rounder","rating":86,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Yashasvi Jaiswal","id":"yashasvi-jaiswal","role":"Batter","rating":85,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Dhruv Jurel","id":"dhruv-jurel","role":"Wicketkeeper","rating":93,"base":0.5,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Riyan Parag","id":"riyan-parag","role":"Batter","rating":88,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Jofra Archer","id":"jofra-archer","role":"Bowler","rating":93,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Ravi Bishnoi","id":"ravi-bishnoi","role":"Bowler","rating":92,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Sandeep Sharma","id":"sandeep-sharma","role":"Bowler","rating":90,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Rajat Patidar","id":"rajat-patidar","role":"Batter","rating":85,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Phil Salt","id":"phil-salt","role":"Wicketkeeper","rating":87,"base":0.2,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Josh Hazlewood","id":"josh-hazlewood","role":"Bowler","rating":91,"base":0.5,"desc":"Bowler · Current IPL pool","group":1},{"name":"Bhuvneshwar Kumar","id":"bhuvneshwar-kumar","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Krunal Pandya","id":"krunal-pandya","role":"All-rounder","rating":92,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Tim David","id":"tim-david","role":"Batter","rating":84,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Abhishek Sharma","id":"abhishek-sharma","role":"Batter","rating":89,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Travis Head","id":"travis-head","role":"Batter","rating":94,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Heinrich Klaasen","id":"heinrich-klaasen","role":"Wicketkeeper","rating":94,"base":0.5,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Ishan Kishan","id":"ishan-kishan","role":"Wicketkeeper","rating":91,"base":0.5,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Nitish Kumar Reddy","id":"nitish-kumar-reddy","role":"All-rounder","rating":93,"base":0.5,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Harshal Patel","id":"harshal-patel","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · Current IPL pool","group":1},{"name":"Tilak Varma","id":"tilak-varma","role":"Batter","rating":86,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Aiden Markram","id":"aiden-markram","role":"All-rounder","rating":86,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Sam Curran","id":"sam-curran","role":"All-rounder","rating":86,"base":0.2,"desc":"All-rounder · Current IPL pool","group":3},{"name":"Jitesh Sharma","id":"jitesh-sharma","role":"Wicketkeeper","rating":85,"base":0.2,"desc":"Wicketkeeper · Current IPL pool","group":2},{"name":"Vaibhav Suryavanshi","id":"vaibhav-suryavanshi","role":"Batter","rating":92,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Ayush Mhatre","id":"ayush-mhatre","role":"Batter","rating":93,"base":0.5,"desc":"Batter · Current IPL pool","group":0},{"name":"Priyansh Arya","id":"priyansh-arya","role":"Batter","rating":85,"base":0.2,"desc":"Batter · Current IPL pool","group":0},{"name":"Suresh Raina","id":"suresh-raina","role":"Batter","rating":87,"base":0.2,"desc":"Batter · IPL legend","group":0},{"name":"AB de Villiers","id":"ab-de-villiers","role":"Wicketkeeper","rating":98,"base":1,"desc":"Wicketkeeper · IPL legend","group":2},{"name":"Chris Gayle","id":"chris-gayle","role":"Batter","rating":97,"base":1,"desc":"Batter · IPL legend","group":0},{"name":"Shikhar Dhawan","id":"shikhar-dhawan","role":"Batter","rating":91,"base":0.5,"desc":"Batter · IPL legend","group":0},{"name":"Gautam Gambhir","id":"gautam-gambhir","role":"Batter","rating":87,"base":0.2,"desc":"Batter · IPL legend","group":0},{"name":"Robin Uthappa","id":"robin-uthappa","role":"Wicketkeeper","rating":83,"base":0.2,"desc":"Wicketkeeper · IPL legend","group":2},{"name":"Ambati Rayudu","id":"ambati-rayudu","role":"Batter","rating":90,"base":0.5,"desc":"Batter · IPL legend","group":0},{"name":"Michael Hussey","id":"michael-hussey","role":"Batter","rating":90,"base":0.5,"desc":"Batter · IPL legend","group":0},{"name":"Brendon McCullum","id":"brendon-mccullum","role":"Wicketkeeper","rating":92,"base":0.5,"desc":"Wicketkeeper · IPL legend","group":2},{"name":"Dinesh Karthik","id":"dinesh-karthik","role":"Wicketkeeper","rating":91,"base":0.5,"desc":"Wicketkeeper · IPL legend","group":2},{"name":"Parthiv Patel","id":"parthiv-patel","role":"Wicketkeeper","rating":90,"base":0.5,"desc":"Wicketkeeper · IPL legend","group":2},{"name":"Shane Watson","id":"shane-watson","role":"All-rounder","rating":94,"base":0.5,"desc":"All-rounder · IPL legend","group":3},{"name":"Kieron Pollard","id":"kieron-pollard","role":"All-rounder","rating":94,"base":0.5,"desc":"All-rounder · IPL legend","group":3},{"name":"Irfan Pathan","id":"irfan-pathan","role":"All-rounder","rating":86,"base":0.2,"desc":"All-rounder · IPL legend","group":3},{"name":"Yusuf Pathan","id":"yusuf-pathan","role":"All-rounder","rating":82,"base":0.2,"desc":"All-rounder · IPL legend","group":3},{"name":"Lasith Malinga","id":"lasith-malinga","role":"Bowler","rating":96,"base":1,"desc":"Bowler · IPL legend","group":1},{"name":"Dale Steyn","id":"dale-steyn","role":"Bowler","rating":96,"base":1,"desc":"Bowler · IPL legend","group":1},{"name":"Zaheer Khan","id":"zaheer-khan","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · IPL legend","group":1},{"name":"Harbhajan Singh","id":"harbhajan-singh","role":"Bowler","rating":86,"base":0.2,"desc":"Bowler · IPL legend","group":1},{"name":"Amit Mishra","id":"amit-mishra","role":"Bowler","rating":89,"base":0.5,"desc":"Bowler · IPL legend","group":1},{"name":"Ashish Nehra","id":"ashish-nehra","role":"Bowler","rating":88,"base":0.2,"desc":"Bowler · IPL legend","group":1},{"name":"RP Singh","id":"rp-singh","role":"Bowler","rating":85,"base":0.2,"desc":"Bowler · IPL legend","group":1},{"name":"Munaf Patel","id":"munaf-patel","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · IPL legend","group":1},{"name":"Praveen Kumar","id":"praveen-kumar","role":"Bowler","rating":87,"base":0.2,"desc":"Bowler · IPL legend","group":1},{"name":"S. Sreesanth","id":"s-sreesanth","role":"Bowler","rating":92,"base":0.5,"desc":"Bowler · IPL legend","group":1}];
const names=["Rival Red","The Strategist","Budget Boss","Power XI","The Underdogs","Auction Ace","Night Owls"],icons=["🔴","🧠","💰","⚔️","🐺","🎯","🌙"];
function money(n){return `₹${n} Cr`;} function teamName(i){return i?names[i-1]:"Your Team";} function teamIcon(i){return i?icons[i-1]:"👑";}
function show(id){screens.forEach(s=>$(s).classList.toggle("active",s===id));scrollTo(0,0);}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2000);}
function budget(){return ({easy:200,medium:150,hard:100})[state.difficulty];}
function updateSettings(){let n=+$("opponentCount").value;state.budget=budget();$("opponentCountLabel").textContent=n;$("teamCountPreview").textContent=`${n+1} teams`;$("budgetPreview").textContent=money(state.budget);$("difficultyPreview").textContent=state.difficulty[0].toUpperCase()+state.difficulty.slice(1);const tip=$("arenaTip");if(tip){tip.textContent=state.mode==="cricket"?"🏏 Build a balanced cricket squad with batters, bowlers, all-rounders and a wicketkeeper.":"🦸 Assemble a powerful team of heroes and villains, then outbid your AI rivals.";}}
function chooseMode(m){if(m==="anime"){toast("Anime Arena is coming soon!");return;}state.mode=m;$("selectedArenaName").textContent=m==="marvel"?"Marvel Arena":"Cricket Auction";show("settingsScreen");updateSettings();}
function svgPortrait(type){
 const c={doom:["#315c4d","#c7a66a","#273342"],thanos:["#6d4c91","#c2a4d5","#342b49"],surfer:["#91b9c7","#e0edf0","#304c61"],phoenix:["#a83227","#f0b94d","#482b31"],galactus:["#604b91","#d0a7e8","#263b68"],deadpool:["#a62635","#e3c2a2","#262a35"],wolverine:["#d4a52c","#e4c1a2","#334b73"],vision:["#a43d4c","#d4b66d","#355d5b"],sentry:["#d7b94d","#e6d9a9","#34527c"],ultron:["#9b3338","#d1d4d8","#343d4c"],hawkeye:["#654d76","#c49a7b","#37435a"],magneto:["#6c385f","#d1b39a","#873c45"],ghost:["#5a5667","#d7d8dc","#2a2c3c"],hela:["#315c4a","#b6a4a0","#242d40"],venom:["#202632","#c3d3d8","#10151d"],carnage:["#9b2632","#d3a29a","#3b202b"],quicksilver:["#7e9eae","#d8dce0","#34465e"],shangchi:["#9b4336","#d7ad88","#293f4e"],winter:["#4b6078","#d1ad91","#333c4a"],daredevil:["#9d2e35","#c49b83","#292b37"],warmachine:["#53616e","#c3cbd2","#27313d"],adam:["#a17b3c","#e4c68a","#425c76"],starlord:["#8b4b3c","#d0a17e","#354a61"],groot:["#796044","#b6a078","#3c5946"],rocket:["#8a573c","#c99570","#354354"],mysterio:["#4b6e84","#c6a66d","#4d3c70"],goblin:["#47734b","#c8a17b","#553c62"],iron:["#b52d37","#e8b94e","#28364a"],hulk:["#32884d","#9ad46e","#263d34"],witch:["#92243e","#d74c67","#392239"],captain:["#244b80","#d2b36c","#9b2c3d"],thor:["#466a91","#c9b17d","#35435b"],spider:["#ad2936","#2c4c84","#202c40"],panther:["#242d42","#a4b0c0","#493b72"],strange:["#354e7b","#bf8c62","#a13442"],widow:["#673c36","#c59a79","#252d3b"],loki:["#345a4b","#c9a75d","#25374a"],marvel:["#a34434","#e1bd64","#274e83"],ant:["#704139","#caa17c","#303d50"]};
 let p=c[type]||["#3c6687","#d2a17e","#26384d"],head=type==="iron"?`<path d="M44 43Q80 5 116 43L108 99 80 119 52 99Z" fill="${p[0]}" stroke="${p[1]}" stroke-width="5"/><path d="M53 54L73 61 80 54 89 61 107 54 101 88 80 105 59 88Z" fill="#b93438"/><path d="M59 65l16 5-7 7-10-3m27-4 16-5 1 9-10 3" fill="#e4faff"/>`:type==="hulk"?`<path d="M42 57Q42 17 80 19Q118 17 118 57L108 100Q96 122 80 122Q58 119 49 98Z" fill="${p[0]}" stroke="#245c3b" stroke-width="4"/><path d="M42 49Q52 9 81 18Q111 9 119 49L102 40 91 31 77 43 58 35Z" fill="#24683c"/>`:type==="witch"?`<path d="M45 58Q45 20 80 20Q115 20 115 58L107 99Q96 119 80 119Q59 116 50 97Z" fill="#d39a7e"/><path d="M40 63Q25 7 80 8Q135 8 120 65L107 45 96 27 80 39 61 28 49 51Z" fill="#9c263f"/><path d="M49 20L58 1 69 23M92 23L105 1 114 27" stroke="#d94c67" stroke-width="8" fill="none"/>`:`<path d="M44 57Q44 18 80 19Q116 18 116 57L108 99Q96 120 80 120Q58 117 49 97Z" fill="${p[1]}" stroke="#202b3b" stroke-width="3"/><path d="M42 55Q45 13 80 14Q115 13 118 55L104 43 92 29 79 39 59 31Z" fill="${p[0]}"/>`;
 let suit=type==="hulk"?"#34894d":type==="iron"?"#a92d38":type==="witch"?"#70223b":p[2];
 const marks={iron:"ARC",captain:"★",thor:"⚡",spider:"WEB",panther:"CLAW",strange:"EYE",hulk:"SMASH",widow:"HOUR",witch:"HEX",loki:"TRICK",marvel:"STAR",ant:"ANT",doom:"DOOM",thanos:"GEM",surfer:"COSMIC",phoenix:"PHOENIX",galactus:"WORLD",deadpool:"DP",wolverine:"X",vision:"MIND",sentry:"SUN",ultron:"AI",hawkeye:"BOW",magneto:"MAGNET",ghost:"HELLFIRE",hela:"CROWN",venom:"SYM",carnage:"RED",quicksilver:"SPEED",shangchi:"RING",winter:"ARM",daredevil:"DD",warmachine:"GUN",adam:"SOUL",starlord:"STAR",groot:"LEAF",rocket:"BLAST",mysterio:"ILLUSION",goblin:"BOMB"};
 const mark=marks[type]||"HERO";
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180"><defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="${p[2]}"/><stop offset="1" stop-color="#101827"/></linearGradient></defs><rect width="160" height="180" rx="16" fill="url(#b)"/><circle cx="80" cy="65" r="68" fill="${p[1]}" opacity=".15"/><path d="M24 180Q28 122 58 112L80 129 102 112Q132 122 136 180Z" fill="${suit}" stroke="${p[1]}" stroke-opacity=".55" stroke-width="3"/>${head}${type==="iron"?"":`<path d="M63 75l12 1m10 0 12-1M72 94q8 6 16 0" stroke="#46312e" stroke-width="3" fill="none" stroke-linecap="round"/>`}<g><circle cx="123" cy="139" r="20" fill="#0b1422" stroke="${p[1]}" stroke-width="2.5"/><circle cx="123" cy="139" r="15" fill="${p[0]}"/><text x="123" y="142" text-anchor="middle" font-family="Arial,sans-serif" font-size="${mark.length>5?5.5:mark.length>3?7:10}" font-weight="800" fill="#fff">${mark}</text></g></svg>`;
}
const marvelPortraitFiles={
 iron:"iron-man.png",captain:"captain-america.png",thor:"thor.png",spider:"spider-man.png",panther:"black-panther.png",strange:"doctor-strange.png",hulk:"hulk.png",widow:"black-widow.png",witch:"scarlet-witch.png",loki:"loki.png",marvel:"captain-marvel-duplicate.png",ant:"ant-man.png",doom:"doctor-doom.png",thanos:"thanos.png",surfer:"silver-surfer.png",phoenix:"jean-grey-phoenix.png",galactus:"galactus.png",deadpool:"deadpool.png",wolverine:"wolverine.png",vision:"vision.png",sentry:"sentry.png",ultron:"ultron.png",hawkeye:"hawkeye.png",magneto:"magneto.png",ghost:"ghost-rider.png",hela:"hela.png",venom:"venom.png",carnage:"carnage.png",quicksilver:"quicksilver.png",shangchi:"shang-chi.png",winter:"winter-soldier.png",daredevil:"daredevil.png",warmachine:"war-machine.png",adam:"adam-warlock.png",starlord:"star-lord.png",groot:"groot.png",rocket:"rocket-raccoon.png",mysterio:"mysterio.png",goblin:"green-goblin.png"
};
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/Pikapipikachuu/Bid-Baaz/main/";
function portraitSrc(kind){
 const file=marvelPortraitFiles[kind];
 if(state.mode==="marvel"&&file) return GITHUB_IMAGE_BASE+encodeURIComponent(file);
 if(state.mode==="cricket") return GITHUB_IMAGE_BASE+encodeURIComponent(`${kind}.webp`);
 return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svgPortrait(kind));
}
function stopTimers(){clearInterval(state.timer);clearTimeout(state.aiTimer);}
function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function buildMarvelLots(){
 const all=marvel.map(a=>{const rating=a[3],special=rating>=95;const base=rating===100?50:rating>=98?30:rating>=95?20:a[4];return {name:a[0],portrait:a[1],role:a[2],rating,base,desc:a[5],special};});
 const special=shuffle(all.filter(p=>p.special)),regular=shuffle(all.filter(p=>!p.special));
 const specialCount=Math.min(special.length,Math.floor(Math.random()*3));
 const specialLots=special.slice(0,specialCount);
 const normalLots=shuffle(regular.slice(0,15-specialCount));
 // Special lots can appear from slot 2 through slot 14, never at the start or at the very end.
 const result=Array(15).fill(null);
 const positions=shuffle(Array.from({length:13},(_,i)=>i+1)).slice(0,specialCount);
 positions.forEach((pos,i)=>{result[pos]=specialLots[i];});
 let cursor=0;
 for(let i=0;i<result.length;i++){if(result[i]===null)result[i]=normalLots[cursor++];}
 return result;
}
function buildCricketLots(){
 // 12 slots per team. Category targets are balanced, then shortages are filled from the remaining pool.
 // Order remains batters, bowlers, wicketkeepers, all-rounders, then any flexible-role top-ups.
 const teams=state.opponents+1,total=teams*12,targets=[4,3,2,3].map(n=>n*teams),chosen=[],used=new Set();
 [0,1,2,3].forEach((g,i)=>{const pool=shuffle(cricketRoster.filter(p=>p.group===g));const take=Math.min(targets[i],pool.length);pool.slice(0,take).forEach(p=>{chosen.push(p);used.add(p.id);});});
 if(chosen.length<total){shuffle(cricketRoster.filter(p=>!used.has(p.id))).slice(0,total-chosen.length).forEach(p=>chosen.push(p));}
 return chosen.slice(0,total).map(p=>({...p,portrait:p.id,desc:p.desc}));
}
function start(){window.__bidBaazHideSavedCard=false;stopTimers();state.speed=1;state.skipMode=false;syncAuctionMenuSelection();document.querySelector("#bidOne").textContent=state.mode==="cricket"?"+ ₹20 L":"+ ₹1 Cr";document.querySelector("#bidFive").textContent=state.mode==="cricket"?"+ ₹50 L":"+ ₹5 Cr";document.querySelector("#bidTen").textContent=state.mode==="cricket"?"+ ₹1 Cr":"+ ₹10 Cr";state.opponents=+$("opponentCount").value;state.budget=budget();state.teams=[{name:"Your Team",budget:state.budget,spent:0,players:[]}];for(let i=0;i<+$("opponentCount").value;i++)state.teams.push({name:names[i],budget:state.budget,spent:0,players:[]});state.lots=state.mode==="marvel"?buildMarvelLots():buildCricketLots();state.lotIndex=0;state.battleRun=0;state.paused=false;show("auctionScreen");loadLot();saveProgress();}
function loadLot(){stopTimers();if(state.lotIndex>=state.lots.length)return finish();state.current=state.lots[state.lotIndex];state.bid=0;state.leader=null;state.passed=new Set();state.closed=false;
 $("auctionRound").textContent=`PLAYER ${state.lotIndex+1} OF ${state.lots.length}`;$("lotCategory").textContent=state.mode==="marvel"?"HERO / VILLAIN":state.current.role.toUpperCase();$("lotPortrait").innerHTML=`<img alt="${state.current.name} illustrated portrait" src="${portraitSrc(state.current.portrait)}">`;$("lotName").textContent=state.current.name;$("lotDescription").textContent=state.current.role+" — "+state.current.desc;$("lotRating").textContent=state.current.rating;$("lotRank").textContent=state.current.special?`SPECIAL · RATING ${state.current.rating}`:`RATING ${state.current.rating}`;$("basePrice").textContent=money(state.current.base);$("currentBid").textContent="—";$("bidStatus").textContent="Choose your bid or pass. AI rivals will keep playing.";$("soldResult").classList.add("hidden");$("soldResult").innerHTML="";$("countdownPopup").classList.remove("show");$("countdown").classList.remove("urgent");controls(true);render();deadline(5);if(state.skipMode){state.passed.add(0);controls(false);scheduleAI(30);}else scheduleAI(850);saveProgress();}
function controls(on){["bidOne","bidFive","bidTen","passButton"].forEach(id=>$(id).disabled=!on);}
function syncControls(){const locked=state.closed||state.paused||state.passed.has(0)||state.leader===0||(state.mode==='cricket'&&state.teams[0].players.length>=12);['bidOne','bidFive','bidTen'].forEach(id=>$(id).disabled=locked);$('passButton').disabled=state.closed||state.paused||state.passed.has(0);}
function deadline(seconds){state.deadline=Date.now()+(seconds*1000)/Math.max(1,state.speed||1);state.lastCountdown=null;clearInterval(state.timer);$("countdown").classList.remove("urgent");tick();state.timer=setInterval(tick,50);}
function tick(){
 if(state.closed)return;
 let left=Math.max(0,(state.deadline-Date.now())/1000),gameLeft=left*Math.max(1,state.speed||1);
 // Integer countdown: every second is shown in order; speed scales the whole clock.
 const shown=gameLeft<=0?0:Math.min(5,Math.ceil(gameLeft));
 const timer=$("countdown");
 timer.textContent=shown;
 timer.classList.toggle("urgent",gameLeft<=4&&gameLeft>0);
 if([3,2,1].includes(shown)&&shown!==state.lastCountdown){
   state.lastCountdown=shown;
   const popup=$("countdownPopup");
   popup.textContent=shown===1?"1 second to go":`${shown} seconds to go`;
   popup.classList.remove("show");void popup.offsetWidth;popup.classList.add("show");
   clearTimeout(state.popupTimer);state.popupTimer=setTimeout(()=>popup.classList.remove("show"),850);
 }
 if(left<=0)resolve();
}
function afterBid(){deadline(5);}
function placeBid(team,step){if(state.closed||state.passed.has(team)||team===state.leader)return;if(state.mode==="cricket"&&state.teams[team].players.length>=12){state.passed.add(team);render();return;}let amount=state.leader===null?state.current.base:state.bid+step;if(state.teams[team].budget<amount)return;state.bid=amount;state.leader=team;$("currentBid").textContent=money(amount);$("bidStatus").innerHTML=`<span class="bidder-action">${teamName(team)}</span> <span class="bid-action-word">bids</span> <strong class="bid-amount">${money(amount)}</strong>`;render();if(allOtherBiddersDone()){resolve();}else{afterBid();scheduleAI(650);}saveProgress();}
function humanBid(step){if(state.mode==="cricket"&&state.teams[0].players.length>=12){toast("Your 12-player squad is complete.");return;}if(state.leader===0){toast("You are already leading.");return;}let amount=state.leader===null?state.current.base:state.bid+step;if(state.teams[0].budget<amount){toast("Not enough budget for this bid.");return;}placeBid(0,step);}
function pass(){if(state.closed||state.passed.has(0))return;state.passed.add(0);controls(false);$("bidStatus").textContent="You passed on this character. AI teams are still bidding.";render();if(allOtherBiddersDone())resolve();else scheduleAI(300);saveProgress();}
function playerRoleKey(p){
 const role=(p.role||"").toLowerCase();
 if(state.mode==="cricket"){
   if(role.includes("bowler"))return "bowling";
   if(role.includes("batter"))return "batting";
   if(role.includes("all-rounder"))return "allround";
   if(role.includes("wicketkeeper"))return "keeper";
 }
 return role.split(/[ ·-]/)[0]||"specialist";
}
function aiTeamNeed(team){
 const keys=team.players.map(playerRoleKey);
 if(state.mode==="cricket"){
   const counts={batting:0,bowling:0,allround:0,keeper:0};
   keys.forEach(k=>{if(counts[k]!==undefined)counts[k]++;});
   return counts;
 }
 const unique=new Set(keys);
 return {unique:unique.size,total:keys.length};
}
function aiValue(i){
 const team=state.teams[i],p=state.current,d=state.difficulty;
 const roleKey=playerRoleKey(p),needs=aiTeamNeed(team);
 let fit=0;
 if(state.mode==="cricket"){
   const count=needs[roleKey]||0;
   fit=count===0?7:count===1?3:-Math.min(8,count*3);
 }else{
   fit=needs.unique>=team.players.length?5:Math.max(-3,2-needs.unique);
   if(p.rating>=95)fit+=d==="hard"?9:d==="medium"?6:3;
   if(p.rating>=98)fit+=d==="hard"?10:d==="medium"?6:3;
   if(p.rating===100)fit+=d==="hard"?12:d==="medium"?7:4;
 }
 const remaining=state.lots.length-state.lotIndex;
 const idealSquad=Math.min(6,Math.max(3,Math.ceil((team.players.length+remaining)/(state.opponents+1))));
 const rosterNeed=team.players.length<idealSquad?1.12:team.players.length>=idealSquad?0.78:1;
 const multiplier={easy:.83,medium:1.16,hard:1.55}[d];
 return Math.max(p.base,Math.round((p.base+Math.max(0,p.rating-70)*.9+fit)*multiplier*rosterNeed));
}
function aiCap(i){
 const team=state.teams[i],p=state.current,remaining=state.lots.length-state.lotIndex-1;
 const raw=aiValue(i);
 if(state.mode==="marvel"){
   // Hard rivals deliberately fight for elite Marvel names, but still protect enough purse to build a squad.
   const purseFloor=state.difficulty==="hard"?Math.max(0,team.budget-(remaining>0?12:0)):
     state.difficulty==="medium"?Math.max(0,team.budget-(remaining>0?18:0)):Math.max(0,team.budget-(remaining>0?25:0));
   const tierExtra=p.rating>=100?70:p.rating>=98?55:p.rating>=95?43:p.rating>=90?42:p.rating>=85?30:p.rating>=80?22:14;
   const tierCap=p.base+tierExtra;
   const difficultyCap=state.difficulty==="hard"?tierCap:state.difficulty==="medium"?Math.min(tierCap,raw+12):Math.min(tierCap,raw);
   return Math.min(team.budget,purseFloor,difficultyCap);
 }
 const desired=12;
 const slots=Math.max(0,desired-team.players.length-1);
 const reservePerSlot={easy:3,medium:4,hard:5}[state.difficulty];
 return Math.min(team.budget-slots*reservePerSlot,raw);
}
function scheduleAI(ms){clearTimeout(state.aiTimer);if(!state.closed)state.aiTimer=setTimeout(aiStep,ms/Math.max(1,state.speed||1));}
function allOtherBiddersDone(){return state.teams.every((t,i)=>i===state.leader||state.passed.has(i)||t.budget<=0||(state.mode==="cricket"&&t.players.length>=12));}
function aiStep(){
 if(state.closed)return;
 const difficulty=state.difficulty;
 const next=state.leader===null?state.current.base:state.bid+(state.mode==="cricket"?.2:1);
 const candidates=state.teams.map((t,i)=>i).filter(i=>i>0&&!state.passed.has(i)&&i!==state.leader&&state.teams[i].budget>=next&&(state.mode!=="cricket"||state.teams[i].players.length<12));
 if(!candidates.length){
   // Rivals who cannot afford the next bid are out for this lot, but that
   // must NOT end the auction while the human can still respond.
   state.teams.forEach((team,i)=>{
     if(i>0 && i!==state.leader && !state.passed.has(i) &&
        (team.budget<next || (state.mode==="cricket" && team.players.length>=12))) state.passed.add(i);
   });
   const humanCanStillBid=!state.passed.has(0) && state.leader!==0 &&
     state.teams[0].budget>=next && !(state.mode==="cricket" && state.teams[0].players.length>=12);
   render();
   if(!humanCanStillBid) resolve();
   return; // otherwise let the visible 5..0 countdown finish or the user bid/pass
 }
 const ranked=candidates.map(i=>{
   const t=state.teams[i],cap=aiCap(i),room=cap-next;
   const rosterUrgency=Math.max(0,5-t.players.length)*2.5;
   const purseRatio=t.budget/state.budget;
   const powerPriority=state.mode==="marvel"?state.current.rating*.28:state.current.rating*.1;
   const personality=difficulty==="hard"?Math.random()*0.25:difficulty==="medium"?Math.random()*4:Math.random()*14;
   const score=(room>=0?45:0)+rosterUrgency+Math.min(22,Math.max(0,room)*.35)+purseRatio*5+powerPriority+personality;
   return {i,cap,score};
 }).sort((a,b)=>b.score-a.score);
 const {i,cap}=ranked[0];
 const room=cap-state.bid;
 let step=1;
 if(state.mode==="cricket"){if(difficulty==="hard")step=room>=1?1:room>=.5?.5:.2;else if(difficulty==="medium")step=room>=.5&&Math.random()<.68?.5:.2;else step=.2;}
 else if(difficulty==="hard")step=room>=1?1:room>=.5?.5:.2;
 else if(difficulty==="medium")step=room>=.5&&Math.random()<.68?.5:.2;
 if(state.mode==="marvel"){if(difficulty==="hard")step=room>=10?10:room>=5?5:1;else if(difficulty==="medium")step=room>=5&&Math.random()<.68?5:1;}
 const amount=state.leader===null?state.current.base:state.bid+step;
 const canAfford=amount<=cap&&amount<=state.teams[i].budget;
 const chance={easy:.64,medium:.96,hard:1}[difficulty];
 const willing=canAfford&&(difficulty==="hard"||Math.random()<chance);
 if(willing){
   placeBid(i,step);
 }else{
   state.passed.add(i);render();if(allOtherBiddersDone())resolve();else scheduleAI(difficulty==="hard"?260:400+Math.random()*250);
 }
}
function resolve(){if(state.closed)return;state.closed=true;stopTimers();controls(false);
 if(state.leader!==null){let t=state.teams[state.leader];t.budget-=state.bid;t.spent+=state.bid;t.players.push({...state.current,price:state.bid});$("soldResult").innerHTML=`<b class="sold-check">🏆</b><span><small>SOLD TO</small><strong>${t.name}</strong><em>${money(state.bid)} · Winning bid</em></span>`;toast(`${state.current.name} sold to ${t.name}!`);}
 else $("soldResult").innerHTML=`<b class="sold-check">—</b><span><small>UNSOLD</small><strong>No bids placed</strong></span>`;
 $("soldResult").classList.remove("hidden");$("bidStatus").textContent="Bidding closed for this character.";$("countdown").textContent="0";render();saveProgress();setTimeout(()=>{if(state.paused)return;state.lotIndex++;loadLot();},state.skipMode?80:1500);}
function render(){if(!state.teams.length)return;$("yourPurseTop").textContent=money(state.teams[0].budget);$("activeTeamsLabel").textContent=`${state.teams.length-state.passed.size} active`;$("bidderList").innerHTML=state.teams.map((t,i)=>{let out=state.passed.has(i),lead=state.leader===i;return `<div class="bidder"><span class="avatar">${teamIcon(i)}</span><span class="bidder-info"><b>${t.name}${i===0?" (You)":""}</b><small>${t.players.length} picked · ${money(t.budget)} left</small></span><b class="cash">${money(t.budget)}</b><small class="${out?"out":""}">${lead?"LEAD":out?"PASS":"IN"}</small></div>`}).join("");$("miniSquad").innerHTML=state.teams[0].players.length?state.teams[0].players.map(p=>`<div class="mini-player"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join(""):'<p class="empty-note">Your winning bids will appear here.</p>';$("squadCount").textContent=`${state.teams[0].players.length} picked`;}
function strength(t){return t.players.length?Math.round(t.players.reduce((s,p)=>s+p.rating,0)/t.players.length*10+Math.min(t.players.length,6)*2):0;}
// Marvel results are decided by character matchups and power tiers, never by adding ratings.
// Baseline assumes standard comic versions without temporary one-off artifacts or power-ups.
const marvelProfiles={
 "Galactus":{tier:12,tag:"cosmic-entity",label:"Cosmic entity"},
 "Jean Grey (Phoenix)":{tier:12,tag:"phoenix",label:"Phoenix Force"},
 "Sentry":{tier:11,tag:"cosmic",label:"Top-tier powerhouse"},
 "Scarlet Witch":{tier:11,tag:"reality-magic",label:"Reality warper"},
 "Thanos":{tier:11,tag:"titan",label:"Titan-level threat"},
 "Doctor Doom":{tier:11,tag:"sorcerer-tech",label:"Sorcerer-scientist"},
 "Silver Surfer":{tier:10,tag:"cosmic",label:"Power Cosmic"},
 "Adam Warlock":{tier:10,tag:"cosmic-mystic",label:"Cosmic champion"},
 "Ghost Rider":{tier:10,tag:"supernatural",label:"Spirit of Vengeance"},
 "Thor":{tier:9,tag:"asgardian",label:"Asgardian god"},
 "Hulk":{tier:9,tag:"brute",label:"Extreme-strength powerhouse"},
 "Hela":{tier:9,tag:"asgardian-mystic",label:"Asgardian goddess"},
 "Magneto":{tier:9,tag:"magnetism",label:"Omega-level mutant"},
 "Doctor Strange":{tier:9,tag:"sorcerer",label:"Master of mystic arts"},
 "Captain Marvel":{tier:9,tag:"cosmic",label:"Cosmic powerhouse"},
 "Ultron":{tier:8,tag:"ai-tech",label:"Adaptive machine intelligence"},
 "Vision":{tier:8,tag:"android",label:"Advanced synthezoid"},
 "Loki":{tier:8,tag:"trickster-mystic",label:"God of mischief"},
 "Iron Man":{tier:7,tag:"tech",label:"Armoured genius"},
 "Wolverine":{tier:7,tag:"regeneration",label:"Regenerative warrior"},
 "Venom":{tier:7,tag:"symbiote",label:"Symbiote powerhouse"},
 "Carnage":{tier:7,tag:"symbiote",label:"Symbiote killer"},
 "War Machine":{tier:7,tag:"tech",label:"Heavy weapons armour"},
 "Spider-Man":{tier:7,tag:"agile",label:"Spider-powered hero"},
 "Black Panther":{tier:6,tag:"tactician-tech",label:"Tactical warrior"},
 "Green Goblin":{tier:6,tag:"tech-brute",label:"Enhanced tech villain"},
 "Quicksilver":{tier:6,tag:"speed",label:"Speedster"},
 "Deadpool":{tier:6,tag:"regeneration",label:"Unpredictable regenerative fighter"},
 "Groot":{tier:5,tag:"flora",label:"Flora powerhouse"},
 "Ant-Man":{tier:5,tag:"size-tech",label:"Size-changing tactician"},
 "Winter Soldier":{tier:5,tag:"soldier",label:"Enhanced soldier"},
 "Shang-Chi":{tier:5,tag:"martial",label:"Master martial artist"},
 "Star-Lord":{tier:5,tag:"tech-tactician",label:"Armed tactician"},
 "Rocket Raccoon":{tier:5,tag:"tech-tactician",label:"Weapons genius"},
 "Hawkeye":{tier:4,tag:"archer",label:"Master archer"},
 "Daredevil":{tier:4,tag:"martial-senses",label:"Enhanced senses fighter"},
 "Mysterio":{tier:4,tag:"illusion-tech",label:"Illusion specialist"},
 "Black Widow":{tier:4,tag:"spy",label:"Elite spy"},
 "Captain America":{tier:5,tag:"tactician-soldier",label:"Super-soldier leader"}
};
function marvelTeamProfile(players){
 if(!players.length)return {tier:0,lead:null,label:"No active fighter",support:0,tags:[]};
 const ranked=players.map(p=>({player:p,profile:marvelProfiles[p.name]||{tier:Math.max(3,Math.min(8,Math.round(p.rating/12))),tag:"hero",label:"Hero"}})).sort((a,b)=>b.profile.tier-a.profile.tier);
 const lead=ranked[0], support=ranked.slice(1), tags=ranked.map(x=>x.profile.tag);
 // Back-up fighters matter in close matchups, but cannot outscore a much higher-tier lead.
 const supportValue=Math.min(1.15,support.reduce((v,x,i)=>v+(x.profile.tier>=lead.profile.tier-1?.24:.08),0));
 return {tier:lead.profile.tier,lead:lead.player,label:lead.profile.label,support:supportValue,tags};
}
function marvelMatchup(a,b){
 if(a.tier===0&&b.tier===0)return {winner:-1,reason:"Neither team drafted a character."};
 if(a.tier===0)return {winner:1,reason:`${b.lead.name} faces no opposition.`};
 if(b.tier===0)return {winner:0,reason:`${a.lead.name} faces no opposition.`};
 const gap=Math.abs(a.tier-b.tier);
 // Counterplay is deliberately small: it can swing close fights, never erase a huge power gap.
 const counter=(attacker,defender)=>{
  let n=0;
  if(attacker.tags.includes("reality-magic")&&defender.tags.includes("tech"))n+=.25;
  if(attacker.tags.includes("sorcerer-tech")||attacker.tags.includes("sorcerer"))n+=.12;
  if(attacker.tags.includes("cosmic-entity")||attacker.tags.includes("phoenix"))n+=.2;
  if(attacker.tags.includes("speed")&&defender.tags.includes("archer"))n+=.12;
  return n;
 };
 const aEdge=a.tier+a.support+counter(a,b), bEdge=b.tier+b.support+counter(b,a);
 if(gap>=2){return {winner:a.tier>b.tier?0:1,reason:`${a.tier>b.tier?a.lead.name:b.lead.name} is in a much higher power class.`};}
 if(aEdge===bEdge)return {winner:Math.random()<.5?0:1,reason:"Both teams are closely matched; the battle could go either way."};
 return {winner:aEdge>bEdge?0:1,reason:`${aEdge>bEdge?a.lead.name:b.lead.name} has the matchup advantage.`};
}
function finish(){$("battlePanel").classList.add("hidden");$("toggleShowdown").setAttribute("aria-expanded","false");$("showdownChevron").textContent="＋";state.results=state.teams.map((t,i)=>({name:t.name,players:t.players,spent:t.spent,budget:t.budget,strength:state.mode==="marvel"?0:strength(t),score:0}));battle(false);show("resultsScreen");}
function battle(again=true){
 state.battleRun++;
 let r;
 if(state.mode==="marvel"){
  r=state.results.map(x=>({...x,profile:marvelTeamProfile(x.players)}));
  // A round-robin matchup record avoids inventing a summed team score.
  const wins=new Map(r.map((x,i)=>[i,0]));
  const notes=[];
  for(let i=0;i<r.length;i++)for(let j=i+1;j<r.length;j++){
   const m=marvelMatchup(r[i].profile,r[j].profile);
   if(m.winner===0)wins.set(i,wins.get(i)+1);else if(m.winner===1)wins.set(j,wins.get(j)+1);
   notes.push(`${r[i].name} vs ${r[j].name}: ${m.winner===0?r[i].profile.lead?.name||r[i].name:m.winner===1?r[j].profile.lead?.name||r[j].name:"Draw"} — ${m.reason}`);
  }
  r=r.map((x,i)=>({...x,wins:wins.get(i),score:wins.get(i)})).sort((a,b)=>b.wins-a.wins||b.profile.tier-a.profile.tier);
  r.forEach(x=>{x.outcome=x.wins===r[0].wins?"Top contender":"Defeated";});
  state.results=r;
  const c=r[0];
  $("championPanel").innerHTML=`<div>🏆 <span class="eyebrow">ARENA CHAMPION</span><h2>${c.name}</h2><p>${c.players.length} picks · ${money(c.spent)} spent · ${money(c.budget)} left</p><p class="empty-note">Key fighter: ${c.profile.lead?.name||"None"} · ${c.profile.label}</p></div><strong>${c.wins}<small>HEAD-TO-HEAD WINS</small></strong>`;
  $("standings").innerHTML=r.map((x,i)=>`<div class="standing-row"><b>#${i+1}</b><span>${x.name}<small>Lead: ${x.profile.lead?.name||"No character"} · ${x.profile.label}</small></span><b>${x.wins} ${x.wins===1?"win":"wins"}</b></div>`).join("");
  $("battleSummary").innerHTML=`<p class="empty-note">Marvel matchup simulation · no ratings are added together. The strongest character sets the team's power class; backup characters only influence close fights. · Run #${state.battleRun}</p><div class="matchup-notes">${notes.map(n=>`<p>${n}</p>`).join("")}</div>`;
 }else{
  r=state.results.map(x=>({...x,score:Math.max(0,Math.round(x.strength+(Math.random()-.5)*({easy:12,medium:17,hard:22}[state.difficulty])))})).sort((a,b)=>b.score-a.score);
  state.results=r;let c=r[0];
  $("championPanel").innerHTML=`<div>🏆 <span class="eyebrow">ARENA CHAMPION</span><h2>${c.name}</h2><p>${c.players.length} picks · ${money(c.spent)} spent · ${money(c.budget)} left</p></div><strong>${c.score}<small>BATTLE SCORE</small></strong>`;
  $("standings").innerHTML=r.map((x,i)=>`<div class="standing-row"><b>#${i+1}</b><span>${x.name}<small>${x.players.length} players · ${money(x.spent)} spent</small></span><b>${x.score} pts</b></div>`).join("");
  $("battleSummary").innerHTML=`<p class="empty-note">Simulated cricket face-off · Run #${state.battleRun}</p>`;
 }
 $("allTeamsPanel").innerHTML=`<h3>All squads</h3><div class="team-detail-grid">${state.teams.map(t=>`<div class="team-detail"><b>${t.name}</b><p>${t.players.length} players · ${money(t.spent)} spent · ${money(t.budget)} left</p><ul>${t.players.map(p=>`<li>${p.name} — ${money(p.price)} · ${p.rating} power</li>`).join("")||"<li>No players won</li>"}</ul></div>`).join("")}</div>`;
 if(again)toast("Battle simulated again!");
}
// Arena selection opens a modal instead of navigating immediately.
let modalHistory=false;
function openModal(id){$(id).classList.remove("hidden");$(id).setAttribute("aria-hidden","false");document.body.classList.add("modal-open");history.pushState({bidBaazModal:id},"");modalHistory=true;}
function closeModal(id,fromPop=false){if($(id).classList.contains("hidden"))return;$(id).classList.add("hidden");$(id).setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");if(!fromPop&&modalHistory){modalHistory=false;history.back();}}
function closeTopModal(){for(const id of ["arenaModal","playModal"]){if(!$(id).classList.contains("hidden")){closeModal(id);return true;}}return false;}
window.addEventListener("popstate",()=>{for(const id of ["arenaModal","playModal"]){if(!$(id).classList.contains("hidden")){closeModal(id,true);return;}}});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m){} }));
document.querySelectorAll(".arena-card").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.mode==="anime"){toast("Anime Arena is coming soon!");return;}state.mode=b.dataset.mode;$("playModal").querySelector(".eyebrow").textContent=state.mode==="marvel"?"MARVEL ARENA":"CRICKET AUCTION";openModal("playModal");}));
$("playAI").onclick=()=>{closeModal("playModal");$("selectedArenaName").textContent=state.mode==="marvel"?"Marvel Arena":"Cricket Auction";show("settingsScreen");updateSettings();};
$("playMulti").onclick=()=>toast("Multiplayer is coming soon!");
document.querySelectorAll("[data-pick-arena]").forEach(b=>b.onclick=()=>{state.mode=b.dataset.pickArena;$("selectedArenaName").textContent=state.mode==="marvel"?"Marvel Arena":"Cricket Auction";closeModal("arenaModal");updateSettings();});
$("backHome").onclick=()=>show("homeScreen");$("changeArena").onclick=()=>openModal("arenaModal");$("opponentCount").oninput=updateSettings;
document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{document.querySelectorAll(".choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.difficulty=b.dataset.difficulty;updateSettings();});
$("toggleShowdown").onclick=()=>{const panel=$("battlePanel"),open=panel.classList.contains("hidden");panel.classList.toggle("hidden",!open);$("toggleShowdown").setAttribute("aria-expanded",String(open));$("showdownChevron").textContent=open?"－":"＋";};
$("beginAuction").onclick=start;$("bidOne").onclick=()=>humanBid(state.mode==="cricket"?.2:1);$("bidFive").onclick=()=>humanBid(state.mode==="cricket"?.5:5);$("bidTen").onclick=()=>humanBid(10===10&&state.mode==="cricket"?1:10);$("passButton").onclick=pass;
$("moreAuction").onclick=()=>{$("auctionMenu").classList.toggle("hidden");$("moreAuction").setAttribute("aria-expanded",String(!$("auctionMenu").classList.contains("hidden")));};
function syncAuctionMenuSelection(){
 document.querySelectorAll("[data-speed]").forEach(b=>b.classList.toggle("menu-selected",!state.skipMode&&Number(b.dataset.speed)===Number(state.speed||1)));
 $("skipAuction")?.classList.toggle("menu-selected",!!state.skipMode);
}
document.querySelectorAll("[data-speed]").forEach(b=>b.onclick=()=>{
 const nextSpeed=Number(b.dataset.speed)||1,oldSpeed=Math.max(1,state.speed||1);
 state.speed=nextSpeed;state.skipMode=false;
 $("auctionMenu").classList.add("hidden");$("moreAuction").setAttribute("aria-expanded","false");syncAuctionMenuSelection();
 toast(nextSpeed===1?"Normal speed":`${nextSpeed}× speed enabled`);
 if(!state.paused&&!state.closed){const gameSecondsLeft=Math.max(.01,(state.deadline-Date.now())/1000*oldSpeed);deadline(gameSecondsLeft);clearTimeout(state.aiTimer);scheduleAI(650);}
 saveProgress();
});
$("skipAuction").onclick=()=>{
 if(state.closed||state.paused)return;
 state.skipMode=true;state.speed=3;state.passed.add(0);
 $("auctionMenu").classList.add("hidden");$("moreAuction").setAttribute("aria-expanded","false");syncAuctionMenuSelection();
 controls(false);toast("Skipping remaining auction…");
 if(allOtherBiddersDone())resolve();else scheduleAI(20);
 saveProgress();
};
$("quitAuction").onclick=()=>{if(confirm("Save this game and exit to home? You can resume later.")){saveProgress();stopTimers();state.paused=true;show("homeScreen");refreshContinueCard();}};$("newAuction").onclick=()=>{localStorage.removeItem(SAVE_KEY);state.speed=1;state.skipMode=false;syncAuctionMenuSelection();refreshContinueCard();show("homeScreen");};$("battleAgain").onclick=()=>battle(true);$("viewTeams").onclick=()=>{$("allTeamsPanel").classList.toggle("hidden");$("allTeamsPanel").scrollIntoView({behavior:"smooth"});};updateSettings();


// --- Bid Baaz persistence, pause/resume and Cricket T20 league engine ---
const SAVE_KEY="bidbaaz_saved_v3";
function serialState(){return {mode:state.mode,budget:state.budget,opponents:state.opponents,difficulty:state.difficulty,teams:state.teams,lots:state.lots,lotIndex:state.lotIndex,current:state.current,bid:state.bid,leader:state.leader,passed:[...state.passed],closed:state.closed,remaining:state.paused?state.remaining:Math.max(0,(state.deadline-Date.now())/1000),speed:state.speed,skipMode:state.skipMode,results:state.results,fixtures:state.fixtures,matchDetails:state.matchDetails};}
function saveProgress(){try{if(!state.teams.length||!$("auctionScreen").classList.contains("active"))return;localStorage.setItem(SAVE_KEY,JSON.stringify(serialState()));refreshContinueCard();}catch(e){console.warn("Could not save game",e);}}
window.__bidBaazHideSavedCard=window.__bidBaazHideSavedCard||false;function refreshContinueCard(){let raw=null;try{raw=localStorage.getItem(SAVE_KEY);}catch(e){}const card=$("continueCard");if(!card)return;if(window.__bidBaazHideSavedCard){card.classList.add("hidden");return;}card.classList.toggle("hidden",!raw);if(raw){try{const d=JSON.parse(raw);$("continueLabel").textContent=`${d.mode==='cricket'?'Cricket Auction':'Marvel Arena'} · ${d.teams?.[0]?.players?.length||0} players in your squad`;}catch{card.classList.add("hidden");}}}
function restoreProgress(){try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||"null");if(!d||!d.teams?.length)return false;Object.assign(state,d);state.speed=1;state.skipMode=false;syncAuctionMenuSelection();if(state.closed){state.lotIndex++;state.closed=false;state.current=null;}state.passed=new Set(d.passed||[]);state.paused=true;state.remaining=Math.max(1,d.remaining||5);state.timer=null;state.aiTimer=null;state.deadline=Date.now()+state.remaining*1000;$("selectedArenaName").textContent=state.mode==='cricket'?'Cricket Auction':'Marvel Arena';$("opponentCount").value=state.opponents;state.difficulty=d.difficulty;document.querySelectorAll('.choice').forEach(x=>x.classList.toggle('active',x.dataset.difficulty===state.difficulty));updateSettings();show("auctionScreen");loadPausedLot();return true;}catch(e){console.error(e);return false;}}
function loadPausedLot(){if(state.lotIndex>=state.lots.length){finish();return;}state.current=state.lots[state.lotIndex];$("auctionRound").textContent=`PLAYER ${state.lotIndex+1} OF ${state.lots.length}`;$("lotCategory").textContent=state.mode==='marvel'?'HERO / VILLAIN':state.current.role.toUpperCase();$("lotPortrait").innerHTML=`<img alt="${state.current.name}" src="${portraitSrc(state.current.portrait)}">`;$("lotName").textContent=state.current.name;$("lotDescription").textContent=state.current.role+' — '+state.current.desc;$("lotRating").textContent=state.current.rating;$("lotRank").textContent=`RATING ${state.current.rating}`;$("basePrice").textContent=money(state.current.base);$("currentBid").textContent=state.leader===null?'—':money(state.bid);$("countdown").textContent=Math.ceil(state.remaining);$("bidStatus").textContent=state.leader===null?'Auction paused. Resume when ready.':`${teamName(state.leader)} currently leads at ${money(state.bid)}.`;$("soldResult").classList.add('hidden');render();controls(false);}
function pauseGame(){
 if(state.closed||state.paused)return;
 state.remaining=Math.max(.05,(state.deadline-Date.now())/1000*Math.max(1,state.speed||1));
 state.paused=true;state.speed=1;state.skipMode=false;stopTimers();
 $("auctionMenu").classList.add("hidden");$("moreAuction").setAttribute("aria-expanded","false");syncAuctionMenuSelection();
 controls(false);saveProgress();$("pauseOverlay").classList.remove('hidden');
}
function resumeGame(){
 if(!state.paused)return;
 state.speed=1;state.skipMode=false;state.paused=false;syncAuctionMenuSelection();
 $("pauseOverlay").classList.add('hidden');controls(true);syncControls();deadline(Math.max(.05,state.remaining));scheduleAI(700);saveProgress();
}
function exitPaused(){saveProgress();$("pauseOverlay").classList.add('hidden');show('homeScreen');refreshContinueCard();}
function cricketInnings(batting,bowling){
 const batters=[...batting.players].sort((a,b)=>b.rating-a.rating);const bowlers=bowling.players.filter(p=>['Bowler','All-rounder'].includes(p.role)).sort((a,b)=>b.rating-a.rating);const bats=batters.slice(0,11);const overs=bowlers.length?bowlers:bowling.players;const batStats=bats.map(p=>({name:p.name,r:0,b:0,fours:0,sixes:0,out:false}));const bowlStats=overs.map(p=>({name:p.name,o:0,r:0,w:0,balls:0}));let total=0,wickets=0,balls=0,extras=0,commentary=[],ballByBall=[];let striker=0,non=1;
 for(let over=0;over<20&&wickets<10;over++){
  const bowler=bowlStats[over%bowlStats.length];
  for(let ball=0;ball<6&&wickets<10;ball++){
   const bat=batStats[striker];if(!bat)break;const b=batting.players.find(p=>p.name===bat.name)||bats[0];const skill=b.rating+(Math.random()*16-8),bowlSkill=(overs[over%bowlStats.length].rating||75)+(Math.random()*16-8);let outcome;
   const wicketChance=Math.max(.025,Math.min(.12,.058+(bowlSkill-skill)*.0015));const roll=Math.random();
   if(roll<wicketChance){wickets++;bat.out=true;bat.b++;balls++;bowler.balls++;bowler.w++;outcome='W';const wicketLine=`${over+1}.${ball+1} ${bat.name} is OUT! ${overs[over%bowlStats.length].name} takes the wicket.`;commentary.push(wicketLine);ballByBall.push(wicketLine);striker=Math.max(striker,non)+1;if(striker>=batStats.length)break;}
   else {let r=roll<.40?0:roll<.68?1:roll<.78?2:roll<.90?4:roll<.95?6:3;bat.r+=r;bat.b++;bowler.r+=r;total+=r;balls++;bowler.balls++;if(r===4)bat.fours++;if(r===6)bat.sixes++;outcome=r===0?'dot ball':`${r} run${r===1?'':'s'}`;ballByBall.push(`${over+1}.${ball+1} ${bat.name}: ${outcome}.`);if(r===4||r===6||over>=16&&r>=2)commentary.push(`${over+1}.${ball+1} ${bat.name} hits ${r===4?'FOUR':r===6?'SIX':r+' runs'}!`);if(r%2) [striker,non]=[non,striker];}
   if(ball===5&&wickets<10)[striker,non]=[non,striker];
  }
  if(over%5===4)commentary.push(`End of over ${over+1}: ${total}/${wickets}.`);
 }
 const completedOvers=Math.floor(balls/6)+(balls%6)/10;const econ=bowlStats.map(x=>({...x,overs:(Math.floor(x.balls/6)+(x.balls%6)/10).toFixed(1),economy:x.balls?(x.r/(x.balls/6)).toFixed(2):'0.00'}));
 return {team:batting.name,total,wickets,balls,nrrBalls:wickets===10?120:balls,overs:completedOvers.toFixed(1),batStats,bowlStats:econ,extras,commentary:commentary.slice(-24),ballByBall};
}
function simulateCricketMatch(a,b,idx){const toss=Math.random()<.5?a:b;const first=cricketInnings(toss,toss===a?b:a),second=cricketInnings(toss===a?b:a,toss);let winner,margin;if(second.total>first.total){winner=second.team;margin=`${10-second.wickets} wickets`;}else if(second.total===first.total){winner='Tie';margin='Super Over not simulated';}else{winner=first.team;margin=`${first.total-second.total} runs`;}return {id:idx,a:a.name,b:b.name,first,second,winner,margin,highlights:[...first.commentary.slice(-4),...second.commentary.slice(-4)]};}
function cricketTournament(){const fixtures=[];let n=0;for(let i=0;i<state.teams.length;i++)for(let j=i+1;j<state.teams.length;j++)fixtures.push(simulateCricketMatch(state.teams[i],state.teams[j],++n));const table=state.teams.map(t=>({name:t.name,played:0,w:0,l:0,t:0,pts:0,forRuns:0,againstRuns:0,forBalls:0,againstBalls:0}));fixtures.forEach(f=>{const a=table.find(x=>x.name===f.a),b=table.find(x=>x.name===f.b);a.played++;b.played++;const x=f.first.team===f.a?f.first:f.second,y=f.first.team===f.b?f.first:f.second;a.forRuns+=x.total;a.againstRuns+=y.total;b.forRuns+=y.total;b.againstRuns+=x.total;a.forBalls+=(x.nrrBalls||120);a.againstBalls+=(y.nrrBalls||120);b.forBalls+=(y.nrrBalls||120);b.againstBalls+=(x.nrrBalls||120);if(f.winner==='Tie'){a.t++;b.t++;a.pts++;b.pts++;}else{const win=table.find(z=>z.name===f.winner),lose=win===a?b:a;win.w++;win.pts+=2;lose.l++;}});table.forEach(x=>{x.nrr=(x.forRuns/Math.max(1,x.forBalls/6))-(x.againstRuns/Math.max(1,x.againstBalls/6));});table.sort((a,b)=>b.pts-a.pts||b.nrr-a.nrr);const final=null;return {fixtures,table,final};}
function openCricketScorecard(id){const f=state.matchDetails.find(x=>x.id===id);if(!f)return;const panel=document.getElementById('matchDetail_'+id);const button=document.getElementById('scoreToggle_'+id);if(!panel||!button)return;if(!panel.classList.contains('hidden')){panel.classList.add('hidden');panel.innerHTML='';button.textContent='View scorecard';button.setAttribute('aria-expanded','false');return;}const batting=(inn,label)=>`<section class="score-slide"><h4>${label}: ${inn.team} — ${inn.total}/${inn.wickets} (${inn.overs} ov)</h4><b class="score-table-title">Batting</b><div class="score-table-wrap"><table><thead><tr><th>Batter</th><th>R</th><th>B</th><th>4s</th><th>6s</th></tr></thead><tbody>${inn.batStats.map(x=>`<tr><td>${x.name}${x.out?' *':''}</td><td>${x.r}</td><td>${x.b}</td><td>${x.fours}</td><td>${x.sixes}</td></tr>`).join('')}</tbody></table></div></section>`;const bowling=(inn,label)=>`<section class="score-slide"><h4>${label}: ${inn.team}</h4><b class="score-table-title">Bowling</b><div class="score-table-wrap"><table><thead><tr><th>Bowler</th><th>O</th><th>R</th><th>W</th><th>Econ</th></tr></thead><tbody>${inn.bowlStats.map(x=>`<tr><td>${x.name}</td><td>${x.overs}</td><td>${x.r}</td><td>${x.w}</td><td>${x.economy}</td></tr>`).join('')}</tbody></table></div></section>`;panel.innerHTML=`<div class="scorecard"><div class="scorecard-top"><h4>${f.winner==='Tie'?'Match tied':f.winner+' won by '+f.margin}</h4><span>Scroll left to right for more</span></div><div class="score-track">${batting(f.first,'1st innings')}${bowling(f.first,'1st innings')}${batting(f.second,'2nd innings')}${bowling(f.second,'2nd innings')}<section class="score-slide highlights-slide"><h4>Key highlights</h4><ul class="commentary">${f.highlights.map(x=>`<li>${x}</li>`).join('')}</ul><details class="full-commentary"><summary>Full ball-by-ball commentary</summary><ol>${[...f.first.ballByBall,...f.second.ballByBall].map(x=>`<li>${x}</li>`).join('')}</ol></details></section></div><button class="fixture-toggle close-scorecard" onclick="closeCricketScorecard(${id})">Close scorecard</button></div>`;panel.classList.remove('hidden');button.textContent='Close scorecard';button.setAttribute('aria-expanded','true');}
function closeCricketScorecard(id){const panel=document.getElementById('matchDetail_'+id),button=document.getElementById('scoreToggle_'+id);if(panel){panel.classList.add('hidden');panel.innerHTML='';}if(button){button.textContent='View scorecard';button.setAttribute('aria-expanded','false');}}
function finish(){stopTimers();state.closed=true;state.paused=false;if(state.mode==='cricket'){const t=cricketTournament();state.fixtures=t.fixtures;state.matchDetails=t.fixtures;state.results=t.table.map(x=>({...x,players:state.teams.find(y=>y.name===x.name).players,spent:state.teams.find(y=>y.name===x.name).spent,budget:state.teams.find(y=>y.name===x.name).budget,score:x.pts}));const champion=t.table[0].name;const batAwards=new Map(),bowlAwards=new Map();t.fixtures.forEach(f=>[f.first,f.second].forEach(inn=>{inn.batStats.forEach(x=>batAwards.set(x.name,(batAwards.get(x.name)||0)+x.r));inn.bowlStats.forEach(x=>bowlAwards.set(x.name,(bowlAwards.get(x.name)||0)+x.w));}));const orange=[...batAwards].sort((a,b)=>b[1]-a[1])[0],purple=[...bowlAwards].sort((a,b)=>b[1]-a[1])[0];$("championPanel").innerHTML=`<div>🏆 <span class="eyebrow">TOURNAMENT WINNER · LEAGUE TABLE</span><h2>${champion}</h2><p>Top of the league table on points, with NRR used as the tie-breaker.</p><p class="empty-note">🟠 Orange Cap: ${orange?`${orange[0]} (${orange[1]} runs)`:'—'} · 🟣 Purple Cap: ${purple?`${purple[0]} (${purple[1]} wickets)`:'—'}</p></div><strong>${t.table[0].pts}<small>LEAGUE POINTS</small></strong>`;$("standings").innerHTML=t.table.map((x,i)=>`<div class="standing-row"><b>#${i+1}</b><span>${x.name}<small>${x.played} played · ${x.w}W ${x.l}L ${x.t}T · NRR ${x.nrr.toFixed(3)}</small></span><b>${x.pts} pts</b></div>`).join('');$("allTeamsPanel").innerHTML=`<h3>All squads</h3><div class="team-detail-grid">${state.teams.map(t=>`<div class="team-detail"><b>${t.name}</b><p>${t.players.length}/12 players · ${money(t.spent)} spent · ${money(t.budget)} left</p><ul>${t.players.map(p=>`<li>${p.name} · ${p.role} — ${money(p.price)}</li>`).join('')||"<li>No players won</li>"}</ul></div>`).join('')}</div>`;$("cricketLeaguePanel").classList.remove('hidden');$("cricketFixtures").innerHTML=t.fixtures.map(f=>`<div class="fixture-row"><span><b>${f.stage==='FINAL'?'🏆 FINAL · ':''}${f.a} vs ${f.b}</b><small>${f.winner==='Tie'?'Match tied':f.winner+' won by '+f.margin}</small></span><button id="scoreToggle_${f.id}" aria-expanded="false" onclick="openCricketScorecard(${f.id})">View scorecard</button><div class="match-detail-slot hidden" id="matchDetail_${f.id}"></div></div>`).join('');$("battlePanel").classList.add('hidden');$("toggleShowdown").closest('.standings-heading').classList.add('hidden');}else{state.results=state.teams.map(t=>({name:t.name,players:t.players,spent:t.spent,budget:t.budget,strength:strength(t)}));battle(false);}show('resultsScreen');localStorage.removeItem(SAVE_KEY);refreshContinueCard();}
function battle(again=true){state.battleRun++;let r=state.results.map(x=>({...x,profile:marvelTeamProfile(x.players)}));const wins=new Map(r.map((x,i)=>[i,0])),notes=[];for(let i=0;i<r.length;i++)for(let j=i+1;j<r.length;j++){const m=marvelMatchup(r[i].profile,r[j].profile);if(m.winner===0)wins.set(i,wins.get(i)+1);else if(m.winner===1)wins.set(j,wins.get(j)+1);notes.push(`${r[i].name} vs ${r[j].name}: ${m.winner===0?r[i].profile.lead?.name||r[i].name:m.winner===1?r[j].profile.lead?.name||r[j].name:'Draw'} — ${m.reason}`);}r=r.map((x,i)=>({...x,wins:wins.get(i),score:wins.get(i)})).sort((a,b)=>b.wins-a.wins||b.profile.tier-a.profile.tier);state.results=r;const c=r[0];$("championPanel").innerHTML=`<div>🏆 <span class="eyebrow">ARENA CHAMPION</span><h2>${c.name}</h2><p>${c.players.length} picks · ${money(c.spent)} spent · ${money(c.budget)} left</p><p class="empty-note">Key fighter: ${c.profile.lead?.name||'None'} · ${c.profile.label}</p></div><strong>${c.wins}<small>HEAD-TO-HEAD WINS</small></strong>`;$("standings").innerHTML=r.map((x,i)=>`<div class="standing-row"><b>#${i+1}</b><span>${x.name}<small>Lead: ${x.profile.lead?.name||'No character'} · ${x.profile.label}</small></span><b>${x.wins} wins</b></div>`).join('');$("battleSummary").innerHTML=`<p class="empty-note">Marvel matchups use power tiers, abilities and limited support effects—not a simple sum of ratings.</p><div class="matchup-notes">${notes.map(n=>`<p>${n}</p>`).join('')}</div>`;$("cricketLeaguePanel").classList.add('hidden');$("toggleShowdown").closest('.standings-heading').classList.remove('hidden');$("allTeamsPanel").innerHTML=`<h3>All squads</h3><div class="team-detail-grid">${state.teams.map(t=>`<div class="team-detail"><b>${t.name}</b><p>${t.players.length} picks · ${money(t.spent)} spent</p><ul>${t.players.map(p=>`<li>${p.name} — ${money(p.price)}</li>`).join('')}</ul></div>`).join('')}</div>`;if(again)toast('Battle simulated again!');}
$("pauseGame").onclick=pauseGame;$("resumeGame").onclick=resumeGame;$("saveExit").onclick=exitPaused;$("continueGame").onclick=()=>{if(restoreProgress()){$("pauseOverlay").classList.remove('hidden');}};$("discardGame").onclick=()=>{window.__bidBaazHideSavedCard=true;localStorage.removeItem(SAVE_KEY);$("continueCard").classList.add("hidden");};refreshContinueCard();

window.addEventListener("beforeunload",saveProgress);setInterval(()=>{if(state.teams.length&&!state.paused)saveProgress();},2500);

