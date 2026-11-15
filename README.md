# Odd Form — web

> Train offline. Own your data.

Odd Form som installerbar webapp. Samme skjermer, samme flyt og samme
dataformat som [iOS-appen](https://github.com/OL85-odd/odd-form-ios) — men uten
Xcode, uten byggesteg og uten App Store mellom en endring og telefonen.

## Hvorfor to repoer

| Repo | Rolle |
|---|---|
| `Traning-log` (dette) | Der design og flyt endres. En endring er synlig på telefonen sekunder etter push. |
| `odd-form-ios` | Der det låste designet bygges i SwiftUI og sendes til App Store. |

Arbeidsflyten er: endre her → bruk appen noen dager → når en skjerm sitter,
port den til Swift. Webappen er prototypen, ikke produktet.

## Slik henger det sammen

Ingen rammeverk som må bygges, ingen `node_modules`. Nettleseren laster
filene slik de ligger.

```
index.html              Skallet: meta-tagger og to tomme <div>
css/app.css             All stil. Design-tokens (farger, radius, fonter) øverst
js/main.js              Inngang: de fire fanene + PWA-oppsett

js/core/                Ren logikk — ingen DOM. Kjører og testes i Node
  models.js               Datamodellen og enum-ene
  builtin.js              33 innebygde øvelser + 3 planer
  dates.js                Kalenderregning (det appen bruker av Calendar)
  planResolver.js         Hvilken plandag gjelder en gitt dato
  progression.js          +2,5 % per måned
  progressStats.js        Mål mot faktisk, til grafene
  backup.js               .oddform.json — samme format som iOS
  store.js                All tilstand + lagring

js/ui/                  Skjermene
  common.js               Ark, varsler, ikonflis, ring …
  icons.js                Strekikoner (erstatter SF Symbols)
  today.js  session.js    Today-fanen og aktiv økt
  plan.js                 Plan-fanen: tidslinje og fremdrift
  planPicker.js           Velg / lag / kopier / slett plan
  planEditor.js           Rediger øvelsene på en dag
  library.js              Bibliotek og øvelsesark
  settings.js             Innstillinger, eksport og import

js/vendor/preact-htm.js Preact + htm (13 kB), lagt inn som fil
img/exercises/          Øvelsesikonene, nedskalert fra iOS-repoet
sw.js                   Offline-cache for appfilene
tests/                  Tester for js/core og for sw.js
arkiv/                  Den gamle treningsloggen som lå her før
```

Hver JS-fil har øverst en linje `// Swift: …` som peker på Swift-filen den
tilsvarer. Det er kartet du bruker når en skjerm skal portes tilbake:

| Web | iOS |
|---|---|
| `js/core/store.js` | `Models/AppData.swift` |
| `js/core/models.js` | `Models/*.swift` |
| `js/core/planResolver.js`, `progression.js`, `progressStats.js` | `Services/*.swift` |
| `js/ui/today.js`, `session.js` | `Features/Today/` |
| `js/ui/plan.js`, `planPicker.js`, `planEditor.js` | `Features/Plan/` |
| `js/ui/library.js` | `Features/Library/` |
| `js/ui/settings.js` | `Features/Settings/` |
| `css/app.css` (tokens) | `Shared/Extensions/Color+Theme.swift` |

Komponentene er skrevet med Preact, som ligner SwiftUI i tankegang: en
funksjon tar tilstand inn og gir et view ut. `useState` er `@State`,
`store` er `@Environment(AppData.self)`.

## Kjøre lokalt

```sh
npm start        # http://localhost:5173
npm test         # 24 tester, ingen avhengigheter
```

`npm start` er bare `python3 -m http.server`. Filene må serveres over http —
å åpne `index.html` direkte fra disk virker ikke, fordi nettleseren nekter å
laste JS-moduler fra `file://`.

## Endre design

Nesten alt du vil skru på ligger i de 30 første linjene av `css/app.css`:
farger, hjørneradius, fonter, sidemarg. Resten av fila er delt inn etter
skjerm, i samme rekkefølge som fanene.

## På telefonen

Appen må ligge på en https-adresse. Deretter, i Safari: Del → **Legg til på
Hjem-skjerm**. Den åpner da uten nettleserramme, med eget ikon, og virker uten
nett.

Oppdateringer kommer av seg selv: service workeren spør alltid nettet først
og bruker cachen bare når det ikke svarer. Lukk og åpne appen, så er den ny.

**Dataene** ligger i `localStorage` i nettleseren på den ene telefonen, og
sendes ingen steder. Lagt til på Hjem-skjerm rammes den ikke av Safaris
sju-dagers sletting, men en backup er likevel den eneste kopien du har:
Settings → Export backup.

## Backup mellom web og iOS

Eksporten er iOS-appens `.oddform.json`, felt for felt. To detaljer må
stemme for at Swift skal lese fila, og begge er dekket av tester:

- datoer skrives uten millisekunder (`2026-11-15T08:30:00Z`)
- alle felt som ikke er valgfrie i Swift-structene er alltid med

Web legger til `quickSessions`; iOS-dekoderen hopper over nøkler den ikke
kjenner. Øvelses-ID-ene er de samme på begge plattformer.

Kompatibiliteten er testet mot Swift-structene slik de står i koden, ikke
mot en kjørende iOS-build.

## Bevisste avvik fra iOS-appen

| Web | iOS | Hvorfor |
|---|---|---|
| «…»-knapp på hver plan (Edit / Copy / Delete) | Sveip på raden | Sveip er upålitelig i en nettleser |
| Pro er på fra start; bryter under Settings → Prototype | Pro er av; debug-bryter i utviklerbygg | Ingen StoreKit på web, og backup bør være tilgjengelig |
| En påbegynt økt overlever at appen lastes på nytt | Økta forsvinner hvis appen lukkes | Nettlesere kaster faner oftere enn iOS kaster apper |
| Uka starter alltid mandag | Følger telefonens region | Planmodellen teller 1 = mandag |
| Datoer vises på engelsk | Følger telefonens språk | Resten av appen er på engelsk |

## Funn i iOS-koden

Dukket opp under portingen. Lest ut av koden, ikke verifisert på telefon.
De fem første er rettet i webversjonen; resten er gjengitt slik iOS gjør det,
så du kan vurdere dem som designvalg.

**Rettet her**

1. **Quick session viser feil innhold.** `startQuickSession` lager en dag
   med den ene øvelsen, men `ActiveSessionView` slår opp dagens plan på nytt
   og ignorerer den. På en treningsdag får du hele planen, på en hviledag et
   tomt skjermbilde med tittelen «Rest».
2. **Blank økt-tittel på egne planer.** `blocks.first?.blockName ?? …` faller
   aldri tilbake, fordi navnet er `""` og ikke `nil`.
3. **Desimalkomma mistes.** `Double("42,5")` er `nil`, så vekt tastet på
   norsk tastatur lagres ikke i øktloggen (plan-editoren håndterer det riktig).
4. **Tall tastet etter avhuking lagres ikke.** Et sett logges bare idet du
   trykker på haken.
5. **«Go to Settings →»** når ingen plan er valgt, peker på `EmptyView()`.

**Gjengitt som i iOS**

6. «Short on time» sier at planen er kortet ned til tre øvelser, men ingenting
   kortes ned.
7. Start av økt i dag lager alltid en ny logg. Tidslinja og ukestripa leser
   bare dagens første.
8. Å velge «How do you feel?» lager en tom logg for dagen, og da viser Today
   «Continue session» selv om ingen økt er startet.
9. Tidslinja åpner 14 dager frem i tid; i dag ligger 14 rader ned.
10. Kg-feltet vises for alle øvelser, også planke og løping.
11. Varighet kan ikke legges til en øvelse i editoren — bare reps og vekt.
