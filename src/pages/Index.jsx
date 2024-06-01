import { Container, Text, VStack, Heading, Button, Box, Image } from "@chakra-ui/react";

const Index = () => {
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
        <Button colorScheme="teal" size="lg">
          Get Started
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;