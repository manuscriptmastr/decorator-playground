import { html } from 'lit-html';
import { customElement } from '../../utils/decorators';

@customElement('form-input')
export class FormInput extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(
    name: keyof FormInput,
    oldValue: string,
    newValue: string
  ) {
    console.log(name, oldValue, newValue);
    this.render();
  }

  get value() {
    return this.getAttribute('value');
  }

  render() {
    return html`<input value=${this.value!} />`;
  }
}
