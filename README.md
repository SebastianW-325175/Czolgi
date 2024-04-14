# Czolgi
Immersywna gra o czołgach w estetyce retro.
## Wersja v1.1.alpha
Celem tej wersji:
- Refactoring kodu
- Dodanie łatwej konfiguralności sterowania
- Zaimplentowanie podstawowej fizyki czołgu (bezwładność, tarcie, opór)
## Changelog:
- Przepisano od podstaw cały kod Javascript z poprzedniej wersji, aby był szybszy i bardziej czytelny
- Dodano możliwość zmiany sterowania
- Rozdzielono kod na kilka plików
- Dodano działające, animowane drążki sterowania gąsienicami jako element interfejsu
- Zastąpiono sprite'y klawiszy na takie, działające na bazie CSS
- Dodano menu z informacjami Debugowymi
- Dodano funkcję pozwalajacą bardziej efektywne dodawanie prostych elementów interfejsu

WAŻNE: Liniowe podnoszenie RPM'ów, powoduje liniowy wzrost prędkości czołgu. Może da się coś z tym zrobić?
PROBLEM: Nie istnieje siła, która mogłaby spowolnić czołg poruszający się za szybko jak na swoją siłę.