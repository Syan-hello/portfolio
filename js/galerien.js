
        // Diese Funktion wurde aufgerufen, war aber nicht definiert.
        // Ich habe sie als leere Funktion hinzugefügt, um Fehler zu vermeiden.
        function checkScroll() {
            // Du kannst hier Code hinzufügen, der beim Scrollen ausgeführt werden soll
        }
        window.addEventListener('scroll', checkScroll);
        checkScroll();


        // Alles andere wird ausgeführt, wenn das DOM geladen ist
        document.addEventListener('DOMContentLoaded', function () {
        
            const heroCarouselElement = document.getElementById('heroCarousel');
            const artworkModal = document.getElementById('artworkModal');

            let heroCarouselInstance;
            if (heroCarouselElement) {
                heroCarouselInstance = bootstrap.Carousel.getInstance(heroCarouselElement) || new bootstrap.Carousel(heroCarouselElement);
            }

            // --- HIER IST DIE KORREKTUR ---
            if (artworkModal) {
                
                // Dieser Teil war schon da (Hero-Pause)
                artworkModal.addEventListener('show.bs.modal', function (event) {
                    if(heroCarouselInstance) {
                        heroCarouselInstance.pause();
                    }

                    // --- NEU: MODAL-INHALT FÜLLEN ---
                    
                    // 1. Hole das Element, das geklickt wurde
                    const button = event.relatedTarget; 

                    // 2. Lies die Daten aus den data-Attributen
                    const title = button.getAttribute('data-title');
                    const medium = button.getAttribute('data-medium');
                    const description = button.getAttribute('data-description');
                    let images = [];
                    
                    try {
                        // 3. Wandle den Bild-Text (JSON) in ein Array um
                        images = JSON.parse(button.getAttribute('data-images-carousel'));
                    } catch (e) {
                        console.error("Fehler beim Lesen von data-images-carousel:", e);
                        return; // Bricht ab, wenn die Daten fehlerhaft sind
                    }

                    // 4. Finde die Elemente IM Modal
                    const modalTitle = artworkModal.querySelector('#modalArtworkTitle');
                    const modalMedium = artworkModal.querySelector('#modalArtworkMedium');
                    const modalDescription = artworkModal.querySelector('#modalArtworkDescription');
                    const carouselInner = artworkModal.querySelector('#modalCarouselInner');

                    // 5. Setze die Texte
                    modalTitle.textContent = title;
                    modalMedium.textContent = medium;
                    modalDescription.textContent = description;

                    // 6. Lösche alte Bilder aus dem Modal-Karussell
                    carouselInner.innerHTML = '';
                    // 7. Erstelle die neuen Bilder und füge sie ein
                    images.forEach((src, index) => {
                        // A. Das Item erstellen
                        const carouselItem = document.createElement('div');
                        // WICHTIG: h-100 hinzufügen, damit es die volle Höhe hat
                        carouselItem.classList.add('carousel-item', 'h-100'); 
                        
                        if (index === 0) {
                            carouselItem.classList.add('active'); 
                        }

                        // B. Den Wrapper erstellen (NEU!)
                        // Dieser übernimmt das Zentrieren (Flexbox)
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'h-100');

                        // C. Das Bild erstellen
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = title;
                        
                        // Style direkt setzen oder via CSS-Klasse (.slide-center-wrapper img)
                        // WICHTIG: Kein 'w-100' verwenden, sonst wird es verzerrt/riesig
                        img.style.maxHeight = '75vh';
                        img.style.maxWidth = '75%';
                        img.style.objectFit = 'contain';
                        img.style.boxSadow = '0 0 30px rgba(0,0,0,0.8)'; // Optionaler Schatten
                     
                        
                        // D. Zusammenbauen: Bild -> Wrapper -> Item
                        wrapper.appendChild(img);
                        carouselItem.appendChild(wrapper);
                        
                        // Item in den Slider
                        carouselInner.appendChild(carouselItem);
                    });
                   
                    // --- ENDE DES NEUEN CODES ---
                });

                // Dieser Teil war auch schon da (Hero-Neustart)
                artworkModal.addEventListener('hidden.bs.modal', function () {
                    if(heroCarouselInstance) {
                        heroCarouselInstance.cycle();
                    }
                });
            }


            // DEIN FILTER-CODE (Dieser Teil ist korrekt und bleibt)
            const filterButtons = document.querySelectorAll('#projekte .btn-outline-dark');
            const galleryItems = document.querySelectorAll('#gallery-items .gallery-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    galleryItems.forEach(item => {
                        // "all" ODER die spezifische Klasse wird angezeigt
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

        });


            document.addEventListener('DOMContentLoaded', function() {
                // 1. Alle Filter-Buttons und Galerie-Items holen
                const filterButtons = document.querySelectorAll('[data-filter]');
                const galleryItems = document.querySelectorAll('.gallery-item');

                // 2. Klick-Event für jeden Button hinzufügen
                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        
                        // A. Button "active" Status wechseln (Optik)
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');

                        // B. Den Wert des Filters auslesen (z.B. "webdesign")
                        const filterValue = button.getAttribute('data-filter');

                        // C. Items filtern
                        galleryItems.forEach(item => {
                            // Wenn 'all' gewählt ist ODER das Item die passende Klasse hat
                            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                                item.classList.remove('d-none'); // Zeigen
                                item.classList.add('fade-in');   // Animation starten
                            } else {
                                item.classList.add('d-none');    // Verstecken
                                item.classList.remove('fade-in');
                            }
                        });
                    });
                });
            });
    