---
id: R-2026-010
title: "Országgyűlési válasz (K/13426/1) – miniszteri reakció a validációs modell aggályaira"
description: "Forrásalapú összefoglaló és elemzés a K/13426. számú országgyűlési kérdésre adott K/13426/1. számú miniszteri válaszról."
date: 2026-01-28T00:00:00.000Z
preview: ""
draft: false
tags: ["kriptovalidáció", "LXVII", "MiCA", "SZTFH", "országgyűlés", "versenyjog", "GVH", "adatbiztonság", "nemzetbiztonság", "válasz"]
categories: ["következtetés"]
links:
  questions: ["Q-002", "Q-003", "Q-006"]
  templates: []
  cases: []
  conclusions: ["R-2026-004", "R-2026-001", "R-2026-002", "R-2026-003", "R-2026-011"]
---

::: info Forrás (PDF)
- Dokumentum: Országgyűlési írásbeli választ igénylő kérdésre adott válasz, irományszám: **K/13426/1**
- Link: https://www.parlament.hu/irom42/13426/13426-0001.pdf
- Előzmény PDF: https://www.parlament.hu/irom42/13426/13426.pdf
- Válasz dátuma (a válasz szerint): **2026-01-27**
- Utolsó ellenőrzés: **2026-01-28**
:::

## Előzmények

A K/13426 számú országgyűlési írásbeli kérdésre adott K/13426-0001 számú miniszteri választ vizsgálja ez a jelentés, különös tekintettel arra, hogy a válasz hogyan kezeli a kérdésben felvetett aggályokat a kriptovalidációs modell gyakorlati alkalmazhatóságával, a versenyjogi és adatbiztonsági kockázatokkal kapcsolatban.

## Jelentés – K/13426. számú írásbeli kérdés és a K/13426/1. számú miniszteri válasz összevetése

**Vizsgált dokumentumok**
- Varju László (DK) K/13426. számú írásbeli kérdése (8 alponttal).
- Dr. Fónagy János (NGM) NGM/698-1/2026 iktatószámú válasza (K/13426/1.).
- Caduceus Zrt. validátori ÁSZF (v3.0, 2025.12.22.).

---

# 1) Összefoglaló

A miniszteri válasz **nem ad tételes, kérdésenkénti választ** a képviselő által feltett 8 kérdésre; inkább **általános állításokkal** igyekszik kezelni több felvetést (pl. „nem ír elő többszereplős modellt”, „nem merül fel erőfölénnyel való visszaélés”, „kapacitás-probléma „nehéz értelmezhetősége”, „nincs adatkoncentráció”).  

A válasz **több ponton olyan konklúziót mond ki**, amely **a kérdések mögötti tényállításokat nem cáfolja érdemben**, hanem **érvelés nélkül lezárja** (pl. verseny/erőfölény kizárása; kapacitásprobléma „nehéz értelmezhetősége”). 

Kiemelten fontos, hogy a válasz **a „kapacitáskorlát” és a „folyamatosság” aggályát** lényegében elutasítja, miközben az **ÁSZF kifejezetten számol túlterheléssel, rate-limittel, korlátozással, felfüggesztéssel és megtagadással**, vagyis a működésben a kapacitás és a hozzáférés problémája **nemhogy értelmezhetetlen, hanem szerződéses szinten kezelendő kockázatként jelenik meg**. 


# 2) Kérdésenkénti lefedettség – rövid minősítés

Az alábbi minősítések azt jelzik, hogy a válasz **közvetlenül** és **érdemben** válaszol-e a feltett kérdésre.

1. **Moratórium kormányrendelettel** (amíg nincs több validátor + nincs nyilvános gyakorlati útmutató): **Nincs megválaszolva.**   
2. **Mikor tesz közzé az SZTFH részletes gyakorlati útmutatót**: **Nincs megválaszolva időponttal**; annyi áll, hogy „részletes iránymutatás elérhető” az SZTFH honlapján.   
3. **Átmeneti/időközi iránymutatás a Btk.-kockázat elkerülésére**: **Részben kiváltja egy általános büntetőjogi célnyilatkozattal**, de **nem ad gyakorlati „hogyan kerüld el” útmutatót.**   
4. **Mit tesz a Kormány a több validátor piaci megjelenéséért**: **Nincs megválaszolva** (csak azt közli: a jogszabály nem ír elő többszereplős modellt).   
5. **Hogyan kerülik el az államilag létrehozott kvázi-monopóliumot**: **Érdemi biztosíték nincs**, a válasz inkább kijelenti, hogy „nem merül fel” erőfölény-visszaélés.   
6. **Vizsgálta-e a GVH a versenyproblémát**: **Nincs megválaszolva.**   
7. **Milyen kapacitásvizsgálatot végzett az SZTFH**: **Nincs megválaszolva**; a válasz azt mondja, a kapacitáskorlát említése „nehezen értelmezhető”.   
8. **Nemzetbiztonsági kockázat az adatok koncentrációja miatt**: **Részben megválaszolt**, de vitatható premisszával („nincs adatkoncentráció, mert nem minden tranzakció vizsgálandó”).   


# 3) Részletes elemzés – tartalmi, logikai és „ÁSZF-konfrontációs” pontok

## 3.1. A válasz szerkezeti problémája: nem tételes és nem auditálható
A képviselő 8 kérdést tesz fel, amelyek több helyen **időpontot, intézkedést, vizsgálat tényét** kérdezik.
A válasz ezzel szemben **nem bontja 1–8 pontra** a választ, és **nem közöl**:
- konkrét intézkedési tervet,
- határidőt,
- vizsgálatok tényét/eredményét (pl. GVH, SZTFH kapacitásvizsgálat),
- vagy azt, hogy miért nem adható meg (eljárásjogi okkal alátámasztva).

Ez önmagában nem jogellenesség-állítás, de **szakmailag nehezíti** annak ellenőrzését, hogy *„minden kérdésre válasz született-e”*.


## 3.2. „A validálási feladat részletes leírása két okból sem tehető meg” – belső ellentmondás a saját hivatkozásával
A válasz szerint a validálási feladat részletes leírása nem adható, mert többféle technológiai modell lehetséges és az eljárási modellek üzleti titkok.
Ugyanakkor a válasz *ugyanitt* hivatkozik arra, hogy a **szolgáltatás részletes szabályai és az ÁSZF** elérhető a szolgáltató honlapján. 

Az ÁSZF ténylegesen **meglehetősen részletesen leír módszertani elemeket** (pl. tracing, cluster-analízis, kockázati adatbázisok), és azt is állítja, hogy a részletes módszertan egy SZTFH-rendelet szerinti belső szabályzatban szerepel.   
**Következtetés:** a válaszban szereplő „nem tehető meg” kijelentés legalábbis **túl általános**, mert a rendszer *már most* publikál (ÁSZF-ben) részleteket; a kérdés valójában inkább az SZTFH által publikált, közérthető, normatív „mit kell tenni” útmutatóra irányult. 


## 3.3. Kapacitás: a válasz „nehezen értelmezhetőnek” mondja, miközben az ÁSZF kapacitáskezelési eszköztárat épít
A válasz: a kapacitáskorlát említése „nehezen értelmezhető”, mert nem minden tranzakció vizsgálandó, csak fiat- és kripto-kripto váltás.

