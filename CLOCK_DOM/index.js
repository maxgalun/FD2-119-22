const app = document.getElementById("app");
const minDiam = 200;
const maxDiam = 800;
const currentDiam = 400;

const main = document.createElement("div");
main.innerHTML = `<input type="number" name="diam" id="diam" min="${minDiam}" max="${maxDiam}" value="${currentDiam}"/>
      <input type="button" value="Построить часы" id="create"  />`;
app.appendChild(main);

document.getElementById("create").addEventListener("click", () => {
   const diam = document.getElementById("diam").value;
   const clock = document.createElement("div");
   const time = document.createElement("div");
   time.classList.add("time");
   time.style.transform = `scale(${(4 / maxDiam) * diam})`;
   const hourHand = document.createElement("div");
   const minuteHand = document.createElement("div");
   const secondHand = document.createElement("div");
   const dot = document.createElement("div");

   clock.classList.add("clock");
   clock.style.width = `${diam}px`;
   clock.style.height = `${diam}px`;

   for (let i = 1; i < 13; i++) {
      const digit = document.createElement("div");
      const digitText = document.createElement("span");
      digitText.appendChild(document.createTextNode(i));
      digitText.style.transform = `scale(${(4 / maxDiam) * diam})`;
      digit.classList.add("digit");
      digit.appendChild(digitText);
      let angle = (360 / 12) * i;
      posDigit(angle, digit);
      clock.appendChild(digit);
   }

   hourHand.classList.add("hand", "hourHand");
   minuteHand.classList.add("hand", "minuteHand");
   secondHand.classList.add("hand", "secondHand");

   dot.classList.add("dot");
   clock.appendChild(time);
   clock.appendChild(hourHand);
   clock.appendChild(minuteHand);
   clock.appendChild(secondHand);
   clock.appendChild(dot);

   function posDigit(angle, digit) {
      const koef = 0.8;
      const radius = (diam * koef) / 2;
      const delta = diam * (1 - koef);
      angle = (angle / 180) * Math.PI;
      digit.style.left = `${radius + radius * Math.sin(angle) + delta / 2}px`;
      digit.style.top = `${radius - radius * Math.cos(angle) + delta / 2}px`;
   }

   function posHand() {
      const currentDate = new Date();
      time.innerHTML = `${currentDate.toLocaleTimeString("en-GB")}`;

      let hours = currentDate.getHours();
      if (hours > 12) {
         hours -= 12;
      }
      const mitunes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const miliseconds = currentDate.getMilliseconds();

      const hoursAngle = (360 / 43200) * (hours * 60 * 60 + seconds);
      const mitunesAngle = (360 / 3600) * (mitunes * 60 + seconds);
      const secondsAngle = (360 / 60000) * (seconds * 1000 + miliseconds);

      hourHand.style.transform = `translate(-20px, -50%) rotateZ(${
         hoursAngle + 270
      }deg)`;

      minuteHand.style.transform = `translate(-20px, -50%) rotateZ(${
         mitunesAngle + 270
      }deg)`;

      secondHand.style.transform = `translate(-20px, -50%) rotateZ(${
         secondsAngle + 270
      }deg)`;
   }

   function animate(timestamp) {
      posHand();
      window.requestAnimationFrame(animate);
   }

   posHand();
   main.remove();
   app.appendChild(clock);
   window.requestAnimationFrame(animate);
});
