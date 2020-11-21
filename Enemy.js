class Enemy {
    constructor () {
        var options = {
            "density": 2,
            'friction': 0.5
        }
        this.body=Bodies.rectangle(100,250,10,10);
        this.image=loadImage ("sprites/EnemyShip.jpeg");
        this.width=10;
        this.height=10;
        this.body.speed=-5;
        World.add(world,this.body);
        this.Visibility=255

    }
    display() {

        var pose = this.body.position;
       
        imageMode (CENTER);
        image (this.image,pose.x,pose.y);
    }
}
