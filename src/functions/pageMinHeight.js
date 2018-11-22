// this function is used to set the outerwrapper height to keep the page from jumping up on save during development.
export default function pageMinHeight({ node, updateContext }) {
  const minHeight = node.offsetHeight;
  if (minHeight > 0) {
    sessionStorage.setItem("wrapperMinHeight", node.offsetHeight);
    updateContext && updateContext({ wrapperMinHeight: node.offsetHeight });
  }
}
