// =====================================================
// 1. BASE DE DATOS DE RECETAS ITAL
// =====================================================
const recetasItal = [
    {
        id: 1,
        titulo: "Ital Stew (Guiso Sagrado de la Tierra)",
        categoria: "raices",
        tiempo: "45 min",
        energia: "Enraizamiento y Fuerza Vital",
        descripcion: "Guiso tradicional cocido a fuego lento en leche de coco fresca con tubérculos, calabaza y hierbas aromáticas.",
        ingredientes: [
            "2 tazas de leche de coco natural recién extraída",
            "1 taza de calabaza (zapallo) en cubos",
            "1 camote (batata) morado pelado y troceado",
            "1 taza de espinaca fresca o acelga",
            "2 dientes de ajo machacados, tomillo fresco y jengibre rallado",
            "Pizca de pimienta cayena (sin sal refinada)"
        ],
        preparacion: [
            "Calienta la leche de coco a fuego suave junto con el ajo, jengibre y tomillo para despertar los aromas.",
            "Añade la calabaza y el camote; cocina tapado durante 25 minutos hasta que estén tiernos.",
            "Incorpora las hojas verdes al final durante 5 minutos para conservar su fuerza vital y clorofila."
        ]
    },
    {
        id: 2,
        titulo: "Ensalada Solar de Quinua y Aguacate",
        categoria: "crudo",
        tiempo: "20 min",
        energia: "Claridad Mental y Ligereza",
        descripcion: "Granos andinos germinados o cocidos al vapor combinados con frutos frescos, limón y semillas.",
        ingredientes: [
            "1 taza de quinua real lavada y cocida sin sal",
            "1 aguacate (palta) maduro en láminas",
            "1 mango dulce en cubos pequeños",
            "Hojas de cilantro fresco y menta",
            "Jugo de 2 limones frescos y semillas de calabaza"
        ],
        preparacion: [
            "Deja enfriar la quinua a temperatura ambiente.",
            "Mezcla suavemente con el mango, el aguacate y las hierbas frescas.",
            "Aliña únicamente con jugo de limón recién exprimido y corona con semillas tostadas."
        ]
    },
    {
        id: 3,
        titulo: "Elixir de Raíz de Jengibre, Cúrcuma y Hibisco",
        categoria: "infusiones",
        tiempo: "15 min",
        energia: "Purificación y Vibración Alta",
        descripcion: "Bebida revitalizante conocida en Jamaica como Sorrel, libre de azúcares refinados.",
        ingredientes: [
            "1/2 taza de flores secas de jamaica (hibisco)",
            "1 trozo grande de jengibre fresco machacado",
            "1 cucharadita de cúrcuma fresca rallada",
            "1 litro de agua pura de manantial o filtrada",
            "Dátiles triturados o miel de caña pura al gusto (opcional)"
        ],
        preparacion: [
            "Hierve el agua con el jengibre y la cúrcuma durante 10 minutos.",
            "Apaga el fuego, agrega las flores de hibisco y deja reposar tapado 10 minutos.",
            "Cuela y sirve tibio o frío para revitalizar el cuerpo."
        ]
    },
    {
        id: 4,
        titulo: "Plátano Maduro Asado con Coco y Canela",
        categoria: "raices",
        tiempo: "25 min",
        energia: "Dulzura Natural de la Tierra",
        descripcion: "Postre o desayuno energético aprovechando el dulzor propio de la fruta madura.",
        ingredientes: [
            "2 plátanos machos bien maduros",
            "3 cucharadas de coco rallado natural",
            "1 rama de canela molida",
            "1 cucharadita de aceite de coco virgen"
        ],
        preparacion: [
            "Corta los plátanos a lo largo y úntalos ligeramente con aceite de coco.",
            "Ásalos a la plancha o al horno hasta que caramelicen con su propio azúcar natural.",
            "Espolvorea canela y coco rallado antes de servir."
        ]
    }
];

// Base de datos local de referencia rápida
const productosLocales = [
    {
        nombre: "Quinua Real Orgánica",
        codigo: "777000111",
        estado: "apto",
        etiqueta: "100% Ital — Alimento Vivo",
        razon: "Grano ancestral íntegro, libre de procesamiento industrial, aditivos y sodio añadido."
    },
    {
        nombre: "Lentejas Secas Naturales",
        codigo: "777000222",
        estado: "apto",
        etiqueta: "100% Ital — Alimento de la Tierra",
        razon: "Legumbre pura sin conservantes ni refinamiento."
    },
    {
        nombre: "Hamburguesa de Soya Ultraprocesada",
        codigo: "777000333",
        estado: "precaucion",
        etiqueta: "Vegano, pero NO Ital",
        razon: "Aunque no contiene ingredientes animales, posee aislados proteicos industriales, exceso de sodio refinado y saborizantes."
    },
    {
        nombre: "Refresco de Cola / Gaseosa",
        codigo: "7501055300075",
        estado: "no-apto",
        etiqueta: "No Apto para Dieta Ital",
        razon: "Contiene azúcares refinados, ácido fosfórico, colorantes artificiales y carece de energía vital."
    }
];

