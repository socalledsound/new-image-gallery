class ImageCircle{
    constructor(imgPath){
        this.imgPath = imgPath;
        this.img = null;
        this.size = Math.random() * GRID_WIDTH/6 + 40;
        this.x = (Math.random() * GRID_WIDTH/4);
        this.y = (Math.random() * GRID_HEIGHT/4);
        this.z = (Math.random() * GRID_WIDTH/8);
        this.rotateSpeed = random(0.01, 0.05);
        this.theta = 0;
        this.imgLoaded = false;
        this.loadImageBuffer = this.createImagePromise(this.imgPath);
    }

    display(){
        translate(this.x, this.y, this.z);
        if(this.imgLoaded){
            push();
                translate(this.x, this.y);
                // rotateY(this.theta/5);
                rotateY(this.theta);
                // rotateZ(this.theta/2);
                translate(-this.x, -this.y);
                // rotateZ(this.theta/2);
                
                // fill(0,0,200);
                
                texture(this.img);
                ellipse(this.x, this.y, this.size);
                translate(this.x, this.y);
                sphere(this.size/3);
            pop(); 
           
        }
    }

    createImagePromise(imgPath){
        return new Promise((resolve) => {
            this.img = loadImage(imgPath, resolve)
        })
    }

    update(){
        this.theta += this.rotateSpeed;
        if(this.imgPath){
            if(!this.imgLoaded){  
                this.loadImageBuffer.then(()=> {
                    this.imgLoaded = true;
                });
            }

        }

    }
}