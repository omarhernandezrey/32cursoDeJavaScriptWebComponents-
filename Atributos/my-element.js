// Definimos una clase personalizada que extiende de HTMLElement
class myElement extends HTMLElement {
  constructor() {
    super(); // Llama al constructor de HTMLElement

    // Creamos un Shadow DOM para encapsular estilos y estructura
    this.attachShadow({ mode: "open" });

    // Obtenemos los atributos definidos en el HTML
    this.title = this.getAttribute("title");
    this.parrafo = this.getAttribute("parrafo");
    this.img = this.getAttribute("img");
  }

  // Método que genera la plantilla HTML del componente
  getTemplate() {
    const template = document.createElement("template"); // Creamos un template HTML
    template.innerHTML = `
      <section>
        <h2>${this.title}</h2>
        <div>
         <p>${this.parrafo}</p>
         <img src="${this.img}" />
        </div>
      </section>
      ${this.getStyles()} <!-- Agregamos los estilos dentro de la plantilla -->
    `;
    return template;
  }

  // Método que devuelve los estilos en formato <style>
  getStyles() {
    return `
      <style>
        section {
          font-family: sans-serif;
          border: 2px solid #ccc;
          padding: 1rem;
          border-radius: 10px;
        }

        h2 {
          color: red;
        }

        img {
          width: 100%;
          max-width: 300px;
          border-radius: 5px;
        }
      </style>
    `;
  }

  // Método que renderiza el componente en el Shadow DOM
  render() {
    // Clonamos el contenido del template y lo insertamos en el shadow root
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  // Hook que se ejecuta automáticamente cuando el componente se agrega al DOM
  connectedCallback() {
    this.render();
  }
}

// Registramos el custom element con el nombre 'my-element'
customElements.define("my-element", myElement);
