import { html } from 'lit-html';
import { Renderable } from '../types';
import { bound, customElement, reactive, tap } from '../utils/decorators';

@customElement('lit-playground')
export class LitPlayground extends HTMLElement implements Renderable {
  @tap(console.log)
  @reactive
  accessor header = 'My app';

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
    `;
  }
}
