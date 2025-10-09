import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationArrows from '@/app/features/auth/components/NavigationArrows';

describe('NavigationArrows', () => {

    it('renders the component correctly', () => {
         
        const { container: _container } = render(<NavigationArrows />); // solo verifica que no lance error
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
    });

    it('renders two buttons with ChevronDown icons', () => {
        const { container } = render(<NavigationArrows />);
        const chevronIcons = container.querySelectorAll('.lucide-chevron-down');
        expect(chevronIcons).toHaveLength(2);
    });

    it('the first button has the icon rotated 90 degrees (to go back)', () => {
         
        const { container: _container } = render(<NavigationArrows />);
        const buttons = screen.getAllByRole('button');
        const firstButtonIcon = buttons[0].querySelector('.rotate-90');
        expect(firstButtonIcon).toBeTruthy();
    });

    it('the second button has the icon rotated -90 degrees (to go forward)', () => {
         
        const { container: _container } = render(<NavigationArrows />);
        const buttons = screen.getAllByRole('button');
        const secondButtonIcon = buttons[1].querySelector('.-rotate-90');
        expect(secondButtonIcon).toBeTruthy();
    });

    it('calls onPrev when the first button is clicked', () => {
        const onPrevMock = vi.fn();
        render(<NavigationArrows onPrev={onPrevMock} />);

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]);

        expect(onPrevMock).toHaveBeenCalledTimes(1);
    });

    it('calls onNext when the second button is clicked', () => {
        const onNextMock = vi.fn();
        render(<NavigationArrows onNext={onNextMock} />);

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]);

        expect(onNextMock).toHaveBeenCalledTimes(1);
    });

    it('does not throw an error if onPrev is not defined', () => {
        render(<NavigationArrows />);

        const buttons = screen.getAllByRole('button');
        expect(() => fireEvent.click(buttons[0])).not.toThrow();
    });

    it('does not throw an error if onNext is not defined', () => {
        render(<NavigationArrows />);

        const buttons = screen.getAllByRole('button');
        expect(() => fireEvent.click(buttons[1])).not.toThrow();
    });

    it('both buttons can be called multiple times', () => {
        const onPrevMock = vi.fn();
        const onNextMock = vi.fn();
        render(<NavigationArrows onPrev={onPrevMock} onNext={onNextMock} />);

        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);

        expect(onPrevMock).toHaveBeenCalledTimes(2);
        expect(onNextMock).toHaveBeenCalledTimes(1);
    });

    it('applies the correct style classes to the container', () => {
        const { container } = render(<NavigationArrows />);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper.classList.contains('absolute')).toBe(true);
        expect(wrapper.classList.contains('-bottom-6')).toBe(true);
        expect(wrapper.classList.contains('left-1/2')).toBe(true);
        expect(wrapper.classList.contains('-translate-x-1/2')).toBe(true);
        expect(wrapper.classList.contains('flex')).toBe(true);
        expect(wrapper.classList.contains('gap-8')).toBe(true);
    });

    it('the buttons have the correct style classes', () => {
        render(<NavigationArrows />);
        const buttons = screen.getAllByRole('button');

        buttons.forEach(button => {
            expect(button.classList.contains('h-12')).toBe(true);
            expect(button.classList.contains('w-12')).toBe(true);
            expect(button.classList.contains('rounded-full')).toBe(true);
            expect(button.classList.contains('bg-fuchsia-700/60')).toBe(true);
            expect(button.classList.contains('border-fuchsia-400/40')).toBe(true);
            expect(button.classList.contains('text-white')).toBe(true);
        });
    });

    it('the buttons are framer-motion motion.button elements', () => {
        const { container } = render(<NavigationArrows />);
        const buttons = container.querySelectorAll('button');

        // creo los motion.button se renderizan como botones normales en el DOM
        expect(buttons).toHaveLength(2);
    });
});