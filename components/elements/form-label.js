export default function FormLabel(props) {
    return <label htmlFor={props.attrFor} className="text-2xl block mb-4">{props.children}</label>
}