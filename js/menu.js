// 1. Variablen deklarieren
const icon = document.querySelector("#icon"); 
const menue = document.querySelector("#menue"); 

// WICHTIG: Hier auf ".nav-link" geändert (passend zu deinem HTML)
const listaItems = document.querySelectorAll(".nav-link"); 

// 2. Funktion: Menü öffnen/schließen (Toggle für das Icon)
function toggleMenu() {
  // Wir entfernen die Media-Query-Abfrage hier, damit es immer funktioniert,
  // wenn das Hamburger-Menü sichtbar ist.
  menue.classList.toggle("einblenden");
  icon.classList.toggle("kreuz");
}

// 3. Funktion: Menü ZWINGEND schließen (für die Links)
function closeMenu() {
    menue.classList.remove("einblenden");
    icon.classList.remove("kreuz");
}

// 4. Event-Listener
icon.addEventListener("click", toggleMenu);

// Hier gehen wir durch alle Links und hängen das "Schließen"-Event an
listaItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
});



mediaQuery.addEventListener("change", handleMediaQuery);


// 6. Scroll-Effekt
window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
  },
  false
);