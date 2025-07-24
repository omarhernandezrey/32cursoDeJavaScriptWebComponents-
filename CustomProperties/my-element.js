/**
 * Clase para crear un Web Component personalizado
 * Este componente utiliza Custom Properties (variables CSS) y Shadow DOM
 */
class myElement extends HTMLElement {
  constructor() {
    super();
    // Creamos un Shadow DOM para encapsular los estilos y estructura del componente
    // El modo "open" permite acceder al shadowRoot desde JavaScript externo
    this.attachShadow({ mode: "open" });
  }

  /**
   * Crea y devuelve un template con la estructura HTML del componente
   * @returns {HTMLTemplateElement} Plantilla del componente
   */
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <section>
      <h1> 
        <!-- Slot nombrado para el título -->
        <slot name="title"></slot> 
      </h1>
      <div>
        <p>
          <!-- Slot nombrado para el párrafo -->
          <slot name="parrafo"></slot>
        </p>
      </div>
      <!-- Slot por defecto para cualquier otro contenido -->
      <slot></slot>
    </section>

    ${this.getStyles()}
    `;

    return template;
  }

  /**
   * Define los estilos CSS del componente, incluyendo Custom Properties
   * @returns {string} Estilos CSS como string
   */
  getStyles() {
    return `
      <style>
        /**
         * :host es un selector especial que aplica estilos al elemento principal del componente
         * Aquí definimos las Custom Properties con sus valores por defecto
         * Estas pueden ser sobrescritas desde el exterior
         */
        :host{
          /* Variables de color con valores por defecto */
          --primary-color: tomato;
          --secondary-color: salmon;
          /* Variables de tamaño de texto */
          --heading-primary: 30px;
          --heading-secondary: 25px;
          
          /* Estilos básicos del componente */
          display: inline-block;
          width: 100%;
          min-width: 300px;
          max-width: 450px;
        }

        /* Aplicamos el color primario al fondo de la sección */
        section {
          background: var(--primary-color) /* Uso de la variable CSS */
        }

        /* Aplicamos el color secundario al fondo del div */
        section div {
          background: var(--secondary-color) /* Uso de la variable CSS */
        }

        /* Aplicamos el tamaño de texto primario al título */
        h1 {
          font-size: var(--heading-primary) /* Uso de la variable CSS */
        }

        /* Aplicamos el tamaño de texto secundario al párrafo */
        p {
          font-size: var(--heading-secondary) /* Uso de la variable CSS */
        }
      </style>
    `;
  }

  /**
   * Renderiza el componente agregando el template al Shadow DOM
   */
  render() {
    // Clonamos el contenido del template y lo añadimos al shadowRoot
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando el componente es añadido al DOM
   * Es el momento ideal para inicializar el componente
   */
  connectedCallback() {
    this.render();
  }
}

// Registramos el Web Component con el nombre "my-element"
customElements.define("my-element", myElement);