Ezzel szemben az ÁSZF kifejezetten számol azzal, hogy a szolgáltatás korlátozható **túlzott mennyiségű kérelem** esetén, és nevesít **limitálást**, **időbeni elosztást**, **rate-limit értesítést**, illetve megtagadási/korlátozási/felfüggesztési mechanizmusokat.   
Sőt, az ÁSZF „ésszerű időn belül” teljesítési kötelezettségét is úgy tárgyalja, hogy a tényleges időt a **kapacitásterhelés** befolyásolja.

**Következtetés:** a kapacitás kérdése nem „nehezen értelmezhető”, hanem **szerződéses szinten kezelt realitás**. A miniszteri válasz e ponton logikailag gyenge: a „nem minden tranzakció” állítás nem zárja ki, hogy az érintett tranzakciók volumene önmagában túlterhelést okozzon, és ezt maga az ÁSZF is implikálja. 


## 3.4. Hozzáférés/jogbiztonság: az ÁSZF alapján a Validátor képes szolgáltatást megtagadni vagy korlátozni
A képviselői kérdéscsomag egyik fő aggodalma a jogkövetés gyakorlati feltételeinek hiánya.

Az ÁSZF szerint:
- a szerződés csak a Validátor visszaigazolásával jön létre (formai ellenőrzés után), tehát a hozzáférés **nem automatikus**.   
- a szolgáltatás több okból megtagadható, például ha a Megrendelő „a Validátor jóhírnevét, érdekeit vagy rendszerbiztonságát veszélyeztető magatartást tanúsít” – ez **tág, mérlegeléses kategória**.   
- súlyos szerződésszegésnél felfüggeszthető, a feldolgozatlan kérelmek törölhetők.   

**Következtetés:** ha a jogszerű ügylet előfeltétele a validáció, akkor a Validátor szerződéses jogkörei (megtagadás/korlátozás/felfüggesztés) **közvetlenül érintik** a jogkövetés gyakorlati lehetőségét. A miniszteri válasz ezt a dimenziót nem kezeli.


## 3.5. Verseny / kvázi-monopólium / GVH – a válasz állít, de nem igazol
A kérdések 5–6 kifejezetten a kvázi-monopólium elkerülésére és a GVH vizsgálatára kérdeznek.
A válasz azt mondja:
- a jogszabály nem ír elő többszereplős modellt,
- „nem merül fel az erőfölénnyel való visszaélés kérdése sem”.   

De **nem válaszolja meg**, hogy:
- történt-e GVH-vizsgálat (igen/nem, mikor, milyen tárgyban),
- milyen kormányzati vagy hatósági lépések vannak a piacnyitásra,
- milyen garanciák védik a hozzáférést/semlegességet.

**Következtetés:** a válasz a versenyjogi aggályt inkább „lezárja”, semmint megválaszolja. A „nem kötelező a többszereplő” állítás **nem azonos** azzal, hogy a rendszer ne okozna de facto egycsatornás kényszert (ezt itt csak logikai szinten rögzítem, nem minősítésként).


## 3.6. Adatkoncentráció / nemzetbiztonsági kockázat – részválasz, vitatható alapállítással
A válasz szerint nincs adatkoncentráció, mert csak fiat- és kripto-kripto váltás jelenik meg a vizsgálandók között.

Az ÁSZF ugyanakkor rögzíti, hogy a Validátor a Megrendelőtől (természetes személynél is) kezel bizonyos személyes adatokat (név, lakcím, e-mail, számlázási adatok).   
Továbbá a Validátor a Portál működésében naplózást/audit trailt is említ.   

**Következtetés:** a „nem minden tranzakció” érv **nem cáfolja automatikusan** a koncentrációs aggályt azon ügyletkörben, amelyre a validáció kötelező, és nem tér ki arra sem, hogy a Portál-operációból milyen metaadat-koncentráció keletkezhet. A válasz tehát itt inkább **szűkítő értelmezéssel** hárítja a kérdést, de nem kezeli a kockázati logikát.



## 3.7. Büntetőjogi rész: célmagyarázat van, gyakorlati megfelelési útmutató nincs
A 3. kérdés kifejezetten átmeneti iránymutatást kér a Btk.-felelősség elkerülésére.
A válasz ehelyett azt hangsúlyozza, hogy a bűncselekmény csak szándékosan követhető el, és a cél nem a jogszerű MiCA-s szolgáltatás kriminalizálása, hanem a tudatos megkerülés szankcionálása.   

**Következtetés:** ez **nem ugyanaz**, mint egy gyakorlati megfelelési „átmeneti térkép” (milyen lépésekkel, milyen dokumentálással, milyen kivételekkel kerülhető el a kockázat addig, amíg a rendszer nem éri el a kívánt működőképességet). Így a 3. kérdés érdemi, operatív része megválaszolatlan marad.


# 4) Kiemelt megállapítások és javasolt további tisztázó kérdések

### A) Megválaszolatlan „igen/nem + mikor + milyen dokumentum” típusú kérdések
- Lesz-e moratórium (kormányrendelet) a gyakorlati feltételek biztosításáig?   
- Mikor ad ki az SZTFH részletes gyakorlati útmutatót (nem az ÁSZF-et, hanem a normatív megfelelési elvárásokat)?   
- Volt-e GVH-vizsgálat? Ha igen: tárgy, időpont, megállapítás; ha nem: miért nem?   
- Milyen SZTFH kapacitásvizsgálat történt (módszertan, feltételezett ügyletszám, stresszteszt)?   

### B) „Kapacitás nehezen értelmezhető” vs ÁSZF-ben rögzített kapacitáskezelés
- Hogyan egyeztethető össze a miniszteri állítás a rate-limit / korlátozás / felfüggesztés ÁSZF-eseteivel?   

### C) Hozzáférés és semlegesség
- A Validátor mérlegelési kategóriái („jóhírnév/érdek/rendszerbiztonság veszélyeztetése”) milyen objektív eljárásrenddel és jogorvoslati csatornával párosulnak?   


## Részletes elemzés 

::: details  Részletes elemzés (kibontva)

# Varju László képviselő kérdésének és dr. Fónagy János válaszának összehasonlító elemzése

## 1. A nyolc kérdés megválaszoltsága a miniszteri válaszban

Az írásbeli kérdés nyolc tételes pontból állt. Megvizsgálva dr. Fónagy János 2026. január 27-i válaszát, megállapítható, hogy az nem külön-külön reagál minden pontra, hanem összefoglalóan, egybefüggő szövegben igyekszik lefedni a felvetéseket. Ennek eredményeként több kérdésre csak közvetett vagy hiányos választ adott:

### 1.1 Moratórium bevezetése (1. pont)

A képviselő rákérdezett, tervez-e a Kormány moratóriumot a szabályozás végrehajtására addig, amíg több validáló szolgáltató nincs jelen és részletes útmutató nem áll rendelkezésre. A válasz nem említi sem a moratórium lehetőségét, sem kormányrendelet kiadását e tárgyban. Ebből arra lehet következtetni, hogy a Kormány nem tervezi a moratóriumot – ezt azonban a válaszadó egyáltalán nem fejtette ki, így az 1. kérdés érdemi megválaszolatlan maradt.

### 1.2 Részletes útmutató közzététele (2. pont)

