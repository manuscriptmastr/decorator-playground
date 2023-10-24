import { html, TemplateResult } from "lit";
import "../src/lit-playground.js";

export default {
  title: "LitPlayground",
  component: "lit-playground",
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  header,
  backgroundColor = "white",
}: ArgTypes) => html`
  <lit-playground
    style="--lit-playground-background-color: ${backgroundColor}"
    .header=${header}
  ></lit-playground>
`;

export const App = Template.bind({});
App.args = {
  header: "My app",
};
