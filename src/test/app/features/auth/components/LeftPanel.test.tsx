import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LeftPanel from '@/app/features/auth/components/LeftPanel';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'node.title': 'Describe your dream',
                'node.descriptionLabel': 'Dream description',
                'node.placeholderNode': 'Write your dream here...',
                'node.character1': 'Maximum',
                'node.character2': 'characters',
                'node.interpretar': 'Interpret',
                'node.myroom': 'My Room',
                'node.personalizar': 'Customize',
                'node.toque': 'Personal touch',
                'node.insignia': 'Badges',
                'node.descriptionInsignia': 'Your achievements',
                'historial.oniriaPro': 'Oniria Pro',
            };
            return translations[key] || key;
        },
    }),
}));

// Mock CtaButton
vi.mock('./CtaButton', () => ({
    default: ({ ctaText, onClick, disabled }: { ctaText: string; onClick: () => void; disabled?: boolean }) => (
        <button onClick={onClick} disabled={disabled} data-testid="cta-button">
            {ctaText}
        </button>
    ),
}));

describe('LeftPanel', () => {
    const defaultProps = {
        onInterpretar: vi.fn(),
        onPersonalizar: vi.fn(),
        onInsignias: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component correctly', () => {
        const { container } = render(<LeftPanel {...defaultProps} />);
        expect(container.firstChild).toBeTruthy();
    });

    it('displays the title correctly', () => {
        render(<LeftPanel {...defaultProps} />);
        expect(screen.getByText('Describe your dream')).toBeTruthy();
    });

    it('renders the textarea with correct placeholder', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...');
        expect(textarea).toBeTruthy();
    });

    it('textarea has correct id and label', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByLabelText('Dream description');
        expect(textarea.id).toBe('dream-input');
    });

    it('displays character counter', () => {
        render(<LeftPanel {...defaultProps} />);
        expect(screen.getByText('1200')).toBeTruthy();
    });

    it('updates character counter when typing', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...');

        fireEvent.change(textarea, { target: { value: 'Test dream' } });

        expect(screen.getByText('1190')).toBeTruthy(); // 1200 - 10 characters
    });

    it('textarea value updates when typing', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...') as HTMLTextAreaElement;

        fireEvent.change(textarea, { target: { value: 'My amazing dream' } });

        expect(textarea.value).toBe('My amazing dream');
    });

    it('renders with initialDream prop', () => {
        const props = { ...defaultProps, initialDream: 'Initial dream text' };
        render(<LeftPanel {...props} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...') as HTMLTextAreaElement;

        expect(textarea.value).toBe('Initial dream text');
    });

    it('calls onInterpretar when Interpret button is clicked', () => {
        const onInterpretar = vi.fn();
        const props = { ...defaultProps, onInterpretar };
        render(<LeftPanel {...props} />);

        const textarea = screen.getByPlaceholderText('Write your dream here...');
        fireEvent.change(textarea, { target: { value: 'Dream content' } });

        const button = screen.getByText('Interpret');
        fireEvent.click(button);

        expect(onInterpretar).toHaveBeenCalledWith('Dream content');
    });

    it('trims whitespace when calling onInterpretar', () => {
        const onInterpretar = vi.fn();
        const props = { ...defaultProps, onInterpretar };
        render(<LeftPanel {...props} />);

        const textarea = screen.getByPlaceholderText('Write your dream here...');
        fireEvent.change(textarea, { target: { value: '  Dream with spaces  ' } });

        const button = screen.getByText('Interpret');
        fireEvent.click(button);

        expect(onInterpretar).toHaveBeenCalledWith('Dream with spaces');
    });

    it('shows error message when exceeding max characters', () => {
        const props = { ...defaultProps, maxChars: 10 };
        render(<LeftPanel {...props} />);

        const textarea = screen.getByPlaceholderText('Write your dream here...');
        fireEvent.change(textarea, { target: { value: 'This text is too long' } });

        expect(screen.getByText(/Maximum/)).toBeTruthy();
        expect(screen.getByText(/10/)).toBeTruthy();
        expect(screen.getByText(/characters/)).toBeTruthy();
    });

    it('character counter turns red when exceeding max', () => {
        const props = { ...defaultProps, maxChars: 10 };
        const { container } = render(<LeftPanel {...props} />);

        const textarea = screen.getByPlaceholderText('Write your dream here...');
        fireEvent.change(textarea, { target: { value: 'Too long text' } });

        const counter = container.querySelector('.text-red-300');
        expect(counter).toBeTruthy();
    });

    it('renders My Room section', () => {
        render(<LeftPanel {...defaultProps} />);
        expect(screen.getByText('My Room')).toBeTruthy();
    });

    it('renders Customize button with correct text', () => {
        render(<LeftPanel {...defaultProps} />);
        expect(screen.getByText('Customize')).toBeTruthy();
        expect(screen.getByText('Personal touch')).toBeTruthy();
    });

    it('renders Badges button with correct text', () => {
        render(<LeftPanel {...defaultProps} />);
        expect(screen.getByText('Badges')).toBeTruthy();
        expect(screen.getByText('Your achievements')).toBeTruthy();
    });

    it('calls onPersonalizar when Customize button is clicked', () => {
        const onPersonalizar = vi.fn();
        const props = { ...defaultProps, onPersonalizar };
        render(<LeftPanel {...props} />);

        const button = screen.getByText('Customize');
        fireEvent.click(button);

        expect(onPersonalizar).toHaveBeenCalledTimes(1);
    });

    it('calls onInsignias when Badges button is clicked', () => {
        const onInsignias = vi.fn();
        const props = { ...defaultProps, onInsignias };
        render(<LeftPanel {...props} />);

        const button = screen.getByText('Badges');
        fireEvent.click(button);

        expect(onInsignias).toHaveBeenCalledTimes(1);
    });

    it('renders ChevronRight icons in action buttons', () => {
        const { container } = render(<LeftPanel {...defaultProps} />);
        const chevronIcons = container.querySelectorAll('.lucide-chevron-right');

        expect(chevronIcons.length).toBeGreaterThanOrEqual(2);
    });

    it('Card has correct responsive classes', () => {
        const { container } = render(<LeftPanel {...defaultProps} />);
        const card = container.firstChild as HTMLElement;

        expect(card.className).toContain('col-span-12');
        expect(card.className).toContain('md:col-span-4');
        expect(card.className).toContain('xl:col-span-3');
    });

    it('Card has overflow-y-auto for scrolling', () => {
        const { container } = render(<LeftPanel {...defaultProps} />);
        const card = container.firstChild as HTMLElement;

        expect(card.className).toContain('overflow-y-auto');
    });

    it('textarea has correct styling classes', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...');

        expect(textarea.className).toContain('min-h-[160px]');
        expect(textarea.className).toContain('w-full');
        expect(textarea.className).toContain('rounded-xl');
        expect(textarea.className).toContain('bg-black/20');
    });

    it('textarea has focus ring styles', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...');

        expect(textarea.className).toContain('focus:ring-2');
        expect(textarea.className).toContain('focus:ring-fuchsia-400/50');
    });

    it('Interpret button has gradient styling', () => {
        render(<LeftPanel {...defaultProps} />);
        const span = screen.getByText('Interpret');
        const button = span.closest('button');

        expect(button?.className).toContain('bg-gradient-to-r');
        expect(button?.className).toContain('from-fuchsia-700');
        expect(button?.className).toContain('to-fuchsia-600');
    });

    it('action buttons have hover styles', () => {
        render(<LeftPanel {...defaultProps} />);
        const customizeButton = screen.getByText('Customize').closest('button');

        expect(customizeButton?.className).toContain('hover:bg-white/[0.08]');
    });

    it('default maxChars is 1200', () => {
        render(<LeftPanel {...defaultProps} />);
        expect(screen.getByText('1200')).toBeTruthy();
    });

    it('respects custom maxChars prop', () => {
        const props = { ...defaultProps, maxChars: 500 };
        render(<LeftPanel {...props} />);
        expect(screen.getByText('500')).toBeTruthy();
    });

    it('textarea is resizable', () => {
        render(<LeftPanel {...defaultProps} />);
        const textarea = screen.getByPlaceholderText('Write your dream here...');

        expect(textarea.className).toContain('resize-y');
    });
});