A kérdés azt firtatta, mikor jelenik meg az SZTFH részletes, gyakorlati útmutatója a validáló szolgáltató tevékenységéről. A miniszteri válasz erre közvetetten utal: megjegyzi, hogy a 10/2025. (X. 27.) SZTFH rendelet „részletes iránymutatása” elérhető az SZTFH honlapján. Azonban nem derül ki egyértelműen, hogy ez valóban egy közérthető gyakorlati útmutató-e, vagy csupán a jogszabály szövege. A kérdés szerinti „nyilvános, részletes és gyakorlati útmutató” megléte így továbbra is bizonytalan. A válasz ezen túl a validálási feladat részletes leírását azzal hárítja el, hogy „egyrészt többféle technológiai modell lehetséges, másrészt ezek eljárási modelljei üzleti titok részét képezik”. Vagyis a válasz lényegében elismeri, hogy részletes nyilvános eljárásleírás jelenleg sincs, de ezt a technológiai sokféleséggel és üzleti titokkal indokolja.

### 1.3 Átmeneti iránymutatás a büntetőjogi felelősség elkerülésére (3. pont)

A kérdés felvetette, ad-e ki az SZTFH ideiglenes útmutatót arra, miként kerülhetik el az állampolgárok és szolgáltatók a Btk. szerinti felelősséget addig is, amíg nincs több validátor és működőképes rendszer. A válasz nem utal konkrétan semmilyen átmeneti iránymutatásra. Csupán annyit rögzít, hogy a büntetőjogi rendelkezések célja nem a MiCA szerinti jogszerű szolgáltatások kriminalizálása, hanem a tudatos visszaélések szankcionálása, különösen pénzmosás vagy terrorizmus-finanszírozás esetén. Bár ez a magyarázat érzékelteti a jogalkotói szándékot, nem nyújt gyakorlati útmutatót a jogkövető szereplőknek, hogyan járjanak el a gyakorlatban a felelősség elkerülése érdekében, amíg a rendszer nem stabil.

### 1.4 További validátorok bevonása és a folyamat üzembiztonsága (4. pont)

A képviselő kérdezte, milyen intézkedéseket tervez a Kormány annak érdekében, hogy több, megfelelő kapacitású szereplő jelenjen meg a validálási piacon, biztosítva a folyamat folyamatosságát (pl. hiba esetén) és a versenysemlegességet, beleértve politikailag független szereplők megjelenését. Erre a válaszban nincs konkrét intézkedési terv. A miniszteri válasz ehelyett azt hangsúlyozza, hogy a jogszabály „a validáló szolgáltató tekintetében nem ír elő többszereplős modellt”, és hogy a tevékenység speciális jellegéből fakadóan nem merül fel erőfölénnyel való visszaélés kérdése. Más szóval, a válasz nem ígéri újabb szolgáltatók bevonását, hanem azt sugallja, hogy egy szolgáltató is elegendő lehet. Nem esik szó arról sem, hogyan biztosítják a folyamat folyamatosságát egyetlen engedélyezett szolgáltató esetén – a képviselő által említett műszaki hiba vagy kapacitásprobléma eshetőségét a válasz egyszerűen „nehezen értelmezhetőnek” minősíti, amivel tulajdonképpen elutasítja a probléma létezését.

### 1.5 A kvázi-monopólium elkerülése (5. pont)

A kérdés rákérdezett, hogyan garantálja a Kormány, hogy a validáló szolgáltató intézménye ne vezessen egy államilag létrehozott vagy fenntartott kvázi-monopóliumhoz ezen a piacon. A válasz nem ad érdemi garanciát erre. A miniszterhelyettes annyit közöl, hogy a jogszabály speciális jellege miatt nem ír elő több szolgáltatót, és ezért „nem merül fel az erőfölénnyel való visszaélés kérdése sem”. Ez gyakorlatilag azt jelenti, hogy a Kormány nem tekinti problémának az egy szolgáltatóra épülő modellt. Arról, hogy miként kerülik el a monopolhelyzetet vagy milyen versenysemleges intézkedéseket tennének, nincs külön válasz. A kérdésben kiemelt versenyjogi aggály (kvázi-monopólium egy alapvető vagyoni jogokat érintő piacon) tehát nincs feloldva; a válasz pusztán tagadja a probléma fennállását, de indoklást alig nyújt.

### 1.6 GVH versenyfelügyeleti vizsgálata (6. pont)

A képviselő kérdezte, vizsgálta-e a Gazdasági Versenyhivatal (GVH), hogy az egyetlen engedélyezett validátorra épülő rendszer sérti-e a versenyt vagy okoz-e erőfölénnyel visszaélést. A válasz közvetve sem utal arra, hogy bármilyen versenyhatósági vizsgálat történt volna. Az erre vonatkozó kérdést a válaszadó meg sem említi külön, hanem saját hatáskörben kijelenti, hogy erőfölénnyel visszaélés nem merül fel. Ez azt sugallja, hogy a GVH-tól nem kérték ki az ügyben állásfoglalást, és a minisztérium önmaga minősítette a helyzetet versenyjogilag problémamentesnek – ami azonban nem egyenértékű egy független versenyhatósági elemzéssel.

### 1.7 Kapacitásvizsgálat (7. pont)

A kérdés rákérdezett, végzett-e az SZTFH bármilyen kapacitásvizsgálatot annak megállapítására, hogy az egyetlen engedélyezett validáló szolgáltató képes-e több százezer potenciális ügyfél egyidejű kiszolgálására. A válasz nem számol be konkrét kapacitásvizsgálatról. Sőt, arra utal, hogy a kapacitáskorlát felvetése „nehezen értelmezhető”, mivel nem minden kriptotranzakció esik a validálás hatálya alá, csak a pénzre vagy más kriptoeszközre történő átváltás. Ezzel a miniszteri válasz lényegében félresöpri a kapacitásprobléma lehetőségét, de nem hivatkozik semmilyen tényadatokra vagy tanulmányra, ami alátámasztaná, hogy a jelenlegi egy szolgáltató elegendő kapacitással bír. Nincs utalás arra, hogy az SZTFH vizsgálta volna a szolgáltató terhelhetőségét vagy teljesítőképességét – pedig a kérdés konkrétan erre vonatkozott.

### 1.8 Nemzetbiztonsági kockázat (8. pont)

Végül a kérdés arról érdeklődött, vizsgálták-e, hogy nem vet-e fel nemzetbiztonsági kockázatot a kriptotranzakciókhoz kötődő, érzékeny személyes és pénzügyi adatok egy kézben való koncentrálása. A válasz röviden és áttételesen érinti ezt: azt állítja, hogy „kriptotranzakciók tekintetében nem beszélhetünk adatok koncentrálódásáról, mivel nem minden tranzakció jelenik meg a vizsgálandók között, csak a pénzre... és a más kriptoeszközre váltás”. Vagyis a minisztérium szerint nem keletkezik olyan mértékű adatkoncentráció, ami nemzetbiztonsági kockázatot jelenthetne, hiszen csak az átváltási tranzakciók adatait gyűjtik be. Arra azonban nem tér ki, hogy ezt a kérdést bármilyen nemzetbiztonsági szerv megvizsgálta-e, és nem ismertet semmilyen elemzést erről. A válasz tehát saját állítására szorítkozik, miszerint a probléma nem valós – anélkül, hogy a kérdésben jelzett kockázatot érdemben elemezné.

Összességében látható, hogy a miniszteri válasz nem válaszolta meg tételesen mind a nyolc kérdést, és ahol érintette is a témákat, gyakran elutasító vagy általános állításokkal élt konkrét tervek, vizsgálatok vagy intézkedések ismertetése helyett. Ez a megközelítés megnehezíti a válasz számonkérhetőségét, hiszen a képviselő által felvetett problémákat több ponton egyszerűen letagadja vagy bagatellizálja, nem pedig orvosolja vagy részletesen megmagyarázza.

## 2. A válasz logikai koherenciája, szakmai és jogi megalapozottsága

