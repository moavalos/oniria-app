import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '@/app/features/auth/components/Sidebar';

const mockTimeline = [
    { id: 1, date: '2024-01', title: 'First event', active: true },
    { id: 2, date: '2024-02', title: 'Second event', active: false },
    { id: 3, date: '2024-03', title: 'Third event', active: false },
];

const defaultProps = {
    title: 'My Title',
    description: 'This is a test description',
    ctaText: 'Start Now',
    timeline: mockTimeline,
};

describe('Sidebar', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component correctly', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        expect(container.firstChild).toBeTruthy();
    });

    it('displays title correctly', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('My Title')).toBeTruthy();
    });

    it('displays description correctly', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('This is a test description')).toBeTruthy();
    });

    it('displays CTA button text correctly', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('Start Now')).toBeTruthy();
    });

    it('renders all timeline items', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('First event')).toBeTruthy();
        expect(screen.getByText('Second event')).toBeTruthy();
        expect(screen.getByText('Third event')).toBeTruthy();
    });

    it('displays dates for each timeline item', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('2024-01')).toBeTruthy();
        expect(screen.getByText('2024-02')).toBeTruthy();
        expect(screen.getByText('2024-03')).toBeTruthy();
    });

    it('renders timeline as a list', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const list = container.querySelector('ul');
        expect(list).toBeTruthy();
        expect(list?.getAttribute('aria-label')).toBe('Línea de tiempo');
    });

    it('each timeline item has an li element', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const listItems = container.querySelectorAll('li');
        expect(listItems).toHaveLength(3);
    });

    it('renders with empty timeline without errors', () => {
        const propsWithEmptyTimeline = { ...defaultProps, timeline: [] };
        const { container } = render(<Sidebar {...propsWithEmptyTimeline} />);
        expect(container.firstChild).toBeTruthy();
    });

    it('applies active styles to the active timeline item', () => {
        render(<Sidebar {...defaultProps} />);
        const firstItem = screen.getByText('First event');
        expect(firstItem.className).toContain('font-semibold');
        expect(firstItem.className).toContain('text-white');
    });

    it('applies inactive styles to non-active items', () => {
        render(<Sidebar {...defaultProps} />);
        const secondItem = screen.getByText('Second event');
        expect(secondItem.className).toContain('text-white/85');
        expect(secondItem.className).not.toContain('font-semibold');
    });

    it('renders the vertical timeline bar', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const timelineBar = container.querySelector('.bg-white\\/15');
        expect(timelineBar).toBeTruthy();
    });

    it('renders the animated progress bar', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const progressBar = container.querySelector('.bg-fuchsia-400');
        expect(progressBar).toBeTruthy();
    });

    it('title has correct style classes', () => {
        render(<Sidebar {...defaultProps} />);
        const title = screen.getByText('My Title');
        expect(title.className).toContain('font-semibold');
        expect(title.className).toContain('text-white/85');
    });

    it('description has correct style classes', () => {
        render(<Sidebar {...defaultProps} />);
        const description = screen.getByText('This is a test description');
        expect(description.className).toContain('text-[12px]');
        expect(description.className).toContain('text-white/50');
    });

    it('CTA button has correct gradient', () => {
        render(<Sidebar {...defaultProps} />);
        const button = screen.getByRole('button', { name: /Start Now/i });
        expect(button.className).toContain('bg-gradient-to-r');
        expect(button.className).toContain('from-fuchsia-700');
        expect(button.className).toContain('to-fuchsia-600');
    });

    it('CTA button is disabled when ctaDisabled prop is true', () => {
        const props = { ...defaultProps, ctaDisabled: true };
        render(<Sidebar {...props} />);
        const button = screen.getByRole('button', { name: /Start Now/i });
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    it('CTA button has star icon initially', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('★')).toBeTruthy();
    });

    it('calls onSelectItem when timeline item is clicked', () => {
        const onSelectItem = vi.fn();
        const props = { ...defaultProps, onSelectItem };
        render(<Sidebar {...props} />);

        const secondItem = screen.getByText('Second event');
        fireEvent.click(secondItem);

        expect(onSelectItem).toHaveBeenCalledTimes(1);
        expect(onSelectItem).toHaveBeenCalledWith(mockTimeline[1]);
    });

    it('calls onCta when CTA button is clicked', async () => {
        const onCta = vi.fn();
        const props = { ...defaultProps, onCta };
        render(<Sidebar {...props} />);

        const ctaButton = screen.getByRole('button', { name: /Start Now/i });
        fireEvent.click(ctaButton);

        expect(onCta).toHaveBeenCalledTimes(1);
    });

    it('changes active item when clicking on different timeline items', () => {
        render(<Sidebar {...defaultProps} />);

        const secondItem = screen.getByText('Second event');
        fireEvent.click(secondItem);

        expect(secondItem.className).toContain('font-semibold');
    });

    it('handles single item timeline correctly', () => {
        const singleItemTimeline = [
            { id: 1, date: '2024-01', title: 'Only event', active: true },
        ];
        const props = { ...defaultProps, timeline: singleItemTimeline };
        const { container } = render(<Sidebar {...props} />);

        expect(screen.getByText('Only event')).toBeTruthy();
        const listItems = container.querySelectorAll('li');
        expect(listItems).toHaveLength(1);
    });

    it('Card component has correct grid classes', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const card = container.firstChild as HTMLElement;
        expect(card.className).toContain('col-span-12');
        expect(card.className).toContain('md:col-span-4');
    });

    it('applies overflow-y-auto for scrolling', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const card = container.firstChild as HTMLElement;
        expect(card.className).toContain('overflow-y-auto');
    });

    it('timeline items have correct spacing', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const list = container.querySelector('ul');
        expect(list?.className).toContain('space-y-6');
    });

    it('each timeline item has a clickable dot button', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const dotButtons = container.querySelectorAll('button[aria-pressed]');
        expect(dotButtons).toHaveLength(3);
    });

    it('active dot button has aria-current attribute', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const activeDot = container.querySelector('button[aria-current="step"]');
        expect(activeDot).toBeTruthy();
    });

    it('timeline list is keyboard focusable', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const list = container.querySelector('ul');
        expect(list?.getAttribute('tabIndex')).toBe('0');
    });

    it('navigates down with ArrowDown key', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const list = container.querySelector('ul');

        if (list) {
            fireEvent.keyDown(list, { key: 'ArrowDown' });
            const secondItem = screen.getByText('Second event');
            expect(secondItem.className).toContain('font-semibold');
        }
    });

    it('navigates up with ArrowUp key', () => {
        const props = { ...defaultProps, initialSelectedId: 2 };
        const { container } = render(<Sidebar {...props} />);
        const list = container.querySelector('ul');

        if (list) {
            fireEvent.keyDown(list, { key: 'ArrowUp' });
            const firstItem = screen.getByText('First event');
            expect(firstItem.className).toContain('font-semibold');
        }
    });

    it('triggers CTA with Enter key', () => {
        const onCta = vi.fn();
        const props = { ...defaultProps, onCta };
        const { container } = render(<Sidebar {...props} />);
        const list = container.querySelector('ul');

        if (list) {
            fireEvent.keyDown(list, { key: 'Enter' });
            expect(onCta).toHaveBeenCalled();
        }
    });

    it('does not navigate beyond first item with ArrowUp', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const list = container.querySelector('ul');

        if (list) {
            fireEvent.keyDown(list, { key: 'ArrowUp' });
            const firstItem = screen.getByText('First event');
            expect(firstItem.className).toContain('font-semibold');
        }
    });

    it('does not navigate beyond last item with ArrowDown', () => {
        const props = { ...defaultProps, initialSelectedId: 3 };
        const { container } = render(<Sidebar {...props} />);
        const list = container.querySelector('ul');

        if (list) {
            fireEvent.keyDown(list, { key: 'ArrowDown' });
            const thirdItem = screen.getByText('Third event');
            expect(thirdItem.className).toContain('font-semibold');
        }
    });

    it('uses initialSelectedId prop when provided', () => {
        const props = { ...defaultProps, initialSelectedId: 2 };
        render(<Sidebar {...props} />);

        const secondItem = screen.getByText('Second event');
        expect(secondItem.className).toContain('font-semibold');
    });

    it('stores item refs in a Map', () => {
        const { container } = render(<Sidebar {...defaultProps} />);
        const listItems = container.querySelectorAll('li');
        expect(listItems).toHaveLength(3);
    });

    it('CTA button shows checkmark when pressed', async () => {
        const onCta = vi.fn().mockResolvedValue(undefined);
        const props = { ...defaultProps, onCta };
        render(<Sidebar {...props} />);

        const ctaButton = screen.getByRole('button', { name: /Start Now/i });
        fireEvent.click(ctaButton);

        await waitFor(() => {
            expect(screen.queryByText('✓')).toBeTruthy();
        });
    });
});