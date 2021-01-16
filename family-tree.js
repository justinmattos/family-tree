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
}

module.exports = FamilyTree;
