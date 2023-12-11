
const ArrayManipulator = {
    sortingInProgress: false,
    sorted : false,
    container: document.getElementById("array"),
    buckets: {
      bucket1: document.getElementById("bucket1"),
      bucket2: document.getElementById("bucket2"),
      bucket3: document.getElementById("bucket3"),
      bucket4: document.getElementById("bucket4"),
      bucket5: document.getElementById("bucket5"),
    },
    arr: [],
    async insertionSort(bucket, delay) {
      const rectangles = Array.from(bucket.getElementsByClassName("rectangle"));
      const values = rectangles.map(rectangle => parseInt(rectangle.style.height));
      const highlightRectangle = (index) => {
        rectangles.forEach(rectangle => rectangle.classList.remove("highlighted"));
        rectangles[index].classList.add("highlighted");
      };
  
      for (let i = 1; i < values.length; i++) {
        let current = values[i];
        let j = i - 1;
        highlightRectangle(i);
  
        while (j >= 0 && values[j] > current) {
          highlightRectangle(j);
          await new Promise(resolve => setTimeout(resolve, delay));
  
          values[j + 1] = values[j];
          rectangles[j + 1].style.height = values[j] + "px";
  
          j--;
        }
        values[j + 1] = current;
        highlightRectangle(j + 1);
        await new Promise(resolve => setTimeout(resolve, delay));
  
        rectangles[j + 1].style.height = current + "px";
      }
  
      rectangles.forEach(rectangle => rectangle.classList.remove("highlighted"));
  
      for (let i = 0; i < rectangles.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
        rectangles[i].style.order = i;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      rectangles.forEach(rectangle => (rectangle.style.order = "auto"));
    },
    
    highlightBucket(bucketId) {
      const bucket = document.getElementById(bucketId);
      const rectangles = Array.from(bucket.getElementsByClassName("rectangle"));
      
      
    },
    shuffle() {
      this.clearBuckets();
      for (let i = this.arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
      }
      
    },
    async distributeValues(delay =250){
      if (this.sortingInProgress) {
        return;
      }
      this.clearBuckets();
      this.sortingInProgress = true;
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

      const bucketIds = Object.keys(this.buckets);
      for (let i = 0; i < bucketIds.length; i++) {
      const bucketId = bucketIds[i];
      await this.insertionSort(this.buckets[bucketId], delay=100);
    }
    this.container.innerHTML = "";

    for (let i = 0; i < bucketIds.length; i++) {
      const bucketId = bucketIds[i];
      const rectangles = Array.from(this.buckets[bucketId].getElementsByClassName("rectangle"));
  
      for (let j = 0; j < rectangles.length; j++) {
        const currentRect = rectangles[j];
  
        currentRect.classList.add("highlighted");
  
        await new Promise(resolve => setTimeout(resolve, delay));
  
        currentRect.classList.remove("highlighted");
  
        this.container.appendChild(currentRect.cloneNode(true));
      }
    }
    const arrayRectangles = document.querySelectorAll("#array .rectangle");
    for (let i = 0; i < arrayRectangles.length; i++) {
      const currentRect = arrayRectangles[i];
      currentRect.classList.add("sorted");
  
      await new Promise(resolve => setTimeout(resolve, delay=20));
  
      
    }
    
    

    await new Promise(resolve => setTimeout(resolve, delay=100));
    this.sorted = true;
    this.sortingInProgress = false;    

    },
    highlightRect(index){
      const arrayRectangles = document.querySelectorAll("#array .rectangle");
      arrayRectangles.forEach(rectangle => rectangle.classList.remove("highlighted"))
      arrayRectangles[index].classList.add("highlighted");
    },
    createRectForBuckets(bucket, value){
      let rect = document.createElement("div");
      rect.classList.add("rectangle");
      rect.style.height = value * 10 +"px";
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
        arrayRect.style.height = barHeight * 8 + "px";
        arrayRect.style.width = 25 + "px";
        this.container.appendChild(arrayRect);
      }
    },
    clearBuckets(){
      Object.values(this.buckets).forEach(bucket => {
        const rectangleChildren = bucket.getElementsByClassName("rectangle");
        Array.from(rectangleChildren).forEach(child => {
          bucket.removeChild(child);
        })
        });
      },
    };
  
  

    document.getElementById("sortBtn").addEventListener("click", async function () {
      if (!ArrayManipulator.sortingInProgress && !ArrayManipulator.sorted) {
        await ArrayManipulator.distributeValues();
        ArrayManipulator.sorted = true;
        
      } else if (ArrayManipulator.sorted) {
        const result = confirm("Tablica jest już posortowana. Czy chcesz ją pomieszać?");
        if (!result) {
          return;
        } else {
          ArrayManipulator.shuffle();
          ArrayManipulator.newArray();
          ArrayManipulator.sorted = false;
        }
      }
    });

  

    document.getElementById("shuffleBtn").addEventListener("click", function() {
      if (!ArrayManipulator.sortingInProgress) {
        ArrayManipulator.shuffle();
        ArrayManipulator.newArray();
        ArrayManipulator.sorted = false; 
      }
    });

 ArrayManipulator.newArray();
  



