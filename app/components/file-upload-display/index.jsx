import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import { CopyLinkButton } from '../copy-link-button';

const FileUploadDisplay = ({ initialFiles }) => {
    const [uploadedFiles, setUploadedFiles] = useState(initialFiles || []);
    const noFilesUploaded = uploadedFiles.length === 0;

    const handleOnDragEnd = (result) => {
        if (!result.destination) return; // Drop outside the list

        const items = Array.from(uploadedFiles);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setUploadedFiles(items); // Update the state with the new order
    };

    useEffect(() => { if (initialFiles?.length > 0) { setUploadedFiles(initialFiles) } }, [initialFiles])

    return (
        <div className={noFilesUploaded ? "h-[140px] text-center flex justify-center items-center border rounded" : ''}>
            {noFilesUploaded ? "No files uploaded" : null}

            {!noFilesUploaded && (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppableIdUnique">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className='px-2 grid grid-cols-3 gap-3 h-[200px] overflow-y-auto border rounded'
                            >
                                {uploadedFiles.map((file, index) => (
                                    <Draggable key={file.id} draggableId={file.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="border p-2 my-2 h-[160px] bg-white rounded shadow"
                                            >
                                                <p><strong>Name:</strong> {file.name}</p>
                                                <p><strong>Type:</strong> {file.type}</p>
                                                <p><strong>Tags:</strong> {file?.tags && file?.tags}</p>
                                                {file?.shareableLink && <CopyLinkButton link={file?.shareableLink} />}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};

export default FileUploadDisplay;