// =====================================================
// 2. RENDERIZADO Y FILTRO DE RECETAS
// =====================================================
const recipesGrid = document.getElementById("recipes-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("recipe-modal");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal");

function renderizarRecetas(categoria = "todas") {
    recipesGrid.innerHTML = "";
    const filtradas = categoria === "todas"
        ? recetasItal
        : recetasItal.filter(r => r.categoria === categoria);

    filtradas.forEach(receta => {
        const card = document.createElement("article");
        card.className = "recipe-card";
        card.innerHTML = `
            <div>
                <div class="recipe-meta">${receta.tiempo} • ${receta.energia}</div>
                <h3>${receta.titulo}</h3>
                <p>${receta.descripcion}</p>
            </div>
            <button type="button" class="btn-primary" onclick="abrirReceta(${receta.id})">Ver Preparación</button>
        `;
        recipesGrid.appendChild(card);
    });
}

window.abrirReceta = function(id) {
    const receta = recetasItal.find(r => r.id === id);
    if (!receta) return;

    modalBody.innerHTML = `
        <span class="ital-badge">${receta.energia}</span>
        <h2>${receta.titulo}</h2>
        <p style="margin: 0.5rem 0 1rem; color: var(--text-muted);">${receta.descripcion}</p>
        <h3>Ingredientes Vivos:</h3>
        <ul>${receta.ingredientes.map(i => `<li>${i}</li>`).join("")}</ul>
        <h3>Preparación Consciente:</h3>
        <ol>${receta.preparacion.map(p => `<li>${p}</li>`).join("")}</ol>
    `;
    modal.classList.remove("hidden");
};

closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderizarRecetas(btn.dataset.category);
    });
});

// =====================================================
// 3. VERIFICADOR DE PRODUCTOS Y API OPEN FOOD FACTS
// =====================================================
const productInput = document.getElementById("product-input");
const btnSearch = document.getElementById("btn-search");
const resultPanel = document.getElementById("verification-result");

