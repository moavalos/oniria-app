import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CtaButton from '@/app/features/auth/components/CtaButton';

describe('CtaButton', () => {

    const defaultProps = {
        ctaText: 'Click Me',
        onClick: vi.fn(),
    };

    it('renders the component correctly', () => {
        const { container } = render(<CtaButton {...defaultProps} />);
        expect(container.firstChild).toBeTruthy();
    });

    it('displays the ctaText correctly', () => {
        render(<CtaButton {...defaultProps} />);
        expect(screen.getByText('Click Me')).toBeTruthy();
    });

    it('displays the star icon', () => {
        render(<CtaButton {...defaultProps} />);
        expect(screen.getByText('★')).toBeTruthy();
    });

    it('calls onClick when button is clicked', () => {
        const onClick = vi.fn();
        render(<CtaButton {...defaultProps} onClick={onClick} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is enabled by default', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button') as HTMLButtonElement;
        expect(button.disabled).toBe(false);
    });

    it('is disabled when disabled prop is true', () => {
        render(<CtaButton {...defaultProps} disabled={true} />);
        const button = screen.getByRole('button') as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });

    it('does not call onClick when disabled', () => {
        const onClick = vi.fn();
        render(<CtaButton {...defaultProps} onClick={onClick} disabled={true} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onClick).not.toHaveBeenCalled();
    });

    it('has correct gradient classes', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('bg-gradient-to-r');
        expect(button.className).toContain('from-fuchsia-700');
        expect(button.className).toContain('to-fuchsia-600');
    });

    it('has correct sizing classes', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('w-full');
        expect(button.className).toContain('px-6');
        expect(button.className).toContain('py-4');
    });

    it('has correct typography classes', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('text-[15px]');
        expect(button.className).toContain('font-bold');
    });

    it('has correct border and shadow classes', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('border');
        expect(button.className).toContain('border-fuchsia-400/30');
        expect(button.className).toContain('shadow-[0_0_25px_rgba(217,70,239,0.35)]');
    });

    it('has disabled styles when disabled', () => {
        render(<CtaButton {...defaultProps} disabled={true} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('disabled:opacity-60');
        expect(button.className).toContain('disabled:cursor-not-allowed');
    });

    it('has hover styles', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('hover:from-fuchsia-600');
        expect(button.className).toContain('hover:to-fuchsia-600');
    });

    it('has aria-disabled attribute when disabled', () => {
        render(<CtaButton {...defaultProps} disabled={true} />);
        const button = screen.getByRole('button');

        expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('does not have aria-disabled when enabled', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.getAttribute('aria-disabled')).toBe('false');
    });

    it('star icon has correct styling classes', () => {
        render(<CtaButton {...defaultProps} />);
        const star = screen.getByText('★');

        expect(star.className).toContain('text-fuchsia-200');
        expect(star.className).toContain('text-lg');
    });

    it('container has correct margin top', () => {
        const { container } = render(<CtaButton {...defaultProps} />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.className).toContain('mt-5');
    });

    it('button is a motion.button component', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button).toBeTruthy();
    });

    it('renders correctly with long text', () => {
        const longText = 'This is a very long CTA text that should still render properly';
        render(<CtaButton {...defaultProps} ctaText={longText} />);

        expect(screen.getByText(longText)).toBeTruthy();
    });

    it('renders correctly with empty text', () => {
        render(<CtaButton {...defaultProps} ctaText="" />);
        const button = screen.getByRole('button');

        expect(button).toBeTruthy();
        expect(screen.getByText('★')).toBeTruthy();
    });

    it('can be clicked multiple times when not disabled', () => {
        const onClick = vi.fn();
        render(<CtaButton {...defaultProps} onClick={onClick} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('button has rounded corners', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('rounded-xl');
    });

    it('button uses flexbox for layout', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('flex');
        expect(button.className).toContain('items-center');
        expect(button.className).toContain('justify-center');
    });

    it('has gap between text and icon', () => {
        render(<CtaButton {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button.className).toContain('gap-1');
    });
});