A miniszteri válasz tartalmi vizsgálatakor felmerül, hogy logikai következetessége és megalapozottsága több szempontból kifogásolható. A válasz egy viszonylag rövid, tömör szöveggel próbálta lezárni a komplex kérdéssort, ami néhány ellentmondást és hiányosságot eredményezett:

### 2.1 Érvelés a részletes útmutató hiányára

A válasz indoka arra, hogy miért nincs nyilvános, részletes leírás a validálás folyamatáról, az, hogy “többféle technológiai modell lehetséges” és az eljárási modellek üzleti titkot képeznek. Ez az érv szakmailag problémás. Ha a szolgáltatás igénybevételének jogkövető módja nem világos a felhasználók számára, akkor a jogbiztonság sérül. Egy, a jogalkalmazók számára is érthető eljárásrend közérdek lenne. Az „üzleti titokra” hivatkozás pedig azt jelenti, hogy a szolgáltató egyedi módszertana titkos – ugyanakkor a jogalkotó feladata lenne legalább minimális transzparenciát előírni. Jelenleg az egyetlen biztos támpont az ügyfelek számára a Caduceus Zrt. által közzétett Általános Szerződési Feltételek (ÁSZF), amely igyekszik „átlátható, pontos... módon rögzíteni, hogy a Validátor milyen tevékenységet végez, annak mi a jogi és technikai tartalma, [és] milyen eljárási rendben látja el a feladatait”. Az ÁSZF azonban egy magáncég dokumentuma; jogi erejét tekintve nem pótolja a hatósági útmutatót. Így a válasz azon logikája, hogy nem szükséges részletes nyilvános útmutató, megalapozatlan, hiszen maga a kérdés is arra utal, hogy a jogalkalmazók bizonytalanok a teendőkben. A technológiai sokféleség nem zárja ki egy olyan általános protokoll ismertetését, amelyet minden validátor köteles követni – feltéve, hogy a jogalkotó definiálta a minimumkövetelményeket. Itt éppen ennek hiánya a probléma.

### 2.2 A “speciális jelleg” érvelése

A válasz központi eleme, hogy a kriptoeszköz-átváltást validáló szolgáltatás speciális jellegére hivatkozik minden kritika leszerelésére. E speciális jelleg okán – állítja a válasz – nem kötelező több szereplő engedélyezése, és nem merül fel erőfölénnyel visszaélés sem. Ez az érvelés logikailag gyenge, mivel nem fejti ki, mi teszi e szolgáltatást annyira egyedivé, hogy a versenyjogi alapelvek ne lennének rá érvényesek. A versenysemlegesség és az erőfölénnyel való visszaélés tilalma általános elvek, melyek alól egy piac “speciális” volta önmagában nem felmentés. Ráadásul a válasz maga utal arra, hogy a szabályozás célja Magyarország versenyképességének javítása volt, ami ellentmondásban áll azzal, hogy a gyakorlati hatás jelentős piaci szereplők kivonulása lett. Tehát a válasz érvelése belső ellentmondást hordoz: versenyképesség-növelésre hivatkozik, miközben a kialakult helyzet versenyszűkítő (monopolisztikus) jellegét egyszerűen különlegességre hivatkozva tagadja.

### 2.3 A kapacitásprobléma bagatellizálása

A képviselő konkrét aggodalma volt, hogy egy esetleges műszaki hiba, szolgáltatáskiesés vagy kapacitáskorlát esetén a rendszer összeomlik, hiszen csak egyetlen szolgáltató létezik. A válasz erre mindössze annyit reagál, hogy mivel nem minden tranzakció tartozik a validáció hatálya alá (csak a pénzre vagy más kriptóra váltás), a kapacitáskorlát „nehezen értelmezhető”. Ez azonban nem valódi megoldás vagy cáfolat. Tény ugyanakkor, hogy a szabályozás a kriptoeszköz-átváltások körében **általánosan releváns kötelezettségeket** állapít meg, és az, hogy az adott ügyletnél pontosan milyen eljárás és megfelelési követelmény alkalmazandó, **értékhatártól (és kivételektől) függően** változik. Emiatt önmagában abból, hogy bizonyos ügyletek más megítélés alá esnek, nem következik, hogy a terhelés kapacitásszempontból érdemben elhanyagolható lenne. Ugyanakkor a piacon lévő potenciális érintettek száma így is jelentős (becslések szerint ~500 ezer fő), és ha bármelyikük egy adott időszakban nagy értékű váltást kezdeményez, azt egyetlen cégnek kell lebonyolítania. A válasz nem szolgál semmilyen adattal vagy tanulmánnyal arra nézve, hogy a Caduceus Zrt. rendelkezik-e megfelelő technikai infrastruktúrával és emberi erőforrással akár több ezer egyidejű vizsgálat elvégzésére ésszerű időn belül. A jogszabály ugyan előírja, hogy a validálást ésszerű időn belül el kell végezni, de ennek betartása kapacitásfüggő. A miniszteri válasz tehát logikailag kihagy egy lépést: abból a premisszából, hogy nem minden tranzakció érintett, nem következik, hogy a valóban érintett tranzakciók kiszolgálására elegendő egy szolgáltató. Ennek alátámasztására további elemzés vagy kapacitásteszt kellett volna, amit azonban nem ismertet.

### 2.4 A büntetőjogi felelősség értelmezése

A válasz utolsó része a büntetőjogi szabályozás célját tisztázza: eszerint nem a MiCA-kompatibilis jogkövető szolgáltatók kriminalizálása a cél, hanem a tudatos szabálysértők büntetése, különös tekintettel a pénzmosásra és terrorfinanszírozásra. Ez a megállapítás önmagában helytálló lehet – összhangban van azzal, hogy a Btk. új tényállásai a jogosulatlan kriptoeszköz-átváltási szolgáltatásra vonatkoznak, vagyis arra, ha valaki a validálási kötelezettséget megszegve végez váltást. Ugyanakkor a képviselő kérdése éppen arra irányult, hogy a jogalkalmazók jelenleg nincsenek tisztában vele, mit kell tenniük a büntetőjogi felelősség elkerüléséhez a gyakorlatban, amíg a rendszer nem működik olajozottan. Erre a válasz nem ad gyakorlati kapaszkodót – például, hogy a hatóság türelmi időt alkalmaz-e vagy tervez-e kiadni tájékoztatót arról, hogyan járjanak el az átmeneti időszakban az érintettek. A válasz logikájában tehát van egy rés: elvi síkon megnyugtatja a jogkövetőket, hogy nem ők a célpontok, de nem reagál arra a gyakorlati felvetésre, hogy addig is, amíg nem tisztázódik minden részletszabály, hogyan lehet biztosan eleget tenni a kötelezettségeknek. Ez jogbizonytalanságot eredményezhet, hiszen egy szolgáltató vagy felhasználó sem lehet biztos benne, hogy utólag nem minősítik az eljárását szabálykerülésnek.

Összességében a miniszteri válasz koherenciája gyenge. Gyakori érvelési sémája, hogy tagadja a problémák létezését (pl. "nem merül fel" az erőfölény kérdése, "nehezen értelmezhető" a kapacitáskorlát), ahelyett hogy alátámasztaná, miért nem valósak az aggodalmak. Ahol pedig elismeri a problémát (pl. részletes eljárási útmutató hiánya), ott kibúvót keres az üzleti titokra hivatkozással. A válasz nem hivatkozik konkrét jogi elemzésekre, szakértői véleményekre vagy adatokra – többnyire önmagát igazoló kijelentések sorozata. Ez a megközelítés sem jogi, sem technikai szempontból nem meggyőzően alátámasztott, és logikai ugrásokkal, illetve csúsztatásokkal terhelt.

