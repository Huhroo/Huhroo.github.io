# Huhroo.github.io
My clicker game website project

Troll clicker is an incremental clicker game where you can collect coins by clicking the troll and buying tools.
You can get more information out of things by hovering different elements (sorry mobile users)
this is an School project so don't expect breaking game desing

KOULU ARVOSTELIALLE
Hei! Tämä on minun klikkeri pelivu ja alla on arviointi kriteerit ja kommentini siitä että toteutuuko ne ja mistä ne mahdollisesti löytyy.

HTML (25%)
1/5:
Basic HTML structure is present.

-lyhyellä vilkaisulla minun html tiedostoa sanonoisin että kyllä juu.
 -sivu on jaettu osiin
 -siellä hyödynnetään kaikkia perus asioita

 1pt

2/5:
HTML structure with clear content differentiation (headings, paragraphs, lists).

-Mielestäni sivuni täyttää tämän vaatimuksen

1pt

3/5:
Use of forms, links, and media.

sivuillani on:
 forms -> settings napin takana on forms jolla voi vaihtaa peikon nimeä
 linkki -> "learn about trolls" on linkki wikipediaan 
 media -> peikko nappi sisältää kuvan

 eli sanoisin että se täyttyy

 1pt

4/5:
Tables are effectively used.

Sivuillani on yksi table mutta minusta se ei tarvitse enempää (ja se jopa päivittyy peliä pelatessa) 

sanoisin itse että 1pt

1pt

5/5:
Consistent use of semantic HTML throughout, ensuring better structure and understanding of the content.

Sivuni on hyödyntää näitä (nav, section jne) mutta se kai on siinä ja siinä että onko niitä käytetty hyvin

hyvänä päivänä 1pt 

CSS (25%)
1/5:
Basic CSS styling (colors, fonts).

Ihan perus värien vaihtelu ja fontien asettelu näkyy heti kun katsoo jompaa kumpaa stylesheettiä

1pt

2/5:
Use of classes and IDs to style specific elements.

kyllä, esim clickbuttonia tuunataan ID mukaan

1pt

3/5:
Implementation of responsive design elements.

Tämä on väiteltävissä oleva asia, sillä sivuni kyllä mukautuu monille näyttökoille ja omissa testauksissani se on 1980x1200 näytöissä ihan järkevä
ja toimii myös puhelimilla ja tableteilla ihan järkevästi

antaisin itse 1pt mutta ymmärrän myös 0pt

4/5:
Use of layouts for advanced user interfaces (arrays, float, flexbox, css grid)

Hyödynnän flexboxxia molemmissa container:ssä

1pt

5/5:
Styling demonstrates a strong grasp of layout principles, aesthetics, and user experience.

No tämän ymmärrän täysin jos haluaa antaa 0pt mutta mielestäni käyttäjä kokemus on hyvä ja aesteettisesti se on vanhan koulukunnan edustaja josta itse pidän

en ehkä itse antaisi 1pt mutta ehkä kuitenkin se on sen arvoinen? Paha sanoa itse...

JavaScript Basics (25%)
1/5:
Simple interactions (like alerts on button click).

Koko projektin perus ominaisuus on napin painaminen joka tekee javascriptillä jotakin

1pt

2/5:
Multiple event listeners and basic DOM manipulations.

Projektissa on kirjoitus hetkellä 10 event listeneriä ja lukuisia DOM manipulaatioita
esim kun klikkaat peikkoa näytöllä oleva kolikko laskuri päivittyy.

1pt

3/5:
Use of arrays, objects, and functions.

Javascriptistä iso osa on object tool:in ympärille rakennettu, funktioita on melkein 20, ja arraytä hyödynnetään luomalla tool's olioiden,
 sisällöistä array functiolla generateInfoArray(tool) joilla sitten päivitettään jatkuvasti html tablen sisältöä

 1pt 

4/5:
Advanced logic, looping through data, and dynamic DOM updates.

"2. Advanced logic, looping through data, and dynamic DOM updates

Tämä kriteeri keskittyy ohjelmointilogiikan kehittyneempiin osa-alueisiin, mukaan lukien:

• Ehtolausekkeet: Käytä ehtoja, kuten if, else if, ja switch, hallitaksesi loogisia päätöksiä.

• Datan iteroiminen: Käytä erilaisia JavaScriptin loopeja (kuten for, for...of, forEach, map, jne.)
käydäksesi läpi tietorakenteita.

• Dynaamiset DOM-päivitykset: Aktiivinen ja jatkuva interaktio käyttöliittymän kanssa käyttäen
JavaScriptiä (esim. AJAX, Fetch API) päivittämään, lisäämään tai poistamaan DOM-elementtejä ja
niiden sisältöä reaaliaikaisesti.

• Käytä Document Object Model (DOM) APIa, kuten getElementById, querySelector, jne.
päivittääksesi web-sivun sisältöä dynaamisesti."

tämä kai on siinä ja siinä.
 -DOM manipulaatio on sivulla jatkuvaa ja hyödyntää etenkin getElementbyId:tä monessakin paikassa ja kuivaisin sitä dynaamiseksi (fetch API hakee esim kellon ajan puolen minuutin välein)
 -looppeja käytän vain "buyXTool()" funktiossa koska  muualla niille ei ollut tässä projektissa käyttöä
 -Ehtolausekkeita käytin monessa paikkaa esim updatecoinCount() if looppaa rahan läpi ja käsittelee sitä eri tavoin jos rahan määrä on tarpeeksi suurta

 itse sanoisin että juu 1pt
5/5:
Consistent use of Object-Oriented JavaScript principles.

tästä toteutuu osa (luokat ja oliot) mutta muuten ei

0pt

Asynchronous Operations (25%)
1/5:
Use of timers.

setinterval() käytetään kolme kertaa ja on perus palikka sivustossani
ja handleClick() hyödyntää settimeout ajastinta

1pt

2/5:
Successful implementation of an AJAX call or Fetch.

Sivuni onnistuneesti hyuödyntää Fetchiä ja hakee nykyisen gmt ajan. (javascript fetchTime())

1pt

3/5:
Data from the asynchronous call is displayed on the webpage.

fetchTime() asynkronisesti hakee ajan ja se näkyy minun sivun navigaatio baarissa

1pt

4/5:
Error handling is implemented (for failed API calls, etc.).

noh osittain
fetchTime() antaa virheilmoituksen jos API kutsu epäonnistuu, jota tuli myös testattua onnistuneesti kun github pages oli yhteistyö haluton (sivu josta api tulee oli merkattu koodissa HTTP sivuna vaikka se on oikeasti HTTPS, githubpages ei anna sivun tehdä yhteyttä jos yhteen otettava sivu on merkattu HTTP sivuksi vaikka se oikeasti on HTTPS)

ja funktio updatecoinCount() testaa onko annettu arvo oikea hyödyntäen try,throw catch metodeja(?)

eli error handling on implementoitu ainaki joillekin asioille
1pt

5/5:
Effective use of asynchronous data to enhance user experience (like filtering, sorting).

tästä en osaa itse sanoa fetchTime() funktio on toteutettu asynkronisia keinoja hyödyntäen mutta riittääkö yksi asia pisteeseen tässä?

LOPPUPISTEET
Itselle antaisin reallistisesti 14 pistettä.

