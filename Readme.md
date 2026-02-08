# Valid Since Block Zero

Ez a projekt egy **nyílt, dokumentált gyűjtemény**, amelynek célja, hogy **átfogó és közérthető képet adjon** a Magyarországon **2025. június 23-án kihirdetett LXVII. kripto törvény** validációs előírásáról és annak gyakorlati vonatkozásairól.

A fókusz nem jogi tanácsadás, hanem a **tisztánlátás elősegítése**:  
mit ír elő a jogszabály, milyen értelmezések léteznek, és hogyan jelenik meg mindez a gyakorlatban.

---

## A projekt célja

A kriptoeszközökre vonatkozó szabályozás új és összetett terület.  
A validációs kötelezettség kapcsán több kérdés merül fel, mint amennyi egyértelmű válasz jelenleg elérhető.

A projekt célja:
- a releváns kérdések **összegyűjtése és rendszerezése**,
- a hivatalos szervek és érintett szereplők felé intézett megkeresések **áttekinthető dokumentálása**,
- valamint a kapott válaszok **anonimizált, nyilvános közzététele**.

Ezzel a projekt egy **közös tudásbázist** kíván létrehozni, amely segíti a jogszabály értelmezését és a gyakorlati eligazodást.

---

## A tartalom felépítése

A tartalom a VitePress oldal `docs/` könyvtárában él, tematikus mappákba rendezve.

### Fő tartalomtípusok

1. **Kérdések** (`docs/questions/`)
	- rövid, közérthető kérdések a validációs előírás gyakorlati értelmezéséhez

2. **Email / beadvány sablonok** (`docs/templates/`)
	- a kérdésekből kiinduló, testre szabható megkeresések (állásfoglalás-kérés, panasz jellegű beadványok)

3. **Esetek (precedensek)** (`docs/cases/`)
	- anonimizált, valós levelezések/megkeresések dokumentálása és a kapott válaszok

4. **Következtetések / összegzések** (`docs/conclusions/`)
	- több forrásból (hatósági válaszok, nyilvános kommunikáció, piaci reakciók) levezetett, szerkesztett összefoglalók

5. **GYIK** (`docs/faq/`)
	- ismétlődő kérdések rövid, fenntartható karbantarthatóságra optimalizált válaszokkal

### Kiegészítő oldalak

- Általános tájékoztató és működési oldalak: `docs/` (pl. impresszum, moderálás, adatkezelés, cookie)
- Hivatkozásgyűjtemény: `docs/hivatkozasok.md`

### Mellékletek, forrásfájlok

- Dokumentumok és mellékletek katalógusa: `docs/files/catalog.json`
- A VitePress által publikált, statikus fájlok tükre: `public/files/` (a katalógussal szinkronban)

---

## Technikai megvalósítás

A projekt teljes egészében nyílt forráskódú, és statikus módon kerül publikálásra:

- GitHub repository
- GitHub Pages
- VitePress alapú dokumentációs felület

Ez biztosítja az átláthatóságot, a verziókövetést és a hosszú távú hozzáférhetőséget.

### Automatizálás (scripts)

A tartalom karbantartását néhány Node script segíti a `scripts/` mappában, többek között:

- fájlkatalógus építése/frissítése (`build-catalog.mjs`)
- `docs/files/` → `public/files/` szinkronizálása (`sync-public-files.mjs`)
- frontmatter választólisták szinkronja (`sync-frontmatter-choices.mjs`)
- PDF szövegkinyerés támogatás (`extract-pdf-text.mjs`)

---

## Hozzájárulás

A projekt nyitott a közösségi hozzájárulásra.

Új kérdések, pontosítások vagy dokumentált esetek  
**pull request formájában** nyújthatók be.

---

## Jogi nyilatkozat

A projekt **nem minősül jogi tanácsadásnak**.  
A közzétett tartalmak kizárólag tájékoztató jellegűek, és a jogszabályok értelmezése időben változhat.

---

## Miért „Valid Since Block Zero”?

A cím arra az alapvető technikai tényre utal, hogy **a Bitcoin hálózat validációs logikája a kezdetektől — a genesis blokktól — fogva létezik**. Satoshi Nakamoto úgy alkotta meg a rendszert, hogy annak érvényességét nem külső szereplők, hanem a **protokoll szabályai és a decentralizált konszenzus** biztosítják.

A projekt célja, hogy fenti, törvényi előírásban megjelenő hatósági szabályozással kapcsolatban felmerülő kérdéseket **dokumentált, visszakövethető és ellenőrizhető módon** tegye láthatóvá!
