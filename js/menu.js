
const icon = document.querySelector("#icon"); 
const menue = document.querySelector("#menue"); 


const listaItems = document.querySelectorAll(".nav-link"); 


if (icon && menue) {


    function toggleMenu() {
      menue.classList.toggle("einblenden");
      icon.classList.toggle("kreuz");
    }

    function closeMenu() {
        menue.classList.remove("einblenden");
        icon.classList.remove("kreuz");
    }


    icon.addEventListener("click", toggleMenu);

    listaItems.forEach((item) => {
        item.addEventListener("click", closeMenu);
    });
}


window.addEventListener("scroll", () => {

    if(document.body) {
        document.body.style.setProperty(
          "--scroll",
          window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    }
  },
  false
);