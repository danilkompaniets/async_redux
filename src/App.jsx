import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";

function App() {
  return (
    <div className="w-full flex justify-center bg-neutral-600">
      <div className="container">
      <AddPostForm />
      <PostsList />
    </div>
    </div>

  );
}

export default App;
