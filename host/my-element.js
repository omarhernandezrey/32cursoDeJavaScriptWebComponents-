/**
 * Definición del Web Component personalizado.
 * Extiende de HTMLElement, la clase base para todos los elementos HTML.
 */
class myElement extends HTMLElement {
  /**
   * Constructor del componente.
   * Se ejecuta cuando se crea una instancia del componente.
   */
  constructor() {
    // Siempre hay que llamar a super() primero en el constructor
    super();
    
    // Crea un Shadow DOM para encapsular el contenido del componente
    // mode: "open" permite acceder al shadowRoot desde JavaScript externo
    this.attachShadow({ mode: "open" });
  }
  
  /**
   * Método que crea la estructura HTML del componente usando un template.
   * Usando templates mejora el rendimiento al no crear elementos repetidamente.
   * @returns {HTMLTemplateElement} Template con el HTML y CSS del componente
   */
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <section>
      <h1> 
        <!-- 
          Slot nombrado para el título.
          Los elementos con slot="title" se insertarán aquí.
        -->
        <slot name="title"></slot> 
      </h1>
      <p>
        <!-- 
          Slot nombrado para el párrafo.
          Los elementos con slot="parrafo" se insertarán aquí.
        -->
        <slot name="parrafo"></slot>
      </p>
      <!-- 
        Slot sin nombre (slot por defecto).
        Cualquier contenido sin atributo slot se insertará aquí.
      -->
      <slot></slot>
    </section>

    ${this.getStyles()}
    `;

    return template;
  }
  
  /**
   * Método que define los estilos CSS del componente.
   * Los estilos están encapsulados dentro del Shadow DOM.
   * @returns {string} Cadena con los estilos CSS
   */
  getStyles() {
    return `
      <style>
        /**
         * :host - Selector que aplica estilos al elemento raíz del componente.
         * Estos estilos se aplican por defecto a todas las instancias del componente.
         */
        :host {
          display: inline-block;
          width: 100%;
          min-width: 300px;
          max-width: 450px;
          font-size: 20px;
          background: grey;
        }
        
        /**
         * :host(.clase) - Selector que aplica estilos cuando el componente tiene la clase especificada.
         * En este caso, cambia el fondo a azul cuando se usa <my-element class="blue">
         */
        :host(.blue) {
          background: blue; 
        }
        
        /**
         * :host([atributo]) - Selector que aplica estilos cuando el componente tiene el atributo especificado.
         * En este caso, cambia el fondo a amarillo cuando se usa <my-element yellow>
         */
        :host([yellow]) {
          background: yellow;
        }
        
        /**
         * Combinación de selectores - Aplica estilos a elementos internos cuando el host tiene ciertos atributos.
         * Aquí cambia el color del texto del h1 cuando el componente tiene el atributo yellow.
         */
        :host([yellow]) h1{
          color: grey;
        }
        
        /**
         * Otro ejemplo de combinación de selectores con el host.
         */
        :host([yellow]) p {
          color: red;
        }
        
        /**
         * :host-context(selector) - Aplica estilos al componente cuando está dentro de un elemento que coincide con el selector.
         * En este caso, cambia el display y max-width cuando el componente está dentro de un <article class="card">
         */
        :host-context(article.card) {
          display: block;
          max-width: 100%;
        }
      </style>
    `;
  }
  
  /**
   * Método que renderiza el componente añadiendo el template al Shadow DOM.
   * cloneNode(true) crea una copia profunda del contenido del template.
   */
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  
  /**
   * Ciclo de vida: Se ejecuta cuando el componente se inserta en el DOM.
   * Es el momento ideal para inicializar el componente y hacer la renderización inicial.
   */
  connectedCallback() {
    this.render();
  }
  
  /**
   * Otros métodos del ciclo de vida que no están implementados aquí pero que podrías usar:
   * 
   * disconnectedCallback() - Se ejecuta cuando el componente se elimina del DOM
   * adoptedCallback() - Se ejecuta cuando el componente se mueve a un nuevo documento
   * attributeChangedCallback(name, oldValue, newValue) - Se ejecuta cuando cambia un atributo observado
   * static get observedAttributes() - Define qué atributos se observarán para attributeChangedCallback
   */
}

// Registra el componente personalizado con el navegador
// El primer parámetro es el nombre del tag HTML (debe contener un guion)
// El segundo parámetro es la clase que define el comportamiento del componente
customElements.define("my-element", myElement);
