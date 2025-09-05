import { byteToNumber, numberToByte } from './constants/byte-conversion';
import { Computer } from './CPU8/computer';
export {Computer} from './CPU8/computer';


const computer = new Computer();

export { byteToNumber, numberToByte };
export default computer;