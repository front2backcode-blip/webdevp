const loader = document.getElementById("loader");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = [...document.querySelectorAll(".nav__link")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];

window.addEventListener("load", () => {
  window.setTimeout(() => loader.classList.add("is-hidden"), 1700);
});

navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
  document.body.style.overflow = open ? "" : "hidden";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const current = entry.target.id;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`));
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach((item) => revealObserver.observe(item));

document.getElementById("year").textContent = String(new Date().getFullYear());

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");



filterButtons.forEach((button) => {

    button.addEventListener("click", () => {


        // REMOVE ACTIVE CLASS

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        // ADD ACTIVE CLASS

        button.classList.add("active");


        // GET FILTER VALUE

        const filterValue = button.getAttribute("data-filter");



        projectCards.forEach((card) => {


            const category =
                card.getAttribute("data-category");



            // SHOW ALL

            if (filterValue === "all") {

                card.classList.remove("hide");

            }


            // SHOW SELECTED CATEGORY

            else if (category === filterValue) {

                card.classList.remove("hide");

            }


            // HIDE OTHER CARDS

            else {

                card.classList.add("hide");

            }


        });


    });


});