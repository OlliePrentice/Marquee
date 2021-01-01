import Image from "next/image";

export default function CardFeatured(props) {
    return (
        <div className="py-5">
            <a href="/">
                <div className="relative w-full h-80 mb-3">
                    <Image
                        src={props.item.image}
                        alt={props.item.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                {!!props.item.categories.length &&
                <span className="text-gray-400 font-light block text-sm mb-2">
                                            {props.item.categories.map((category, i) => {
                                                if (i > 2) return;

                                                if (i === 2 || i === props.item.categories.length - 1) {
                                                    return (
                                                        <span key={i}>{category}</span>
                                                    );
                                                } else {
                                                    return (
                                                        <span key={i}>{category}, </span>
                                                    );
                                                }
                                            })}
                                </span>
                }
                <h2 className="text-xl font-bold mb-2">{props.item.name}</h2>
                <h4 className="mb-3">{props.item.location}</h4>
                <p className="font-light">{props.item.description}</p>
            </a>
        </div>
    );
}
