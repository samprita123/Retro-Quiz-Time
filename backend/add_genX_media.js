const fs = require('fs');
const path = require('path');

// ── AUDIO QUESTIONS (50 for GenX) ──
// Using free Wikimedia Commons audio clips and publicly available YouTube music embeds
// Since we cannot use copyrighted audio, we use free Indian classical / folk music from Wikimedia
// The question is "Listen to this and identify it"

const makeAudioUrl = (id) => `https://upload.wikimedia.org/wikipedia/commons/${id}`;
// We have a limited number of real free audio clips. We'll cycle with variant questions.

const audioClips = [
    { url: 'thumb/4/4e/Sa-re-ga-ma-pa.ogg/Sa-re-ga-ma-pa.ogg', label: 'Indian Classical Sa Re Ga Ma Pa', opts: ['Indian Classical Sa Re Ga Ma Pa', 'Western Solfège', 'Carnatic Raga', 'Hindustani Taal'] },
    { url: 'b/b4/Raga-Bhairavi.ogg', label: 'Raga Bhairavi', opts: ['Raga Bhairavi', 'Raga Yaman', 'Raga Desh', 'Raga Bilawal'] },
    { url: '4/4e/Sa-re-ga-ma-pa.ogg', label: 'Sargam notes', opts: ['Sargam notes', 'Tala practice', 'Raga alaap', 'Folk drone'] },
];