## 3. A válasz illeszkedése a magyar és uniós jogszabályi környezetbe

Fontos megvizsgálni, hogy a miniszteri válaszban foglaltak mennyire vannak összhangban a hatályos magyar és EU-s jogi környezettel, különös tekintettel a hivatkozott jogszabályokra: a 2025. évi LXVII. törvényre (amely a 2024. évi VII. törvényt módosította, ezt gyakran Kriptotörvénynek nevezik), a vonatkozó SZTFH rendeletre, valamint az uniós MiCA rendeletre.

A jogszabályi változtatások összefoglalása: A válasz helyesen utal arra, hogy a 2025. évi LXVII. törvény módosította a 2024. évi VII. törvényt, és új szabályokat alkotott a kriptoeszközök piacán. Ebből fakadóan került bevezetésre a “kriptoeszköz-átváltást validáló szolgáltató” intézménye a magyar jogba. A törvény kimondja, hogy ilyen validálási szolgáltatást csak engedéllyel rendelkező jogi személy nyújthat. A válasz által hivatkozott SZTFH rendelet (10/2025. (X.27.)) valóban a részletes engedélyezési és nyilvántartási szabályokat tartalmazza. A válasz megemlíti, hogy e rendelethez részletes iránymutatás érhető el az SZTFH honlapján. Ez megfelel a valóságnak annyiban, hogy az SZTFH 2025. decemberében közzétett egy iránymutatást az új szabályok alkalmazásához, mely tisztázza az engedélyezés és működés egyes részleteit. Emellett a Caduceus Zrt. ÁSZF-je is nyilvános, amely tartalmazza a szolgáltatás igénybevételének feltételeit. Ezen a téren a válasz jogilag tehát nem pontatlan: valóban léteznek már szabályozó dokumentumok és feltételek.

Összhang a MiCA rendelettel: Az EU 2023/1114 számú, ún. MiCA rendelete (Markets in Crypto-assets Regulation) közvetlenül alkalmazandó uniós jogszabály, amely a kriptoeszköz-szolgáltatók engedélyezését és működését uniós szinten harmonizálja. A képviselői kérdés is kiemelte, hogy a “validáló szolgáltató” magyar sajátosság, amely sem a MiCA-ban, sem a nemzetközi kriptoszektorban nem ismert konstrukció. A miniszteri válasz erre expliciten nem tér ki, de tartalmából következtethetünk a kormányzati álláspontra: Magyarország a MiCA keretein felül, nem azt sértve, hanem azon túlmenően vezetett be egy extra kontrollmechanizmust az átváltásokra. A válaszból kiderül, hogy szándékosan szigorúbb nemzeti szabályozást alkalmazunk a kripto-átváltásokra, részben pénzmosás/terrorizmusfinanszírozás elleni célzattal. Ez elviekben nem ütközik a MiCA-ba, mert a MiCA nem tiltja a pénzmosás elleni nemzeti intézkedéseket. Ugyanakkor kérdéses az összhang az uniós tőke szabad áramlásának és szolgáltatásnyújtásnak elvével. Azáltal, hogy Magyarország egy plusz engedélyhez és szolgáltatóhoz köti a kriptoátváltásokat, lényegében akadályozta egyes uniós szolgáltatók hazai tevékenységét. A kérdésben is említett példa: több, MiCA alapján EU-ban engedéllyel rendelkező jelentős piaci szereplő kivonult a magyar piacról emiatt. Ez felveti annak lehetőségét, hogy a magyar szabályozás túlterjeszkedik a harmonizált kereteken. A MiCA ugyan még friss és a gyakorlatban kevéssé kikristályosodott, de a válaszban említett kormányzati cél – miszerint a büntetőjogi fenyegetés nem a MiCA szerinti jogszerű szolgáltatást célozza – azt jelzi, hogy a jogalkotó igyekezett formailag összhangban tartani az új szabályt a MiCA-val. Például a Btk. új tényállásai is csak a validálási kötelezettség megsértésére és az engedély nélküli szolgáltatásra koncentrálnak, nem általában a kripto-szolgáltatásra. Ennek ellenére a gyakorlati következmények (piacszűkülés, monopolhelyzet) olyan kérdések, melyeknél vizsgálni kell, nem jelent-e burkolt korlátozást a MiCA által lefedett szolgáltatások nyújtására Magyarországon.

A magyar jogszabályi előírások betartása a válaszban: A válasz szerint a jogszabály “nem ír elő többszereplős modellt” a validátoroknál. Ez összhangban van a törvény betűjével: a 2024. évi VII. törvénybe iktatott 12/A. § nem korlátozza a validátorok számát se minimum, se maximum tekintetében – csupán annyit mond ki, hogy az végezhet ilyen szolgáltatást, aki engedélyt kapott. A válasz tehát jogilag igazat mond abban, hogy nincs előírva több szolgáltató kötelező jelenléte. Ugyanakkor a törvény nem is zárja ki több szereplő megjelenését; sőt, a piac nyitott bárki előtt, aki teljesíti az engedély feltételeit. Ezért a jogszabályi környezet valójában versenysemlegesnek készült, hiszen versenyt korlátozó kvótát vagy egyedárusítási jogot nem állapít meg. A gyakorlatban mégis monopolhelyzet alakult ki. Itt merül fel a kérdés, hogy a jogalkotó szándéka vajon az egy szereplős modell volt-e, vagy csak a körülmények alakították így. A válaszból azt lehet kiolvasni, hogy a kormány elégedett az egy szereplős helyzettel, és ezt összeférhetőnek tartja a joggal.

Versenyjogi és fogyasztóvédelmi előírások: A magyar versenytörvény és az EU versenyjoga szerint tilos olyan helyzet fenntartása, ami indokolatlanul korlátozza a versenyt, különösen ha állami beavatkozás okozza azt. A válaszban az szerepel, hogy “nem merül fel az erőfölénnyel való visszaélés kérdése sem”, de ennek alátámasztása hiányzik. A 12/B. § (1) bekezdése a törvényben előírja, hogy a validátor köteles tisztességes, egyértelmű tájékoztatást nyújtani az ügyfeleinek, beleértve az árképzési politikát, amit a honlapján közzé kell tenni. Ez egy fogyasztóvédelmi jellegű előírás, ami a monopolszolgáltató átlátható díjszabását hivatott biztosítani. A Caduceus Zrt. ennek eleget tett azáltal, hogy az ÁSZF-jében részletezi a szolgáltatás díjait és feltételeit. Ám a versenyjogi kontroll ennél tágabb kérdés. Ha csak egy szereplő van, akkor ő de facto erőfölényben van, függetlenül attól, hogy ezt a jog nevesíti-e. Az erőfölénnyel visszaélés tilalmát a magyar versenytörvény és az Európai Unió Működéséről szóló Szerződés 102. cikke is kimondja. A miniszteri válasz nem tér ki arra, hogy a kialakult helyzetet ezen elvek mentén elemezték volna. A képviselő utalt a GVH szerepére, de a válasz ezzel nem foglalkozik. Így jogi szempontból elmondható, hogy a válasz nem illeszti be a szóban forgó intézményt a versenyjogi keretekbe, inkább figyelmen kívül hagyja azokat.

