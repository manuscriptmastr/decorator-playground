import { html } from 'lit-html';
import { Reactive } from '../types';
import { customElement, reactive, tap } from '../utils/decorators';

// @ts-ignore
@customElement('lit-playground')
export class LitPlayground extends HTMLElement implements Reactive {
  @tap(console.log)
  @reactive
  accessor header = 'My app';

  // @bound
  handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.header = target.value;
  }

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
      </main>

      <input value=${this.header} @input=${this.handleInput.bind(this)} />
    `;
  }
}
