import fileUpload from 'express-fileupload'
import express from 'express'
import {uploadFile,getFiles,getFile,downloadFile,getURLSigned} from './s3.js'

const app=express()
app.use(fileUpload(
{   useTempFiles: true,
    tempFileDir: './uploads'
}));

app.get('/files',async (req,res)=>{
    const result=await getFiles()
    res.json({message:result.Contents})})
app.get('/files/:fileName',async (req,res)=>{
    const result =await getFile(req.params.fileName);
    res.json({message:result.$metadata})
})
app.get('/download/:filename',async (req,res)=>{
    const result = await downloadFile(req.params.filename)
    res.json({message:'downloaded'})
})
app.post('/files',async (req,res)=>{
    const result=await uploadFile(req.files.file)
    res.json({message: result})
})

app.get('/urlfile/:filename', async(req,res)=>{
    console.log(req.params.filename);
    const result=await getURLSigned(req.params.filename)
    res.json({message: result})
})
app.listen(3000)
console.log(`Server on port ${3000}`)