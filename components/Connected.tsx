import {
    Button,
    Container,
    Heading,
    VStack,
    Text,
    HStack,
    Image,
  } from "@chakra-ui/react"
  import {
    FC,
    MouseEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react"
  import { PublicKey } from "@solana/web3.js"
  import { useConnection, useWallet } from "@solana/wallet-adapter-react"
  import {
    Metaplex,
    walletAdapterIdentity,
    CandyMachine,
  } from "@metaplex-foundation/js"
  import { useRouter } from "next/router"
  
  const Connected: FC = () => {
    const { connection } = useConnection()
    const walletAdapter = useWallet()
    const [candyMachine, setCandyMachine] = useState<CandyMachine>()
    const [isMinting, setIsMinting] = useState(false)
  
    const metaplex = useMemo(() => {
      return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
    }, [connection, walletAdapter])
  
    useEffect(() => {
<<<<<<< Updated upstream
        if (!metaplex) return

        metaplex
            .candyMachines()
            .findByAddress({
                address: new PublicKey(
                    process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS ?? ""
                ),
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

=======
      handleInitialLoad()
    }, [metaplex, walletAdapter])
  
    const handleInitialLoad = useCallback(async () => {
      if (!metaplex || !walletAdapter.publicKey) return
  
      try {
        const candyMachine = await metaplex
          .candyMachines()
          .findByAddress({
            address: new PublicKey(
              process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS ?? ""
            ),
          })
          .run()
  
        const nfts = await metaplex
          .nfts()
          .findAllByOwner({ owner: walletAdapter.publicKey })
          .run()
  
        const nft = nfts.find(
          (nft) =>
            nft.collection?.address.toBase58() ===
            candyMachine.collectionMintAddress?.toBase58()
        )
  
        if (nft) {
          const metadata = await (await fetch(nft.uri)).json()
          router.push(
            `/stake?mint=${nft.mintAddress}&imageSrc=${metadata?.image}`
          )
        }
  
        setCandyMachine(candyMachine)
      } catch (error) {
        alert(error)
      }
    }, [metaplex, walletAdapter])
  
>>>>>>> Stashed changes
    const router = useRouter()
  
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
<<<<<<< Updated upstream
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
        [metaplex, walletAdapter, candyMachine, router]
=======
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
        } finally {
          setIsMinting(false)
        }
      },
      [metaplex, walletAdapter, candyMachine]
>>>>>>> Stashed changes
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



