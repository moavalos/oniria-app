import type { Meta, StoryObj } from "@storybook/react";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Features/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <header className="bg-gray-900/95 backdrop-blur-2xl p-4">
        <div className="flex items-center gap-4">
          <Story />
        </div>
      </header>
    ),
  ],
};
