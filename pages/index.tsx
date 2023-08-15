import Form from "@/components/Form";
import  Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <>
       <Header showBackArrow= {true}  label="Home"/>
       <Form placeholder="What's happening...?" />
       <PostFeed />
    </>
  )
  
}
