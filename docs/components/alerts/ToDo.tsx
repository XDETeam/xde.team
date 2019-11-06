export const ToDo: React.FC = ({ children }) => (
    <div className="py-4">
        <div
            className="p-2 pr-4 shadow-md items-center leading-none lg:rounded-full flex lg:inline-flex border text-gray-600"
            role="alert"
        >
            <span className="flex rounded-full bg-green-600 text-white uppercase px-4 py-2 text-xs font-bold mr-3">
                ToDo
            </span>
            <span className="text-left text-sm mr-2 flex-auto">{children}</span>
        </div>
    </div>
);
