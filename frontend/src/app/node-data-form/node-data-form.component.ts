import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../node';

@Component({
  selector: 'app-node-data-form',
  templateUrl: './node-data-form.component.html',
  styleUrls: ['./node-data-form.component.css']
})
export class NodeDataFormComponent implements OnInit {
  @Input() clickedNode: Node;
  @Output() onCreateNode = new EventEmitter<boolean>();
  node: Node = {
    data: '',
    children: [],
    parent: null
  };
  constructor() { }

  ngOnInit() { }

  createNode(): void {
    this.clickedNode.children.push({
      data: this.node.data,
      children: [],
      parent: this.clickedNode
    });
    this.onCreateNode.emit();
  }

}
