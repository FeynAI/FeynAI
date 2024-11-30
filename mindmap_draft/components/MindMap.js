class MindMapDisplay {
  constructor(containerId) {
    this.stage = new Konva.Stage({
      container: containerId,
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.enableZoom();
  }

  enableZoom() {
    // On desktop
    this.stage.on("wheel", (e) => {
      e.evt.preventDefault();
      const scaleBy = 1.3;
      const oldScale = this.stage.scaleX();
      const mousePointTo = {
      x: this.stage.getPointerPosition().x / oldScale - this.stage.x() / oldScale,
      y: this.stage.getPointerPosition().y / oldScale - this.stage.y() / oldScale,
      };

      const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

      const newPos = {
      x: -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) * newScale,
      };

      this.stage.to({
      scaleX: newScale,
      scaleY: newScale,
      x: newPos.x,
      y: newPos.y,
      duration: 0.02,
      easing: Konva.Easings.EaseInOut,
      });
    });
    // On mobile
  }

  zoomOnNode(node) {
    console.log(node);
    // get node layer

    const layer = node.getLayer();
    console.log("layer",layer);
    // get object in layer

    const object = layer.getChildren();
    console.log("object",object);
    const deepness = node.getAttr('deepness');
    console.log(deepness);
    const newScale = 1.5*deepness;

    const newPos = {
      x: -node.x() * newScale + window.innerWidth / 2,
      y: -node.y() * newScale + window.innerHeight / 2,
    };

    this.stage.to({
      scaleX: newScale,
      scaleY: newScale,
      x: newPos.x,
      y: newPos.y,
      duration: 0.5,
      easing: Konva.Easings.EaseInOut,
    });

  }

  createNode(x, y, text, answer, deepness=1) {
    const text_string_size_limit = 40;
    if (text.length > text_string_size_limit) {
      text = text.substring(0, text_string_size_limit) + '...';
    }
    const group = new Konva.Group({ x, y, draggable: false, scale: { x: 1/deepness, y: 1/deepness }, deepness:deepness });

    const label = new Konva.Text({
      text,
      width: 250,
      fontStyle: 600,
      fontSize: Math.floor(14),
      fontFamily: "Poppins",
      fill: "black",
      align: "center",
      padding: Math.floor(14),
    });
    label.offsetX(label.width() / 2);
    label.offsetY(label.height() / 2);
    label.x(0);
    label.y(0);

    const rect = new Konva.Rect({
      width: label.width(),
      height: label.height(),
      fill: "white",
      stroke: "black",
      strokeWidth: 0.7,
      cornerRadius: [10, 10, 0, 0]
    });
    rect.offsetX(rect.width() / 2);
    rect.offsetY(rect.height() / 2);

    const answerLabel = new Konva.Text({
      text: answer,
      fontSize: Math.floor(12),
      fontStyle: 300,
      width: 250,
      fontFamily: "Poppins",
      fill: "white",
      padding: Math.floor(10),
      cornerRadius: 1
    });
    answerLabel.offsetX(answerLabel.width() / 2);
    answerLabel.offsetY(0);
    answerLabel.x(0);
    answerLabel.y(rect.height() / 2)

    const answerRect = new Konva.Rect({
      width: answerLabel.width(),
      height: answerLabel.height(),
      fill: "#99B0DB",
      stroke: "black",
      strokeWidth: 1,
      cornerRadius: [0, 0, 10, 10]
    });
    answerRect.offsetX(answerRect.width() / 2);
    answerRect.offsetY(0);
    answerRect.x(0);
    answerRect.y(rect.height() / 2);

    group.add(rect, label, answerRect, answerLabel);
    this.layer.add(group);
    this.layer.moveToTop(); // Move the layer to the top to ensure nodes are above the lines

    group.on('click', () => {
      this.zoomOnNode(group);
    });
    return group;
  }

  connectNodes(node1, node2,deepness=1) {
    const line = new Konva.Line({
      points: [node1.x(), node1.y(), node2.x(), node2.y()],
      stroke: "white",
      strokeWidth: (0.5**deepness)*2,
      tension: 0.5,
    });
    this.layer.add(line);
    line.moveToBottom(); // Move the line to the bottom to ensure it is below the nodes

    const updateLine = () => {
      line.points([node1.x(), node1.y(), node2.x(), node2.y()]);
    };

    node1.on("dragmove", updateLine);
    node2.on("dragmove", updateLine);
  }

  draw() {
    this.stage.batchDraw();
  }
}

export { MindMapDisplay };
