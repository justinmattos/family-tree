class FamilyTree {
  constructor(value, age) {
    if (value == undefined || typeof value != 'string') {
      throw Error;
    } else if (age == undefined || typeof age != 'number') {
      throw Error;
    }
    this.value = value;
    this.age = age;
    this.children = [];
  }
  insert(child, age) {
    const descendant = new FamilyTree(child, age);
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

const inputButton = document.getElementById('inputButton');
const nodeList = document.getElementById('nodeList');
let head, selectedNode, selectedDiv, selectedButton;

inputButton.addEventListener('click', createNode);

function createNode() {
  let newName = document.getElementById('inputName').value;
  let newAge = parseInt(document.getElementById('inputAge').value, 10);
  console.log(`Creating a new node for ${newName}, age ${newAge}`);
  if (selectedNode === undefined) {
    selectedNode = new FamilyTree(newName, newAge);
    head = selectedNode;
    selectedDiv = nodeList;
  } else {
    selectedNode.insert(newName, newAge);
  }
  selectedDiv.innerHTML += newNodeHTML(newName, newAge);
  selectedDiv = document.getElementById(selectedNode.value);
  if (selectedButton === undefined) {
    selectedButton = document.getElementById(`header${newName}`);
    selectedButton.style.backgroundColor = 'purple';
    inputButton.innerHTML = `Add ${newName}'s Child`;
  }
  document.getElementById('inputName').value = '';
  document.getElementById('inputAge').value = '';
}

function newNodeHTML(name, age) {
  return `<button id="header${name}" type="button" class="collapsible" onclick="collapse('${name}')">${name}; Age: ${age}</button>
    <div id="${name}" class="content"><button id="button${name}" onclick="selectNode('${name}')">Select</button> <div>${name}'s children:</div></div>`;
}

function selectNode(term) {
  selectedButton.style.backgroundColor = 'blue';
  selectedNode = head.findMember(term);
  selectedDiv = document.getElementById(term);
  selectedButton = document.getElementById(`header${term}`);
  selectedButton.style.backgroundColor = 'purple';
  inputButton.innerHTML = `Add ${term}'s Child`;
  console.log(`The current node is now ${selectedNode.value}`);
}

function collapse(term) {
  let content = document.getElementById(term);
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
}
