// Creamos un template HTML reutilizable para el componente.
// Incluye estilos y contenido HTML.
const template = document.createElement("template");
template.innerHTML = `
  <style>
    .texto {
      color: red;
    }
    p {
      color: blue;
    }
  </style>
  <p class="texto">Hola mundo 2!!</p>
  <p>Texto ejemplo para la clase!</p>
`;

class MyElement extends HTMLElement {
  constructor() {
    super();

    // Creamos un shadow DOM encapsulado (modo abierto)
    this.attachShadow({ mode: "open" });

    // Creamos un nuevo párrafo desde JavaScript
    this.p = document.createElement("p");
  }

  // Este método se ejecuta automáticamente cuando el componente
  // es insertado en el DOM del documento.
  connectedCallback() {
    // Asignamos contenido al párrafo creado dinámicamente
    this.p.textContent = "Hola mundo!!";

    // Agregamos el párrafo al shadow DOM
    this.shadowRoot.appendChild(this.p);

    // Clonamos y agregamos el contenido del template al shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// Registramos el nuevo elemento personalizado en el navegador
customElements.define("my-element", MyElement);