Adatvédelem és nemzetbiztonság: A jogi környezet része az adatvédelmi és adott esetben nemzetbiztonsági szabályozás is. A kérdés arra utalt, hogy a tranzakciókhoz kapcsolódó érzékeny adatok egy kézben (a validátornál) történő koncentrációja kockázatos lehet. A válasz erre úgy reagált, hogy nem minden tranzakció kerül ide, csak az átváltások, tehát nincs általános adatkoncentráció. Ez formálisan igaz: a törvény értelmében a validátor olyan adatokat kezel, amelyeket az ügyféltől kap a konkrét vizsgálathoz (pl. blokklánc címek, tranzakció-hash, stb.), továbbá a saját belső módszertana és külső adatbázisok eredményeit. Minden átváltási megbízáshoz ki kell adnia egy megfelelőségi nyilatkozatot (ha sikeres az azonosítás). Így valóban, csak azokról az ügyfelekről keletkezik adatbázis, akik nagyobb összegű konverziót végeznek. Ugyanakkor adatvédelmi jogszabályok (GDPR) vonatkoznak a validátorra is: a személyes adatokat jogszerűen, célhoz kötötten és minimalizálva kezelheti. A Caduceus ÁSZF-jéből kitűnik, hogy igyekeznek az adatokat biztonságosan kezelni (ISO 27001 követelmények szerinti loggolás stb.). A miniszteri válasz tehát abban nem ellentétes a jogi környezettel, hogy a validálási rendszer nem minden kriptótranzakcióra lát rá. Ám nem tért ki arra, hogy a koncentrált adatbázis (a jelentős értékű kriptováltók listája, tranzakciós előzményekkel) védelmét hogyan garantálják. Nem tudjuk meg a válaszból, hogy léteznek-e speciális nemzetbiztonsági garanciák vagy ellenőrzések a cég felett – holott a cég vezetői, tulajdonosai háttere a sajtóban is szóba került. A jogszabály annyit követel meg, hogy a tulajdonosok és vezetők jó hírnévvel rendelkezzenek, büntetlenek legyenek, és a személyzet is megfelelő szakértelmű legyen. 

Ezek a feltételek formálisan teljesültek az engedélyezéskor. A válasz azonban nem világít rá, hogy a továbbiakban van-e hatósági felügyelet e kényes adatok felett (pl. rendszeres audit, vagy az SZTFH informatikai kontrollja). Így bár a válasz nem megy szembe konkrét jogszabállyal, nem is nyugtat meg afelől, hogy minden kapcsolódó jogi követelmény (versenyjog, adatbiztonság, stb.) megfelelően érvényesül a gyakorlatban.

Összességében elmondható, hogy a miniszteri válasz a szűken vett jogszabályi rendelkezésekkel többnyire összhangban van – idézi és helyesen hivatkozza meg a vonatkozó törvényt és rendeletet. Ugyanakkor a szabályozási célok és a jogszabályok szellemisége tekintetében már kérdéseket vet fel. A válasz ahelyett, hogy a magyar megoldást az uniós keretbe helyezve indokolná (pl. miért volt erre szükség, miben megy túl a MiCA-n, de azzal összeegyeztethető módon), inkább nemzetibb kontextusban marad. A vonatkozó uniós jogi elveket (versenyszabadság, szolgáltatásnyújtás szabadsága) egyáltalán nem említi. Így bár formailag jogszabály-konformnak tűnik a felelet, azt is látni kell, hogy bizonyos jogi kérdéseket nyitva hagy, illetve a jogszabályok által nem rendezett területeken (pl. egy szolgáltató dominanciája) saját – vitatható – értelmezést ad.

## 4. A validáló szolgáltató ügyfélválasztási jogköre és versenyjogi/jogbiztonsági aggályok

Kiemelten fontos szempontként merült fel, hogy a validáló szolgáltató saját hatáskörben, ismeretlen eljárás alapján választhat-e ügyfelet, és hogy ez összeegyeztethető-e a versenyjoggal és a jogbiztonság elvével. Mivel jelenleg egyetlen engedélyezett validátor van (Caduceus Zrt.), az gyakorlatilag kapuőr szerepet tölt be a legális kripto-átváltások piacán. 

Ennek következményei:

### 4.1 Diszkrecionális ügyfélkiválasztás lehetősége

Jelenleg sem törvény, sem rendelet nem tartalmaz kifejezett előírást arra, hogy a validálónak minden jelentkező ügyfelet el kell fogadnia vagy hogy milyen alapon utasíthat el szolgáltatási kérelmet. A 2024. évi VII. törvény csak annyit mond ki, hogy a validátor köteles tisztességes tájékoztatást adni az ügyfeleinek, de nem szól az ügyfélkör korlátozásáról vagy a szolgáltatásra való jogosultságról. A Caduceus Zrt. ÁSZF-je rendelkezik a szerződéskötés és -megszűnés feltételeiről. Ebből kiderül, hogy a validátor és az ügyfél szerződéses viszonyba lép, pl. a természetes személy ügyfélnek regisztrálnia kell a Validációs Portálon és nyilatkoznia kell arról, hogy jogosult szerződni, nem használja jogellenes célra a szolgáltatást stb.. Nincs benne olyan kitétel, hogy a cég bármely regisztrálót automatikusan elfogad – de olyan sincs, hogy fenntartja az elutasítás jogát bármilyen alapon. A valós gyakorlatról egyelőre keveset tudunk, hiszen a rendszer friss. Mindazonáltal az ÁSZF egyértelműen kimondja, hogy mind a Megrendelő, mind a Validátor bármikor, indokolás nélkül felmondhatja a szerződést 30 napos felmondási idővel. Ez azt jelenti, hogy a Validátor önkényesen megszüntetheti egy ügyféllel a viszonyt, anélkül hogy jogszabályt sértene – csupán be kell tartania a szerződéses felmondási időt. Ez a jogkör versenyjogi és jogbiztonsági szempontból is aggodalomra ad okot: ha egyetlen cég dönthet úgy, hogy bizonyos ügyfeleket (pl. egy kriptotőzsdét vagy brókercéget) nem szolgál ki tovább, azzal ellehetetlenítheti annak piaci működését Magyarországon, hiszen alternatív validátor híján az adott szolgáltató nem tud törvényesen kriptováltást végezni.

### 4.2 Versenyjogi aggály – essential facility doktrína

A versenyjogban ismert az ún. essential facility (lényeges erőforrás) doktrína, miszerint ha egy vállalkozás birtokol egy nélkülözhetetlen erőforrást, amelyhez versenytársainak hozzáférés kell a piacon maradáshoz, akkor az erőforrás indokolatlan megtagadása erőfölénnyel való visszaélést valósíthat meg. Jelen esetben a validálási szolgáltatás egy jogilag nélkülözhetetlen erőforrás minden kripto-szolgáltató számára, aki 5 millió Ft feletti átváltást akar ügyfelei számára lebonyolítani. Ha a monopolszereplő ezt megtagadja, az a másik szolgáltató kiszorítását jelenti. A GVH vizsgálatának hiányában (amire a képviselő rákérdezett, de választ nem kapott) nem tudni, hogy e szempont megjelent-e a hatóság előtt. A miniszteri válaszban az az állítás, hogy a speciális jelleg miatt nem merül fel erőfölényes visszaélés, nem veszi figyelembe ezt a doktrínát. Hiszen éppen a speciális jogi helyzet – hogy a validátor kikerülhetetlen kapuőr – teremti meg az erőfölényt. Jogi értelemben a Caduceus Zrt. gazdasági erőfölényben lévő vállalkozásnak tekinthető a validálási szolgáltatás magyar piacán, még ha e piac mesterségesen létrehozott is. Így rá irányadóak a versenyjogi tilalmak, beleértve a diszkriminatív üzleti magatartás tilalmát is. Jelenleg nincs arra garancia, hogy a validátor nem él vissza azzal a helyzetével, hogy ő diktálhatja a szerződés feltételeit (díjak, határidők, stb.) és akár partner-választási szabadságával korlátozhat másokat. A kormányzati válasz elmulasztotta megnyugtatni a közvéleményt vagy a piac szereplőit afelől, hogy léteznek biztosítékok a visszaélések ellen – például hatósági felügyeleti mechanizmus vagy kötelező indoklási kötelezettség elutasítás esetén. Ilyen előírások hiányában a versenyjogi kockázat valós.