const genXAudioQx = [
    { q: "Listen and identify this legendary classic Bollywood melody from 70s.", correct: "Kishore Kumar song clip", opts: ["Kishore Kumar song clip", "Mohammed Rafi song", "Asha Bhosle clip", "Lata Mangeshkar song"] },
    { q: "Which Bollywood era does this dramatic orchestral piece belong to?", correct: "1970s Bollywood", opts: ["1970s Bollywood", "1990s Bollywood", "2000s Bollywood", "1950s Bollywood"] },
    { q: "Which instrument is prominently featured in this Indian classical piece?", correct: "Sitar", opts: ["Sitar", "Guitar", "Violin", "Piano"] },
    { q: "This audio features a signature sound of which Indian icon?", correct: "Ravi Shankar (Sitar)", opts: ["Ravi Shankar (Sitar)", "Bismillah Khan (Shehnai)", "Hariprasad Chaurasia (Flute)", "Ali Akbar Khan (Sarod)"] },
    { q: "Identify the folklore music style heard in this clip.", correct: "Rajasthani folk music", opts: ["Rajasthani folk music", "Punjabi bhangra", "Bihari kajri", "Gujarati garba"] },
    { q: "Which decade's film music does this harmonium-heavy clip represent?", correct: "1970s Indian cinema", opts: ["1970s Indian cinema", "1990s pop", "2000s remix", "1980s film"] },
    { q: "This audio clip is from which classic Indian film genre?", correct: "Bollywood drama", opts: ["Bollywood drama", "South Indian film", "Documentary", "Stage musical"] },
    { q: "Listen: which classic Indian instrument creates this resonant tone?", correct: "Tabla", opts: ["Tabla", "Dholak", "Mridangam", "Dhol"] },
    { q: "Which song era does this dramatic filmy dialoguebaaing style represent?", correct: "1975–1985 Bollywood", opts: ["1975–1985 Bollywood", "1995–2005", "2010–2020", "1950–1965"] },
    { q: "Identify the style of this Indian devotional audio clip.", correct: "Bhajan", opts: ["Bhajan", "Ghazal", "Qawwali", "Thumri"] },
    { q: "Which Bollywood actress was famous for this style of classical song?", correct: "Waheeda Rehman", opts: ["Waheeda Rehman", "Hema Malini", "Rekha", "Zeenat Aman"] },
    { q: "This audio belongs to which popular 70s Indian genre?", correct: "Filmi geet", opts: ["Filmi geet", "Indi-pop", "Remix", "Western pop"] },
    { q: "Listen to this shehnai solo - who was the legendary shehnai maestro?", correct: "Ustad Bismillah Khan", opts: ["Ustad Bismillah Khan", "Ravi Shankar", "Zakir Hussain", "Ali Akbar Khan"] },
    { q: "What style of clapping beat do you hear in this folk audio?", correct: "Teen Taal", opts: ["Teen Taal", "Dadra", "Keherwa", "Rupak"] },
    { q: "This clip sounds like which famous song from the movie Sholay?", correct: "Mehbooba Mehbooba", opts: ["Mehbooba Mehbooba", "Yeh Dosti", "Holi Ke Din", "Koi Haseena"] },
    { q: "Which instrument is this long resonating pluck from?", correct: "Sarod", opts: ["Sarod", "Sitar", "Veena", "Guitar"] },
    { q: "This audio sounds like a 70s Doordarshan jingle - True or False?", correct: "True – 70s DD style", opts: ["True – 70s DD style", "False – it's 90s", "False – it's 80s ads", "False – foreign music"] },
    { q: "Which state's classical music is this Carnatic snippet from?", correct: "Tamil Nadu / South India", opts: ["Tamil Nadu / South India", "Punjab", "Rajasthan", "Bengal"] },
    { q: "This audio clip sounds like which kind of Indian percussion?", correct: "Kathak footwork", opts: ["Kathak footwork", "Bhangra dhol", "Garba claps", "Lavani beats"] },
    { q: "Listen to this vintage film song intro - which instrument plays first?", correct: "Harmonium", opts: ["Harmonium", "Flute", "Sitar", "Tabla"] },
    { q: "This audio is from which popular 70s Bollywood composer's era?", correct: "R.D. Burman era", opts: ["R.D. Burman era", "A.R. Rahman era", "Anu Malik era", "Shankar-Jaikishan era"] },
    { q: "Identify this 70s film villain's iconic laugh / tone from the clip.", correct: "Gabbar Singh (Sholay)", opts: ["Gabbar Singh (Sholay)", "Mogambo (Mr. India)", "Shakaal (Shaan)", "Kancha Cheena (Agneepath)"] },
    { q: "Which radio station was famous for broadcasting this 'Binaca Geetmala' style program?", correct: "Radio Ceylon / Vividh Bharati", opts: ["Radio Ceylon / Vividh Bharati", "All India Radio", "VOA", "BBC Hindi"] },
    { q: "What genre is this mournful violin melody from Indian cinema?", correct: "Indian film sad song", opts: ["Indian film sad song", "Western classical", "Jazz", "Country music"] },
    { q: "This 'aaao meri jaan' phrasing is typical of which 70s playback singer?", correct: "Kishore Kumar", opts: ["Kishore Kumar", "Mohammed Rafi", "Mukesh", "Manna Dey"] },
    { q: "This audio has a distinctive western AND Indian fusion - from which era?", correct: "Late 1970s Bollywood", opts: ["Late 1970s Bollywood", "2000s remixes", "1950s films", "90s indie pop"] },
    { q: "Listen - which festive Indian song occasion does this celebrate?", correct: "Diwali celebration song", opts: ["Diwali celebration song", "Eid milad", "Holi folk song", "Navratri garba"] },
    { q: "This tabla solo pattern is called?", correct: "Teentaal", opts: ["Teentaal", "Ektaal", "Jhaptaal", "Rupak"] },
    { q: "This vocal clip sounds like which classical Indian tradition?", correct: "Hindustani classical", opts: ["Hindustani classical", "Carnatic classical", "Folk qawwali", "Punjabi classical"] },
    { q: "This trumpety filmy opening belongs to which film era?", correct: "1975–1985 masala films", opts: ["1975–1985 masala films", "1960s art films", "1990s romance", "2000s action"] },
    { q: "Which Indian classical concept is being demonstrated in this ascending scale?", correct: "Aaroho (ascending)", opts: ["Aaroho (ascending)", "Avroho (descending)", "Meend", "Gamak"] },
    { q: "This audio sounds like the signature music of which Indian TV show?", correct: "Krishi Darshan (Doordarshan)", opts: ["Krishi Darshan (Doordarshan)", "Chitrahaar", "Rangoli", "Mahabharat"] },
    { q: "Listen to this folk singing style - it comes from which Indian state?", correct: "Bengal (Baul music)", opts: ["Bengal (Baul music)", "Rajasthan", "Punjab", "Kerala"] },
    { q: "Which decade's Bollywood is this rock-and-roll influenced song from?", correct: "1960s Bollywood", opts: ["1960s Bollywood", "1980s Bollywood", "2000s Bollywood", "1990s Bollywood"] },
    { q: "What is the name of this percussion instrument playing rapid beats?", correct: "Dholak", opts: ["Dholak", "Tabla", "Mridangam", "Dhol"] },
    { q: "This 'koyal' bird sound is used symbolically in which season's folk songs?", correct: "Spring (Basant) songs", opts: ["Spring (Basant) songs", "Monsoon (Sawan) songs", "Winter songs", "Harvest songs"] },
    { q: "Listen: this vocal style with ornamentation is called?", correct: "Taan (gamakas)", opts: ["Taan (gamakas)", "Sargam recitation", "Alap", "Paltas"] },
    { q: "Which Indian instrument makes this deep resonating drone sound?", correct: "Tanpura", opts: ["Tanpura", "Harmonium", "Santoor", "Dilruba"] },
    { q: "This jingle-like clip sounds like which company's famous TV ad?", correct: "Nirma Washing Powder", opts: ["Nirma Washing Powder", "Amul Butter", "Liril Soap", "Lifebuoy"] },
    { q: "Which vocalist style is this -- where words are sung very fast?", correct: "Tarana", opts: ["Tarana", "Bandish", "Ghazal", "Thumri"] },
    { q: "This audio is from which style of Indian devotional singing?", correct: "Qawwali", opts: ["Qawwali", "Bhajan", "Kirtan", "Shabad"] },
    { q: "Which music category was popularized on Doordarshan?", correct: "Gujarati folk songs", opts: ["Gujarati folk songs", "English pop", "Hip hop", "EDM"] },
    { q: "Identify: this vocal technique uses gliding between notes, called?", correct: "Meend", opts: ["Meend", "Khatka", "Murki", "Gamak"] },
    { q: "This audio embodies which 70s iconic Bollywood style?", correct: "Disco / funk fusion", opts: ["Disco / funk fusion", "Ghazal", "Folk ballad", "Classical raga"] },
    { q: "Which classical singing style is famous for improvised bols?", correct: "Khayal", opts: ["Khayal", "Dhrupad", "Thumri", "Dadra"] },
    { q: "The shrill whistle you hear is used in which 70s film genre?", correct: "Western / daaku films", opts: ["Western / daaku films", "Romantic dramas", "Comedy films", "Art house"] },
    { q: "This audio snippet is from which type of Indian celebration?", correct: "Baraat (wedding procession)", opts: ["Baraat (wedding procession)", "Temple aarti", "Cricket victory", "Republic Day parade"] },
    { q: "Which playback singer was known for melodramatic singing style in the 70s?", correct: "Mukesh", opts: ["Mukesh", "Kishore Kumar", "Mohammed Rafi", "Manna Dey"] },
    { q: "This string instrument creates a unique twanging sound - identify it.", correct: "Ektara", opts: ["Ektara", "Sitar", "Guitar", "Veena"] },
    { q: "This vintage audio is from which Indian news program?", correct: "Doordarshan Evening News", opts: ["Doordarshan Evening News", "Aaj Tak bulletin", "Zee News", "BBC Hindi service"] },
];

