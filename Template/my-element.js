// Definición del componente personalizado <my-element>
class MyElement extends HTMLElement {
  constructor() {
    super(); // Siempre se llama al constructor de HTMLElement

    // Se recomienda usar Shadow DOM para encapsular estilos
    this.attachShadow({ mode: "open" });
  }

  // Método que retorna el contenido del componente como plantilla HTML
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <h2 class="title">Hola mundo!</h2>
        <div>
          <p>Soy más texto ejemplo</p>
        </div>
      </section>
      ${this.getStyles()}
    `;
    return template;
  }

  // Método que retorna los estilos del componente (encapsulados si se usa Shadow DOM)
  getStyles() {
    return `
      <style>
        h2 {
          color: red;
        }
      </style>
    `;
  }

  // Método que renderiza el contenido del template dentro del shadow DOM
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  // Se ejecuta automáticamente cuando el componente se inserta en el DOM
  connectedCallback() {
    this.render();
  }
}

// Registro del componente personalizado con el nombre <my-element>
customElements.define("my-element", MyElement);
