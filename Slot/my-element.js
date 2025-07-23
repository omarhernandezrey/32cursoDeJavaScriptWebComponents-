// Definimos una clase personalizada que extiende de HTMLElement (base para cualquier Web Component)
class myElement extends HTMLElement {
  constructor() {
    super(); // Siempre se debe llamar a super() primero en el constructor
    // Creamos el Shadow DOM con modo 'open' (permite acceso externo con .shadowRoot)
    this.attachShadow({ mode: "open" });
  }

  // Método que devuelve la plantilla HTML que usará el componente
  getTemplate() {
    // Creamos un elemento <template> para insertar contenido HTML reutilizable
    const template = document.createElement("template");

    // Definimos el contenido HTML del template, incluyendo los slots
    template.innerHTML = `
      <section>
        <h2>
          <slot name="title"></slot> <!-- El contenido con slot="title" se insertará aquí -->
        </h2>
        <div>
          <p>
            <slot name="parrafo"></slot> <!-- El contenido con slot="parrafo" se insertará aquí -->
          </p>
        </div>
      </section>
      ${this.getStyles()} <!-- Insertamos estilos directamente al final del template -->
    `;
    return template;
  }

  // Método que devuelve los estilos CSS del componente
  getStyles() {
    return `
      <style>
        h2 {
          color: red; /* El título (h2) se mostrará en rojo */
        }
      </style>
    `;
  }

  // Método que inserta el template en el shadow DOM del componente
  render() {
    // Clonamos el contenido del template y lo agregamos al shadow DOM
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  // Este método se ejecuta automáticamente cuando el elemento es insertado en el DOM
  connectedCallback() {
    this.render(); // Llamamos a render() para mostrar el contenido
  }
}

// Registramos el nuevo elemento personalizado con el nombre 'my-element'
customElements.define("my-element", myElement);
