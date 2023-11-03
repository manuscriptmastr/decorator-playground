import { html } from 'lit-html';
import { customElement, reactive } from '../../utils/decorators';

@customElement('contact-form')
export class ContactForm extends HTMLElement {
  @reactive
  accessor firstName = 'Hi';

  render() {
    return html`<form>
      <form-input value=${this.firstName}></form-input>
    </form>`;
  }
}
