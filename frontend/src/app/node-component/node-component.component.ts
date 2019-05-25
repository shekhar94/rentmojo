import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../node';

@Component({
  selector: 'app-node-component',
  templateUrl: './node-component.component.html',
  styleUrls: ['./node-component.component.css']
})
export class NodeComponentComponent implements OnInit {

  @Input() tree: Node;
  constructor() {}

  ngOnInit() {}
  addNodePopupVisible: boolean = false;
  editNodePopupVisible: boolean = false;
  nodeData: string;
  clickedNode: Node;
  addNode(node: Node): void {
    this.addNodePopupVisible = true;
    this.clickedNode = node;
  }
  editNode(node: Node): void {
    this.editNodePopupVisible = true;
    this.clickedNode = node;
  }
  updateNode(): void {
    this.clickedNode.data = this.nodeData;
    this.editNodePopupVisible = false;
    this.nodeData = "";
  }
  deleteNode(node: Node): void {
    const Parent: any = node.parent;
    Parent.children.forEach((element, index) => {
      if (element === node) {
        Parent.children.splice(index, 1);
      }
    });
  }
  onCreateNode() {
    this.addNodePopupVisible = false;
  }
}
