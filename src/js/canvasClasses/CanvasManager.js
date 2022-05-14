import Skeleton from './Skeleton';
import dispatch from '../dispatch';
import { radiansToDegrees } from './helpers';

export default class CanvasManager {
  constructor(canvas, bones) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.skeleton = null;
    this.currentHoverBone = null;
    this.currentDragBone = null;
    this.generateSkeleton(bones);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('touchmove', this.handleMouseMove);

    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('touchstart', this.handleMouseDown);

    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('touchend', this.handleMouseUp);
    this.canvas.addEventListener('touchcancel', this.handleMouseUp);
  }

  generateSkeleton(bones) {
    this.skeleton = new Skeleton(bones, this.context);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.skeleton.draw();
  }

  handleMouseDown(event) {
    const { x, y } = this.getEventCoordinates(event);

    this.currentDragBone = this.skeleton.bones.find((bone) =>
      bone.checkMouse(x, y)
    );
  }

  handleMouseUp() {
    this.currentDragBone = null;
  }

  handleMouseMove(event) {
    event.preventDefault();
    const { x, y } = this.getEventCoordinates(event);

    if (this.currentDragBone) {
      this.currentDragBone.pointToward(x, y);
      this.draw();
      dispatch({
        type: 'UPDATE_BONE',
        id: this.currentDragBone.id,
        field: 'angle',
        value: radiansToDegrees(this.currentDragBone.angle).toString(),
      });
    } else {
      this.currentHoverBone = this.skeleton.bones.find((bone) =>
        bone.checkMouse(x, y)
      );
      this.canvas.style.cursor = this.currentHoverBone ? 'pointer' : 'default';
    }
  }

  getEventCoordinates(event) {
    const clientX = event.clientX || event?.touches[0]?.clientX;
    const clientY = event.clientY || event?.touches[0]?.clientY;
    const boundingRect = this.canvas.getBoundingClientRect();
    const x = clientX - boundingRect.left;
    const y = clientY - boundingRect.top;
    return { x, y };
  }
}
