// Definimos una clase que extiende de HTMLElement para crear un Web Component
class MyElement extends HTMLElement {
  constructor() {
    super(); // Llamamos al constructor de HTMLElement

    // Activamos el Shadow DOM en modo "open" para encapsular estilos y estructura
    this.attachShadow({ mode: "open" });
  }

  // Método que devuelve un template HTML con estructura + estilos internos
  getTemplate() {
    const template = document.createElement("template");

    template.innerHTML = `
      <section>
        <h2 class="title">Hola mundo!</h2>
        <div>
          <p>Soy más texto ejemplo</p>
        </div>
      </section>
      ${this.getStyles()} <!-- Inserta estilos encapsulados -->
    `;

    return template;
  }

  // Método que retorna los estilos internos del componente
  getStyles() {
    return `
      <style>
        h2 {
          color: red; /* Estilo local encapsulado: no afecta el DOM global */
        }
      </style>
    `;
  }

  // Método que renderiza el contenido del componente dentro del shadowRoot
  render() {
    const templateContent = this.getTemplate().content.cloneNode(true);
    this.shadowRoot.appendChild(templateContent);
  }

  // Lifecycle method: se llama automáticamente cuando el elemento entra al DOM
  connectedCallback() {
    this.render();
  }
}

// Registramos el componente personalizado para usarlo como <my-element>
customElements.define("my-element", MyElement);
