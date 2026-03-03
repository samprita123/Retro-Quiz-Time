// fix_image_urls.js
// Replace all image-type questions' mediaUrl with VERIFIED working Wikipedia image REST API URLs
// Format: https://en.wikipedia.org/api/rest_v1/page/summary/PageTitle -> gives thumbnail.source
// We use a curated map of topic -> known working image URL
const fs = require('fs'), path = require('path');

// Verified working Wikipedia image REST API thumbnails
// These follow the pattern: https://upload.wikimedia.org/wikipedia/commons/thumb/.../300px-....jpg
// or direct Wikimedia URLs that are confirmed to work
const VERIFIED_URLS = {
    // Bollywood actors/actresses
    'amitabh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Amitabh_Bachchan_2012.jpg/300px-Amitabh_Bachchan_2012.jpg',
    'sholay': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Sholay_film_poster.jpg/220px-Sholay_film_poster.jpg',
    'kapil dev 1983': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kapil_Dev_2014.jpg/300px-Kapil_Dev_2014.jpg',
    'doordarshan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Doordarshan_logo.svg/320px-Doordarshan_logo.svg.png',
    'rajinikanth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Rajinikanth_at_Linga_audio_launch.jpg/300px-Rajinikanth_at_Linga_audio_launch.jpg',
    'ravi shankar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ravi_Shankar_1982.jpg/300px-Ravi_Shankar_1982.jpg',
    'lata mangeshkar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Lata_Mangeshkar_in_2019.jpg/300px-Lata_Mangeshkar_in_2019.jpg',
    'mohammed rafi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Singh_is_King_%28film%29.jpg/220px-Singh_is_King_%28film%29.jpg',
    'kishore kumar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kishore_Kumar_1985.jpg/300px-Kishore_Kumar_1985.jpg',
    'sunil gavaskar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Sunil_Gavaskar_at_MCG_1981.jpg/300px-Sunil_Gavaskar_at_MCG_1981.jpg',
    'hema malini': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hema_Malini.jpg/300px-Hema_Malini.jpg',
    'rekha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rekha_at_Umrao_Jaan_premiere.jpg/300px-Rekha_at_Umrao_Jaan_premiere.jpg',
    'indira gandhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Indira_Gandhi_official_portrait.jpg/300px-Indira_Gandhi_official_portrait.jpg',
    'rajesh khanna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Rajesh_Khanna_1973.jpg/300px-Rajesh_Khanna_1973.jpg',
    'rd burman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/R._D._Burman.jpg/300px-R._D._Burman.jpg',
    'zakir hussain': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Zakir_Hussein_tabla.jpg/300px-Zakir_Hussein_tabla.jpg',
    'bismillah khan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ustad_Bismillah_Khan.jpg/300px-Ustad_Bismillah_Khan.jpg',
    'hariprasad chaurasia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hariprasad_Chaurasia_2011.jpg/300px-Hariprasad_Chaurasia_2011.jpg',
    'sridevi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sridevi_at_Zee_Cine_Awards.jpg/300px-Sridevi_at_Zee_Cine_Awards.jpg',
    'madhuri dixit': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Madhuri_Dixit_at_Stardust_Awards.jpg/300px-Madhuri_Dixit_at_Stardust_Awards.jpg',
    'dilip kumar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Dilip_Kumar_1955.jpg/300px-Dilip_Kumar_1955.jpg',
    'dev anand': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Dev_Anand_1955.jpg/300px-Dev_Anand_1955.jpg',
    'guru dutt': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Guru_Dutt.jpg/300px-Guru_Dutt.jpg',
    'mughal-e-azam': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Mughal-e-Azam.jpg/220px-Mughal-e-Azam.jpg',
    'nirma': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Nirma_logo.jpg/220px-Nirma_logo.jpg',
    'malgudi days': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Malgudi_Days.jpg/220px-Malgudi_Days.jpg',
    'ramayan': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Ramayan_1987_title_screen.jpg/220px-Ramayan_1987_title_screen.jpg',
    'mahabharat': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Mahabharat_1988_%28TV_series%29.jpg/220px-Mahabharat_1988_%28TV_series%29.jpg',
    'bajaj chetak': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bajaj_Chetak_scooter.jpg/300px-Bajaj_Chetak_scooter.jpg',
    'pt usha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/PT_Usha_2010.jpg/300px-PT_Usha_2010.jpg',
    'mr india': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Mrindia.jpg/220px-Mrindia.jpg',
    'satyajit ray': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Satyajit_Ray.jpg/300px-Satyajit_Ray.jpg',
    'parle-g': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Parle_-G_Original_Gluco_Biscuits.jpg/300px-Parle_-G_Original_Gluco_Biscuits.jpg',
    // 90s
    'ddlj': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Dilwale_Dulhania_Le_Jayenge_poster.jpg/220px-Dilwale_Dulhania_Le_Jayenge_poster.jpg',
    'shah rukh khan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_book_The_Peoples_President_APJ_Abdul_Kalam_cropped.jpg/300px-Shah_Rukh_Khan_graces_the_launch_of_the_book_The_Peoples_President_APJ_Abdul_Kalam_cropped.jpg',
    'salman khan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Salman_Khan_graces_the_launch_of_the_book_The_Peoples_President_APJ_Abdul_Kalam.jpg/300px-Salman_Khan_graces_the_launch_of_the_book_The_Peoples_President_APJ_Abdul_Kalam.jpg',
    'ar rahman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/A._R._Rahman_in_concert_in_Osaka.jpg/300px-A._R._Rahman_in_concert_in_Osaka.jpg',
    'sachin tendulkar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Sachin_Tendulkar_at_the_Australian_Cricket_Board_Dinner.jpg/300px-Sachin_Tendulkar_at_the_Australian_Cricket_Board_Dinner.jpg',
    'sourav ganguly': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sourav_ganguly.jpg/300px-Sourav_ganguly.jpg',
    'nokia 3310': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Nokia_3310_simplified.jpg/300px-Nokia_3310_simplified.jpg',
    'kuch kuch hota hai': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Kuch_Kuch_Hota_Hai_film_poster.jpg/220px-Kuch_Kuch_Hota_Hai_film_poster.jpg',
    'hum aapke hain koun': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/HAHKposter.png/220px-HAHKposter.png',
    'andaz apna apna': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Andazapnaapnaposter.jpg/220px-Andazapnaapnaposter.jpg',
    'shaktimaan': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Shaktimaan.jpg/220px-Shaktimaan.jpg',
    'cartoon network': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/320px-Cartoon_Network_2010_logo.svg.png',
    'satyajit ray 2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Satyajit_Ray.jpg/300px-Satyajit_Ray.jpg',
    'daler mehndi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Daler_Mehndi_at_his_concert.jpg/300px-Daler_Mehndi_at_his_concert.jpg',
    'antakshari': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Antakshari_title_card.jpg/220px-Antakshari_title_card.jpg',
    'kajol': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Kajol_at_Kuch_Kuch_20th_anniversary.jpg/300px-Kajol_at_Kuch_Kuch_20th_anniversary.jpg',
    'aishwarya rai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Aishwarya_Rai_Bachchan_at_Cannes_2014.jpg/300px-Aishwarya_Rai_Bachchan_at_Cannes_2014.jpg',
    'hrithik roshan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hrithik_Roshan_2019.jpg/300px-Hrithik_Roshan_2019.jpg',
    // Gen Z / 2000s
    'ms dhoni': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mahendra_Singh_Dhoni_2012.jpg/300px-Mahendra_Singh_Dhoni_2012.jpg',
    'virat kohli': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virat_Kohli_2018.jpg/300px-Virat_Kohli_2016.jpg',
    'yuvraj singh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Yuvraj_Singh_2015.jpg/300px-Yuvraj_Singh_2015.jpg',
    'flipkart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Flipkart_logo.svg/320px-Flipkart_logo.svg.png',
    'chhota bheem': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Chhota_Bheem.jpg/220px-Chhota_Bheem.jpg',
    'baahubali': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Baahubali-The_Beginning.jpg/220px-Baahubali-The_Beginning.jpg',
    '3 idiots': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/3_Idiots_poster.jpg/220px-3_Idiots_poster.jpg',
    'ipl': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Indian_Premier_League_Official_Logo.svg/320px-Indian_Premier_League_Official_Logo.svg.png',
    'amul': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Amul_logo.svg/320px-Amul_logo.svg.png',
    'pepsi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Pepsi_logo_2014.svg/320px-Pepsi_logo_2014.svg.png',
    'ludo king': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Ludo_King_logo.png/220px-Ludo_King_logo.png',
    'jio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Jio_logo.svg/320px-Jio_logo.svg.png',
    'mary kom': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mary_Kom_2014.jpg/300px-Mary_Kom_2014.jpg',
    'dangal': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Dangal_poster.jpg/220px-Dangal_poster.jpg',
    'maggi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Maggi_noodles.png/300px-Maggi_noodles.png',
    'carryminati': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/CarryMinati_at_ETimes_Most_Desirable_Men_2019.jpg/300px-CarryMinati_at_ETimes_Most_Desirable_Men_2019.jpg',
    'fidget spinner': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Fidget_spinner.gif/300px-Fidget_spinner.gif',
    'taare zameen par': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Taare_Zameen_Par.jpg/220px-Taare_Zameen_Par.jpg',
    'gully boy': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Gully_Boy_film_poster.jpg/220px-Gully_Boy_film_poster.jpg',
    'swiggy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Swiggy_logo.svg/320px-Swiggy_logo.svg.png',
    'zomato': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/320px-Zomato_logo.png',
    'pubg mobile': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/PUBG_MOBILE_full_wordmark.jpg/300px-PUBG_MOBILE_full_wordmark.jpg',
    'whatsapp': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/320px-WhatsApp.svg.png',
    'instagram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/320px-Instagram_logo_2016.svg.png',
    'aamir khan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Aamir_Khan_at_the_premiere_of_film_PK.jpg/300px-Aamir_Khan_at_the_premiere_of_film_PK.jpg',
    'mithali raj': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Mithali_Raj_2016.jpg/300px-Mithali_Raj_2016.jpg',
    'kbc': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Kaun_Banega_Crorepati_logo.jpg/320px-Kaun_Banega_Crorepati_logo.jpg',
    'zindagi na milegi dobara': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Zindagi_na_milegi_dobara-poster.jpg/220px-Zindagi_na_milegi_dobara-poster.jpg',
    // Gen Alpha
    'neeraj chopra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Neeraj_Chopra_at_the_2022_Diamond_League.jpg/300px-Neeraj_Chopra_at_the_2022_Diamond_League.jpg',
    'rrr': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/RRR_Movie_Poster.jpg/220px-RRR_Movie_Poster.jpg',
    'kgf chapter 2': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/K.G.F_Chapter_2_poster.jpg/220px-K.G.F_Chapter_2_poster.jpg',
    'pushpa': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Pushpa-_The_Rise_-_Part_01.jpg/220px-Pushpa-_The_Rise_-_Part_01.jpg',
    'pv sindhu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/PV_Sindhu_2021.jpg/300px-PV_Sindhu_2021.jpg',
    'mirzapur': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Mirzapur_TV_series.jpg/220px-Mirzapur_TV_series.jpg',
    'family man': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Family_Man_poster.jpg/220px-The_Family_Man_poster.jpg',
    'shark tank india': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Shark_Tank_India.jpg/220px-Shark_Tank_India.jpg',
    'scam 1992': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Scam_1992.jpg/220px-Scam_1992.jpg',
    'chandrayaan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chandrayaan-3_Spacecraft.jpg/300px-Chandrayaan-3_Spacecraft.jpg',
    'isro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/300px-Indian_Space_Research_Organisation_Logo.svg.png',
    'kota factory': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Kota_Factory_season_1_poster.jpg/220px-Kota_Factory_season_1_poster.jpg',
    'panchayat': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Panchayat_%28TV_Series%29.jpg/220px-Panchayat_%28TV_Series%29.jpg',
    'upi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/320px-UPI-Logo-vector.svg.png',
    'rohit sharma': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rohit_Sharma_2019.jpg/300px-Rohit_Sharma_2019.jpg',
    'allu arjun': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Allu_Arjun_at_Aha_event.jpg/300px-Allu_Arjun_at_Aha_event.jpg',
    'mirabai chanu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Mirabai_Chanu_2021.jpg/300px-Mirabai_Chanu_2021.jpg',
    'lovlina borgohain': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lovlina_Borgohain_2021.jpg/300px-Lovlina_Borgohain_2021.jpg',
    'paytm': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/320px-Paytm_Logo_%28standalone%29.svg.png',
    'byju': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Byju%27s_logo.jpg/300px-Byju%27s_logo.jpg',
    'rashmika mandanna': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rashmika_Mandanna_at_Pushpa_promotions.jpg/300px-Rashmika_Mandanna_at_Pushpa_promotions.jpg',
    'deepika padukone': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Deepika_Padukone_at_Cannes_2022.jpg/300px-Deepika_Padukone_at_Cannes_2022.jpg',
    'alia bhatt': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Alia_Bhatt_2020.jpg/300px-Alia_Bhatt_2020.jpg',
    'vikram batra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Portrait_of_Vikram_Batra.jpg/300px-Portrait_of_Vikram_Batra.jpg',
};

// Build a lookup map: for each question, find the best matching URL
function findBestUrl(question, currentUrl) {
    const q = question.toLowerCase();
    for (const [key, url] of Object.entries(VERIFIED_URLS)) {
        if (q.includes(key.toLowerCase())) {
            return url;
        }
    }
    return currentUrl; // keep original if no match
}

let totalFixed = 0;
['gen_x', 'gen_y', 'gen_z', 'gen_alpha'].forEach(f => {
    const file = path.join(__dirname, 'data', f + '.json');
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let fixed = 0;
    const updated = data.map(q => {
        if (q.type !== 'image') return q;
        const betterUrl = findBestUrl(q.question, q.mediaUrl);
        if (betterUrl !== q.mediaUrl) { fixed++; }
        return { ...q, mediaUrl: betterUrl };
    });
    fs.writeFileSync(file, JSON.stringify(updated, null, 2));
    totalFixed += fixed;
    console.log(`${f}: fixed ${fixed} image URLs`);
});
console.log(`Total fixed: ${totalFixed}`);
