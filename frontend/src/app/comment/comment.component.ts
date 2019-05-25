import { Component } from '@angular/core';
import { Node } from '../node';
import { CommentDataService } from '../shared/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  constructor(private commentService: CommentDataService) {

  }
  cache = [];
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
        }],
      parent: null
    }
  ];

  // private customStringify(o) {
  //   const finalobj = JSON.stringify(o, function (key, value) {
  //     if (typeof value === 'object' && value !== null) {
  //       if (this.cache.indexOf(value) !== -1) {
  //         // Duplicate reference found
  //         try {
  //           // If this value does not reference a parent it can be deduped
  //           return JSON.parse(JSON.stringify(value));
  //         } catch (error) {
  //           // discard key if value cannot be deduped
  //           return;
  //         }
  //       }
  //       // Store value in our collection
  //       this.cache.push(value);
  //     }
  //     return value;
  //   });
  //   this.cache = [];
  //   return finalobj;
  // }

  private getCommentArr(arr) {
    return arr.map(node => {
      node.parent = null;
      if (node.children && node.children.length > 0) {
        this.getCommentArr(node.children);
      }
      return node;
    });
  }
  onAddNewRoot(): void {
    this.tree.push({
      data: this.newRootData,
      children: [],
      parent: null
    });
    this.newRootData = '';
    this.commentService.saveComments(this.getCommentArr(this.tree)).subscribe(res => {
      console.log('comments saved successfully');
    }, err => {
      console.log('error in saving comment');
    });
  }

}
