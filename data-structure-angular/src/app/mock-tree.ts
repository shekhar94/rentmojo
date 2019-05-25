import {
  Node
} from './node';
export const Tree: Node[] = [{
  data: 'root',
  children: [{
      data: 'child1',
      children: [],
      parent: this
    },
    {
      data: 'child2',
      children: [],
      parent: this
    }
  ],
  parent: null
}];
