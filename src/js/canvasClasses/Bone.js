const circleRadius = 10;
export default class Bone {
  constructor(id, x, y, boneLength, angle, context, scale = 1) {
    this.id = id;
    this.x = x * scale;
    this.y = y * scale;
    this.boneLength = boneLength * scale;
    this.angle = angle;
    this.context = context;
    this.children = [];
    this.absoluteX = 0;
    this.absoluteY = 0;
    this.absoluteAngle = 0;
    this.endX = 0;
    this.endY = 0;
    this.parent = null;
    this.calculateCoordinates();
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  calculateCoordinates() {
    this.absoluteAngle = this.angle;
    if (this.parent) {
      this.absoluteAngle += this.parent.absoluteAngle;
      this.absoluteX =
        -1 * (this.x * Math.cos(this.parent.absoluteAngle) - this.y * Math.sin(this.parent.absoluteAngle));
      this.absoluteY =
        -1 * (this.x * Math.sin(this.parent.absoluteAngle) + this.y * Math.cos(this.parent.absoluteAngle));
      this.absoluteX += this.parent.endX;
      this.absoluteY += this.parent.endY;
    } else {
      this.absoluteX = this.x;
      this.absoluteY = this.y;
    }

    this.endX = this.absoluteX + this.boneLength * Math.cos(this.absoluteAngle);
    this.endY = this.absoluteY + this.boneLength * Math.sin(this.absoluteAngle);

    this.children.forEach((child) => child.calculateCoordinates());
  }

  draw() {
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#000';
    this.context.beginPath();
    this.context.moveTo(this.absoluteX, this.absoluteY);
    this.context.lineTo(this.endX, this.endY);
    this.context.stroke();
    this.context.closePath();
    this.context.lineWidth = 2.5;
    this.context.strokeStyle = '#00F';
    this.context.beginPath();
    this.context.arc(this.endX, this.endY, circleRadius, 0, Math.PI * 2);
    this.context.stroke();
    this.context.closePath();
    this.children.forEach((child) => child.draw());
  }

  pointToward(pointX, pointY) {
    const deltaX = pointX - this.absoluteX;
    const deltaY = pointY - this.absoluteY;
    this.angle = Math.atan2(deltaY, deltaX);
    if (this.parent) {
      this.angle -= this.parent.absoluteAngle;
    }
    this.calculateCoordinates();
  }

  checkMouse(x, y) {
    return Math.abs(x - this.endX) <= circleRadius && Math.abs(y - this.endY) <= circleRadius;
  }
}
