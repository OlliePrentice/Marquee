export default function Button({link, target, title}) {
    return (
      <>
          <a className="no-underline uppercase tracking-widest text-xxs py-3 px-5 bg-green-400 rounded text-white font-medium transition hover:bg-green-500">{title}</a>
      </>
    );
}
