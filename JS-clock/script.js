class ModernClock {
    constructor(elementId){
        this.clock = document.getElementById(elementId);
        this.hourHand = this.clock.querySelector('.hour-hand');
        this.minHand = this.clock.querySelector('.min-hand');
        this.secHand = this.clock.querySelector('.sec-hand');
        this.updateClock();
    }
}