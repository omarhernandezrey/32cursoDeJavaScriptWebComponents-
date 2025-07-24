class myElement extends HTMLElement {
  constructor() {
    super(); // Llamamos al constructor de la clase padre (HTMLElement)
    // Creamos un Shadow DOM y lo adjuntamos a nuestro elemento
    // mode: "open" permite acceder al shadowRoot desde JavaScript externo
    this.attachShadow({ mode: "open" });
  }
  
  getTemplate() {
    // Creamos un elemento template que contendrá nuestra estructura HTML
    const template = document.createElement("template");
    template.innerHTML = `
    <section>
      <h1> 
        <!-- 
          El slot con name="title" recibirá el contenido del elemento 
          que tenga el atributo slot="title" en el HTML
        -->
        <slot name="title"></slot> 
      </h1>
      <p>
        <!-- 
          El slot con name="parrafo" recibirá el contenido del elemento 
          que tenga el atributo slot="parrafo" en el HTML
        -->
        <slot name="parrafo"></slot>
      </p>
      <!-- Un slot sin nombre recibiría cualquier contenido sin atributo slot -->
      <slot></slot>
    </section>

    ${this.getStyles()}
    `;

    return template;
  }
  
  getStyles() {
    return `
      <style>
        /* 
          ::slotted() es un pseudo-elemento que permite estilizar 
          elementos que se proyectan en un slot desde el DOM ligero (light DOM)
          
          Este selector solo afecta a elementos <span> que estén en cualquier slot
          Es importante notar que solo puede seleccionar elementos de nivel superior
          y no elementos anidados dentro de los elementos proyectados
        */
        ::slotted(span) {
          font-size: 30px;
          color: red;
        }
        
        /* 
          También podemos seleccionar por clase: aquí estilizamos cualquier 
          elemento con clase "text" que esté en un slot 
          Este estilo sobreescribirá el anterior para elementos que tengan ambas condiciones
        */
        ::slotted(.text) {
          color: blue;
        }
      </style>
    `;
  }
  
  render() {
    // Clonamos el contenido del template y lo añadimos al shadowRoot
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  
  connectedCallback() {
    // Este método del ciclo de vida se ejecuta cuando el elemento es añadido al DOM
    this.render();
  }
}

// Registramos nuestro componente personalizado con el nombre "my-element"
customElements.define("my-element", myElement);