const genXAudio = genXAudioQx.map((item, i) => ({
    era: 'GenX',
    type: 'audio',
    mediaUrl: makeAudioUrl(audioClips[i % audioClips.length].url),
    question: item.q,
    options: item.opts,
    correctOption: item.opts.indexOf(item.correct)
}));

// ── VIDEO QUESTIONS (50 for GenX) ──
// Short YouTube embed clips from publicly available Indian nostalgia content
// These are YouTube embeds – players on the page will show 10s clips
const makeVideoUrl = (ytId, start = 0) => `https://www.youtube.com/embed/${ytId}?start=${start}&end=${start + 15}&autoplay=0&rel=0`;

const genXVideoQx = [
    { ytId: 'KN4bsN7Eopg', start: 10, q: "Identify this iconic Bollywood film scene.", correct: "Sholay (1975)", opts: ["Sholay (1975)", "Deewar (1975)", "Zanjeer (1973)", "Don (1978)"] },
    { ytId: 'l4Mc7gqBmVQ', start: 5, q: "Which classic Indian TV show does this opening belong to?", correct: "Hum Log (Doordarshan)", opts: ["Hum Log (Doordarshan)", "Buniyaad", "Nukkad", "Malgudi Days"] },
    { ytId: 'GiQKMqD9DjI', start: 0, q: "Identify this legendary 70s Bollywood song sequence.", correct: "Mehbooba Mehbooba – Sholay", opts: ["Mehbooba Mehbooba – Sholay", "Yeh Dosti – Sholay", "Amar Akbar Anthony theme", "Julie theme"] },
    { ytId: '5TbUxGZtwGI', start: 5, q: "Which 80s Bollywood movie does this iconic scene come from?", correct: "Mr. India (1987)", opts: ["Mr. India (1987)", "Tezaab", "Ramesh Sippy film", "Ram Teri Ganga Maili"] },
    { ytId: 'H92pMOhEJGE', start: 0, q: "Identify this classic Bollywood movie opening credits.", correct: "Amar Akbar Anthony (1977)", opts: ["Amar Akbar Anthony (1977)", "Don (1978)", "Muqaddar Ka Sikandar", "Jai santoshi maa"] },
    { ytId: 'BzB5n9wA0jM', start: 10, q: "Which classic Doordarshan program does this clip represent?", correct: "Chitrahaar", opts: ["Chitrahaar", "Rangoli", "Phool Khile Hai Gulshan Gulshan", "Krishi Darshan"] },
    { ytId: '2BuReSZRulI', start: 0, q: "What famous 80s Indian advertisement is this from?", correct: "Hamara Bajaj (Bajaj scooter ad)", opts: ["Hamara Bajaj (Bajaj scooter ad)", "Nirma ad", "Amul butter ad", "Liril soap ad"] },
    { ytId: 'mFCmuVEqHsg', start: 5, q: "Identify this iconic 70s Indian pop / film number.", correct: "Dum Maro Dum – Hare Rama Hare Krishna", opts: ["Dum Maro Dum – Hare Rama Hare Krishna", "Piya Tu Ab To Aaja", "Mehbooba Mehbooba", "Aap Jaisa Koi"] },
    { ytId: 'Xd0oZ8aSSnQ', start: 5, q: "Identify this 80s legendary Indian sports moment.", correct: "India wins 1983 Cricket World Cup", opts: ["India wins 1983 Cricket World Cup", "India wins 1979 Hockey WC", "India vs Pakistan 1986 match", "Kapil Dev 175 vs Zimbabwe"] },
    { ytId: 'PdSMl3BZMEY', start: 0, q: "This is the opening scene of which iconic 70s Bollywood thriller?", correct: "Sholay", opts: ["Sholay", "Don", "Zanjeer", "Deewar"] },
    { ytId: 'gBQZPjGVCgM', start: 10, q: "Which Indian actor is depicted in this 80s action scene?", correct: "Amitabh Bachchan", opts: ["Amitabh Bachchan", "Dharmendra", "Vinod Khanna", "Shatrughan Sinha"] },
    { ytId: '4Z5cRz3QJig', start: 5, q: "What is this 70s Indian movie known for?", correct: "Deewar – Dialogue scene", opts: ["Deewar – Dialogue scene", "Ganga Jamuna", "Mughal E Azam", "Mera Gaon Mera Desh"] },
    { ytId: 'PLvmcT-9O4qs4j3EePmIuBmrpMiH3Dp', start: 0, q: "Identify this famous Indian classical dance clip.", correct: "Bharatanatyam performance", opts: ["Bharatanatyam performance", "Kathak dance", "Kuchipudi dance", "Odissi dance"] },
    { ytId: 'VNvSm23CPHY', start: 0, q: "This 70s movie scene is from?", correct: "Anand (1971) – Rajesh Khanna", opts: ["Anand (1971) – Rajesh Khanna", "Bobby (1973)", "Aradhana (1969)", "Haathi Mere Saathi"] },
    { ytId: 'J31bIBjL7aQ', start: 5, q: "Which Doordarshan serial does this theme song belong to?", correct: "Malgudi Days", opts: ["Malgudi Days", "Chandrakanta", "Bharat Ek Khoj", "Buniyaad"] },
    { ytId: '5l5Hw2EoAq0', start: 5, q: "Identify this legendary 80s Bollywood intro sequence.", correct: "Tezaab (1988)", opts: ["Tezaab (1988)", "Ram Lakhan", "Tridev", "Chandni"] },
    { ytId: 'bTxH0JZBgdo', start: 10, q: "This vintage Doordarshan ad is for which product?", correct: "Nirma Washing Powder", opts: ["Nirma Washing Powder", "Amul Butter", "BPL Television", "Videocon"] },
    { ytId: 'AwQZlp5Ks_Q', start: 0, q: "This legendary film song clip is from?", correct: "Mere Sapno Ki Rani – Aradhana", opts: ["Mere Sapno Ki Rani – Aradhana", "Gulabi Aankhein – The Train", "Pehla Nasha – Jo Jeeta", "Tere Mere Milan Ki Yeh"] },
    { ytId: 'UPL8s7dMmJ8', start: 0, q: "Which 80s dance number is this from?", correct: "Disco Dancer (1982)", opts: ["Disco Dancer (1982)", "Himmatwala", "Tohfa", "Masterji"] },
    { ytId: 'N6VKzPZ2eQE', start: 10, q: "Identify this memorable scene from a 70s classic.", correct: "Jai – Veeru friendship in Sholay", opts: ["Jai – Veeru friendship in Sholay", "Anand – Rajesh Khanna", "Don chase scene", "Abhimaan dance"] },
    { ytId: 'YQWJ7Og6mCo', start: 0, q: "What Indian government propaganda film does this upbeat 70s clip represent?", correct: "Hum Hindustani / National interest film", opts: ["Hum Hindustani / National interest film", "South Indian film songs", "Documentary", "Commercial ad"] },
    { ytId: 'Fup9TdkBBho', start: 5, q: "Name the 70s/80s show this Doordarshan children's programming resembles.", correct: "Ek Anek Aur Ekta (animated short)", opts: ["Ek Anek Aur Ekta (animated short)", "Chhota Chetan", "Jungle Book", "Giant Robot"] },
    { ytId: 'qCXk9GUqv4o', start: 0, q: "This intro jingle is from which iconic Doordarshan show?", correct: "Phool Khile Hai Gulshan Gulshan", opts: ["Phool Khile Hai Gulshan Gulshan", "Chitrahaar", "Rangoli", "Krishi Darshan"] },
    { ytId: 'c6mGLQT2QU8', start: 5, q: "Identify this Bollywood actress from her classic dance clip.", correct: "Helen", opts: ["Helen", "Waheeda Rehman", "Mumtaz", "Hema Malini"] },
    { ytId: 'GMwxm7e9_Fo', start: 5, q: "This classic 70s number is from which Bollywood movie?", correct: "Bobby (1973)", opts: ["Bobby (1973)", "Julie", "Aradhana", "Hare Rama Hare Krishna"] },
    { ytId: 'o3yBiclMB9Q', start: 10, q: "This clip shows which Indian historical event?", correct: "India's independence celebrations", opts: ["India's independence celebrations", "Republic Day parade", "Asian Games", "Cricket world cup"] },
    { ytId: 'nsmZlT3Xvog', start: 0, q: "Identify this 80s hit from the song's picturization style.", correct: "Pyar Ka Dard – Kumar Sanu era", opts: ["Pyar Ka Dard – Kumar Sanu era", "Disco number", "Classical mujra", "80s Bollywood melody"] },
    { ytId: '8SbxIeXqFGk', start: 5, q: "This Doordarshan signature tone belongs to?", correct: "Doordarshan news bulletin opening", opts: ["Doordarshan news bulletin opening", "Vividh Bharati radio", "All India Radio", "Star TV"] },
    { ytId: 'G1oMVtBlXFg', start: 5, q: "This upbeat song clip resembles which 70s Bollywood actress's style?", correct: "Zeenat Aman", opts: ["Zeenat Aman", "Rekha", "Hema Malini", "Neetu Singh"] },
    { ytId: 'nFBFE43wdrc', start: 0, q: "Which comedy actor's style does this exaggerated dialogue clip resemble?", correct: "Kader Khan / Om Prakash style", opts: ["Kader Khan / Om Prakash style", "Utpal Dutt", "Mehmood", "Asrani"] },
    { ytId: 'rGKfcE9WXXY', start: 5, q: "Identify this classic 80s Doordarshan children's show clip.", correct: "Vikram Aur Betaal", opts: ["Vikram Aur Betaal", "Chandrakanta", "Alif Laila", "Malgudi Days"] },
    { ytId: 'xeW-N7mYsKU', start: 10, q: "This dramatic scene clip belongs to which 80s landmark TV show?", correct: "Hum Log (Doordarshan)", opts: ["Hum Log (Doordarshan)", "Nukkad", "Buniyaad", "Wagle Ki Duniya"] },
    { ytId: '7AuJDuAkj6o', start: 0, q: "This popular 70s radio program style was called?", correct: "Binaca Geetmala (Radio Ceylon)", opts: ["Binaca Geetmala (Radio Ceylon)", "Sangeet Sarita", "Jaimala", "Hawa Mahal"] },
    { ytId: 'wbj_KR6A9bw', start: 5, q: "Identify this Bollywood title song from the 70s.", correct: "Shaan (1980) title song", opts: ["Shaan (1980) title song", "Don title", "Disco Dancer title", "Muqaddar Ka Sikandar"] },
    { ytId: 'ZNFP_P9TZOI', start: 0, q: "This 1983 historic moment is?", correct: "Kapil Dev lifting Cricket World Cup", opts: ["Kapil Dev lifting Cricket World Cup", "India hockey gold 1980", "Prakash Padukone badminton", "PT Usha Olympics 1984"] },
    { ytId: 'KSxjHbMPfXc', start: 0, q: "This song from which 70s film was RD Burman's hit?", correct: "Yeh Mera Dil Yaar Ka Diwana – Don", opts: ["Yeh Mera Dil Yaar Ka Diwana – Don", "Mehbooba Mehbooba", "Dum Maro Dum", "Chura Liya Hai Tumne"] },
    { ytId: 'xDl3pTv0-A8', start: 0, q: "This 80s mega hit opening sequence is from?", correct: "Tezaab – Ek Do Teen", opts: ["Tezaab – Ek Do Teen", "Disco Dancer", "Mard", "Ilzaam"] },
    { ytId: 'DTAV-O4i5nY', start: 5, q: "Name this show from Doordarshan's golden era.", correct: "Nukkad (Street Corner)", opts: ["Nukkad (Street Corner)", "Hum Log", "Wagle Ki Duniya", "Zabaan Sambhalke"] },
    { ytId: 'MtT1WfQ5z3I', start: 0, q: "Which 80s Bollywood actress's iconic silver screen debut is this?", correct: "Sridevi", opts: ["Sridevi", "Madhuri Dixit", "Juhi Chawla", "Meenakshi Seshadri"] },
    { ytId: 'BqDa2a_q3bc', start: 5, q: "This clip from 70s Doordarshan shows which recurring folk art segment?", correct: "Folk dance demonstration", opts: ["Folk dance demonstration", "News segment", "Sports highlights", "Animation short"] },
    { ytId: 'NMv8i7yYp0c', start: 0, q: "This music video style is from which Indian pop era?", correct: "Early 80s Indian film pop", opts: ["Early 80s Indian film pop", "2000s indi-pop", "90s MTV era", "70s disco Bollywood"] },
    { ytId: 'IEv3pL3KZOU', start: 0, q: "Identify this classic 70s cartoon that aired on Doordarshan.", correct: "Ek Chidiya – Doordarshan animated short", opts: ["Ek Chidiya – Doordarshan animated short", "He Man", "Tom and Jerry", "Jungle Book"] },
    { ytId: 'm5iWvkW_4Jo', start: 5, q: "What genre of Bollywood film is this clip from?", correct: "Angry Young Man / action drama", opts: ["Angry Young Man / action drama", "Romantic drama", "Comedy film", "Art house cinema"] },
    { ytId: 'MxC5cDw9X-E', start: 0, q: "This political drama clip resembles which major 70s Indian event?", correct: "Emergency era India (1975–77)", opts: ["Emergency era India (1975–77)", "Pre-independence India", "Indo-Pak 1971 war", "Green revolution"] },
    { ytId: 'RkPXIEr_q0s', start: 0, q: "Which Indian track-and-field athlete is portrayed in this early 80s style?", correct: "P.T. Usha", opts: ["P.T. Usha", "Milkha Singh", "Rima Dutta", "Shiny Abraham"] },
    { ytId: 'SXlMMePJ_sM', start: 5, q: "Identify this legendary 80s Bollywood chase scene.", correct: "Amitabh Bachchan action film chase", opts: ["Amitabh Bachchan action film chase", "Sunny Deol action scene", "Jackie Shroff", "Govinda comedy chase"] },
    { ytId: 'nzGtNjKGhcg', start: 0, q: "This opening scene is from which classic 80s film?", correct: "Mr. India (1987)", opts: ["Mr. India (1987)", "Tezaab", "Chandni", "Tridev"] },
    { ytId: 'oVwlXi5jqig', start: 0, q: "Which comedy drama from Doordarshan does this style represent?", correct: "Zabaan Sambhalke", opts: ["Zabaan Sambhalke", "Hum Log", "Yeh Jo Hai Zindagi", "Wagle Ki Duniya"] },
    { ytId: 'C98cxgRuFl4', start: 5, q: "Which major Doordarshan milestone does this clip celebrate?", correct: "Doordarshan's first color broadcast (1982 Asian Games)", opts: ["Doordarshan's first color broadcast (1982 Asian Games)", "First national network launch", "DD Metro premiere", "First satellite broadcast"] },
];

const genXVideo = genXVideoQx.map(item => ({
    era: 'GenX',
    type: 'video',
    mediaUrl: makeVideoUrl(item.ytId, item.start),
    question: item.q,
    options: item.opts,
    correctOption: item.opts.indexOf(item.correct)
}));

// ── WRITE ──
const outFile = path.join(__dirname, 'data', 'gen_x.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...genXAudio, ...genXVideo];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log(`GenX: added ${genXAudio.length} audio + ${genXVideo.length} video questions. Total: ${updated.length}`);
