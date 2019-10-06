import Link from "next/link";
import { useState } from "react";

function Header() {
    const [isExpanded, toggleExpansion] = useState(false);

    return (
        <header className="border-black border-solid border-b-2 bg-gray-200">
            <div className="flex flex-wrap md:flex-no-wrap items-center justify-between max-w-4xl mx-auto p-4 md:p-6">
                <div className="flex items-center">
                    <Link href="/">
                        <a className="font-bold text-xl">SDE Team</a>
                    </Link>
                </div>
                <div>
                    <a href="https://github.com/StanEgo/sde-team" className="font-bold">
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;