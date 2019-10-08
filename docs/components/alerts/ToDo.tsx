export const ToDo: React.FC = ({ children }) => (
    <div className="py-4">
        <div className="p-2 pr-4 shadow-md items-center leading-none lg:rounded-full flex lg:inline-flex border" role="alert">
            <span className="flex rounded-full bg-green-600 text-white uppercase px-4 py-2 text-xs font-bold mr-3">ToDo</span>
            <span className="font-semibold mr-2 text-left flex-auto">{ children }</span>
        </div>
    </div>
);
