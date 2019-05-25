import { Component, OnInit } from '@angular/core';
import { Node } from '../node';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  title = 'app';
  newRootData: string;
  tree: Node[] = [
    {
      data: 'First comment',
      children: [
        {
          data: 'Avangers assemble',
          children: [],
          parent: this
        },
        {
          data: 'Not today bro',
          children: [],
          parent: this
        }, ],
      parent: null
    }
  ];
  onAddNewRoot(): void {
    this.tree.push({
      data: this.newRootData,
      children: [],
      parent: null
    });
    this.newRootData = '';
  }

}
