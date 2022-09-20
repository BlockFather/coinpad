import { Container, VStack, Heading, Button, Text, HStack, Image, Box, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, MouseEventHandler, useCallback } from 'react'

const Connected: FC = () => {

    

    return (
        <VStack spacing={10}>
            <Container>
                <VStack spacing={8}>
                    <Heading color="white" as='h1' size='2xl' noOfLines={1} textAlign='center'>
                        Welcome Wonderer.
                    </Heading>

                    <Text color="bodyText" fontSize="Xl" textAlign="center">
                        Each Nomad is randomly generated and can be staked to receive
                        <Text as='b'> $TRVL</Text>. Use your <Text as="b"> $TRVL</Text> to
                        upgrade your wonderlust Nomad and receive perks within the community!
                    </Text>
                </VStack>  
            </Container>

            <Button bgColor="accent" color="white" maxW='380px'>
            <Text>mint Nomad</Text>
            </Button> 

            
                <Box boxSize='sm' >
                
                  
                        <HStack justifyContent='center'>
                            <Image borderRadius='full' src="1379.png" alt="" />
                        

                        
                            <Image  borderRadius='full' src="3018.png" alt="" />
                        

                        
                            <Image borderRadius='full' src="6861.png" alt="" />
                        

                        
                            <Image borderRadius='full' src="9069.png" alt="" />
                        

                        
                            <Image borderRadius='full' src="763.png" alt="" />
                        </HStack>
                  
               
                </Box>
            

            
        </VStack>


    )
}

export default Connected