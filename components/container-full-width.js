
export default function ContainerFullWidth(props) {

    return (
        <section className={'py-20 ' + `${props.background}`}>
            <div className="container mx-auto px-3">
                {props.heading &&
                    <h2 className={"font-display font-bold text-3xl mb-3 " + `${props.background === 'bg-gray-900' || props.background === 'bg-black' ? 'text-white' : ''}`}>{props.heading}</h2>}
                {props.children}
            </div>
        </section>
    );

}
