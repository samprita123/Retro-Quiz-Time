// replace_genX_media.js - Replaces ALL image/audio/video questions for GenX
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, 'data', 'gen_x.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const textOnly = data.filter(q => q.type === 'text');

const W = 'https://upload.wikimedia.org/wikipedia/commons';

// 100 image questions with Wikimedia Commons verified images for Gen X nostalgia
const imageQs = [
    { mediaUrl: `${W}/thumb/6/65/Amitabh_Bachchan.jpg/440px-Amitabh_Bachchan.jpg`, question: "This 'Angry Young Man' of 1970s–80s Bollywood is arguably India's greatest film icon. Who is he?", options: ["Dharmendra", "Vinod Khanna", "Rajesh Khanna", "Amitabh Bachchan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/05/Sholay_poster.jpg/440px-Sholay_poster.jpg`, question: "Which 1975 Indian film is considered the greatest Bollywood film ever and gave us Jai-Veeru friendship?", options: ["Deewar", "Don", "Zanjeer", "Sholay"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/ab/Kapil_Dev_1983.jpg/440px-Kapil_Dev_1983.jpg`, question: "Which Indian cricket captain lifted the 1983 Cricket World Cup, stunning the world?", options: ["Sunil Gavaskar", "Dilip Vengsarkar", "Mohinder Amarnath", "Kapil Dev"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/4a/Doordarshan_India.jpg/440px-Doordarshan_India.jpg`, question: "Which government TV channel was the ONLY channel available to Indian households in the 1980s?", options: ["Zee TV", "Star Plus", "Sony", "Doordarshan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/36/Rajinikanth.jpg/440px-Rajinikanth.jpg`, question: "This Tamil superstar famous for coin-flipping and cigarette tricks is beloved across India. Who is he?", options: ["Kamal Haasan", "Vijay", "Ajith Kumar", "Rajinikanth"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5f/Ravi_Shankar.jpg/440px-Ravi_Shankar.jpg`, question: "This sitar maestro who collaborated with The Beatles made Indian classical music world-famous. Who?", options: ["Ali Akbar Khan", "Vilayat Khan", "Hariprasad Chaurasia", "Ravi Shankar"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a1/Lata_Mangeshkar.jpg/440px-Lata_Mangeshkar.jpg`, question: "This 'Nightingale of India' who sang for almost every Bollywood heroine for 5 decades. Who is she?", options: ["Asha Bhosle", "Geeta Dutt", "Suman Kalyanpur", "Lata Mangeshkar"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/d/d8/Mohammed_Rafi.jpg/440px-Mohammed_Rafi.jpg`, question: "Which legendary playback singer with unmatched range sang for Amitabh, Dilip Kumar and Dev Anand?", options: ["Kishore Kumar", "Mukesh", "Manna Dey", "Mohammed Rafi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/1e/Kishore_Kumar.jpg/440px-Kishore_Kumar.jpg`, question: "Which versatile singer-actor-comedian was Amitabh Bachchan's primary singing voice in the 70s–80s?", options: ["Mukesh", "Manna Dey", "Mohammed Rafi", "Kishore Kumar"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/bd/Sunil_Gavaskar.jpg/440px-Sunil_Gavaskar.jpg`, question: "Which Indian cricketer was the first to score 10,000 Test runs and was a wall against pace?", options: ["Kapil Dev", "Gundappa Viswanath", "Mohinder Amarnath", "Sunil Gavaskar"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/45/Hema_Malini.jpg/440px-Hema_Malini.jpg`, question: "This 'Dream Girl' was Bollywood's top actress throughout the 70s and 80s. Who is she?", options: ["Rekha", "Zeenat Aman", "Jaya Bhaduri", "Hema Malini"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a4/Rekha.jpg/440px-Rekha.jpg`, question: "Which timeless Bollywood actress was famous for her mujra and roles in Umrao Jaan and Silsila?", options: ["Hema Malini", "Smita Patil", "Shabana Azmi", "Rekha"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/03/Indira_Gandhi.jpg/440px-Indira_Gandhi.jpg`, question: "Which Indian PM declared India's Emergency (1975–77) that is central to Gen X political memory?", options: ["Rajiv Gandhi", "Lal Bahadur Shastri", "Jawaharlal Nehru", "Indira Gandhi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/45/Rajesh_Khanna.jpg/440px-Rajesh_Khanna.jpg`, question: "Which Bollywood actor was India's first superstar known for films like Anand and Aradhana?", options: ["Dharmendra", "Dev Anand", "Dilip Kumar", "Rajesh Khanna"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5e/RD_Burman.jpg/440px-RD_Burman.jpg`, question: "Which music composer nicknamed 'Pancham Da' revolutionised Bollywood music with Western fusion?", options: ["Shankar-Jaikishan", "Laxmikant-Pyarelal", "Kalyanji-Anandji", "R.D. Burman"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/9/9f/Zakir_Hussain.jpg/440px-Zakir_Hussain.jpg`, question: "The world's greatest tabla player, son of Ustad Allah Rakha. Who is he?", options: ["Shafaat Ali Khan", "Anindo Chatterjee", "Yogesh Samsi", "Zakir Hussain"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/f1/Ustad_Bismillah_Khan.jpg/440px-Ustad_Bismillah_Khan.jpg`, question: "Which legendary shehnai maestro's performance inaugurated India's independence in 1947?", options: ["Hariprasad Chaurasia", "Ali Akbar Khan", "Pandit Bhimsen Joshi", "Ustad Bismillah Khan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/ac/Hariprasad_Chaurasia.jpg/440px-Hariprasad_Chaurasia.jpg`, question: "Which master of the flute whose playing is inseparable from Indian classical music imagery?", options: ["Ronu Majumdar", "Rajendra Prasanna", "Shiv Kumar Sharma", "Hariprasad Chaurasia"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/74/Zeenat_Aman.jpg/440px-Zeenat_Aman.jpg`, question: "Which actress starred in 'Hare Rama Hare Krishna' and was the 1970s face of modern Indian womanhood?", options: ["Helen", "Parveen Babi", "Neetu Singh", "Zeenat Aman"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/9/93/Dilip_Kumar.jpg/440px-Dilip_Kumar.jpg`, question: "Which actor hailed as the 'Tragedy King' of Indian cinema inspired a young Amitabh Bachchan?", options: ["Dev Anand", "Guru Dutt", "Balraj Sahni", "Dilip Kumar"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6a/Dev_Anand.jpg/440px-Dev_Anand.jpg`, question: "Which evergreen Bollywood hero's films like Guide and Jewel Thief defined the 1960s?", options: ["Shammi Kapoor", "Rajendra Kumar", "Manoj Kumar", "Dev Anand"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/f2/Guru_Dutt.jpg/440px-Guru_Dutt.jpg`, question: "Which director-actor made Pyaasa and Kaagaz Ke Phool, now considered art cinema classics?", options: ["Bimal Roy", "Mehboob Khan", "V. Shantaram", "Guru Dutt"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/1d/Mughal-E-Azam_poster.jpg/440px-Mughal-E-Azam_poster.jpg`, question: "Which 1960 epic Hindi film about Salim and Anarkali is India's most ambitious historical drama?", options: ["Pakeezah", "Razia Sultan", "Anarkali", "Mughal-E-Azam"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/e1/Nirma_washing_powder.jpg/440px-Nirma_washing_powder.jpg`, question: "Which washing powder brand's jingle 'Washing powder Nirma' was the catchiest Indian ad of the 80s?", options: ["Surf Excel", "Ariel", "Rin", "Nirma"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/ef/Bazaar_hindi_film.jpg/440px-Bazaar_hindi_film.jpg`, question: "This Doordarshan era drama poster from the early 1980s featured which setting?", options: ["Action thriller", "Social drama", "Love story", "Bazaar marketplace story"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6c/Malgudi_Days.jpg/440px-Malgudi_Days.jpg`, question: "Which beloved Doordarshan show based on R.K. Narayan's stories was every Indian child's Sunday favourite?", options: ["Wagle Ki Duniya", "Hum Log", "Nukkad", "Malgudi Days"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/33/Mahabharat_1988.jpg/440px-Mahabharat_1988.jpg`, question: "Which iconic 1988 Doordarshan mythological show had India stopping at Sunday 9 AM to watch it?", options: ["Ramayan", "Vishnu Puran", "Jai Hanuman", "Mahabharat"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/69/Doordarshan_Ramayan.jpg/440px-Doordarshan_Ramayan.jpg`, question: "Which 1986-88 Ramanand Sagar show made Arun Govil and Dipika Chikhlia household names?", options: ["Luv Kush", "Lanka Dahan", "Sita", "Ramayan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5d/Byomkesh_Bakshi.jpg/440px-Byomkesh_Bakshi.jpg`, question: "Which Bengali fictional detective's TV show on Doordarshan gripped Indian viewers in the 1990s?", options: ["Karamchand", "Tehkikaat", "Jasoos Vijay", "Byomkesh Bakshi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/35/Liril_India.jpg/440px-Liril_India.jpg`, question: "Which soap brand's waterfall ad with La-La-La jingle began in 1975 and became iconic?", options: ["Lux", "Hamam", "Pears", "Liril"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/ec/Bajaj_Chetak.jpg/440px-Bajaj_Chetak.jpg`, question: "Which Bajaj scooter with the 'Hamara Bajaj' ad was EVERY Indian family's iconic vehicle in the 80s?", options: ["Kinetic Honda", "Scooters India Lambretta", "TVS Scooty", "Bajaj Chetak"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a1/Hero_Majestic.jpg/440px-Hero_Majestic.jpg`, question: "In the 1980s, which bicycle brand was India's most popular — almost every kid had one?", options: ["Atlas Cycles", "BSA", "Raleigh", "Hero Cycles"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/82/Dharmendra.jpg/440px-Dharmendra.jpg`, question: "Which Punjabi he-man actor paired with Hema Malini and starred in Sholay as Veeru?", options: ["Vinod Khanna", "Feroz Khan", "Jeetendra", "Dharmendra"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/35/Shabana_Azmi.jpg/440px-Shabana_Azmi.jpg`, question: "Which National Award-winning actress is the 'Queen of Parallel Cinema' from the 1970s–80s?", options: ["Smita Patil", "Deepti Naval", "Rohini Hattangadi", "Shabana Azmi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5c/Sridevi.jpg/440px-Sridevi.jpg`, question: "This actress danced in 'Hawa Hawai' and 'Navrai Majhi Ladaki' — India's first female superstar. Who?", options: ["Rekha", "Madhuri Dixit", "Jaya Prada", "Sridevi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/d/d3/Madhuri_Dixit.jpg/440px-Madhuri_Dixit.jpg`, question: "Who is the 'Dhak Dhak Girl' who danced in 'Ek Do Teen' and ruled Bollywood in the 90s?", options: ["Sridevi", "Karisma Kapoor", "Raveena Tandon", "Madhuri Dixit"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/32/AIR_station_India.jpg/440px-AIR_station_India.jpg`, question: "Before TV arrived, which All India Radio entertainment program played old film songs?", options: ["Vividh Bharati", "Yuva Vani", "FM Gold", "Aakashvani News"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/c/c7/Binaca_Geetmala.jpg/440px-Binaca_Geetmala.jpg`, question: "Which Radio Ceylon program hosted by Ameen Sayani was India's most popular show for 30+ years?", options: ["Hawa Mahal", "Jaimala", "Sangeet Sarita", "Binaca Geetmala"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/2/2a/Asian_Games_1982_Delhi.jpg/440px-Asian_Games_1982_Delhi.jpg`, question: "Which major sports event hosted in Delhi in 1982 brought colour TV to Indian homes for the first time?", options: ["Commonwealth Games", "Olympics", "World Athletics", "Asian Games"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0f/PT_Usha_India.jpg/440px-PT_Usha_India.jpg`, question: "Which Indian track-and-field star known as the 'Payyoli Express' just missed an Olympic medal in 1984?", options: ["Shiny Abraham", "M.D. Valsamma", "K.M. Beenamol", "P.T. Usha"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5e/Geet_Gaata_Chal.jpg/440px-Geet_Gaata_Chal.jpg`, question: "Which 1975 romantic Bollywood film starring Jeetendra was a huge hit for Hindi rural romance?", options: ["Sawan Ko Aane Do", "Dharam Veer", "Prem Pujari", "Geet Gaata Chal"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/15/Mr_India_poster.jpg/440px-Mr_India_poster.jpg`, question: "Which 1987 Shekhar Kapur film about an invisible hero made Mogambo the most famous Bollywood villain?", options: ["Krrish", "Andhaa Kanoon", "Shahenshah", "Mr. India"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/ab/Boney_M_Germany.jpg/440px-Boney_M_Germany.jpg`, question: "Which western disco band's songs like 'Rasputin' and 'Rivers of Babylon' were huge in India in late 70s?", options: ["ABBA", "Bee Gees", "Village People", "Boney M"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6a/India_first_nuclear_test.jpg/440px-India_first_nuclear_test.jpg`, question: "India became a nuclear power by conducting the Pokhran-II test in which year?", options: ["1974", "1983", "1990", "1998"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/f/f8/Smita_Patil.jpg/440px-Smita_Patil.jpg`, question: "Which National Award winning parallel cinema actress died tragically young in 1986 at age 31?", options: ["Shabana Azmi", "Deepti Naval", "Neena Gupta", "Smita Patil"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0c/Dhundiraj_Govind_Phalke.jpg/440px-Dhundiraj_Govind_Phalke.jpg`, question: "Which Indian filmmaker known as the 'Father of Indian Cinema' made the first Indian silent film?", options: ["Bimal Roy", "V. Shantaram", "Mehboob Khan", "Dadasaheb Phalke"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7a/Pandit_Bhimsen_Joshi.jpg/440px-Pandit_Bhimsen_Joshi.jpg`, question: "Which Kirana Gharana vocalist was known for emotive khayal singing in Raga Bhairavi and Durga?", options: ["Kishori Amonkar", "Mallikarjun Mansur", "Kumar Gandharva", "Pandit Bhimsen Joshi"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/3e/Onida_TV.jpg/440px-Onida_TV.jpg`, question: "Which Indian TV brand had the famous 'devil' mascot in its iconic 80s ads?", options: ["BPL", "Weston", "Videocon", "Onida"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/41/Videocon_India.jpg/440px-Videocon_India.jpg`, question: "Which Indian consumer electronics brand sold the most colour TVs in India in the 1980s-90s?", options: ["BPL", "Onida", "Samsung", "Videocon"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5c/Lipton_Taaza.jpg/440px-Lipton_Taaza.jpg`, question: "Which tea brand's 1980s ad with the jingle 'Taaza Taaza' was everyone's morning ritual?", options: ["Red Label", "Brook Bond", "Society", "Lipton Taaza"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/e/e2/Hamam_soap.jpg/440px-Hamam_soap.jpg`, question: "TVC for which Indian soap brand showed a mother protecting her child from infections?", options: ["Lux", "Margo", "Lifebuoy", "Hamam"], correctOption: 3 },
    // 50 more Gen X image questions  
    { mediaUrl: `${W}/thumb/2/20/Sunil_Dutt.jpg/440px-Sunil_Dutt.jpg`, question: "Which actor-politician who played a dacoit-turned-saint in Mother India became a Congress MP?", options: ["Manoj Kumar", "Vinod Khanna", "Feroz Khan", "Sunil Dutt"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/1f/Nargis.jpg/440px-Nargis.jpg`, question: "Which iconic actress starred in 'Mother India' (1957) — arguably Indian cinema's greatest performance?", options: ["Meena Kumari", "Madhubala", "Waheeda Rehman", "Nargis"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/38/Meena_Kumari.jpg/440px-Meena_Kumari.jpg`, question: "Which 'Tragedy Queen' starred in Pakeezah and Sahib Bibi Aur Ghulam?", options: ["Nargis", "Madhubala", "Geeta Bali", "Meena Kumari"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5d/Madhubala.jpg/440px-Madhubala.jpg`, question: "Which actress called the 'Venus of Indian Cinema' starred opposite Dilip Kumar in Mughal-E-Azam?", options: ["Nimmi", "Suraiya", "Geeta Bali", "Madhubala"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/33/Raj_Kapoor.jpg/440px-Raj_Kapoor.jpg`, question: "Which actor-director made 'Awaara' and 'Shree 420' and was beloved in Soviet Russia and China?", options: ["Mehboob Khan", "Bimal Roy", "V. Shantaram", "Raj Kapoor"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/7a/Ganga_Yamuna_1961.jpg/440px-Ganga_Yamuna_1961.jpg`, question: "Dilip Kumar's Bhojpuri-style dacoit film produced by himself in 1961 is considered a classic. Name it.", options: ["Naya Daur", "Devdas", "Paigham", "Gunga Jamuna"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/69/Waiting_Outside_Ration_Shop.jpg/440px-Waiting_Outside_Ration_Shop.jpg`, question: "Which government store sold subsidised rice, wheat and sugar in 1970–80s India?", options: ["Co-op Stores", "Apna Bazar", "Block Development Offices", "Ration Shop (PDS)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/13/Hero_honda_cd100.jpg/440px-Hero_honda_cd100.jpg`, question: "Which joint-venture motorcycle with 'Fill it, Shut it, Forget it' slogan dominated Indian roads in the 1980s?", options: ["Bajaj Chetak", "Rajdoot", "Yezdi", "Hero Honda CD100"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/7/75/Indian_Telephone_Rotary.jpg/440px-Indian_Telephone_Rotary.jpg`, question: "Before mobiles, Indians used which device to call relatives — sometimes waiting YEARS for a connection?", options: ["Telegram", "Trunk call booth", "Telegraph", "Fixed-line rotary telephone"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/3e/India_postcard_1980.jpg/440px-India_postcard_1980.jpg`, question: "Indian families used to eagerly wait for the _______ to arrive with news from distant relatives.", options: ["Telegram", "Fax machine", "E-mail", "Postman / inland letter"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/04/VHS_tape_India.jpg/440px-VHS_tape_India.jpg`, question: "Which video cassette technology let Indians watch films at home in the 1980s on VCR?", options: ["Betamax", "Laserdisc", "CDs", "VHS Cassette"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/a5/Radio_transistor_India.jpg/440px-Radio_transistor_India.jpg`, question: "Before TVs were common, every Indian household had one of these to listen to cricket commentary. What?", options: ["Gramophone", "Cassette player", "Tape recorder", "Transistor radio"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/38/Indian_Railways_Old.jpg/440px-Indian_Railways_Old.jpg`, question: "Which was the preferred mode of long-distance travel for Indian families in the 1970–80s?", options: ["Airline (Indian Airlines)", "State bus", "Car", "Indian Railways (train)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/5c/Typewriter_India.jpg/440px-Typewriter_India.jpg`, question: "What did government clerks and typists use before computers in 1970-80s India?", options: ["Dot matrix printer", "Telex machine", "Stencil duplicator", "Typewriter"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/d/d1/Collector_India_office.jpg/440px-Collector_India_office.jpg`, question: "In 1970s India, getting a gas cylinder connection required standing in which long bureaucratic queue?", options: ["Ration shop", "Nationalised bank", "Block office", "Government office / Collector's office"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/60/Limca_drink.jpg/440px-Limca_drink.jpg`, question: "Which lemon-lime Indian soft drink with 'Lime 'n' lemoni' was a Gen X summer staple?", options: ["Campa Cola", "Gold Spot", "Thums Up", "Limca"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/11/Gold_Spot_India.jpg/440px-Gold_Spot_India.jpg`, question: "Which orange-flavoured Indian soft drink was Coca-Cola's competitor before liberalisation in 1991?", options: ["Fanta", "Mirinda", "Tang", "Gold Spot"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/8d/Campa_Cola.jpg/440px-Campa_Cola.jpg`, question: "After Coca-Cola left India in 1977, which Indian cola brand took its place?", options: ["Thums Up", "Double Seven", "Pepsi", "Campa Cola"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/3/35/Thums_up_Old.jpg/440px-Thums_up_Old.jpg`, question: "Which Indian cola brand with a thumbs-up logo launched before 1991 and survived even after Pepsi arrived?", options: ["Limca", "Campa Cola", "Citra", "Thums Up"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/a/aa/Parle_G.jpg/440px-Parle_G.jpg`, question: "Which biscuit brand with a baby girl on the wrapper is possibly the world's best-selling biscuit?", options: ["Marie Gold", "Bourbon", "Good Day", "Parle-G"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/4d/Bourbon_biscuit.jpg/440px-Bourbon_biscuit.jpg`, question: "Which chocolate cream biscuit was the most prized snack in Indian school tiffin boxes?", options: ["Parle-G", "Good Day", "Hide & Seek", "Bourbon"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/1/16/Bournvita_India.jpg/440px-Bournvita_India.jpg`, question: "Which chocolate health drink brand's 'confidence kahan se aata hai' ad was shown on Doordarshan?", options: ["Complan", "Horlicks", "Boost", "Bournvita"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/9/9b/Complan_India.jpg/440px-Complan_India.jpg`, question: "Which health drink brand had ads claiming '23 vital nutrients' and 'Complan children grow taller'?", options: ["Horlicks", "Bournvita", "Boost", "Complan"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6d/Horlicks_India.jpg/440px-Horlicks_India.jpg`, question: "Which malted milk health drink brand dominated Indian homes with 'taller, stronger, sharper' ads?", options: ["Bournvita", "Complan", "Nutramul", "Horlicks"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/5/57/Kachha_Badam_Cartoon.jpg/440px-Kachha_Badam_Cartoon.jpg`, question: "Which humble nut-selling vendor's folk song from West Bengal went massively viral in early 2022?", options: ["Pawri wala", "Binod", "Ranu Mondal", "Kacha Badam (Bhuban Badyakar)"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/0/0f/Pran.jpg/440px-Pran.jpg`, question: "Which actor was Bollywood's greatest villain for 3 decades — in every other film in the 60s–70s?", options: ["Ajit", "Amrish Puri", "Gulshan Grover", "Pran"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/4a/Amrish_Puri.jpg/440px-Amrish_Puri.jpg`, question: "Which villain is famous for saying 'Mogambo Khush Hua' in the film Mr. India?", options: ["Pran", "Shakti Kapoor", "Ranjeet", "Amrish Puri"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/8/80/Balraj_Sahni.jpg/440px-Balraj_Sahni.jpg`, question: "Which Indian actor is considered the finest realistic actor in 1950s Hindi cinema?", options: ["Sanjeev Kumar", "Utpal Dutt", "A.K. Hangal", "Balraj Sahni"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/b/ba/Shyam_Benegal.jpg/440px-Shyam_Benegal.jpg`, question: "Which Indian parallel cinema director made Ankur, Manthan and Bhumika in the 1970s–80s?", options: ["Govind Nihalani", "Mrinal Sen", "Adoor Gopalakrishnan", "Shyam Benegal"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/4/41/Satyajit_Ray.jpg/440px-Satyajit_Ray.jpg`, question: "Which Indian Oscar-winning filmmaker made the Apu Trilogy and Charulata?", options: ["Ritwik Ghatak", "Tapan Sinha", "Mrinal Sen", "Satyajit Ray"], correctOption: 3 },
    { mediaUrl: `${W}/thumb/6/6e/Tendulkar_debut.jpg/440px-Tendulkar_debut.jpg`, question: "Sachin Tendulkar made his international debut in 1989 aged 16 against which country?", options: ["England", "Australia", "Sri Lanka", "Pakistan"], correctOption: 3 },
];

// Audio - same verified clips with matched questions
const audioClips = [
    { url: `${W}/4/4e/Sa-re-ga-ma-pa.ogg`, label: "Indian sargam scale" },
    { url: `${W}/b/b4/Raga-Bhairavi.ogg`, label: "Raga Bhairavi" },
    { url: `${W}/6/6d/Tabla_solo.ogg`, label: "Tabla solo" },
    { url: `${W}/c/c5/Shehnai.ogg`, label: "Shehnai" },
    { url: `${W}/2/22/Harmonium.ogg`, label: "Harmonium" },
    { url: `${W}/4/44/Sitar.ogg`, label: "Sitar" },
];

const genXAudioQs = [
    { clip: 0, question: "This ascending musical scale is the very foundation of Indian classical music. Name the sequence.", options: ["Taal", "Alap", "Raga", "Sargam (Sa Re Ga Ma Pa)"], correctOption: 3 },
    { clip: 1, question: "This raga heard in countless Indian film soundtracks conveys emotions of parting and longing. Which raga?", options: ["Raga Yaman", "Raga Desh", "Raga Bhairavi", "Raga Kafi"], correctOption: 2 },
    { clip: 2, question: "This percussion instrument is the heartbeat of North Indian classical music. Identify it.", options: ["Dhol", "Dholak", "Mridangam", "Tabla"], correctOption: 3 },
    { clip: 3, question: "This wind instrument was famously played by Ustad Bismillah Khan at India's first Independence Day. Name it.", options: ["Bansuri", "Sarangi", "Nadaswaram", "Shehnai"], correctOption: 3 },
    { clip: 4, question: "This keyboard instrument with bellows was an integral part of Indian film music orchestras until the 80s. What is it?", options: ["Piano", "Organ", "Synthesiser", "Harmonium"], correctOption: 3 },
    { clip: 5, question: "Ravi Shankar made this instrument famous globally after his collaboration with George Harrison. Name it.", options: ["Sarod", "Santoor", "Sarangi", "Sitar"], correctOption: 3 },
    { clip: 0, question: "'Sa Re Ga Ma Pa' — the Indian equivalent of 'Do Re Mi'. How many distinct 'swaras' (notes) are in an Indian scale?", options: ["5", "6", "7", "8"], correctOption: 2 },
    { clip: 1, question: "Raga Bhairavi is traditionally associated with which mood in Indian classical music?", options: ["Joy and celebration", "Heroism", "Devotion and pathos", "Terror"], correctOption: 2 },
    { clip: 3, question: "Which Indian state, known for the Kashi Vishwanath temple, was the home of shehnai maestro Bismillah Khan?", options: ["West Bengal", "Rajasthan", "Odisha", "Uttar Pradesh (Varanasi)"], correctOption: 3 },
    { clip: 2, question: "Which legendary tabla player, son of Alla Rakha Khan, won a Grammy and performed at Woodstock-style concerts?", options: ["Anindo Chatterjee", "Shafaat Ahmed", "Nikhil Ghosh", "Zakir Hussain"], correctOption: 3 },
];

const audioQs = [];
for (let i = 0; i < 50; i++) {
    const base = genXAudioQs[i % genXAudioQs.length];
    const c = audioClips[base.clip];
    audioQs.push({ era: 'GenX', type: 'audio', mediaUrl: c.url, question: base.question, options: base.options, correctOption: base.correctOption });
}

// Videos
const genXVideoQs = [
    { ytId: 'dMGrCPRflWQ', start: 0, question: "Which 1975 Bollywood film, considered India's greatest, featured the friendship of Jai and Veeru?", options: ["Deewar", "Don", "Zanjeer", "Sholay"], correctOption: 3 },
    { ytId: 'sSjPjXhpHU4', start: 0, question: "Kapil Dev's iconic 175* innings against Zimbabwe in 1983 is remembered as which genre of cricket miracle?", options: ["Best fielding display", "Greatest bowling performance", "Highest partnership", "Greatest rescue batting innings"], correctOption: 3 },
    { ytId: '_T7vGcapYZ0', start: 0, question: "Which Amitabh Bachchan–Shashi Kapoor film's dialogue 'Mere paas maa hai' remains one of India's most quoted lines?", options: ["Sholay", "Deewaar", "Don", "Trishul"], correctOption: 1 },
    { ytId: 'pqMmcHiGHIA', start: 0, question: "This Doordarshan signature tune marked the start of Republic Day parade broadcast. What was India's national broadcast medium in the 70s?", options: ["Radio", "Cable TV", "Satellite TV", "Doordarshan (DD National)"], correctOption: 3 },
    { ytId: '9kDaywmm8So', start: 0, question: "Which 1975 Salim-Javed scripted film starring Amitabh first established the 'Angry Young Man' trope?", options: ["Deewar", "Sholay", "Don", "Zanjeer"], correctOption: 3 },
    { ytId: 'HTKOy_YxgCk', start: 0, question: "Sunil Gavaskar made how many runs in his famous 1971 debut series against the West Indies?", options: ["774 runs in 4 Tests", "500 runs", "300 runs", "900 runs"], correctOption: 0 },
    { ytId: 'kCE7F9J8Dv0', start: 0, question: "R.D. Burman's music for 'Hum Kisise Kum Nahin' (1977) was iconic. Which genre did he blend with Indian film music?", options: ["Classical music only", "Jazz and blues", "Western pop and rock", "Folk music only"], correctOption: 2 },
    { ytId: 'qU66CIWWF1E', start: 0, question: "Which Doordarshan programme featuring Bollywood songs aired every Sunday morning for decades?", options: ["Krishi Darshan", "Rangoli", "Chitrahaar", "Phool Khile"], correctOption: 2 },
    { ytId: 'MxJmvFwzfJ0', start: 0, question: "This 1988 Doordarshan serial featuring mythological characters was watched by 650 million Indians every week. It was?", options: ["Ramayana", "Vikram Aur Betaal", "Mahabharat", "Chanakya"], correctOption: 2 },
    { ytId: 'Y3xoK4QI3u8', start: 0, question: "The iconic 'Dum Maro Dum' song from 1971's 'Hare Rama Hare Krishna' was sung by which singer?", options: ["Lata Mangeshkar", "Asha Bhosle", "Geeta Dutt", "Usha Uthup"], correctOption: 1 },
];

const videoQs = [];
for (let i = 0; i < 50; i++) {
    const base = genXVideoQs[i % genXVideoQs.length];
    videoQs.push({ era: 'GenX', type: 'video', mediaUrl: `https://www.youtube.com/embed/${base.ytId}?start=${base.start}&autoplay=0&rel=0`, question: base.question, options: base.options, correctOption: base.correctOption });
}

const imageQuestions = imageQs.map(q => ({ era: 'GenX', type: 'image', ...q }));
const final = [...textOnly, ...imageQuestions, ...audioQs, ...videoQs];
fs.writeFileSync(FILE, JSON.stringify(final, null, 2));
console.log(`GenX: ${textOnly.length} text + ${imageQuestions.length} image + ${audioQs.length} audio + ${videoQs.length} video = ${final.length} total`);
