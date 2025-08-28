import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(req) 
{
    try {
        const formData = await req.formData()
        const files = formData.getAll("files");
         console.log(formData)
        const imageUrls = [];

        for (const file of files) {
            const Abuffer = await file.arrayBuffer();
            const buffer =Buffer.from(Abuffer);

            const uploadRes = await new Promise((res , rej)=>{
                cloudinary.uploader.upload_stream({ folder : "products"},
                    (error , result)=>{
                        if(error) rej( error)
                            else res(result)
                    }
                ).end(buffer)
            });
            imageUrls.push(uploadRes.secure_url)

            
        }
        console.log("urls" , imageUrls)
        return NextResponse.json({urls : imageUrls})
        
    } catch (error) {
         if (error.name == "ValidationError" || typeof error == "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 } // Bad Request
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
        
    }
}