// Definimos una clase que extiende de HTMLElement para crear un Web Component personalizado
class MyCustomElement extends HTMLElement {
  // Constructor: Se ejecuta cuando se crea una instancia del elemento en memoria
  // Esto sucede ANTES de que el elemento sea agregado al DOM
  constructor() {
    super(); // Llamamos al constructor de la clase padre (HTMLElement)
    console.log("Hola desde el constructor - Memoria");
    // En este punto el elemento existe en memoria pero aún no está en el DOM
  }

  // connectedCallback: Método del ciclo de vida que se ejecuta automáticamente
  // cuando el elemento es AGREGADO al DOM (Document Object Model)
  connectedCallback() {
    console.log("Hola desde el DOM");
    // Aquí es donde típicamente configurarías eventos, referencias a elementos,
    // o cualquier lógica que requiera que el elemento esté en el DOM
  }

  // disconnectedCallback: Método del ciclo de vida que se ejecuta automáticamente  
  // cuando el elemento es REMOVIDO del DOM
  disconnectedCallback() {
    console.log("Adios del DOM");
    // Aquí es donde deberías limpiar recursos como:
    // - Remover event listeners
    // - Cancelar timers o intervalos
    // - Limpiar observadores (MutationObserver, IntersectionObserver, etc.)
    // - Liberar referencias a objetos para evitar memory leaks
  }
}

// Registramos nuestro elemento personalizado con el navegador
// Primer parámetro: nombre del tag HTML (debe contener un guión)
// Segundo parámetro: la clase que define el comportamiento del elemento
customElements.define("my-custome-element", MyCustomElement);

// Simulamos la remoción del elemento del DOM para ver el disconnectedCallback en acción
// querySelector busca el primer elemento con el tag "my-custome-element"
// remove() lo elimina del DOM, lo que dispara el disconnectedCallback
document.querySelector("my-custome-element").remove();
