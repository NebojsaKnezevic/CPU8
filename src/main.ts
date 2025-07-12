import { Decoder3x8 } from "./CPU8/logic/decoder3x8";











const decoder3x8 = new Decoder3x8();

decoder3x8.setInputs(
  1,1,0
);

const [a, b, c, d, e, f, g, j] = decoder3x8.getOutput()
console.log([a, b, c, d, e, f, g, j])