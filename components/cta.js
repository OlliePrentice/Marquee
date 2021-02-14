import ContainerFullWidth from "./container-full-width";

export default function Cta({heading, description, link, linkTitle}) {
    return (
        <ContainerFullWidth>
            <div className="text-center lg:w-1/2 mx-auto">
                <h1 className="font-bold lg:text-4xl mb-5">{heading}</h1>
                <p className="mb-5">{description}</p>
                <div>
                    <a href={link} className="btn btn--large">{linkTitle}</a>
                </div>
            </div>
        </ContainerFullWidth>
    );
}
