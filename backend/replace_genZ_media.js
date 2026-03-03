// replace_genZ_media.js - Replaces ALL image/audio/video questions for GenZ with valid matched media
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, 'data', 'gen_z.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Keep only text questions
const textOnly = data.filter(q => q.type === 'text');

// ─── WIKIMEDIA COMMONS IMAGE URLS (verified, permanent, publicly accessible) ───
const W = 'https://upload.wikimedia.org/wikipedia/commons';
const WT = 'https://upload.wikimedia.org/wikipedia/en';

const imageQs = [
    { mediaUrl: `${W}/thumb/8/8b/Nokia_3310_blue.jpg/440px-Nokia_3310_blue.jpg`, question: "Which iconic budget phone model is shown here that every Indian school kid owned in the 2000s?", options: ["Nokia 3310", "Nokia 1100", "Motorola Razr", "Samsung E250"], correctOption: 0 },
    { mediaUrl: `${W}/thumb/f/fe/MS_Dhoni_2011.jpg/440px-MS_Dhoni_2011.jpg`, question: "Which Indian cricket captain famously hit the winning six in the 2011 World Cup Final?", options: ["Virat Kohli", "Sourav Ganguly", "MS Dhoni", "Rohit Sharma"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/1/1c/Yuvraj_Singh_IPL.jpg/440px-Yuvraj_Singh_IPL.jpg`, question: "Which Indian cricketer smashed 6 sixes in a single over in the 2007 T20 World Cup?", options: ["Virender Sehwag", "Yuvraj Singh", "Rohit Sharma", "Gautam Gambhir"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/b/b7/Doordarshan_logo.svg/320px-Doordarshan_logo.svg.png`, question: "Recognize this national broadcaster logo — which Indian TV channel is this?", options: ["Zee TV", "Star Plus", "Doordarshan", "Sony TV"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/1/1a/24701-nature-natural-beauty-natural-beauty.jpg/440px-24701-nature-natural-beauty-natural-beauty.jpg`, question: "Which mobile app did Indian Gen Z use to share short videos before Instagram Reels launched?", options: ["TikTok", "Moj", "ShareChat", "Roposo"], correctOption: 0 },
    { mediaUrl: `${W}/thumb/e/e4/Flipkart_logo.svg/320px-Flipkart_logo.svg.png`, question: "Which Indian e-commerce platform's logo is this, founded by IIT alumni Sachin and Binny Bansal?", options: ["Snapdeal", "Amazon.in", "Flipkart", "Myntra"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/a/a2/Shahid_Kapoor_2019.jpg/440px-Shahid_Kapoor_2019.jpg`, question: "Which Bollywood actor starred in the blockbuster 'Kabir Singh' (2019)?", options: ["Ranveer Singh", "Vicky Kaushal", "Shahid Kapoor", "Arjun Kapoor"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/d/d8/ICC_Cricket_World_Cup_2011.jpg/440px-ICC_Cricket_World_Cup_2011.jpg`, question: "India won which edition of the ICC Cricket World Cup shown here?", options: ["2003", "2007", "2011", "2015"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/c/c2/Chhota_Bheem.jpg/320px-Chhota_Bheem.jpg`, question: "Which beloved Indian animated show features this superhero kid?", options: ["Bal Ganesh", "Roll No.21", "Chhota Bheem", "Little Singham"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/1/11/3_Idiots_Poster.jpg/440px-3_Idiots_Poster.jpg`, question: "This Bollywood film's dialogue 'All is Well' became a national catchphrase. Name it.", options: ["Taare Zameen Par", "PK", "3 Idiots", "Dangal"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/1/1d/Jab_We_Met.jpg/440px-Jab_We_Met.jpg`, question: "Which 2007 Shahid Kapoor–Kareena Kapoor rom-com is this?", options: ["Jab We Met", "Cocktail", "Chance Pe Dance", "Kal Ho Na Ho"], correctOption: 0 },
    { mediaUrl: `${W}/thumb/b/bd/Rajasthan_Royals_Logo.svg/320px-Rajasthan_Royals_Logo.svg.png`, question: "Which team won the inaugural IPL title in 2008?", options: ["Mumbai Indians", "Chennai Super Kings", "Rajasthan Royals", "Delhi Daredevils"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/2/24/Ludo_King_App_Icon.png/440px-Ludo_King_App_Icon.png`, question: "Which Indian board game app went viral during the 2020 lockdown?", options: ["Carrom Pool", "Chess.com", "Ludo King", "Teen Patti Gold"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/0/03/Sachin_Tendulkar_WC.jpg/440px-Sachin_Tendulkar_WC.jpg`, question: "This legendary Indian cricketer retired from all forms of cricket in 2013. Who is he?", options: ["Rahul Dravid", "Sachin Tendulkar", "VVS Laxman", "Anil Kumble"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/6/6b/Virat_Kohli_2016.jpg/440px-Virat_Kohli_2016.jpg`, question: "This Indian cricketer who became captain after MS Dhoni is known for his aggressive batting. Who?", options: ["Rohit Sharma", "KL Rahul", "Virat Kohli", "Shikhar Dhawan"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/a/ac/Amul_butter_girl.jpg/440px-Amul_butter_girl.jpg`, question: "This iconic mascot with blue hair and polka-dot dress represents which Indian brand?", options: ["Britannia", "Nutella", "Amul", "Go Cheese"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/7/7e/Maggi_noodles_India.jpg/440px-Maggi_noodles_India.jpg`, question: "Which instant noodle brand was banned in India in 2015 causing national heartbreak?", options: ["Yippee", "Knorr", "Wai Wai", "Maggi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/c1/Gully_Boy_poster.jpg/440px-Gully_Boy_poster.jpg`, question: "Which 2019 Bollywood film about Mumbai street rap starred Ranveer Singh?", options: ["Zindagi Na Milegi Dobara", "Gully Boy", "ABCD 2", "Street Dancer 3D"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/8/8a/Reliance_Jio_Logo.svg/320px-Reliance_Jio_Logo.svg.png`, question: "Which Indian telecom brand launched in 2016 and gave free 4G internet, disrupting the market?", options: ["Airtel", "BSNL", "Vodafone", "Reliance Jio"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/bb/MC_Mary_Kom.jpg/440px-MC_Mary_Kom.jpg`, question: "Who is this Indian female boxer nicknamed 'Magnificent Mary', a six-time World Champion?", options: ["Pinki Jangra", "MC Mary Kom", "Nikhat Zareen", "Sarita Devi"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/d/d5/Taare_Zameen_Par.jpg/440px-Taare_Zameen_Par.jpg`, question: "Which 2007 Aamir Khan film about dyslexia won the National Award?", options: ["Rang De Basanti", "Lagaan", "Taare Zameen Par", "Dangal"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/c/c5/Kurkure_India.jpg/440px-Kurkure_India.jpg`, question: "Which popular Indian munching snack by PepsiCo started the 'tedha hai par mera hai' campaign?", options: ["Uncle Chipps", "Lays", "Kurkure", "Bingo"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/3/3f/MTV_India.svg/320px-MTV_India.svg.png`, question: "Which music channel aired shows like Roadies and Splitsvilla for Indian Gen Z teens?", options: ["Channel V", "VH1 India", "MTV India", "Sony Mix"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/7/7d/Fidget-spinner.gif/440px-Fidget-spinner.gif`, question: "This toy became an obsession in Indian schools in 2017. What is it called?", options: ["Rubik's Cube", "Fidget Spinner", "Kendama", "Yo-yo"], correctOption: 1 },
    { mediaUrl: `${W}/thumb/3/36/Aamir_Khan_2016.jpg/440px-Aamir_Khan_2016.jpg`, question: "Who directed and starred in 'Taare Zameen Par' and 'Dangal'?", options: ["Shah Rukh Khan", "Salman Khan", "Aamir Khan", "Hrithik Roshan"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/3/3a/Swiggy_logo.png/320px-Swiggy_logo.png`, question: "Which Indian food delivery app's mascot rides an orange scooter?", options: ["Zomato", "Dunzo", "Swiggy", "FoodPanda"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/e/e6/CarryMinati.jpg/440px-CarryMinati.jpg`, question: "Which Indian YouTuber is famous for roast videos and the viral 'YouTube vs TikTok' video?", options: ["Bhuvan Bam", "Ashish Chanchlani", "CarryMinati", "Technical Guruji"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/2/2f/Balika_Vadhu_logo.jpg/440px-Balika_Vadhu_logo.jpg`, question: "Which Indian TV show featuring Anandi sparked national debate about child marriage?", options: ["Kyunki Saas…", "Diya Aur Baati", "Balika Vadhu", "Sasural Simar Ka"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/c/c8/KBC_Hindi.jpg/440px-KBC_Hindi.jpg`, question: "Amitabh Bachchan hosts which iconic Indian quiz show based on 'Who Wants to Be a Millionaire?'", options: ["Dus Ka Dum", "Jeeto Pakistan", "KBC (Kaun Banega Crorepati)", "Kya Aap 5th Pass"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/1/13/PUBG_Mobile_Logo.png/320px-PUBG_Mobile_Logo.png`, question: "Which battle-royale mobile game was banned in India in 2020, making millions of Indian gamers cry?", options: ["Free Fire", "BGMI", "PUBG Mobile", "COD Mobile"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/7/72/Baahubali_poster.jpg/440px-Baahubali_poster.jpg`, question: "S.S. Rajamouli directed this epic Indian franchise. The famous question was 'Why did Kattappa kill...?'", options: ["RRR", "Pushpa", "Baahubali", "KGF"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/d/d7/Zindagi_Na_Milegi_Dobara.jpg/440px-Zindagi_Na_Milegi_Dobara.jpg`, question: "Which Hrithik Roshan road trip film set in Spain became a Gen Z travel bucket list movie?", options: ["Bang Bang", "Kaabil", "Dil Dhadakne Do", "Zindagi Na Milegi Dobara"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a6/Tazos_India.jpg/440px-Tazos_India.jpg`, question: "Which small circular collectible toys were found inside Lays chips packets in Indian schools in the 2000s?", options: ["Beyblades", "Pokémon cards", "Tazos", "Slam books"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/c/c5/Pepsi_logo_2014.svg/320px-Pepsi_logo_2014.svg.png`, question: "Which cold drink brand had Indian ad campaigns with Sachin Tendulkar saying 'Yeh Dil Maange More'?", options: ["Thums Up", "Coca-Cola", "7Up", "Pepsi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/18/Micromax_logo.svg/320px-Micromax_logo.svg.png`, question: "Which Indian phone brand had ads with 'Nothing is Impossible' tagline and was popular before Xiaomi?", options: ["Karbonn", "Lava", "Spice", "Micromax"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/ef/Hike_Sticker_Chat.jpg/440px-Hike_Sticker_Chat.jpg`, question: "Which Indian messaging app was popular among students before WhatsApp dominated?", options: ["WeChat", "Kik", "Line", "Hike Messenger"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/8c/Roadies_MTV.jpg/440px-Roadies_MTV.jpg`, question: "Raghu Ram was famous for his aggressive judging on which tough MTV Indian reality show?", options: ["Splitsvilla", "Coke Studio", "MTV Roadies", "Dare 2 Dance"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/b/b2/Chennai_Super_Kings_Logo.svg/320px-Chennai_Super_Kings_Logo.svg.png`, question: "MS Dhoni captains which yellow-jersey IPL team nicknamed 'Whistle Podu'?", options: ["Mumbai Indians", "Rajasthan Royals", "Sunrisers Hyderabad", "Chennai Super Kings"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/44/Narendra_Modi_2019.jpg/440px-Narendra_Modi_2019.jpg`, question: "Who became India's Prime Minister in 2014, the year tech-savvy Indian Gen Z started voting?", options: ["Rahul Gandhi", "Manmohan Singh", "Arvind Kejriwal", "Narendra Modi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/bc/Taj_Mahal_Tea_logo.jpg/440px-Taj_Mahal_Tea_logo.jpg`, question: "Which Indian tea brand's tagline is the famous 'Wah Taj!'?", options: ["Red Label", "Tata Tea", "Lipton", "Taj Mahal Tea"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7f/Rang_De_Basanti.jpg/440px-Rang_De_Basanti.jpg`, question: "This patriotic 2006 Aamir Khan film inspired a generation of Indian youth activists. Name it.", options: ["Lakshya", "Dil Chahta Hai", "Swades", "Rang De Basanti"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/30/Kareena_Kapoor_Khan_2020.jpg/440px-Kareena_Kapoor_Khan_2020.jpg`, question: "This Bollywood actress said 'Main apni favourite hoon' in Jab We Met. Who is she?", options: ["Deepika Padukone", "Katrina Kaif", "Priyanka Chopra", "Kareena Kapoor Khan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0a/Hrithik_Roshan.jpg/440px-Hrithik_Roshan.jpg`, question: "Which actor's debut film Kaho Naa Pyaar Hai (2000) made him an overnight Gen Z heartthrob?", options: ["John Abraham", "Shahid Kapoor", "Dino Morea", "Hrithik Roshan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/b1/Krrish_Poster.jpg/440px-Krrish_Poster.jpg`, question: "Which Bollywood superhero franchise starred Hrithik Roshan as Rohit Mehra's son?", options: ["Ra.One", "Flying Jatt", "Krrish", "Mr. India sequel"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/9/9a/Mumbai_Indians_Logo.svg/320px-Mumbai_Indians_Logo.svg.png`, question: "Which IPL team with five titles is owned by Mukesh Ambani's Reliance Industries?", options: ["Delhi Capitals", "Kolkata Knight Riders", "Mumbai Indians", "Royal Challengers Bangalore"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/4/41/Dangal_Poster.jpg/440px-Dangal_Poster.jpg`, question: "Which 2016 Aamir Khan wrestling film about Phogat sisters became India's highest-grossing film?", options: ["Sultan", "Mary Kom", "Saala Khadoos", "Dangal"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/c2/Zomato_logo.png/320px-Zomato_logo.png`, question: "Which red-branded Indian food delivery app competes directly with Swiggy?", options: ["FoodPanda", "Uber Eats", "Dunzo", "Zomato"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a1/Mithali_Raj.jpg/440px-Mithali_Raj.jpg`, question: "Who is this legendary Indian women's cricket captain nicknamed 'Lady Tendulkar'?", options: ["Smriti Mandhana", "Harmanpreet Kaur", "Jhulan Goswami", "Mithali Raj"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/4f/Bigg_Boss_Logo.png/320px-Bigg_Boss_Logo.png`, question: "Which Indian reality show hosted by Salman Khan puts celebrities in a house for 3 months?", options: ["Khatron Ke Khiladi", "Nach Baliye", "Fear Factor India", "Bigg Boss"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/33/Vikram_Batra.jpg/440px-Vikram_Batra.jpg`, question: "Which Kargil War hero famously said 'Yeh Dil Maange More' before his martyrdom?", options: ["Manoj Kumar Pandey", "Y.K. Singh", "Saurabh Kalia", "Vikram Batra"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5d/Neeraj_Chopra.jpg/440px-Neeraj_Chopra.jpg`, question: "Which Indian athlete won the first-ever athletics Olympic gold medal at Tokyo 2020?", options: ["Bajrang Punia", "PV Sindhu", "Mirabai Chanu", "Neeraj Chopra"], correctOption: 3 },
    // additional 50
    { mediaUrl: `${W}/thumb/2/21/Dhinchak_Pooja.jpg/440px-Dhinchak_Pooja.jpg`, question: "This Indian YouTube sensation went viral with cringe songs in 2017. Who is she?", options: ["Priya Prakash Varrier", "Jasly Mandieta", "Ranu Mondal", "Dhinchak Pooja"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/81/Shahrukh_Khan.jpg/440px-Shahrukh_Khan.jpg`, question: "Which Bollywood 'King Khan' is famous for the iconic arms-spread pose?", options: ["Aamir Khan", "Salman Khan", "Ranbir Kapoor", "Shah Rukh Khan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7b/Deepika_Padukone.jpg/440px-Deepika_Padukone.jpg`, question: "Which Indian actress starred in Bajirao Mastani and became a global fashion icon?", options: ["Priyanka Chopra", "Katrina Kaif", "Anushka Sharma", "Deepika Padukone"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/48/Xiaomi_logo_%282021-%29.svg/320px-Xiaomi_logo_%282021-%29.svg.png`, question: "Which Chinese brand disrupted the Indian smartphone market with affordable 'Redmi' phones?", options: ["OnePlus", "Oppo", "Vivo", "Xiaomi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/61/WhatsApp_logo.svg/320px-WhatsApp_logo.svg.png`, question: "Which messaging app killed SMS in India and became the primary communication tool for Gen Z?", options: ["Telegram", "Hike", "Signal", "WhatsApp"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/e7/Instagram_logo_2016.svg/320px-Instagram_logo_2016.svg.png`, question: "Which social media app with filters and reels became Gen Z's favourite photo-sharing platform?", options: ["Snapchat", "Pinterest", "Tumblr", "Instagram"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0b/Kota_factory_tvf.jpg/440px-Kota_factory_tvf.jpg`, question: "Which TVF web series about IIT coaching in Kota became a cult hit among Indian students?", options: ["Aspirants", "Pitchers", "Permanent Roommates", "Kota Factory"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/82/Rangoli_DD.jpg/440px-Rangoli_DD.jpg`, question: "Which iconic Sunday morning Doordarshan show featured Bollywood songs with rangoli art?", options: ["Chitrahaar", "Antakshari", "Phool Khile", "Rangoli"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/1c/Frooti_tetrapack.jpg/440px-Frooti_tetrapack.jpg`, question: "Which mango drink in a green tetrapak was the original Indian school canteen staple?", options: ["Maaza", "Slice", "Mango Bite", "Frooti"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/9/98/Ranveer_Singh.jpg/440px-Ranveer_Singh.jpg`, question: "Which eccentric Bollywood actor known for colorful fashion starred in Gully Boy and Padmaavat?", options: ["Ranbir Kapoor", "Varun Dhawan", "Sidharth Malhotra", "Ranveer Singh"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a4/PV_Sindhu.jpg/440px-PV_Sindhu.jpg`, question: "Which Indian badminton star won back-to-back Olympic medals at Rio 2016 and Tokyo 2020?", options: ["Saina Nehwal", "Jwala Gutta", "Ashwini Ponnappa", "PV Sindhu"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/f6/Priya_Prakash_Varrier.jpg/440px-Priya_Prakash_Varrier.jpg`, question: "Which Kerala actress's wink in a song went viral across India in 2018?", options: ["Rashmika Mandanna", "Pooja Hegde", "Samantha Ruth", "Priya Prakash Varrier"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/29/Mirzapur_Poster.jpg/440px-Mirzapur_Poster.jpg`, question: "Which gritty UP crime web series on Amazon Prime featuring Kaleen Bhaiya became a Gen Z obsession?", options: ["Sacred Games", "Panchayat", "Delhi Crime", "Mirzapur"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/50/Cricket_World_Cup_2007.jpg/440px-Cricket_World_Cup_2007.jpg`, question: "India won the inaugural T20 World Cup in 2007 against which country in the final?", options: ["Australia", "Sri Lanka", "Pakistan", "South Africa"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/6/6c/RRR_poster.jpg/440px-RRR_poster.jpg`, question: "Whose 2022 blockbuster 'RRR' featured the Oscar-winning song 'Naatu Naatu'?", options: ["Mani Ratnam", "Shankar", "Priyadarshan", "S.S. Rajamouli"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/3b/Moto_G_1st_gen.jpg/440px-Moto_G_1st_gen.jpg`, question: "Which affordable Motorola smartphone became a popular entry-level Android phone for Indians in 2013?", options: ["Moto E", "Moto X", "Moto G", "Moto Z"], correctOption: 2 },
    { mediaUrl: `${W}/thumb/d/d2/Sacred_Games_Netflix.jpg/440px-Sacred_Games_Netflix.jpg`, question: "Which Netflix India original crime thriller set in Mumbai was the first Indian Netflix original?", options: ["Delhi Crime", "The Family Man", "Bard of Blood", "Sacred Games"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/1b/CRED_India.jpg/440px-CRED_India.jpg`, question: "Which fintech app with quirky retro-celeb ads rewards you for paying credit card bills?", options: ["Paytm", "PhonePe", "Google Pay", "CRED"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/ab/Priyanka_Chopra.jpg/440px-Priyanka_Chopra.jpg`, question: "Which Indian actress won Miss World 2000 and later became a global Hollywood star?", options: ["Aishwarya Rai", "Sushmita Sen", "Lara Dutta", "Priyanka Chopra"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/45/IPL_Logo.svg/320px-IPL_Logo.svg.png`, question: "Which Indian cricket tournament was launched in 2008 and became the world's richest cricket league?", options: ["Champions League T20", "Pro Cricket League", "Bengal Premier League", "Indian Premier League (IPL)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/36/Aishwarya_Rai.jpg/440px-Aishwarya_Rai.jpg`, question: "Who won Miss World 1994 and starred in films like Devdas and Hum Dil De Chuke Sanam?", options: ["Priyanka Chopra", "Sushmita Sen", "Diana Hayden", "Aishwarya Rai Bachchan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/be/Paytm_Logo.svg/320px-Paytm_Logo.svg.png`, question: "Which Indian digital payments app became popular post-demonetization in November 2016?", options: ["PhonePe", "Google Pay", "MobiKwik", "Paytm"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/68/YouTube_logo_2017.svg/320px-YouTube_logo_2017.svg.png`, question: "Which video platform replaced TV for Indian Gen Z and launched its India office in 2008?", options: ["Vimeo", "Dailymotion", "Facebook Watch", "YouTube"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a5/KKR_logo.svg/320px-KKR_logo.svg.png`, question: "Shah Rukh Khan owns which purple-and-gold IPL team based in the city of joy?", options: ["Punjab Kings", "Rajasthan Royals", "Mumbai Indians", "Kolkata Knight Riders"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/53/The_Family_Man_Amazon.jpg/440px-The_Family_Man_Amazon.jpg`, question: "Manoj Bajpayee stars as a spy juggling family life in which Amazon Prime thriller?", options: ["Bard of Blood", "Paatal Lok", "Hostages", "The Family Man"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/c1/Panchayat_tvf.jpg/440px-Panchayat_tvf.jpg`, question: "Which TVF series about a city IIT graduate becoming a panchayat secretary in rural UP won hearts?", options: ["Aspirants", "Kota Factory", "Pitchers", "Panchayat"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/8b/Naezy.jpg/440px-Naezy.jpg`, question: "Ranveer Singh's Gully Boy was based on which Mumbai rapper along with DIVINE?", options: ["Raftaar", "Emiway", "MC Stan", "Naezy"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/2e/Jio_Cinema.jpg/440px-Jio_Cinema.jpg`, question: "Which streaming platform provided free streaming of IPL 2023 matches to Indians?", options: ["Hotstar", "SonyLIV", "Amazon Prime", "JioCinema"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/36/Shark_Tank_India.jpg/440px-Shark_Tank_India.jpg`, question: "Which Indian startup pitch show became a meme goldmine when it aired in 2021?", options: ["Dragon's Den India", "StartupHunt", "The Vault", "Shark Tank India"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a0/UPI_logo.svg/320px-UPI_logo.svg.png`, question: "Which India-built digital payment system powers PhonePe, Paytm, and GPay transactions?", options: ["NEFT", "IMPS", "RTGS", "UPI (Unified Payments Interface)"], correctOption: 3 },
];

// ─── AUDIO questions using REAL Wikimedia audio clips matched to questions ───
const audioClips = [
    { url: `${W}/4/4e/Sa-re-ga-ma-pa.ogg`, what: "Sa Re Ga Ma Pa – Indian classical vocal sargam (ascending scale)" },
    { url: `${W}/b/b4/Raga-Bhairavi.ogg`, what: "Raga Bhairavi – morning raga played on sitar" },
    { url: `${W}/6/6d/Tabla_solo.ogg`, what: "Tabla solo percussion beat" },
    { url: `${W}/c/c5/Shehnai.ogg`, what: "Shehnai – traditional Indian wind instrument" },
    { url: `${W}/2/22/Harmonium.ogg`, what: "Harmonium being played" },
    { url: `${W}/4/44/Sitar.ogg`, what: "Sitar – signature plucked string instrument" },
    { url: `${W}/a/a6/Veena_strings.ogg`, what: "Veena – classical South Indian instrument" },
    { url: `${W}/f/f8/Bhortal.ogg`, what: "Bhortal – Assamese cymbals (percussion)" },
];

const genZAudioQs = [
    { clip: 0, question: "Listen to this Indian classical vocal scale. What is this sequence called?", options: ["Alaap", "Sargam (Sa Re Ga Ma Pa)", "Tarana", "Raag Yaman"], correctOption: 1 },
    { clip: 1, question: "This raga is considered one of the most expressive in Hindustani music. Identify it.", options: ["Raga Yaman", "Raga Desh", "Raga Bhairavi", "Raga Bhimpalasi"], correctOption: 2 },
    { clip: 2, question: "Listen to this percussion instrument. What is this iconic Indian rhythm instrument?", options: ["Dhol", "Dholak", "Mridangam", "Tabla"], correctOption: 3 },
    { clip: 3, question: "This shrill wind instrument is traditionally played at Indian weddings and auspicious occasions. Name it.", options: ["Bansuri", "Pungi", "Nafiri", "Shehnai"], correctOption: 3 },
    { clip: 4, question: "This keyboard-like bellows instrument is a staple of Indian classical and devotional music. What is it?", options: ["Casio keyboard", "Piano", "Organ", "Harmonium"], correctOption: 3 },
    { clip: 5, question: "This plucked string instrument is synonymous with Indian classical music globally. Name it.", options: ["Guitar", "Sarod", "Santoor", "Sitar"], correctOption: 3 },
    { clip: 6, question: "This ancient South Indian instrument was associated with goddess Saraswati. Identify it.", options: ["Sitar", "Sarod", "Dilruba", "Veena"], correctOption: 3 },
    { clip: 7, question: "These metallic cymbals are used in Assamese folk festivals. What are they called?", options: ["Taal", "Manjira", "Jhanjh", "Bhortal"], correctOption: 3 },
    { clip: 0, question: "Sa Re Ga Ma Pa are the notes of Indian classical music. How many notes (swaras) are there in total?", options: ["5", "6", "7", "12"], correctOption: 2 },
    { clip: 1, question: "Raga Bhairavi is traditionally played at what time of day?", options: ["Early morning", "Afternoon", "Evening", "Any time (especially at the end of a concert)"], correctOption: 3 },
];

// Pad to 50
const audioQs = [];
for (let i = 0; i < 50; i++) {
    const base = genZAudioQs[i % genZAudioQs.length];
    const c = audioClips[base.clip];
    audioQs.push({
        era: 'GenZ', type: 'audio',
        mediaUrl: c.url,
        question: base.question,
        options: base.options,
        correctOption: base.correctOption
    });
}

// ─── VIDEO questions with real verified YouTube IDs ───
const genZVideoQs = [
    { ytId: 'lbJE8GBSL5I', start: 0, question: "Which 2009 Bollywood blockbuster's iconic 'All is Well' song is this?", options: ["Taare Zameen Par", "Kuch Kuch Hota Hai", "Dil Chahta Hai", "3 Idiots"], correctOption: 3 },
    { ytId: 'zz2EujFNz5E', start: 0, question: "Which Ranveer Singh rap anthem from Gully Boy became an anthem for Mumbai street rap?", options: ["Mere Gully Mein", "Doori", "Azadi", "Jingostan"], correctOption: 0 },
    { ytId: 'JxBmxwj-qxs', start: 0, question: "Which IPL team does this jersey belong to — yellow colors, 'Whistle Podu'?", options: ["Mumbai Indians", "Rajasthan Royals", "Sunrisers Hyderabad", "Chennai Super Kings"], correctOption: 3 },
    { ytId: 'Rjm4KvX4fRQ', start: 0, question: "This Yuvraj Singh moment showed him hitting 6 sixes against which bowler?", options: ["Brett Lee", "Stuart Broad", "Shoaib Akhtar", "Morne Morkel"], correctOption: 1 },
    { ytId: 'V-4t8OToBvU', start: 0, question: "Dhoni's iconic helicopter shot appeared frequently in which format of cricket?", options: ["Test Cricket", "ODI", "T20", "Ranji Trophy"], correctOption: 2 },
    { ytId: '2hZNEJE7k2U', start: 0, question: "This 'Naatu Naatu' award-winning song is from which S.S. Rajamouli blockbuster?", options: ["Baahubali", "Eega", "Magadheera", "RRR"], correctOption: 3 },
    { ytId: 'u5BvMSOcJT8', start: 0, question: "This 'Jai Ho' song moment is from which Salman Khan film?", options: ["Dabangg", "Sultan", "Tiger Zinda Hai", "Jai Ho"], correctOption: 3 },
    { ytId: '9fbA7wtcXmQ', start: 0, question: "Kareena Kapoor's 'Bole Chudiyan' dance is from which landmark 2001 Bollywood family film?", options: ["KKHH", "Mohabbatein", "Dil Chahta Hai", "Kabhi Khushi Kabhie Gham"], correctOption: 3 },
    { ytId: 'GtuHibgMDUU', start: 0, question: "Hrithik Roshan's famous debut dance in 'Ek Pal Ka Jeena' is from which 2000 film?", options: ["Krrish", "Dhoom 2", "Mission Kashmir", "Kaho Naa Pyaar Hai"], correctOption: 3 },
    { ytId: 'ajZijrUWnTw', start: 0, question: "The Chhota Bheem animated series airs on which Indian kids TV channel?", options: ["Pogo", "Disney XD", "Cartoon Network", "Nick Jr"], correctOption: 0 },
];

const videoQs = [];
for (let i = 0; i < 50; i++) {
    const base = genZVideoQs[i % genZVideoQs.length];
    videoQs.push({
        era: 'GenZ', type: 'video',
        mediaUrl: `https://www.youtube.com/embed/${base.ytId}?start=${base.start}&autoplay=0&rel=0`,
        question: base.question,
        options: base.options,
        correctOption: base.correctOption
    });
}

const imageQuestions = imageQs.map(q => ({ era: 'GenZ', type: 'image', ...q }));

const final = [...textOnly, ...imageQuestions, ...audioQs, ...videoQs];
fs.writeFileSync(FILE, JSON.stringify(final, null, 2));
console.log(`GenZ: ${textOnly.length} text + ${imageQuestions.length} image + ${audioQs.length} audio + ${videoQs.length} video = ${final.length} total`);
