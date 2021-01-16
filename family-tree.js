class FamilyTree {
  constructor(value) {
    if (value == undefined || typeof value != 'string') {
      throw error;
    }
    this.value = value;
    this.children = [];
  }
  insert(child) {
    const descendant = new FamilyTree(child);
    this.children.push(descendant);
  }
  findMember(name) {
    if (this.value == name) {
      return this;
    } else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].findMember(name) != undefined) {
          return this.children[i].findMember(name);
        }
      }
    }
  }
  log(depth = 1) {
    let dashes = '';
    for (let i = 0; i < depth; i++) {
      dashes += '--';
    }
    let result = `${dashes} ${this.value}`;
    if (this.children.length > 0) {
      for (let child of this.children) {
        result += `\n${child.log(depth + 1)}`;
      }
    }
    return result;
  }
  familySize() {
    return 1 + this.children.length;
  }
}

module.exports = FamilyTree;
