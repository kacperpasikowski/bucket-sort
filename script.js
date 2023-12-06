const ArrayManipulator = {
    container: document.getElementById("array"),
    arr: [],

    shuffle() {
      for (let i = this.arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
      }
    },

    newArray() {
      this.arr = [];
      for (let i = 0; i < 25; i++) {
        this.arr.push(i + 1);
      }
      this.shuffle();
      this.container.innerHTML = "";

      for (let i = 0; i < this.arr.length; i++) {
        let barHeight = this.arr[i] * 2;
        let arrayRect = document.createElement("div");
        arrayRect.classList.add("rectangle");
        arrayRect.style.height = barHeight * 10 + "px";
        this.container.appendChild(arrayRect);
      }
    }
  };

  document.getElementById("shuffleBtn").addEventListener("click", function() {
    ArrayManipulator.shuffle();
    ArrayManipulator.newArray();
  });

  ArrayManipulator.newArray();