export class TreeNode {
  val: number;

  left: TreeNode | null;

  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function arrayToBinaryTree(arr: (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = new TreeNode(arr[0]!);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift();

    if (current) {
      if (i < arr.length && arr[i] !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        current.left = new TreeNode(arr[i]!);
        queue.push(current.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        current.right = new TreeNode(arr[i]!);
        queue.push(current.right);
      }
      i++;
    }
  }

  return root;
}
