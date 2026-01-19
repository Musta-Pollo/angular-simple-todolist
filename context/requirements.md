FE Junior - Angular – jednoduchá To-Do aplikace

Angular – jednoduchá To-Do aplikace (junior)
Vytvořte jednoduchou To-Do aplikaci v nejnovější stabilní verzi Angularu s využitím RxJS.
Aplikace nebude napojená na backend ani databázi – data budou řešena in-memory (např.
pomocí Angular service).

Technické požadavky
Angular (nejnovější stabilní verze)
Angular CLI
RxJS (Observable, reaktivní práce se stavem)
Bez backendu / bez databáze
Stav aplikace řešen přes service (in-memory)

Funkční požadavky
Aplikace musí umožnit:
1. Vytváření úkolů
Úkol má minimálně název ( title )
Název nesmí být prázdný
2. Zobrazení seznamu úkolů
3. Označení úkolu jako dokončeného / nedokončeného
4. Smazání úkolu
5. Data nemusí být perzistentní (obnovením stránky se mohou ztratit)

Architektura
Stav úkolů držte v jedné service
Data do komponent posílejte reaktivně (Observable stream)
Změny stavu řešte přes metody service (např. přidání, smazání, změna stavu)
Struktura komponent je na Vás

FE Junior - Angular – jednoduchá To-Do aplikace – 1

UI
Jednoduché a přehledné
Dokončené úkoly vizuálně odlišené
Ošetřený prázdný stav (žádné úkoly)

Bonus (nepovinné)
Filtrace (vše / aktivní / dokončené)
Editace úkolu
Uložení do LocalStorage
Routing
Unit testy
Použití Angular signals (případně v kombinaci s RxJS)

Odevzdání
Git repozitář (nebo ZIP)
README.md s:
postupem spuštění projektu
stručným popisem řešení
seznamem případných bonusů

Doporučené zdroje
https://angular.dev
https://rxjs.dev
https://angular.dev/cli