import { html } from 'lit-html';
import { Renderable } from '../types';
import {
  bound,
  customElement,
  persist,
  reactive,
  tap,
} from '../utils/decorators';

@customElement('app-root')
export class AppRoot extends HTMLElement implements Renderable {
  @reactive
  @persist('header')
  accessor header = 'Welcome to Lit Playground!';

  @bound
  handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.header = target.value;
  }

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
      </main>

      <input value=${this.header} @input=${this.handleInput} />

      <contact-form></contact-form>
    `;
  }
}
