/* =========================================================
   A ROCHA CHUEIRIUM
   SCRIPT.JS
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const aberto = navLinks.classList.contains("active");

        menuButton.textContent = aberto ? "✕" : "☰";

        menuButton.setAttribute(
            "aria-expanded",
            aberto
        );

    });


    /*
     * Fecha o menu depois que o jogador
     * clicar em algum link.
     */

    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   ANIMAÇÃO DOS ELEMENTOS AO ENTRAREM NA TELA
========================================================= */

const elementosAnimados = document.querySelectorAll(
    ".feature-card, " +
    ".race-card, " +
    ".creature-card, " +
    ".team-card, " +
    ".challenge, " +
    ".archmage-card, " +
    ".character-placeholder"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "element-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    elementosAnimados.forEach(elemento => {

        elemento.classList.add(
            "element-hidden"
        );

        observer.observe(elemento);

    });

}


/* =========================================================
   NAVEGAÇÃO SUAVE
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const destino = link.getAttribute("href");

        if (!destino || destino === "#") {
            return;
        }

        const elemento = document.querySelector(destino);

        if (!elemento) {
            return;
        }

        event.preventDefault();

        elemento.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   EFEITO DE BRILHO DO MOUSE
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        const x = event.clientX;
        const y = event.clientY;

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    }
);


/* =========================================================
   PARTÍCULAS MÁGICAS
========================================================= */

const hero = document.querySelector(".hero");


if (hero) {

    const quantidadeParticulas = 25;

    for (
        let i = 0;
        i < quantidadeParticulas;
        i++
    ) {

        const particula =
            document.createElement("span");

        particula.classList.add(
            "magic-particle"
        );

        particula.style.left =
            `${Math.random() * 100}%`;

        particula.style.top =
            `${Math.random() * 100}%`;

        particula.style.animationDelay =
            `${Math.random() * 8}s`;

        particula.style.animationDuration =
            `${5 + Math.random() * 8}s`;

        const tamanho =
            2 + Math.random() * 4;

        particula.style.width =
            `${tamanho}px`;

        particula.style.height =
            `${tamanho}px`;

        hero.appendChild(particula);

    }

}


/* =========================================================
   BOTÃO "CRIAR PERSONAGEM"
========================================================= */

const createCharacterButton =
    document.querySelector(
        "#create-character-button"
    );


if (createCharacterButton) {

    createCharacterButton.addEventListener(
        "click",
        () => {

            mostrarMensagem(
                "A criação do personagem será desbloqueada em breve. ✦",
                "magic"
            );

        }
    );

}


/* =========================================================
   SISTEMA DE NOTIFICAÇÕES
========================================================= */

function mostrarMensagem(
    mensagem,
    tipo = "normal"
) {

    /*
     * Remove notificações antigas.
     */

    const antiga =
        document.querySelector(
            ".magic-notification"
        );

    if (antiga) {
        antiga.remove();
    }


    /*
     * Cria a notificação.
     */

    const notificacao =
        document.createElement("div");

    notificacao.className =
        "magic-notification";


    if (tipo === "magic") {

        notificacao.classList.add(
            "notification-magic"
        );

    }


    notificacao.innerHTML = `
        <span class="notification-symbol">
            ✦
        </span>

        <span class="notification-text">
            ${mensagem}
        </span>

        <button
            class="notification-close"
            aria-label="Fechar"
        >
            ×
        </button>
    `;


    document.body.appendChild(
        notificacao
    );


    /*
     * Pequeno atraso para ativar a animação.
     */

    requestAnimationFrame(() => {

        notificacao.classList.add(
            "notification-visible"
        );

    });


    /*
     * Botão fechar.
     */

    const fechar =
        notificacao.querySelector(
            ".notification-close"
        );

    fechar.addEventListener(
        "click",
        () => {

            fecharNotificacao(
                notificacao
            );

        }
    );


    /*
     * Remove automaticamente.
     */

    setTimeout(() => {

        fecharNotificacao(
            notificacao
        );

    }, 5000);

}


/* =========================================================
   FECHAR NOTIFICAÇÃO
========================================================= */

function fecharNotificacao(
    notificacao
) {

    if (!notificacao) {
        return;
    }

    notificacao.classList.remove(
        "notification-visible"
    );

    setTimeout(() => {

        if (notificacao.parentElement) {

            notificacao.remove();

        }

    }, 400);

}


/* =========================================================
   EFEITO PARALLAX NO HERO
========================================================= */

const heroContent =
    document.querySelector(
        ".hero-content"
    );


if (
    hero &&
    heroContent &&
    window.matchMedia(
        "(min-width: 701px)"
    ).matches
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const moveX =
                (mouseX - centerX) / 80;

            const moveY =
                (mouseY - centerY) / 80;

            heroContent.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroContent.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   EFEITO DE DESTAQUE NAS EQUIPES
========================================================= */

const equipes =
    document.querySelectorAll(
        ".team-card"
    );


equipes.forEach(equipe => {

    equipe.addEventListener(
        "mouseenter",
        () => {

            equipes.forEach(
                outraEquipe => {

                    if (
                        outraEquipe !== equipe
                    ) {

                        outraEquipe.style.opacity =
                            "0.55";

                    }

                }
            );

        }
    );


    equipe.addEventListener(
        "mouseleave",
        () => {

            equipes.forEach(
                outraEquipe => {

                    outraEquipe.style.opacity =
                        "1";

                }
            );

        }
    );

});


/* =========================================================
   RELÓGIO DE INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "✦ A Rocha Chueirium foi carregada."
        );

        console.log(
            "✦ Os portões da academia estão abertos."
        );

    }
);
