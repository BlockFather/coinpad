import { Container, VStack, Heading, Button, Text, HStack, Image, Box, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
    Metaplex,
    walletAdapterIdentity,
    CandyMachine,
} from "@metaplex-foundation/js"
import { useRouter } from 'next/router'

const Connected: FC = () => {

    const { connection } = useConnection()
    const walletAdapter = useWallet()
    const [candyMachine, setCandyMachine] = useState<CandyMachine>()
    const [isMinting, setIsMinting] = useState(false)

    const metaplex = useMemo(() => {
        return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
    }, [connection, walletAdapter])

    useEffect(() => {
        if (!metaplex) return

        metaplex
            .candyMachines()
            .findByAddress({
                address: new PublicKey("VGDKPkUsGPwAaDhQ8KQ5A1QAPZdC8Pv5XVpRM3EPUz2"),
            })
            .run()
            .then((candyMachine) => {
                console.log(candyMachine)
                setCandyMachine(candyMachine)
            })
            .catch((error) => {
                alert(error)
            })
    }, [metaplex])

    const router = useRouter()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            if (event.defaultPrevented) return

            if (!walletAdapter.connected || !candyMachine) {
                return
            }

            try {
                setIsMinting(true)
                const nft = await metaplex.candyMachines().mint({ candyMachine }).run()

                console.log(nft)
                router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
            } catch (error) {
                alert(error)
            } finally{
                setIsMinting(false)
            }
        },
        [metaplex, walletAdapter, candyMachine]
    )

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

            <Button 
            bgColor="accent" 
            color="white" 
            maxW="380px" 
            onClick={handleClick} 
            isLoading={isMinting}
            >
                <Text>mint Nomad</Text>
            </Button> 

            
                <Box boxSize='sm' >
                
                  
                        <HStack justifyContent='center'>
                         
                            <Image  borderRadius='full' src="3018.png" alt="" />
                        
                            <Image borderRadius='full' src="6861.png" alt="" />
                        
                            <Image borderRadius='full' src="9069.png" alt="" />
                        
                        </HStack>
                  
               
                </Box>
            

            
        </VStack>


    )
}

export default Connected