async function verificarProducto(termino) {
    const query = termino.trim();
    if (!query) return;

    resultPanel.className = "result-panel";
    resultPanel.innerHTML = `<p>Consultando energía y composición del producto...</p>`;
    resultPanel.classList.remove("hidden");

    // 1. Buscar primero en base local
    const localMatch = productosLocales.find(p =>
        p.codigo === query || p.nombre.toLowerCase().includes(query.toLowerCase())
    );

    if (localMatch) {
        mostrarResultado(localMatch.nombre, localMatch.estado, localMatch.etiqueta, localMatch.razon);
        return;
    }

    // 2. Si es un código de barras numérico, consultar Open Food Facts en vivo
    if (/^\d{8,14}$/.test(query)) {
        try {
            const resp = await fetch(`https://world.openfoodfacts.org/api/v0/product/${query}.json`);
            const data = await resp.json();

            if (data.status === 1) {
                evaluarProductoAPI(data.product);
                return;
            }
        } catch (error) {
            console.error("Error consultando API:", error);
        }
    }

    // 3. Si es texto libre, buscar en Open Food Facts por nombre
    try {
        const resp = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=1`);
        const data = await resp.json();

        if (data.products && data.products.length > 0) {
            evaluarProductoAPI(data.products[0]);
        } else {
            mostrarResultado(
                query,
                "precaucion",
                "Producto no registrado",
                "No encontramos este producto en la base de datos. Recuerda la regla de oro Ital: si tiene etiqueta con químicos, conservantes o sal refinada, evítalo; si viene directo de la tierra sin procesar, es bienvenido."
            );
        }
    } catch (error) {
        mostrarResultado(query, "precaucion", "Sin conexión", "No se pudo conectar con la base de datos externa.");
    }
}

function evaluarProductoAPI(prod) {
    const nombre = prod.product_name || "Producto escaneado";
    const novaGroup = prod.nova_group; // 1 = sin procesar, 4 = ultraprocesado
    const ingredientes = (prod.ingredients_text || "").toLowerCase();
    const tags = prod.ingredients_analysis_tags || [];

    const esVegano = tags.includes("en:vegan");
    const noEsVegano = tags.includes("en:non-vegan");
    const tieneAditivos = (prod.additives_tags && prod.additives_tags.length > 0);
    const tieneSalRefinada = ingredientes.includes("sal") || ingredientes.includes("salt") || ingredientes.includes("sodio");

    if (noEsVegano) {
        mostrarResultado(
            nombre,
            "no-apto",
            "No Apto (Origen Animal)",
            "Este producto contiene derivados animales, lo cual va en contra tanto del veganismo como de la filosofía Ital."
        );
    } else if (novaGroup === 4 || tieneAditivos) {
        mostrarResultado(
            nombre,
            "precaucion",
            esVegano ? "Vegano, pero Ultraprocesado (No Ital)" : "Procesado Industrialmente (No Ital)",
            `Contiene aditivos industriales o procesamiento nivel NOVA ${novaGroup || 4}. La dieta Ital prioriza alimentos naturales sin químicos.`
        );
    } else if (tieneSalRefinada) {
        mostrarResultado(
            nombre,
            "precaucion",
            "Precaución: Contiene Sal Añadida",
            "Es un producto vegetal poco procesado, pero incluye sal en su preparación. En la dieta Ital estricto se evita la sal refinada."
        );
    } else {
        mostrarResultado(
            nombre,
            "apto", 
            "Apto para Dieta Ital",
            "Producto natural de origen vegetal, libre de aditivos industriales y ultraprocesamiento."
        );
    }
    
}

function mostrarResultado(nombre, claseEstado, etiqueta, razon) {
    resultPanel.className = `result-panel ${claseEstado}`;
    resultPanel.innerHTML = `
        <span class="status-tag">${etiqueta}</span>
        <h3>${nombre}</h3>
        <p style="margin-top: 0.5rem;">${razon}</p>
    `;
}

btnSearch.addEventListener("click", () => verificarProducto(productInput.value));
productInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") verificarProducto(productInput.value);
});
// =====================================================
// 4. ESCÁNER DE CÓDIGO DE BARRAS NATIVO (CERO LIBRERÍAS)
// =====================================================
const btnToggleCamera = document.getElementById("btn-toggle-camera");
const btnStopCamera = document.getElementById("btn-stop-camera");
const cameraWrapper = document.getElementById("camera-wrapper");
const qrReaderDiv = document.getElementById("qr-reader");

let mediaStream = null;
let scanInterval = null;

function detenerCamara() {
    if (scanInterval) {
        clearInterval(scanInterval);
        scanInterval = null;
    }
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    qrReaderDiv.innerHTML = "";
    cameraWrapper.classList.add("hidden");
    cameraWrapper.style.display = "none";
}

btnStopCamera.addEventListener("click", detenerCamara);

btnToggleCamera.addEventListener("click", async () => {
    if (mediaStream) return;

    cameraWrapper.classList.remove("hidden");
    cameraWrapper.style.display = "block";

    qrReaderDiv.innerHTML = `
        <video id="native-video" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: 8px; background: #000;" autoplay muted playsinline></video>
        <p style="font-size: 0.85rem; margin-top: 6px; color: #555;">Apunta el código de barras bien iluminado frente a la cámara</p>
    `;

    const video = document.getElementById("native-video");

    try {
        // 1. Abrir cámara en alta definición (1280x720) para que las barras se vean nítidas
        mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });

        video.srcObject = mediaStream;
        await video.play();

        // 2. Verificar soporte nativo del navegador
        if (!("BarcodeDetector" in window)) {
            alert("Tu navegador no soporta el lector nativo. Usa Google Chrome o Microsoft Edge.");
            detenerCamara();
            return;
        }

        const detector = new BarcodeDetector({
            formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "qr_code"]
        });

        // 3. Escanear cada 250ms
        scanInterval = setInterval(async () => {
            if (!mediaStream || video.readyState !== video.HAVE_ENOUGH_DATA) return;

            try {
                const barcodes = await detector.detect(video);
                if (barcodes.length > 0) {
                    const codigoLeido = barcodes[0].rawValue;
                    if (navigator.vibrate) navigator.vibrate(100);

                    productInput.value = codigoLeido;
                    detenerCamara();
                    verificarProducto(codigoLeido);
                }
            } catch (e) {
                // Ignorar error de frame individual
            }
        }, 250);

    } catch (err) {
        detenerCamara();
        alert("No se pudo abrir la cámara: " + err.message);
        console.error(err);
    }
});
