interface InputProps {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type = "text", placeholder, value, onChange }: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full p-3 rounded bg-black/60 text-white border border-gray-600 
                    focus:border-purple-500 focus:outline-none"
        />
    );
}
