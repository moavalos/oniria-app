import { Trans } from "react-i18next";

interface AuthLinksProps {
    href: string;
}

export default function AuthLinks({ href }: AuthLinksProps) {

    return (
        <p className="text-gray-300 text-sm mt-6">
            <Trans
                i18nKey="login.register"
                components={{
                    1: <a href={href} className="text-pink-600 font-bold hover:underline" />,
                }}
            />
        </p>
    );
}
