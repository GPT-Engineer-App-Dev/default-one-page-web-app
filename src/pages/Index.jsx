import { Container, Text, VStack, Heading, Button, Box, Image } from "@chakra-ui/react";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";
import { useState } from "react";
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';

const Index = () => {
  const { data: posts, isLoading, error } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState({ name: "", body: "" });
  const { session, logout } = useSupabaseAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleAddPost = () => {
    addPostMutation.mutate(newPost);
    setNewPost({ name: "", body: "" });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading posts</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={6}>
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to Our One-Page Web App
        </Heading>
        <Text fontSize="lg" textAlign="center">
          This is a simple, elegant, and responsive one-page web application built with React and Chakra UI.
        </Text>
        <Box boxSize="sm">
          <Image src="/images/hero-image.png" alt="Hero Image" />
        </Box>
        <VStack spacing={4} width="100%">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Heading as="h3" size="md">{post.name}</Heading>
              <Text mt={2}>{post.body}</Text>
            </Box>
          ))}
        </VStack>
        <Box width="100%">
          <Heading as="h3" size="md" textAlign="center" mt={6}>Add a New Post</Heading>
          <Box mt={4}>
            <input
              type="text"
              placeholder="Post Name"
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <textarea
              placeholder="Post Body"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <Button colorScheme="teal" size="lg" onClick={handleAddPost} width="100%">
              Add Post
            </Button>
          </Box>
        </Box>
        {!session ? (
          showLogin ? (
            <SupabaseAuthUI />
          ) : (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          )
        ) : (
          <Button onClick={() => { setShowLogin(false); logout(); }}>Logout {session.user.email}</Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;