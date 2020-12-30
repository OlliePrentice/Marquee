import Image from "next/image";

export default function CardStory(props) {
    return (
        <div className="py-5 block h-full">
            <a href="/" className="flex flex-col h-full">
                <div className="relative w-full h-80">
                    <Image
                        src={props.item.image}
                        alt={props.item.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg rounded-b-none"
                    />
                    {!!props.item.categories.length &&
                    <span className="block text-sm bg-white px-5 py-2 absolute bottom-0 left-0 rounded-tr">
                                            {props.item.categories.map((category, i) => {
                                                if (i > 0) return;

                                                if (i === 0 || i === props.item.categories.length - 1) {
                                                    return (
                                                        <span>{category}</span>
                                                    );
                                                } else {
                                                    return (
                                                        <span>{category}, </span>
                                                    );
                                                }
                                            })}
                                </span>
                    }
                </div>
                <div className="bg-white p-5 rounded-lg rounded-t-none flex-1">
                    <h2 className="text-xl font-bold mb-2">{props.item.title}</h2>
                    <h4 className="mb-3">{props.item.location}</h4>
                    <p className="font-light mb-3">{props.item.excerpt}</p>
                    <span className="font-light text-gray-400 text-sm">{props.item.date}</span>
                </div>
            </a>
        </div>
    );
}
