// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import app from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

function UploadCSV() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (file) {
            const storageRef = app.storage().ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);

            // Get the download URL for the uploaded file
            const downloadURL = await fileRef.getDownloadURL();

            // Now you can store the downloadURL in Firestore or use it as needed
            const db = app.firestore();
            const docRef = db.collection("csvData").doc("pg63MxABzRmDWXt0YeMC");
            await docRef.set({ fileURL: downloadURL });
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    );
}

export default UploadCSV;
