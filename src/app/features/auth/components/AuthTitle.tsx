interface AuthTitleProps {
    title: string;
    subtitle: string;
}

export default function AuthTitle({ title, subtitle }: AuthTitleProps) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-gray-300 mt-2">{subtitle}</p>
        </div>
    );
}
