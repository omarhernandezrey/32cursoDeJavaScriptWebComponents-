// Definimos una clase que extiende de HTMLElement para crear un Web Component
class myElement extends HTMLElement {
  // Constructor: se ejecuta cuando se crea una nueva instancia del elemento
  constructor() {
    // Llamamos al constructor padre (HTMLElement)
    super();
    
    // Creamos un Shadow DOM para encapsular nuestro contenido y estilos
    // mode: "open" significa que el Shadow DOM es accesible desde JavaScript externo
    this.attachShadow({ mode: "open" });
  }

  // Método estático que define qué atributos queremos observar
  // Cuando estos atributos cambien, se ejecutará attributeChangedCallback
  static get observedAttributes() {
    return ["title", "parrafo", "img"];
  }

  // CALLBACK PRINCIPAL: Se ejecuta cada vez que cambia un atributo observado
  // Parámetros:
  // - attr: nombre del atributo que cambió
  // - oldVal: valor anterior del atributo
  // - newVal: nuevo valor del atributo
  attributeChangedCallback(attr, oldVal, newVal) {
    console.log(`Atributo ${attr} cambió de "${oldVal}" a "${newVal}"`);
    
    // Actualizamos las propiedades internas según el atributo que cambió
    if (attr === "title") {
      this.title = newVal;
    }
    if (attr === "parrafo") {
      this.parrafo = newVal;
    }
    if (attr === "img") {
      this.img = newVal;
    }
    
    // Si el elemento ya está conectado al DOM, re-renderizamos
    if (this.shadowRoot.hasChildNodes()) {
      this.render();
    }
  }

  // Método que crea el template HTML del componente
  getTemplate() {
    const template = document.createElement("template");
    
    // Definimos la estructura HTML usando template literals
    // Usamos las propiedades del componente para mostrar el contenido
    template.innerHTML = `
      <section>
        <h2>${this.title || 'Título por defecto'}</h2>
        <div>
         <p>${this.parrafo || 'Párrafo por defecto'}</p>
         <img src="${this.img || 'https://via.placeholder.com/150'}" alt="Imagen del componente"/>
        </div>
      </section>
      ${this.getStyles()}
    `;
    return template;
  }

  // Método que define los estilos CSS del componente
  // Estos estilos están encapsulados en el Shadow DOM
  getStyles() {
    return `
      <style>
        /* Estilos que solo afectan a este componente */
        section {
          border: 2px solid #333;
          padding: 20px;
          margin: 10px 0;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }
        
        h2 {
          color: red;
          margin-top: 0;
          font-size: 1.5em;
        }
        
        img {
          max-width: 100px;
          height: auto;
          border-radius: 4px;
        }
        
        p {
          color: #666;
          line-height: 1.4;
        }
      </style>
    `;
  }

  // Método que renderiza el componente en el Shadow DOM
  render() {
    // Limpiamos el contenido anterior del Shadow DOM
    this.shadowRoot.innerHTML = '';
    
    // Clonamos el template y lo añadimos al Shadow DOM
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  // Callback del ciclo de vida: se ejecuta cuando el elemento se conecta al DOM
  connectedCallback() {
    console.log('Elemento conectado al DOM');
    this.render();
  }
}

// Registramos el Web Component en el navegador
// Ahora podemos usar <my-element> en cualquier parte del HTML
customElements.define("my-element", myElement);
