/**
   * Clase Clock para manejar la lógica de tiempo de forma modular.
   * [span_2](start_span)Ideal para mostrar habilidades de Programación Orientada a Objetos.[span_2](end_span)
   */
  class ModernClock {
    constructor(elementId) {
      this.clock = document.getElementById(elementId);
      this.hourHand = this.clock.querySelector('.hour-hand');
      this.minHand = this.clock.querySelector('.min-hand');
      this.secondHand = this.clock.querySelector('.second-hand');
      
      this.update = this.update.bind(this);
      window.requestAnimationFrame(this.update);
    }

    update() {
      const now = new Date();
      
      // Calculamos milisegundos para un movimiento "barrido" (smooth)
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds() + ms / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = now.getHours() + minutes / 60;

      // Rotación (sin el offset de 90deg del código original, ajustado en el CSS)
      const secDeg = seconds * 6; // 360 / 60
      const minDeg = minutes * 6; // 360 / 60
      const hrDeg = hours * 30;   // 360 / 12

      this.setRotation(this.secondHand, secDeg);
      this.setRotation(this.minHand, minDeg);
      this.setRotation(this.hourHand, hrDeg);

      // Llamada recursiva para la siguiente frame de animación
      window.requestAnimationFrame(this.update);
    }

    setRotation(element, degrees) {
      element.style.transform = `translateX(-50%) rotate(${degrees}deg)`;
    }
  }

  // Inicialización
  const myClock = new ModernClock('mainClock');