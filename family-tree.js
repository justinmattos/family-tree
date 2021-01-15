class FamilyTree {
  constructor(ancestor) {
    this.name = ancestor;
    this.children = [];
  }
  insert(child) {
    const descendant = new FamilyTree(child);
    this.children.push(descendant);
  }
  findMember(name) {
    if (this.name == name) {
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
