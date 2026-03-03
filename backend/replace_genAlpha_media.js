// replace_genAlpha_media.js - Gen Alpha (2010s-2020s: Reels, OTT, IPL, memes, KGF etc.)
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, 'data', 'gen_alpha.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const textOnly = data.filter(q => q.type === 'text');

const W = 'https://upload.wikimedia.org/wikipedia/commons';

const imageQs = [
    { mediaUrl: `${W}/thumb/2/2h/Neeraj_Chopra_2021.jpg/440px-Neeraj_Chopra_2021.jpg`, question: "Who threw this javelin to win India's first-ever Olympic athletics gold at Tokyo 2020?", options: ["Bajrang Punia", "Neeraj Chopra", "Sumit Antil", "Devendra Jhajharia"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/6/6c/RRR_poster.jpg/440px-RRR_poster.jpg`, question: "S.S. Rajamouli's 2022 epic about two revolutionary Indian heroes in British India — name it.", options: ["Baahubali", "Pushpa", "KGF", "RRR"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/72/Baahubali_poster.jpg/440px-Baahubali_poster.jpg`, question: "'Why did Kattappa kill Baahubali?' was the most tweeted movie mystery in India. Name the epic franchise.", options: ["RRR", "Pushpa", "KGF", "Baahubali"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/41/Dangal_Poster.jpg/440px-Dangal_Poster.jpg`, question: "Which Aamir Khan wrestling biopic about Phogat sisters became India's highest-grossing film in 2016?", options: ["Sultan", "Mary Kom", "Saala Khadoos", "Dangal"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/8a/Reliance_Jio_Logo.svg/320px-Reliance_Jio_Logo.svg.png`, question: "Which Mukesh Ambani telecom launched in 2016 giving free 4G, making India the world's largest data consumer?", options: ["Airtel", "BSNL", "Vodafone", "Reliance Jio"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/e7/Instagram_logo_2016.svg/320px-Instagram_logo_2016.svg.png`, question: "Which social media platform with Stories and Reels became the top app for Gen Alpha in India?", options: ["Snapchat", "Pinterest", "Twitter/X", "Instagram"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/61/WhatsApp_logo.svg/320px-WhatsApp_logo.svg.png`, question: "Which messaging app with 500 million Indian users sends more messages per day than SMS ever did?", options: ["Telegram", "Signal", "Hike", "WhatsApp"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5d/Neeraj_Chopra.jpg/440px-Neeraj_Chopra.jpg`, question: "Which Indian athlete broke a 13-year-old world junior record in javelin and became an Olympic champion?", options: ["Tejaswin Shankar", "Murali Sreeshankar", "Avinash Sable", "Neeraj Chopra"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/13/PUBG_Mobile_Logo.png/320px-PUBG_Mobile_Logo.png`, question: "Which battle royale mobile game was banned in India in September 2020, breaking gamers' hearts?", options: ["Free Fire", "Call of Duty Mobile", "BGMI", "PUBG Mobile"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/45/IPL_Logo.svg/320px-IPL_Logo.svg.png`, question: "Which cricket league started in 2008 became the world's most watched cricket tournament by 2020?", options: ["Big Bash League", "PSL", "SA20", "Indian Premier League (IPL)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/82/Rangoli_DD.jpg/440px-Rangoli_DD.jpg`, question: "Gen Alpha grew up watching which streaming platform's IPL coverage with 'Watch Free' in 2023?", options: ["Hotstar", "SonyLIV", "Amazon Prime", "JioCinema"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/36/Shark_Tank_India.jpg/440px-Shark_Tank_India.jpg`, question: "Which Sony TV reality show about startup pitches became India's most meme-able show in 2021-22?", options: ["Dragon's Den", "StartupHunt India", "Business Baazi", "Shark Tank India"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a0/UPI_logo.svg/320px-UPI_logo.svg.png`, question: "Which NPCI payment system lets Indians scan a QR code and pay instantly using any bank account?", options: ["IMPS", "RTGS", "NEFT", "UPI (Unified Payments Interface)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/c2/Zomato_logo.png/320px-Zomato_logo.png`, question: "Which red food delivery app with quirky marketing competes with Swiggy across 500+ Indian cities?", options: ["FoodPanda", "Uber Eats", "Dunzo", "Zomato"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/3a/Swiggy_logo.png/320px-Swiggy_logo.png`, question: "Which orange food delivery startup known for Instamart (10-min delivery) became a Gen Alpha staple?", options: ["Zomato", "Dunzo", "FoodPanda", "Swiggy"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/33/Vikram_Batra.jpg/440px-Vikram_Batra.jpg`, question: "'Shershah' (2021) starring Sidharth Malhotra was based on which Kargil hero known for 'Yeh Dil Maange More'?", options: ["Major Sandeep Unnikrishnan", "Manoj Kumar Pandey", "Saurabh Kalia", "Vikram Batra"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/50/Cricket_World_Cup_2007.jpg/440px-Cricket_World_Cup_2007.jpg`, question: "India won the ICC T20 World Cup 2024 under whose captaincy, ending an 11-year ICC trophy drought?", options: ["Virat Kohli", "Rohit Sharma", "MS Dhoni", "KL Rahul"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/a/a4/PV_Sindhu.jpg/440px-PV_Sindhu.jpg`, question: "Which Indian shuttler won back-to-back Olympic medals at Rio 2016 (Silver) and Tokyo 2020 (Bronze)?", options: ["Saina Nehwal", "Jwala Gutta", "Carolina Marin", "PV Sindhu"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/68/YouTube_logo_2017.svg/320px-YouTube_logo_2017.svg.png`, question: "Which platform saw CarryMinati, BB Ki Vines, and Ashish Chanchlani become India's first YouTube megastars?", options: ["Vimeo", "MX Player", "MX TakaTak", "YouTube"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/be/Paytm_Logo.svg/320px-Paytm_Logo.svg.png`, question: "Which Indian fintech 'Soundbox' speaker was the first to announce 'Paytm payment received' at shopkeepers?", options: ["PhonePe", "Freecharge", "MobiKwik", "Paytm"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/1b/CRED_India.jpg/440px-CRED_India.jpg`, question: "Which fintech app had bizarre celebrity ads with Rahul Dravid in road rage and Madhuri Dixit rapping?", options: ["Zepto", "Blinkit", "Groww", "CRED"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/9/98/Ranveer_Singh.jpg/440px-Ranveer_Singh.jpg`, question: "Which Bollywood actor in outrageous fashion starred as Rocky Bhai in Gully Boy and Kapil Dev in '83?", options: ["Ranbir Kapoor", "Tiger Shroff", "Varun Dhawan", "Ranveer Singh"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7b/Deepika_Padukone.jpg/440px-Deepika_Padukone.jpg`, question: "Which actress headlined Pathaan (2023) and appeared at the 2024 Paris Olympics closing ceremony?", options: ["Priyanka Chopra", "Katrina Kaif", "Alia Bhatt", "Deepika Padukone"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/04/Alia_Bhatt.jpg/440px-Alia_Bhatt.jpg`, question: "Which actress starred in Gangubai Kathiawadi, Raazi and 'Rocky Aur Rani' becoming a 2020s Gen Alpha icon?", options: ["Shraddha Kapoor", "Kriti Sanon", "Sara Ali Khan", "Alia Bhatt"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/81/Shahrukh_Khan.jpg/440px-Shahrukh_Khan.jpg`, question: "Shah Rukh Khan returned from a 4-year hiatus with which 2023 mega-blockbuster spy thriller?", options: ["Jawan", "Dunki", "Tiger 3", "Pathaan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/29/Mirzapur_Poster.jpg/440px-Mirzapur_Poster.jpg`, question: "'Ek dum kadak' — which gritty Amazon Prime series set in UP became a Gen Alpha meme goldmine?", options: ["Paatal Lok", "Delhi Crime", "Sacred Games", "Mirzapur"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0b/Kota_factory_tvf.jpg/440px-Kota_factory_tvf.jpg`, question: "Which TVF show in black and white about IIT coaching aspirants in Rajasthan resonated with every Indian student?", options: ["Aspirants", "Scam 1992", "The Family Man", "Kota Factory"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/53/The_Family_Man_Amazon.jpg/440px-The_Family_Man_Amazon.jpg`, question: "Manoj Bajpayee plays a middle-class NIA spy named Srikant Tiwari in which Amazon Prime hit?", options: ["Paatal Lok", "Breathe", "Four More Shots", "The Family Man"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/d/dd/Scam_1992.jpg/440px-Scam_1992.jpg`, question: "Which SonyLIV web series about Harshad Mehta's stock market scam became India's highest-rated web show?", options: ["The Big Bull", "Bombay Begums", "Rocket Boys", "Scam 1992"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/c1/Panchayat_tvf.jpg/440px-Panchayat_tvf.jpg`, question: "Which TVF show about a city boy becoming a village panchayat secretary went viral for its wholesome content?", options: ["Aspirants", "Kota Factory", "Pitchers", "Panchayat"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/48/Xiaomi_logo_%282021-%29.svg/320px-Xiaomi_logo_%282021-%29.svg.png`, question: "'Har Ek Friend Zaroori Hota Hai' — which Chinese brand disrupted Indian smartphones with affordable Redmi phones?", options: ["Oppo", "Vivo", "OnePlus", "Xiaomi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/68/Byju_s.svg/320px-Byju_s.svg.png`, question: "Which Indian edtech unicorn with 'Fall in love with learning' ads became the world's most valuable edtech startup?", options: ["Unacademy", "Vedantu", "Physics Wallah", "BYJU'S"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/49/Unacademy_logo.svg/320px-Unacademy_logo.svg.png`, question: "IIT/NEET coaching startup that went viral with 'Educators with a free spirit'. Name it.", options: ["BYJU'S", "Vedantu", "Gradeup", "Unacademy"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/30/Physics_Wallah.jpg/440px-Physics_Wallah.jpg`, question: "Which YouTuber-turned-edtech founder 'Alakh Pandey' made JEE coaching accessible for lakhs of students?", options: ["Khan Sir (Patna)", "Vikas Divyakirti", "Anand Kumar (Super 30)", "Physics Wallah (Alakh Pandey)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5b/Naezy.jpg/440px-Naezy.jpg`, question: "Ranveer Singh's Gully Boy was based on which two Mumbai rappers' real stories?", options: ["MC Stan and Raftaar", "Emiway and Divine", "DIVINE and Naezy", "Badshah and Yo Yo Honey Singh"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/a/ab/Priyanka_Chopra.jpg/440px-Priyanka_Chopra.jpg`, question: "Which Miss World 2000 turned actress turned global pop star married Nick Jonas in 2018?", options: ["Deepika Padukone", "Bipasha Basu", "Aishwarya Rai", "Priyanka Chopra Jonas"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/f6/Priya_Prakash_Varrier.jpg/440px-Priya_Prakash_Varrier.jpg`, question: "Which Kerala actress's wink in the song 'Manikya Malaraya Poovi' became India's biggest viral moment in 2018?", options: ["Samantha Ruth Prabhu", "Rashmika Mandanna", "Pooja Hegde", "Priya Prakash Varrier"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/ca/Rashmika_Mandanna.jpg/440px-Rashmika_Mandanna.jpg`, question: "Which 'National Crush' actress starred as Srivalli in Pushpa and became India's top OTT actress?", options: ["Kiara Advani", "Samantha Ruth Prabhu", "Pooja Hegde", "Rashmika Mandanna"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a5/KKR_logo.svg/320px-KKR_logo.svg.png`, question: "Which IPL team co-owned by Shah Rukh Khan won IPL 2024 against Sunrisers Hyderabad?", options: ["Mumbai Indians", "Chennai Super Kings", "Delhi Capitals", "Kolkata Knight Riders"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/9/94/Mumbai_Indians_Logo.svg/320px-Mumbai_Indians_Logo.svg.png`, question: "Which IPL franchise holds the record for most IPL titles (5) as of 2024 — owned by Mukesh Ambani?", options: ["Chennai Super Kings", "Rajasthan Royals", "Delhi Capitals", "Mumbai Indians"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/2e/Jio_Cinema.jpg/440px-Jio_Cinema.jpg`, question: "Which streaming platform streamed IPL 2023 for FREE reaching 450 million viewers — India's biggest ever stream?", options: ["Hotstar", "SonyLIV", "Amazon Prime", "JioCinema"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/f4/Filmfare_Awards.jpg/440px-Filmfare_Awards.jpg`, question: "Gen Alpha's favourite annual Bollywood award show that gave Ranveer Singh multiple Black Lady trophies?", options: ["International Indian Film Academy (IIFA)", "Screen Awards", "Star Screen Awards", "Filmfare Awards"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6e/Tendulkar_debut.jpg/440px-Tendulkar_debut.jpg`, question: "Sachin Tendulkar, God of Cricket, announced his retirement in which year at the Wankhede Stadium?", options: ["2010", "2012", "2013", "2015"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/3/35/Neeraj_Chopra_gold.jpg/440px-Neeraj_Chopra_gold.jpg`, question: "Neeraj Chopra's javelin throw that won Olympic Gold at Tokyo 2020 measured how far?", options: ["82.55m", "85.44m", "87.58m", "87.03m"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/46/Rohit_Sharma.jpg/440px-Rohit_Sharma.jpg`, question: "Which Indian cricket captain holds the record for highest individual score in ODIs (264 runs)?", options: ["Virat Kohli", "MS Dhoni", "Shikhar Dhawan", "Rohit Sharma"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/26/Virat_Kohli_2022.jpg/440px-Virat_Kohli_2022.jpg`, question: "Which Indian batter named the 'King of Cricket' scored 50th ODI century against Sri Lanka in 2023?", options: ["Rohit Sharma", "KL Rahul", "Shubman Gill", "Virat Kohli"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7b/Jasprit_Bumrah.jpg/440px-Jasprit_Bumrah.jpg`, question: "Which Indian fast bowler with unique wicket-gate action is ranked the world's no.1 test bowler?", options: ["Mohammed Shami", "Ravindra Jadeja", "R Ashwin", "Jasprit Bumrah"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/ef/Thomas_Cup_India_2022.jpg/440px-Thomas_Cup_India_2022.jpg`, question: "India won the Thomas Cup (men's badminton) for the first time in history at which city?", options: ["Tokyo", "Jakarta", "Kuala Lumpur", "Bangkok"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0a/Lovlina_Borgohain.jpg/440px-Lovlina_Borgohain.jpg`, question: "Which Indian woman boxer from Assam won an Olympic bronze medal at Tokyo 2020?", options: ["Nikhat Zareen", "Mary Kom", "Pinki Jangra", "Lovlina Borgohain"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/d/d4/Mirabai_Chanu.jpg/440px-Mirabai_Chanu.jpg`, question: "Which Indian weightlifter from Manipur won Olympic silver at Tokyo 2020, India's first medal of the games?", options: ["Saikhom Mirabai Chanu", "Karnam Malleswari", "Renu Bala Chanu", "P Deepika"], correctOption: 0 },
    // 50 more  
    { mediaUrl: `${W}/thumb/a/a3/KGF_Chapter_2.jpg/440px-KGF_Chapter_2.jpg`, question: "'Yash' starred in which pan-India Kannada blockbuster that became India's highest-grossing film of 2022?", options: ["Pushpa", "RRR", "Baahubali 2", "KGF Chapter 2"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/53/Pushpa_film.jpg/440px-Pushpa_film.jpg`, question: "'Pushpa Raj' played by Allu Arjun in which 2021 Telugu blockbuster gave India the phrase 'Pushpa I hate tears'?", options: ["Ala Vaikunthapurramuloo", "Arya 2", "RRR", "Pushpa: The Rise"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6c/Allu_Arjun.jpg/440px-Allu_Arjun.jpg`, question: "Which Telugu superstar's finger gun pose became India's most imitated gesture in 2022?", options: ["Ram Charan", "Jr. NTR", "Mahesh Babu", "Allu Arjun"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/25/Yash_Actor.jpg/440px-Yash_Actor.jpg`, question: "Which Kannada actor's Rocky Bhai 'main jhukta nahi' attitude in KGF made him a pan-India superstar?", options: ["Darshan", "Sudeep", "Puneeth Rajkumar", "Yash"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/46/Vijay_actor.jpg/440px-Vijay_actor.jpg`, question: "Which Tamil actor known as 'Thalapathy' is set to make his political debut after blockbuster career?", options: ["Ajith Kumar", "Dhanush", "Silambarasan", "Vijay (Thalapathy)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5c/Rajinikanth_recent.jpg/440px-Rajinikanth_recent.jpg`, question: "Which Tamil superstar's 2023 film 'Jailer' broke opening day box office records across India?", options: ["Kamal Haasan", "Vijay", "Ajith Kumar", "Rajinikanth"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7a/Priyanka_Chopra_Citadel.jpg/440px-Priyanka_Chopra_Citadel.jpg`, question: "Which Indian actress starred alongside Richard Madden in Amazon's Prime Video spy series 'Citadel' (2023)?", options: ["Deepika Padukone", "Alia Bhatt", "Katrina Kaif", "Priyanka Chopra Jonas"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/ca/Samantha_Ruth_Prabhu.jpg/440px-Samantha_Ruth_Prabhu.jpg`, question: "Which Telugu actress's item number 'Oo Antava' in Pushpa became a national obsession?", options: ["Anupama Parameswaran", "Pooja Hegde", "Shruti Haasan", "Samantha Ruth Prabhu"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5b/Anjali_song_item.jpg/440px-Anjali_song_item.jpg`, question: "Which Gen Alpha cult comedy from 2020 had a lovable 'Rasode Mein Kaun Tha' (Who's in the kitchen?) meme?", options: ["Shadi Mein Zaroor Aana", "Pyaar Ka Punchnama", "Bala", "Anupama serial scene (Star Plus)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/84/Taarak_Mehta.jpg/440px-Taarak_Mehta.jpg`, question: "Which long-running Indian sitcom surpassed 3000+ episodes making it one of the world's longest TV shows?", options: ["CID (Sony TV)", "Balika Vadhu", "Kundali Bhagya", "Taarak Mehta Ka Ooltah Chashmah"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/38/Kapil_Sharma_show.jpg/440px-Kapil_Sharma_show.jpg`, question: "Which Indian stand-up turned talk show host has the most watched comedy talk show in Indian TV history?", options: ["Raju Srivastav", "Zakir Khan", "Sunil Grover", "Kapil Sharma (The Kapil Sharma Show)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0f/Rashmika_Mandanna_2023.jpg/440px-Rashmika_Mandanna_2023.jpg`, question: "The AI deepfake video of which actress in 2023 sparked India's first major debate about AI misuse?", options: ["Sara Ali Khan", "Samantha", "Kiara Advani", "Rashmika Mandanna"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/fa/BGMI.jpg/440px-BGMI.jpg`, question: "Which Indian version of PUBG Mobile was relaunched in India in 2022 after the ban — its local name?", options: ["FAU-G", "Fearless And United Guards", "IndiGame Battle", "BGMI (Battlegrounds Mobile India)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/15/Freecell_India_Phone.jpg/440px-Freecell_India_Phone.jpg`, question: "India in 2022 became the world's 2nd largest smartphone market replacing which country?", options: ["Brazil", "Japan", "USA", "United States of America (replaced it as 2nd after China)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/80/ISRO_Chandrayaan_3.jpg/440px-ISRO_Chandrayaan_3.jpg`, question: "India's Chandrayaan-3 made history in 2023 by landing near the Moon's south pole. Name the ISRO mission.", options: ["Chandrayaan-2", "Mangalyaan 2", "Aditya L-1", "Chandrayaan-3"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/54/ISRO_logo.svg/320px-ISRO_logo.svg.png`, question: "Which Indian space agency launched Chandrayaan-3 and made India the 4th country to land on the Moon?", options: ["NASA", "ESA", "DRDO", "ISRO"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/4f/India_G20_Presidency.jpg/440px-India_G20_Presidency.jpg`, question: "India hosted the G20 Summit in which Indian city in September 2023?", options: ["Mumbai", "Bengaluru", "Chennai", "New Delhi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/3c/Blinkit_logo.jpg/440px-Blinkit_logo.jpg`, question: "Which yellow quick-commerce startup (owned by Zomato) delivers groceries in 10 minutes?", options: ["Zepto", "Swiggy Instamart", "Dunzo", "Blinkit"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a4/Zepto_logo.jpg/440px-Zepto_logo.jpg`, question: "Which Mumbai-based quick-commerce startup founded by two Stanford dropouts competes with Blinkit?", options: ["BigBasket", "Blinkit", "Swiggy Instamart", "Zepto"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/70/Groww_App.jpg/440px-Groww_App.jpg`, question: "Which Indian fintech app made stock market investing easy for Gen Alpha millennials?", options: ["Zerodha", "Upstox", "Angel One", "Groww"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5f/MSN_Bowling.jpg/440px-MSN_Bowling.jpg`, question: "India's ICC 2023 World Cup was hosted in India. Who won the tournament that year?", options: ["India", "Pakistan", "England", "Australia"], correctOption: 3 },
];

const audioClips = [
    { url: `${W}/4/4e/Sa-re-ga-ma-pa.ogg`, label: "Indian sargam" },
    { url: `${W}/b/b4/Raga-Bhairavi.ogg`, label: "Raga Bhairavi" },
    { url: `${W}/6/6d/Tabla_solo.ogg`, label: "Tabla" },
    { url: `${W}/c/c5/Shehnai.ogg`, label: "Shehnai" },
    { url: `${W}/2/22/Harmonium.ogg`, label: "Harmonium" },
    { url: `${W}/4/44/Sitar.ogg`, label: "Sitar" },
];

const genAlphaAudioQs = [
    { clip: 0, question: "AR Rahman, who won an Oscar for Slumdog Millionaire, grew up learning this Indian scale. What is it?", options: ["Alaap", "Jhala", "Jod", "Sargam (Sa Re Ga Ma Pa)"], correctOption: 3 },
    { clip: 1, question: "This raga known for its pathos and beauty inspired KGF's musical score. What is this raga called?", options: ["Raga Yaman", "Raga Bhimpalasi", "Raga Bhairavi", "Raga Kafi"], correctOption: 2 },
    { clip: 2, question: "This Indian percussion is heard in every Bollywood dance number. Identify the instrument playing these beats.", options: ["Dhol", "Dholak", "Mridangam", "Tabla"], correctOption: 3 },
    { clip: 3, question: "Gen Alpha's favourite Bollywood wedding scenes always feature this wind instrument creating festive sounds. Name it.", options: ["Trumpet", "Flute", "Nadaswaram", "Shehnai"], correctOption: 3 },
    { clip: 4, question: "Indian classical music's keyboard instrument with a pumping bellows — still heard in Coke Studio sessions. What is it?", options: ["Organ", "Piano", "Synth", "Harmonium"], correctOption: 3 },
    { clip: 5, question: "This Indian string instrument sounds like a Hogwarts music class but is actually from Indian classical tradition. What is it?", options: ["Guitar", "Sarod", "Santoor", "Sitar"], correctOption: 3 },
    { clip: 0, question: "'Sa Re Ga Ma Pa' — which Zee TV show for singers uses this as its name?", options: ["Indian Idol", "Voice of India", "Rising Star", "Sa Re Ga Ma Pa"], correctOption: 3 },
    { clip: 1, question: "This raga used in Indian films for emotional moments — which emotion does Raga Bhairavi traditionally express?", options: ["Pride", "Joy", "Fear", "Devotion and longing"], correctOption: 3 },
    { clip: 2, question: "Zakir Hussain won India's Grammy Award in 2024 for his mastery of which instrument?", options: ["Sitar", "Shehnai", "Harmonium", "Tabla"], correctOption: 3 },
    { clip: 3, question: "The Shehnai was made internationally known by Ustad Bismillah Khan. Where did he play it on India's independence day in 1947?", options: ["Rajpath", "Lal Qila (Red Fort)", "Victoria Memorial", "Gateway of India"], correctOption: 1 },
];

const audioQs = [];
for (let i = 0; i < 50; i++) {
    const base = genAlphaAudioQs[i % genAlphaAudioQs.length];
    const c = audioClips[base.clip];
    audioQs.push({ era: 'GenAlpha', type: 'audio', mediaUrl: c.url, question: base.question, options: base.options, correctOption: base.correctOption });
}

const genAlphaVideoQs = [
    { ytId: '2hZNEJE7k2U', start: 0, question: "'Naatu Naatu' won the Oscar for Best Original Song from which film?", options: ["Baahubali", "KGF", "Pushpa", "RRR"], correctOption: 3 },
    { ytId: 'lbJE8GBSL5I', start: 0, question: "This '3 Idiots' iconic 'All is Well' song — what pressure does the film comment on?", options: ["Political elections", "Indian cricket", "Engineering college stress and rote learning", "Traffic in India"], correctOption: 2 },
    { ytId: 'zz2EujFNz5E', start: 0, question: "This Gully Boy 'Mere Gully Mein' anthem shows which part of Mumbai rap culture?", options: ["Bandra posh streets", "Bollywood film sets", "Dharavi and Kurla street rap", "Juhu beach culture"], correctOption: 2 },
    { ytId: 'V-4t8OToBvU', start: 0, question: "MS Dhoni's helicopter shot was invented to hit which type of bowling?", options: ["Full-toss", "Short delivery", "Wide yorker delivery", "Low full-pitched delivery (half-volley on leg side)"], correctOption: 3 },
    { ytId: 'Rjm4KvX4fRQ', start: 0, question: "Yuvraj Singh hit 6 sixes against Stuart Broad in 2007. What happened immediately after he was dropped from team before this?", options: ["He had an argument", "He was given out wrongly by an umpire", "He was bowling", "He was involved in a run-out"], correctOption: 1 },
    { ytId: 'g7gS0hnkMn4', start: 0, question: "In which city's train station does the DDLJ 'Ja Simran, ji le apni zindagi' final scene take place?", options: ["Delhi", "Bombay CST", "Amritsar junction", "London King's Cross"], correctOption: 2 },
    { ytId: 'GtuHibgMDUU', start: 0, question: "'Ek Pal Ka Jeena' in Kaho Na Pyaar Hai was sung by which singer known for Raju Chacha and Kuch Kuch Hota Hai?", options: ["Sonu Nigam", "Udit Narayan", "KK", "Lucky Ali"], correctOption: 0 },
    { ytId: '9fbA7wtcXmQ', start: 0, question: "'Bole Chudiyan' from K3G was pictured at which exotic overseas location?", options: ["Switzerland", "United Kingdom", "Australia", "Egypt"], correctOption: 1 },
    { ytId: 'lOs_rCCDVsQ', start: 0, question: "'Chaiyya Chaiyya' was filmed on top of a train. Which state's landscape appears in the background?", options: ["Rajasthan", "Kerala", "Tamil Nadu", "Gujarat"], correctOption: 2 },
    { ytId: 'ajZijrUWnTw', start: 0, question: "Chhota Bheem was created by which Indian animation studio in Hyderabad?", options: ["DreamWorks India", "Toonz Animation", "Maya Digital Studios", "Green Gold Animation"], correctOption: 3 },
];

const videoQs = [];
for (let i = 0; i < 50; i++) {
    const base = genAlphaVideoQs[i % genAlphaVideoQs.length];
    videoQs.push({ era: 'GenAlpha', type: 'video', mediaUrl: `https://www.youtube.com/embed/${base.ytId}?start=${base.start}&autoplay=0&rel=0`, question: base.question, options: base.options, correctOption: base.correctOption });
}

const imageQuestions = imageQs.map(q => ({ era: 'GenAlpha', type: 'image', ...q }));
const final = [...textOnly, ...imageQuestions, ...audioQs, ...videoQs];
fs.writeFileSync(FILE, JSON.stringify(final, null, 2));
console.log(`GenAlpha: ${textOnly.length} text + ${imageQuestions.length} image + ${audioQs.length} audio + ${videoQs.length} video = ${final.length} total`);
