import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Model";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModel =()=>{
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModel = useEditModel();

    const [profileImage , setProfileImage] = useState("");
    const [ coverImage , setCoverImage ]  = useState("");
    const [name , setName ]  = useState("");
    const [username , setUsername]  = useState("");
    const [bio, setBio]  = useState("");

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);

    },[currentUser?.name,currentUser?.profileImage,currentUser?.coverImage,currentUser?.username,currentUser?.bio]);

    const [isLoading , setIsLoading] = useState(false);

    const onSubmit = useCallback(async ()=>{
        try {
            setIsLoading(true);
            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success('updated');
            editModel.onClose();
        } catch (error) {
            toast.error('amar went.. went wrong');     
        }
        finally{
            setIsLoading(false);
        }
    },[bio,name,username,profileImage,coverImage,editModel,mutateFetchedUser])

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <ImageUpload
            value={profileImage}
            disabled={isLoading}
            onChange={(image)=> setProfileImage(image)}
            label="upload profile image!"
            />

            <ImageUpload
            value={coverImage}
            disabled={isLoading}
            onChange={(image)=> setCoverImage(image)}
            label="upload cover image!"
            />
            <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
            />
             <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
            />
             <Input
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            disabled={isLoading}
            />
        </div>
    )
    return(
        <Modal
        disabled={isLoading}
        isOpen={editModel.isOpen}
        title="Edit your profile"
        actionLabel="Save"
        onClose={editModel.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        />
        )
}

export default EditModel;