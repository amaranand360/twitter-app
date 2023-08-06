interface ImageUploadProps {
    onChange :(base64:string)=>void;
    label:string;
    value?: string;
    disabled?:boolean;
}

const ImageUpload :React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled
}) => {
  return (
    <div>
      
    </div>
  )
}

export default ImageUpload;
