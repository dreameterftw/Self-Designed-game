class SpaceShip {
    constructor () {
        var options = {
            "density": 2,
            'friction': 0.5,
            'isStatic':true
        }
        this.body=Bodies.rectangle(100,550,10,10,options);
        this.image=loadImage ("sprites/SpaceShip2.png");
        this.width=10;
        this.height=10;
        World.add(world,this.body);
    }
    display() {

        var pose = this.body.position;
        pose.x=mouseX;
        imageMode (CENTER);
        image (this.image,pose.x,pose.y);
    }
}