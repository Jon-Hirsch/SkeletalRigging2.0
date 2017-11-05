import Bone from './Bone';
import { degreesToRadians } from './helpers';

export default class Skeleton {
  constructor(boneList, context) {
    this.bones = [];
    this.context = context;

    const baseBone = boneList.find(bone => bone.parent === null);
    this.generateBone(baseBone, boneList);

    this.calculateCoordinates();
  }

  generateBone(boneToAdd, boneList, parentBone) {
    const x = isNaN(boneToAdd.x) ? 0 : +boneToAdd.x;
    const y = isNaN(boneToAdd.y) ? 0 : +boneToAdd.y;
    const boneLength = isNaN(boneToAdd.boneLength) ? 0 : +boneToAdd.boneLength;
    const angle = isNaN(boneToAdd.angle) ? 0 : degreesToRadians(boneToAdd.angle);
    const newBone = new Bone(boneToAdd.id, x, y, boneLength, angle, this.context);

    this.bones.push(newBone);
    if (parentBone) parentBone.addChild(newBone);

    const children = boneList.filter(bone => bone.parent === boneToAdd.id);
    children.forEach(childBone => {
      this.generateBone(childBone, boneList, newBone);
    });
  }

  draw() {
    this.bones[0].draw();
  }

  calculateCoordinates() {
    this.bones[0].calculateCoordinates();
  }
}
