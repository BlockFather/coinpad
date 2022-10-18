import type { NextPage } from 'next'
import Disconnected from '../components/Disconnected'
import Connected from '../components/Connected'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import MainLayout from "../components/MainLayout"
import { Container, VStack, Heading, Text, Image, Button, HStack  } from '@chakra-ui/react'
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { PublicKey } from '@solana/web3.js'
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js'

interface NewMintProps {
    mint: PublicKey 
}

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
    const[metadata, setMetadata] = useState<any>()
    const { connection } = useConnection()
    const walletAdapter = useWallet()
    const metaplex = useMemo(() => {
        return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
    }, [connection, walletAdapter])


    useEffect(() => {
        metaplex
            .nfts()
            .findByMint({ mintAddress: mint })
            .run()
            .then((nft) => {
                fetch(nft.uri)
                    .then((res) => res.json())
                    .then((metadata) => {
                        setMetadata(metadata)
                    })
            })
    }, [mint, metaplex, walletAdapter])

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {},
        []
    )

  return (
    <MainLayout>

            <VStack spacing={10}>
                <Container>
                    <VStack spacing={8}>
                        <Heading color="white" as="h1" size="2xl" textAlign="center">
                            A new Nomad has found thier way!
                        </Heading>

                        <Text color="bodyText" fontSize="xl" textAlign="center">
                            Congratulations, you are a Level 1 Nomad! <br />
                            Time to stake your nomad to earn rewards and level up.
                        </Text>
                    </VStack>
                </Container>

                <Image src={metadata?.image ?? ""} alt="" />

                <Button
                    bgColor="accent"
                    color="white"
                    maxW="450px"
                    onClick={handleClick}
                >
                    <HStack>
                        <Text>
                            Stake your nomad by sending them off for supplies
                        </Text>
                        <ArrowForwardIcon />
                    </HStack>
                </Button>
            </VStack>
    </MainLayout>
  )
}

interface NewMintProps {
    mint: PublicKey
}

NewMint.getInitialProps =  async ({ query }) => {
    const { mint } = query

    if (!mint) throw { error: "No mint"}

    try {
        const mintPubkey = new PublicKey(mint)
        return { mint:mintPubkey }
    } catch {
        throw {error: "invalid mint"}
    }
}

export default NewMint
