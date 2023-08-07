import Form from "@/components/Form";
import  Header from "@/components/Header";
import PostFeed from "@/components/Post/PostFeed";

export default function Home() {
  return (
    <>
     < Header showBackArrow= {true}  label="Home"/>
       <Form placeholder="what's going on?" />
       <PostFeed />

    </>
  )
  
}
