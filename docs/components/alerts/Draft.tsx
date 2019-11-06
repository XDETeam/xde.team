export const Draft: React.FC = () => (
    <div className="py-4">
        <div
            className="p-2 pr-4 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
        >
            <span className="flex rounded-full bg-red-600 uppercase px-4 py-2 text-xs font-bold mr-3">
                Draft
            </span>
            <span className="mr-2 text-sm text-left flex-auto">
                This article is in the very initial draft stage
            </span>
        </div>
    </div>
);
