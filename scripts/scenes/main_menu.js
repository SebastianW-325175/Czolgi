const whiteBg = new renderObject("whiteBg", "rect");
whiteBg.defineRect("#FFFFFF", 0, 0, 320, 180);
const tankers = new renderObject("tankers", "img");
tankers.defineImg("./assets/tankers.png", -50, 0);

const backgroundLayer = new renderLayer("backgroundLayer", [whiteBg, tankers], []);
rendererObject.renderQueue.push(backgroundLayer);