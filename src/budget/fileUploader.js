import React, { useRef } from "react";

const FileUploader = ({ onFileSelectSuccess,onFileSelectError,onSubmit }) => {
	const fileInput = useRef(null);

	const handleFileInput = (e) => {
		 const file = e.target.files[0];
			if (file.size > 12024)
				onFileSelectError({ error: "File size cannot exceed more than 1MB" });
			else onFileSelectSuccess(file);
	};

	return (
		<div className="file-uploader">
			<input type="file" name="files" onChange={handleFileInput} />
			{/* <button
				onClick={(e) => fileInput.current && fileInput.current.click()}
				className="btn btn-primary"
				// onClick={onSubmit}
				value="Upload"
			/> */}
		</div>
	);
};

export default FileUploader;