import type { Meta, StoryObj } from "@storybook/react";
import LanguageToggle from "../lang-toggle/LanguageToggle";

const meta: Meta<typeof LanguageToggle> = {
  title: "Features/LanguageToggle",
  component: LanguageToggle,
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8  flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {};

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <header className="bg-gray-900/95 backdrop-blur-2xl p-4 ">
        <div className="flex items-center gap-4">
          <Story />
        </div>
      </header>
    ),
  ],
};
