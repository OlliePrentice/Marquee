export default function MobileBarItem({title, icon}) {
    return (
        <li className="px-2">
        <span className="block text-center">
            <span className="block w-7 h-7 mx-auto">
                {icon}
            </span>
            <span className="text-xs">{title}</span>
        </span>
    </li>
    );
}