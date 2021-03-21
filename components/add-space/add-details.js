import {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import FormButton from '../elements/form-button';
import FormLabel from '../elements/form-label';

export default function AddDetails(props) {

    const [name, setName] = useState(0);
    const [description, setDescription] = useState(0);
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState([]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
            maxFiles: 5,
            accept: 'image/jpeg, image/png',
            onDrop: (acceptedFiles, rejectedFiles) => {
                const newErrors = [...errors];

                if (rejectedFiles.length) {
                    rejectedFiles.map(({errors}) => {
                        errors.map(({message}) => {
                            newErrors.push(message);
                        });
                    });

                    setErrors(newErrors.filter((value, index, self) => self.indexOf(value) === index));
                    return;
                }

                files.map(file => {
                    acceptedFiles.push(file);
                });

                if (acceptedFiles.length > 5) {

                    newErrors.push('Maximum of 5 images');
                    setErrors(newErrors.filter((value, index, self) => self.indexOf(value) === index));
                    return;
                }

                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            },
        }
    );

    const errorMessages = errors.map((error, i) => {
        return (
            <li key={i} className="text-sm">
                {error}
            </li>
        )
    });

    const remove = file => {
        const newFiles = [...files];
        newFiles.splice(file, 1);
        setFiles(newFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    };

    const thumbs = files.map((file, i) => (
        <div key={i} className="p-2 w-1/5 relative">
            <span
                className="w-5 h-5  block absolute top-3 right-3 bg-red-500 rounded-full z-5 text-white cursor-pointer hover:opacity-70"
                onClick={() => remove(i)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
                                                                           strokeWidth={2}
                                                                           d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
            <div className="pt-full rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${file.preview})`}}/>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        setErrors([]);
        files.forEach(file => URL.revokeObjectURL(file.preview));

    }, [files]);


    return (
        <>
            <div className="mb-12">
                <FormLabel htmlFor="spaceName">Add the name of your space:</FormLabel>
                <input
                    id="spaceName"
                    placeholder="Enter a name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-12">
                <FormLabel htmlFor="spaceDesc">Add a description:</FormLabel>
                <textarea
                    id="spaceDesc"
                    className="h-60"
                    placeholder="Enter a name"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-12">
                <FormLabel>Add up to five images:</FormLabel>
                <div {...getRootProps({className: 'dropzone mb-2'})}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>

                    }
                    {errorMessages.length !== 0 && <ul className="text-red-500 text-center pt-2">{errorMessages}</ul>}
                </div>

                <div className="-mx-2 flex flex-wrap">
                    {thumbs}
                </div>
            </div>

            <div>
                <FormButton type="button" title="Next" pageNumber={4}
                            disabled={(!name || !description || !files.length) && true}
                            pageHandler={props.pageHandler}/>
            </div>

        </>
    );
}
