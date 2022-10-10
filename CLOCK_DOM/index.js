const app = document.getElementById("app");
const minDiameter = 200;
const maxDiameter = 800;
const currentDiameter = 400;

const main = document.createElement("div");
main.innerHTML = `<input type="number" name="diameter" id="diameter" min="${minDiameter}" max="${maxDiameter}" value="${currentDiameter}"/>
      <input type="button" value="Построить часы" id="create"  />`;
app.appendChild(main);

document.getElementById("create").addEventListener("click", () => {
   createClock();
});

function createClock() {
   const clock = document.createElement("div");
   const digitalWatch = document.createElement("div");
   const hourHand = document.createElement("div");
   const minuteHand = document.createElement("div");
   const secondHand = document.createElement("div");
   const dot = document.createElement("div");

   const scaleKoef = document.getElementById("diameter").value / minDiameter;

   clock.classList.add("clock");
   clock.style.width = `${minDiameter}px`;
   clock.style.height = `${minDiameter}px`;
   clock.style.transform = `translate(-50%, -50%)`;
   clock.style.transform += ` scale(${scaleKoef})`;

   digitalWatch.classList.add("digitalWatch");

   for (let i = 1; i <= 12; i++) {
      const digit = document.createElement("div");
      const angle = (360 / 12) * i;
      digit.appendChild(document.createTextNode(i));
      digit.classList.add("digit");
      posDigit(digit, angle, minDiameter);
      clock.appendChild(digit);
   }

   hourHand.classList.add("hand", "hourHand");
   minuteHand.classList.add("hand", "minuteHand");
   secondHand.classList.add("hand", "secondHand");

   dot.classList.add("dot");

   clock.appendChild(digitalWatch);
   clock.appendChild(hourHand);
   clock.appendChild(minuteHand);
   clock.appendChild(secondHand);
   clock.appendChild(dot);

   main.remove();
   app.appendChild(clock);
   window.requestAnimationFrame(
      setTime.bind(this, digitalWatch, hourHand, minuteHand, secondHand)
   );
}

function posDigit(digit, angle, diameter) {
   const koef = 0.8;
   const radius = (diameter / 2) * koef;
   const delta = diameter - radius * 2;
   angle = (angle / 180) * Math.PI;
   digit.style.left = `${radius + radius * Math.sin(angle) + delta / 2}px`;
   digit.style.top = `${radius - radius * Math.cos(angle) + delta / 2}px`;
}

function setTime(digitalWatch, hourHand, minuteHand, secondHand) {
   const currentDate = new Date();
   digitalWatch.innerHTML = currentDate.toLocaleTimeString("en-GB");

   const miliseconds = currentDate.getMilliseconds();
   const seconds = currentDate.getSeconds() * 1000;
   const mitunes = currentDate.getMinutes() * 60 * 1000;

   let hours =
      currentDate.getHours() < 12
         ? currentDate.getHours() * 60 * 60 * 1000
         : (currentDate.getHours() - 12) * 60 * 60 * 1000;

   const hoursAngle =
      (360 / 12 / 60 / 60 / 1000) * (hours + mitunes + seconds + miliseconds);
   const mitunesAngle =
      (360 / 60 / 60 / 1000) * (mitunes + seconds + miliseconds);
   const secondsAngle = (360 / 60 / 1000) * (seconds + miliseconds);

   hourHand.style.transform = `translate(-10px, -50%) rotateZ(${
      hoursAngle + 270
   }deg)`;

   minuteHand.style.transform = `translate(-10px, -50%) rotateZ(${
      mitunesAngle + 270
   }deg)`;

   secondHand.style.transform = `translate(-10px, -50%) rotateZ(${
      secondsAngle + 270
   }deg)`;

   window.requestAnimationFrame(
      setTime.bind(this, digitalWatch, hourHand, minuteHand, secondHand)
   );
}
