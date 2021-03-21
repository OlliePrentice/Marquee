export default function FormSectionHeading(props) {
    return <label htmlFor={props.attrFor} className="text-2xl block mb-4">{props.children}</label>
}