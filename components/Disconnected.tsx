import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Container, VStack, Heading, Button, Text, HStack } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal,  } from '@solana/wallet-adapter-react-ui'
import { FC, MouseEventHandler, useCallback } from 'react'

const Disconnected: FC = () => {

    const modalState = useWalletModal()
    const {wallet, connect } = useWallet()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (event.defaultPrevented) return

            if (!wallet) {
                modalState.setVisible(true)
            } else {
                connect().catch(() => {})
            }
        },
        [wallet, connect, modalState]
    )

    return (
        <Container>
            <VStack spacing={80} marginTop={0}>
                <Heading 
                    color='whiteAlpha.600'
                    as='h1' 
                    size='4xl' 
                    noOfLines={4} 
                    textAlign='center'
                    >
                    WAGMI.Travel Lifestyle NFT. Earn $TRVL. Level UP.
                </Heading>

                <Button 
                    bgColor="accent"
                    color="white"
                    maxW="380px"
                    onClick={handleClick}
                    >
                    <HStack>
                    <Text>become a nomad</Text>
                    <ArrowForwardIcon />
                    </HStack>
                </Button>


            </VStack>
        </Container>
    )
}

export default Disconnected