### 4.3 Jogbiztonsági problémák – kiszámíthatatlanság

A jogbiztonság megköveteli, hogy a jogalanyok előre láthassák, milyen feltételek mellett gyakorolhatják jogaikat, végezhetik tevékenységüket. A jelen helyzetben egy kriptoszolgáltató vagy akár egy magánszemély is, aki nagyobb összegű kripto-átváltást szeretne végrehajtani, teljes mértékben rá van utalva egy magáncég szolgáltatására. Ha ez a cég túlterhelt, vagy üzleti okból úgy dönt, hogy bizonyos ügyfelekkel nem köt szerződést, esetleg felmondja a meglévő szerződéseket, akkor az érintett piaci szereplő tehetetlen, mivel nincs alternatíva. A Caduceus ÁSZF-je kimondja, hogy a Megrendelő is bármikor felmondhat, de ez csak elvi lehetőség – valójában nincs hova átmenni, ha valaki elégedetlen a szolgáltatással. A jogbizonytalanságot növeli, hogy nem ismertek az ügyfél-elfogadási kritériumok. Nem tudni például, hogy a validátor vállal-e külföldi székhelyű szolgáltatóktól megbízást, vagy csak magyar entitásoktól (hiszen a kérdés szerint több nagy, uniós engedéllyel bíró szolgáltató elhagyta a piacot, de kérdés, hogy egyáltalán próbáltak-e együttműködni a validátorral). Nincs nyilvános információ arról sem, hogy a validátor milyen sorrendben dolgozza fel a kérelmeket – ha egyszerre sok érkezik, előfordulhat-e, hogy bizonyos tranzakciók teljesítése késedelmet szenved vagy háttérbe szorul. Ezek az ismeretlen tényezők komoly üzleti kockázatot jelentenek bárkinek, aki a magyar piacon kriptoeszköz-szolgáltatást nyújtana vagy akár nagy összegben váltana kriptót. Jogbiztonsági szempontból az volna indokolt, hogy a hatóság világos játékszabályokat alkosson: például előírhatna általános szolgáltatási kötelezettséget a validátor számára (hasonlóan ahhoz, ahogy egy közműszolgáltató nem tagadhatja meg önkényesen a szolgáltatást), vagy legalábbis a megtagadás elfogadható indokait rögzíthetné. A jelenlegi rendszerben ilyen garanciák nincsenek, és a miniszteri válasz erről mélyen hallgat.

### 4.4 Politikai és pártatlansági aggályok

A képviselő utalt rá, hogy nemkívánatos volna, ha csak a kormányhoz köthető szereplők működhetnének ezen a piacon, kizárva a semleges, független szereplőket. A HVG cikke szerint a Caduceus Zrt. tulajdonosi és vezetői köre kormányközeli személyekből áll. Ha a validátor a saját partnereit (esetleg a hozzá közel álló cégeket) előnyben részesítené, másokat pedig hátrányba hozna, az összeférhetetlenségi és versenysemlegességi problémát is felvet. A törvény előírja, hogy a validátor vezessen be összeférhetetlenségi szabályzatot és eljárásokat, ami pozitív elem. Ugyanakkor e szabályzat tartalma nem publikus. A miniszteri válasz itt is bizalmi alapon nyugszik: gyakorlatilag azt sugallja, hogy bízzunk a validátorban, mert a jog speciális jellege miatt nem fog visszaélni a helyzetével. Ez azonban a józan piaci logikával nehezen egyeztethető össze, hiszen piaci erőfölény esetén mindig fennáll a visszaélés kockázata, amit objektív biztosítékokkal (pl. versenyhatósági ellenőrzés, több szereplő jelenléte, szabályozott árak stb.) szokás kezelni. Itt e biztosítékok hiányoznak.

### 4.5 Összefoglalva

jelenleg a validáló szolgáltató lényegében szabadon dönthet az ügyfeleiről – szerződhet bárkivel, de bármikor fel is mondhat, és a feltételeket is ő szabja meg az ÁSZF keretei között. Ez a helyzet komoly versenyjogi aggályokat vet fel, hiszen a cég monopolhelyzete révén a piacra lépést vagy piacon maradást kontrollálni tudja. Emellett jogbizonytalanságot eredményez az ügyfelek számára, akik nem lehetnek biztosak abban, hogy jogosultságaikat folyamatosan gyakorolhatják. A kormányzati válasz sajnos nem adott megnyugtató választ ezekre az aggályokra – sem új belépők ösztönzésével, sem a meglévő szolgáltatóra vonatkozó korlátok vagy kötelezettségek kilátásba helyezésével. Mindez azt jelenti, hogy a validátor diszkrecionális ügyfélválasztási jogköre jelenlegi formájában nincs összhangban a tisztességes verseny és a jogbiztonság követelményeivel.

## 5. További jogértelmezési vagy jogorvoslati igények a válasz nyomán

A miniszteri válaszban foglaltak több olyan elemet is tartalmaznak, illetve mulasztanak el, amelyek további jogértelmezést vagy akár jogorvoslati lépést tehetnek szükségessé. Ezek az alábbiakban foglalhatók össze:

### 5.1 A szabályozás gyakorlati alkalmazásának tisztázása

A válasz megerősítette, hogy jelenleg nincs részletes nyilvános eljárási útmutató, és ennek hiányát üzleti titokra hivatkozva indokolta. Ez azonban nem megoldás az érintettek számára. Továbbra is szükség lenne egy hivatalos tájékoztatóra vagy értelmezésre, amely lépésről lépésre ismerteti a validálási folyamatot, az ügyfelek teendőit, határidőket, kötelezettségeket. A válasz erre nem vállalt kötelezettséget, így a jogalkalmazóknak érdemes kezdeményezniük, hogy az SZTFH vagy az illetékes minisztérium mielőbb adjon ki útmutatót. Ha ez elmarad, az jogértelmezési bizonytalanságot hagy fenn, ami akár bírósági eljárásokhoz is vezethet a jövőben (pl. ha valakit megbüntetnek, de ő vitatja, hogy világos lett volna a szabály).

### 5.2 A büntetőjogi tényállások pontos értelmezése

Ahogyan azt szakértők is jelezték, az új Btk. tényállások (408/A. § és 394/A. §) nem teljesen egyértelműek abban, kit és milyen magatartást szankcionálnak. A válasz ugyan leszögezi, hogy nem a szabályos szolgáltatókat akarják büntetni, de a jogszabály szövegének értelmezése a bíróságokra hárul majd. Felmerül, hogy kell-e további jogszabály-módosítás vagy hivatalos jogértelmezés e tényállásokhoz. Például a 394/A. § (kriptoeszközzel visszaélés) pontos terjedelmét a jogalkalmazóknak tisztázniuk kell, mert nem világos, hogy csak a validálás megkerülését, vagy a MiCA engedély nélküli működést is bünteti. Ha a minisztériumi válasz nem ad teljes iránymutatást, akkor bírói ítéletek vagy a Legfőbb Ügyészség iránymutatása válhat szükségessé a jövőben, hogy a felelősségi körök egyértelműek legyenek.

