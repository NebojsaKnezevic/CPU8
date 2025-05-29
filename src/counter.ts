// export function setupCounter(element: HTMLButtonElement) {
//   let counter = 0
//   const setCounter = (count: number) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }


export class Counter {
  private counter: number = 0
  private element: HTMLButtonElement
  
  constructor(element: HTMLButtonElement) {
    this.element = element
    this.element.addEventListener('click', () => this.increment())
    this.render()
  }

  private setCounter(count: number) {
    this.counter = count
    this.render()
  }

  private increment() {
    this.setCounter(this.counter + 1)
  }

  private render() {
    this.element.innerHTML = `count is ${this.counter}`
  }
}
