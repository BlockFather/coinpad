import { PublicKey } from "@solana/web3.js";
import { NextPage } from "next";
import { VStack, Heading, Text, Flex, HStack, Image, Center  } from '@chakra-ui/react'
import MainLayout from "../components/MainLayout";
import { useState } from "react";
import { StakeOptionsDisplay } from "../components/StakeOptionsDisplay";
import { ItemBox } from "../components/ItemBox";

const Stake: NextPage<StakeProps> = ({
    mint,
    imageSrc
}) => {
    const [isStaking, setIsStaking] =useState(false)
    const[level, setLevel] = useState(1)
    return (
        <MainLayout>
            <VStack
            spacing={7}
            justify="flex-start"
            align= "flex-start"
        >
                <Heading color="white" as="h1" size="2xl">
                    Level up your Nomad
                </Heading>
                <Text color="bodyText" fontSize="xl" textAlign="start" maxWidth="600px">
                    Stake your NoMad to send them off for supplies, earning 1- $TRVL per day gaining you access
                    to randomized lootboxes full of upgrades for your Nomadic journey.
                </Text>
                <HStack spacing={20} alignItems="flex-start">
                    <VStack align="flex-start" minWidth="200px">
                        <Flex direction="column">
                            <Image src={imageSrc ?? ''} alt="WAGMI.travel NFT" zIndex="1" />
                            <Center
                                bgColor="secondaryPurple"
                                borderRadius="0 0 8px 8px"
                                marginTop="-8px"
                                zIndex="2"
                                height = "32px"
                            >
                                <Text color="white" as="b" fontSize="md" width="100%" textAlign="center">
                                    {isStaking ? "STAKING" : "UNSTAKED" }
                                </Text>
                            </Center>
                        </Flex>
                        <Text fontSize="2xl" as="b" color="white">
                            LEVEL {level}
                        </Text>
                    </VStack>
                    <VStack alignItems="Flex-start" spacing={10}>
                        <StakeOptionsDisplay 
                            isStaking={true} 
                            daysStaked={4} 
                            totalEarned={60} 
                            claimable={20}
                        />
                        <HStack spacing={10}>
                            <VStack alignItems="flex-start">
                                <Text color="white" as="b" fontSize="2xl">
                                    Gear
                                </Text>
                                <HStack>
                                    <ItemBox>mock</ItemBox>
                                    <ItemBox>mock</ItemBox>
                                </HStack>
                            </VStack>
                            <VStack alignItems="flex-start">
                                <Text color="white" as="b" fontSize="2xl">
                                    Loot Boxes
                                </Text>
                                <HStack>
                                    <ItemBox>mock</ItemBox>
                                    <ItemBox>mock</ItemBox>
                                    <ItemBox>mock</ItemBox>
                                </HStack>
                            </VStack>

                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </MainLayout>
    )
}

interface StakeProps {
    mint: PublicKey
    imageSrc: string
}

Stake.getInitialProps =  async ({ query }: any) => {
    const { mint, imageSrc } = query

    if (!mint || !imageSrc) throw { error: "No mint"}

    try {
        const mintPubkey = new PublicKey(mint)
        return { mint:mintPubkey, imageSrc: imageSrc }
    } catch {
        throw {error: "invalid mint"}
    }
}

export default Stake