import Image from "next/image";

export default function CardCategory(props) {
    return (
        <li className="px-4 py-2 md:py-5 w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4">
            <a href="/"
               className="flex items-center border border-transparent hover:shadow-lg hover:bg-white bg-white p-3 rounded-lg">
                <div className="pr-3">
                    <div className="relative w-24 h-24 lg:w-28 lg:h-28">
                        <Image
                            src={props.item.image}
                            alt={props.item.alt}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>
                <div className="px-3 flex-1">
                    <h3 className="font-medium text-base lg:text-lg">{props.item.name}</h3>
                    <span className="font-light text-sm block mb-1">{props.item.spaces.toLocaleString()} spaces available</span>
                    {!!props.item.subcategories.length &&
                    <span className="text-gray-400 font-light block text-xs">
                                            {props.item.subcategories.map((category, i) => {
                                                if (i > 2) return;

                                                if (i === 2 || i === props.item.subcategories.length - 1) {
                                                    return (
                                                        <span key={i}>{category}</span>
                                                    );
                                                } else {
                                                    return (
                                                        <span key={i}>{category}, </span>
                                                    );
                                                }
                                            })}
                        ...
                                        </span>
                    }
                </div>
            </a>
        </li>
    );
}
