import Bone from './Bone';
import { degreesToRadians } from './helpers';

export default class Skeleton {
  constructor(boneList, context, scale) {
    this.bones = [];
    this.context = context;

    const baseBone = boneList.find((bone) => bone.parent === null);
    this.generateBone(baseBone, boneList, null, scale);

    this.calculateCoordinates();
  }

  generateBone(boneToAdd, boneList, parentBone, scale) {
    const x = isNaN(boneToAdd.x) ? 0 : +boneToAdd.x;
    const y = isNaN(boneToAdd.y) ? 0 : +boneToAdd.y;
    const boneLength = isNaN(boneToAdd.boneLength) ? 0 : +boneToAdd.boneLength;
    const angle = isNaN(boneToAdd.angle) ? 0 : degreesToRadians(boneToAdd.angle);
    const newBone = new Bone(boneToAdd.id, x, y, boneLength, angle, this.context, scale);

    this.bones.push(newBone);
    if (parentBone) parentBone.addChild(newBone);

    const children = boneList.filter((bone) => bone.parent === boneToAdd.id);
    children.forEach((childBone) => {
      this.generateBone(childBone, boneList, newBone, scale);
    });
  }

  draw() {
    this.bones[0].draw();
  }

  calculateCoordinates() {
    this.bones[0].calculateCoordinates();
  }
}
