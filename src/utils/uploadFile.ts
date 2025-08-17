import api from "./apiAxios";
import API_ENDPOINTS from "./apiConstant";
import axios from "axios";

export async function uploadFile(
	file: File,
	folder: string,
	subfolder: string
): Promise<{ url: string; key: string }> {
	try {
		// Step 1: Get the pre-signed URL from your backend
		const { data: presignedResponse } = await api.post(
			API_ENDPOINTS.MEDIA.GENERATE_PRESIGNED_URL,
			{
				folder,
				subfolder,
				fileName: file.name,
				fileType: file.type,
				fileSize: file.size,
			}
		);

		console.log("Pre-signed URL response:", presignedResponse);

		// Step 2: Upload directly to S3 using the pre-signed URL
		// Use a clean axios instance without interceptors
		await axios.put(presignedResponse.url, file, {
			headers: {
				"Content-Type": file.type,
			},
		});

		// Step 3: Get the signed URL for accessing the uploaded file
		const s3UrlResponse = await api.get(
			API_ENDPOINTS.MEDIA.GET_MEDIA_URL(presignedResponse.key)
		);

		console.log("S3 URL response:", s3UrlResponse.data);

		return {
			url: s3UrlResponse.data.url,
			key: presignedResponse.key,
		};
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}
