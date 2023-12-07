const ArrayManipulator = {
    container: document.getElementById("array"),
    buckets: {
      bucket1: document.getElementById("bucket1"),
      bucket2: document.getElementById("bucket2"),
      bucket3: document.getElementById("bucket3"),
      bucket4: document.getElementById("bucket4"),
      bucket5: document.getElementById("bucket5"),
    },
    arr: [],
    
    shuffle() {
      for (let i = this.arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
      }
    },
    async distributeValues(delay =250){
      for (let i=0; i<25; i++){
        let value = this.arr[i];
        await new Promise(resolve=> setTimeout(resolve,delay));
        if(value>=1 && value <=5){
          this.createRectForBuckets(this.buckets.bucket1, value);
        }else if (value>=6 && value <=10){
          this.createRectForBuckets(this.buckets.bucket2, value);
        }else if (value>=11 && value <=15){
          this.createRectForBuckets(this.buckets.bucket3, value);
        }else if (value>=16 && value <=20){
          this.createRectForBuckets(this.buckets.bucket4, value);
        }else if (value>=21 && value <=25){
          this.createRectForBuckets(this.buckets.bucket5, value);
        }
        this.highlightRect(i);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      this.removeHighlight();
    },
    highlightRect(index){
      const arrayRectangles = document.querySelectorAll("#array .rectangle");
      arrayRectangles.forEach(rectangle => rectangle.classList.remove("highlighted"))
      arrayRectangles[index].classList.add("highlighted");
    },
    createRectForBuckets(bucket, value){
      let rect = document.createElement("div");
      rect.classList.add("rectangle");
      rect.style.height = value * 4 +"px";
      rect.style.width = 25 + "px";
      bucket.appendChild(rect);

    },
    removeHighlight() {
      const arrayRectangles = document.querySelectorAll("#array .rectangle");
      arrayRectangles.forEach(rectangle => rectangle.classList.remove("highlighted"));
    },
   
    newArray() {
      this.arr = [];
      for (let i = 0; i < 25; i++) {
        this.arr.push(i + 1);
      }
      this.shuffle();
      this.container.innerHTML = "";

      for (let i = 0; i < this.arr.length; i++) {
        let barHeight = this.arr[i] * 1.3;
        let arrayRect = document.createElement("div");
        arrayRect.classList.add("rectangle");
        arrayRect.style.height = barHeight * 10 + "px";
        this.container.appendChild(arrayRect);
      }
    },
  };

  document.getElementById("shuffleBtn").addEventListener("click", function() {
    ArrayManipulator.shuffle();
    ArrayManipulator.newArray();
  });

ArrayManipulator.newArray();

ArrayManipulator.distributeValues();