### 5.3 A versenyhatósági vizsgálat szükségessége

Mivel a válasz nem igazolta, hogy a GVH érdemben foglalkozott volna a kialakult monopolhelyzettel, indokolt lehet a versenyhatóság bevonása. A Gazdasági Versenyhivatal hivatalból vagy panasz alapján vizsgálhatja, hogy a Caduceus Zrt. visszaélt-e erőfölényével vagy a szabályozás okozta piacszűkítés sérti-e a versenyt. A képviselő kérdése is erre utalt, és választ nem kapott. Ha a piac szereplői (pl. kiszorult kriptovállalkozások) sérelmezik a helyzetet, jogorvoslatért fordulhatnak a GVH-hoz vagy akár az Európai Bizottsághoz (utóbbihoz belső piaci korlátozás miatt). A válasz állítása – miszerint nem merül fel erőfölényes visszaélés – nem tekinthető hivatalos versenyjogi értékelésnek. Így ez a terület nyitva marad, és a későbbiekben a hatóságok vizsgálódása várható, különösen, ha a validátorral kapcsolatban panasz érkezik (pl. indokolatlan elutasításról vagy túlzó díjról).

### 5.4 Szabályozás felülvizsgálata – további validátorok engedése

A válaszból kiderül, hogy a kormány egyelőre nem látja szükségét több szereplőnek. Azonban a piaci visszajelzések és a felmerült kritikák fényében érdemes megfontolni a szabályozás korrekcióját. Ha a következő hónapokban sem jelentkeznek újabb szolgáltatók, vagy netán az egyetlen meglévő sem tudná megfelelően ellátni a feladatot, akkor kormányzati oldalról is felmerülhet a jogszabály módosításának igénye. Ez történhet úgy, hogy ösztönzőket nyújtanak új belépőknek (pl. engedélyezési díjak csökkentése, gyorsított eljárás), vagy akár kötelező határidőt szabnak több szolgáltató engedélyezésére. A parlamenti kérdés első pontja a moratóriumot javasolta – ezt a kormány elvetette, de amennyiben a problémák súlyosbodnak (pl. a kriptopiac megbénul), nem zárható ki, hogy átmeneti felfüggesztést vagy halasztást mégis be kell vezetni. Jelenleg a hatályos törvény szerint 2025. december 29-től kötelező a validálás a jelentős (5 millió Ft feletti) tranzakciókra, vagyis a rendszer élesben működik. Ha kiderül, hogy nem működik zökkenőmentesen, a jogalkotón a felelősség a helyzet rendezésére.

### 5.5 Adatbiztonsági és felügyeleti kontroll

A nemzetbiztonsági kockázat kérdését a válasz elintézte annyival, hogy nincs teljes adatkoncentráció. Ennek ellenére szükség lehet további garanciákra. Például felvetődhet, hogy a Caduceus Zrt.-t (vagy bármely jövőbeli validátort) rendszeres audit alá vessék adatbiztonsági és kiberbiztonsági szempontból, hiszen érzékeny adatokkal dolgozik. Az SZTFH vagy más felügyeleti szerv előírhat extra biztosítékokat (pl. titkosítás, behatolás-érzékelés, adatmegőrzési szabályok). Ha ezek már megtörténtek, azokat kommunikálni kellene a nyilvánosság felé a bizalom erősítése érdekében. Ha nem történtek meg, akkor a képviselői aggály nyomán érdemes ezeket pótolni. Jogorvoslati igény is felmerülhet, ha valamely érintett úgy érzi, adatai nem megfelelő védelemben részesülnek – pl. panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH). A miniszteri válasz nem tért ki e dimenzióra, de a helyzet érzékenysége miatt fókuszba kerülhet.

### 5.6 Uniós jogorvoslat lehetősége

Ha a magyar piacról kiszorult szolgáltatók úgy látják, hogy a magyar szabályozás ellentétes az uniós joggal (pl. a szolgáltatásnyújtás szabadságával), akkor közösségi jogorvoslati fórumok is szóba jöhetnek. Egy lehetőség a Bizottság felé történő panasz, ami akár kötelezettségszegési eljáráshoz vezethet, ha megállapítást nyer, hogy Magyarország indokolatlanul korlátozza a MiCA által harmonizált tevékenységek gyakorlását. Egy másik lehetőség, hogy egy bírságolt vagy engedélyt nem kapott piaci szereplő bíróság előtt hivatkozik az uniós jog elsőbbségére. Ezek szélsőséges forgatókönyvek, de a válaszban nem látni nyomát annak, hogy a kormány ezeket előre mérlegelte volna. A helyzet különlegességére való hivatkozás nem feltétlenül fog helytállni egy uniós jogi fórum előtt, ha nem igazolható a szabályok arányossága és szükségessége.

### 5.7 Kommunikáció és bizalom helyreállítása

Végül, bár nem szorosan jogi kategória, de a miniszteri válasz és az azt kiváltó kérdés közti feszültség rámutat a bizalomhiányra a piaci szereplők és a szabályozó/kormány között. A kérdésében Varju László is arra utalt, hogy a piac szereplői bizonytalanságban vannak és bizalomhiány alakult ki (pl. “szakmailag független szereplők” hiánya, kormányközeli emberek előnyben részesítése iránti félelem). A miniszteri válasz stílusa és tartalma sajnos nem törekedett e bizalomhiány enyhítésére – inkább dismisszív volt a kritikákkal szemben. Emiatt további egyeztetések válhatnak szükségessé a kormányzat, a felügyelet és az iparág képviselői között. Jogalkotási vagy jogorvoslati lépések megelőzhetők lennének, ha párbeszéd útján tisztázódnának a kritikus pontok (pl. a validátor szolgáltatási feltételei, a több szereplős piac perspektívája, stb.). A mostani helyzetben azonban, mivel a válasz nem oldotta fel a kételyeket, várhatóan fokozott nyomás marad fenn a szabályozókon, hogy finomítsák a keretrendszert.

Összegzésképpen, a miniszteri választ áttekintve látható, hogy számos terület – a részletszabályok értelmezése, a versenyhelyzet, a kapacitás biztosítása, az adatok kezelése – további figyelmet és esetleges beavatkozást igényel. A válasz hiányosságai miatt a kérdések jelentős része nyitva maradt, ezért elkerülhetetlen a jogértelmezés folytatása (hatósági útmutatók, bírósági ítéletek formájában), illetve nem zárható ki jogorvoslat sem egyes piaci szereplők részéről. A parlamenti ellenőrzés ezzel a válasszal nem ért véget; sőt, újabb impulzust adhat a téma további napirenden tartásához mind jogi, mind politikai fórumokon.

### 5.8 Források

A fenti elemzésben hivatkozott források között szerepel Varju László írásbeli kérdése, dr. Fónagy János miniszteri válasza, a vonatkozó törvények és rendeletek rendelkezései, továbbá a Caduceus Zrt. Általános Szerződési Feltételeinek idevágó részei és szakértői publikációk.

E források egybehangzóan jelzik, hogy a kriptoeszköz-átváltások validálási kötelezettségének bevezetése kapcsán több kérdés vár még megnyugtató rendezésre a jogrend keretein belül.

:::
